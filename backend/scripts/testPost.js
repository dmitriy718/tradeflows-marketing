#!/usr/bin/env node

/**
 * Test Post Generation Script
 *
 * This script tests the complete post generation pipeline:
 * - Fetches trending keywords
 * - Generates post content
 * - Saves to database
 * - Updates frontend file
 *
 * Usage: node backend/scripts/testPost.js
 */

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';

// Load environment variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '..', '.env') });

// Import services
import logger from '../utils/logger.js';
import db from '../database/index.js';
import contentGenerator from '../content/generator.js';
import trendingService from '../services/trendingService.js';
import seoOptimizer from '../services/seoOptimizer.js';
import fileUpdater from '../services/fileUpdater.js';

console.log('========================================');
console.log('TradeFlows Post Generation Test');
console.log('========================================\n');

async function testPostGeneration() {
  try {
    // Step 1: Initialize database
    console.log('📦 Initializing database...');
    await db.initialize();
    console.log('✅ Database initialized\n');

    // Step 2: Fetch trending keywords
    console.log('🔥 Fetching trending keywords...');
    const trends = await trendingService.getCurrentTrends();
    console.log(`✅ Found ${trends.length} trending keywords`);
    console.log(`   Top 5: ${trends.slice(0, 5).map(t => t.keyword).join(', ')}\n`);

    // Step 3: Generate post content
    console.log('✍️  Generating post content...');
    const post = await contentGenerator.generate({
      timeSlot: 'test',
      trends: trends.slice(0, 10),
      previousPosts: db.getRecentPosts(5)
    });

    if (!post) {
      throw new Error('Post generation failed');
    }

    console.log('✅ Post generated successfully');
    console.log(`   Title: ${post.title}`);
    console.log(`   Category: ${post.category}`);
    console.log(`   Keywords: ${post.keywordsUsed?.join(', ') || 'none'}`);
    console.log(`   Viral Score: ${post.viralScore?.toFixed(2) || 0}\n`);

    // Step 4: Optimize for SEO
    console.log('🎯 Optimizing for SEO...');
    const optimizedPost = await seoOptimizer.optimize(post);
    console.log('✅ SEO optimization complete\n');

    // Step 5: Save to database
    console.log('💾 Saving to database...');
    const postId = db.savePost(optimizedPost);
    console.log(`✅ Post saved with ID: ${postId}\n`);

    // Step 6: Update frontend file
    console.log('📝 Updating frontend blogPosts.js...');
    const updated = await fileUpdater.updateBlogData(optimizedPost);

    if (updated) {
      console.log('✅ Frontend file updated successfully\n');
    } else {
      throw new Error('Frontend file update failed');
    }

    // Step 7: Display statistics
    console.log('📊 Database Statistics:');
    const stats = db.getStats();
    console.log(`   Total Posts: ${stats.totalPosts}`);
    console.log(`   Today's Posts: ${stats.todayPosts}`);
    console.log(`   Total Keywords: ${stats.totalKeywords}`);
    console.log(`   Avg Viral Score: ${stats.avgViralScore}\n`);

    // Step 8: Display file statistics
    console.log('📁 File Statistics:');
    const fileStats = await fileUpdater.getStats();
    if (fileStats) {
      console.log(`   Posts in File: ${fileStats.postCount}`);
      console.log(`   File Size: ${fileStats.fileSizeKB} KB`);
      console.log(`   Last Modified: ${fileStats.lastModified.toLocaleString()}\n`);
    }

    // Success!
    console.log('========================================');
    console.log('✨ TEST COMPLETED SUCCESSFULLY! ✨');
    console.log('========================================\n');
    console.log('Next steps:');
    console.log('1. Check src/data/blogPosts.js to see the new post');
    console.log('2. Run "npm run dev" to view it in the browser');
    console.log('3. Check backend/database/posts.db for database entry\n');

    process.exit(0);

  } catch (error) {
    console.error('\n❌ TEST FAILED:', error.message);
    console.error('\nFull error:', error);
    process.exit(1);
  }
}

// Run the test
testPostGeneration();