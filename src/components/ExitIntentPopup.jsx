import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './ExitIntentPopup.css'

export default function ExitIntentPopup() {
  const [isVisible, setIsVisible] = useState(false)
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [hasShown, setHasShown] = useState(false)

  useEffect(() => {
    // Check if popup has been shown recently
    const lastShown = localStorage.getItem('exitIntentLastShown')
    const dismissedUntil = localStorage.getItem('exitIntentDismissedUntil')
    const currentTime = Date.now()

    // Don't show if dismissed within last 3 days
    if (dismissedUntil && currentTime < parseInt(dismissedUntil)) {
      return
    }

    // Don't show if already shown in last 24 hours
    if (lastShown && currentTime - parseInt(lastShown) < 24 * 60 * 60 * 1000) {
      return
    }

    // Don't show if user already signed up
    if (localStorage.getItem('exitIntentEmailSubmitted')) {
      return
    }

    const handleMouseLeave = (e) => {
      // Detect when mouse leaves from the top of the page (towards browser controls)
      if (e.clientY <= 0 && !hasShown) {
        setIsVisible(true)
        setHasShown(true)
        localStorage.setItem('exitIntentLastShown', currentTime.toString())
      }
    }

    // Add delay before enabling exit intent (give user time to browse)
    const timer = setTimeout(() => {
      document.addEventListener('mouseleave', handleMouseLeave)
    }, 5000) // Wait 5 seconds before enabling

    return () => {
      clearTimeout(timer)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [hasShown])

  const handleClose = () => {
    setIsVisible(false)
    // Dismiss for 3 days
    const threeDaysFromNow = Date.now() + (3 * 24 * 60 * 60 * 1000)
    localStorage.setItem('exitIntentDismissedUntil', threeDaysFromNow.toString())
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // In a real implementation, this would send to your email service
    console.log('Exit intent email submitted:', email)

    // Store that user submitted email
    localStorage.setItem('exitIntentEmailSubmitted', 'true')
    localStorage.setItem('exitIntentEmail', email)

    setIsSubmitted(true)

    // Close popup after 3 seconds
    setTimeout(() => {
      setIsVisible(false)
    }, 3000)
  }

  const handleTrialClick = () => {
    localStorage.setItem('exitIntentEmailSubmitted', 'true')
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div className="exit-intent-overlay" onClick={handleClose}>
      <div className="exit-intent-popup" onClick={(e) => e.stopPropagation()}>
        <button className="exit-intent-close" onClick={handleClose} aria-label="Close">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>

        {!isSubmitted ? (
          <div className="exit-intent-content">
            <div className="exit-intent-icon">
              <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                <circle cx="32" cy="32" r="30" stroke="url(#exitGrad)" strokeWidth="3"/>
                <path d="M32 20v16m0 0l8-8m-8 8l-8-8" stroke="url(#exitGrad)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                <defs>
                  <linearGradient id="exitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3b9eff"/>
                    <stop offset="100%" stopColor="#10b981"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>

            <h2>Wait! Don't Miss Out 🎁</h2>
            <p className="exit-intent-subtitle">
              Before you go, get exclusive access to our premium trading guides and market insights.
            </p>

            <div className="exit-intent-benefits">
              <div className="benefit-item">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M7 10l2 2 4-4m5 2a8 8 0 11-16 0 8 8 0 0116 0z" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Weekly AI trading strategy insights</span>
              </div>
              <div className="benefit-item">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M7 10l2 2 4-4m5 2a8 8 0 11-16 0 8 8 0 0116 0z" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Exclusive market analysis reports</span>
              </div>
              <div className="benefit-item">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M7 10l2 2 4-4m5 2a8 8 0 11-16 0 8 8 0 0116 0z" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Early access to new features</span>
              </div>
              <div className="benefit-item">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M7 10l2 2 4-4m5 2a8 8 0 11-16 0 8 8 0 0116 0z" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Special promotional offers</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="exit-intent-form">
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="exit-intent-input"
              />
              <button type="submit" className="exit-intent-submit">
                Get Free Access
              </button>
            </form>

            <div className="exit-intent-divider">
              <span>OR</span>
            </div>

            <a
              href="https://app.tradeflows.net?signup=true&utm_source=website&utm_medium=exit_intent&utm_campaign=trial"
              className="exit-intent-trial-btn"
              onClick={handleTrialClick}
            >
              Start Your 7-Day Free Trial
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>

            <p className="exit-intent-privacy">
              🔒 We respect your privacy. Unsubscribe anytime. No spam, ever.
            </p>
          </div>
        ) : (
          <div className="exit-intent-success">
            <div className="success-icon">
              <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                <circle cx="32" cy="32" r="30" fill="url(#successGrad)"/>
                <path d="M20 32l8 8 16-16" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                <defs>
                  <linearGradient id="successGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#10b981"/>
                    <stop offset="100%" stopColor="#059669"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <h2>You're All Set! 🎉</h2>
            <p>
              Check your inbox for your first exclusive trading insight. We've also sent you a special welcome offer.
            </p>
            <div className="success-cta">
              <Link to="/features" onClick={handleClose}>
                Explore Features
              </Link>
              <span>or</span>
              <Link to="/pricing" onClick={handleClose}>
                View Pricing
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
