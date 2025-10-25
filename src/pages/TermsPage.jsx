import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import './LegalPage.css'

export default function TermsPage() {
  return (
    <>
      <Helmet>
        <title>Terms of Service - TradeFlows Pro</title>
        <meta name="description" content="TradeFlows Pro Terms of Service. Read our terms and conditions for using the platform." />
      </Helmet>

      <div className="legal-page">
        <div className="legal-hero">
          <div className="container">
            <h1>Terms of Service</h1>
            <p className="legal-updated">Last Updated: January 15, 2024</p>
          </div>
        </div>

        <div className="legal-content">
          <div className="container-legal">
            <nav className="legal-nav">
              <h4>Table of Contents</h4>
              <a href="#acceptance">Acceptance of Terms</a>
              <a href="#services">Description of Services</a>
              <a href="#account">Account Registration</a>
              <a href="#subscriptions">Subscriptions & Payments</a>
              <a href="#use">Acceptable Use</a>
              <a href="#disclaimers">Disclaimers & Risk</a>
              <a href="#liability">Limitation of Liability</a>
              <a href="#intellectual">Intellectual Property</a>
              <a href="#termination">Termination</a>
              <a href="#dispute">Dispute Resolution</a>
              <a href="#governing-law">Governing Law</a>
              <a href="#contact">Contact</a>
            </nav>

            <article className="legal-article">
              <section id="acceptance">
                <h2>1. Acceptance of Terms</h2>
                <p>
                  These Terms of Service ("Terms") constitute a legally binding agreement between you and TradeFlows Inc. ("TradeFlows," "we," "us," or "our") governing your access to and use of the TradeFlows Pro platform, website, mobile applications, and related services (collectively, the "Services").
                </p>
                <p>
                  <strong>By accessing or using our Services, you agree to be bound by these Terms and our Privacy Policy.</strong> If you do not agree to these Terms, you must not access or use our Services.
                </p>
                <p>
                  We reserve the right to modify these Terms at any time. Changes will be effective upon posting to our website. Your continued use of the Services after changes are posted constitutes acceptance of the modified Terms.
                </p>
              </section>

              <section id="services">
                <h2>2. Description of Services</h2>
                <p>TradeFlows Pro provides:</p>
                <ul>
                  <li><strong>Market Data:</strong> Real-time and historical financial market data across stocks, crypto, forex, and commodities</li>
                  <li><strong>AI Trading Recommendations:</strong> Algorithmic trading suggestions based on machine learning analysis</li>
                  <li><strong>Technical Analysis Tools:</strong> Charting tools, indicators, and analysis features</li>
                  <li><strong>Portfolio Management:</strong> Tools to track and analyze your investment portfolio</li>
                  <li><strong>Alerts & Notifications:</strong> Customizable price alerts and trading signals</li>
                  <li><strong>Educational Content:</strong> Trading guides, market analysis, and educational resources</li>
                </ul>
                <p><strong>Important:</strong> TradeFlows Pro is an information and analysis platform. We do not execute trades, hold funds, or act as a broker-dealer. You are responsible for executing your own trades through your brokerage accounts.</p>
              </section>

              <section id="account">
                <h2>3. Account Registration & Security</h2>

                <h3>3.1 Eligibility</h3>
                <p>To use TradeFlows Pro, you must:</p>
                <ul>
                  <li>Be at least 18 years old</li>
                  <li>Have the legal capacity to enter into binding contracts</li>
                  <li>Not be prohibited from using our Services under applicable laws</li>
                  <li>Provide accurate and complete registration information</li>
                </ul>

                <h3>3.2 Account Security</h3>
                <p>You are responsible for:</p>
                <ul>
                  <li>Maintaining the confidentiality of your password</li>
                  <li>All activities that occur under your account</li>
                  <li>Notifying us immediately of any unauthorized access</li>
                  <li>Ensuring your account information is accurate and up-to-date</li>
                </ul>
                <p>We recommend enabling two-factor authentication (2FA) for additional security.</p>

                <h3>3.3 Identity Verification</h3>
                <p>We may require identity verification to comply with financial regulations and prevent fraud. This may include:</p>
                <ul>
                  <li>Government-issued ID</li>
                  <li>Proof of address</li>
                  <li>Selfie verification</li>
                  <li>Additional documentation as needed</li>
                </ul>
                <p>Failure to complete verification may result in limited account functionality or suspension.</p>
              </section>

              <section id="subscriptions">
                <h2>4. Subscriptions, Payments & Refunds</h2>

                <h3>4.1 Subscription Plans</h3>
                <p>TradeFlows Pro offers multiple subscription tiers:</p>
                <ul>
                  <li><strong>Free Trial:</strong> 3-day trial with full Premium access</li>
                  <li><strong>Premium:</strong> $49.99/month or $479.99/year</li>
                  <li><strong>Professional:</strong> $79.99/month or $767.99/year</li>
                </ul>
                <p>Pricing is subject to change with 30 days' notice to existing subscribers.</p>

                <h3>4.2 Billing & Payments</h3>
                <ul>
                  <li>Subscriptions automatically renew unless canceled</li>
                  <li>You authorize us to charge your payment method on each renewal date</li>
                  <li>Payments are processed securely through Stripe</li>
                  <li>You are responsible for all applicable taxes</li>
                  <li>Failed payments may result in service suspension</li>
                </ul>

                <h3>4.3 Refund Policy</h3>
                <ul>
                  <li><strong>30-Day Money-Back Guarantee:</strong> First-time subscribers can request a full refund within 30 days</li>
                  <li><strong>Annual Subscriptions:</strong> Prorated refunds available within first 30 days</li>
                  <li><strong>No Refunds:</strong> After 30 days, subscription fees are non-refundable</li>
                  <li><strong>Cancellations:</strong> You can cancel anytime; access continues until end of billing period</li>
                </ul>

                <h3>4.4 Upgrading & Downgrading</h3>
                <ul>
                  <li>Upgrades take effect immediately; you pay prorated difference</li>
                  <li>Downgrades take effect at end of current billing period</li>
                  <li>Changes can be made through your account settings</li>
                </ul>
              </section>

              <section id="use">
                <h2>5. Acceptable Use Policy</h2>

                <h3>5.1 Permitted Use</h3>
                <p>You may use our Services for:</p>
                <ul>
                  <li>Personal financial research and analysis</li>
                  <li>Portfolio tracking and management</li>
                  <li>Educational purposes</li>
                  <li>Professional trading (with Professional plan)</li>
                </ul>

                <h3>5.2 Prohibited Activities</h3>
                <p>You agree NOT to:</p>
                <ul>
                  <li>Violate any applicable laws or regulations</li>
                  <li>Infringe on intellectual property rights</li>
                  <li>Attempt to gain unauthorized access to our systems</li>
                  <li>Reverse engineer, decompile, or disassemble our software</li>
                  <li>Use our Services to transmit malware or harmful code</li>
                  <li>Scrape, crawl, or harvest data from our platform</li>
                  <li>Resell or redistribute our data or services</li>
                  <li>Create fake accounts or impersonate others</li>
                  <li>Manipulate or interfere with platform functionality</li>
                  <li>Use automated trading bots without authorization (Professional plan only)</li>
                </ul>

                <h3>5.3 API Usage (Professional Plan)</h3>
                <p>If you have API access:</p>
                <ul>
                  <li>Respect rate limits (10,000 requests per day)</li>
                  <li>Do not share your API keys</li>
                  <li>Use API responsibly and in accordance with documentation</li>
                  <li>Excessive or abusive use may result in API suspension</li>
                </ul>
              </section>

              <section id="disclaimers">
                <h2>6. Disclaimers & Investment Risk</h2>

                <h3>6.1 Not Financial Advice</h3>
                <p><strong>IMPORTANT:</strong> TradeFlows Pro provides information and analysis tools, NOT personalized financial advice. Our AI recommendations and content are for informational purposes only and should not be considered investment advice.</p>
                <ul>
                  <li>We are not registered investment advisors or broker-dealers</li>
                  <li>We do not know your individual financial situation</li>
                  <li>Past performance does not guarantee future results</li>
                  <li>You should consult a qualified financial advisor before making investment decisions</li>
                </ul>

                <h3>6.2 Trading Risks</h3>
                <p>Trading and investing involve substantial risk of loss. You acknowledge and agree that:</p>
                <ul>
                  <li>You may lose some or all of your invested capital</li>
                  <li>Trading on margin amplifies both gains and losses</li>
                  <li>Cryptocurrency trading is highly volatile and speculative</li>
                  <li>Options and derivatives carry additional risks</li>
                  <li>You are solely responsible for your trading decisions</li>
                </ul>

                <h3>6.3 Data Accuracy</h3>
                <p>While we strive for accuracy, we cannot guarantee:</p>
                <ul>
                  <li>Real-time data is always current or error-free</li>
                  <li>Historical data is complete or accurate</li>
                  <li>Third-party data providers are reliable</li>
                  <li>AI recommendations will be profitable</li>
                  <li>Platform availability at all times (we target 99.9% uptime)</li>
                </ul>

                <h3>6.4 Service Availability</h3>
                <p>Our Services are provided "AS IS" and "AS AVAILABLE" without warranties of any kind, express or implied, including but not limited to:</p>
                <ul>
                  <li>Merchantability</li>
                  <li>Fitness for a particular purpose</li>
                  <li>Non-infringement</li>
                  <li>Uninterrupted or error-free operation</li>
                </ul>
              </section>

              <section id="liability">
                <h2>7. Limitation of Liability</h2>

                <p><strong>TO THE MAXIMUM EXTENT PERMITTED BY LAW:</strong></p>

                <p>TradeFlows, its officers, directors, employees, and agents shall NOT be liable for:</p>
                <ul>
                  <li>Any trading losses or investment decisions you make</li>
                  <li>Indirect, incidental, consequential, or punitive damages</li>
                  <li>Loss of profits, data, or business opportunities</li>
                  <li>Damages resulting from data errors or delays</li>
                  <li>Unauthorized access to your account</li>
                  <li>Third-party actions or services</li>
                  <li>Force majeure events beyond our control</li>
                </ul>

                <p><strong>Maximum Liability:</strong> Our total liability to you for any claims shall not exceed the amount you paid us in the 12 months preceding the claim, or $100, whichever is greater.</p>

                <p>Some jurisdictions do not allow limitation of implied warranties or liability for incidental or consequential damages. In such jurisdictions, our liability is limited to the greatest extent permitted by law.</p>
              </section>

              <section id="intellectual">
                <h2>8. Intellectual Property Rights</h2>

                <h3>8.1 Our Property</h3>
                <p>All content, features, and functionality of TradeFlows Pro are owned by TradeFlows Inc. and protected by copyright, trademark, and other intellectual property laws. This includes:</p>
                <ul>
                  <li>Software code and algorithms</li>
                  <li>AI models and machine learning systems</li>
                  <li>Charts, graphs, and visualizations</li>
                  <li>TradeFlows branding, logos, and trademarks</li>
                  <li>Educational content and articles</li>
                </ul>

                <h3>8.2 Limited License</h3>
                <p>We grant you a limited, non-exclusive, non-transferable, revocable license to:</p>
                <ul>
                  <li>Access and use our Services for your personal or business use</li>
                  <li>Download content for offline viewing (where permitted)</li>
                  <li>Use our API (Professional plan subscribers only)</li>
                </ul>
                <p>This license terminates upon termination of your account or violation of these Terms.</p>

                <h3>8.3 Your Content</h3>
                <p>You retain ownership of content you submit (watchlists, custom strategies, notes). By submitting content, you grant us a worldwide, royalty-free license to use, store, and process it to provide our Services.</p>
              </section>

              <section id="termination">
                <h2>9. Termination</h2>

                <h3>9.1 Termination by You</h3>
                <p>You may cancel your account at any time through account settings. Upon cancellation:</p>
                <ul>
                  <li>Your subscription will remain active until the end of the billing period</li>
                  <li>You can export your data before deletion</li>
                  <li>Your data will be retained for 90 days (see Privacy Policy)</li>
                </ul>

                <h3>9.2 Termination by Us</h3>
                <p>We may suspend or terminate your account immediately if:</p>
                <ul>
                  <li>You violate these Terms or our Acceptable Use Policy</li>
                  <li>Your payment method fails repeatedly</li>
                  <li>We are required to do so by law</li>
                  <li>You engage in fraudulent or illegal activity</li>
                  <li>Your account is inactive for more than 12 months (with notice)</li>
                </ul>

                <h3>9.3 Effect of Termination</h3>
                <p>Upon termination:</p>
                <ul>
                  <li>Your license to use our Services ends immediately</li>
                  <li>You must cease all use of our Services</li>
                  <li>We may delete your data after the retention period</li>
                  <li>Sections of these Terms that should survive will continue to apply</li>
                </ul>
              </section>

              <section id="dispute">
                <h2>10. Dispute Resolution & Arbitration</h2>

                <h3>10.1 Informal Resolution</h3>
                <p>Before filing a claim, you agree to contact us at legal@tradeflows.net to attempt to resolve the dispute informally. We will work in good faith to resolve disputes within 60 days.</p>

                <h3>10.2 Binding Arbitration</h3>
                <p>If informal resolution fails, any dispute shall be resolved through binding arbitration rather than in court, except where prohibited by law.</p>
                <ul>
                  <li>Arbitration will be conducted by the American Arbitration Association (AAA)</li>
                  <li>Arbitration will take place in San Francisco, California</li>
                  <li>Each party pays their own attorney fees unless the arbitrator awards otherwise</li>
                  <li>The arbitrator's decision is final and binding</li>
                </ul>

                <h3>10.3 Class Action Waiver</h3>
                <p>You agree to resolve disputes individually, not as part of a class action. You waive any right to participate in class action lawsuits or class-wide arbitration.</p>

                <h3>10.4 Exceptions</h3>
                <p>Either party may seek injunctive relief in court for:</p>
                <ul>
                  <li>Intellectual property disputes</li>
                  <li>Claims of unauthorized access or data breach</li>
                  <li>Small claims court actions (under $10,000)</li>
                </ul>
              </section>

              <section id="governing-law">
                <h2>11. Governing Law & Jurisdiction</h2>
                <p>These Terms are governed by the laws of the State of California and the United States, without regard to conflict of law principles.</p>
                <p>Any legal action not subject to arbitration must be brought in the state or federal courts located in San Francisco County, California. You consent to personal jurisdiction in these courts.</p>
              </section>

              <section id="miscellaneous">
                <h2>12. Miscellaneous</h2>

                <h3>12.1 Entire Agreement</h3>
                <p>These Terms, together with our Privacy Policy, constitute the entire agreement between you and TradeFlows regarding use of our Services.</p>

                <h3>12.2 Severability</h3>
                <p>If any provision of these Terms is found to be unenforceable, the remaining provisions will remain in full effect.</p>

                <h3>12.3 Waiver</h3>
                <p>Our failure to enforce any right or provision does not constitute a waiver of that right or provision.</p>

                <h3>12.4 Assignment</h3>
                <p>You may not assign these Terms without our consent. We may assign these Terms to any affiliate or successor.</p>

                <h3>12.5 Force Majeure</h3>
                <p>We are not liable for delays or failures due to events beyond our reasonable control (natural disasters, war, pandemic, internet outages, etc.).</p>
              </section>

              <section id="contact">
                <h2>13. Contact Information</h2>
                <p>If you have questions about these Terms, please contact us:</p>
                <div className="contact-info">
                  <p><strong>Email:</strong> legal@tradeflows.net</p>
                  <p><strong>Mail:</strong><br />
                  TradeFlows Inc.<br />
                  Attn: Legal Department<br />
                  123 Market Street, Suite 500<br />
                  San Francisco, CA 94105<br />
                  United States</p>
                </div>
              </section>

              <div className="legal-footer">
                <p><strong>By using TradeFlows Pro, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.</strong></p>
                <div className="legal-links">
                  <Link to="/privacy">Privacy Policy</Link>
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
