// SEO Component with JSON-LD Structured Data
// Provides rich snippets for search engines

import { Helmet } from 'react-helmet-async'

export default function SEO({
  title = 'TradeFlows Pro - Advanced AI-Powered Trading Platform',
  description = 'Professional trading platform with AI-driven strategies, real-time market data, and advanced portfolio management. Trade stocks, crypto, forex, and commodities with confidence.',
  keywords = 'trading platform, stock trading, crypto trading, AI trading, portfolio management, market analysis, technical indicators, day trading, algorithmic trading',
  canonical,
  type = 'website',
  image = '/og-image.png',
  article = false,
  publishedTime,
  modifiedTime,
  author,
  structuredData
}) {
  const siteUrl = 'https://tradeflows.net'
  const fullUrl = canonical ? `${siteUrl}${canonical}` : siteUrl
  const fullImage = image.startsWith('http') ? image : `${siteUrl}${image}`

  // Default Organization structured data
  const defaultStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'TradeFlows Pro',
    url: siteUrl,
    logo: `${siteUrl}/logo-icon.svg`,
    description: 'Professional AI-powered trading platform',
    sameAs: [
      'https://twitter.com/tradeflows',
      'https://linkedin.com/company/tradeflows',
      'https://github.com/tradeflows'
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      email: 'support@tradeflows.net',
      availableLanguage: 'English'
    }
  }

  // Article structured data for blog posts
  const articleStructuredData = article ? {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: description,
    image: fullImage,
    datePublished: publishedTime,
    dateModified: modifiedTime || publishedTime,
    author: {
      '@type': 'Person',
      name: author || 'TradeFlows Pro Team'
    },
    publisher: {
      '@type': 'Organization',
      name: 'TradeFlows Pro',
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/logo-icon.svg`
      }
    }
  } : null

  const finalStructuredData = structuredData || articleStructuredData || defaultStructuredData

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      {canonical && <link rel="canonical" href={fullUrl} />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:site_name" content="TradeFlows Pro" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />
      <meta name="twitter:site" content="@tradeflows" />

      {/* Article specific */}
      {article && (
        <>
          <meta property="article:published_time" content={publishedTime} />
          {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
          {author && <meta property="article:author" content={author} />}
        </>
      )}

      {/* Structured Data (JSON-LD) */}
      <script type="application/ld+json">
        {JSON.stringify(finalStructuredData)}
      </script>
    </Helmet>
  )
}
