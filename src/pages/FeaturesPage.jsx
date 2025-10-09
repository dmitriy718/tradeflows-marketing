import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import './FeaturesPage.css'

export default function FeaturesPage() {
  return (
    <>
      <Helmet>
        <title>Features - TradeFlows Pro Trading Platform</title>
        <meta name="description" content="Explore TradeFlows Pro's comprehensive feature set: real-time market data, AI-powered strategies, advanced charting, portfolio management, and more." />
      </Helmet>

      <div className="features-page">
        {/* Hero */}
        <section className="features-hero">
          <div className="container">
            <div className="features-hero-content">
              <h1>Everything You Need to <span className="gradient-text">Trade Like a Pro</span></h1>
              <p>Comprehensive suite of professional trading tools, AI-powered insights, and real-time market data all in one powerful platform.</p>
              <a href="https://app.tradeflows.net?signup=true" className="btn btn-primary btn-large">
                Start Free Trial
              </a>
            </div>
          </div>
        </section>

        {/* Real-Time Data */}
        <section id="real-time-data" className="feature-section section">
          <div className="container">
            <div className="feature-content">
              <div className="feature-text">
                <div className="feature-badge">Real-Time Data</div>
                <h2>Lightning-Fast Market Data</h2>
                <p className="feature-description">
                  Stream live quotes, order book data, and market depth across stocks, crypto, forex, and commodities. Our ultra-low latency infrastructure ensures you never miss a trading opportunity.
                </p>
                <ul className="feature-list">
                  <li><strong>Multi-Market Coverage:</strong> Stocks, Options, Crypto, Forex, Futures, Commodities</li>
                  <li><strong>Level 2 Market Data:</strong> Full order book and market depth visualization</li>
                  <li><strong>Real-Time News:</strong> Instant market-moving news and sentiment analysis</li>
                  <li><strong>Historical Data:</strong> Access years of historical tick data for backtesting</li>
                  <li><strong>Custom Watchlists:</strong> Organize and monitor unlimited symbols</li>
                </ul>
                <Link to="/knowledge-base/real-time-data" className="feature-learn-more">
                  Learn more about real-time data →
                </Link>
              </div>
              <div className="feature-visual">
                <div className="feature-card-visual">
                  <div className="visual-header">
                    <span className="visual-title">Live Market Data</span>
                    <span className="status-indicator live">● LIVE</span>
                  </div>
                  <div className="ticker-display">
                    <div className="ticker positive">
                      <span className="ticker-symbol">AAPL</span>
                      <span className="ticker-price">$182.45</span>
                      <span className="ticker-change">+2.35%</span>
                    </div>
                    <div className="ticker positive">
                      <span className="ticker-symbol">BTC/USD</span>
                      <span className="ticker-price">$42,150</span>
                      <span className="ticker-change">+5.12%</span>
                    </div>
                    <div className="ticker negative">
                      <span className="ticker-symbol">EUR/USD</span>
                      <span className="ticker-price">1.0845</span>
                      <span className="ticker-change">-0.45%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* AI Strategies */}
        <section id="ai-strategies" className="feature-section section alt-bg">
          <div className="container">
            <div className="feature-content reverse">
              <div className="feature-text">
                <div className="feature-badge">AI-Powered</div>
                <h2>Intelligent Strategy Recommendations</h2>
                <p className="feature-description">
                  Leverage advanced machine learning algorithms to identify profitable trading opportunities. Our AI analyzes thousands of data points to suggest strategies tailored to your risk profile and market conditions.
                </p>
                <ul className="feature-list">
                  <li><strong>Pattern Recognition:</strong> AI identifies chart patterns and technical setups</li>
                  <li><strong>Sentiment Analysis:</strong> Real-time analysis of news and social media sentiment</li>
                  <li><strong>Risk Scoring:</strong> Automated risk assessment for every trade suggestion</li>
                  <li><strong>Backtesting:</strong> Test strategies against historical data before trading</li>
                  <li><strong>Strategy Optimization:</strong> Continuous learning from market data</li>
                </ul>
                <Link to="/knowledge-base/ai-strategies" className="feature-learn-more">
                  Learn more about AI strategies →
                </Link>
              </div>
              <div className="feature-visual">
                <div className="feature-card-visual">
                  <div className="visual-header">
                    <span className="visual-title">AI Recommendation</span>
                    <span className="confidence-badge">95% Confidence</span>
                  </div>
                  <div className="ai-suggestion">
                    <div className="suggestion-header">
                      <span className="suggestion-type">Long Position</span>
                      <span className="suggestion-symbol">NVDA</span>
                    </div>
                    <div className="suggestion-details">
                      <div className="detail-row">
                        <span>Entry:</span>
                        <span className="value">$485.20</span>
                      </div>
                      <div className="detail-row">
                        <span>Target:</span>
                        <span className="value positive">$525.00 (+8.2%)</span>
                      </div>
                      <div className="detail-row">
                        <span>Stop Loss:</span>
                        <span className="value">$470.00</span>
                      </div>
                      <div className="detail-row">
                        <span>Risk/Reward:</span>
                        <span className="value">1:2.6</span>
                      </div>
                    </div>
                    <div className="suggestion-reason">
                      <strong>AI Analysis:</strong> Bullish divergence detected on 4H chart. Strong support at $480. Positive earnings sentiment.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Technical Analysis */}
        <section id="technical-analysis" className="feature-section section">
          <div className="container">
            <div className="feature-content">
              <div className="feature-text">
                <div className="feature-badge">Charting & Analysis</div>
                <h2>Professional Technical Analysis Tools</h2>
                <p className="feature-description">
                  Advanced charting powered by TradingView with 100+ technical indicators, drawing tools, and chart patterns. Everything professional traders need in one integrated platform.
                </p>
                <ul className="feature-list">
                  <li><strong>100+ Indicators:</strong> RSI, MACD, Bollinger Bands, Fibonacci, and more</li>
                  <li><strong>Drawing Tools:</strong> Trendlines, channels, Fibonacci retracements, shapes</li>
                  <li><strong>Multiple Timeframes:</strong> From 1-minute to monthly charts</li>
                  <li><strong>Chart Types:</strong> Candlestick, OHLC, Line, Heikin Ashi, Renko</li>
                  <li><strong>Pattern Recognition:</strong> Automatic detection of chart patterns</li>
                  <li><strong>Custom Indicators:</strong> Create and share your own indicators</li>
                </ul>
                <Link to="/knowledge-base/technical-analysis" className="feature-learn-more">
                  Learn more about technical analysis →
                </Link>
              </div>
              <div className="feature-visual">
                <div className="feature-card-visual">
                  <div className="visual-header">
                    <span className="visual-title">Advanced Charting</span>
                  </div>
                  <div className="chart-preview">
                    <svg viewBox="0 0 400 200" className="chart-svg">
                      {/* Candlestick chart representation */}
                      <rect x="30" y="100" width="8" height="40" fill="#ef4444"/>
                      <rect x="50" y="80" width="8" height="60" fill="#10b981"/>
                      <rect x="70" y="90" width="8" height="50" fill="#10b981"/>
                      <rect x="90" y="70" width="8" height="70" fill="#10b981"/>
                      <rect x="110" y="85" width="8" height="55" fill="#ef4444"/>
                      <rect x="130" y="75" width="8" height="65" fill="#10b981"/>
                      <rect x="150" y="65" width="8" height="75" fill="#10b981"/>
                      <rect x="170" y="80" width="8" height="60" fill="#ef4444"/>
                      <rect x="190" y="70" width="8" height="70" fill="#10b981"/>
                      <rect x="210" y="60" width="8" height="80" fill="#10b981"/>
                      <rect x="230" y="55" width="8" height="85" fill="#10b981"/>
                      <rect x="250" y="65" width="8" height="75" fill="#ef4444"/>
                      <rect x="270" y="50" width="8" height="90" fill="#10b981"/>
                      <rect x="290" y="45" width="8" height="95" fill="#10b981"/>
                      <rect x="310" y="55" width="8" height="85" fill="#ef4444"/>
                      <rect x="330" y="40" width="8" height="100" fill="#10b981"/>
                      <rect x="350" y="35" width="8" height="105" fill="#10b981"/>
                      <rect x="370" y="50" width="8" height="90" fill="#ef4444"/>
                      {/* Moving averages */}
                      <path d="M 30 110 Q 100 90, 200 75 T 370 60" stroke="#3b9eff" strokeWidth="2" fill="none"/>
                      <path d="M 30 120 Q 100 100, 200 85 T 370 70" stroke="#a78bfa" strokeWidth="2" fill="none" strokeDasharray="5,5"/>
                    </svg>
                    <div className="indicator-labels">
                      <span className="indicator-label"><span className="indicator-color blue"></span> MA(20)</span>
                      <span className="indicator-label"><span className="indicator-color purple"></span> MA(50)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Portfolio Management */}
        <section id="portfolio" className="feature-section section alt-bg">
          <div className="container">
            <div className="feature-content reverse">
              <div className="feature-text">
                <div className="feature-badge">Portfolio</div>
                <h2>Advanced Portfolio Management</h2>
                <p className="feature-description">
                  Track, analyze, and optimize your entire portfolio with institutional-grade tools. Monitor real-time P&L, analyze risk exposure, and make data-driven portfolio decisions.
                </p>
                <ul className="feature-list">
                  <li><strong>Real-Time P&L:</strong> Live profit/loss tracking across all positions</li>
                  <li><strong>Risk Analysis:</strong> Portfolio beta, volatility, and correlation metrics</li>
                  <li><strong>Asset Allocation:</strong> Diversification analysis and rebalancing suggestions</li>
                  <li><strong>Performance Metrics:</strong> Sharpe ratio, max drawdown, win rate, and more</li>
                  <li><strong>Tax Reporting:</strong> Detailed reports for tax purposes</li>
                  <li><strong>Multi-Account:</strong> Manage multiple portfolios from one dashboard</li>
                </ul>
                <Link to="/knowledge-base/portfolio-management" className="feature-learn-more">
                  Learn more about portfolio management →
                </Link>
              </div>
              <div className="feature-visual">
                <div className="feature-card-visual">
                  <div className="visual-header">
                    <span className="visual-title">Portfolio Overview</span>
                  </div>
                  <div className="portfolio-stats">
                    <div className="stat-row">
                      <span>Total Value</span>
                      <span className="stat-value">$125,430</span>
                    </div>
                    <div className="stat-row">
                      <span>Today's P&L</span>
                      <span className="stat-value positive">+$2,145 (+1.74%)</span>
                    </div>
                    <div className="stat-row">
                      <span>All-Time P&L</span>
                      <span className="stat-value positive">+$45,230 (+56.3%)</span>
                    </div>
                  </div>
                  <div className="allocation-chart">
                    <div className="allocation-bar">
                      <div className="bar-segment stocks" style={{width: '45%'}}>Stocks</div>
                      <div className="bar-segment crypto" style={{width: '30%'}}>Crypto</div>
                      <div className="bar-segment forex" style={{width: '15%'}}>Forex</div>
                      <div className="bar-segment cash" style={{width: '10%'}}>Cash</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Alerts */}
        <section id="alerts" className="feature-section section">
          <div className="container">
            <div className="feature-content">
              <div className="feature-text">
                <div className="feature-badge">Alerts</div>
                <h2>Smart Alerts & Notifications</h2>
                <p className="feature-description">
                  Never miss an important market move. Set custom price alerts, technical indicator signals, and receive AI-powered trade notifications across all your devices.
                </p>
                <ul className="feature-list">
                  <li><strong>Price Alerts:</strong> Triggered when price crosses your specified levels</li>
                  <li><strong>Technical Alerts:</strong> RSI overbought/oversold, MACD crossovers, etc.</li>
                  <li><strong>AI Signals:</strong> Smart notifications when AI identifies opportunities</li>
                  <li><strong>News Alerts:</strong> Breaking news for your watchlist symbols</li>
                  <li><strong>Multi-Channel:</strong> Push, email, SMS, and in-app notifications</li>
                  <li><strong>Smart Filtering:</strong> Only receive alerts that matter to you</li>
                </ul>
                <Link to="/knowledge-base/alerts" className="feature-learn-more">
                  Learn more about alerts →
                </Link>
              </div>
              <div className="feature-visual">
                <div className="feature-card-visual">
                  <div className="visual-header">
                    <span className="visual-title">Active Alerts</span>
                    <span className="alerts-count">3 Active</span>
                  </div>
                  <div className="alerts-list">
                    <div className="alert-item price">
                      <div className="alert-icon">📈</div>
                      <div className="alert-content">
                        <div className="alert-title">Price Alert</div>
                        <div className="alert-desc">AAPL crossed $185</div>
                      </div>
                      <div className="alert-time">2m ago</div>
                    </div>
                    <div className="alert-item ai">
                      <div className="alert-icon">🤖</div>
                      <div className="alert-content">
                        <div className="alert-title">AI Signal</div>
                        <div className="alert-desc">Bullish setup on TSLA</div>
                      </div>
                      <div className="alert-time">15m ago</div>
                    </div>
                    <div className="alert-item news">
                      <div className="alert-icon">📰</div>
                      <div className="alert-content">
                        <div className="alert-title">Breaking News</div>
                        <div className="alert-desc">MSFT earnings beat</div>
                      </div>
                      <div className="alert-time">1h ago</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Analytics */}
        <section id="analytics" className="feature-section section alt-bg">
          <div className="container">
            <div className="feature-content reverse">
              <div className="feature-text">
                <div className="feature-badge">Analytics</div>
                <h2>Performance Analytics & Insights</h2>
                <p className="feature-description">
                  Deep dive into your trading performance with comprehensive analytics. Identify what works, what doesn't, and continuously improve your trading strategy.
                </p>
                <ul className="feature-list">
                  <li><strong>Trade Journal:</strong> Automatic logging of all trades with notes</li>
                  <li><strong>Win/Loss Analysis:</strong> Detailed breakdown of winning vs losing trades</li>
                  <li><strong>Strategy Performance:</strong> Track performance by strategy type</li>
                  <li><strong>Time Analysis:</strong> Best/worst times of day, days of week</li>
                  <li><strong>Symbol Analysis:</strong> Performance by asset class and symbol</li>
                  <li><strong>Custom Reports:</strong> Export detailed reports for analysis</li>
                </ul>
                <Link to="/knowledge-base/analytics" className="feature-learn-more">
                  Learn more about analytics →
                </Link>
              </div>
              <div className="feature-visual">
                <div className="feature-card-visual">
                  <div className="visual-header">
                    <span className="visual-title">Performance Metrics</span>
                  </div>
                  <div className="metrics-grid">
                    <div className="metric-box">
                      <div className="metric-label">Win Rate</div>
                      <div className="metric-value positive">67.5%</div>
                    </div>
                    <div className="metric-box">
                      <div className="metric-label">Avg Win</div>
                      <div className="metric-value">$340</div>
                    </div>
                    <div className="metric-box">
                      <div className="metric-label">Avg Loss</div>
                      <div className="metric-value">$180</div>
                    </div>
                    <div className="metric-box">
                      <div className="metric-label">Profit Factor</div>
                      <div className="metric-value positive">2.35</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="features-cta section">
          <div className="container">
            <div className="cta-box">
              <h2>Ready to Experience TradeFlows Pro?</h2>
              <p>Start your 7-day free trial and see why thousands of traders trust TradeFlows</p>
              <div className="cta-actions">
                <a href="https://app.tradeflows.net?signup=true" className="btn btn-primary btn-large">
                  Start Free Trial
                </a>
                <Link to="/pricing" className="btn btn-secondary btn-large">
                  View Pricing
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
