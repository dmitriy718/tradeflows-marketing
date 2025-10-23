/**
 * Image Handler - Manages blog post images
 * Creates placeholder images or fetches from unsplash/pexels
 */

import axios from 'axios';
import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { logger } from './logger.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export class ImageHandler {
  constructor() {
    this.imageDir = path.resolve(__dirname, '../../public/blog/images');
    this.unsplashAccessKey = process.env.UNSPLASH_ACCESS_KEY || null;
  }

  /**
   * Get or create image for blog post
   */
  async getImage(slug, keywords) {
    try {
      const imagePath = path.join(this.imageDir, `${slug}.jpg`);

      // Check if image already exists
      try {
        await fs.access(imagePath);
        logger.info('Image already exists', { slug });
        return `/blog/images/${slug}.jpg`;
      } catch {
        // Image doesn't exist, create it
      }

      // Ensure directory exists
      await fs.mkdir(this.imageDir, { recursive: true });

      // Try to get image from Unsplash
      if (this.unsplashAccessKey) {
        try {
          const image = await this.fetchUnsplashImage(keywords[0]);
          await this.saveAndOptimizeImage(image, imagePath);
          logger.info('Unsplash image saved', { slug });
          return `/blog/images/${slug}.jpg`;
        } catch (error) {
          logger.warn('Failed to fetch Unsplash image', { error: error.message });
        }
      }

      // Create placeholder image
      await this.createPlaceholderImage(slug, imagePath);
      logger.info('Placeholder image created', { slug });

      return `/blog/images/${slug}.jpg`;
    } catch (error) {
      logger.error('Error handling image', { error: error.message });
      // Return a generic placeholder path
      return `/blog/images/placeholder.jpg`;
    }
  }

  /**
   * Fetch image from Unsplash
   */
  async fetchUnsplashImage(keyword) {
    const response = await axios.get('https://api.unsplash.com/photos/random', {
      params: {
        query: `trading stock market finance ${keyword}`,
        orientation: 'landscape',
        content_filter: 'high'
      },
      headers: {
        'Authorization': `Client-ID ${this.unsplashAccessKey}`
      }
    });

    // Download the image
    const imageResponse = await axios.get(response.data.urls.regular, {
      responseType: 'arraybuffer'
    });

    return Buffer.from(imageResponse.data);
  }

  /**
   * Save and optimize image
   */
  async saveAndOptimizeImage(imageBuffer, outputPath) {
    await sharp(imageBuffer)
      .resize(1200, 630, { // OG image size
        fit: 'cover',
        position: 'center'
      })
      .jpeg({ quality: 85, progressive: true })
      .toFile(outputPath);

    // Create WebP version
    const webpPath = outputPath.replace('.jpg', '.webp');
    await sharp(imageBuffer)
      .resize(1200, 630, {
        fit: 'cover',
        position: 'center'
      })
      .webp({ quality: 85 })
      .toFile(webpPath);

    logger.info('Image optimized', { jpg: outputPath, webp: webpPath });
  }

  /**
   * Create a professional placeholder image
   */
  async createPlaceholderImage(slug, outputPath) {
    // Create a gradient image with text overlay
    const width = 1200;
    const height = 630;

    // Generate a blue gradient (TradeFlows brand color)
    const svg = `
      <svg width="${width}" height="${height}">
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#1e293b;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#3b9eff;stop-opacity:1" />
          </linearGradient>
        </defs>
        <rect width="${width}" height="${height}" fill="url(#grad)" />
        <text x="50%" y="45%" font-family="Arial, sans-serif" font-size="48"
              font-weight="bold" fill="white" text-anchor="middle"
              dominant-baseline="middle">TradeFlows Pro</text>
        <text x="50%" y="60%" font-family="Arial, sans-serif" font-size="32"
              fill="rgba(255,255,255,0.9)" text-anchor="middle"
              dominant-baseline="middle">Professional Trading Blog</text>
      </svg>
    `;

    await sharp(Buffer.from(svg))
      .jpeg({ quality: 90 })
      .toFile(outputPath);

    // Create WebP version
    const webpPath = outputPath.replace('.jpg', '.webp');
    await sharp(Buffer.from(svg))
      .webp({ quality: 90 })
      .toFile(webpPath);
  }

  /**
   * Get image metadata
   */
  async getImageMetadata(imagePath) {
    try {
      const fullPath = path.join(this.imageDir, imagePath.replace('/blog/images/', ''));
      const metadata = await sharp(fullPath).metadata();

      return {
        width: metadata.width,
        height: metadata.height,
        format: metadata.format,
        size: metadata.size
      };
    } catch (error) {
      logger.error('Error getting image metadata', { error: error.message });
      return null;
    }
  }

  /**
   * Clean up old images (keep last 100)
   */
  async cleanupOldImages() {
    try {
      const files = await fs.readdir(this.imageDir);
      const images = files.filter(f => f.endsWith('.jpg') || f.endsWith('.webp'));

      if (images.length <= 200) { // 100 posts × 2 formats
        return;
      }

      // Sort by creation time
      const imagesWithStats = await Promise.all(
        images.map(async (file) => {
          const stats = await fs.stat(path.join(this.imageDir, file));
          return { file, mtime: stats.mtime };
        })
      );

      imagesWithStats.sort((a, b) => a.mtime - b.mtime);

      // Delete oldest images
      const toDelete = imagesWithStats.slice(0, imagesWithStats.length - 200);
      for (const { file } of toDelete) {
        await fs.unlink(path.join(this.imageDir, file));
      }

      logger.info('Old images cleaned up', { deleted: toDelete.length });
    } catch (error) {
      logger.error('Error cleaning up images', { error: error.message });
    }
  }
}

export const imageHandler = new ImageHandler();
