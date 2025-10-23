/**
 * SEO Optimizer - Generates SEO-friendly metadata and structured data
 */

import { logger } from './logger.js';

export class SEOOptimizer {
  /**
   * Generate optimized meta title
   */
  generateMetaTitle(title) {
    // Keep under 60 characters, add brand if space allows
    if (title.length <= 50) {
      return `${title} | TradeFlows Pro`;
    }
    return title.substring(0, 57) + '...';
  }

  /**
   * Generate Schema.org structured data for blog post
   */
  generateStructuredData(post) {
    return {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.description,
      "image": `https://tradeflows.net${post.image}`,
      "datePublished": post.publishDate,
      "dateModified": post.publishDate,
      "author": {
        "@type": "Person",
        "name": post.author
      },
      "publisher": {
        "@type": "Organization",
        "name": "TradeFlows Pro",
        "logo": {
          "@type": "ImageObject",
          "url": "https://tradeflows.net/logo.svg"
        }
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `https://tradeflows.net/blog/${post.slug ||''}`
      }
    };
  }

  /**
   * Generate internal links to relevant pages
   */
  generateInternalLinks(content, keywords) {
    const links = [];

    // Map keywords to internal pages
    const pageMapping = {
      'trading platform': { url: '/features', text: 'TradeFlows Pro platform' },
      'ai strategies': { url: '/features#ai-strategies', text: 'AI-powered strategies' },
      'live charts': { url: '/features#live-charts', text: 'live charting tools' },
      'market scanner': { url: '/features#market-scanner', text: 'market scanner' },
      'price alerts': { url: '/features#alerts', text: 'price alert system' },
      'portfolio': { url: '/features#portfolio', text: 'portfolio tracking' },
      'pricing': { url: '/pricing', text: 'pricing plans' },
      'get started': { url: '/getting-started', text: 'getting started guide' },
      'security': { url: '/security', text: 'security features' },
      'api': { url: '/api', text: 'API documentation' }
    };

    // Find opportunities to add internal links
    const contentLower = content.toLowerCase();
    for (const [keyword, link] of Object.entries(pageMapping)) {
      if (contentLower.includes(keyword) && !links.find(l => l.url === link.url)) {
        links.push(link);
      }
    }

    return links.slice(0, 5); // Maximum 5 internal links per post
  }

  /**
   * Optimize content for SEO
   */
  optimizeContent(content, mainKeyword, relatedKeywords) {
    let optimized = content;

    // Ensure main keyword appears in first paragraph
    const paragraphs = content.split('\n\n');
    if (paragraphs.length > 1 && !paragraphs[1].toLowerCase().includes(mainKeyword.toLowerCase())) {
      // Try to naturally insert keyword
      logger.info('Main keyword not found in introduction, content may need manual review');
    }

    // Add internal links
    const links = this.generateInternalLinks(content, [mainKeyword, ...relatedKeywords]);
    logger.info('Generated internal links', { count: links.length });

    // Add call-to-action with internal link if not present
    if (!content.includes('TradeFlows Pro')) {
      const cta = `\n\n## Ready to Take Your Trading to the Next Level?\n\nDiscover how [TradeFlows Pro](/features) can help you make smarter trading decisions with AI-powered insights, real-time analytics, and professional-grade tools. [Start your free trial today](/pricing).\n`;
      optimized += cta;
    }

    return {
      content: optimized,
      internalLinks: links
    };
  }

  /**
   * Generate Open Graph tags
   */
  generateOpenGraphTags(post) {
    return {
      'og:title': post.title,
      'og:description': post.excerpt,
      'og:image': `https://tradeflows.net${post.image}`,
      'og:url': `https://tradeflows.net/blog/${post.slug}`,
      'og:type': 'article',
      'og:site_name': 'TradeFlows Pro',
      'article:published_time': post.publishDate,
      'article:author': post.author.name,
      'article:section': post.category
    };
  }

  /**
   * Generate Twitter Card tags
   */
  generateTwitterCardTags(post) {
    return {
      'twitter:card': 'summary_large_image',
      'twitter:title': post.title,
      'twitter:description': post.excerpt,
      'twitter:image': `https://tradeflows.net${post.image}`,
      'twitter:site': '@TradeFlowsPro',
      'twitter:creator': '@TradeFlowsPro'
    };
  }

  /**
   * Analyze content SEO score
   */
  analyzeSEOScore(post, mainKeyword) {
    const score = {
      total: 0,
      maxScore: 100,
      issues: [],
      suggestions: []
    };

    // Check title length (15 points)
    if (post.title.length >= 50 && post.title.length <= 60) {
      score.total += 15;
    } else if (post.title.length < 50) {
      score.issues.push('Title is too short (< 50 characters)');
      score.total += 5;
    } else {
      score.issues.push('Title is too long (> 60 characters)');
      score.total += 5;
    }

    // Check meta description length (15 points)
    if (post.excerpt && post.excerpt.length >= 120 && post.excerpt.length <= 155) {
      score.total += 15;
    } else if (!post.excerpt) {
      score.issues.push('Missing meta description');
    } else if (post.excerpt.length < 120) {
      score.issues.push('Meta description is too short');
      score.total += 5;
    } else {
      score.issues.push('Meta description is too long');
      score.total += 5;
    }

    // Check content length (20 points)
    const wordCount = post.content.split(/\s+/).length;
    if (wordCount >= 1500 && wordCount <= 2500) {
      score.total += 20;
    } else if (wordCount < 1500) {
      score.issues.push(`Content is too short (${wordCount} words, recommended: 1500+)`);
      score.total += 10;
    } else {
      score.suggestions.push(`Content is very long (${wordCount} words), consider breaking into series`);
      score.total += 20;
    }

    // Check keyword in title (10 points)
    if (post.title.toLowerCase().includes(mainKeyword.toLowerCase())) {
      score.total += 10;
    } else {
      score.issues.push('Main keyword not found in title');
    }

    // Check keyword in first paragraph (10 points)
    const firstParagraph = post.content.split('\n\n')[1] || '';
    if (firstParagraph.toLowerCase().includes(mainKeyword.toLowerCase())) {
      score.total += 10;
    } else {
      score.issues.push('Main keyword not found in first paragraph');
    }

    // Check headings (10 points)
    const h2Count = (post.content.match(/\n## /g) || []).length;
    const h3Count = (post.content.match(/\n### /g) || []).length;
    if (h2Count >= 4 && h3Count >= 2) {
      score.total += 10;
    } else {
      score.suggestions.push('Add more headings for better structure');
      score.total += 5;
    }

    // Check images (10 points)
    if (post.image) {
      score.total += 10;
    } else {
      score.issues.push('Missing featured image');
    }

    // Check tags (10 points)
    if (post.tags && post.tags.length >= 5 && post.tags.length <= 10) {
      score.total += 10;
    } else if (!post.tags || post.tags.length < 5) {
      score.suggestions.push('Add more tags (recommended: 5-10)');
      score.total += 5;
    }

    score.percentage = (score.total / score.maxScore) * 100;
    score.grade = this.calculateGrade(score.percentage);

    return score;
  }

  /**
   * Calculate SEO grade
   */
  calculateGrade(percentage) {
    if (percentage >= 90) return 'A+';
    if (percentage >= 80) return 'A';
    if (percentage >= 70) return 'B';
    if (percentage >= 60) return 'C';
    return 'D';
  }
}

export const seoOptimizer = new SEOOptimizer();
