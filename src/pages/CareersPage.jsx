import { Helmet } from 'react-helmet-async'
import './CareersPage.css'

export default function CareersPage() {
  const openPositions = [
    {
      id: 1,
      title: 'Senior Frontend Engineer',
      department: 'Engineering',
      location: 'San Francisco, CA / Remote',
      type: 'Full-time',
      description: 'Build beautiful, performant trading interfaces used by thousands of traders daily.'
    },
    {
      id: 2,
      title: 'Machine Learning Engineer',
      department: 'AI Research',
      location: 'San Francisco, CA',
      type: 'Full-time',
      description: 'Develop and improve our AI trading recommendation engine using cutting-edge ML techniques.'
    },
    {
      id: 3,
      title: 'Product Designer',
      department: 'Design',
      location: 'Remote',
      type: 'Full-time',
      description: 'Design intuitive trading experiences that empower users to make better decisions.'
    },
    {
      id: 4,
      title: 'Senior Backend Engineer',
      department: 'Engineering',
      location: 'San Francisco, CA / Remote',
      type: 'Full-time',
      description: 'Build scalable infrastructure processing millions of market data points per second.'
    },
    {
      id: 5,
      title: 'Content Marketing Manager',
      department: 'Marketing',
      location: 'New York, NY / Remote',
      type: 'Full-time',
      description: 'Create compelling content that educates traders and grows our brand.'
    },
    {
      id: 6,
      title: 'Customer Success Manager',
      department: 'Customer Success',
      location: 'Remote',
      type: 'Full-time',
      description: 'Help Professional tier clients maximize value from TradeFlows Pro.'
    }
  ]

  const benefits = [
    {
      icon: '💰',
      title: 'Competitive Salary & Equity',
      description: 'Top-of-market compensation plus meaningful equity in a fast-growing company.'
    },
    {
      icon: '🏥',
      title: 'Health & Wellness',
      description: 'Premium health, dental, and vision insurance for you and your family. Mental health support included.'
    },
    {
      icon: '🏖️',
      title: 'Unlimited PTO',
      description: 'Take the time you need to recharge. We trust you to manage your time effectively.'
    },
    {
      icon: '🏠',
      title: 'Remote-First Culture',
      description: 'Work from anywhere. We have offices in SF and NYC, but most of our team is remote.'
    },
    {
      icon: '💻',
      title: 'Latest Equipment',
      description: '$3,000 equipment budget. MacBook Pro, external monitors, ergonomic setup—your choice.'
    },
    {
      icon: '📚',
      title: 'Learning Budget',
      description: '$2,000/year for courses, conferences, and books. We invest in your growth.'
    },
    {
      icon: '🍽️',
      title: 'Meals & Snacks',
      description: 'Lunch provided daily in offices. Monthly food stipend for remote employees.'
    },
    {
      icon: '👶',
      title: 'Parental Leave',
      description: '16 weeks paid parental leave for all parents. We support your growing family.'
    },
    {
      icon: '💵',
      title: '401(k) Matching',
      description: 'We match 100% of contributions up to 4% of salary. Plan for your future.'
    }
  ]

  const values = [
    {
      title: 'User Obsession',
      description: 'Every decision starts with "How does this help our users trade better?" We obsess over every detail of the user experience.'
    },
    {
      title: 'Move Fast & Learn',
      description: 'Ship early, learn from users, iterate quickly. Perfect is the enemy of good. Done is better than perfect.'
    },
    {
      title: 'Radical Transparency',
      description: 'We share company metrics, challenges, and decisions openly. No sugarcoating. Everyone deserves context.'
    },
    {
      title: 'Own Your Impact',
      description: 'Take ownership of problems and solutions. Don\'t wait for permission. See something, do something.'
    },
    {
      title: 'Debate & Commit',
      description: 'Disagree openly and respectfully. Once decided, commit fully. No "I told you so" culture.'
    },
    {
      title: 'Default to Action',
      description: 'Bias toward doing, not discussing. Analysis paralysis kills momentum. Make reversible decisions quickly.'
    }
  ]

  return (
    <>
      <Helmet>
        <title>Careers - Join TradeFlows Pro Team</title>
        <meta name="description" content="Join TradeFlows Pro and help democratize professional trading. We're hiring engineers, designers, and traders to build the future of retail trading." />
      </Helmet>

      <div className="careers-page">
        {/* Hero */}
        <section className="careers-hero">
          <div className="container">
            <div className="careers-hero-content">
              <h1>
                Build the Future of <span className="gradient-text">Trading Technology</span>
              </h1>
              <p className="hero-lead">
                Join a team of world-class engineers, traders, and designers building tools that democratize access to professional-grade trading. We're backed by top VCs and growing fast.
              </p>
              <div className="hero-stats">
                <div className="stat">
                  <div className="stat-value">$100M+</div>
                  <div className="stat-label">Funding Raised</div>
                </div>
                <div className="stat">
                  <div className="stat-value">500K+</div>
                  <div className="stat-label">Active Users</div>
                </div>
                <div className="stat">
                  <div className="stat-value">60+</div>
                  <div className="stat-label">Team Members</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why TradeFlows */}
        <section className="why-section section">
          <div className="container">
            <div className="section-header text-center">
              <h2>Why Work at TradeFlows?</h2>
              <p>We're solving a real problem that affects millions of people</p>
            </div>

            <div className="why-content">
              <div className="why-item">
                <div className="why-number">01</div>
                <h3>Mission That Matters</h3>
                <p>
                  For too long, sophisticated trading tools have been available only to institutions. We're changing that. Every feature you build directly helps individual traders compete with Wall Street.
                </p>
              </div>

              <div className="why-item">
                <div className="why-number">02</div>
                <h3>World-Class Team</h3>
                <p>
                  Learn from veterans of Goldman Sachs, Google Brain, Bloomberg, and Citadel. Our team has built trading systems processing billions in volume. You'll level up faster here than anywhere else.
                </p>
              </div>

              <div className="why-item">
                <div className="why-number">03</div>
                <h3>High-Impact Work</h3>
                <p>
                  No bureaucracy, no endless meetings. Ship features that 500,000+ users depend on daily. See your work make a real difference, immediately.
                </p>
              </div>

              <div className="why-item">
                <div className="why-number">04</div>
                <h3>Rapid Growth Opportunity</h3>
                <p>
                  We're growing 300% year-over-year. Early team members have unprecedented opportunities to take on leadership roles and shape the company's direction.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Open Positions */}
        <section className="positions-section section">
          <div className="container">
            <div className="section-header text-center">
              <h2>Open Positions</h2>
              <p>Find your next challenge</p>
            </div>

            <div className="positions-list">
              {openPositions.map((position) => (
                <div key={position.id} className="position-card">
                  <div className="position-header">
                    <div>
                      <h3 className="position-title">{position.title}</h3>
                      <div className="position-meta">
                        <span className="position-department">{position.department}</span>
                        <span className="position-location">{position.location}</span>
                        <span className="position-type">{position.type}</span>
                      </div>
                    </div>
                  </div>

                  <p className="position-description">{position.description}</p>

                  <a href={`mailto:careers@tradeflows.net?subject=Application: ${position.title}`} className="position-apply">
                    Apply Now →
                  </a>
                </div>
              ))}
            </div>

            <div className="positions-footer">
              <p>Don't see a perfect fit?</p>
              <a href="mailto:careers@tradeflows.net" className="btn btn-secondary">
                Send Us Your Resume Anyway
              </a>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="benefits-section section">
          <div className="container">
            <div className="section-header text-center">
              <h2>Benefits & Perks</h2>
              <p>We take care of our team</p>
            </div>

            <div className="benefits-grid">
              {benefits.map((benefit, index) => (
                <div key={index} className="benefit-card">
                  <div className="benefit-icon">{benefit.icon}</div>
                  <h3>{benefit.title}</h3>
                  <p>{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="values-section section">
          <div className="container">
            <div className="section-header text-center">
              <h2>Our Values</h2>
              <p>How we work and what we believe</p>
            </div>

            <div className="values-grid">
              {values.map((value, index) => (
                <div key={index} className="value-card">
                  <h3>{value.title}</h3>
                  <p>{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Application Process */}
        <section className="process-section section">
          <div className="container">
            <div className="section-header text-center">
              <h2>Our Hiring Process</h2>
              <p>What to expect when you apply</p>
            </div>

            <div className="process-steps">
              <div className="process-step">
                <div className="step-number">1</div>
                <h3>Apply</h3>
                <p>Send us your resume and a note about why you're interested. We review every application personally.</p>
              </div>

              <div className="process-arrow">→</div>

              <div className="process-step">
                <div className="step-number">2</div>
                <h3>Screening Call</h3>
                <p>30-minute chat with our recruiting team to discuss your background and what you're looking for.</p>
              </div>

              <div className="process-arrow">→</div>

              <div className="process-step">
                <div className="step-number">3</div>
                <h3>Technical Interview</h3>
                <p>For technical roles: coding challenge or system design. For other roles: role-specific exercise.</p>
              </div>

              <div className="process-arrow">→</div>

              <div className="process-step">
                <div className="step-number">4</div>
                <h3>Team Interviews</h3>
                <p>Meet the team you'd work with. We're assessing fit both ways—make sure TradeFlows is right for you.</p>
              </div>

              <div className="process-arrow">→</div>

              <div className="process-step">
                <div className="step-number">5</div>
                <h3>Offer</h3>
                <p>If it's a match, we move quickly with a competitive offer. Most processes complete in 1-2 weeks.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="careers-cta section">
          <div className="container">
            <div className="cta-box">
              <h2>Ready to Make an Impact?</h2>
              <p>Join us in democratizing professional trading for millions of people worldwide.</p>
              <div className="cta-actions">
                <a href="#positions" className="btn btn-large btn-primary">
                  View Open Positions
                </a>
                <a href="mailto:careers@tradeflows.net" className="btn btn-large btn-secondary">
                  Get in Touch
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
