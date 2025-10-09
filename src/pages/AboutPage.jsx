import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import './AboutPage.css'

export default function AboutPage() {
  const teamMembers = [
    {
      name: 'Sarah Mitchell',
      role: 'CEO & Co-Founder',
      bio: '15 years in fintech. Former VP at Goldman Sachs. MIT Computer Science.',
      avatar: 'SM',
      social: {
        linkedin: '#',
        twitter: '#'
      }
    },
    {
      name: 'David Chen',
      role: 'CTO & Co-Founder',
      bio: 'AI/ML expert. Ex-Google Brain. Stanford PhD in Machine Learning.',
      avatar: 'DC',
      social: {
        linkedin: '#',
        twitter: '#'
      }
    },
    {
      name: 'Marcus Rodriguez',
      role: 'Head of Trading',
      bio: 'Professional trader with 20+ years. Former hedge fund manager at Citadel.',
      avatar: 'MR',
      social: {
        linkedin: '#',
        twitter: '#'
      }
    },
    {
      name: 'Emily Zhang',
      role: 'Head of Product',
      bio: 'Product leader from Bloomberg Terminal. Carnegie Mellon HCI.',
      avatar: 'EZ',
      social: {
        linkedin: '#',
        twitter: '#'
      }
    },
    {
      name: 'James Patterson',
      role: 'Head of Engineering',
      bio: 'Infrastructure expert. Built trading systems at Interactive Brokers.',
      avatar: 'JP',
      social: {
        linkedin: '#',
        twitter: '#'
      }
    },
    {
      name: 'Priya Sharma',
      role: 'Head of AI Research',
      bio: 'PhD in Quantitative Finance. Published researcher in algorithmic trading.',
      avatar: 'PS',
      social: {
        linkedin: '#',
        twitter: '#'
      }
    }
  ]

  const investors = [
    'Sequoia Capital',
    'Andreessen Horowitz',
    'Y Combinator',
    'Accel Partners',
    'Lightspeed Venture'
  ]

  const milestones = [
    {
      year: '2019',
      title: 'Company Founded',
      description: 'TradeFlows was founded by Sarah and David with a vision to democratize professional trading tools.'
    },
    {
      year: '2020',
      title: 'Seed Funding',
      description: 'Raised $5M in seed funding led by Y Combinator. Launched beta version with 100 alpha testers.'
    },
    {
      year: '2021',
      title: 'Series A & Launch',
      description: 'Secured $25M Series A. Public launch with 10,000 users in first month. AI trading engine deployed.'
    },
    {
      year: '2022',
      title: 'Rapid Growth',
      description: 'Reached 100,000 users. Expanded to crypto and forex markets. Launched mobile apps for iOS and Android.'
    },
    {
      year: '2023',
      title: 'Series B & Enterprise',
      description: '$75M Series B led by Sequoia. Launched Professional tier and API for institutional clients.'
    },
    {
      year: '2024',
      title: 'Market Leader',
      description: '500,000+ active users. Processing $2.5B+ monthly trading volume. Expanding to international markets.'
    }
  ]

  const values = [
    {
      icon: '🎯',
      title: 'User-First Design',
      description: 'Every feature we build starts with understanding traders\' real needs. We obsess over user experience and continuously iterate based on feedback.'
    },
    {
      icon: '🔬',
      title: 'Data-Driven Innovation',
      description: 'Our AI and ML models are built on rigorous research and tested against decades of market data. We believe in science, not hunches.'
    },
    {
      icon: '🤝',
      title: 'Transparency & Trust',
      description: 'We\'re upfront about what our platform can and cannot do. No hidden fees, no misleading claims. Your trust is our most valuable asset.'
    },
    {
      icon: '⚡',
      title: 'Speed & Reliability',
      description: 'In trading, milliseconds matter. We\'ve built infrastructure that delivers institutional-grade speed and 99.99% uptime.'
    },
    {
      icon: '🌍',
      title: 'Accessibility for All',
      description: 'Professional trading tools shouldn\'t require a hedge fund budget. We\'re making sophisticated technology accessible to individual traders.'
    },
    {
      icon: '📚',
      title: 'Education & Community',
      description: 'We empower traders through comprehensive education, transparent research, and a supportive community of peers.'
    }
  ]

  return (
    <>
      <Helmet>
        <title>About Us - TradeFlows Pro | Our Mission & Team</title>
        <meta name="description" content="Learn about TradeFlows Pro's mission to democratize professional trading. Meet our team of fintech veterans, AI experts, and professional traders." />
      </Helmet>

      <div className="about-page">
        {/* Hero */}
        <section className="about-hero">
          <div className="container">
            <div className="about-hero-content">
              <h1>
                Empowering Traders with <span className="gradient-text">AI-Powered Intelligence</span>
              </h1>
              <p className="hero-lead">
                We're on a mission to democratize professional trading tools. TradeFlows Pro combines cutting-edge AI, real-time market data, and institutional-grade analytics to help individual traders compete with Wall Street.
              </p>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="mission-section section">
          <div className="container">
            <div className="mission-grid">
              <div className="mission-card">
                <div className="mission-icon">🚀</div>
                <h2>Our Mission</h2>
                <p>
                  To level the playing field in financial markets by providing individual traders with the same sophisticated tools, data, and AI-powered insights that were previously available only to hedge funds and institutional traders.
                </p>
              </div>

              <div className="mission-card">
                <div className="mission-icon">🔮</div>
                <h2>Our Vision</h2>
                <p>
                  A world where anyone with discipline and dedication can build wealth through intelligent trading, supported by technology that amplifies their skills rather than replacing their judgment.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="story-section section">
          <div className="container">
            <div className="story-content">
              <h2>Our Story</h2>
              <div className="story-text">
                <p>
                  TradeFlows was born from frustration. In 2019, our founders Sarah Mitchell and David Chen were working at top-tier financial institutions—Sarah at Goldman Sachs and David at Google Brain. They watched as retail traders struggled with outdated platforms while institutions had access to cutting-edge AI and real-time data.
                </p>
                <p>
                  "Why should professional-grade trading tools cost $20,000 per month?" Sarah asked. David, having built machine learning systems that powered billions in algorithmic trading, knew the technology could be accessible to everyone.
                </p>
                <p>
                  They left their six-figure jobs to build TradeFlows Pro. Starting in a small San Francisco apartment, they assembled a team of engineers, traders, and data scientists who shared their vision. After 18 months of development and testing with 100 alpha users, they launched publicly in 2021.
                </p>
                <p>
                  The response was overwhelming. Traders who had spent years mastering technical analysis found our AI recommendations complemented their expertise. Beginners appreciated the educational content and transparent reasoning behind each trade idea.
                </p>
                <p>
                  Today, TradeFlows Pro serves over 500,000 traders worldwide, processing $2.5+ billion in monthly trading volume. We've raised $100M+ from top-tier VCs who believe in our mission. But we're just getting started.
                </p>
                <p>
                  Every day, our team works to make TradeFlows Pro faster, smarter, and more accessible. We're not just building software—we're building a movement to democratize financial opportunity.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="timeline-section section">
          <div className="container">
            <div className="section-header text-center">
              <h2>Our Journey</h2>
              <p>From startup to market leader</p>
            </div>

            <div className="timeline">
              {milestones.map((milestone, index) => (
                <div key={index} className="timeline-item">
                  <div className="timeline-marker"></div>
                  <div className="timeline-content">
                    <div className="timeline-year">{milestone.year}</div>
                    <h3 className="timeline-title">{milestone.title}</h3>
                    <p className="timeline-description">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="team-section section">
          <div className="container">
            <div className="section-header text-center">
              <h2>Meet Our Leadership Team</h2>
              <p>World-class experts in finance, technology, and AI</p>
            </div>

            <div className="team-grid">
              {teamMembers.map((member, index) => (
                <div key={index} className="team-member">
                  <div className="member-avatar">{member.avatar}</div>
                  <h3 className="member-name">{member.name}</h3>
                  <div className="member-role">{member.role}</div>
                  <p className="member-bio">{member.bio}</p>
                  <div className="member-social">
                    <a href={member.social.linkedin} className="social-link">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M16 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM7 15H5V9h2v6zm-1-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm9 7h-2v-3c0-1.1-.9-2-2-2s-2 .9-2 2v3H9V9h2v1c.45-.6 1.2-1 2-1 1.65 0 3 1.35 3 3v3z" fill="currentColor"/>
                      </svg>
                    </a>
                    <a href={member.social.twitter} className="social-link">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M18 4.5c-.6.3-1.2.4-1.9.5.7-.4 1.2-1 1.4-1.8-.6.4-1.3.6-2.1.8-.6-.6-1.5-1-2.4-1-1.7 0-3.2 1.5-3.2 3.3 0 .3 0 .5.1.7-2.7-.1-5.2-1.4-6.8-3.4-.3.5-.4 1-.4 1.7 0 1.1.6 2.1 1.5 2.7-.5 0-1-.2-1.5-.4 0 1.6 1.1 2.9 2.6 3.2-.3.1-.6.1-.9.1-.2 0-.4 0-.6-.1.4 1.3 1.6 2.3 3.1 2.3-1.1.9-2.5 1.4-4.1 1.4H2c1.5.9 3.2 1.5 5 1.5 6 0 9.3-5 9.3-9.3v-.4c.7-.5 1.3-1.1 1.7-1.8z" fill="currentColor"/>
                      </svg>
                    </a>
                  </div>
                </div>
              ))}
            </div>

            <div className="join-team">
              <h3>Want to Join Our Team?</h3>
              <p>We're always looking for talented people who share our mission</p>
              <Link to="/careers" className="btn btn-primary">
                View Open Positions
              </Link>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="values-section section">
          <div className="container">
            <div className="section-header text-center">
              <h2>Our Values</h2>
              <p>The principles that guide everything we do</p>
            </div>

            <div className="values-grid">
              {values.map((value, index) => (
                <div key={index} className="value-card">
                  <div className="value-icon">{value.icon}</div>
                  <h3>{value.title}</h3>
                  <p>{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Investors */}
        <section className="investors-section section">
          <div className="container">
            <div className="section-header text-center">
              <h2>Backed by the Best</h2>
              <p>Trusted by world-class investors who believe in our vision</p>
            </div>

            <div className="investors-grid">
              {investors.map((investor, index) => (
                <div key={index} className="investor-logo">
                  {investor}
                </div>
              ))}
            </div>

            <div className="funding-stats">
              <div className="funding-stat">
                <div className="stat-value">$100M+</div>
                <div className="stat-label">Total Funding Raised</div>
              </div>
              <div className="funding-stat">
                <div className="stat-value">Series B</div>
                <div className="stat-label">Latest Funding Round</div>
              </div>
              <div className="funding-stat">
                <div className="stat-value">2024</div>
                <div className="stat-label">Profitable Year</div>
              </div>
            </div>
          </div>
        </section>

        {/* Press */}
        <section className="press-section section">
          <div className="container">
            <div className="section-header text-center">
              <h2>In the News</h2>
              <p>What people are saying about us</p>
            </div>

            <div className="press-grid">
              <div className="press-item">
                <div className="press-quote">
                  "TradeFlows is democratizing access to Wall Street-grade trading tools. Their AI-powered platform is a game-changer for retail traders."
                </div>
                <div className="press-source">TechCrunch</div>
              </div>

              <div className="press-item">
                <div className="press-quote">
                  "The future of retail trading is here. TradeFlows Pro combines institutional-grade infrastructure with a user-friendly interface."
                </div>
                <div className="press-source">Bloomberg</div>
              </div>

              <div className="press-item">
                <div className="press-quote">
                  "TradeFlows' AI recommendations have an impressive track record. This is the real deal, not another get-rich-quick scheme."
                </div>
                <div className="press-source">Forbes</div>
              </div>

              <div className="press-item">
                <div className="press-quote">
                  "Finally, a trading platform that treats individual traders with the same respect as institutional clients. TradeFlows is leading the fintech revolution."
                </div>
                <div className="press-source">The Wall Street Journal</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="about-cta section">
          <div className="container">
            <div className="cta-box">
              <h2>Join the TradeFlows Community</h2>
              <p>Start trading smarter with AI-powered insights and professional-grade tools</p>
              <div className="cta-actions">
                <a href="https://app.tradeflows.net?signup=true" className="btn btn-large btn-primary">
                  Start Free Trial
                </a>
                <Link to="/contact" className="btn btn-large btn-secondary">
                  Get in Touch
                </Link>
              </div>
              <div className="cta-stats">
                <span>✓ 500,000+ active traders</span>
                <span>✓ $2.5B+ monthly volume</span>
                <span>✓ 4.9/5 user rating</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
