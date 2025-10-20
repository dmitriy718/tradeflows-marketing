import templates from './templates.js';
import config from '../config/index.js';
import logger from '../utils/logger.js';
import { format } from 'date-fns';

class ContentGenerator {
  constructor() {
    this.usedTopics = new Set();
    this.recentTemplates = [];
  }

  async generate(options = {}) {
    const { timeSlot, trends = [], previousPosts = [] } = options;

    try {
      // Select template based on time and variety
      const template = this.selectTemplate(timeSlot, previousPosts);

      // Select keywords to use
      const keywords = this.selectKeywords(trends);

      // Generate content
      const post = this.generateFromTemplate(template, keywords, timeSlot);

      // Add metadata
      post.publishedAt = format(new Date(), 'yyyy-MM-dd');
      post.keywordsUsed = keywords.map(k => k.keyword);
      post.viralScore = this.calculateViralScore(keywords);

      logger.info(`Generated post: ${post.title} (Template: ${template.id})`);

      return post;
    } catch (error) {
      logger.error('Content generation failed:', error);
      throw error;
    }
  }

  selectTemplate(timeSlot, previousPosts) {
    const availableTemplates = [...templates];

    // Filter out recently used templates
    const recentIds = previousPosts.slice(0, 5).map(p => p.templateId);
    const freshTemplates = availableTemplates.filter(t => !recentIds.includes(t.id));

    // Select based on time slot preferences
    let selectedTemplates = freshTemplates;

    if (timeSlot === 'market-open') {
      // Morning: Market analysis, daily outlook
      selectedTemplates = freshTemplates.filter(t =>
        ['market-analysis', 'daily-outlook', 'pre-market'].includes(t.category)
      );
    } else if (timeSlot === 'midday') {
      // Midday: Strategies, education
      selectedTemplates = freshTemplates.filter(t =>
        ['trading-strategy', 'educational', 'technical-analysis'].includes(t.category)
      );
    } else if (timeSlot === 'market-close') {
      // Close: Recap, analysis, tomorrow's outlook
      selectedTemplates = freshTemplates.filter(t =>
        ['market-recap', 'post-analysis', 'tomorrow-outlook'].includes(t.category)
      );
    } else if (timeSlot === 'viral') {
      // Evening: Viral topics, trending news
      selectedTemplates = freshTemplates.filter(t =>
        ['viral-topic', 'breaking-news', 'crypto-update'].includes(t.category)
      );
    }

    // Fallback to any template if none match criteria
    if (selectedTemplates.length === 0) {
      selectedTemplates = freshTemplates.length > 0 ? freshTemplates : availableTemplates;
    }

    // Random selection with slight weighting
    const weights = selectedTemplates.map((t, i) => Math.random() * (1 + i * 0.1));
    const totalWeight = weights.reduce((a, b) => a + b, 0);
    const random = Math.random() * totalWeight;

    let accumulated = 0;
    for (let i = 0; i < selectedTemplates.length; i++) {
      accumulated += weights[i];
      if (random <= accumulated) {
        return selectedTemplates[i];
      }
    }

    return selectedTemplates[0];
  }

  selectKeywords(trends) {
    // Combine trending keywords with SEO keywords
    const seoKeywords = config.seoKeywords;
    const trendingKeywords = trends.slice(0, 10);

    // Mix trending (70%) and evergreen SEO (30%)
    const selectedKeywords = [];

    // Add 2-3 trending keywords if available
    if (trendingKeywords.length > 0) {
      const numTrending = Math.min(3, trendingKeywords.length);
      for (let i = 0; i < numTrending; i++) {
        selectedKeywords.push({
          keyword: trendingKeywords[i].keyword,
          type: 'trending',
          score: trendingKeywords[i].score
        });
      }
    }

    // Add 1-2 SEO keywords
    const numSeo = 2;
    const shuffledSeo = [...seoKeywords].sort(() => Math.random() - 0.5);
    for (let i = 0; i < numSeo && i < shuffledSeo.length; i++) {
      selectedKeywords.push({
        keyword: shuffledSeo[i],
        type: 'seo',
        score: 0.5
      });
    }

    return selectedKeywords;
  }

  generateFromTemplate(template, keywords, timeSlot) {
    const primaryKeyword = keywords[0]?.keyword || 'trading strategies';
    const secondaryKeywords = keywords.slice(1).map(k => k.keyword);

    // Generate dynamic content based on template
    const year = new Date().getFullYear();
    const month = format(new Date(), 'MMMM');
    const date = format(new Date(), 'MMMM d, yyyy');

    // Replace template variables
    let title = template.titlePattern
      .replace('{{keyword}}', primaryKeyword)
      .replace('{{year}}', year)
      .replace('{{month}}', month)
      .replace('{{date}}', date)
      .replace('{{timeframe}}', this.getTimeframe(timeSlot));

    let slug = this.generateSlug(title);

    // Generate excerpt
    const excerpt = template.excerptPattern
      .replace('{{keyword}}', primaryKeyword)
      .replace('{{year}}', year)
      .replace('{{benefits}}', this.generateBenefits(primaryKeyword));

    // Generate content sections
    const content = this.generateContent(template, {
      primaryKeyword,
      secondaryKeywords,
      year,
      month,
      date,
      timeSlot
    });

    return {
      id: slug,
      title,
      slug,
      excerpt,
      content,
      category: template.category,
      tags: this.generateTags(keywords, template.category),
      author: {
        name: this.selectAuthor(),
        role: 'Trading Expert',
        avatar: 'TF'
      },
      featured: Math.random() > 0.7, // 30% chance of being featured
      image: `/blog/images/${slug}.jpg`,
      readTime: this.calculateReadTime(content),
      templateId: template.id
    };
  }

  generateContent(template, vars) {
    const sections = [];

    // Introduction
    sections.push(template.sections.intro
      .replace(/{{keyword}}/g, vars.primaryKeyword)
      .replace(/{{year}}/g, vars.year)
      .replace(/{{month}}/g, vars.month)
      .replace(/{{date}}/g, vars.date)
    );

    // Main sections
    template.sections.main.forEach(section => {
      let sectionContent = section.content
        .replace(/{{keyword}}/g, vars.primaryKeyword)
        .replace(/{{year}}/g, vars.year);

      // Add secondary keywords naturally
      if (vars.secondaryKeywords.length > 0 && Math.random() > 0.5) {
        const keyword = vars.secondaryKeywords[Math.floor(Math.random() * vars.secondaryKeywords.length)];
        sectionContent += `\n\nThis approach is particularly effective when combined with ${keyword}.`;
      }

      sections.push(sectionContent);
    });

    // Add TradeFlows Pro integration
    sections.push(this.generateTradeFlowsSection(vars.primaryKeyword));

    // Conclusion with CTA
    sections.push(template.sections.conclusion
      .replace(/{{keyword}}/g, vars.primaryKeyword)
      .replace(/{{cta}}/g, this.generateCTA(vars.primaryKeyword))
    );

    return sections.join('\n\n');
  }

  generateTradeFlowsSection(keyword) {
    const features = [
      'AI-powered trade recommendations',
      'Real-time market data analysis',
      'Advanced portfolio tracking',
      'Risk management tools',
      'Backtesting capabilities',
      'Smart alerts and notifications',
      'Performance analytics dashboard',
      'Social trading features'
    ];

    const selectedFeatures = features
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);

    return `## How TradeFlows Pro Helps with ${keyword}

Our platform provides professional-grade tools specifically designed for ${keyword}:

${selectedFeatures.map(f => `- **${f}**: Enhance your ${keyword} strategy with cutting-edge technology`).join('\n')}

[Start Your Free 7-Day Trial →](https://app.tradeflows.net?signup=true&utm_source=blog&utm_medium=article&utm_campaign=${this.generateSlug(keyword)})`;
  }

  generateCTA(keyword) {
    const ctas = [
      `Ready to master ${keyword}? Start your free trial today!`,
      `Take your ${keyword} to the next level with TradeFlows Pro`,
      `Join thousands of traders using our ${keyword} tools`,
      `Get instant access to professional ${keyword} features`
    ];

    return ctas[Math.floor(Math.random() * ctas.length)];
  }

  generateBenefits(keyword) {
    const benefits = [
      'improve trading performance',
      'reduce risk and maximize profits',
      'make data-driven decisions',
      'stay ahead of market trends',
      'automate your strategy'
    ];

    return benefits.slice(0, 3).join(', ');
  }

  generateTags(keywords, category) {
    const tags = [category];

    // Add keyword tags
    keywords.forEach(k => {
      if (tags.length < 5) {
        tags.push(k.keyword);
      }
    });

    // Add year and common tags
    tags.push(new Date().getFullYear().toString());
    tags.push('trading');

    return [...new Set(tags)]; // Remove duplicates
  }

  generateSlug(text) {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .substring(0, 60);
  }

  calculateReadTime(content) {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return `${minutes} min read`;
  }

  calculateViralScore(keywords) {
    if (!keywords || keywords.length === 0) return 0;

    // Calculate based on trending keyword scores
    const trendingKeywords = keywords.filter(k => k.type === 'trending');
    if (trendingKeywords.length === 0) return 0.2;

    const avgScore = trendingKeywords.reduce((sum, k) => sum + (k.score || 0), 0) / trendingKeywords.length;
    return Math.min(1, avgScore);
  }

  getTimeframe(timeSlot) {
    const timeframes = {
      'market-open': 'Daily',
      'midday': 'Intraday',
      'market-close': 'End-of-Day',
      'viral': 'Breaking'
    };

    return timeframes[timeSlot] || 'Latest';
  }

  selectAuthor() {
    const authors = [
      'Sarah Mitchell',
      'Marcus Rodriguez',
      'Emily Zhang',
      'TradeFlows AI Team',
      'Alex Thompson',
      'David Chen'
    ];

    return authors[Math.floor(Math.random() * authors.length)];
  }
}

export default new ContentGenerator();