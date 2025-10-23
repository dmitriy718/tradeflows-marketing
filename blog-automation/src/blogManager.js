/**
 * Blog Manager - Manages blog posts in the blogPosts.js file
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { logger } from './logger.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export class BlogManager {
  constructor(blogDataPath) {
    this.blogDataPath = path.resolve(__dirname, blogDataPath);
  }

  /**
   * Read current blog posts from file
   */
  async readBlogPosts() {
    try {
      const content = await fs.readFile(this.blogDataPath, 'utf-8');

      // Extract the blogPosts array using regex
      const postsMatch = content.match(/export const blogPosts = \[([\s\S]*?)\n\]/);
      if (!postsMatch) {
        throw new Error('Could not find blogPosts array in file');
      }

      // Parse the posts (simplified - assumes valid JS structure)
      // In production, you might want to use a proper JS parser
      const postsContent = postsMatch[1];

      // Count existing posts
      const postCount = (postsContent.match(/{\s*id:/g) || []).length;

      logger.info('Blog posts read from file', { count: postCount });

      return { content, postCount };
    } catch (error) {
      logger.error('Error reading blog posts', { error: error.message });
      throw error;
    }
  }

  /**
   * Add new blog post to the file
   */
  async addBlogPost(post) {
    try {
      const { content: fileContent } = await this.readBlogPosts();

      // Format the new post as a JavaScript object string
      const newPostStr = this.formatPostAsJavaScript(post);

      // Find the blogPosts array and insert the new post at the beginning
      const updatedContent = fileContent.replace(
        /export const blogPosts = \[/,
        `export const blogPosts = [\n${newPostStr},`
      );

      // Write back to file
      await fs.writeFile(this.blogDataPath, updatedContent, 'utf-8');

      logger.info('Blog post added successfully', { title: post.title, id: post.id });

      return true;
    } catch (error) {
      logger.error('Error adding blog post', { error: error.message });
      throw error;
    }
  }

  /**
   * Format post object as JavaScript string
   */
  formatPostAsJavaScript(post) {
    // Escape special characters in content
    const escapeContent = (str) => {
      return str
        .replace(/\\/g, '\\\\')
        .replace(/`/g, '\\`')
        .replace(/\$/g, '\\$');
    };

    return `  {
    id: '${post.id}',
    title: '${post.title.replace(/'/g, "\\'")}',
    slug: '${post.slug}',
    excerpt: '${post.excerpt.replace(/'/g, "\\'")}',
    category: '${post.category}',
    author: {
      name: '${post.author.name}',
      role: '${post.author.role}',
      avatar: '${post.author.avatar}'
    },
    publishDate: '${post.publishDate}',
    readTime: '${post.readTime}',
    featured: ${post.featured},
    image: '${post.image}',
    tags: ${JSON.stringify(post.tags)},
    content: \`${escapeContent(post.content)}\`
  }`;
  }

  /**
   * Get blog post statistics
   */
  async getStatistics() {
    try {
      const { content } = await this.readBlogPosts();

      // Count posts by category
      const categories = {
        'trading-strategies': (content.match(/category: 'trading-strategies'/g) || []).length,
        'market-analysis': (content.match(/category: 'market-analysis'/g) || []).length,
        'education': (content.match(/category: 'education'/g) || []).length,
        'platform-updates': (content.match(/category: 'platform-updates'/g) || []).length,
        'company-news': (content.match(/category: 'company-news'/g) || []).length
      };

      // Get total posts
      const totalPosts = Object.values(categories).reduce((sum, count) => sum + count, 0);

      // Get latest post date
      const dateMatches = content.match(/publishDate: '(\d{4}-\d{2}-\d{2})'/g) || [];
      const dates = dateMatches.map(m => m.match(/'(.*)'/)[1]);
      const latestDate = dates.sort().reverse()[0] || 'N/A';

      return {
        totalPosts,
        categories,
        latestDate,
        postsToday: dates.filter(d => d === new Date().toISOString().split('T')[0]).length
      };
    } catch (error) {
      logger.error('Error getting statistics', { error: error.message });
      return {
        totalPosts: 0,
        categories: {},
        latestDate: 'N/A',
        postsToday: 0
      };
    }
  }

  /**
   * Backup blog posts file
   */
  async backupBlogPosts() {
    try {
      const backupPath = this.blogDataPath.replace('.js', `.backup-${Date.now()}.js`);
      await fs.copyFile(this.blogDataPath, backupPath);

      logger.info('Blog posts backed up', { backupPath });

      // Keep only last 5 backups
      const backupDir = path.dirname(backupPath);
      const files = await fs.readdir(backupDir);
      const backups = files
        .filter(f => f.startsWith('blogPosts.backup-'))
        .sort()
        .reverse();

      // Delete old backups
      for (let i = 5; i < backups.length; i++) {
        await fs.unlink(path.join(backupDir, backups[i]));
      }

      return backupPath;
    } catch (error) {
      logger.error('Error creating backup', { error: error.message });
      throw error;
    }
  }
}
