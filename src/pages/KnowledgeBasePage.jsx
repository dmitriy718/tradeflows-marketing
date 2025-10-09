import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { kbCategories, kbArticles } from '../data/kbArticles'
import './KnowledgeBasePage.css'

export default function KnowledgeBasePage() {
  return (
    <>
      <Helmet>
        <title>Knowledge Base - TradeFlows Pro Documentation & Guides</title>
        <meta name="description" content="Comprehensive guides, tutorials, and documentation for TradeFlows Pro. Learn about trading features, AI strategies, portfolio management, and more." />
      </Helmet>

      <div className="knowledge-base-page">
        {/* Hero */}
        <section className="kb-hero">
          <div className="container">
            <div className="kb-hero-content">
              <h1>Knowledge Base</h1>
              <p>Everything you need to master TradeFlows Pro</p>

              {/* Search */}
              <div className="kb-search">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="search-icon">
                  <path d="M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16zM19 19l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <input
                  type="text"
                  placeholder="Search articles, guides, and documentation..."
                  className="search-input"
                />
              </div>

              {/* Quick Stats */}
              <div className="kb-stats">
                <div className="stat-item">
                  <span className="stat-number">{kbCategories.length}</span>
                  <span className="stat-label">Categories</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">{kbArticles.length}</span>
                  <span className="stat-label">Articles</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">24/7</span>
                  <span className="stat-label">Support</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Grid */}
        <section className="kb-categories section">
          <div className="container">
            <div className="section-header text-center">
              <h2>Browse by Category</h2>
              <p>Find the information you need, organized by topic</p>
            </div>

            <div className="categories-grid">
              {kbCategories.map((category) => {
                const categoryArticles = kbArticles.filter(article => article.category === category.id)

                return (
                  <div key={category.id} className="category-card">
                    <div className="category-icon">{category.icon}</div>
                    <h3 className="category-name">{category.name}</h3>
                    <p className="category-description">{category.description}</p>
                    <div className="category-count">{categoryArticles.length} articles</div>

                    <div className="category-articles">
                      {categoryArticles.slice(0, 3).map((article) => (
                        <Link
                          key={article.id}
                          to={`/knowledge-base/${article.id}`}
                          className="article-link"
                        >
                          {article.title}
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M6 12l4-4-4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </Link>
                      ))}
                    </div>

                    <a href={`#${category.id}`} className="view-all-link">
                      View all {categoryArticles.length} articles →
                    </a>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Popular Articles */}
        <section className="popular-articles section">
          <div className="container">
            <div className="section-header">
              <h2>Popular Articles</h2>
              <p>Most viewed guides and tutorials</p>
            </div>

            <div className="articles-list">
              {kbArticles.slice(0, 6).map((article) => {
                const category = kbCategories.find(cat => cat.id === article.category)

                return (
                  <Link
                    key={article.id}
                    to={`/knowledge-base/${article.id}`}
                    className="article-card"
                  >
                    <div className="article-category-badge">
                      <span className="category-icon-small">{category?.icon}</span>
                      <span>{category?.name}</span>
                    </div>

                    <h3 className="article-title">{article.title}</h3>
                    <p className="article-description">{article.description}</p>

                    <div className="article-meta">
                      <span className="read-time">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/>
                          <path d="M8 4v4l3 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                        </svg>
                        {article.readTime}
                      </span>
                      <span className="last-updated">Updated {new Date(article.lastUpdated).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>

        {/* All Articles by Category */}
        {kbCategories.map((category) => {
          const categoryArticles = kbArticles.filter(article => article.category === category.id)

          return (
            <section key={category.id} id={category.id} className="category-section section">
              <div className="container">
                <div className="category-section-header">
                  <div className="category-icon-large">{category.icon}</div>
                  <div>
                    <h2>{category.name}</h2>
                    <p>{category.description}</p>
                  </div>
                </div>

                <div className="articles-grid">
                  {categoryArticles.map((article) => (
                    <Link
                      key={article.id}
                      to={`/knowledge-base/${article.id}`}
                      className="article-item"
                    >
                      <h4 className="article-item-title">{article.title}</h4>
                      <p className="article-item-description">{article.description}</p>
                      <div className="article-item-meta">
                        <span className="read-time">
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.5"/>
                            <path d="M7 3.5v3.5l2.5 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                          </svg>
                          {article.readTime}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          )
        })}

        {/* Help CTA */}
        <section className="kb-cta section">
          <div className="container">
            <div className="cta-box">
              <h2>Can't Find What You're Looking For?</h2>
              <p>Our support team is here to help you 24/7</p>
              <div className="cta-actions">
                <Link to="/contact" className="btn btn-large btn-primary">
                  Contact Support
                </Link>
                <a href="https://app.tradeflows.net/support" className="btn btn-large btn-secondary">
                  Live Chat
                </a>
              </div>
              <div className="support-options">
                <div className="support-option">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <div>
                    <div className="support-title">Live Chat</div>
                    <div className="support-desc">Average response: &lt;2 min</div>
                  </div>
                </div>
                <div className="support-option">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M22 6l-10 7L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <div>
                    <div className="support-title">Email Support</div>
                    <div className="support-desc">support@tradeflows.net</div>
                  </div>
                </div>
                <div className="support-option">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <div>
                    <div className="support-title">Phone Support</div>
                    <div className="support-desc">1-800-TRADE-PRO</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
