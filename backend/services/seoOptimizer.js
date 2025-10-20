import logger from '../utils/logger.js';

class SEOOptimizer {
  /**
   * Optimize post content for SEO
   */
  async optimize(post) {
    try {
      logger.debug(`Optimizing SEO for: ${post.title}`);

      // Optimize title
      post.title = this.optimizeTitle(post.title);

      // Optimize excerpt/meta description
      post.excerpt = this.optimizeExcerpt(post.excerpt);

      // Ensure keyword density
      post.content = this.optimizeKeywordDensity(post.content, post.keywordsUsed || []);

      // Add internal links
      post.content = this.addInternalLinks(post.content);

      // Optimize headings
      post.content = this.optimizeHeadings(post.content);

      logger.debug('SEO optimization complete');
      return post;

    } catch (error) {
      logger.error('SEO optimization failed:', error);
      return post; // Return original if optimization fails
    }
  }

  /**
   * Optimize title for SEO
   */
  optimizeTitle(title) {
    // Ensure title is 50-60 characters for optimal display
    if (title.length > 60) {
      title = title.substring(0, 57) + '...';
    }

    // Ensure title doesn't start with common words
    const removePrefix = ['the ', 'a ', 'an '];
    removePrefix.forEach(prefix => {
      if (title.toLowerCase().startsWith(prefix)) {
        title = title.substring(prefix.length);
      }
    });

    return title;
  }

  /**
   * Optimize excerpt as meta description
   */
  optimizeExcerpt(excerpt) {
    // Meta descriptions should be 150-160 characters
    if (excerpt.length > 160) {
      excerpt = excerpt.substring(0, 157) + '...';
    }

    // Ensure it ends with proper punctuation
    if (!/[.!?]$/.test(excerpt)) {
      excerpt += '.';
    }

    return excerpt;
  }

  /**
   * Optimize keyword density (2-3% is ideal)
   */
  optimizeKeywordDensity(content, keywords) {
    if (!keywords || keywords.length === 0) return content;

    const primaryKeyword = keywords[0];
    const wordCount = content.split(/\s+/).length;
    const targetOccurrences = Math.ceil(wordCount * 0.025); // 2.5% density

    // Count current occurrences
    const regex = new RegExp(primaryKeyword, 'gi');
    const currentOccurrences = (content.match(regex) || []).length;

    // If too few, add keyword naturally in a few places
    if (currentOccurrences < targetOccurrences) {
      const deficit = targetOccurrences - currentOccurrences;

      // Add to conclusion if exists
      if (deficit > 0 && content.includes('## Conclusion')) {
        content = content.replace(
          '## Conclusion',
          `## Conclusion: Mastering ${primaryKeyword}\n\nAs we've explored, ${primaryKeyword} offers significant opportunities for traders.`
        );
      }
    }

    return content;
  }

  /**
   * Add internal links to related content
   */
  addInternalLinks(content) {
    // Add link to main app at strategic points
    const linkText = '[Try TradeFlows Pro Free →](https://app.tradeflows.net?signup=true)';

    // Add link in middle of content if not already present
    if (!content.includes('app.tradeflows.net')) {
      const sections = content.split('\n## ');
      if (sections.length >= 3) {
        // Insert after second section
        sections[2] += `\n\n**Ready to get started?** ${linkText}\n`;
        content = sections.join('\n## ');
      }
    }

    return content;
  }

  /**
   * Optimize heading structure for SEO
   */
  optimizeHeadings(content) {
    // Ensure proper heading hierarchy (H1 -> H2 -> H3)
    // Convert #### to ### if too many H4s
    const h4Count = (content.match(/\n####\s/g) || []).length;

    if (h4Count > 5) {
      content = content.replace(/\n####\s/g, '\n### ');
    }

    return content;
  }

  /**
   * Generate schema markup for article
   */
  generateSchemaMarkup(post) {
    return {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: post.title,
      description: post.excerpt,
      author: {
        '@type': 'Person',
        name: post.author?.name || 'TradeFlows Team'
      },
      datePublished: post.publishedAt,
      publisher: {
        '@type': 'Organization',
        name: 'TradeFlows Pro',
        logo: {
          '@type': 'ImageObject',
          url: 'https://tradeflows.net/logo.svg'
        }
      },
      image: post.image,
      keywords: post.tags.join(', ')
    };
  }
}

export default new SEOOptimizer();