import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import ROICalculator from '../components/ROICalculator'
import './PricingPage.css'

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState('monthly')

  const plans = [
    {
      id: 'trial',
      name: '7-Day Free Trial',
      badge: 'Most Popular',
      badgeColor: 'orange',
      price: billingCycle === 'monthly' ? 0 : 0,
      originalPrice: null,
      period: '7 days',
      then: 'Then $49.99/month',
      description: 'Perfect for trying out all premium features',
      features: [
        'Full Premium access for 7 days',
        'AI trading strategies',
        'Real-time market data',
        'Advanced charting tools',
        'Portfolio management',
        'Custom alerts',
        'Mobile & desktop apps',
        'Email support',
        '⚠️ Credit card required'
      ],
      cta: 'Start Free Trial',
      ctaLink: 'https://app.tradeflows.net?signup=true&plan=trial',
      highlighted: true
    },
    {
      id: 'premium',
      name: 'Premium',
      badge: null,
      price: billingCycle === 'monthly' ? 49.99 : 479.99,
      originalPrice: billingCycle === 'monthly' ? null : 599.88,
      period: billingCycle === 'monthly' ? '/month' : '/year',
      then: null,
      description: 'Everything you need for professional trading',
      features: [
        'Real-time market data',
        'AI strategy recommendations',
        'Advanced technical analysis',
        'Unlimited watchlists',
        'Portfolio analytics',
        'Smart alerts & notifications',
        'Mobile & desktop apps',
        'Priority email support',
        'Data export',
        'Custom indicators'
      ],
      cta: 'Get Premium',
      ctaLink: 'https://app.tradeflows.net?signup=true&plan=premium',
      highlighted: false
    },
    {
      id: 'professional',
      name: 'Professional',
      badge: 'Best Value',
      badgeColor: 'green',
      price: billingCycle === 'monthly' ? 79.99 : 767.99,
      originalPrice: billingCycle === 'monthly' ? null : 959.88,
      period: billingCycle === 'monthly' ? '/month' : '/year',
      then: null,
      description: 'Advanced features for serious traders',
      features: [
        'Everything in Premium',
        'Custom strategy builder',
        'Advanced portfolio analytics',
        'API access (10,000 calls/day)',
        'Backtesting engine',
        'Multi-account management',
        'Priority support (24/7)',
        'Dedicated account manager',
        'Custom integrations',
        'Early access to new features',
        'White-label reports',
        'Advanced risk analytics'
      ],
      cta: 'Get Professional',
      ctaLink: 'https://app.tradeflows.net?signup=true&plan=professional',
      highlighted: false
    }
  ]

  return (
    <>
      <Helmet>
        <title>Pricing - TradeFlows Pro Plans</title>
        <meta name="description" content="Choose the perfect TradeFlows Pro plan for your trading needs. Start with a 7-day free trial. Premium from $49.99/month. Professional from $79.99/month." />
      </Helmet>

      <div className="pricing-page">
        {/* Hero */}
        <section className="pricing-hero">
          <div className="container">
            <div className="pricing-hero-content">
              <h1>Simple, Transparent <span className="gradient-text">Pricing</span></h1>
              <p>Choose the plan that fits your trading style. Start with a free trial, upgrade or cancel anytime.</p>

              {/* Billing Toggle */}
              <div className="billing-toggle">
                <button
                  className={billingCycle === 'monthly' ? 'active' : ''}
                  onClick={() => setBillingCycle('monthly')}
                >
                  Monthly
                </button>
                <button
                  className={billingCycle === 'annual' ? 'active' : ''}
                  onClick={() => setBillingCycle('annual')}
                >
                  Annual
                  <span className="save-badge">Save 20%</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="pricing-cards section">
          <div className="container">
            <div className="plans-grid">
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  className={`pricing-card ${plan.highlighted ? 'highlighted' : ''}`}
                >
                  {plan.badge && (
                    <div className={`plan-badge ${plan.badgeColor}`}>
                      {plan.badge}
                    </div>
                  )}

                  <div className="plan-header">
                    <h3 className="plan-name">{plan.name}</h3>
                    <p className="plan-description">{plan.description}</p>
                  </div>

                  <div className="plan-pricing">
                    <div className="price-main">
                      <span className="currency">$</span>
                      <span className="amount">{plan.price}</span>
                      <span className="period">{plan.period}</span>
                    </div>
                    {plan.originalPrice && (
                      <div className="price-original">
                        Was ${plan.originalPrice}/year
                      </div>
                    )}
                    {plan.then && (
                      <div className="price-then">{plan.then}</div>
                    )}
                  </div>

                  <ul className="plan-features">
                    {plan.features.map((feature, index) => (
                      <li key={index}>
                        <span className="feature-icon">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <a href={plan.ctaLink} className="plan-cta">
                    {plan.cta}
                  </a>
                </div>
              ))}
            </div>

            <div className="pricing-note">
              <p>🔒 All plans include 256-bit SSL encryption and are PCI DSS compliant</p>
              <p>💳 Secure payment processing by Stripe • Cancel anytime • No hidden fees</p>
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="comparison-section section">
          <div className="container">
            <div className="section-header text-center">
              <h2>Compare Plans</h2>
              <p>Detailed feature comparison across all plans</p>
            </div>

            <div className="comparison-table-wrapper">
              <table className="comparison-table">
                <thead>
                  <tr>
                    <th>Features</th>
                    <th>Free Trial</th>
                    <th>Premium</th>
                    <th>Professional</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="feature-category" colSpan="4">Market Data</td>
                  </tr>
                  <tr>
                    <td>Real-time quotes</td>
                    <td><span className="check">✓</span></td>
                    <td><span className="check">✓</span></td>
                    <td><span className="check">✓</span></td>
                  </tr>
                  <tr>
                    <td>Level 2 market data</td>
                    <td><span className="check">✓</span></td>
                    <td><span className="check">✓</span></td>
                    <td><span className="check">✓</span></td>
                  </tr>
                  <tr>
                    <td>Historical data</td>
                    <td>1 year</td>
                    <td>5 years</td>
                    <td>Unlimited</td>
                  </tr>

                  <tr>
                    <td className="feature-category" colSpan="4">Trading Tools</td>
                  </tr>
                  <tr>
                    <td>AI strategy recommendations</td>
                    <td><span className="check">✓</span></td>
                    <td><span className="check">✓</span></td>
                    <td><span className="check">✓</span></td>
                  </tr>
                  <tr>
                    <td>Technical indicators</td>
                    <td>50+</td>
                    <td>100+</td>
                    <td>100+ & Custom</td>
                  </tr>
                  <tr>
                    <td>Chart types</td>
                    <td>5</td>
                    <td>10</td>
                    <td>15</td>
                  </tr>
                  <tr>
                    <td>Backtesting</td>
                    <td><span className="cross">✗</span></td>
                    <td>Limited</td>
                    <td>Unlimited</td>
                  </tr>
                  <tr>
                    <td>Custom strategy builder</td>
                    <td><span className="cross">✗</span></td>
                    <td><span className="cross">✗</span></td>
                    <td><span className="check">✓</span></td>
                  </tr>

                  <tr>
                    <td className="feature-category" colSpan="4">Portfolio & Analytics</td>
                  </tr>
                  <tr>
                    <td>Portfolio tracking</td>
                    <td><span className="check">✓</span></td>
                    <td><span className="check">✓</span></td>
                    <td><span className="check">✓</span></td>
                  </tr>
                  <tr>
                    <td>Performance analytics</td>
                    <td>Basic</td>
                    <td>Advanced</td>
                    <td>Institutional</td>
                  </tr>
                  <tr>
                    <td>Risk analysis</td>
                    <td>Basic</td>
                    <td>Advanced</td>
                    <td>Advanced + Custom</td>
                  </tr>
                  <tr>
                    <td>Multi-account management</td>
                    <td><span className="cross">✗</span></td>
                    <td>Up to 3</td>
                    <td>Unlimited</td>
                  </tr>

                  <tr>
                    <td className="feature-category" colSpan="4">Alerts & Notifications</td>
                  </tr>
                  <tr>
                    <td>Price alerts</td>
                    <td>10/day</td>
                    <td>Unlimited</td>
                    <td>Unlimited</td>
                  </tr>
                  <tr>
                    <td>AI trade signals</td>
                    <td><span className="check">✓</span></td>
                    <td><span className="check">✓</span></td>
                    <td><span className="check">✓</span></td>
                  </tr>
                  <tr>
                    <td>SMS notifications</td>
                    <td><span className="cross">✗</span></td>
                    <td>100/month</td>
                    <td>Unlimited</td>
                  </tr>

                  <tr>
                    <td className="feature-category" colSpan="4">API & Integration</td>
                  </tr>
                  <tr>
                    <td>API access</td>
                    <td><span className="cross">✗</span></td>
                    <td><span className="cross">✗</span></td>
                    <td>10K calls/day</td>
                  </tr>
                  <tr>
                    <td>Webhook support</td>
                    <td><span className="cross">✗</span></td>
                    <td><span className="cross">✗</span></td>
                    <td><span className="check">✓</span></td>
                  </tr>
                  <tr>
                    <td>Data export</td>
                    <td><span className="cross">✗</span></td>
                    <td>CSV</td>
                    <td>CSV, JSON, Excel</td>
                  </tr>

                  <tr>
                    <td className="feature-category" colSpan="4">Support</td>
                  </tr>
                  <tr>
                    <td>Email support</td>
                    <td>Business hours</td>
                    <td>Priority</td>
                    <td>24/7 Priority</td>
                  </tr>
                  <tr>
                    <td>Live chat</td>
                    <td><span className="cross">✗</span></td>
                    <td><span className="check">✓</span></td>
                    <td><span className="check">✓</span></td>
                  </tr>
                  <tr>
                    <td>Dedicated account manager</td>
                    <td><span className="cross">✗</span></td>
                    <td><span className="cross">✗</span></td>
                    <td><span className="check">✓</span></td>
                  </tr>
                  <tr>
                    <td>Phone support</td>
                    <td><span className="cross">✗</span></td>
                    <td><span className="cross">✗</span></td>
                    <td><span className="check">✓</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ROI Calculator */}
        <section className="roi-section section">
          <div className="container">
            <div className="section-header text-center">
              <h2>Calculate Your ROI</h2>
              <p>See exactly how much value TradeFlows Pro delivers for your trading</p>
            </div>
            <ROICalculator />
          </div>
        </section>

        {/* FAQ */}
        <section className="faq-section section">
          <div className="container">
            <div className="section-header text-center">
              <h2>Frequently Asked Questions</h2>
              <p>Everything you need to know about pricing and plans</p>
            </div>

            <div className="faq-grid">
              <div className="faq-item">
                <h3>How does the free trial work?</h3>
                <p>Your 7-day free trial includes full access to all Premium features. You'll need to enter a credit card, but you won't be charged until the trial ends. Cancel anytime during the trial at no cost.</p>
              </div>

              <div className="faq-item">
                <h3>Can I change plans anytime?</h3>
                <p>Absolutely! You can upgrade, downgrade, or cancel your plan at any time. When upgrading, you'll only pay the prorated difference. When downgrading, you'll keep your current plan until the end of your billing period.</p>
              </div>

              <div className="faq-item">
                <h3>What payment methods do you accept?</h3>
                <p>We accept all major credit cards (Visa, MasterCard, American Express, Discover) and debit cards. All payments are processed securely through Stripe.</p>
              </div>

              <div className="faq-item">
                <h3>Is there a long-term contract?</h3>
                <p>No contracts required! All plans are month-to-month or annual with no long-term commitments. Cancel anytime and you won't be charged for the next billing cycle.</p>
              </div>

              <div className="faq-item">
                <h3>Do you offer refunds?</h3>
                <p>Yes! We offer a 30-day money-back guarantee on all paid plans. If you're not satisfied for any reason, contact us within 30 days for a full refund.</p>
              </div>

              <div className="faq-item">
                <h3>Can I get a discount for annual billing?</h3>
                <p>Yes! Annual billing saves you 20% compared to monthly billing. That's like getting 2.4 months free each year.</p>
              </div>

              <div className="faq-item">
                <h3>Do you offer student or educator discounts?</h3>
                <p>Yes! We offer 50% off for verified students and educators. Contact our support team with proof of enrollment or employment for your discount code.</p>
              </div>

              <div className="faq-item">
                <h3>What happens to my data if I cancel?</h3>
                <p>Your data is always yours. If you cancel, you can export all your data. We'll keep your account data for 90 days in case you want to reactivate. After 90 days, data is permanently deleted.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="pricing-cta section">
          <div className="container">
            <div className="cta-box">
              <h2>Ready to Start Trading Smarter?</h2>
              <p>Join thousands of traders using TradeFlows Pro</p>
              <a href="https://app.tradeflows.net?signup=true&utm_source=website&utm_medium=navigation&utm_campaign=trial" className="btn btn-primary btn-large">
                Start Your Free Trial
              </a>
              <p className="cta-subtext">No credit card required for trial • Cancel anytime</p>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
