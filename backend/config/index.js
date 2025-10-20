import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default {
  // Server
  port: process.env.PORT || 3001,
  nodeEnv: process.env.NODE_ENV || 'development',

  // Database
  database: {
    path: process.env.DB_PATH || join(__dirname, '..', 'database', 'posts.db')
  },

  // Content Generation
  content: {
    minPostsPerDay: parseInt(process.env.MIN_POSTS_PER_DAY) || 3,
    maxPostsPerDay: parseInt(process.env.MAX_POSTS_PER_DAY) || 3,
    postTimes: (process.env.POST_TIMES || '08:00,12:00,17:00').split(','),

    // Content variety weights
    templateWeights: {
      'market-analysis': 0.25,
      'trading-strategy': 0.20,
      'ai-insights': 0.15,
      'viral-topic': 0.15,
      'educational': 0.10,
      'crypto-update': 0.10,
      'news-commentary': 0.05
    }
  },

  // API Keys
  apis: {
    openai: process.env.OPENAI_API_KEY,
    googleTrends: process.env.GOOGLE_TRENDS_API_KEY,
    twitter: process.env.TWITTER_API_KEY,
    reddit: {
      clientId: process.env.REDDIT_CLIENT_ID,
      clientSecret: process.env.REDDIT_CLIENT_SECRET
    }
  },

  // Frontend Integration
  frontend: {
    blogDataPath: process.env.FRONTEND_PATH || join(__dirname, '..', '..', 'src', 'data', 'blogPosts.js'),
    buildCommand: process.env.BUILD_COMMAND || 'npm run build',
    deployCommand: process.env.DEPLOY_COMMAND || ''
  },

  // Features
  features: {
    enableViralKeywords: process.env.ENABLE_VIRAL_KEYWORDS === 'true',
    enableAutoBuild: process.env.ENABLE_AUTO_BUILD === 'true',
    enableAnalytics: process.env.ENABLE_ANALYTICS === 'true'
  },

  // Logging
  logging: {
    level: process.env.LOG_LEVEL || 'info',
    file: process.env.LOG_FILE || 'logs/backend.log'
  },

  // SEO Keywords
  seoKeywords: [
    'AI trading strategies',
    'stock market analysis',
    'cryptocurrency trading',
    'forex trading tips',
    'portfolio management',
    'technical analysis',
    'trading indicators',
    'market trends 2025',
    'algorithmic trading',
    'risk management trading',
    'day trading strategies',
    'swing trading',
    'options trading',
    'futures trading',
    'market volatility',
    'trading psychology',
    'backtesting strategies',
    'automated trading',
    'trade signals',
    'market sentiment analysis',
    'bitcoin trading',
    'ethereum analysis',
    'stock picks today',
    'trading platform',
    'best trading app',
    'trading tools',
    'market news',
    'trading education',
    'profit strategies',
    'trading automation'
  ],

  // Post Categories
  categories: [
    'trading-strategies',
    'market-analysis',
    'platform-updates',
    'education',
    'company-news',
    'crypto',
    'ai-insights',
    'viral-topics'
  ]
};