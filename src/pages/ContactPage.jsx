import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import './ContactPage.css'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: 'general',
    message: ''
  })

  const [status, setStatus] = useState('idle') // idle, submitting, success, error

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('submitting')

    // Simulate form submission
    // In production, this would send to your backend API
    setTimeout(() => {
      setStatus('success')
      setFormData({
        name: '',
        email: '',
        company: '',
        subject: 'general',
        message: ''
      })
    }, 1500)
  }

  const contactMethods = [
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <path d="M28 6H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h24c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M30 8l-14 10L2 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: 'Email Us',
      description: 'Our team typically responds within 24 hours',
      contact: 'support@tradeflows.net',
      link: 'mailto:support@tradeflows.net'
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <path d="M29 21.3v4a2.67 2.67 0 0 1-2.91 2.67 26.42 26.42 0 0 1-11.51-4.1 26 26 0 0 1-8-8A26.42 26.42 0 0 1 2.48 4.24 2.67 2.67 0 0 1 5.15 1.33h4a2.67 2.67 0 0 1 2.67 2.3 17.12 17.12 0 0 0 .93 3.75 2.67 2.67 0 0 1-.6 2.81l-1.69 1.69a21.33 21.33 0 0 0 8 8l1.69-1.69a2.67 2.67 0 0 1 2.81-.6 17.12 17.12 0 0 0 3.75.93A2.67 2.67 0 0 1 29 21.3z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: 'Call Us',
      description: 'Monday-Friday, 9am-6pm EST',
      contact: '1-800-TRADE-PRO',
      link: 'tel:1-800-873-2337'
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <path d="M28 10.67a2.67 2.67 0 0 0-2.67-2.67H6.67A2.67 2.67 0 0 0 4 10.67m24 0v10.66A2.67 2.67 0 0 1 25.33 24H6.67A2.67 2.67 0 0 1 4 21.33V10.67m24 0l-12 8-12-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: 'Live Chat',
      description: 'Average response time: <2 minutes',
      contact: 'Start chatting now',
      link: 'https://app.tradeflows.net/support'
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <path d="M16 28c6.627 0 12-5.373 12-12S22.627 4 16 4 4 9.373 4 16s5.373 12 12 12z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M16 20h.01M16 12v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: 'Help Center',
      description: 'Browse our comprehensive knowledge base',
      contact: 'Visit Help Center',
      link: '/knowledge-base'
    }
  ]

  const offices = [
    {
      city: 'San Francisco',
      address: '123 Market Street, Suite 500',
      state: 'California 94105',
      country: 'United States',
      type: 'Headquarters'
    },
    {
      city: 'New York',
      address: '456 Wall Street, Floor 12',
      state: 'New York 10005',
      country: 'United States',
      type: 'East Coast Office'
    },
    {
      city: 'London',
      address: '789 Canary Wharf',
      state: 'London E14 5AB',
      country: 'United Kingdom',
      type: 'European Office'
    }
  ]

  const departments = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'sales', label: 'Sales & Partnerships' },
    { value: 'support', label: 'Technical Support' },
    { value: 'billing', label: 'Billing & Subscriptions' },
    { value: 'press', label: 'Press & Media' },
    { value: 'careers', label: 'Careers & Recruitment' }
  ]

  return (
    <>
      <Helmet>
        <title>Contact Us - TradeFlows Pro Support & Sales</title>
        <meta name="description" content="Get in touch with TradeFlows Pro. Email, phone, or live chat support. Sales inquiries welcome. Our team is here to help you succeed." />
      </Helmet>

      <div className="contact-page">
        {/* Hero */}
        <section className="contact-hero">
          <div className="container">
            <div className="contact-hero-content">
              <h1>Get in Touch</h1>
              <p>We're here to help. Reach out with any questions, feedback, or partnership inquiries.</p>
            </div>
          </div>
        </section>

        {/* Contact Methods */}
        <section className="contact-methods section">
          <div className="container">
            <div className="methods-grid">
              {contactMethods.map((method, index) => (
                <a
                  key={index}
                  href={method.link}
                  className="method-card"
                  target={method.link.startsWith('http') ? '_blank' : '_self'}
                  rel={method.link.startsWith('http') ? 'noopener noreferrer' : ''}
                >
                  <div className="method-icon">{method.icon}</div>
                  <h3>{method.title}</h3>
                  <p className="method-description">{method.description}</p>
                  <div className="method-contact">{method.contact}</div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="contact-form-section section">
          <div className="container">
            <div className="form-layout">
              {/* Form */}
              <div className="form-container">
                <h2>Send Us a Message</h2>
                <p className="form-intro">
                  Fill out the form below and we'll get back to you within 24 hours.
                </p>

                {status === 'success' && (
                  <div className="form-success">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M22 4L12 14.01l-3-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <h4>Message Sent Successfully!</h4>
                    <p>We've received your message and will respond within 24 hours.</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="contact-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="name">Full Name *</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="John Doe"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="email">Email Address *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="company">Company / Organization</label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Acme Corp (optional)"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="subject">Subject *</label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    >
                      {departments.map((dept) => (
                        <option key={dept.value} value={dept.value}>
                          {dept.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">Message *</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="6"
                      placeholder="Tell us how we can help..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary btn-large"
                    disabled={status === 'submitting'}
                  >
                    {status === 'submitting' ? 'Sending...' : 'Send Message'}
                  </button>

                  <p className="form-privacy">
                    By submitting this form, you agree to our{' '}
                    <a href="/privacy">Privacy Policy</a> and{' '}
                    <a href="/terms">Terms of Service</a>.
                  </p>
                </form>
              </div>

              {/* Sidebar */}
              <div className="form-sidebar">
                <div className="sidebar-card">
                  <h3>Quick Response Times</h3>
                  <div className="response-times">
                    <div className="response-item">
                      <div className="response-badge live-chat">Live Chat</div>
                      <div className="response-time">&lt;2 min</div>
                    </div>
                    <div className="response-item">
                      <div className="response-badge email">Email</div>
                      <div className="response-time">&lt;24 hrs</div>
                    </div>
                    <div className="response-item">
                      <div className="response-badge phone">Phone</div>
                      <div className="response-time">Immediate</div>
                    </div>
                  </div>
                </div>

                <div className="sidebar-card">
                  <h3>Frequently Asked</h3>
                  <div className="quick-links">
                    <a href="/knowledge-base/quick-start-guide">How do I get started?</a>
                    <a href="/knowledge-base/subscription-management">How do I upgrade my plan?</a>
                    <a href="/knowledge-base/ai-recommendations">How accurate are AI recommendations?</a>
                    <a href="/pricing">What are the pricing options?</a>
                    <a href="/knowledge-base">View All FAQs →</a>
                  </div>
                </div>

                <div className="sidebar-card">
                  <h3>Enterprise Solutions</h3>
                  <p>Need a custom plan for your team or institution?</p>
                  <a href="mailto:enterprise@tradeflows.net" className="btn btn-secondary">
                    Contact Sales
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Offices */}
        <section className="offices-section section">
          <div className="container">
            <div className="section-header text-center">
              <h2>Our Offices</h2>
              <p>Visit us at one of our global locations</p>
            </div>

            <div className="offices-grid">
              {offices.map((office, index) => (
                <div key={index} className="office-card">
                  <div className="office-type">{office.type}</div>
                  <h3 className="office-city">{office.city}</h3>
                  <div className="office-address">
                    <p>{office.address}</p>
                    <p>{office.state}</p>
                    <p>{office.country}</p>
                  </div>
                  <div className="office-map">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    View on Map
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Social */}
        <section className="social-section section">
          <div className="container">
            <div className="social-content">
              <h2>Connect With Us</h2>
              <p>Follow us on social media for updates, tips, and market insights</p>

              <div className="social-links">
                <a href="https://twitter.com/tradeflowspro" className="social-link" target="_blank" rel="noopener noreferrer">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <div>
                    <div className="social-name">Twitter</div>
                    <div className="social-handle">@tradeflowspro</div>
                  </div>
                </a>

                <a href="https://linkedin.com/company/tradeflows" className="social-link" target="_blank" rel="noopener noreferrer">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="4" cy="4" r="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <div>
                    <div className="social-name">LinkedIn</div>
                    <div className="social-handle">TradeFlows Pro</div>
                  </div>
                </a>

                <a href="https://github.com/tradeflows" className="social-link" target="_blank" rel="noopener noreferrer">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <div>
                    <div className="social-name">GitHub</div>
                    <div className="social-handle">@tradeflows</div>
                  </div>
                </a>

                <a href="https://discord.gg/tradeflows" className="social-link" target="_blank" rel="noopener noreferrer">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M9.5 10a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm5 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" fill="currentColor"/>
                    <path d="M21 2H3a1 1 0 0 0-1 1v18l4-4h15a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <div>
                    <div className="social-name">Discord</div>
                    <div className="social-handle">Join Community</div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
