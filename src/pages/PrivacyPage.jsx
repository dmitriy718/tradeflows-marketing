import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import './LegalPage.css'

export default function PrivacyPage() {
  return (
    <>
      <Helmet>
        <title>Privacy Policy - TradeFlows Pro</title>
        <meta name="description" content="TradeFlows Pro Privacy Policy. Learn how we collect, use, and protect your personal information." />
      </Helmet>

      <div className="legal-page">
        <div className="legal-hero">
          <div className="container">
            <h1>Privacy Policy</h1>
            <p className="legal-updated">Last Updated: January 15, 2024</p>
          </div>
        </div>

        <div className="legal-content">
          <div className="container-legal">
            <nav className="legal-nav">
              <h4>Table of Contents</h4>
              <a href="#introduction">Introduction</a>
              <a href="#information-we-collect">Information We Collect</a>
              <a href="#how-we-use">How We Use Your Information</a>
              <a href="#data-sharing">Data Sharing & Disclosure</a>
              <a href="#data-security">Data Security</a>
              <a href="#your-rights">Your Rights</a>
              <a href="#cookies">Cookies & Tracking</a>
              <a href="#data-retention">Data Retention</a>
              <a href="#international">International Transfers</a>
              <a href="#children">Children's Privacy</a>
              <a href="#changes">Changes to This Policy</a>
              <a href="#contact">Contact Us</a>
            </nav>

            <article className="legal-article">
              <section id="introduction">
                <h2>1. Introduction</h2>
                <p>
                  TradeFlows Inc. ("TradeFlows," "we," "us," or "our") operates the TradeFlows Pro trading platform and website at app.tradeflows.net and tradeflows.net (collectively, the "Services"). We are committed to protecting your privacy and being transparent about how we collect, use, and share your information.
                </p>
                <p>
                  This Privacy Policy explains how we handle your personal data when you use our Services. By accessing or using TradeFlows Pro, you agree to the terms of this Privacy Policy. If you do not agree, please do not use our Services.
                </p>
              </section>

              <section id="information-we-collect">
                <h2>2. Information We Collect</h2>

                <h3>2.1 Information You Provide Directly</h3>
                <ul>
                  <li><strong>Account Information:</strong> Name, email address, phone number, date of birth, and password when you create an account.</li>
                  <li><strong>Profile Information:</strong> Trading experience level, risk tolerance, investment goals, preferred markets, and other preferences you choose to share.</li>
                  <li><strong>Identity Verification:</strong> Government-issued ID, proof of address, and selfie photos for account verification and compliance with financial regulations.</li>
                  <li><strong>Payment Information:</strong> Credit card details, bank account information, and billing address (processed securely through Stripe).</li>
                  <li><strong>Communications:</strong> Messages, feedback, and support requests you send us.</li>
                  <li><strong>Trading Data:</strong> Portfolio holdings, transaction history, watchlists, alerts, and trading strategies you create.</li>
                </ul>

                <h3>2.2 Information Collected Automatically</h3>
                <ul>
                  <li><strong>Device Information:</strong> IP address, browser type, operating system, device identifiers, and mobile network information.</li>
                  <li><strong>Usage Data:</strong> Pages viewed, features used, time spent on the platform, click patterns, and navigation paths.</li>
                  <li><strong>Location Data:</strong> General location derived from IP address (we do not collect precise GPS location).</li>
                  <li><strong>Cookies & Similar Technologies:</strong> We use cookies, web beacons, and similar tracking technologies (see Section 7).</li>
                </ul>

                <h3>2.3 Information from Third Parties</h3>
                <ul>
                  <li><strong>Financial Data Providers:</strong> Real-time market data, news, and financial information from our data partners.</li>
                  <li><strong>Identity Verification Services:</strong> Verification results from third-party KYC (Know Your Customer) providers.</li>
                  <li><strong>Social Media:</strong> If you choose to link social accounts, we may receive basic profile information.</li>
                  <li><strong>Analytics Providers:</strong> Aggregated usage statistics and analytics data.</li>
                </ul>
              </section>

              <section id="how-we-use">
                <h2>3. How We Use Your Information</h2>
                <p>We use your personal information for the following purposes:</p>

                <h3>3.1 Providing Our Services</h3>
                <ul>
                  <li>Creating and maintaining your account</li>
                  <li>Processing subscriptions and payments</li>
                  <li>Delivering market data, AI recommendations, and trading tools</li>
                  <li>Providing customer support and responding to inquiries</li>
                  <li>Sending transactional emails and notifications</li>
                </ul>

                <h3>3.2 Improving Our Services</h3>
                <ul>
                  <li>Analyzing usage patterns to improve platform performance</li>
                  <li>Training and improving our AI algorithms</li>
                  <li>Conducting research and development of new features</li>
                  <li>Personalizing your experience based on your preferences</li>
                </ul>

                <h3>3.3 Security & Compliance</h3>
                <ul>
                  <li>Verifying your identity to prevent fraud</li>
                  <li>Complying with legal obligations and financial regulations</li>
                  <li>Detecting and preventing security threats or illegal activities</li>
                  <li>Enforcing our Terms of Service and other policies</li>
                </ul>

                <h3>3.4 Marketing & Communications</h3>
                <ul>
                  <li>Sending promotional emails about new features (you can opt out)</li>
                  <li>Providing educational content and trading insights</li>
                  <li>Conducting surveys and gathering feedback</li>
                  <li>Displaying relevant advertisements (with your consent where required)</li>
                </ul>
              </section>

              <section id="data-sharing">
                <h2>4. Data Sharing & Disclosure</h2>
                <p>We do not sell your personal information to third parties. We may share your data in the following circumstances:</p>

                <h3>4.1 Service Providers</h3>
                <p>We share data with trusted third-party vendors who help us operate our Services:</p>
                <ul>
                  <li><strong>Payment Processors:</strong> Stripe for secure payment processing</li>
                  <li><strong>Cloud Infrastructure:</strong> AWS for hosting and data storage</li>
                  <li><strong>Analytics:</strong> Google Analytics, Mixpanel for usage analysis</li>
                  <li><strong>Customer Support:</strong> Zendesk, Intercom for support tickets and live chat</li>
                  <li><strong>Email Services:</strong> SendGrid for transactional and marketing emails</li>
                  <li><strong>Identity Verification:</strong> Onfido, Jumio for KYC compliance</li>
                </ul>
                <p>These providers are contractually obligated to protect your data and use it only for the purposes we specify.</p>

                <h3>4.2 Legal Requirements</h3>
                <p>We may disclose your information if required to do so by law or in response to:</p>
                <ul>
                  <li>Court orders, subpoenas, or legal processes</li>
                  <li>Requests from law enforcement or government agencies</li>
                  <li>Protection of our rights, property, or safety</li>
                  <li>Investigation of fraud or security issues</li>
                </ul>

                <h3>4.3 Business Transfers</h3>
                <p>If TradeFlows is involved in a merger, acquisition, bankruptcy, or sale of assets, your information may be transferred as part of that transaction. We will notify you via email and/or a prominent notice on our website of any such change in ownership.</p>

                <h3>4.4 Aggregated & Anonymized Data</h3>
                <p>We may share aggregated or anonymized data that cannot identify you individually with partners, researchers, or the public (e.g., "60% of our users trade crypto").</p>
              </section>

              <section id="data-security">
                <h2>5. Data Security</h2>
                <p>We implement industry-standard security measures to protect your information:</p>
                <ul>
                  <li><strong>Encryption:</strong> All data transmitted between your device and our servers is encrypted using 256-bit SSL/TLS</li>
                  <li><strong>Encrypted Storage:</strong> Sensitive data is encrypted at rest in our databases</li>
                  <li><strong>Access Controls:</strong> Strict employee access controls and authentication requirements</li>
                  <li><strong>Regular Audits:</strong> Third-party security audits and penetration testing</li>
                  <li><strong>SOC 2 Compliance:</strong> We maintain SOC 2 Type II certification</li>
                  <li><strong>Incident Response:</strong> Documented procedures for responding to security breaches</li>
                </ul>
                <p>However, no method of transmission over the internet or electronic storage is 100% secure. While we strive to protect your information, we cannot guarantee absolute security.</p>
              </section>

              <section id="your-rights">
                <h2>6. Your Privacy Rights</h2>
                <p>Depending on your location, you may have the following rights regarding your personal data:</p>

                <h3>6.1 Access & Portability</h3>
                <ul>
                  <li>Request a copy of your personal data in a portable format</li>
                  <li>Access your account information through your dashboard</li>
                  <li>Export your trading data, portfolio history, and other records</li>
                </ul>

                <h3>6.2 Correction & Deletion</h3>
                <ul>
                  <li>Update inaccurate or incomplete information in your profile</li>
                  <li>Request deletion of your account and associated data</li>
                  <li>Note: We may retain certain data for legal or legitimate business purposes</li>
                </ul>

                <h3>6.3 Marketing Opt-Out</h3>
                <ul>
                  <li>Unsubscribe from marketing emails via the link in each email</li>
                  <li>Manage notification preferences in your account settings</li>
                  <li>Opt out of targeted advertising through your device settings</li>
                </ul>

                <h3>6.4 GDPR Rights (EU/EEA Residents)</h3>
                <ul>
                  <li>Right to object to processing</li>
                  <li>Right to restriction of processing</li>
                  <li>Right to lodge a complaint with a supervisory authority</li>
                  <li>Right to withdraw consent at any time</li>
                </ul>

                <h3>6.5 CCPA Rights (California Residents)</h3>
                <ul>
                  <li>Right to know what personal information we collect</li>
                  <li>Right to know whether we sell or disclose your information</li>
                  <li>Right to opt-out of the sale of personal information (we do not sell data)</li>
                  <li>Right to non-discrimination for exercising your rights</li>
                </ul>

                <p><strong>To Exercise Your Rights:</strong> Contact us at privacy@tradeflows.net or use the Data & Privacy section in your account settings.</p>
              </section>

              <section id="cookies">
                <h2>7. Cookies & Tracking Technologies</h2>
                <p>We use cookies and similar technologies to enhance your experience:</p>

                <h3>7.1 Types of Cookies</h3>
                <ul>
                  <li><strong>Essential Cookies:</strong> Required for basic site functionality (login, session management)</li>
                  <li><strong>Performance Cookies:</strong> Help us understand how you use our Services (Google Analytics)</li>
                  <li><strong>Functional Cookies:</strong> Remember your preferences and settings</li>
                  <li><strong>Advertising Cookies:</strong> Deliver relevant ads (with your consent where required)</li>
                </ul>

                <h3>7.2 Managing Cookies</h3>
                <p>You can control cookies through:</p>
                <ul>
                  <li>Your browser settings (most browsers allow you to block cookies)</li>
                  <li>Our cookie consent banner (adjust preferences at any time)</li>
                  <li>Opt-out tools provided by advertising networks</li>
                </ul>
                <p>Note: Disabling certain cookies may limit functionality of our Services.</p>
              </section>

              <section id="data-retention">
                <h2>8. Data Retention</h2>
                <p>We retain your personal information for as long as necessary to provide our Services and comply with legal obligations:</p>
                <ul>
                  <li><strong>Active Accounts:</strong> Data retained while your account is active</li>
                  <li><strong>Canceled Accounts:</strong> Data retained for 90 days to allow reactivation, then deleted</li>
                  <li><strong>Financial Records:</strong> Transaction history retained for 7 years per financial regulations</li>
                  <li><strong>Communications:</strong> Support tickets and communications retained for 3 years</li>
                  <li><strong>Marketing Data:</strong> Deleted within 30 days of opt-out request</li>
                </ul>
              </section>

              <section id="international">
                <h2>9. International Data Transfers</h2>
                <p>TradeFlows is based in the United States. If you access our Services from outside the US, your information will be transferred to and processed in the US and other countries where our service providers operate.</p>
                <p>We ensure appropriate safeguards are in place for international transfers, including:</p>
                <ul>
                  <li>Standard Contractual Clauses approved by the European Commission</li>
                  <li>Privacy Shield certification (where applicable)</li>
                  <li>Adequacy decisions by relevant data protection authorities</li>
                </ul>
              </section>

              <section id="children">
                <h2>10. Children's Privacy</h2>
                <p>TradeFlows Pro is not intended for individuals under the age of 18. We do not knowingly collect personal information from children under 18. If we become aware that we have collected data from a child under 18, we will delete it promptly.</p>
                <p>If you are a parent or guardian and believe your child has provided us with personal information, please contact us at privacy@tradeflows.net.</p>
              </section>

              <section id="changes">
                <h2>11. Changes to This Privacy Policy</h2>
                <p>We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. When we make changes:</p>
                <ul>
                  <li>We will update the "Last Updated" date at the top of this page</li>
                  <li>For material changes, we will notify you via email or a prominent notice on our platform</li>
                  <li>Your continued use of our Services after changes take effect constitutes acceptance of the updated policy</li>
                </ul>
                <p>We encourage you to review this Privacy Policy periodically.</p>
              </section>

              <section id="contact">
                <h2>12. Contact Us</h2>
                <p>If you have questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:</p>
                <div className="contact-info">
                  <p><strong>Email:</strong> privacy@tradeflows.net</p>
                  <p><strong>Mail:</strong><br />
                  TradeFlows Inc.<br />
                  Attn: Privacy Team<br />
                  123 Market Street, Suite 500<br />
                  San Francisco, CA 94105<br />
                  United States</p>
                  <p><strong>Data Protection Officer:</strong> dpo@tradeflows.net</p>
                </div>
                <p>We will respond to your inquiry within 30 days.</p>
              </section>

              <div className="legal-footer">
                <p>By using TradeFlows Pro, you acknowledge that you have read and understood this Privacy Policy.</p>
                <div className="legal-links">
                  <Link to="/terms">Terms of Service</Link>
                  <Link to="/contact">Contact Us</Link>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </>
  )
}
