import { useState, useEffect, useRef } from 'react'
import { generateNotification, getRandomDelay, getDisplayDuration } from '../data/socialProofData'
import { trackEvent } from '../utils/analytics'
import './SocialProofNotifications.css'

export default function SocialProofNotifications() {
  const [currentNotification, setCurrentNotification] = useState(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const nextTimeoutRef = useRef(null)
  const hideTimeoutRef = useRef(null)
  const shownNotificationsRef = useRef(new Set())

  // Show next notification
  const showNextNotification = () => {
    if (isPaused) return

    // Generate new notification
    const notification = generateNotification()

    // Make sure we haven't shown this exact combination recently
    const notificationKey = `${notification.name}-${notification.action}`
    if (shownNotificationsRef.current.has(notificationKey)) {
      // Try again with a new notification
      setTimeout(showNextNotification, 100)
      return
    }

    // Track this notification
    shownNotificationsRef.current.add(notificationKey)

    // Limit the set size to prevent memory issues
    if (shownNotificationsRef.current.size > 100) {
      const firstKey = shownNotificationsRef.current.values().next().value
      shownNotificationsRef.current.delete(firstKey)
    }

    // Show notification
    setCurrentNotification(notification)
    setIsVisible(true)

    // Track in analytics
    trackEvent('social_proof_shown', {
      event_category: 'engagement',
      event_label: notification.type,
      non_interaction: true
    })

    // Schedule hide
    const displayDuration = getDisplayDuration(notification.type)
    hideTimeoutRef.current = setTimeout(() => {
      setIsVisible(false)

      // Schedule next notification after fade out
      setTimeout(() => {
        const nextDelay = getRandomDelay()
        nextTimeoutRef.current = setTimeout(showNextNotification, nextDelay)
      }, 500) // Wait for fade out
    }, displayDuration)
  }

  useEffect(() => {
    // Check if user has dismissed
    const dismissed = localStorage.getItem('socialProofDismissed')
    if (dismissed === 'true') {
      return
    }

    // Check if user has seen too many (max 10 per session)
    const sessionCount = sessionStorage.getItem('socialProofCount')
    if (sessionCount && parseInt(sessionCount) >= 10) {
      return
    }

    // Show first notification after delay (8-15 seconds to not be intrusive)
    const initialDelay = (Math.random() * 7 + 8) * 1000
    nextTimeoutRef.current = setTimeout(showNextNotification, initialDelay)

    return () => {
      if (nextTimeoutRef.current) clearTimeout(nextTimeoutRef.current)
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current)
    }
  }, [isPaused])

  const handleClose = () => {
    setIsVisible(false)
    localStorage.setItem('socialProofDismissed', 'true')

    // Clear timers
    if (nextTimeoutRef.current) clearTimeout(nextTimeoutRef.current)
    if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current)

    // Track dismissal
    trackEvent('social_proof_dismissed', {
      event_category: 'engagement',
      event_label: currentNotification?.type || 'unknown'
    })

    // After fade out, remove notification
    setTimeout(() => {
      setCurrentNotification(null)
    }, 300)
  }

  const handleMouseEnter = () => {
    setIsPaused(true)
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current)
    }
  }

  const handleMouseLeave = () => {
    setIsPaused(false)

    if (currentNotification && isVisible) {
      // Resume the hide timer
      const displayDuration = getDisplayDuration(currentNotification.type)
      hideTimeoutRef.current = setTimeout(() => {
        setIsVisible(false)

        setTimeout(() => {
          const nextDelay = getRandomDelay()
          nextTimeoutRef.current = setTimeout(showNextNotification, nextDelay)
        }, 500)
      }, displayDuration / 2) // Give some grace time
    }
  }

  const handleClick = () => {
    if (!currentNotification) return

    // Track click
    trackEvent('social_proof_clicked', {
      event_category: 'engagement',
      event_label: currentNotification.type,
      value: 1
    })

    // Increment session counter
    const count = parseInt(sessionStorage.getItem('socialProofCount') || '0')
    sessionStorage.setItem('socialProofCount', (count + 1).toString())
  }

  if (!currentNotification) {
    return null
  }

  return (
    <div
      className={`social-proof-notification ${isVisible ? 'visible' : ''} ${isPaused ? 'paused' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      <button
        className="social-proof-close"
        onClick={(e) => {
          e.stopPropagation()
          handleClose()
        }}
        aria-label="Dismiss notifications"
        type="button"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path d="M3 3l8 8M11 3l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </button>

      <div className="social-proof-content">
        <div className="social-proof-icon" aria-hidden="true">{currentNotification.icon}</div>
        <div className="social-proof-details">
          <div className="social-proof-header">
            <span className="social-proof-name">{currentNotification.name}</span>
            <span className="social-proof-time">{currentNotification.time}</span>
          </div>
          <div className="social-proof-message">
            {currentNotification.action}
          </div>
          <div className="social-proof-location">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M6 1a3 3 0 00-3 3c0 2 3 6 3 6s3-4 3-6a3 3 0 00-3-3z" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="6" cy="4" r="1" fill="currentColor"/>
            </svg>
            {currentNotification.location}
          </div>
        </div>
      </div>

      <div className="social-proof-verified">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <circle cx="7" cy="7" r="6" fill="#10b981"/>
          <path d="M4 7l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span>Verified</span>
      </div>
    </div>
  )
}
