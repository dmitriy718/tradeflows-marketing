#!/usr/bin/env node

/**
 * Generate Post Now Script
 *
 * Quickly generate and publish a post without waiting for schedule
 *
 * Usage: node backend/scripts/generatePostNow.js
 */

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '..', '.env') });

import logger from '../utils/logger.js';
import db from '../database/index.js';
import postScheduler from '../scheduler/postScheduler.js';

console.log('\n🚀 Generating post now...\n');

async function generateNow() {
  try {
    // Initialize database
    await db.initialize();

    // Generate post
    const post = await postScheduler.generatePostNow();

    if (post) {
      console.log('✅ SUCCESS!');
      console.log(`\nPost: "${post.title}"`);
      console.log(`Slug: ${post.slug}`);
      console.log(`Category: ${post.category}`);
      console.log(`Published: ${post.publishedAt}\n`);
    } else {
      console.log('❌ Post generation failed\n');
      process.exit(1);
    }

    process.exit(0);

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

generateNow();