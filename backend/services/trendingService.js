import axios from 'axios';
import * as cheerio from 'cheerio';
import logger from '../utils/logger.js';
import db from '../database/index.js';

class TrendingService {
  constructor() {
    this.cache = new Map();
    this.cacheTimeout = 3600000; // 1 hour cache
  }

  async getCurrentTrends() {
    try {
      // Check cache first
      if (this.cache.has('trends')) {
        const cached = this.cache.get('trends');
        if (Date.now() - cached.timestamp < this.cacheTimeout) {
          logger.info('Using cached trends');
          return cached.data;
        }
      }

      logger.info('Fetching fresh trending keywords...');

      // Fetch from multiple sources
      const sources = await Promise.allSettled([
        this.getRedditTrends(),
        this.getFinancialNewsTrends(),
        this.getStockTrends(),
        this.getCryptoTrends()
      ]);

      // Combine and process results
      const allTrends = [];

      sources.forEach((result, index) => {
        if (result.status === 'fulfilled' && result.value) {
          allTrends.push(...result.value);
        } else if (result.status === 'rejected') {
          logger.warn(`Trend source ${index} failed:`, result.reason);
        }
      });

      // Rank and deduplicate
      const rankedTrends = this.rankKeywords(allTrends);

      // Save to database
      rankedTrends.forEach(trend => {
        db.saveKeyword(trend.keyword, trend.source, trend.score);
      });

      // Cache results
      this.cache.set('trends', {
        data: rankedTrends,
        timestamp: Date.now()
      });

      logger.info(`Found ${rankedTrends.length} trending keywords`);
      return rankedTrends;

    } catch (error) {
      logger.error('Error fetching trends:', error);
      // Return cached data if available
      if (this.cache.has('trends')) {
        return this.cache.get('trends').data;
      }
      return [];
    }
  }

  async getRedditTrends() {
    const trends = [];

    try {
      // Fetch from multiple trading subreddits
      const subreddits = [
        'wallstreetbets',
        'stocks',
        'StockMarket',
        'investing',
        'cryptocurrency',
        'CryptoCurrency',
        'daytrading',
        'options'
      ];

      for (const subreddit of subreddits.slice(0, 3)) { // Limit to avoid rate limiting
        try {
          const response = await axios.get(
            `https://www.reddit.com/r/${subreddit}/hot.json?limit=10`,
            {
              headers: {
                'User-Agent': 'TradeFlows Bot 1.0'
              },
              timeout: 5000
            }
          );

          if (response.data && response.data.data && response.data.data.children) {
            response.data.data.children.forEach(post => {
              const title = post.data.title;
              const score = post.data.score;
              const comments = post.data.num_comments;

              // Extract tickers and keywords
              const tickers = this.extractTickers(title);
              const keywords = this.extractKeywords(title);

              // Calculate viral score
              const viralScore = this.calculateViralScore(score, comments);

              tickers.forEach(ticker => {
                trends.push({
                  keyword: ticker,
                  source: `reddit-${subreddit}`,
                  score: viralScore,
                  type: 'ticker'
                });
              });

              keywords.forEach(keyword => {
                trends.push({
                  keyword,
                  source: `reddit-${subreddit}`,
                  score: viralScore * 0.8, // Slightly lower score for general keywords
                  type: 'keyword'
                });
              });
            });
          }
        } catch (err) {
          logger.warn(`Failed to fetch r/${subreddit}:`, err.message);
        }
      }
    } catch (error) {
      logger.error('Reddit trends error:', error);
    }

    return trends;
  }

  async getFinancialNewsTrends() {
    const trends = [];

    try {
      // Fetch from Yahoo Finance trending tickers
      const response = await axios.get(
        'https://finance.yahoo.com/trending-tickers',
        {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
          },
          timeout: 5000
        }
      );

      const $ = cheerio.load(response.data);

      // Extract trending tickers
      $('a[href*="/quote/"]').each((i, elem) => {
        const ticker = $(elem).text().trim();
        if (ticker && ticker.length <= 5 && /^[A-Z]+$/.test(ticker)) {
          trends.push({
            keyword: ticker,
            source: 'yahoo-finance',
            score: 0.7 - (i * 0.05), // Decrease score by position
            type: 'ticker'
          });
        }
      });

      // Extract trending topics from headlines
      $('h3').each((i, elem) => {
        const headline = $(elem).text().trim();
        if (headline) {
          const keywords = this.extractKeywords(headline);
          keywords.forEach(keyword => {
            trends.push({
              keyword,
              source: 'yahoo-finance',
              score: 0.6,
              type: 'topic'
            });
          });
        }
      });

    } catch (error) {
      logger.error('Financial news trends error:', error);
    }

    return trends.slice(0, 20); // Limit results
  }

  async getStockTrends() {
    const trends = [];

    // Simulated trending stocks (in production, would fetch from real API)
    const trendingStocks = [
      { ticker: 'NVDA', topic: 'AI chip demand', score: 0.9 },
      { ticker: 'TSLA', topic: 'EV market', score: 0.85 },
      { ticker: 'AAPL', topic: 'iPhone sales', score: 0.8 },
      { ticker: 'MSFT', topic: 'cloud growth', score: 0.75 },
      { ticker: 'AMD', topic: 'datacenter chips', score: 0.7 },
      { ticker: 'META', topic: 'metaverse', score: 0.65 },
      { ticker: 'AMZN', topic: 'e-commerce', score: 0.6 },
      { ticker: 'GOOGL', topic: 'search advertising', score: 0.55 }
    ];

    trendingStocks.forEach(stock => {
      trends.push({
        keyword: stock.ticker,
        source: 'stock-market',
        score: stock.score,
        type: 'ticker'
      });

      trends.push({
        keyword: stock.topic,
        source: 'stock-market',
        score: stock.score * 0.8,
        type: 'topic'
      });
    });

    return trends;
  }

  async getCryptoTrends() {
    const trends = [];

    try {
      // Simulated crypto trends (in production, would use CoinGecko or similar API)
      const cryptoTrends = [
        { symbol: 'BTC', name: 'Bitcoin', topic: 'bitcoin halving', score: 0.95 },
        { symbol: 'ETH', name: 'Ethereum', topic: 'ethereum upgrade', score: 0.9 },
        { symbol: 'SOL', name: 'Solana', topic: 'solana DeFi', score: 0.85 },
        { symbol: 'BNB', name: 'Binance', topic: 'binance chain', score: 0.75 },
        { symbol: 'XRP', name: 'Ripple', topic: 'XRP lawsuit', score: 0.7 }
      ];

      cryptoTrends.forEach(crypto => {
        trends.push({
          keyword: crypto.symbol,
          source: 'crypto',
          score: crypto.score,
          type: 'crypto'
        });

        trends.push({
          keyword: crypto.name.toLowerCase(),
          source: 'crypto',
          score: crypto.score * 0.9,
          type: 'crypto'
        });

        trends.push({
          keyword: crypto.topic,
          source: 'crypto',
          score: crypto.score * 0.8,
          type: 'topic'
        });
      });

    } catch (error) {
      logger.error('Crypto trends error:', error);
    }

    return trends;
  }

  extractTickers(text) {
    const tickers = [];
    // Match $TICKER or TICKER pattern (2-5 uppercase letters)
    const tickerPattern = /\$?([A-Z]{2,5})\b/g;
    let match;

    while ((match = tickerPattern.exec(text)) !== null) {
      const ticker = match[1];
      // Filter out common words that might match pattern
      const commonWords = ['USA', 'CEO', 'IPO', 'FDA', 'SEC', 'NYSE', 'ETF', 'GDP', 'API'];
      if (!commonWords.includes(ticker)) {
        tickers.push(ticker);
      }
    }

    return [...new Set(tickers)]; // Remove duplicates
  }

  extractKeywords(text) {
    const keywords = [];

    // Important financial keywords to look for
    const importantTerms = [
      'earnings', 'revenue', 'profit', 'loss', 'growth', 'decline',
      'bullish', 'bearish', 'rally', 'crash', 'surge', 'plunge',
      'breakout', 'breakdown', 'support', 'resistance', 'momentum',
      'AI', 'artificial intelligence', 'blockchain', 'crypto', 'bitcoin',
      'inflation', 'recession', 'fed', 'interest rates', 'GDP',
      'merger', 'acquisition', 'IPO', 'buyback', 'dividend',
      'short squeeze', 'gamma squeeze', 'options', 'calls', 'puts'
    ];

    const lowerText = text.toLowerCase();

    importantTerms.forEach(term => {
      if (lowerText.includes(term.toLowerCase())) {
        keywords.push(term);
      }
    });

    // Extract company names (simplified)
    const companyPatterns = [
      /tesla/i, /apple/i, /microsoft/i, /amazon/i, /google/i,
      /nvidia/i, /meta/i, /netflix/i, /amd/i, /intel/i
    ];

    companyPatterns.forEach(pattern => {
      if (pattern.test(text)) {
        const match = text.match(pattern);
        if (match) {
          keywords.push(match[0].toLowerCase());
        }
      }
    });

    return [...new Set(keywords)].slice(0, 5); // Limit to 5 keywords
  }

  calculateViralScore(upvotes, comments) {
    // Normalize scores (logarithmic scale for large numbers)
    const upvoteScore = Math.log10(Math.max(upvotes, 1)) / 5;
    const commentScore = Math.log10(Math.max(comments, 1)) / 4;

    // Weighted average (upvotes slightly more important)
    const score = (upvoteScore * 0.6 + commentScore * 0.4);

    // Normalize to 0-1 range
    return Math.min(1, Math.max(0, score));
  }

  rankKeywords(allTrends) {
    // Group by keyword and aggregate scores
    const keywordMap = new Map();

    allTrends.forEach(trend => {
      const key = trend.keyword.toLowerCase();

      if (keywordMap.has(key)) {
        const existing = keywordMap.get(key);
        existing.score = Math.max(existing.score, trend.score);
        existing.sources.add(trend.source);
        existing.count++;
      } else {
        keywordMap.set(key, {
          keyword: trend.keyword,
          score: trend.score,
          sources: new Set([trend.source]),
          count: 1,
          type: trend.type
        });
      }
    });

    // Convert to array and calculate final scores
    const ranked = Array.from(keywordMap.values()).map(item => ({
      keyword: item.keyword,
      score: item.score * (1 + item.count * 0.1), // Boost for multiple sources
      source: Array.from(item.sources).join(', '),
      type: item.type,
      mentions: item.count
    }));

    // Sort by score
    ranked.sort((a, b) => b.score - a.score);

    // Normalize scores to 0-1 range
    if (ranked.length > 0) {
      const maxScore = ranked[0].score;
      ranked.forEach(item => {
        item.score = item.score / maxScore;
      });
    }

    return ranked.slice(0, 30); // Return top 30
  }
}

export default new TrendingService();