import { useState, useId } from 'react'
import { trackNewsletterSignup } from '../utils/analytics'
import { useScreenReaderAnnounce } from '../hooks/useKeyboardNavigation'
import './NewsletterSignup.css'

export default function NewsletterSignup({ inline = false, title, subtitle, location = 'unknown' }) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle, loading, success, error
  const [message, setMessage] = useState('')
  const inputId = useId()
  const messageId = useId()
  const announce = useScreenReaderAnnounce()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!email || !email.includes('@')) {
      const errorMsg = 'Please enter a valid email address'
      setStatus('error')
      setMessage(errorMsg)
      announce(errorMsg, 'assertive')
      return
    }

    setStatus('loading')
    announce('Subscribing to newsletter', 'polite')

    // Simulate API call - replace with actual newsletter service integration
    setTimeout(() => {
      try {
        // TODO: Integrate with newsletter service (Mailchimp, SendGrid, etc.)
        console.log('Newsletter signup:', email)

        // Track newsletter signup in analytics
        trackNewsletterSignup(location || (inline ? 'inline' : 'homepage'))

        const successMsg = 'Successfully subscribed! Check your email for confirmation.'
        setStatus('success')
        setMessage(successMsg)
        setEmail('')
        announce(successMsg, 'polite')

        // Reset after 5 seconds
        setTimeout(() => {
          setStatus('idle')
          setMessage('')
        }, 5000)
      } catch (error) {
        const errorMsg = 'Something went wrong. Please try again.'
        setStatus('error')
        setMessage(errorMsg)
        announce(errorMsg, 'assertive')
      }
    }, 1000)
  }

  if (inline) {
    return (
      <form onSubmit={handleSubmit} className="newsletter-inline" aria-label="Newsletter subscription">
        <label htmlFor={`${inputId}-inline`} className="sr-only">
          Email address for newsletter
        </label>
        <input
          id={`${inputId}-inline`}
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === 'loading'}
          className="newsletter-input-inline"
          aria-required="true"
          aria-invalid={status === 'error'}
          aria-describedby={message ? `${messageId}-inline` : undefined}
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="newsletter-button-inline"
          aria-label={status === 'loading' ? 'Subscribing to newsletter' : 'Subscribe to newsletter'}
        >
          {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
        </button>
        {message && (
          <p
            id={`${messageId}-inline`}
            className={`newsletter-message newsletter-message-${status}`}
            role={status === 'error' ? 'alert' : 'status'}
            aria-live={status === 'error' ? 'assertive' : 'polite'}
          >
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

          <form onSubmit={handleSubmit} className="newsletter-form" aria-label="Newsletter subscription">
            <div className="newsletter-input-group">
              <label htmlFor={inputId} className="sr-only">
                Email address for newsletter
              </label>
              <input
                id={inputId}
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status === 'loading'}
                className="newsletter-input"
                aria-required="true"
                aria-invalid={status === 'error'}
                aria-describedby={message ? messageId : undefined}
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="newsletter-button"
                aria-label={status === 'loading' ? 'Subscribing to newsletter' : 'Subscribe to newsletter'}
              >
                {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
              </button>
            </div>

            {message && (
              <p
                id={messageId}
                className={`newsletter-message newsletter-message-${status}`}
                role={status === 'error' ? 'alert' : 'status'}
                aria-live={status === 'error' ? 'assertive' : 'polite'}
              >
                {status === 'success' && <span aria-hidden="true">✓ </span>}
                {status === 'error' && <span aria-hidden="true">✗ </span>}
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
