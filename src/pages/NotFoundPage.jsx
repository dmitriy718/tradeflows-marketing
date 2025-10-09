import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import './NotFoundPage.css'

export default function NotFoundPage() {
  const popularPages = [
    { title: 'Homepage', path: '/', icon: '🏠' },
    { title: 'Features', path: '/features', icon: '⚡' },
    { title: 'Pricing', path: '/pricing', icon: '💎' },
    { title: 'Knowledge Base', path: '/knowledge-base', icon: '📚' },
    { title: 'Blog', path: '/blog', icon: '📝' },
    { title: 'Contact Us', path: '/contact', icon: '💬' }
  ]

  return (
    <>
      <Helmet>
        <title>404 - Page Not Found | TradeFlows Pro</title>
        <meta name="description" content="The page you're looking for doesn't exist. Explore our site to find what you need." />
      </Helmet>

      <div className="not-found-page">
        <div className="not-found-container">
          {/* Animated 404 */}
          <div className="not-found-hero">
            <div className="error-code">
              <span className="digit">4</span>
              <span className="digit pulse">0</span>
              <span className="digit">4</span>
            </div>
            <h1>Page Not Found</h1>
            <p className="error-message">
              Oops! The page you're looking for seems to have wandered off the chart.
            </p>
          </div>

          {/* Search Suggestions */}
          <div className="suggestions-section">
            <h2>Looking for something specific?</h2>
            <p className="suggestions-lead">
              Here are some helpful links to get you back on track:
            </p>

            <div className="popular-pages">
              {popularPages.map((page, index) => (
                <Link key={index} to={page.path} className="page-card">
                  <span className="page-icon">{page.icon}</span>
                  <span className="page-title">{page.title}</span>
                  <span className="page-arrow">→</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Help Section */}
          <div className="help-section">
            <div className="help-card">
              <h3>Need Help?</h3>
              <p>
                If you believe this is an error or you're having trouble finding what you need, our support team is here to help.
              </p>
              <div className="help-actions">
                <Link to="/contact" className="btn btn-primary">
                  Contact Support
                </Link>
                <Link to="/knowledge-base" className="btn btn-outline">
                  Browse Help Center
                </Link>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="not-found-cta">
            <h2>Ready to Start Trading Like a Pro?</h2>
            <p>
              Don't let a wrong turn stop your journey. Get started with TradeFlows Pro today.
            </p>
            <div className="cta-actions">
              <a
                href="https://app.tradeflows.net?signup=true"
                className="btn btn-large btn-primary"
              >
                Start Free Trial
              </a>
              <Link to="/" className="btn btn-large btn-secondary">
                Back to Homepage
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
