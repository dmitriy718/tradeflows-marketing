import { Helmet } from 'react-helmet-async'

/**
 * StructuredData Component
 * Adds JSON-LD structured data for better SEO and rich snippets in Google
 *
 * Supports:
 * - Organization schema
 * - SoftwareApplication schema
 * - WebSite schema with search action
 * - BreadcrumbList schema
 * - FAQ schema
 * - Review/Rating schema
 */

// Organization structured data
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "TradeFlows Pro",
  "url": "https://tradeflows.net",
  "logo": "https://tradeflows.net/logo-tf-shield.svg",
  "description": "Advanced AI-powered trading platform with real-time market data, portfolio management, and intelligent strategy recommendations",
  "foundingDate": "2024",
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "Customer Support",
    "email": "support@tradeflows.net",
    "url": "https://tradeflows.net/contact"
  },
  "sameAs": [
    "https://twitter.com/tradeflowspro",
    "https://linkedin.com/company/tradeflowspro",
    "https://facebook.com/tradeflowspro"
  ]
}

// Software Application schema
const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "TradeFlows Pro",
  "applicationCategory": "FinanceApplication",
  "operatingSystem": "Web, Windows, macOS, Linux, iOS, Android",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD",
    "description": "Free trial available, premium plans starting at $49/month"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "ratingCount": "1247",
    "bestRating": "5",
    "worstRating": "1"
  },
  "description": "Professional trading platform with AI-powered strategies, real-time market data, and advanced analytics",
  "featureList": [
    "Real-time market data and charts",
    "AI-powered trading strategies",
    "Portfolio management and tracking",
    "Advanced technical indicators",
    "Price alerts and notifications",
    "Multi-asset support (stocks, crypto, forex)",
    "Risk management tools",
    "Performance analytics"
  ]
}

// Website schema with search action
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "TradeFlows Pro",
  "url": "https://tradeflows.net",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://tradeflows.net/knowledge-base?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
}

// FAQ Schema for common questions
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is TradeFlows Pro?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "TradeFlows Pro is an advanced AI-powered trading platform that provides real-time market data, intelligent strategy recommendations, and comprehensive portfolio management tools for traders of all levels."
      }
    },
    {
      "@type": "Question",
      "name": "How much does TradeFlows Pro cost?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "TradeFlows Pro offers a free trial, with premium plans starting at $49/month. Enterprise plans are available for institutional traders and teams."
      }
    },
    {
      "@type": "Question",
      "name": "What markets does TradeFlows Pro support?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "TradeFlows Pro supports stocks, cryptocurrencies, forex, commodities, and indices. We provide real-time data and analysis for thousands of instruments across global markets."
      }
    },
    {
      "@type": "Question",
      "name": "Does TradeFlows Pro offer a mobile app?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, TradeFlows Pro is available as a responsive web application that works seamlessly on mobile devices. Native iOS and Android apps are coming soon."
      }
    },
    {
      "@type": "Question",
      "name": "Is my data secure with TradeFlows Pro?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Absolutely. We use bank-level encryption, secure data centers, and follow industry best practices for security. We never share your data with third parties without your explicit consent."
      }
    }
  ]
}

export default function StructuredData({ type = 'default', breadcrumbs, customSchema }) {
  const schemas = []

  // Always include base schemas
  if (type === 'default' || type === 'home') {
    schemas.push(organizationSchema)
    schemas.push(softwareApplicationSchema)
    schemas.push(websiteSchema)
    schemas.push(faqSchema)
  }

  // Add breadcrumb schema if provided
  if (breadcrumbs && breadcrumbs.length > 0) {
    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbs.map((crumb, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": crumb.name,
        "item": `https://tradeflows.net${crumb.path}`
      }))
    }
    schemas.push(breadcrumbSchema)
  }

  // Add custom schema if provided
  if (customSchema) {
    schemas.push(customSchema)
  }

  return (
    <Helmet>
      {schemas.map((schema, index) => (
        <script
          key={`schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </Helmet>
  )
}
