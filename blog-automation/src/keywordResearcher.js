/**
 * Keyword Researcher - Finds trending trading/finance keywords
 * Uses multiple sources to identify hot topics
 */

import axios from 'axios';
import { logger } from './logger.js';

// Trading/Finance related categories and keywords
const TRADING_KEYWORDS = [
  'bitcoin', 'ethereum', 'stock trading', 'forex', 'crypto trading',
  'day trading', 'swing trading', 'technical analysis', 'candlestick patterns',
  'trading strategies', 'bull market', 'bear market', 'volatility',
  'risk management', 'portfolio management', 'market analysis',
  'options trading', 'futures trading', 'algorithmic trading',
  'trend following', 'momentum trading', 'scalping', 'breakout trading'
];

const POPULAR_STOCKS = [
  'AAPL', 'TSLA', 'NVDA', 'MSFT', 'GOOGL', 'AMZN', 'META', 'AMD', 'NFLX', 'DIS'
];

const POPULAR_CRYPTO = [
  'BTC', 'ETH', 'SOL', 'XRP', 'ADA', 'DOT', 'DOGE', 'MATIC', 'LINK', 'UNI'
];

export class KeywordResearcher {
  constructor() {
    this.cache = new Map();
    this.cacheTimeout = 3600000; // 1 hour
  }

  /**
   * Get trending keywords for today
   */
  async getTrendingKeywords() {
    try {
      const cacheKey = 'trending_' + new Date().toDateString();

      if (this.cache.has(cacheKey)) {
        logger.info('Using cached trending keywords');
        return this.cache.get(cacheKey);
      }

      // Get Google Trends data
      const trendsData = await this.getGoogleTrends();

      // Get market-specific trends
      const marketTrends = await this.getMarketTrends();

      // Combine and score keywords
      const keywords = this.combineAndScore(trendsData, marketTrends);

      this.cache.set(cacheKey, keywords);

      // Clear cache after timeout
      setTimeout(() => this.cache.delete(cacheKey), this.cacheTimeout);

      logger.info('Trending keywords retrieved', { count: keywords.length });
      return keywords;
    } catch (error) {
      logger.error('Error getting trending keywords', { error: error.message });
      // Return fallback keywords if API fails
      return this.getFallbackKeywords();
    }
  }

  /**
   * Get trending keywords from curated list
   * Rotates based on day to provide variety
   */
  async getGoogleTrends() {
    try {
      const trends = [];

      // Sample keywords with rotation based on day
      const dayOfWeek = new Date().getDay();
      const offset = dayOfWeek * 3;
      const sampleKeywords = [
        ...TRADING_KEYWORDS.slice(offset, offset + 5),
        ...TRADING_KEYWORDS.slice(0, Math.max(0, 5 - (TRADING_KEYWORDS.length - offset)))
      ].slice(0, 5);

      // Assign scores based on relevance and time
      sampleKeywords.forEach((keyword, idx) => {
        trends.push({
          keyword,
          score: 95 - (idx * 5), // 95, 90, 85, 80, 75
          source: 'curated_trends'
        });
      });

      return trends;
    } catch (error) {
      logger.warn('Keyword selection error', { error: error.message });
      return [];
    }
  }

  /**
   * Get market-specific trends (stocks, crypto)
   */
  async getMarketTrends() {
    const trends = [];

    // Add popular stocks with high score
    POPULAR_STOCKS.forEach(stock => {
      trends.push({
        keyword: stock,
        score: 70 + Math.random() * 30, // 70-100 score
        source: 'popular_stocks'
      });
    });

    // Add popular crypto
    POPULAR_CRYPTO.forEach(crypto => {
      trends.push({
        keyword: crypto,
        score: 60 + Math.random() * 40, // 60-100 score
        source: 'popular_crypto'
      });
    });

    return trends;
  }

  /**
   * Combine and score all keyword sources
   */
  combineAndScore(trendsData, marketTrends) {
    const keywordMap = new Map();

    // Process all trends
    [...trendsData, ...marketTrends].forEach(item => {
      const key = item.keyword.toLowerCase();
      if (keywordMap.has(key)) {
        // Increase score if keyword appears multiple times
        keywordMap.get(key).score += item.score * 0.5;
        keywordMap.get(key).sources.push(item.source);
      } else {
        keywordMap.set(key, {
          keyword: item.keyword,
          score: item.score,
          sources: [item.source]
        });
      }
    });

    // Convert to array and sort by score
    return Array.from(keywordMap.values())
      .sort((a, b) => b.score - a.score)
      .slice(0, 20); // Top 20 keywords
  }

  /**
   * Get fallback keywords if API fails
   */
  getFallbackKeywords() {
    const date = new Date();
    const dayOfYear = Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);

    // Rotate through keywords based on day of year
    const startIdx = dayOfYear % TRADING_KEYWORDS.length;
    const keywords = [
      ...TRADING_KEYWORDS.slice(startIdx, startIdx + 10),
      ...this.getRandomSample(POPULAR_STOCKS, 3),
      ...this.getRandomSample(POPULAR_CRYPTO, 3)
    ];

    return keywords.map((keyword, idx) => ({
      keyword,
      score: 100 - (idx * 5),
      sources: ['fallback']
    }));
  }

  /**
   * Get random sample from array
   */
  getRandomSample(array, count) {
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  /**
   * Get related keywords for a topic
   */
  getRelatedKeywords(mainKeyword) {
    const related = [];

    // Add trading-related terms
    const modifiers = [
      'strategy', 'analysis', 'guide', 'tips', 'tutorial',
      'indicators', 'signals', 'patterns', 'forecast', 'prediction'
    ];

    modifiers.forEach(mod => {
      related.push(`${mainKeyword} ${mod}`);
    });

    return related;
  }
}

export const keywordResearcher = new KeywordResearcher();
