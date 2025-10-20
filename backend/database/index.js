import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import fs from 'fs';
import logger from '../utils/logger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

class BlogDatabase {
  constructor() {
    this.db = null;
    this.dbPath = join(__dirname, 'data.json');
  }

  async initialize() {
    try {
      // Ensure database directory exists
      const dbDir = dirname(this.dbPath);
      if (!fs.existsSync(dbDir)) {
        fs.mkdirSync(dbDir, { recursive: true });
      }

      // Initialize LowDB with JSON file
      const adapter = new JSONFile(this.dbPath);
      this.db = new Low(adapter, {});

      // Read data
      await this.db.read();

      // Initialize structure if empty
      this.db.data ||= { posts: [], keywords: [], analytics: [] };

      // Write initial structure
      await this.db.write();

      logger.info(`Database initialized at ${this.dbPath}`);
      return true;
    } catch (error) {
      logger.error('Database initialization failed:', error);
      throw error;
    }
  }

  // Post operations
  savePost(post) {
    try {
      // Ensure data is initialized
      if (!this.db.data || !this.db.data.posts) {
        logger.warn('Database not initialized, initializing now...');
        this.db.data = { posts: [], keywords: [], analytics: [] };
      }

      const postData = {
        ...post,
        id: this.db.data.posts.length + 1,
        createdAt: new Date().toISOString(),
        publishedAt: post.publishedAt || new Date().toISOString(),
        featured: post.featured || false,
        viralScore: post.viralScore || 0,
        views: 0,
        status: 'published'
      };

      this.db.data.posts.unshift(postData);
      this.db.write();

      logger.info(`Post saved: ${post.title} (ID: ${postData.id})`);
      return postData.id;
    } catch (error) {
      logger.error('Error saving post:', error);
      throw error;
    }
  }

  getRecentPosts(limit = 10) {
    try {
      // Ensure data exists
      if (!this.db.data || !this.db.data.posts) {
        return [];
      }

      return this.db.data.posts
        .filter(p => p.status === 'published')
        .slice(0, limit);
    } catch (error) {
      logger.error('Error getting recent posts:', error);
      return [];
    }
  }

  getPostBySlug(slug) {
    return this.db.data.posts.find(p => p.slug === slug);
  }

  getTodayPostCount() {
    const today = new Date().toISOString().split('T')[0];
    return this.db.data.posts.filter(p => {
      const postDate = p.publishedAt?.split('T')[0];
      return postDate === today;
    }).length;
  }

  // Keyword operations
  saveKeyword(keyword, source, trendScore) {
    // Ensure data is initialized
    if (!this.db.data || !this.db.data.keywords) {
      this.db.data = { posts: [], keywords: [], analytics: [] };
    }

    const existing = this.db.data.keywords.find(k => k.keyword.toLowerCase() === keyword.toLowerCase());

    if (existing) {
      existing.trendScore = Math.max(existing.trendScore, trendScore);
      existing.source = source;
      existing.lastUpdated = new Date().toISOString();
    } else {
      this.db.data.keywords.push({
        keyword,
        source,
        trendScore,
        usageCount: 0,
        lastUsed: null,
        discoveredAt: new Date().toISOString()
      });
    }

    this.db.write();
  }

  incrementKeywordUsage(keyword) {
    const kw = this.db.data.keywords.find(k => k.keyword.toLowerCase() === keyword.toLowerCase());

    if (kw) {
      kw.usageCount = (kw.usageCount || 0) + 1;
      kw.lastUsed = new Date().toISOString();
      this.db.write();
    }
  }

  getTrendingKeywords(limit = 20) {
    return this.db.data.keywords
      .filter(k => k.trendScore > 0)
      .sort((a, b) => {
        // Sort by score, then by usage count (ascending for freshness)
        if (b.trendScore !== a.trendScore) {
          return b.trendScore - a.trendScore;
        }
        return a.usageCount - b.usageCount;
      })
      .slice(0, limit);
  }

  // Analytics operations
  updateDailyAnalytics() {
    const today = new Date().toISOString().split('T')[0];

    const todayPosts = this.db.data.posts.filter(p => {
      const postDate = p.publishedAt?.split('T')[0];
      return postDate === today;
    });

    const viralPosts = todayPosts.filter(p => p.viralScore > 0.5).length;
    const avgViralScore = todayPosts.length > 0
      ? todayPosts.reduce((sum, p) => sum + (p.viralScore || 0), 0) / todayPosts.length
      : 0;

    const existing = this.db.data.analytics.find(a => a.date === today);

    if (existing) {
      existing.postsGenerated = todayPosts.length;
      existing.viralKeywordsUsed = viralPosts;
      existing.avgViralScore = avgViralScore;
    } else {
      this.db.data.analytics.push({
        date: today,
        postsGenerated: todayPosts.length,
        viralKeywordsUsed: viralPosts,
        totalViews: 0,
        avgViralScore
      });
    }

    this.db.write();
  }

  getAnalytics(days = 30) {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);
    const cutoffStr = cutoffDate.toISOString().split('T')[0];

    return this.db.data.analytics
      .filter(a => a.date >= cutoffStr)
      .sort((a, b) => b.date.localeCompare(a.date));
  }

  // Get statistics
  getStats() {
    const totalPosts = this.db.data.posts.length;
    const todayPosts = this.getTodayPostCount();
    const totalKeywords = this.db.data.keywords.length;
    const avgViralScore = totalPosts > 0
      ? this.db.data.posts.reduce((sum, p) => sum + (p.viralScore || 0), 0) / totalPosts
      : 0;

    return {
      totalPosts,
      todayPosts,
      totalKeywords,
      avgViralScore: avgViralScore.toFixed(2),
      lastPost: this.getRecentPosts(1)[0]
    };
  }

  // Close/cleanup (not needed for JSON, but kept for compatibility)
  close() {
    logger.info('Database connection closed');
  }
}

// Export singleton instance
export default new BlogDatabase();