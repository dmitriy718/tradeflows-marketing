/**
 * TradeFlows Auto-Blogging Server
 * Automatically generates and posts SEO-optimized blog content
 */

import express from 'express';
import cron from 'node-cron';
import helmet from 'helmet';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

// Load environment variables
dotenv.config();

import { logger } from './src/logger.js';
import { keywordResearcher } from './src/keywordResearcher.js';
import { initContentGenerator } from './src/contentGenerator.js';
import { seoOptimizer } from './src/seoOptimizer.js';
import { imageHandler } from './src/imageHandler.js';
import { BlogManager } from './src/blogManager.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Configuration
const PORT = process.env.PORT || 3001;
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
const ENABLE_AUTO_POSTING = process.env.ENABLE_AUTO_POSTING === 'true';
const BLOG_DATA_PATH = process.env.BLOG_DATA_PATH || '../src/data/blogPosts.js';
const MIN_POSTS_PER_DAY = parseInt(process.env.BLOG_POSTS_PER_DAY_MIN) || 1;
const MAX_POSTS_PER_DAY = parseInt(process.env.BLOG_POSTS_PER_DAY_MAX) || 3;

// Initialize services
let contentGenerator;
let blogManager;
let postsCreatedToday = 0;

// Statistics
const stats = {
  totalPostsGenerated: 0,
  successfulPosts: 0,
  failedPosts: 0,
  lastPostTime: null,
  serverStartTime: new Date(),
  postsToday: 0
};

/**
 * Initialize the server
 */
async function initialize() {
  try {
    // Check for API key
    if (!ANTHROPIC_API_KEY) {
      throw new Error('ANTHROPIC_API_KEY environment variable is required');
    }

    // Initialize content generator
    contentGenerator = initContentGenerator(ANTHROPIC_API_KEY);
    logger.info('Content generator initialized');

    // Initialize blog manager
    blogManager = new BlogManager(BLOG_DATA_PATH);
    logger.info('Blog manager initialized');

    // Get initial statistics
    const blogStats = await blogManager.getStatistics();
    stats.postsToday = blogStats.postsToday;
    postsCreatedToday = blogStats.postsToday;

    logger.info('Auto-blogging server initialized', {
      enableAutoPosting: ENABLE_AUTO_POSTING,
      minPostsPerDay: MIN_POSTS_PER_DAY,
      maxPostsPerDay: MAX_POSTS_PER_DAY,
      postsToday: stats.postsToday
    });

    return true;
  } catch (error) {
    logger.error('Failed to initialize server', { error: error.message });
    throw error;
  }
}

/**
 * Generate and publish a new blog post
 */
async function generateAndPublishPost() {
  try {
    logger.info('Starting blog post generation');
    stats.totalPostsGenerated++;

    // Step 1: Get trending keywords
    logger.info('Fetching trending keywords...');
    const keywords = await keywordResearcher.getTrendingKeywords();
    logger.info('Trending keywords retrieved', { topKeyword: keywords[0]?.keyword });

    // Step 2: Generate blog post content
    logger.info('Generating blog post with AI...');
    const blogPost = await contentGenerator.generateBlogPost(keywords);

    // Step 3: Optimize content for SEO
    logger.info('Optimizing content for SEO...');
    const { content: optimizedContent, internalLinks } = seoOptimizer.optimizeContent(
      blogPost.content,
      keywords[0].keyword,
      keywords.slice(1, 6).map(k => k.keyword)
    );
    blogPost.content = optimizedContent;

    // Step 4: Analyze SEO score
    const seoScore = seoOptimizer.analyzeSEOScore(blogPost, keywords[0].keyword);
    logger.info('SEO analysis complete', {
      score: seoScore.percentage,
      grade: seoScore.grade
    });

    // Step 5: Handle image
    logger.info('Processing blog post image...');
    const imageUrl = await imageHandler.getImage(
      blogPost.slug,
      keywords.slice(0, 3).map(k => k.keyword)
    );
    blogPost.image = imageUrl;

    // Step 6: Create backup before adding post
    logger.info('Creating backup...');
    await blogManager.backupBlogPosts();

    // Step 7: Add post to blog
    logger.info('Adding post to blog...');
    await blogManager.addBlogPost(blogPost);

    // Update statistics
    stats.successfulPosts++;
    stats.lastPostTime = new Date();
    stats.postsToday = ++postsCreatedToday;

    logger.info('Blog post published successfully!', {
      title: blogPost.title,
      slug: blogPost.slug,
      category: blogPost.category,
      wordCount: blogPost.content.split(' ').length,
      seoScore: `${seoScore.percentage.toFixed(1)}% (${seoScore.grade})`
    });

    return {
      success: true,
      post: {
        title: blogPost.title,
        slug: blogPost.slug,
        category: blogPost.category,
        excerpt: blogPost.excerpt,
        readTime: blogPost.readTime
      },
      seo: {
        score: seoScore.percentage,
        grade: seoScore.grade,
        issues: seoScore.issues,
        suggestions: seoScore.suggestions
      }
    };
  } catch (error) {
    stats.failedPosts++;
    logger.error('Failed to generate and publish post', {
      error: error.message,
      stack: error.stack
    });

    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Scheduled job to create posts
 */
async function scheduledPostCreation() {
  // Check if we've reached the max posts for today
  if (postsCreatedToday >= MAX_POSTS_PER_DAY) {
    logger.info('Maximum posts per day reached', { count: postsCreatedToday });
    return;
  }

  // Determine if we should create a post
  const postsNeeded = Math.max(0, MIN_POSTS_PER_DAY - postsCreatedToday);
  const postsRemaining = MAX_POSTS_PER_DAY - postsCreatedToday;

  if (postsNeeded > 0 || (postsRemaining > 0 && Math.random() > 0.5)) {
    logger.info('Creating scheduled blog post', {
      postsToday: postsCreatedToday,
      minNeeded: MIN_POSTS_PER_DAY,
      maxAllowed: MAX_POSTS_PER_DAY
    });

    await generateAndPublishPost();
  } else {
    logger.info('Skipping post creation', {
      postsToday: postsCreatedToday,
      reason: 'Minimum quota met, random skip'
    });
  }
}

/**
 * Reset daily counter at midnight
 */
function resetDailyCounter() {
  postsCreatedToday = 0;
  stats.postsToday = 0;
  logger.info('Daily post counter reset');
}

// Create Express app
const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Request logging
app.use((req, res, next) => {
  logger.info('HTTP Request', {
    method: req.method,
    path: req.path,
    ip: req.ip
  });
  next();
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    uptime: process.uptime(),
    serverStartTime: stats.serverStartTime,
    postsToday: stats.postsToday
  });
});

// Statistics endpoint
app.get('/api/stats', async (req, res) => {
  try {
    const blogStats = await blogManager.getStatistics();

    res.json({
      ...stats,
      blog: blogStats,
      configuration: {
        autoPostingEnabled: ENABLE_AUTO_POSTING,
        minPostsPerDay: MIN_POSTS_PER_DAY,
        maxPostsPerDay: MAX_POSTS_PER_DAY
      }
    });
  } catch (error) {
    logger.error('Error fetching stats', { error: error.message });
    res.status(500).json({ error: 'Failed to fetch statistics' });
  }
});

// Manual post generation endpoint
app.post('/api/generate', async (req, res) => {
  try {
    logger.info('Manual post generation triggered');

    if (postsCreatedToday >= MAX_POSTS_PER_DAY) {
      return res.status(429).json({
        error: 'Daily post limit reached',
        postsToday: postsCreatedToday,
        maxAllowed: MAX_POSTS_PER_DAY
      });
    }

    const result = await generateAndPublishPost();

    if (result.success) {
      res.json(result);
    } else {
      res.status(500).json(result);
    }
  } catch (error) {
    logger.error('Error in manual generation', { error: error.message });
    res.status(500).json({ error: 'Failed to generate post' });
  }
});

// Trending keywords endpoint
app.get('/api/keywords', async (req, res) => {
  try {
    const keywords = await keywordResearcher.getTrendingKeywords();
    res.json({ keywords });
  } catch (error) {
    logger.error('Error fetching keywords', { error: error.message });
    res.status(500).json({ error: 'Failed to fetch keywords' });
  }
});

// Start server
async function startServer() {
  try {
    // Initialize services
    await initialize();

    // Set up cron schedules if auto-posting is enabled
    if (ENABLE_AUTO_POSTING) {
      // Schedule 1: 9 AM
      cron.schedule(process.env.POST_SCHEDULE_1 || '0 9 * * *', () => {
        logger.info('Cron job triggered: Morning post');
        scheduledPostCreation();
      });

      // Schedule 2: 2 PM
      cron.schedule(process.env.POST_SCHEDULE_2 || '0 14 * * *', () => {
        logger.info('Cron job triggered: Afternoon post');
        scheduledPostCreation();
      });

      // Schedule 3: 7 PM
      cron.schedule(process.env.POST_SCHEDULE_3 || '0 19 * * *', () => {
        logger.info('Cron job triggered: Evening post');
        scheduledPostCreation();
      });

      // Reset counter at midnight
      cron.schedule('0 0 * * *', resetDailyCounter);

      logger.info('Cron schedules configured', {
        schedule1: process.env.POST_SCHEDULE_1 || '0 9 * * *',
        schedule2: process.env.POST_SCHEDULE_2 || '0 14 * * *',
        schedule3: process.env.POST_SCHEDULE_3 || '0 19 * * *'
      });
    } else {
      logger.warn('Auto-posting is DISABLED. Set ENABLE_AUTO_POSTING=true to enable.');
    }

    // Start HTTP server
    app.listen(PORT, () => {
      logger.info('Auto-blogging server started', {
        port: PORT,
        environment: process.env.NODE_ENV || 'development',
        autoPosting: ENABLE_AUTO_POSTING
      });
    });
  } catch (error) {
    logger.error('Failed to start server', { error: error.message });
    process.exit(1);
  }
}

// Handle graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  logger.info('SIGINT received, shutting down gracefully');
  process.exit(0);
});

// Start the server
startServer().catch(error => {
  logger.error('Unhandled error during startup', { error: error.message });
  process.exit(1);
});
