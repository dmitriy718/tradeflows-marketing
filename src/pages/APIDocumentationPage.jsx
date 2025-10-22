import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import './APIDocumentationPage.css'

export default function APIDocumentationPage() {
  const [activeTab, setActiveTab] = useState('curl')
  const [activeEndpoint, setActiveEndpoint] = useState('quotes')

  const codeExamples = {
    curl: {
      quotes: `curl -H "Authorization: Bearer YOUR_API_KEY" \\
  https://api.tradeflows.net/v1/quotes/AAPL`,
      bars: `curl -H "Authorization: Bearer YOUR_API_KEY" \\
  "https://api.tradeflows.net/v1/bars/AAPL?timeframe=1d&limit=100"`,
      portfolio: `curl -H "Authorization: Bearer YOUR_API_KEY" \\
  https://api.tradeflows.net/v1/portfolio`
    },
    python: {
      quotes: `from tradeflows import TradeFlows

tf = TradeFlows(api_key='YOUR_API_KEY')
data = tf.get_quote('AAPL')
print(f"Price: {data['price']}")`,
      bars: `from tradeflows import TradeFlows

tf = TradeFlows(api_key='YOUR_API_KEY')
bars = tf.get_bars('AAPL', timeframe='1d', limit=100)
for bar in bars:
    print(f"{bar['time']}: {bar['close']}")`,
      portfolio: `from tradeflows import TradeFlows

tf = TradeFlows(api_key='YOUR_API_KEY')
portfolio = tf.get_portfolio()
print(f"Total Value: {portfolio['total_value']}")`
    },
    javascript: {
      quotes: `const TradeFlows = require('tradeflows-js');

const tf = new TradeFlows('YOUR_API_KEY');
const data = await tf.getQuote('AAPL');
console.log('Price:', data.price);`,
      bars: `const TradeFlows = require('tradeflows-js');

const tf = new TradeFlows('YOUR_API_KEY');
const bars = await tf.getBars('AAPL', {
  timeframe: '1d',
  limit: 100
});`,
      portfolio: `const TradeFlows = require('tradeflows-js');

const tf = new TradeFlows('YOUR_API_KEY');
const portfolio = await tf.getPortfolio();
console.log('Total:', portfolio.totalValue);`
    }
  }

  return (
    <>
      <Helmet>
        <title>API Documentation - TradeFlows Pro</title>
        <meta name="description" content="Complete REST API and WebSocket documentation for TradeFlows Pro. Get real-time market data, manage portfolios, and access AI recommendations programmatically." />
      </Helmet>

      <div className="api-docs-page">
        {/* Hero Section */}
        <section className="api-hero">
          <div className="container">
            <div className="api-hero-content">
              <div className="api-hero-badge">
                <span className="api-badge-icon">🔌</span>
                <span>API Documentation</span>
                <span className="api-status">
                  <span className="api-status-dot"></span>
                  All Systems Operational
                </span>
              </div>
              <h1 className="api-hero-title">Powerful APIs for Developers</h1>
              <p className="api-hero-subtitle">
                Build sophisticated trading applications with our comprehensive REST API and real-time WebSocket connections. Access market data, AI recommendations, and portfolio management programmatically.
              </p>
              <div className="api-hero-features">
                <div className="api-feature">
                  <span className="api-feature-icon">⚡</span>
                  <span>Real-time Data</span>
                </div>
                <div className="api-feature">
                  <span className="api-feature-icon">🔒</span>
                  <span>Secure Authentication</span>
                </div>
                <div className="api-feature">
                  <span className="api-feature-icon">📊</span>
                  <span>10,000 Requests/Day</span>
                </div>
                <div className="api-feature">
                  <span className="api-feature-icon">🚀</span>
                  <span>99.9% Uptime</span>
                </div>
              </div>
            </div>
            <div className="api-hero-code">
              <div className="api-code-window">
                <div className="api-code-header">
                  <div className="api-code-dots">
                    <span></span><span></span><span></span>
                  </div>
                  <span className="api-code-title">example.py</span>
                </div>
                <div className="api-code-content">
                  <pre><code>{`from tradeflows import TradeFlows

# Initialize client
tf = TradeFlows(api_key='YOUR_API_KEY')

# Get real-time quote
quote = tf.get_quote('AAPL')
print(f"AAPL: ${'$'}{quote.price}")

# Get AI recommendation
recs = tf.get_recommendations(
    confidence_min=75
)
for rec in recs:
    print(f"{rec.symbol}: {rec.direction}")
    print(f"Entry: ${'$'}{rec.entry_price}")`}</code></pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Start */}
        <section className="api-quickstart section">
          <div className="container">
            <div className="section-header">
              <h2>Quick Start</h2>
              <p>Get up and running with TradeFlows API in minutes</p>
            </div>

            <div className="api-quickstart-grid">
              <div className="api-quick-step">
                <div className="api-quick-number">1</div>
                <h3>Get Your API Key</h3>
                <p>Generate an API key from your account settings. Professional plan includes 10,000 requests per day.</p>
                <a href="https://app.tradeflows.net/settings/api" className="api-quick-link">
                  Generate API Key →
                </a>
              </div>

              <div className="api-quick-step">
                <div className="api-quick-number">2</div>
                <h3>Choose Your Language</h3>
                <p>Install our official SDK for Python, JavaScript, or use direct HTTP requests with any language.</p>
                <div className="api-lang-buttons">
                  <button className="api-lang-btn">Python</button>
                  <button className="api-lang-btn">JavaScript</button>
                  <button className="api-lang-btn">Java</button>
                </div>
              </div>

              <div className="api-quick-step">
                <div className="api-quick-number">3</div>
                <h3>Make Your First Request</h3>
                <p>Start fetching real-time market data, AI recommendations, and manage portfolios programmatically.</p>
                <div className="api-endpoint-example">
                  <code>https://api.tradeflows.net/v1/quotes/AAPL</code>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Authentication */}
        <section className="api-auth section bg-light">
          <div className="container">
            <div className="api-auth-content">
              <div className="api-auth-info">
                <div className="api-section-badge">
                  <span>🔐</span>
                  <span>Authentication</span>
                </div>
                <h2>Secure API Access</h2>
                <p>All API requests must include your API key in the Authorization header. Your key is tied to your account and plan limits.</p>

                <div className="api-auth-steps">
                  <div className="api-auth-step">
                    <h4>1. Generate API Key</h4>
                    <p>Go to Settings → API Keys and create a new key with appropriate permissions.</p>
                  </div>
                  <div className="api-auth-step">
                    <h4>2. Set Permissions</h4>
                    <p>Choose read-only or read-write access based on your needs. Use read-only when possible.</p>
                  </div>
                  <div className="api-auth-step">
                    <h4>3. Include in Requests</h4>
                    <p>Add your API key to the Authorization header in every request.</p>
                  </div>
                </div>

                <div className="api-security-notes">
                  <h4>Security Best Practices</h4>
                  <ul>
                    <li>Never commit API keys to version control</li>
                    <li>Use environment variables for keys</li>
                    <li>Rotate keys regularly (every 90 days)</li>
                    <li>Use read-only keys when write access isn't needed</li>
                    <li>Monitor API usage for suspicious activity</li>
                  </ul>
                </div>
              </div>
              <div className="api-auth-code">
                <div className="api-code-tabs">
                  <button
                    className={activeTab === 'curl' ? 'active' : ''}
                    onClick={() => setActiveTab('curl')}
                  >
                    cURL
                  </button>
                  <button
                    className={activeTab === 'python' ? 'active' : ''}
                    onClick={() => setActiveTab('python')}
                  >
                    Python
                  </button>
                  <button
                    className={activeTab === 'javascript' ? 'active' : ''}
                    onClick={() => setActiveTab('javascript')}
                  >
                    JavaScript
                  </button>
                </div>
                <div className="api-code-block">
                  <pre><code>{activeTab === 'curl' ?
`# Include in header
Authorization: Bearer YOUR_API_KEY

# Example request
curl -H "Authorization: Bearer YOUR_API_KEY" \\
  https://api.tradeflows.net/v1/quotes/AAPL` :
activeTab === 'python' ?
`from tradeflows import TradeFlows

# Initialize with API key
tf = TradeFlows(api_key='YOUR_API_KEY')

# Make authenticated request
quote = tf.get_quote('AAPL')` :
`const TradeFlows = require('tradeflows-js');

// Initialize with API key
const tf = new TradeFlows('YOUR_API_KEY');

// Make authenticated request
const quote = await tf.getQuote('AAPL');`
                  }</code></pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Endpoints */}
        <section className="api-endpoints section">
          <div className="container">
            <div className="section-header">
              <h2>API Endpoints</h2>
              <p>Comprehensive REST API for market data and portfolio management</p>
            </div>

            <div className="api-endpoint-selector">
              <button
                className={activeEndpoint === 'quotes' ? 'active' : ''}
                onClick={() => setActiveEndpoint('quotes')}
              >
                📈 Market Quotes
              </button>
              <button
                className={activeEndpoint === 'bars' ? 'active' : ''}
                onClick={() => setActiveEndpoint('bars')}
              >
                📊 Historical Data
              </button>
              <button
                className={activeEndpoint === 'portfolio' ? 'active' : ''}
                onClick={() => setActiveEndpoint('portfolio')}
              >
                💼 Portfolio
              </button>
            </div>

            <div className="api-endpoint-content">
              <div className="api-endpoint-details">
                {activeEndpoint === 'quotes' && (
                  <>
                    <div className="api-endpoint-header">
                      <span className="api-method get">GET</span>
                      <code className="api-path">/v1/quotes/{'{symbol}'}</code>
                    </div>
                    <p className="api-endpoint-desc">Get real-time quote data for any symbol including price, volume, bid/ask, and daily change.</p>

                    <h4>Parameters</h4>
                    <table className="api-params-table">
                      <thead>
                        <tr>
                          <th>Parameter</th>
                          <th>Type</th>
                          <th>Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td><code>symbol</code></td>
                          <td>string</td>
                          <td>Stock symbol (e.g., AAPL, TSLA, BTC-USD)</td>
                        </tr>
                      </tbody>
                    </table>

                    <h4>Response</h4>
                    <div className="api-response-example">
                      <pre><code>{`{
  "symbol": "AAPL",
  "price": 175.43,
  "change": 2.15,
  "changePercent": 1.24,
  "volume": 54320000,
  "bid": 175.42,
  "ask": 175.44,
  "timestamp": "2024-01-15T14:30:00Z"
}`}</code></pre>
                    </div>
                  </>
                )}

                {activeEndpoint === 'bars' && (
                  <>
                    <div className="api-endpoint-header">
                      <span className="api-method get">GET</span>
                      <code className="api-path">/v1/bars/{'{symbol}'}</code>
                    </div>
                    <p className="api-endpoint-desc">Get historical OHLCV (Open, High, Low, Close, Volume) data for any timeframe.</p>

                    <h4>Parameters</h4>
                    <table className="api-params-table">
                      <thead>
                        <tr>
                          <th>Parameter</th>
                          <th>Type</th>
                          <th>Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td><code>symbol</code></td>
                          <td>string</td>
                          <td>Stock symbol (e.g., AAPL, TSLA)</td>
                        </tr>
                        <tr>
                          <td><code>timeframe</code></td>
                          <td>string</td>
                          <td>1m, 5m, 15m, 1h, 1d</td>
                        </tr>
                        <tr>
                          <td><code>limit</code></td>
                          <td>integer</td>
                          <td>Max bars to return (max 10000)</td>
                        </tr>
                        <tr>
                          <td><code>start</code></td>
                          <td>string</td>
                          <td>ISO 8601 start date (optional)</td>
                        </tr>
                        <tr>
                          <td><code>end</code></td>
                          <td>string</td>
                          <td>ISO 8601 end date (optional)</td>
                        </tr>
                      </tbody>
                    </table>

                    <h4>Response</h4>
                    <div className="api-response-example">
                      <pre><code>{`{
  "symbol": "AAPL",
  "bars": [
    {
      "time": "2024-01-15T09:30:00Z",
      "open": 173.50,
      "high": 175.80,
      "low": 173.20,
      "close": 175.43,
      "volume": 12500000
    }
  ]
}`}</code></pre>
                    </div>
                  </>
                )}

                {activeEndpoint === 'portfolio' && (
                  <>
                    <div className="api-endpoint-header">
                      <span className="api-method get">GET</span>
                      <code className="api-path">/v1/portfolio</code>
                    </div>
                    <p className="api-endpoint-desc">Get your complete portfolio including all positions, total value, cash balance, and P&L.</p>

                    <h4>Response</h4>
                    <div className="api-response-example">
                      <pre><code>{`{
  "positions": [
    {
      "symbol": "AAPL",
      "quantity": 100,
      "avgEntry": 150.00,
      "currentPrice": 175.43,
      "unrealizedPnL": 2543.00,
      "unrealizedPnLPct": 16.95
    }
  ],
  "totalValue": 87650.00,
  "cash": 12350.00,
  "totalPnL": 5430.00,
  "totalPnLPct": 6.61
}`}</code></pre>
                    </div>
                  </>
                )}
              </div>

              <div className="api-code-example-panel">
                <h4>Try it now</h4>
                <div className="api-code-tabs">
                  <button
                    className={activeTab === 'curl' ? 'active' : ''}
                    onClick={() => setActiveTab('curl')}
                  >
                    cURL
                  </button>
                  <button
                    className={activeTab === 'python' ? 'active' : ''}
                    onClick={() => setActiveTab('python')}
                  >
                    Python
                  </button>
                  <button
                    className={activeTab === 'javascript' ? 'active' : ''}
                    onClick={() => setActiveTab('javascript')}
                  >
                    JavaScript
                  </button>
                </div>
                <div className="api-code-block">
                  <pre><code>{codeExamples[activeTab][activeEndpoint]}</code></pre>
                </div>
                <button className="api-copy-btn">Copy Code</button>
              </div>
            </div>
          </div>
        </section>

        {/* Rate Limits */}
        <section className="api-limits section bg-light">
          <div className="container">
            <div className="api-limits-grid">
              <div className="api-limits-info">
                <h2>Rate Limits & Quotas</h2>
                <p>Understand your API usage limits to build reliable applications.</p>

                <div className="api-limit-cards">
                  <div className="api-limit-card">
                    <div className="api-limit-icon">⚡</div>
                    <div className="api-limit-content">
                      <h4>Request Rate</h4>
                      <p className="api-limit-value">100 req/min</p>
                      <p className="api-limit-desc">Per API key</p>
                    </div>
                  </div>

                  <div className="api-limit-card">
                    <div className="api-limit-icon">📊</div>
                    <div className="api-limit-content">
                      <h4>Daily Quota</h4>
                      <p className="api-limit-value">10,000 req/day</p>
                      <p className="api-limit-desc">Professional plan</p>
                    </div>
                  </div>

                  <div className="api-limit-card">
                    <div className="api-limit-icon">🔌</div>
                    <div className="api-limit-content">
                      <h4>WebSocket</h4>
                      <p className="api-limit-value">5 connections</p>
                      <p className="api-limit-desc">Concurrent limit</p>
                    </div>
                  </div>

                  <div className="api-limit-card">
                    <div className="api-limit-icon">💬</div>
                    <div className="api-limit-content">
                      <h4>Messages</h4>
                      <p className="api-limit-value">1000 msg/min</p>
                      <p className="api-limit-desc">Per WebSocket</p>
                    </div>
                  </div>
                </div>

                <div className="api-rate-limit-headers">
                  <h4>Rate Limit Headers</h4>
                  <p>Every API response includes rate limit information:</p>
                  <div className="api-headers-example">
                    <code>X-RateLimit-Limit: 100</code>
                    <code>X-RateLimit-Remaining: 95</code>
                    <code>X-RateLimit-Reset: 1642251600</code>
                  </div>
                </div>
              </div>

              <div className="api-limits-visual">
                <div className="api-usage-chart">
                  <h4>Your Current Usage</h4>
                  <div className="api-usage-bar">
                    <div className="api-usage-fill" style={{width: '34%'}}></div>
                  </div>
                  <div className="api-usage-stats">
                    <span>3,400 / 10,000 requests today</span>
                    <span>34%</span>
                  </div>
                  <a href="https://app.tradeflows.net/settings/api" className="api-view-usage">
                    View Detailed Usage →
                  </a>
                </div>

                <div className="api-upgrade-card">
                  <h4>Need Higher Limits?</h4>
                  <p>Enterprise plans include custom rate limits, dedicated infrastructure, and priority support.</p>
                  <Link to="/contact" className="btn btn-primary">
                    Contact Sales
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SDKs */}
        <section className="api-sdks section">
          <div className="container">
            <div className="section-header">
              <h2>Official SDKs & Libraries</h2>
              <p>Get started faster with our official client libraries</p>
            </div>

            <div className="api-sdk-grid">
              <div className="api-sdk-card">
                <div className="api-sdk-icon">🐍</div>
                <h3>Python SDK</h3>
                <p>Full-featured Python client with type hints and async support.</p>
                <div className="api-sdk-install">
                  <code>pip install tradeflows-sdk</code>
                </div>
                <div className="api-sdk-links">
                  <a href="https://github.com/tradeflows/python-sdk">Documentation</a>
                  <a href="https://github.com/tradeflows/python-sdk">GitHub</a>
                </div>
              </div>

              <div className="api-sdk-card">
                <div className="api-sdk-icon">📜</div>
                <h3>JavaScript SDK</h3>
                <p>Modern ES6+ client for Node.js and browser environments.</p>
                <div className="api-sdk-install">
                  <code>npm install tradeflows-js</code>
                </div>
                <div className="api-sdk-links">
                  <a href="https://github.com/tradeflows/js-sdk">Documentation</a>
                  <a href="https://github.com/tradeflows/js-sdk">GitHub</a>
                </div>
              </div>

              <div className="api-sdk-card">
                <div className="api-sdk-icon">☕</div>
                <h3>Java SDK</h3>
                <p>Robust Java library with Maven and Gradle support.</p>
                <div className="api-sdk-install">
                  <code>net.tradeflows:tradeflows-sdk:1.0.0</code>
                </div>
                <div className="api-sdk-links">
                  <a href="https://github.com/tradeflows/java-sdk">Documentation</a>
                  <a href="https://github.com/tradeflows/java-sdk">GitHub</a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Support */}
        <section className="api-support section bg-dark">
          <div className="container">
            <div className="api-support-content">
              <h2>Need Help with the API?</h2>
              <p>Our developer support team is here to help you build amazing applications</p>

              <div className="api-support-options">
                <div className="api-support-option">
                  <div className="api-support-icon">📚</div>
                  <h4>Documentation</h4>
                  <p>Complete API reference and guides</p>
                  <a href="https://docs.tradeflows.net/api">View Docs →</a>
                </div>

                <div className="api-support-option">
                  <div className="api-support-icon">💬</div>
                  <h4>Community Forum</h4>
                  <p>Connect with other developers</p>
                  <a href="https://community.tradeflows.net">Join Forum →</a>
                </div>

                <div className="api-support-option">
                  <div className="api-support-icon">🐛</div>
                  <h4>GitHub Issues</h4>
                  <p>Report bugs and request features</p>
                  <a href="https://github.com/tradeflows/api-issues">Open Issue →</a>
                </div>

                <div className="api-support-option">
                  <div className="api-support-icon">📧</div>
                  <h4>Email Support</h4>
                  <p>api-support@tradeflows.net</p>
                  <a href="mailto:api-support@tradeflows.net">Send Email →</a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
