import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import StructuredData from '../components/StructuredData'
import Testimonials from '../components/Testimonials'
import FAQ, { commonFAQs } from '../components/FAQ'
import NewsletterSignup from '../components/NewsletterSignup'
import { useTracking } from '../hooks/useTracking'
import './HomePage.css'

export default function HomePage() {
  const { trackCTA, trackFeature } = useTracking()
  // Structured data for the homepage
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'TradeFlows Pro',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Web, iOS, Android',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      priceValidUntil: '2026-12-31',
      description: '7-day free trial, then starting at $19.99/month'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      ratingCount: '50000',
      bestRating: '5',
      worstRating: '1'
    },
    description: 'Professional AI-powered trading platform with real-time market data, intelligent strategy recommendations, and advanced portfolio analytics for stocks, crypto, forex, and commodities.',
    features: [
      'Real-time market data',
      'AI-powered trading strategies',
      'Advanced portfolio management',
      'Smart alerts and notifications',
      '100+ technical indicators',
      'Performance analytics'
    ]
  }

  return (
    <>
      <SEO
        title="TradeFlows Pro - AI-Powered Professional Trading Platform"
        description="Transform your trading with AI-powered strategies, real-time market data, and advanced portfolio analytics. Trade stocks, crypto, forex, and commodities with confidence. Start your 7-day free trial today."
        keywords="trading platform, stock trading, crypto trading, AI trading, portfolio management, market analysis, day trading, algorithmic trading, trading software, stock market app"
        canonical="/"
        structuredData={structuredData}
      />
      <StructuredData type="home" />

      <div className="home-page">
        {/* Hero Section */}
        <section className="hero">
          <div className="hero-background">
            <div className="hero-grid"></div>
            <div className="hero-glow hero-glow-1"></div>
            <div className="hero-glow hero-glow-2"></div>
          </div>

          <div className="container hero-content">
            <div className="hero-text">
              <div className="hero-badge">
                <span className="badge-icon">✨</span>
                <span>Powered by Advanced AI</span>
              </div>
              <h1 className="hero-title">
                Trade Smarter with{' '}
                <span className="gradient-text">AI-Powered Insights</span>
              </h1>
              <p className="hero-description">
                TradeFlows Pro combines real-time market data, intelligent strategy recommendations, and advanced portfolio analytics to help you make confident trading decisions. Join thousands of traders who've transformed their approach.
              </p>
              <div className="hero-actions">
                <a
                  href="https://app.tradeflows.net?signup=true&utm_source=website&utm_medium=navigation&utm_campaign=trial"
                  className="btn btn-hero-primary"
                  onClick={() => trackCTA('Start Free Trial', 'Hero Section')}
                >
                  Start Free 7-Day Trial
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M7 10h6m0 0L10 7m3 3-3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
                <Link
                  to="/features"
                  className="btn btn-hero-secondary"
                  onClick={() => trackCTA('Explore Features', 'Hero Section')}
                >
                  Explore Features
                </Link>
              </div>
              <div className="hero-trust">
                <div className="trust-stats">
                  <div className="stat">
                    <div className="stat-value">50K+</div>
                    <div className="stat-label">Active Traders</div>
                  </div>
                  <div className="stat">
                    <div className="stat-value">$2.5B+</div>
                    <div className="stat-label">Trading Volume</div>
                  </div>
                  <div className="stat">
                    <div className="stat-value">4.9/5</div>
                    <div className="stat-label">User Rating</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="hero-visual">
              <div className="dashboard-preview">
                <div className="preview-card">
                  <div className="card-header">
                    <span className="indicator pulse"></span>
                    <span>Live Trading Dashboard</span>
                  </div>
                  <div className="preview-chart">
                    <svg viewBox="0 0 400 200" className="chart-svg">
                      <path d="M 10 150 Q 50 120, 90 130 T 170 110 Q 210 100, 250 90 T 330 70 Q 370 60, 390 50"
                            stroke="url(#chartGradient)" strokeWidth="3" fill="none"/>
                      <defs>
                        <linearGradient id="chartGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#3b9eff"/>
                          <stop offset="100%" stopColor="#10b981"/>
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                  <div className="preview-metrics">
                    <div className="metric positive">
                      <span>+12.5%</span>
                      <span className="metric-label">Today</span>
                    </div>
                    <div className="metric positive">
                      <span>+45.2%</span>
                      <span className="metric-label">This Month</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Overview */}
        <section className="features-overview section">
          <div className="container">
            <div className="section-header text-center">
              <h2>Everything You Need to Trade Like a Pro</h2>
              <p>Powerful features designed for serious traders</p>
            </div>

            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                    <path d="M35 20C35 28.284 28.284 35 20 35C11.716 35 5 28.284 5 20C5 11.716 11.716 5 20 5C28.284 5 35 11.716 35 20Z" stroke="url(#iconGrad1)" strokeWidth="2"/>
                    <path d="M20 10V20L27 27" stroke="url(#iconGrad1)" strokeWidth="2" strokeLinecap="round"/>
                    <defs>
                      <linearGradient id="iconGrad1"><stop stopColor="#3b9eff"/><stop offset="1" stopColor="#a78bfa"/></linearGradient>
                    </defs>
                  </svg>
                </div>
                <h3>Real-Time Market Data</h3>
                <p>Live streaming quotes, charts, and market depth across stocks, crypto, forex, and commodities. Never miss a trading opportunity.</p>
                <Link
                  to="/features#real-time-data"
                  className="feature-link"
                  onClick={() => trackFeature('Real-Time Market Data')}
                >
                  Learn more →
                </Link>
              </div>

              <div className="feature-card">
                <div className="feature-icon">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                    <rect x="6" y="12" width="28" height="20" rx="2" stroke="url(#iconGrad2)" strokeWidth="2"/>
                    <path d="M12 8L20 15L28 8" stroke="url(#iconGrad2)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="15" cy="22" r="2" fill="#3b9eff"/>
                    <circle cx="25" cy="22" r="2" fill="#10b981"/>
                    <defs>
                      <linearGradient id="iconGrad2"><stop stopColor="#3b9eff"/><stop offset="1" stopColor="#10b981"/></linearGradient>
                    </defs>
                  </svg>
                </div>
                <h3>AI Strategy Builder</h3>
                <p>Let our AI analyze market conditions and suggest optimal trading strategies based on your risk profile and goals.</p>
                <Link
                  to="/features#ai-strategies"
                  className="feature-link"
                  onClick={() => trackFeature('AI Strategy Builder')}
                >
                  Learn more →
                </Link>
              </div>

              <div className="feature-card">
                <div className="feature-icon">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                    <path d="M8 15L20 8L32 15V28C32 29.105 31.105 30 30 30H10C8.895 30 8 29.105 8 28V15Z" stroke="url(#iconGrad3)" strokeWidth="2"/>
                    <path d="M20 30V20" stroke="url(#iconGrad3)" strokeWidth="2"/>
                    <defs>
                      <linearGradient id="iconGrad3"><stop stopColor="#10b981"/><stop offset="1" stopColor="#3b9eff"/></linearGradient>
                    </defs>
                  </svg>
                </div>
                <h3>Advanced Portfolio Management</h3>
                <p>Track performance, analyze risk, and optimize your portfolio with institutional-grade analytics and reporting.</p>
                <Link
                  to="/features#portfolio"
                  className="feature-link"
                  onClick={() => trackFeature('Advanced Portfolio Management')}
                >
                  Learn more →
                </Link>
              </div>

              <div className="feature-card">
                <div className="feature-icon">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                    <circle cx="20" cy="20" r="12" stroke="url(#iconGrad4)" strokeWidth="2"/>
                    <path d="M20 14V20L24 24" stroke="url(#iconGrad4)" strokeWidth="2" strokeLinecap="round"/>
                    <defs>
                      <linearGradient id="iconGrad4"><stop stopColor="#a78bfa"/><stop offset="1" stopColor="#3b9eff"/></linearGradient>
                    </defs>
                  </svg>
                </div>
                <h3>Smart Alerts & Notifications</h3>
                <p>Custom price alerts, technical indicator signals, and AI-powered trade notifications delivered instantly.</p>
                <Link
                  to="/features#alerts"
                  className="feature-link"
                  onClick={() => trackFeature('Smart Alerts & Notifications')}
                >
                  Learn more →
                </Link>
              </div>

              <div className="feature-card">
                <div className="feature-icon">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                    <rect x="8" y="10" width="24" height="22" rx="2" stroke="url(#iconGrad5)" strokeWidth="2"/>
                    <path d="M12 16H28M12 22H28M12 28H22" stroke="url(#iconGrad5)" strokeWidth="2" strokeLinecap="round"/>
                    <defs>
                      <linearGradient id="iconGrad5"><stop stopColor="#3b9eff"/><stop offset="1" stopColor="#a78bfa"/></linearGradient>
                    </defs>
                  </svg>
                </div>
                <h3>Technical Analysis Tools</h3>
                <p>100+ technical indicators, drawing tools, and chart patterns. Everything professional traders need in one platform.</p>
                <Link
                  to="/features#technical-analysis"
                  className="feature-link"
                  onClick={() => trackFeature('Technical Analysis Tools')}
                >
                  Learn more →
                </Link>
              </div>

              <div className="feature-card">
                <div className="feature-icon">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                    <rect x="8" y="15" width="10" height="17" rx="1" stroke="url(#iconGrad6)" strokeWidth="2"/>
                    <rect x="22" y="10" width="10" height="22" rx="1" stroke="url(#iconGrad6)" strokeWidth="2"/>
                    <defs>
                      <linearGradient id="iconGrad6"><stop stopColor="#10b981"/><stop offset="1" stopColor="#3b9eff"/></linearGradient>
                    </defs>
                  </svg>
                </div>
                <h3>Performance Analytics</h3>
                <p>Detailed P&L tracking, win/loss ratios, and performance metrics to continuously improve your trading.</p>
                <Link
                  to="/features#analytics"
                  className="feature-link"
                  onClick={() => trackFeature('Performance Analytics')}
                >
                  Learn more →
                </Link>
              </div>
            </div>

            <div className="section-cta">
              <Link
                to="/features"
                className="btn btn-large btn-primary"
                onClick={() => trackCTA('View All Features', 'Features Overview')}
              >
                View All Features
              </Link>
            </div>
          </div>
        </section>

        {/* Comparison Callout */}
        <section className="comparison-callout section">
          <div className="container">
            <div className="comparison-box">
              <div className="comparison-badge">Why Choose Us?</div>
              <h2>See How We Compare to LuxAlgo</h2>
              <p>
                Discover why 50,000+ traders chose TradeFlows Pro over LuxAlgo.
                Compare features, pricing, and value side-by-side.
              </p>
              <div className="comparison-stats">
                <div className="stat-item">
                  <div className="stat-number">17</div>
                  <div className="stat-text">Key Features Won</div>
                </div>
                <div className="stat-divider"></div>
                <div className="stat-item">
                  <div className="stat-number">Better Value</div>
                  <div className="stat-text">More Features, Lower Total Cost</div>
                </div>
                <div className="stat-divider"></div>
                <div className="stat-item">
                  <div className="stat-number">Standalone</div>
                  <div className="stat-text">No Additional Subscriptions</div>
                </div>
              </div>
              <Link
                to="/vs-luxalgo"
                className="btn btn-large btn-gradient"
                onClick={() => {
                  trackCTA('View Full Comparison', 'Comparison Callout')
                  trackFeature('LuxAlgo Comparison')
                }}
              >
                View Full Comparison
              </Link>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <Testimonials
          limit={6}
          title="Trusted by Thousands of Traders"
          subtitle="See what our users have to say about their experience with TradeFlows Pro"
        />

        {/* FAQ */}
        <FAQ
          questions={commonFAQs.general}
          title="Frequently Asked Questions"
          subtitle="Everything you need to know about TradeFlows Pro"
          columns={2}
        />

        {/* CTA Section */}
        <section className="cta-section section">
          <div className="container">
            <div className="cta-card">
              <div className="cta-content">
                <h2>Ready to Transform Your Trading?</h2>
                <p>Start your 7-day free trial. No credit card required. Cancel anytime.</p>
                <div className="cta-actions">
                  <a
                    href="https://app.tradeflows.net?signup=true&utm_source=website&utm_medium=navigation&utm_campaign=trial"
                    className="btn btn-large btn-cta-primary"
                    onClick={() => trackCTA('Start Free Trial', 'Bottom CTA')}
                  >
                    Start Free Trial
                  </a>
                  <Link
                    to="/pricing"
                    className="btn btn-large btn-cta-secondary"
                    onClick={() => trackCTA('View Pricing', 'Bottom CTA')}
                  >
                    View Pricing
                  </Link>
                </div>
                <div className="cta-features">
                  <span>✓ Full platform access</span>
                  <span>✓ No credit card needed</span>
                  <span>✓ Cancel anytime</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <NewsletterSignup
          title="Stay Ahead of the Market"
          subtitle="Get exclusive trading insights, AI strategy updates, and platform news delivered weekly"
        />
      </div>
    </>
  )
}
