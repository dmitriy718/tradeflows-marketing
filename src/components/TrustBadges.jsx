import './TrustBadges.css'

export default function TrustBadges() {
  const badges = [
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="currentColor">
          <path d="M16 2l-4 4H4v8L2 16l2 2v8h8l4 4 4-4h8v-8l2-2-2-2V6h-8l-4-4zm0 6a8 8 0 110 16 8 8 0 010-16zm-2 4v8l6-4-6-4z"/>
        </svg>
      ),
      title: 'SSL Secured',
      description: '256-bit encryption'
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="currentColor">
          <path d="M16 2C8.268 2 2 8.268 2 16s6.268 14 14 14 14-6.268 14-14S23.732 2 16 2zm7 10l-9 9-5-5 2-2 3 3 7-7 2 2z"/>
        </svg>
      ),
      title: 'SOC 2 Compliant',
      description: 'Enterprise security'
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="currentColor">
          <path d="M16 3l2.4 7.4h7.8l-6.3 4.6 2.4 7.4L16 17.8l-6.3 4.6 2.4-7.4-6.3-4.6h7.8L16 3z"/>
        </svg>
      ),
      title: '99.9% Uptime',
      description: 'Guaranteed availability'
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="currentColor">
          <path d="M16 2C8.3 2 2 8.3 2 16s6.3 14 14 14 14-6.3 14-14S23.7 2 16 2zm0 4c2.2 0 4 1.8 4 4s-1.8 4-4 4-4-1.8-4-4 1.8-4 4-4zm0 20c-3.3 0-6.2-1.7-8-4.3.1-2.6 5.3-4.1 8-4.1s7.9 1.5 8 4.1c-1.8 2.6-4.7 4.3-8 4.3z"/>
        </svg>
      ),
      title: '50K+ Users',
      description: 'Trusted globally'
    }
  ]

  const partners = [
    { name: 'NYSE', logo: 'NYSE' },
    { name: 'NASDAQ', logo: 'NASDAQ' },
    { name: 'Interactive Brokers', logo: 'IBKR' },
    { name: 'Binance', logo: 'BIN' }
  ]

  const certifications = [
    {
      name: 'PCI DSS',
      description: 'Payment Card Industry Data Security Standard',
      level: 'Level 1'
    },
    {
      name: 'ISO 27001',
      description: 'Information Security Management',
      level: 'Certified'
    },
    {
      name: 'GDPR',
      description: 'General Data Protection Regulation',
      level: 'Compliant'
    }
  ]

  return (
    <div className="trust-badges">
      {/* Main Trust Badges */}
      <div className="badges-grid">
        {badges.map((badge, index) => (
          <div key={index} className="trust-badge">
            <div className="badge-icon">
              {badge.icon}
            </div>
            <h4>{badge.title}</h4>
            <p>{badge.description}</p>
          </div>
        ))}
      </div>

      {/* Partner Logos */}
      <div className="partners-section">
        <h3>Trusted by Leading Exchanges</h3>
        <div className="partners-grid">
          {partners.map((partner, index) => (
            <div key={index} className="partner-logo">
              <div className="logo-placeholder">
                {partner.logo}
              </div>
              <span>{partner.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Security Certifications */}
      <div className="certifications-section">
        <h3>Security & Compliance</h3>
        <div className="certifications-grid">
          {certifications.map((cert, index) => (
            <div key={index} className="certification-card">
              <div className="cert-header">
                <span className="cert-name">{cert.name}</span>
                <span className="cert-level">{cert.level}</span>
              </div>
              <p className="cert-description">{cert.description}</p>
              <div className="cert-badge">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                </svg>
                Verified
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Security Features */}
      <div className="security-features">
        <div className="feature-list">
          <div className="security-feature">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 2L3 7v6c0 3.6 2.6 7 7 7.8 4.4-.8 7-4.2 7-7.8V7l-7-5zm-1 13l-3-3 1.4-1.4 1.6 1.6 3.6-3.6L14 10l-5 5z"/>
            </svg>
            <span>Two-Factor Authentication</span>
          </div>
          <div className="security-feature">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path d="M15 8V5c0-2.8-2.2-5-5-5S5 2.2 5 5v3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2v-8c0-1.1-.9-2-2-2zM7 5c0-1.7 1.3-3 3-3s3 1.3 3 3v3H7V5zm3 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>
            </svg>
            <span>End-to-End Encryption</span>
          </div>
          <div className="security-feature">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 1C5 1 1 5 1 10s4 9 9 9 9-4 9-9-4-9-9-9zm0 16c-3.9 0-7-3.1-7-7s3.1-7 7-7 7 3.1 7 7-3.1 7-7 7zm.5-11h-1v5l4.3 2.5.4-.8-3.7-2.2V6z"/>
            </svg>
            <span>24/7 Security Monitoring</span>
          </div>
          <div className="security-feature">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path d="M17 11c0 .6-.4 1-1 1H4c-.6 0-1-.4-1-1V6h14v5zM4 3h12c1.7 0 3 1.3 3 3v8c0 1.7-1.3 3-3 3H4c-1.7 0-3-1.3-3-3V6c0-1.7 1.3-3 3-3z"/>
            </svg>
            <span>Bank-Level Security</span>
          </div>
        </div>
      </div>

      {/* Money Back Guarantee */}
      <div className="guarantee-section">
        <div className="guarantee-badge">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="url(#guaranteeGradient)">
            <defs>
              <linearGradient id="guaranteeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#22ff79"/>
                <stop offset="100%" stopColor="#14c75a"/>
              </linearGradient>
            </defs>
            <path d="M24 4l-6 6H6v12L4 24l2 2v12h12l6 6 6-6h12V26l2-2-2-2V10H30l-6-6zm0 8c6.6 0 12 5.4 12 12s-5.4 12-12 12-12-5.4-12-12 5.4-12 12-12zm-1 7v2h-2v2h2v1c0 1.1.9 2 2 2h2c.6 0 1 .4 1 1s-.4 1-1 1h-4v2h2v2h2v-2h2v-2h-2v-1c0-1.1-.9-2-2-2h-2c-.6 0-1-.4-1-1s.4-1 1-1h4v-2h-2v-2h-2z"/>
          </svg>
        </div>
        <div className="guarantee-content">
          <h3>30-Day Money Back Guarantee</h3>
          <p>Try TradeFlows Pro risk-free. If you're not completely satisfied, get a full refund within 30 days.</p>
          <div className="guarantee-features">
            <span>✓ No questions asked</span>
            <span>✓ Full refund</span>
            <span>✓ Cancel anytime</span>
          </div>
        </div>
      </div>
    </div>
  )
}