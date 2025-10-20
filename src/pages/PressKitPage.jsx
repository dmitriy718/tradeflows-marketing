import { Helmet } from 'react-helmet-async'
import OptimizedImage from '../components/OptimizedImage'
import './PressKitPage.css'

export default function PressKitPage() {
  const downloadAsset = (assetName) => {
    // In production, these would be actual file downloads
    alert(`Downloading ${assetName}... (In production, this would trigger an actual download)`)
  }

  return (
    <>
      <Helmet>
        <title>Press Kit - TradeFlows Pro Media Resources</title>
        <meta name="description" content="Download TradeFlows Pro logos, screenshots, and media resources. Press inquiries welcome." />
      </Helmet>

      <div className="press-kit-page">
        {/* Hero */}
        <section className="press-hero">
          <div className="container">
            <h1>Press Kit</h1>
            <p className="hero-subtitle">
              Media resources, brand assets, and company information for journalists and partners
            </p>
          </div>
        </section>

        {/* Company Overview */}
        <section className="company-overview section">
          <div className="container">
            <h2>Company Overview</h2>
            <div className="overview-content">
              <p className="lead">
                TradeFlows Pro is an AI-powered professional trading platform trusted by over 50,000 traders worldwide.
                We combine real-time market data, intelligent strategy recommendations, and advanced portfolio analytics
                to help traders make confident decisions across stocks, crypto, forex, and commodities.
              </p>

              <div className="stats-grid">
                <div className="stat-box">
                  <div className="stat-number">50,000+</div>
                  <div className="stat-label">Active Traders</div>
                </div>
                <div className="stat-box">
                  <div className="stat-number">$2.5B+</div>
                  <div className="stat-label">Monthly Trading Volume</div>
                </div>
                <div className="stat-box">
                  <div className="stat-number">4.9/5</div>
                  <div className="stat-label">Average User Rating</div>
                </div>
                <div className="stat-box">
                  <div className="stat-number">100+</div>
                  <div className="stat-label">Technical Indicators</div>
                </div>
              </div>

              <div className="quick-facts">
                <h3>Quick Facts</h3>
                <ul>
                  <li><strong>Founded:</strong> 2020</li>
                  <li><strong>Headquarters:</strong> New York, NY, United States</li>
                  <li><strong>CEO:</strong> Sarah Johnson</li>
                  <li><strong>Employees:</strong> 120+</li>
                  <li><strong>Funding:</strong> Series B ($45M raised)</li>
                  <li><strong>Markets:</strong> Stocks, Crypto, Forex, Commodities</li>
                  <li><strong>Technology:</strong> AI/ML, Real-time Data Processing, Cloud-native</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Logos */}
        <section className="logos-section section">
          <div className="container">
            <h2>Brand Assets & Logos</h2>
            <p className="section-intro">
              Our logos are available in multiple formats. Please follow our brand guidelines when using these assets.
            </p>

            <div className="assets-grid">
              <div className="asset-card">
                <div className="asset-preview logo-preview">
                  <div className="logo-display">TF</div>
                </div>
                <h3>Primary Logo</h3>
                <p>Full color logo for light backgrounds</p>
                <div className="asset-downloads">
                  <button onClick={() => downloadAsset('Logo PNG')} className="btn btn-sm btn-secondary">PNG</button>
                  <button onClick={() => downloadAsset('Logo SVG')} className="btn btn-sm btn-secondary">SVG</button>
                  <button onClick={() => downloadAsset('Logo EPS')} className="btn btn-sm btn-secondary">EPS</button>
                </div>
              </div>

              <div className="asset-card">
                <div className="asset-preview logo-preview dark">
                  <div className="logo-display light">TF</div>
                </div>
                <h3>Logo for Dark Backgrounds</h3>
                <p>Light version for dark backgrounds</p>
                <div className="asset-downloads">
                  <button onClick={() => downloadAsset('Dark Logo PNG')} className="btn btn-sm btn-secondary">PNG</button>
                  <button onClick={() => downloadAsset('Dark Logo SVG')} className="btn btn-sm btn-secondary">SVG</button>
                  <button onClick={() => downloadAsset('Dark Logo EPS')} className="btn btn-sm btn-secondary">EPS</button>
                </div>
              </div>

              <div className="asset-card">
                <div className="asset-preview logo-preview">
                  <div className="logo-display icon-only">TF</div>
                </div>
                <h3>Icon Only</h3>
                <p>Simplified icon for small spaces</p>
                <div className="asset-downloads">
                  <button onClick={() => downloadAsset('Icon PNG')} className="btn btn-sm btn-secondary">PNG</button>
                  <button onClick={() => downloadAsset('Icon SVG')} className="btn btn-sm btn-secondary">SVG</button>
                  <button onClick={() => downloadAsset('Icon ICO')} className="btn btn-sm btn-secondary">ICO</button>
                </div>
              </div>

              <div className="asset-card">
                <div className="asset-preview logo-preview">
                  <div className="logo-display monochrome">TF</div>
                </div>
                <h3>Monochrome</h3>
                <p>Black and white version</p>
                <div className="asset-downloads">
                  <button onClick={() => downloadAsset('Mono PNG')} className="btn btn-sm btn-secondary">PNG</button>
                  <button onClick={() => downloadAsset('Mono SVG')} className="btn btn-sm btn-secondary">SVG</button>
                  <button onClick={() => downloadAsset('Mono EPS')} className="btn btn-sm btn-secondary">EPS</button>
                </div>
              </div>
            </div>

            <div className="download-all">
              <button onClick={() => downloadAsset('Complete Brand Package')} className="btn btn-primary btn-large">
                Download Complete Brand Package (ZIP)
              </button>
            </div>
          </div>
        </section>

        {/* Screenshots */}
        <section className="screenshots-section section">
          <div className="container">
            <h2>Product Screenshots</h2>
            <p className="section-intro">
              High-resolution screenshots of TradeFlows Pro in action
            </p>

            <div className="screenshots-grid">
              <div className="screenshot-card">
                <div className="screenshot-preview">
                  <OptimizedImage
                    src="/screenshots/dashboard.png"
                    alt="TradeFlows Pro Dashboard"
                    width={1920}
                    height={1080}
                  />
                </div>
                <h3>Main Dashboard</h3>
                <button onClick={() => downloadAsset('Dashboard Screenshot')} className="btn btn-sm btn-secondary">
                  Download (4K)
                </button>
              </div>

              <div className="screenshot-card">
                <div className="screenshot-preview">
                  <OptimizedImage
                    src="/screenshots/charts.png"
                    alt="Advanced Charting"
                    width={1920}
                    height={1080}
                  />
                </div>
                <h3>Advanced Charting</h3>
                <button onClick={() => downloadAsset('Charts Screenshot')} className="btn btn-sm btn-secondary">
                  Download (4K)
                </button>
              </div>

              <div className="screenshot-card">
                <div className="screenshot-preview">
                  <OptimizedImage
                    src="/screenshots/ai-strategies.png"
                    alt="AI Strategies"
                    width={1920}
                    height={1080}
                  />
                </div>
                <h3>AI Strategy Builder</h3>
                <button onClick={() => downloadAsset('AI Screenshot')} className="btn btn-sm btn-secondary">
                  Download (4K)
                </button>
              </div>

              <div className="screenshot-card">
                <div className="screenshot-preview">
                  <OptimizedImage
                    src="/screenshots/portfolio.png"
                    alt="Portfolio Analytics"
                    width={1920}
                    height={1080}
                  />
                </div>
                <h3>Portfolio Analytics</h3>
                <button onClick={() => downloadAsset('Portfolio Screenshot')} className="btn btn-sm btn-secondary">
                  Download (4K)
                </button>
              </div>

              <div className="screenshot-card">
                <div className="screenshot-preview">
                  <OptimizedImage
                    src="/screenshots/alerts.png"
                    alt="Smart Alerts"
                    width={1920}
                    height={1080}
                  />
                </div>
                <h3>Smart Alerts</h3>
                <button onClick={() => downloadAsset('Alerts Screenshot')} className="btn btn-sm btn-secondary">
                  Download (4K)
                </button>
              </div>

              <div className="screenshot-card">
                <div className="screenshot-preview">
                  <OptimizedImage
                    src="/screenshots/mobile.png"
                    alt="Mobile App"
                    width={1080}
                    height={1920}
                  />
                </div>
                <h3>Mobile App</h3>
                <button onClick={() => downloadAsset('Mobile Screenshot')} className="btn btn-sm btn-secondary">
                  Download (4K)
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Brand Guidelines */}
        <section className="guidelines-section section">
          <div className="container">
            <h2>Brand Guidelines</h2>

            <div className="guidelines-grid">
              <div className="guideline-card">
                <h3>✓ Do</h3>
                <ul>
                  <li>Use official logos provided in this press kit</li>
                  <li>Maintain minimum clear space around logos</li>
                  <li>Use approved color variations</li>
                  <li>Scale logos proportionally</li>
                  <li>Use high-resolution assets for print</li>
                </ul>
              </div>

              <div className="guideline-card dont">
                <h3>✗ Don't</h3>
                <ul>
                  <li>Alter or modify the logo</li>
                  <li>Change the logo colors</li>
                  <li>Rotate or skew the logo</li>
                  <li>Add effects or shadows</li>
                  <li>Use outdated versions</li>
                </ul>
              </div>
            </div>

            <div className="colors-section">
              <h3>Brand Colors</h3>
              <div className="color-palette">
                <div className="color-swatch">
                  <div className="swatch" style={{background: 'linear-gradient(135deg, #3b9eff 0%, #10b981 100%)'}}></div>
                  <div className="color-info">
                    <div className="color-name">Primary Gradient</div>
                    <div className="color-codes">#3b9eff → #10b981</div>
                  </div>
                </div>
                <div className="color-swatch">
                  <div className="swatch" style={{background: '#3b9eff'}}></div>
                  <div className="color-info">
                    <div className="color-name">Primary Blue</div>
                    <div className="color-codes">#3b9eff</div>
                  </div>
                </div>
                <div className="color-swatch">
                  <div className="swatch" style={{background: '#10b981'}}></div>
                  <div className="color-info">
                    <div className="color-name">Success Green</div>
                    <div className="color-codes">#10b981</div>
                  </div>
                </div>
                <div className="color-swatch">
                  <div className="swatch" style={{background: '#0a0f1e'}}></div>
                  <div className="color-info">
                    <div className="color-name">Dark Background</div>
                    <div className="color-codes">#0a0f1e</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Press Contact */}
        <section className="press-contact section">
          <div className="container">
            <div className="contact-box">
              <h2>Press Inquiries</h2>
              <p>
                For press inquiries, interview requests, or additional information, please contact our media relations team.
              </p>

              <div className="contact-info">
                <div className="contact-item">
                  <strong>General Press:</strong>
                  <a href="mailto:press@tradeflows.net">press@tradeflows.net</a>
                </div>
                <div className="contact-item">
                  <strong>Partnership Inquiries:</strong>
                  <a href="mailto:partnerships@tradeflows.net">partnerships@tradeflows.net</a>
                </div>
                <div className="contact-item">
                  <strong>Phone:</strong>
                  <a href="tel:1-800-TRADE-PRO">1-800-TRADE-PRO</a>
                </div>
              </div>

              <div className="social-links">
                <h3>Follow Us</h3>
                <div className="social-icons">
                  <a href="https://twitter.com/tradeflows" target="_blank" rel="noopener noreferrer">Twitter</a>
                  <a href="https://linkedin.com/company/tradeflows" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                  <a href="https://github.com/tradeflows" target="_blank" rel="noopener noreferrer">GitHub</a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
