/**
 * Test Script for Auto-Blogging System
 * Tests all components before deploying
 */

import dotenv from 'dotenv';
dotenv.config();

import { logger } from './src/logger.js';
import { keywordResearcher } from './src/keywordResearcher.js';
import { initContentGenerator } from './src/contentGenerator.js';
import { seoOptimizer } from './src/seoOptimizer.js';
import { imageHandler } from './src/imageHandler.js';
import { BlogManager } from './src/blogManager.js';

const BLOG_DATA_PATH = process.env.BLOG_DATA_PATH || '../src/data/blogPosts.js';

async function runTests() {
  console.log('\n🧪 Testing Auto-Blogging System\n');
  console.log('================================\n');

  let passedTests = 0;
  let failedTests = 0;

  // Test 1: Check environment variables
  console.log('Test 1: Environment Configuration');
  try {
    if (!process.env.ANTHROPIC_API_KEY) {
      throw new Error('ANTHROPIC_API_KEY not found in .env file');
    }
    console.log('✅ Environment variables configured\n');
    passedTests++;
  } catch (error) {
    console.log(`❌ Environment test failed: ${error.message}\n`);
    failedTests++;
    return;
  }

  // Test 2: Keyword Research
  console.log('Test 2: Keyword Research');
  try {
    const keywords = await keywordResearcher.getTrendingKeywords();
    console.log(`✅ Retrieved ${keywords.length} trending keywords`);
    console.log(`   Top keyword: ${keywords[0]?.keyword} (score: ${keywords[0]?.score.toFixed(1)})\n`);
    passedTests++;
  } catch (error) {
    console.log(`❌ Keyword research failed: ${error.message}\n`);
    failedTests++;
  }

  // Test 3: Content Generation
  console.log('Test 3: AI Content Generation');
  try {
    const contentGenerator = initContentGenerator(process.env.ANTHROPIC_API_KEY);
    const testKeywords = [
      { keyword: 'trading strategies', score: 100 },
      { keyword: 'technical analysis', score: 90 },
      { keyword: 'risk management', score: 85 }
    ];

    console.log('   Generating test blog post (this may take 30-60 seconds)...');
    const post = await contentGenerator.generateBlogPost(testKeywords);

    console.log(`✅ Blog post generated successfully`);
    console.log(`   Title: ${post.title}`);
    console.log(`   Words: ${post.content.split(' ').length}`);
    console.log(`   Category: ${post.category}`);
    console.log(`   Tags: ${post.tags.join(', ')}\n`);
    passedTests++;

    // Test 4: SEO Optimization
    console.log('Test 4: SEO Analysis');
    try {
      const seoScore = seoOptimizer.analyzeSEOScore(post, testKeywords[0].keyword);
      console.log(`✅ SEO analysis complete`);
      console.log(`   Score: ${seoScore.percentage.toFixed(1)}% (${seoScore.grade})`);
      console.log(`   Issues: ${seoScore.issues.length}`);
      console.log(`   Suggestions: ${seoScore.suggestions.length}\n`);
      passedTests++;
    } catch (error) {
      console.log(`❌ SEO analysis failed: ${error.message}\n`);
      failedTests++;
    }

    // Test 5: Image Handler
    console.log('Test 5: Image Handling');
    try {
      const imageUrl = await imageHandler.getImage('test-post-' + Date.now(), ['trading', 'stocks']);
      console.log(`✅ Image created/retrieved`);
      console.log(`   URL: ${imageUrl}\n`);
      passedTests++;
    } catch (error) {
      console.log(`❌ Image handling failed: ${error.message}\n`);
      failedTests++;
    }

    // Test 6: Blog Manager (dry run - don't actually add post)
    console.log('Test 6: Blog Manager');
    try {
      const blogManager = new BlogManager(BLOG_DATA_PATH);
      const stats = await blogManager.getStatistics();

      console.log(`✅ Blog manager operational`);
      console.log(`   Total posts: ${stats.totalPosts}`);
      console.log(`   Posts today: ${stats.postsToday}`);
      console.log(`   Categories: trading-strategies(${stats.categories['trading-strategies']}), market-analysis(${stats.categories['market-analysis']}), education(${stats.categories['education']})\n`);
      passedTests++;
    } catch (error) {
      console.log(`❌ Blog manager test failed: ${error.message}\n`);
      failedTests++;
    }

  } catch (error) {
    console.log(`❌ Content generation failed: ${error.message}\n`);
    failedTests++;
  }

  // Summary
  console.log('================================');
  console.log(`\n📊 Test Results: ${passedTests} passed, ${failedTests} failed\n`);

  if (failedTests === 0) {
    console.log('🎉 All tests passed! System is ready for deployment.\n');
    console.log('Next steps:');
    console.log('1. Set ENABLE_AUTO_POSTING=true in .env to enable automatic posting');
    console.log('2. Run: npm start');
    console.log('3. Or deploy to VPS with systemd service\n');
    return 0;
  } else {
    console.log('⚠️  Some tests failed. Please fix the issues before deploying.\n');
    return 1;
  }
}

// Run tests
runTests()
  .then(exitCode => process.exit(exitCode))
  .catch(error => {
    console.error('Test script error:', error);
    process.exit(1);
  });
