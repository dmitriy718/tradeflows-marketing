import { useParams, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { getArticleById, getCategoryById, getArticlesByCategory } from '../data/kbArticles'
import './KBArticle.css'

export default function KBArticle() {
  const { articleId } = useParams()
  const article = getArticleById(articleId)

  if (!article) {
    return (
      <div className="kb-article-page">
        <div className="container">
          <div className="article-not-found">
            <h1>Article Not Found</h1>
            <p>Sorry, we couldn't find the article you're looking for.</p>
            <Link to="/knowledge-base" className="btn btn-primary">
              Back to Knowledge Base
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const category = getCategoryById(article.category)
  const relatedArticles = getArticlesByCategory(article.category)
    .filter(a => a.id !== article.id)
    .slice(0, 3)

  // Convert markdown-style content to HTML (simple implementation)
  const renderContent = (content) => {
    return content.split('\n').map((line, index) => {
      // Headers
      if (line.startsWith('# ')) {
        return <h1 key={index}>{line.substring(2)}</h1>
      }
      if (line.startsWith('## ')) {
        return <h2 key={index}>{line.substring(3)}</h2>
      }
      if (line.startsWith('### ')) {
        return <h3 key={index}>{line.substring(4)}</h3>
      }

      // Bold text
      let processedLine = line
      const boldRegex = /\*\*(.*?)\*\*/g
      const hasBold = boldRegex.test(line)
      if (hasBold) {
        const parts = []
        let lastIndex = 0
        let match
        boldRegex.lastIndex = 0

        while ((match = boldRegex.exec(line)) !== null) {
          if (match.index > lastIndex) {
            parts.push(line.substring(lastIndex, match.index))
          }
          parts.push(<strong key={`bold-${index}-${match.index}`}>{match[1]}</strong>)
          lastIndex = match.index + match[0].length
        }

        if (lastIndex < line.length) {
          parts.push(line.substring(lastIndex))
        }

        return <p key={index}>{parts}</p>
      }

      // Lists
      if (line.startsWith('- ')) {
        return (
          <li key={index}>{line.substring(2)}</li>
        )
      }

      // Code blocks
      if (line.startsWith('```')) {
        return null // Skip code block markers
      }

      // Empty lines
      if (line.trim() === '') {
        return <br key={index} />
      }

      // Regular paragraphs
      return <p key={index}>{line}</p>
    })
  }

  return (
    <>
      <Helmet>
        <title>{article.title} - TradeFlows Pro Knowledge Base</title>
        <meta name="description" content={article.description} />
      </Helmet>

      <div className="kb-article-page">
        {/* Breadcrumbs */}
        <section className="breadcrumbs">
          <div className="container">
            <div className="breadcrumb-nav">
              <Link to="/knowledge-base">Knowledge Base</Link>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 12l4-4-4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <Link to={`/knowledge-base#${category.id}`}>{category?.name}</Link>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 12l4-4-4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>{article.title}</span>
            </div>
          </div>
        </section>

        {/* Article Header */}
        <section className="article-header">
          <div className="container-article">
            <div className="category-badge">
              <span className="category-icon">{category?.icon}</span>
              <span>{category?.name}</span>
            </div>

            <h1 className="article-heading">{article.title}</h1>
            <p className="article-lead">{article.description}</p>

            <div className="article-info">
              <span className="info-item">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M8 4v4l3 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                {article.readTime}
              </span>
              <span className="info-divider">•</span>
              <span className="info-item">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <rect x="2" y="3" width="12" height="11" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M11 1v4M5 1v4M2 7h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                Updated {new Date(article.lastUpdated).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </span>
            </div>
          </div>
        </section>

        {/* Article Content */}
        <section className="article-content-section">
          <div className="container-article">
            <div className="article-layout">
              {/* Table of Contents */}
              <aside className="table-of-contents">
                <div className="toc-sticky">
                  <h4>In this article</h4>
                  <nav className="toc-nav">
                    <a href="#content" className="toc-link active">Introduction</a>
                    {article.content.split('\n').filter(line => line.startsWith('## ')).map((heading, index) => (
                      <a key={index} href={`#${heading.substring(3).toLowerCase().replace(/\s+/g, '-')}`} className="toc-link">
                        {heading.substring(3)}
                      </a>
                    ))}
                  </nav>

                  <div className="toc-help">
                    <h5>Need help?</h5>
                    <Link to="/contact" className="help-link">
                      Contact Support →
                    </Link>
                  </div>
                </div>
              </aside>

              {/* Main Content */}
              <article className="article-body" id="content">
                <div className="prose">
                  {renderContent(article.content)}
                </div>

                {/* Article Footer */}
                <div className="article-footer">
                  <div className="article-feedback">
                    <h4>Was this article helpful?</h4>
                    <div className="feedback-buttons">
                      <button className="feedback-btn">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                          <path d="M6 9V2l3.5 2L13 2v7m4 3c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V9c0-1.1.9-2 2-2h12c1.1 0 2 .9 2 2v3z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Yes, helpful
                      </button>
                      <button className="feedback-btn">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                          <path d="M14 11v7l-3.5-2L7 18v-7m-4-3c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2v3c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        No, not helpful
                      </button>
                    </div>
                  </div>

                  <div className="article-actions">
                    <button className="action-btn">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M15 8a3 3 0 1 1-2.977-3A3 3 0 0 1 15 8zm-3 6a6 6 0 0 0-6 6h12a6 6 0 0 0-6-6zm-6-6a3 3 0 1 1-2.977-3A3 3 0 0 1 6 8z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      Share
                    </button>
                    <button className="action-btn">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M17 3H3c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 12H3V5h14v10zm-7-1v-2h2v2h-2zm0-3V6h2v5h-2z" fill="currentColor"/>
                      </svg>
                      Print
                    </button>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <section className="related-articles section">
            <div className="container">
              <h2>Related Articles</h2>
              <div className="related-grid">
                {relatedArticles.map((related) => (
                  <Link
                    key={related.id}
                    to={`/knowledge-base/${related.id}`}
                    className="related-card"
                  >
                    <h3>{related.title}</h3>
                    <p>{related.description}</p>
                    <div className="related-meta">
                      <span className="read-time">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.5"/>
                          <path d="M7 3.5v3.5l2.5 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                        </svg>
                        {related.readTime}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Support CTA */}
        <section className="article-cta section">
          <div className="container">
            <div className="cta-box">
              <h2>Still Have Questions?</h2>
              <p>Our support team is here to help you 24/7</p>
              <div className="cta-actions">
                <Link to="/contact" className="btn btn-large btn-primary">
                  Contact Support
                </Link>
                <Link to="/knowledge-base" className="btn btn-large btn-secondary">
                  Browse All Articles
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
