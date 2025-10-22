import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import './SecurityPage.css'

export default function SecurityPage() {
  return (
    <>
      <Helmet>
        <title>Security & Compliance - TradeFlows Pro</title>
        <meta name="description" content="Bank-level security, SOC 2 Type II certified, ISO 27001 compliant. Learn how TradeFlows Pro protects your data with enterprise-grade security measures." />
      </Helmet>

      <div className="security-page">
        {/* Hero Section */}
        <section className="sec-hero">
          <div className="container">
            <div className="sec-hero-content">
              <div className="sec-hero-badge">
                <span className="badge-icon">🔐</span>
                <span>Enterprise-Grade Security</span>
              </div>
              <h1 className="sec-hero-title">Your Security is Our Priority</h1>
              <p className="sec-hero-subtitle">
                Bank-level security infrastructure protecting your data and trading activity.
                SOC 2 Type II certified with continuous security monitoring and compliance audits.
              </p>
              <div className="sec-hero-stats">
                <div className="sec-stat">
                  <div className="sec-stat-number">99.99%</div>
                  <div className="sec-stat-label">Uptime Guarantee</div>
                </div>
                <div className="sec-stat">
                  <div className="sec-stat-number">256-bit</div>
                  <div className="sec-stat-label">SSL Encryption</div>
                </div>
                <div className="sec-stat">
                  <div className="sec-stat-number">24/7</div>
                  <div className="sec-stat-label">Security Monitoring</div>
                </div>
              </div>
            </div>
            <div className="sec-hero-visual">
              <div className="sec-shield-container">
                <div className="sec-shield-badge">
                  <div className="sec-shield-icon">🛡️</div>
                  <div className="sec-shield-text">
                    <div className="sec-shield-title">Protected</div>
                    <div className="sec-shield-subtitle">Bank-Level Security</div>
                  </div>
                </div>
                <div className="sec-security-layers">
                  <div className="sec-layer" style={{animationDelay: '0s'}}>
                    <span className="sec-layer-icon">🔒</span>
                    <span className="sec-layer-text">256-bit Encryption</span>
                  </div>
                  <div className="sec-layer" style={{animationDelay: '0.2s'}}>
                    <span className="sec-layer-icon">👤</span>
                    <span className="sec-layer-text">Multi-Factor Auth</span>
                  </div>
                  <div className="sec-layer" style={{animationDelay: '0.4s'}}>
                    <span className="sec-layer-icon">🔍</span>
                    <span className="sec-layer-text">24/7 Monitoring</span>
                  </div>
                  <div className="sec-layer" style={{animationDelay: '0.6s'}}>
                    <span className="sec-layer-icon">✓</span>
                    <span className="sec-layer-text">SOC 2 Certified</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Certifications */}
        <section className="sec-certs section bg-light">
          <div className="container">
            <div className="section-header">
              <h2>Industry-Leading Certifications</h2>
              <p>Independently audited and certified for security and compliance</p>
            </div>

            <div className="sec-certs-grid">
              <div className="sec-cert-card">
                <div className="sec-cert-badge">
                  <div className="sec-cert-icon">✓</div>
                </div>
                <h3>SOC 2 Type II</h3>
                <p className="sec-cert-status">Certified • Audited Annually</p>
                <p>Comprehensive independent audit of our security controls, including data integrity, confidentiality, and availability. Demonstrates our commitment to protecting customer data.</p>
                <div className="sec-cert-details">
                  <div className="sec-cert-detail">
                    <strong>Last Audit:</strong> September 2025
                  </div>
                  <div className="sec-cert-detail">
                    <strong>Next Audit:</strong> September 2026
                  </div>
                </div>
              </div>

              <div className="sec-cert-card">
                <div className="sec-cert-badge">
                  <div className="sec-cert-icon">✓</div>
                </div>
                <h3>ISO 27001</h3>
                <p className="sec-cert-status">Certified • International Standard</p>
                <p>International standard for information security management systems (ISMS). Covers people, processes, and technology to manage information security risks systematically.</p>
                <div className="sec-cert-details">
                  <div className="sec-cert-detail">
                    <strong>Certification:</strong> ISO/IEC 27001:2022
                  </div>
                  <div className="sec-cert-detail">
                    <strong>Scope:</strong> Global Operations
                  </div>
                </div>
              </div>

              <div className="sec-cert-card">
                <div className="sec-cert-badge">
                  <div className="sec-cert-icon">✓</div>
                </div>
                <h3>GDPR Compliant</h3>
                <p className="sec-cert-status">Fully Compliant • EU Data Protection</p>
                <p>Full compliance with the General Data Protection Regulation. We respect your privacy rights including data portability, right to be forgotten, and transparent data processing.</p>
                <div className="sec-cert-details">
                  <div className="sec-cert-detail">
                    <strong>DPO:</strong> security@tradeflows.net
                  </div>
                  <div className="sec-cert-detail">
                    <strong>Data Centers:</strong> EU & US
                  </div>
                </div>
              </div>

              <div className="sec-cert-card">
                <div className="sec-cert-badge">
                  <div className="sec-cert-icon">✓</div>
                </div>
                <h3>PCI DSS</h3>
                <p className="sec-cert-status">Level 1 Compliant • Payment Security</p>
                <p>Payment Card Industry Data Security Standard compliance. All payment processing uses certified payment processors with tokenization and never stores card data.</p>
                <div className="sec-cert-details">
                  <div className="sec-cert-detail">
                    <strong>Level:</strong> PCI DSS Level 1
                  </div>
                  <div className="sec-cert-detail">
                    <strong>Processor:</strong> Stripe (Certified)
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Security Measures */}
        <section className="sec-measures section">
          <div className="container">
            <div className="section-header">
              <h2>Multi-Layered Security Architecture</h2>
              <p>Defense in depth approach protecting every layer of our infrastructure</p>
            </div>

            <div className="sec-measures-grid">
              <div className="sec-measure">
                <div className="sec-measure-icon">🔐</div>
                <h3>Data Encryption</h3>
                <p>End-to-end encryption protecting your data at rest and in transit.</p>
                <ul className="sec-measure-list">
                  <li><strong>In Transit:</strong> TLS 1.3 with 256-bit encryption for all data transmission</li>
                  <li><strong>At Rest:</strong> AES-256 encryption for all stored data in databases and backups</li>
                  <li><strong>Key Management:</strong> Hardware Security Modules (HSM) for cryptographic key storage</li>
                  <li><strong>Perfect Forward Secrecy:</strong> Session keys destroyed after each session</li>
                </ul>
              </div>

              <div className="sec-measure">
                <div className="sec-measure-icon">👤</div>
                <h3>Authentication & Access</h3>
                <p>Multi-factor authentication and zero-trust access controls.</p>
                <ul className="sec-measure-list">
                  <li><strong>Multi-Factor Auth:</strong> Required for all accounts with TOTP, SMS, or hardware keys</li>
                  <li><strong>Password Security:</strong> Bcrypt hashing with per-user salts and minimum complexity</li>
                  <li><strong>Session Management:</strong> Automatic timeouts and concurrent session controls</li>
                  <li><strong>IP Whitelisting:</strong> Optional IP-based access restrictions for enterprise accounts</li>
                </ul>
              </div>

              <div className="sec-measure">
                <div className="sec-measure-icon">🛡️</div>
                <h3>Infrastructure Security</h3>
                <p>Enterprise-grade infrastructure with redundancy and protection.</p>
                <ul className="sec-measure-list">
                  <li><strong>Cloud Provider:</strong> AWS with multi-region redundancy and 99.99% SLA</li>
                  <li><strong>Firewall:</strong> Next-generation firewall with intrusion detection/prevention</li>
                  <li><strong>DDoS Protection:</strong> Cloudflare enterprise protection against attacks</li>
                  <li><strong>Network Segmentation:</strong> Isolated VPCs with private subnets for sensitive data</li>
                </ul>
              </div>

              <div className="sec-measure">
                <div className="sec-measure-icon">🔍</div>
                <h3>Monitoring & Detection</h3>
                <p>24/7 security monitoring with real-time threat detection.</p>
                <ul className="sec-measure-list">
                  <li><strong>SIEM:</strong> Security Information and Event Management with AI-powered analytics</li>
                  <li><strong>Intrusion Detection:</strong> Real-time monitoring of all network traffic and system logs</li>
                  <li><strong>Anomaly Detection:</strong> Machine learning algorithms detecting unusual access patterns</li>
                  <li><strong>Audit Logging:</strong> Comprehensive logging of all system access and changes</li>
                </ul>
              </div>

              <div className="sec-measure">
                <div className="sec-measure-icon">💾</div>
                <h3>Backup & Recovery</h3>
                <p>Automated backups with point-in-time recovery capabilities.</p>
                <ul className="sec-measure-list">
                  <li><strong>Frequency:</strong> Continuous replication with hourly snapshots</li>
                  <li><strong>Retention:</strong> 30-day rolling backups with 7-year archival for compliance</li>
                  <li><strong>Testing:</strong> Monthly disaster recovery drills and backup restoration tests</li>
                  <li><strong>Geographic:</strong> Multi-region backup replication for disaster recovery</li>
                </ul>
              </div>

              <div className="sec-measure">
                <div className="sec-measure-icon">⚡</div>
                <h3>Incident Response</h3>
                <p>Dedicated security team with 24/7 incident response capability.</p>
                <ul className="sec-measure-list">
                  <li><strong>Response Time:</strong> Critical incidents escalated within 15 minutes</li>
                  <li><strong>Security Team:</strong> Full-time security operations center (SOC) staffed 24/7</li>
                  <li><strong>Notification:</strong> Immediate notification for any security incidents affecting users</li>
                  <li><strong>Forensics:</strong> Complete forensic analysis and remediation for all incidents</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Privacy & Data */}
        <section className="sec-privacy section bg-light">
          <div className="container">
            <div className="sec-privacy-layout">
              <div className="sec-privacy-content">
                <div className="sec-section-badge">
                  <span>🔒</span>
                  <span>Your Privacy Matters</span>
                </div>
                <h2>Data Privacy & Protection</h2>
                <p className="sec-privacy-intro">
                  We believe your data belongs to you. We never sell your data to third parties and
                  maintain strict controls over who can access your information.
                </p>

                <div className="sec-privacy-principles">
                  <div className="sec-principle">
                    <div className="sec-principle-icon">✓</div>
                    <div className="sec-principle-content">
                      <h4>Data Minimization</h4>
                      <p>We only collect data necessary for platform functionality and service delivery.</p>
                    </div>
                  </div>

                  <div className="sec-principle">
                    <div className="sec-principle-icon">✓</div>
                    <div className="sec-principle-content">
                      <h4>No Third-Party Selling</h4>
                      <p>We never sell, rent, or share your personal data with third parties for marketing purposes.</p>
                    </div>
                  </div>

                  <div className="sec-principle">
                    <div className="sec-principle-icon">✓</div>
                    <div className="sec-principle-content">
                      <h4>Data Portability</h4>
                      <p>Export your data anytime in standard formats. Your data is always accessible to you.</p>
                    </div>
                  </div>

                  <div className="sec-principle">
                    <div className="sec-principle-icon">✓</div>
                    <div className="sec-principle-content">
                      <h4>Right to Delete</h4>
                      <p>Request complete deletion of your account and data anytime. We comply within 30 days.</p>
                    </div>
                  </div>

                  <div className="sec-principle">
                    <div className="sec-principle-icon">✓</div>
                    <div className="sec-principle-content">
                      <h4>Transparent Processing</h4>
                      <p>Clear documentation of what data we collect, why we collect it, and how we use it.</p>
                    </div>
                  </div>

                  <div className="sec-principle">
                    <div className="sec-principle-icon">✓</div>
                    <div className="sec-principle-content">
                      <h4>Access Controls</h4>
                      <p>Strict role-based access controls limit data access to only authorized personnel.</p>
                    </div>
                  </div>
                </div>

                <div className="sec-privacy-cta">
                  <Link to="/privacy" className="btn btn-primary">
                    Read Privacy Policy
                  </Link>
                  <a href="mailto:privacy@tradeflows.net" className="btn btn-secondary">
                    Contact Privacy Team
                  </a>
                </div>
              </div>

              <div className="sec-privacy-visual">
                <div className="sec-data-card">
                  <div className="sec-data-header">
                    <h4>Your Data Protection Rights</h4>
                    <span className="sec-data-badge">GDPR & CCPA</span>
                  </div>
                  <div className="sec-data-rights">
                    <div className="sec-data-right">
                      <span className="sec-right-icon">👁️</span>
                      <span className="sec-right-text">Right to Access</span>
                    </div>
                    <div className="sec-data-right">
                      <span className="sec-right-icon">✏️</span>
                      <span className="sec-right-text">Right to Rectify</span>
                    </div>
                    <div className="sec-data-right">
                      <span className="sec-right-icon">🗑️</span>
                      <span className="sec-right-text">Right to Delete</span>
                    </div>
                    <div className="sec-data-right">
                      <span className="sec-right-icon">📦</span>
                      <span className="sec-right-text">Right to Portability</span>
                    </div>
                    <div className="sec-data-right">
                      <span className="sec-right-icon">🚫</span>
                      <span className="sec-right-text">Right to Object</span>
                    </div>
                    <div className="sec-data-right">
                      <span className="sec-right-icon">⏸️</span>
                      <span className="sec-right-text">Right to Restrict</span>
                    </div>
                  </div>
                  <div className="sec-data-footer">
                    <p>Request any of these rights by contacting our Data Protection Officer</p>
                    <a href="mailto:dpo@tradeflows.net">dpo@tradeflows.net</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Security Best Practices */}
        <section className="sec-practices section">
          <div className="container">
            <div className="section-header">
              <h2>Protect Your Account</h2>
              <p>Best practices for maintaining account security</p>
            </div>

            <div className="sec-practices-grid">
              <div className="sec-practice-card">
                <div className="sec-practice-number">1</div>
                <div className="sec-practice-icon">🔑</div>
                <h3>Use Strong Passwords</h3>
                <p>Create unique passwords with at least 12 characters including uppercase, lowercase, numbers, and special characters.</p>
                <ul className="sec-practice-tips">
                  <li>Use a password manager to generate and store passwords</li>
                  <li>Never reuse passwords across different services</li>
                  <li>Change your password immediately if you suspect compromise</li>
                </ul>
              </div>

              <div className="sec-practice-card">
                <div className="sec-practice-number">2</div>
                <div className="sec-practice-icon">📱</div>
                <h3>Enable Multi-Factor Auth</h3>
                <p>Add an extra layer of security by requiring a second verification method beyond your password.</p>
                <ul className="sec-practice-tips">
                  <li>Use authenticator apps (Google Authenticator, Authy) over SMS</li>
                  <li>Store backup codes in a secure location</li>
                  <li>Consider hardware security keys for maximum protection</li>
                </ul>
              </div>

              <div className="sec-practice-card">
                <div className="sec-practice-number">3</div>
                <div className="sec-practice-icon">🌐</div>
                <h3>Verify URLs</h3>
                <p>Always check that you're on the legitimate tradeflows.net domain before entering credentials.</p>
                <ul className="sec-practice-tips">
                  <li>Bookmark our login page to avoid phishing sites</li>
                  <li>Look for the padlock icon indicating secure HTTPS connection</li>
                  <li>Never click login links in unsolicited emails</li>
                </ul>
              </div>

              <div className="sec-practice-card">
                <div className="sec-practice-number">4</div>
                <div className="sec-practice-icon">📧</div>
                <h3>Beware of Phishing</h3>
                <p>We will never ask for your password or sensitive information via email or phone.</p>
                <ul className="sec-practice-tips">
                  <li>Verify sender email addresses carefully</li>
                  <li>Report suspicious emails to security@tradeflows.net</li>
                  <li>Don't download attachments from unknown sources</li>
                </ul>
              </div>

              <div className="sec-practice-card">
                <div className="sec-practice-number">5</div>
                <div className="sec-practice-icon">🔍</div>
                <h3>Monitor Account Activity</h3>
                <p>Regularly review your account activity and login history for unauthorized access.</p>
                <ul className="sec-practice-tips">
                  <li>Enable email notifications for account logins</li>
                  <li>Review active sessions in your account settings</li>
                  <li>Report suspicious activity immediately</li>
                </ul>
              </div>

              <div className="sec-practice-card">
                <div className="sec-practice-number">6</div>
                <div className="sec-practice-icon">💻</div>
                <h3>Secure Your Devices</h3>
                <p>Keep your computer and mobile devices updated with the latest security patches.</p>
                <ul className="sec-practice-tips">
                  <li>Enable automatic updates for your operating system</li>
                  <li>Use antivirus software and keep it updated</li>
                  <li>Avoid accessing your account on public Wi-Fi</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Vulnerability Disclosure */}
        <section className="sec-disclosure section bg-light">
          <div className="container">
            <div className="sec-disclosure-layout">
              <div className="sec-disclosure-content">
                <h2>Responsible Disclosure Program</h2>
                <p className="sec-disclosure-intro">
                  We welcome security researchers to help us keep TradeFlows Pro secure. If you discover
                  a security vulnerability, we encourage responsible disclosure.
                </p>

                <div className="sec-disclosure-process">
                  <div className="sec-disclosure-step">
                    <div className="sec-step-number">1</div>
                    <div className="sec-step-content">
                      <h4>Report the Vulnerability</h4>
                      <p>Send details to <a href="mailto:security@tradeflows.net">security@tradeflows.net</a> with description, steps to reproduce, and potential impact.</p>
                    </div>
                  </div>

                  <div className="sec-disclosure-step">
                    <div className="sec-step-number">2</div>
                    <div className="sec-step-content">
                      <h4>We Acknowledge</h4>
                      <p>Our security team will acknowledge receipt within 24 hours and provide an initial assessment within 72 hours.</p>
                    </div>
                  </div>

                  <div className="sec-disclosure-step">
                    <div className="sec-step-number">3</div>
                    <div className="sec-step-content">
                      <h4>We Fix It</h4>
                      <p>We'll work to reproduce, validate, and fix the issue. Critical vulnerabilities are patched within 48 hours.</p>
                    </div>
                  </div>

                  <div className="sec-disclosure-step">
                    <div className="sec-step-number">4</div>
                    <div className="sec-step-content">
                      <h4>Recognition</h4>
                      <p>Researchers who follow responsible disclosure are acknowledged in our Hall of Fame and may be eligible for bounties.</p>
                    </div>
                  </div>
                </div>

                <div className="sec-disclosure-rules">
                  <h3>Program Guidelines</h3>
                  <ul>
                    <li>Do not access or modify user data beyond what's necessary to demonstrate the vulnerability</li>
                    <li>Do not perform denial-of-service attacks or resource exhaustion tests</li>
                    <li>Do not publicly disclose the vulnerability until we've patched it</li>
                    <li>Follow all applicable laws and our Terms of Service</li>
                    <li>Social engineering attacks (phishing, etc.) are out of scope</li>
                  </ul>
                </div>

                <a href="mailto:security@tradeflows.net" className="btn btn-primary">
                  Report Security Issue
                </a>
              </div>

              <div className="sec-disclosure-sidebar">
                <div className="sec-hall-of-fame">
                  <h3>Security Researcher Hall of Fame</h3>
                  <p>We thank the following researchers for helping improve our security:</p>
                  <div className="sec-researchers">
                    <div className="sec-researcher">
                      <span className="sec-researcher-name">Dr. Sarah Chen</span>
                      <span className="sec-researcher-date">XSS Vulnerability • Oct 2025</span>
                    </div>
                    <div className="sec-researcher">
                      <span className="sec-researcher-name">Marcus Johnson</span>
                      <span className="sec-researcher-date">API Rate Limit Bypass • Sep 2025</span>
                    </div>
                    <div className="sec-researcher">
                      <span className="sec-researcher-name">Amit Patel</span>
                      <span className="sec-researcher-date">Session Fixation • Aug 2025</span>
                    </div>
                  </div>
                </div>

                <div className="sec-bounty-info">
                  <h4>Bug Bounty Program</h4>
                  <p>Eligible vulnerabilities:</p>
                  <ul>
                    <li><strong>Critical:</strong> $5,000 - $10,000</li>
                    <li><strong>High:</strong> $2,000 - $5,000</li>
                    <li><strong>Medium:</strong> $500 - $2,000</li>
                    <li><strong>Low:</strong> $100 - $500</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Security Contact */}
        <section className="sec-contact section">
          <div className="container">
            <div className="sec-contact-content">
              <h2>Questions About Security?</h2>
              <p>Our security team is here to help address your concerns</p>

              <div className="sec-contact-methods">
                <div className="sec-contact-method">
                  <div className="sec-contact-icon">📧</div>
                  <h4>Security Team</h4>
                  <p><a href="mailto:security@tradeflows.net">security@tradeflows.net</a></p>
                  <span className="sec-response-time">Response within 24 hours</span>
                </div>

                <div className="sec-contact-method">
                  <div className="sec-contact-icon">🔐</div>
                  <h4>Data Protection Officer</h4>
                  <p><a href="mailto:dpo@tradeflows.net">dpo@tradeflows.net</a></p>
                  <span className="sec-response-time">Privacy inquiries</span>
                </div>

                <div className="sec-contact-method">
                  <div className="sec-contact-icon">📄</div>
                  <h4>Compliance Officer</h4>
                  <p><a href="mailto:compliance@tradeflows.net">compliance@tradeflows.net</a></p>
                  <span className="sec-response-time">Audit & compliance requests</span>
                </div>
              </div>

              <div className="sec-resources">
                <h3>Security Resources</h3>
                <div className="sec-resource-links">
                  <Link to="/privacy" className="sec-resource-link">
                    <span>Privacy Policy</span>
                    <span>→</span>
                  </Link>
                  <Link to="/terms" className="sec-resource-link">
                    <span>Terms of Service</span>
                    <span>→</span>
                  </Link>
                  <Link to="/api-documentation" className="sec-resource-link">
                    <span>API Security</span>
                    <span>→</span>
                  </Link>
                  <Link to="/knowledge-base" className="sec-resource-link">
                    <span>Security FAQs</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
