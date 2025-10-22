import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import './GettingStartedPage.css'

export default function GettingStartedPage() {
  return (
    <>
      <Helmet>
        <title>Getting Started - TradeFlows Pro</title>
        <meta name="description" content="Get started with TradeFlows Pro in minutes. Complete guide to setting up your account, customizing your dashboard, and making your first trade." />
      </Helmet>

      <div className="getting-started-page">
        {/* Hero Section */}
        <section className="gs-hero">
          <div className="container">
            <div className="gs-hero-content">
              <div className="gs-hero-badge">
                <span className="badge-icon">🚀</span>
                <span>Quick Start Guide</span>
              </div>
              <h1 className="gs-hero-title">Get Started with TradeFlows Pro</h1>
              <p className="gs-hero-subtitle">
                Your complete guide to getting up and running in less than 5 minutes.
                From account setup to your first AI-powered trade recommendation.
              </p>
              <div className="gs-hero-stats">
                <div className="gs-stat">
                  <div className="gs-stat-number">5 min</div>
                  <div className="gs-stat-label">Setup Time</div>
                </div>
                <div className="gs-stat">
                  <div className="gs-stat-number">4 Steps</div>
                  <div className="gs-stat-label">To Get Started</div>
                </div>
                <div className="gs-stat">
                  <div className="gs-stat-number">24/7</div>
                  <div className="gs-stat-label">Support Available</div>
                </div>
              </div>
            </div>
            <div className="gs-hero-image">
              <div className="gs-hero-illustration">
                <div className="gs-illustration-card">
                  <div className="gs-card-header">
                    <div className="gs-card-dots">
                      <span></span><span></span><span></span>
                    </div>
                  </div>
                  <div className="gs-card-content">
                    <div className="gs-chart-bars">
                      <div className="gs-bar" style={{height: '40%'}}></div>
                      <div className="gs-bar" style={{height: '70%'}}></div>
                      <div className="gs-bar" style={{height: '55%'}}></div>
                      <div className="gs-bar" style={{height: '85%'}}></div>
                      <div className="gs-bar" style={{height: '65%'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Start Steps */}
        <section className="gs-steps section">
          <div className="container">
            <div className="section-header">
              <h2>Four Simple Steps to Success</h2>
              <p>Follow these steps to start trading smarter with AI-powered insights</p>
            </div>

            <div className="gs-steps-grid">
              {/* Step 1 */}
              <div className="gs-step">
                <div className="gs-step-number">1</div>
                <div className="gs-step-icon">👤</div>
                <h3>Create Your Account</h3>
                <p>Sign up in seconds with just your email. No credit card required for the 7-day free trial.</p>
                <ul className="gs-step-list">
                  <li>Click "Start Free Trial" on our homepage</li>
                  <li>Enter your email and create a secure password</li>
                  <li>Verify your email address</li>
                  <li>Complete your profile with basic information</li>
                </ul>
                <a href="https://app.tradeflows.net?signup=true" className="gs-step-link">
                  Create Account →
                </a>
              </div>

              {/* Step 2 */}
              <div className="gs-step">
                <div className="gs-step-number">2</div>
                <div className="gs-step-icon">⚡</div>
                <h3>Customize Your Dashboard</h3>
                <p>Build a workspace that matches your trading style with drag-and-drop widgets.</p>
                <ul className="gs-step-list">
                  <li>Add widgets: Charts, watchlists, news, and more</li>
                  <li>Drag and drop to arrange your perfect layout</li>
                  <li>Create multiple dashboard layouts for different strategies</li>
                  <li>Set your preferred markets, currency, and timezone</li>
                </ul>
                <div className="gs-step-tip">
                  <span className="tip-icon">💡</span>
                  <span>Pro Tip: Save different layouts for day trading vs. long-term investing</span>
                </div>
              </div>

              {/* Step 3 */}
              <div className="gs-step">
                <div className="gs-step-number">3</div>
                <div className="gs-step-icon">📊</div>
                <h3>Build Your Watchlist</h3>
                <p>Track the assets you care about and get real-time updates on price movements.</p>
                <ul className="gs-step-list">
                  <li>Search for stocks, crypto, forex, or commodities</li>
                  <li>Click the star icon to add symbols to your watchlist</li>
                  <li>Create custom lists (Tech Stocks, Dividend Kings, etc.)</li>
                  <li>Enable alerts for price movements and technical signals</li>
                </ul>
                <div className="gs-popular-symbols">
                  <span className="gs-symbol">AAPL</span>
                  <span className="gs-symbol">TSLA</span>
                  <span className="gs-symbol">BTC</span>
                  <span className="gs-symbol">ETH</span>
                </div>
              </div>

              {/* Step 4 */}
              <div className="gs-step">
                <div className="gs-step-number">4</div>
                <div className="gs-step-icon">🤖</div>
                <h3>Explore AI Recommendations</h3>
                <p>Let our AI analyze thousands of data points to find the best trading opportunities.</p>
                <ul className="gs-step-list">
                  <li>View daily AI-generated trade suggestions</li>
                  <li>See entry prices, targets, and stop losses</li>
                  <li>Check confidence scores and risk/reward ratios</li>
                  <li>Read detailed reasoning behind each recommendation</li>
                </ul>
                <div className="gs-ai-demo">
                  <div className="gs-ai-card">
                    <div className="gs-ai-header">
                      <span className="gs-ai-symbol">AAPL</span>
                      <span className="gs-ai-confidence">78% Confidence</span>
                    </div>
                    <div className="gs-ai-signal">Long Signal</div>
                    <div className="gs-ai-prices">
                      <span>Entry: $175.50</span>
                      <span>Target: $185.00</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Overview */}
        <section className="gs-features section bg-light">
          <div className="container">
            <div className="section-header">
              <h2>Explore Key Features</h2>
              <p>Powerful tools at your fingertips</p>
            </div>

            <div className="gs-features-grid">
              <div className="gs-feature-card">
                <div className="gs-feature-icon">📈</div>
                <h3>Advanced Charting</h3>
                <p>Professional-grade charts with 100+ technical indicators, multiple timeframes, and drawing tools.</p>
                <Link to="/knowledge-base/advanced-charting" className="gs-feature-link">
                  Learn More →
                </Link>
              </div>

              <div className="gs-feature-card">
                <div className="gs-feature-icon">💼</div>
                <h3>Portfolio Tracking</h3>
                <p>Monitor your investments in real-time with detailed analytics, P&L tracking, and performance metrics.</p>
                <Link to="/knowledge-base/portfolio-tracking" className="gs-feature-link">
                  Learn More →
                </Link>
              </div>

              <div className="gs-feature-card">
                <div className="gs-feature-icon">🔔</div>
                <h3>Smart Alerts</h3>
                <p>Never miss an opportunity with price alerts, technical indicator triggers, and AI signal notifications.</p>
                <Link to="/knowledge-base/real-time-data" className="gs-feature-link">
                  Learn More →
                </Link>
              </div>

              <div className="gs-feature-card">
                <div className="gs-feature-icon">📱</div>
                <h3>Mobile Apps</h3>
                <p>Trade on the go with our iOS and Android apps. Full feature parity with desktop platform.</p>
                <a href="https://app.tradeflows.net" className="gs-feature-link">
                  Download Apps →
                </a>
              </div>

              <div className="gs-feature-card">
                <div className="gs-feature-icon">🎓</div>
                <h3>Educational Resources</h3>
                <p>Learn trading strategies, technical analysis, and risk management from our comprehensive library.</p>
                <Link to="/blog" className="gs-feature-link">
                  Browse Resources →
                </Link>
              </div>

              <div className="gs-feature-card">
                <div className="gs-feature-icon">🔐</div>
                <h3>Bank-Level Security</h3>
                <p>Your data is protected with 256-bit encryption, 2FA, and SOC 2 Type II certified infrastructure.</p>
                <Link to="/knowledge-base/security" className="gs-feature-link">
                  Learn About Security →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Video Tutorial */}
        <section className="gs-video section">
          <div className="container">
            <div className="gs-video-container">
              <div className="gs-video-content">
                <div className="gs-video-badge">
                  <span>▶️</span>
                  <span>Video Tutorial</span>
                </div>
                <h2>Watch Our Platform Walkthrough</h2>
                <p>Get a complete tour of TradeFlows Pro in this 10-minute video. See how easy it is to navigate the platform, set up your workspace, and start trading with AI insights.</p>
                <div className="gs-video-stats">
                  <span><strong>10 min</strong> comprehensive tour</span>
                  <span><strong>50,000+</strong> views</span>
                  <span><strong>4.9/5</strong> rating</span>
                </div>
                <div className="gs-video-buttons">
                  <a href="https://app.tradeflows.net" className="btn btn-primary">
                    Watch Video Tutorial
                  </a>
                  <Link to="/features" className="btn btn-secondary">
                    Explore Features
                  </Link>
                </div>
              </div>
              <div className="gs-video-thumbnail">
                <div className="gs-video-placeholder">
                  <div className="gs-play-button">
                    <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                      <circle cx="30" cy="30" r="30" fill="rgba(59, 158, 255, 0.2)"/>
                      <circle cx="30" cy="30" r="24" fill="#3b9eff"/>
                      <path d="M25 20L40 30L25 40V20Z" fill="white"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Common Questions */}
        <section className="gs-faq section bg-light">
          <div className="container">
            <div className="section-header">
              <h2>Common Questions</h2>
              <p>Quick answers to help you get started faster</p>
            </div>

            <div className="gs-faq-grid">
              <div className="gs-faq-item">
                <h3>Do I need trading experience?</h3>
                <p>No! TradeFlows Pro is designed for both beginners and experienced traders. Our AI recommendations include educational context to help you learn as you trade.</p>
              </div>

              <div className="gs-faq-item">
                <h3>How much money do I need to start?</h3>
                <p>You can start with any amount. TradeFlows Pro is a platform for analysis and recommendations - you'll need a separate brokerage account to execute trades.</p>
              </div>

              <div className="gs-faq-item">
                <h3>Can I connect my existing broker?</h3>
                <p>Yes! We support integration with major brokers. Professional plan includes API access for automated trading through your connected broker.</p>
              </div>

              <div className="gs-faq-item">
                <h3>What devices are supported?</h3>
                <p>TradeFlows Pro works on desktop (Windows, Mac, Linux), mobile (iOS, Android), and tablets. Your data syncs seamlessly across all devices.</p>
              </div>

              <div className="gs-faq-item">
                <h3>Is real-time data included?</h3>
                <p>Yes! All plans include real-time market data for stocks, crypto, forex, and commodities. No additional data fees.</p>
              </div>

              <div className="gs-faq-item">
                <h3>Can I cancel anytime?</h3>
                <p>Absolutely. No contracts or commitments. Cancel your subscription anytime from your account settings. You'll retain access until the end of your billing period.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Next Steps */}
        <section className="gs-next section">
          <div className="container">
            <div className="gs-next-content">
              <h2>Ready to Start Trading Smarter?</h2>
              <p>Join thousands of traders using AI to make better trading decisions</p>
              <div className="gs-next-buttons">
                <a href="https://app.tradeflows.net?signup=true&plan=trial" className="btn btn-primary btn-large">
                  Start Free 7-Day Trial
                </a>
                <Link to="/pricing" className="btn btn-secondary btn-large">
                  View Pricing Plans
                </Link>
              </div>
              <p className="gs-next-note">
                No credit card required for trial • Cancel anytime • Full access to all Premium features
              </p>
            </div>

            <div className="gs-next-help">
              <h3>Need Help Getting Started?</h3>
              <div className="gs-help-options">
                <div className="gs-help-option">
                  <div className="gs-help-icon">💬</div>
                  <div className="gs-help-content">
                    <h4>Live Chat</h4>
                    <p>Instant support from our team</p>
                    <button className="gs-help-link">Start Chat</button>
                  </div>
                </div>
                <div className="gs-help-option">
                  <div className="gs-help-icon">📧</div>
                  <div className="gs-help-content">
                    <h4>Email Support</h4>
                    <p>support@tradeflows.net</p>
                    <a href="mailto:support@tradeflows.net" className="gs-help-link">Send Email</a>
                  </div>
                </div>
                <div className="gs-help-option">
                  <div className="gs-help-icon">📞</div>
                  <div className="gs-help-content">
                    <h4>Phone Support</h4>
                    <p>1-800-TRADE-PRO</p>
                    <a href="tel:1-800-873-2337" className="gs-help-link">Call Us</a>
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
