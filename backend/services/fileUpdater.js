import fs from 'fs/promises';
import fsSync from 'fs';
import path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import logger from '../utils/logger.js';
import config from '../config/index.js';

const execAsync = promisify(exec);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

class FileUpdater {
  constructor() {
    this.blogDataPath = config.frontend.blogDataPath;
    this.backupPath = this.blogDataPath + '.backup';
    this.projectRoot = path.join(__dirname, '..', '..');
  }

  /**
   * Main function to update blog data file with new post
   */
  async updateBlogData(post) {
    try {
      logger.info(`Updating blog data file with post: ${post.title}`);

      // Validate post data
      this.validatePostData(post);

      // Create backup of current file
      await this.createBackup();

      // Read current file
      const currentContent = await this.readBlogDataFile();

      // Format new post entry
      const postEntry = this.formatPostEntry(post);

      // Insert new post at beginning of array
      const updatedContent = this.insertPostIntoArray(currentContent, postEntry);

      // Write updated content
      await this.writeBlogDataFile(updatedContent);

      // Verify the update
      await this.verifyUpdate(post.slug);

      logger.info(`✅ Successfully updated blog data file`);

      return true;

    } catch (error) {
      logger.error('Error updating blog data file:', error);

      // Attempt to restore from backup
      try {
        await this.restoreBackup();
        logger.info('Restored from backup after error');
      } catch (restoreError) {
        logger.error('Failed to restore backup:', restoreError);
      }

      throw error;
    }
  }

  /**
   * Validate post has all required fields
   */
  validatePostData(post) {
    const requiredFields = ['id', 'title', 'slug', 'excerpt', 'content', 'category', 'tags'];

    for (const field of requiredFields) {
      if (!post[field]) {
        throw new Error(`Post missing required field: ${field}`);
      }
    }

    // Validate data types
    if (typeof post.title !== 'string') throw new Error('Title must be string');
    if (typeof post.slug !== 'string') throw new Error('Slug must be string');
    if (!Array.isArray(post.tags)) throw new Error('Tags must be array');

    logger.debug('Post data validation passed');
  }

  /**
   * Create backup of blog data file
   */
  async createBackup() {
    try {
      if (fsSync.existsSync(this.blogDataPath)) {
        await fs.copyFile(this.blogDataPath, this.backupPath);
        logger.debug(`Backup created: ${this.backupPath}`);
      }
    } catch (error) {
      logger.warn('Failed to create backup:', error);
      // Non-critical, continue
    }
  }

  /**
   * Restore from backup
   */
  async restoreBackup() {
    if (fsSync.existsSync(this.backupPath)) {
      await fs.copyFile(this.backupPath, this.blogDataPath);
      logger.info('Restored from backup');
    }
  }

  /**
   * Read blog data file
   */
  async readBlogDataFile() {
    try {
      const content = await fs.readFile(this.blogDataPath, 'utf8');
      return content;
    } catch (error) {
      logger.error('Error reading blog data file:', error);
      throw new Error(`Cannot read blog data file: ${this.blogDataPath}`);
    }
  }

  /**
   * Write updated content to blog data file
   */
  async writeBlogDataFile(content) {
    try {
      await fs.writeFile(this.blogDataPath, content, 'utf8');
      logger.debug('Blog data file written successfully');
    } catch (error) {
      logger.error('Error writing blog data file:', error);
      throw error;
    }
  }

  /**
   * Format post as JavaScript object string
   */
  formatPostEntry(post) {
    // Escape single quotes in strings
    const escapeQuotes = (str) => {
      if (!str) return '';
      return str.replace(/'/g, "\\'").replace(/\n/g, '\\n');
    };

    // Format author object
    const authorStr = `{
      name: '${escapeQuotes(post.author?.name || 'TradeFlows AI Team')}',
      role: '${escapeQuotes(post.author?.role || 'Trading Expert')}',
      avatar: '${post.author?.avatar || 'TF'}'
    }`;

    // Format the complete post entry
    const postEntry = `
  {
    id: '${post.id}',
    title: '${escapeQuotes(post.title)}',
    slug: '${post.slug}',
    excerpt: '${escapeQuotes(post.excerpt)}',
    category: '${post.category}',
    author: ${authorStr},
    publishDate: '${post.publishedAt || new Date().toISOString().split('T')[0]}',
    readTime: '${post.readTime || '8 min read'}',
    featured: ${post.featured ? 'true' : 'false'},
    image: '${post.image || '/blog/default.jpg'}',
    tags: ${JSON.stringify(post.tags)},
    content: \`${post.content.replace(/`/g, '\\`').replace(/\$/g, '\\$')}\`
  }`;

    return postEntry;
  }

  /**
   * Insert new post at beginning of blogPosts array
   */
  insertPostIntoArray(currentContent, postEntry) {
    // Find the blogPosts array declaration
    const arrayPattern = /export const blogPosts = \[/;

    if (!arrayPattern.test(currentContent)) {
      throw new Error('Could not find blogPosts array in file');
    }

    // Insert new post after the array opening bracket
    const updatedContent = currentContent.replace(
      arrayPattern,
      `export const blogPosts = [${postEntry},`
    );

    return updatedContent;
  }

  /**
   * Verify the update was successful
   */
  async verifyUpdate(slug) {
    try {
      const content = await this.readBlogDataFile();

      if (!content.includes(`slug: '${slug}'`)) {
        throw new Error('Post not found in updated file');
      }

      logger.debug('Update verification passed');
    } catch (error) {
      logger.error('Update verification failed:', error);
      throw error;
    }
  }

  /**
   * Trigger build and deployment process
   */
  async triggerBuild() {
    if (!config.features.enableAutoBuild) {
      logger.info('Auto-build is disabled');
      return false;
    }

    try {
      logger.info('Triggering automated build and deployment...');

      // Use deployment script if configured
      const deployScript = config.frontend.deployCommand;

      if (deployScript && deployScript.endsWith('.sh')) {
        logger.info('Running deployment script: ' + deployScript);

        const { stdout, stderr } = await execAsync(deployScript, {
          timeout: 600000 // 10 minutes for full build+deploy
        });

        if (stderr && !stderr.toLowerCase().includes('warning')) {
          logger.warn('Deploy stderr:', stderr);
        }

        logger.info('✅ Automated deployment completed');
        logger.debug('Deploy output:', stdout);

        return true;
      } else {
        // Fallback to just build command
        logger.info('No deployment script configured, running build only');

        const buildCommand = config.frontend.buildCommand;
        const { stdout, stderr } = await execAsync(buildCommand, {
          cwd: this.projectRoot,
          timeout: 300000 // 5 minutes
        });

        if (stderr && !stderr.includes('warnings')) {
          logger.warn('Build warnings:', stderr);
        }

        logger.info('✅ Build completed successfully');
        logger.debug('Build output:', stdout);

        return true;
      }

    } catch (error) {
      logger.error('Build/deployment failed:', error);
      return false;
    }
  }

  /**
   * Deploy to production (if configured)
   */
  async deploy() {
    if (!config.frontend.deployCommand) {
      logger.info('No deploy command configured');
      return false;
    }

    try {
      logger.info('Deploying to production...');

      const deployCommand = config.frontend.deployCommand;
      const { stdout, stderr } = await execAsync(deployCommand, {
        cwd: this.projectRoot,
        timeout: 600000 // 10 minutes
      });

      if (stderr) {
        logger.warn('Deploy warnings:', stderr);
      }

      logger.info('✅ Deployment completed successfully');
      logger.debug('Deploy output:', stdout);

      return true;

    } catch (error) {
      logger.error('Deployment failed:', error);
      return false;
    }
  }

  /**
   * Get statistics about blog data file
   */
  async getStats() {
    try {
      const content = await this.readBlogDataFile();

      // Count posts
      const postCount = (content.match(/\bid:\s*'/g) || []).length;

      // Get file size
      const stats = await fs.stat(this.blogDataPath);
      const fileSizeKB = (stats.size / 1024).toFixed(2);

      // Last modified
      const lastModified = stats.mtime;

      return {
        postCount,
        fileSizeKB,
        lastModified,
        path: this.blogDataPath
      };

    } catch (error) {
      logger.error('Error getting stats:', error);
      return null;
    }
  }

  /**
   * Clean up old backup files
   */
  async cleanupBackups() {
    try {
      if (fsSync.existsSync(this.backupPath)) {
        await fs.unlink(this.backupPath);
        logger.debug('Backup file cleaned up');
      }
    } catch (error) {
      logger.warn('Failed to cleanup backup:', error);
    }
  }
}

// Export singleton instance
export default new FileUpdater();