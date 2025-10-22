import './Testimonials.css'

const testimonials = [
  {
    id: 1,
    name: 'Sarah Mitchell',
    role: 'Day Trader',
    company: 'Independent',
    avatar: '👩‍💼',
    rating: 5,
    text: 'TradeFlows Pro has completely transformed my trading strategy. The AI recommendations are incredibly accurate, and I\'ve seen a 45% increase in my success rate since switching.',
    verified: true
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Portfolio Manager',
    company: 'Chen Capital',
    avatar: '👨‍💼',
    rating: 5,
    text: 'The real-time analytics and multi-timeframe analysis are game-changers. Managing multiple portfolios has never been easier. Highly recommend for professional traders.',
    verified: true
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'Swing Trader',
    company: 'Independent',
    avatar: '👩',
    rating: 5,
    text: 'As someone new to trading, the educational resources and AI insights have been invaluable. I went from complete beginner to confident trader in just 3 months.',
    verified: true
  },
  {
    id: 4,
    name: 'David Thompson',
    role: 'Crypto Trader',
    company: 'Blockchain Ventures',
    avatar: '👨',
    rating: 5,
    text: 'Best trading platform I\'ve used. The crypto integration is seamless, alerts are instant, and the mobile app keeps me connected 24/7. Worth every penny!',
    verified: true
  },
  {
    id: 5,
    name: 'Lisa Anderson',
    role: 'Options Trader',
    company: 'Anderson Trading LLC',
    avatar: '👩‍💻',
    rating: 5,
    text: 'The advanced technical indicators and backtesting features helped me refine my options strategies. My win rate improved by 60% in the first quarter.',
    verified: true
  },
  {
    id: 6,
    name: 'James Park',
    role: 'Algorithmic Trader',
    company: 'QuantEdge Systems',
    avatar: '👨‍💻',
    rating: 5,
    text: 'The API access and automation capabilities are top-notch. I\'ve integrated TradeFlows into my quantitative models, and the results speak for themselves.',
    verified: true
  }
]

export default function Testimonials({ limit, title, subtitle }) {
  const displayedTestimonials = limit ? testimonials.slice(0, limit) : testimonials

  return (
    <section className="testimonials-section">
      <div className="testimonials-container">
        <div className="testimonials-header">
          {title && <h2 className="testimonials-title">{title}</h2>}
          {subtitle && <p className="testimonials-subtitle">{subtitle}</p>}
        </div>

        <div className="testimonials-grid">
          {displayedTestimonials.map((testimonial) => (
            <div key={testimonial.id} className="testimonial-card">
              <div className="testimonial-rating">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="star">⭐</span>
                ))}
              </div>

              <p className="testimonial-text">"{testimonial.text}"</p>

              <div className="testimonial-author">
                <div className="author-avatar">{testimonial.avatar}</div>
                <div className="author-info">
                  <div className="author-name">
                    {testimonial.name}
                    {testimonial.verified && (
                      <span className="verified-badge" title="Verified Customer">
                        ✓
                      </span>
                    )}
                  </div>
                  <div className="author-role">{testimonial.role}</div>
                  <div className="author-company">{testimonial.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="testimonials-stats">
          <div className="stat">
            <div className="stat-number">4.9/5</div>
            <div className="stat-label">Average Rating</div>
          </div>
          <div className="stat">
            <div className="stat-number">12,000+</div>
            <div className="stat-label">Happy Traders</div>
          </div>
          <div className="stat">
            <div className="stat-number">98%</div>
            <div className="stat-label">Would Recommend</div>
          </div>
          <div className="stat">
            <div className="stat-number">$2.5M+</div>
            <div className="stat-label">Total Volume Traded</div>
          </div>
        </div>
      </div>
    </section>
  )
}
