import { useState } from 'react'
import './NewsletterSignup.css'

export default function NewsletterSignup({ inline = false, title, subtitle }) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle, loading, success, error
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!email || !email.includes('@')) {
      setStatus('error')
      setMessage('Please enter a valid email address')
      return
    }

    setStatus('loading')

    // Simulate API call - replace with actual newsletter service integration
    setTimeout(() => {
      try {
        // TODO: Integrate with newsletter service (Mailchimp, SendGrid, etc.)
        console.log('Newsletter signup:', email)

        setStatus('success')
        setMessage('Successfully subscribed! Check your email for confirmation.')
        setEmail('')

        // Reset after 5 seconds
        setTimeout(() => {
          setStatus('idle')
          setMessage('')
        }, 5000)
      } catch (error) {
        setStatus('error')
        setMessage('Something went wrong. Please try again.')
      }
    }, 1000)
  }

  if (inline) {
    return (
      <form onSubmit={handleSubmit} className="newsletter-inline">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === 'loading'}
          className="newsletter-input-inline"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="newsletter-button-inline"
        >
          {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
        </button>
        {message && (
          <p className={`newsletter-message newsletter-message-${status}`}>
            {message}
          </p>
        )}
      </form>
    )
  }

  return (
    <div className="newsletter-signup">
      <div className="newsletter-container">
        <div className="newsletter-content">
          <div className="newsletter-icon">📧</div>
          <h3 className="newsletter-title">
            {title || 'Stay Ahead of the Market'}
          </h3>
          <p className="newsletter-subtitle">
            {subtitle || 'Get exclusive trading insights, AI strategy updates, and platform news delivered to your inbox weekly.'}
          </p>

          <form onSubmit={handleSubmit} className="newsletter-form">
            <div className="newsletter-input-group">
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status === 'loading'}
                className="newsletter-input"
                aria-label="Email address"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="newsletter-button"
              >
                {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
              </button>
            </div>

            {message && (
              <p className={`newsletter-message newsletter-message-${status}`}>
                {status === 'success' && '✓ '}
                {status === 'error' && '✗ '}
                {message}
              </p>
            )}
          </form>

          <p className="newsletter-privacy">
            We respect your privacy. Unsubscribe anytime. By subscribing, you agree to our{' '}
            <a href="/privacy">Privacy Policy</a>.
          </p>
        </div>

        <div className="newsletter-benefits">
          <div className="newsletter-benefit">
            <span className="benefit-icon">📊</span>
            <span className="benefit-text">Weekly market insights</span>
          </div>
          <div className="newsletter-benefit">
            <span className="benefit-icon">🤖</span>
            <span className="benefit-text">AI strategy updates</span>
          </div>
          <div className="newsletter-benefit">
            <span className="benefit-icon">🎯</span>
            <span className="benefit-text">Trading tips & tricks</span>
          </div>
          <div className="newsletter-benefit">
            <span className="benefit-icon">🎁</span>
            <span className="benefit-text">Exclusive offers</span>
          </div>
        </div>
      </div>
    </div>
  )
}
