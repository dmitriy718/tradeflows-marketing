import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import ROICalculator from '../components/ROICalculator'
import './ComparisonPage.css'

export default function ComparisonPage() {
  const comparisons = [
    {
      category: "Platform Type",
      tradeflows: "Standalone Professional Platform",
      luxalgo: "TradingView Add-on Only",
      winner: "tradeflows",
      importance: "high"
    },
    {
      category: "User Base",
      tradeflows: "50,000+ Active Traders",
      luxalgo: "15,000+ Traders",
      winner: "tradeflows",
      importance: "medium"
    },
    {
      category: "Trading Volume",
      tradeflows: "$2.5B+ Monthly Volume",
      luxalgo: "Not Disclosed",
      winner: "tradeflows",
      importance: "medium"
    },
    {
      category: "Real-Time Market Data",
      tradeflows: "Built-in Multi-Asset Data",
      luxalgo: "Requires TradingView Subscription",
      winner: "tradeflows",
      importance: "high"
    },
    {
      category: "AI-Powered Strategies",
      tradeflows: "Advanced AI Strategy Builder & Recommendations",
      luxalgo: "AI Backtesting Assistant (Ultimate plan only)",
      winner: "tradeflows",
      importance: "high"
    },
    {
      category: "Portfolio Management",
      tradeflows: "Advanced Multi-Account Portfolio Analytics",
      luxalgo: "Not Available",
      winner: "tradeflows",
      importance: "high"
    },
    {
      category: "Asset Classes",
      tradeflows: "Stocks, Crypto, Forex, Commodities, Options",
      luxalgo: "Limited to TradingView Supported Assets",
      winner: "tradeflows",
      importance: "high"
    },
    {
      category: "Technical Indicators",
      tradeflows: "100+ Indicators + Custom Builder",
      luxalgo: "50+ Pre-built Indicators",
      winner: "tradeflows",
      importance: "medium"
    },
    {
      category: "Backtesting Engine",
      tradeflows: "Unlimited Advanced Backtesting (Pro Plan)",
      luxalgo: "Limited to Ultimate Plan ($59.99/mo)",
      winner: "tradeflows",
      importance: "high"
    },
    {
      category: "API Access",
      tradeflows: "Full REST API (10K calls/day on Pro)",
      luxalgo: "Not Available",
      winner: "tradeflows",
      importance: "high"
    },
    {
      category: "Mobile Apps",
      tradeflows: "Native iOS & Android Apps",
      luxalgo: "Depends on TradingView Mobile",
      winner: "tradeflows",
      importance: "medium"
    },
    {
      category: "Custom Alerts",
      tradeflows: "Unlimited on All Paid Plans",
      luxalgo: "Limited on Basic Plans",
      winner: "tradeflows",
      importance: "medium"
    },
    {
      category: "Support",
      tradeflows: "24/7 Priority + Dedicated Account Manager (Pro)",
      luxalgo: "24/7 Support (Basic)",
      winner: "tradeflows",
      importance: "medium"
    },
    {
      category: "Data Export",
      tradeflows: "CSV, JSON, Excel",
      luxalgo: "Limited Export Options",
      winner: "tradeflows",
      importance: "low"
    },
    {
      category: "Starting Price",
      tradeflows: "$49.99/month (Premium)",
      luxalgo: "$24.99/month (Essential)",
      winner: "luxalgo",
      importance: "medium"
    },
    {
      category: "Professional Plan Price",
      tradeflows: "$79.99/month (All Features)",
      luxalgo: "$59.99/month (Limited Features)",
      winner: "tradeflows",
      importance: "high"
    },
    {
      category: "Free Trial",
      tradeflows: "7 Days Full Access",
      luxalgo: "30-Day Money Back Guarantee",
      winner: "tie",
      importance: "low"
    },
    {
      category: "Historical Data",
      tradeflows: "Unlimited (Pro), 5 Years (Premium)",
      luxalgo: "Limited Historical Access",
      winner: "tradeflows",
      importance: "medium"
    },
    {
      category: "Risk Analytics",
      tradeflows: "Advanced Institutional-Grade Analytics",
      luxalgo: "Basic Risk Metrics",
      winner: "tradeflows",
      importance: "high"
    },
    {
      category: "Market Scanner",
      tradeflows: "Advanced Multi-Market Scanner",
      luxalgo: "Scanner with Alerts (Premium+)",
      winner: "tradeflows",
      importance: "high"
    }
  ]

  const tfWins = comparisons.filter(c => c.winner === 'tradeflows').length
  const luxWins = comparisons.filter(c => c.winner === 'luxalgo').length
  const ties = comparisons.filter(c => c.winner === 'tie').length

  return (
    <>
      <Helmet>
        <title>TradeFlows Pro vs LuxAlgo - Detailed Comparison</title>
        <meta name="description" content="See how TradeFlows Pro compares to LuxAlgo. Feature-by-feature comparison showing why TradeFlows Pro delivers more value for professional traders." />
        <meta name="keywords" content="TradeFlows vs LuxAlgo, trading platform comparison, LuxAlgo alternative, best trading platform" />
      </Helmet>

      <div className="comparison-page">
        {/* Hero */}
        <section className="comparison-hero">
          <div className="container">
            <h1>
              TradeFlows Pro vs <span className="competitor">LuxAlgo</span>
            </h1>
            <p className="hero-subtitle">
              A comprehensive, feature-by-feature comparison of two leading trading platforms
            </p>

            <div className="score-summary">
              <div className="score-card winner">
                <div className="platform-name">TradeFlows Pro</div>
                <div className="score">{tfWins}</div>
                <div className="score-label">Features Won</div>
              </div>
              <div className="vs-divider">VS</div>
              <div className="score-card">
                <div className="platform-name">LuxAlgo</div>
                <div className="score">{luxWins}</div>
                <div className="score-label">Features Won</div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Summary */}
        <section className="quick-summary section">
          <div className="container">
            <div className="summary-grid">
              <div className="summary-card tradeflows-card">
                <div className="card-badge">Our Platform</div>
                <h3>TradeFlows Pro</h3>
                <div className="summary-highlights">
                  <div className="highlight-item">
                    <span className="highlight-icon">✓</span>
                    <span>Standalone professional platform</span>
                  </div>
                  <div className="highlight-item">
                    <span className="highlight-icon">✓</span>
                    <span>50K+ active traders</span>
                  </div>
                  <div className="highlight-item">
                    <span className="highlight-icon">✓</span>
                    <span>Complete portfolio management</span>
                  </div>
                  <div className="highlight-item">
                    <span className="highlight-icon">✓</span>
                    <span>Full API access on Pro plan</span>
                  </div>
                  <div className="highlight-item">
                    <span className="highlight-icon">✓</span>
                    <span>Multi-asset real-time data</span>
                  </div>
                </div>
                <div className="summary-price">
                  <span className="price">$49.99/mo</span>
                  <span className="price-label">Premium Plan</span>
                </div>
              </div>

              <div className="summary-card competitor-card">
                <div className="card-badge competitor-badge">Competitor</div>
                <h3>LuxAlgo</h3>
                <div className="summary-highlights">
                  <div className="highlight-item">
                    <span className="highlight-icon">−</span>
                    <span>TradingView add-on only</span>
                  </div>
                  <div className="highlight-item">
                    <span className="highlight-icon">−</span>
                    <span>15K traders</span>
                  </div>
                  <div className="highlight-item">
                    <span className="highlight-icon">−</span>
                    <span>No portfolio management</span>
                  </div>
                  <div className="highlight-item">
                    <span className="highlight-icon">−</span>
                    <span>No API access</span>
                  </div>
                  <div className="highlight-item">
                    <span className="highlight-icon">−</span>
                    <span>Requires TradingView subscription</span>
                  </div>
                </div>
                <div className="summary-price">
                  <span className="price">$24.99/mo</span>
                  <span className="price-label">Essential Plan</span>
                  <span className="price-note">+ TradingView costs</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Comparison */}
        <section className="detailed-comparison section">
          <div className="container">
            <h2 className="section-title">Feature-by-Feature Comparison</h2>

            <div className="comparison-table-wrapper">
              <table className="comparison-table">
                <thead>
                  <tr>
                    <th className="feature-col">Feature</th>
                    <th className="platform-col tradeflows-col">
                      <div className="platform-header">
                        <span className="platform-logo">TF</span>
                        <span>TradeFlows Pro</span>
                      </div>
                    </th>
                    <th className="platform-col luxalgo-col">
                      <div className="platform-header">
                        <span className="platform-logo">LA</span>
                        <span>LuxAlgo</span>
                      </div>
                    </th>
                    <th className="winner-col">Winner</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisons.map((comp, index) => (
                    <tr key={index} className={comp.importance === 'high' ? 'high-importance' : ''}>
                      <td className="feature-name">
                        {comp.category}
                        {comp.importance === 'high' && <span className="importance-badge">Key Feature</span>}
                      </td>
                      <td className={`feature-value ${comp.winner === 'tradeflows' ? 'winner-cell' : ''}`}>
                        {comp.tradeflows}
                      </td>
                      <td className={`feature-value ${comp.winner === 'luxalgo' ? 'winner-cell' : ''}`}>
                        {comp.luxalgo}
                      </td>
                      <td className="winner-indicator">
                        {comp.winner === 'tradeflows' && <span className="win-badge tf-win">TradeFlows</span>}
                        {comp.winner === 'luxalgo' && <span className="win-badge lux-win">LuxAlgo</span>}
                        {comp.winner === 'tie' && <span className="win-badge tie">Tie</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ROI Calculator */}
        <section className="roi-calculator-section section">
          <div className="container">
            <ROICalculator />
          </div>
        </section>

        {/* Value Proposition */}
        <section className="value-section section">
          <div className="container">
            <h2 className="section-title">The Real Value Comparison</h2>

            <div className="value-grid">
              <div className="value-card">
                <h3>LuxAlgo Ultimate</h3>
                <div className="value-price">$59.99/month</div>
                <div className="value-additional">+ TradingView Pro ($14.95/mo minimum)</div>
                <div className="value-total">= $74.94/month minimum</div>
                <ul className="value-features">
                  <li>TradingView integration only</li>
                  <li>AI backtesting</li>
                  <li>3 Backtesters</li>
                  <li>No portfolio management</li>
                  <li>No API access</li>
                  <li>Limited to TradingView assets</li>
                </ul>
              </div>

              <div className="value-card highlight-card">
                <div className="value-badge">Better Value</div>
                <h3>TradeFlows Pro</h3>
                <div className="value-price">$79.99/month</div>
                <div className="value-additional">Everything included</div>
                <div className="value-total">= $79.99/month total</div>
                <ul className="value-features">
                  <li>Standalone professional platform</li>
                  <li>Unlimited backtesting</li>
                  <li>Advanced portfolio analytics</li>
                  <li>Full REST API (10K calls/day)</li>
                  <li>Multi-account management</li>
                  <li>All asset classes included</li>
                  <li>24/7 priority support</li>
                  <li>Dedicated account manager</li>
                </ul>
                <div className="value-savings">
                  Save $5/month + Get 5x More Features
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="comparison-cta section">
          <div className="container">
            <div className="cta-content">
              <h2>Ready to Experience the Difference?</h2>
              <p>
                Join 50,000+ traders who chose TradeFlows Pro for its comprehensive features,
                better value, and professional-grade analytics.
              </p>
              <div className="cta-actions">
                <a href="https://app.tradeflows.net?signup=true&utm_source=website&utm_medium=comparison&utm_campaign=vs-luxalgo" className="btn btn-primary btn-large">
                  Start Free 7-Day Trial
                </a>
                <Link to="/pricing" className="btn btn-secondary btn-large">
                  View All Plans
                </Link>
              </div>
              <div className="cta-features">
                <span>✓ Full platform access</span>
                <span>✓ No credit card required</span>
                <span>✓ Cancel anytime</span>
                <span>✓ 30-day money-back guarantee</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
