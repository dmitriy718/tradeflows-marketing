import * as cron from 'node-cron';
import { format, addHours, startOfDay } from 'date-fns';
import config from '../config/index.js';
import logger from '../utils/logger.js';
import db from '../database/index.js';
import contentGenerator from '../content/generator.js';
import trendingService from '../services/trendingService.js';
import fileUpdater from '../services/fileUpdater.js';

class PostScheduler {
  constructor() {
    this.jobs = new Map();
    this.isRunning = false;
    this.dailyPostCount = 0;
    this.lastPostTime = null;
  }

  start() {
    if (this.isRunning) {
      logger.warn('Scheduler is already running');
      return;
    }

    logger.info('Starting post scheduler...');

    // Schedule posts at configured times
    // 8 AM EST - Market Open Analysis
    this.jobs.set('morning', cron.schedule('0 8 * * *', async () => {
      await this.generateAndPublish('market-open');
    }, {
      timezone: 'America/New_York'
    }));

    // 12 PM EST - Midday Strategy Update
    this.jobs.set('noon', cron.schedule('0 12 * * *', async () => {
      await this.generateAndPublish('midday');
    }, {
      timezone: 'America/New_York'
    }));

    // 5:00 PM EST - Market Close Recap
    this.jobs.set('close', cron.schedule('0 17 * * *', async () => {
      await this.generateAndPublish('market-close');
    }, {
      timezone: 'America/New_York'
    }));

    // Optional: Check for viral topics (disabled for 3x daily schedule)
    // this.jobs.set('viral', cron.schedule('0 19 * * *', async () => {
    //   await this.checkAndPostViral();
    // }, {
    //   timezone: 'America/New_York'
    // }));

    // Daily reset at midnight
    this.jobs.set('reset', cron.schedule('0 0 * * *', () => {
      this.dailyPostCount = 0;
      logger.info('Daily post counter reset');
      db.updateDailyAnalytics();
    }));

    // Update trending keywords every 2 hours
    this.jobs.set('trends', cron.schedule('0 */2 * * *', async () => {
      await trendingService.getCurrentTrends();
      logger.info('Trending keywords updated');
    }));

    this.isRunning = true;
    logger.info('Post scheduler started successfully');

    // Initial trend fetch
    this.initializeTrends();
  }

  stop() {
    logger.info('Stopping post scheduler...');

    for (const [name, job] of this.jobs) {
      job.stop();
      logger.info(`Stopped job: ${name}`);
    }

    this.jobs.clear();
    this.isRunning = false;
    logger.info('Post scheduler stopped');
  }

  async initializeTrends() {
    try {
      await trendingService.getCurrentTrends();
      logger.info('Initial trends loaded');
    } catch (error) {
      logger.error('Failed to load initial trends:', error);
    }
  }

  async generateAndPublish(timeSlot) {
    try {
      logger.info(`Generating ${timeSlot} post...`);

      // Check daily post limit
      const todayCount = db.getTodayPostCount();
      if (todayCount >= config.content.maxPostsPerDay) {
        logger.info(`Daily post limit reached (${todayCount}/${config.content.maxPostsPerDay})`);
        return;
      }

      // Get current trends
      const trends = await trendingService.getCurrentTrends();

      // Get recent posts to avoid repetition
      const previousPosts = db.getRecentPosts(10);

      // Generate content
      const post = await contentGenerator.generate({
        timeSlot,
        trends,
        previousPosts
      });

      if (!post) {
        logger.error('Failed to generate post');
        return;
      }

      // Save to database
      const postId = db.savePost(post);
      post.id = postId;

      // Update keywords usage
      if (post.keywordsUsed) {
        post.keywordsUsed.forEach(keyword => {
          db.incrementKeywordUsage(keyword);
        });
      }

      // Update frontend files
      const updated = await fileUpdater.updateBlogData(post);

      if (updated) {
        logger.info(`✅ Published: "${post.title}" (ID: ${postId})`);
        this.dailyPostCount++;
        this.lastPostTime = new Date();

        // Trigger build if enabled
        if (config.features.enableAutoBuild) {
          await fileUpdater.triggerBuild();
        }
      } else {
        logger.error('Failed to update frontend files');
      }

      return post;

    } catch (error) {
      logger.error(`Error in generateAndPublish (${timeSlot}):`, error);
      throw error;
    }
  }

  async checkAndPostViral() {
    try {
      logger.info('Checking for viral topics...');

      // Get fresh trends
      const trends = await trendingService.getCurrentTrends();

      // Check if we have highly viral topics
      const viralTopics = trends.filter(t => t.score > 0.8);

      if (viralTopics.length === 0) {
        logger.info('No highly viral topics found');
        return;
      }

      // Check if we've already posted enough today
      const todayCount = db.getTodayPostCount();

      // Randomly decide whether to post (50% chance if under limit)
      const shouldPost = todayCount < config.content.maxPostsPerDay && Math.random() > 0.5;

      if (!shouldPost) {
        logger.info(`Skipping viral post (today: ${todayCount} posts, random: false)`);
        return;
      }

      logger.info(`Found ${viralTopics.length} viral topics, generating post...`);

      // Generate viral post
      await this.generateAndPublish('viral');

    } catch (error) {
      logger.error('Error checking viral topics:', error);
    }
  }

  async generatePostNow() {
    logger.info('Manual post generation requested');

    // Determine appropriate time slot
    const hour = new Date().getHours();
    let timeSlot = 'midday';

    if (hour < 10) {
      timeSlot = 'market-open';
    } else if (hour >= 16) {
      timeSlot = 'market-close';
    } else if (hour >= 19) {
      timeSlot = 'viral';
    }

    return await this.generateAndPublish(timeSlot);
  }

  async getStats() {
    const stats = db.getStats();

    // Add scheduler info
    stats.scheduler = {
      isRunning: this.isRunning,
      dailyPostCount: this.dailyPostCount,
      lastPostTime: this.lastPostTime,
      nextScheduled: this.getNextScheduledTime(),
      jobsActive: this.jobs.size
    };

    // Add trending keywords
    stats.trendingKeywords = await db.getTrendingKeywords(10);

    return stats;
  }

  async getTrendingKeywords() {
    return await trendingService.getCurrentTrends();
  }

  getSchedule() {
    const schedule = [];
    const now = new Date();
    const today = format(now, 'yyyy-MM-dd');

    // Add scheduled times for today
    config.content.postTimes.forEach(time => {
      const [hours, minutes] = time.split(':').map(Number);
      const scheduledTime = new Date(today);
      scheduledTime.setHours(hours, minutes, 0, 0);

      if (scheduledTime > now) {
        schedule.push(format(scheduledTime, 'h:mm a'));
      }
    });

    // If no more posts today, show tomorrow's first post
    if (schedule.length === 0) {
      const tomorrow = addHours(startOfDay(now), 32); // 8 AM tomorrow
      schedule.push(`Tomorrow ${format(tomorrow, 'h:mm a')}`);
    }

    return schedule;
  }

  getNextScheduledTime() {
    const schedule = this.getSchedule();
    return schedule[0] || 'No posts scheduled';
  }

  // Test function to verify everything works
  async test() {
    logger.info('Running scheduler test...');

    try {
      // Test trend fetching
      const trends = await trendingService.getCurrentTrends();
      logger.info(`✅ Trends: ${trends.length} keywords found`);

      // Test content generation
      const post = await contentGenerator.generate({
        timeSlot: 'test',
        trends: trends.slice(0, 5),
        previousPosts: []
      });
      logger.info(`✅ Content: Generated "${post.title}"`);

      // Test database
      const stats = db.getStats();
      logger.info(`✅ Database: ${stats.totalPosts} total posts`);

      logger.info('✅ All systems operational!');
      return true;

    } catch (error) {
      logger.error('❌ Test failed:', error);
      return false;
    }
  }
}

// Export singleton instance
export default new PostScheduler();