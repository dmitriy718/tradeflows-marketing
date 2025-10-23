/**
 * AI Content Generator - Uses Claude API to generate SEO-optimized blog posts
 */

import Anthropic from '@anthropic-ai/sdk';
import { logger } from './logger.js';
import { seoOptimizer } from './seoOptimizer.js';
import slugify from 'slugify';

export class ContentGenerator {
  constructor(apiKey) {
    this.client = new Anthropic({ apiKey });
    this.model = 'claude-3-5-sonnet-20241022';
  }

  /**
   * Generate a complete blog post with SEO optimization
   */
  async generateBlogPost(keywords) {
    try {
      const mainKeyword = keywords[0]?.keyword || 'trading strategies';
      const relatedKeywords = keywords.slice(1, 6).map(k => k.keyword);

      logger.info('Generating blog post', { mainKeyword, relatedKeywords });

      // Generate title
      const title = await this.generateTitle(mainKeyword, relatedKeywords);

      // Generate content
      const content = await this.generateContent(title, mainKeyword, relatedKeywords);

      // Generate meta description
      const metaDescription = await this.generateMetaDescription(title, content);

      // Create slug
      const slug = slugify(title, { lower: true, strict: true });

      // Select category
      const category = this.selectCategory(mainKeyword, content);

      // Generate tags
      const tags = this.generateTags(mainKeyword, relatedKeywords, content);

      // Calculate read time
      const readTime = this.calculateReadTime(content);

      // Create blog post object
      const blogPost = {
        id: Date.now().toString(),
        title,
        slug,
        excerpt: metaDescription,
        category,
        author: this.selectAuthor(category),
        publishDate: new Date().toISOString().split('T')[0],
        readTime,
        featured: false,
        image: `/blog/images/${slug}.jpg`,
        tags,
        content,
        seo: {
          metaTitle: seoOptimizer.generateMetaTitle(title),
          metaDescription,
          keywords: [mainKeyword, ...relatedKeywords],
          ogTitle: title,
          ogDescription: metaDescription,
          ogImage: `/blog/images/${slug}.jpg`,
          twitterCard: 'summary_large_image',
          structuredData: seoOptimizer.generateStructuredData({
            title,
            description: metaDescription,
            publishDate: new Date().toISOString(),
            author: this.selectAuthor(category).name,
            image: `/blog/images/${slug}.jpg`
          })
        }
      };

      logger.info('Blog post generated successfully', {
        title,
        wordCount: content.split(' ').length
      });

      return blogPost;
    } catch (error) {
      logger.error('Error generating blog post', { error: error.message });
      throw error;
    }
  }

  /**
   * Generate an SEO-optimized title
   */
  async generateTitle(mainKeyword, relatedKeywords) {
    const prompt = `Generate a compelling, SEO-optimized blog post title for a trading/finance blog.

Main keyword: ${mainKeyword}
Related keywords: ${relatedKeywords.join(', ')}

Requirements:
- Include the main keyword naturally
- Make it attention-grabbing and click-worthy
- Keep it between 50-60 characters
- Use power words (Ultimate, Complete, Proven, Master, etc.)
- Include numbers if appropriate (e.g., "7 Strategies", "2025 Guide")
- Make it relevant to traders and investors

Generate only the title, nothing else.`;

    const response = await this.client.messages.create({
      model: this.model,
      max_tokens: 100,
      messages: [{ role: 'user', content: prompt }]
    });

    return response.content[0].text.trim().replace(/^["']|["']$/g, '');
  }

  /**
   * Generate comprehensive blog content
   */
  async generateContent(title, mainKeyword, relatedKeywords) {
    const prompt = `Write a comprehensive, SEO-optimized blog post for TradeFlows Pro, a professional trading platform.

Title: ${title}
Main keyword: ${mainKeyword}
Related keywords: ${relatedKeywords.join(', ')}

Requirements:
1. Write 1500-2000 words
2. Use markdown formatting with proper headings (##, ###)
3. Include the main keyword in the first paragraph
4. Use related keywords naturally throughout
5. Include actionable trading strategies and insights
6. Add bullet points and numbered lists for readability
7. Include practical examples
8. End with a strong conclusion and call-to-action to try TradeFlows Pro
9. Make it valuable for both beginner and experienced traders
10. Use a professional, authoritative tone

Structure:
## Introduction (2-3 paragraphs)
## Main Content (4-6 sections with H2 and H3 headings)
## Practical Examples or Case Studies
## Common Mistakes to Avoid
## Conclusion and Next Steps

Write in markdown format. Be specific, actionable, and valuable. Focus on helping traders improve their skills.`;

    const response = await this.client.messages.create({
      model: this.model,
      max_tokens: 4000,
      messages: [{ role: 'user', content: prompt }]
    });

    return response.content[0].text.trim();
  }

  /**
   * Generate meta description
   */
  async generateMetaDescription(title, content) {
    // Extract first 160 characters of meaningful content
    const firstParagraph = content.split('\n\n')[1] || content.split('\n\n')[0];
    const cleaned = firstParagraph.replace(/[#*_]/g, '').trim();

    if (cleaned.length <= 160) {
      return cleaned;
    }

    // Use AI to create a concise meta description
    const prompt = `Create a compelling meta description (max 155 characters) for this blog post:

Title: ${title}

First paragraph: ${cleaned.substring(0, 300)}

Make it action-oriented, include the main benefit, and encourage clicks. Stay under 155 characters.`;

    try {
      const response = await this.client.messages.create({
        model: this.model,
        max_tokens: 100,
        messages: [{ role: 'user', content: prompt }]
      });

      return response.content[0].text.trim().substring(0, 155);
    } catch {
      // Fallback to truncated first paragraph
      return cleaned.substring(0, 152) + '...';
    }
  }

  /**
   * Select appropriate category based on content
   */
  selectCategory(mainKeyword, content) {
    const keyword = mainKeyword.toLowerCase();
    const contentLower = content.toLowerCase();

    if (keyword.includes('strategy') || contentLower.includes('trading strategy')) {
      return 'trading-strategies';
    }
    if (keyword.includes('analysis') || contentLower.includes('market analysis')) {
      return 'market-analysis';
    }
    if (keyword.includes('education') || keyword.includes('learn') || keyword.includes('guide')) {
      return 'education';
    }

    return 'trading-strategies'; // Default
  }

  /**
   * Generate relevant tags
   */
  generateTags(mainKeyword, relatedKeywords, content) {
    const tags = new Set();

    // Add main keyword
    tags.add(mainKeyword);

    // Add related keywords
    relatedKeywords.forEach(k => tags.add(k));

    // Add year
    tags.add(new Date().getFullYear().toString());

    // Add generic trading tags based on content
    const contentLower = content.toLowerCase();
    if (contentLower.includes('strategy')) tags.add('trading-strategy');
    if (contentLower.includes('technical')) tags.add('technical-analysis');
    if (contentLower.includes('risk')) tags.add('risk-management');
    if (contentLower.includes('beginner')) tags.add('beginners');

    return Array.from(tags).slice(0, 8);
  }

  /**
   * Select author based on category
   */
  selectAuthor(category) {
    const authors = {
      'trading-strategies': {
        name: 'Michael Chen',
        role: 'Senior Trading Strategist',
        avatar: 'MC'
      },
      'market-analysis': {
        name: 'Sarah Martinez',
        role: 'Chief Market Analyst',
        avatar: 'SM'
      },
      'education': {
        name: 'David Thompson',
        role: 'Trading Education Director',
        avatar: 'DT'
      },
      'platform-updates': {
        name: 'Emily Zhang',
        role: 'Product Manager',
        avatar: 'EZ'
      }
    };

    return authors[category] || authors['trading-strategies'];
  }

  /**
   * Calculate read time based on word count
   */
  calculateReadTime(content) {
    const words = content.split(/\s+/).length;
    const minutes = Math.ceil(words / 200); // Average reading speed: 200 words/min
    return `${minutes} min read`;
  }
}

// Export singleton instance (will be initialized in server.js with API key)
export let contentGenerator = null;

export function initContentGenerator(apiKey) {
  contentGenerator = new ContentGenerator(apiKey);
  return contentGenerator;
}
