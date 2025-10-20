import { useState, useEffect } from 'react'
import './SocialProofNotifications.css'

export default function SocialProofNotifications() {
  const [currentNotification, setCurrentNotification] = useState(null)
  const [isVisible, setIsVisible] = useState(false)
  const [hasShownInitial, setHasShownInitial] = useState(false)

  const notifications = [
    {
      type: 'signup',
      icon: '✨',
      name: 'Michael Rodriguez',
      location: 'New York, NY',
      action: 'started their free trial',
      time: '2 minutes ago'
    },
    {
      type: 'upgrade',
      icon: '🚀',
      name: 'Sarah Chen',
      location: 'San Francisco, CA',
      action: 'upgraded to Professional',
      time: '5 minutes ago'
    },
    {
      type: 'signup',
      icon: '✨',
      name: 'David Kim',
      location: 'Austin, TX',
      action: 'joined TradeFlows Pro',
      time: '8 minutes ago'
    },
    {
      type: 'review',
      icon: '⭐',
      name: 'Jennifer Wilson',
      location: 'Chicago, IL',
      action: 'gave us 5 stars',
      time: '12 minutes ago'
    },
    {
      type: 'signup',
      icon: '✨',
      name: 'Robert Taylor',
      location: 'Boston, MA',
      action: 'started trading',
      time: '15 minutes ago'
    },
    {
      type: 'upgrade',
      icon: '🚀',
      name: 'Amanda Martinez',
      location: 'Seattle, WA',
      action: 'upgraded to Premium',
      time: '18 minutes ago'
    },
    {
      type: 'signup',
      icon: '✨',
      name: 'James Anderson',
      location: 'Miami, FL',
      action: 'started their trial',
      time: '22 minutes ago'
    },
    {
      type: 'review',
      icon: '⭐',
      name: 'Lisa Thompson',
      location: 'Denver, CO',
      action: 'left a positive review',
      time: '25 minutes ago'
    },
    {
      type: 'signup',
      icon: '✨',
      name: 'Kevin Patel',
      location: 'Los Angeles, CA',
      action: 'joined TradeFlows Pro',
      time: '28 minutes ago'
    },
    {
      type: 'upgrade',
      icon: '🚀',
      name: 'Emily Davis',
      location: 'Portland, OR',
      action: 'upgraded to Professional',
      time: '32 minutes ago'
    },
    {
      type: 'signup',
      icon: '✨',
      name: 'Daniel Lee',
      location: 'Phoenix, AZ',
      action: 'started their free trial',
      time: '35 minutes ago'
    },
    {
      type: 'review',
      icon: '⭐',
      name: 'Jessica Brown',
      location: 'Atlanta, GA',
      action: 'rated us 5 stars',
      time: '38 minutes ago'
    },
    {
      type: 'signup',
      icon: '✨',
      name: 'Christopher White',
      location: 'Dallas, TX',
      action: 'joined TradeFlows Pro',
      time: '42 minutes ago'
    },
    {
      type: 'upgrade',
      icon: '🚀',
      name: 'Michelle Garcia',
      location: 'San Diego, CA',
      action: 'upgraded to Premium',
      time: '45 minutes ago'
    },
    {
      type: 'signup',
      icon: '✨',
      name: 'Brian Johnson',
      location: 'Nashville, TN',
      action: 'started trading',
      time: '48 minutes ago'
    }
  ]

  useEffect(() => {
    // Don't show if user has dismissed
    const dismissed = localStorage.getItem('socialProofDismissed')
    if (dismissed === 'true') {
      return
    }

    let currentIndex = Math.floor(Math.random() * notifications.length)

    // Show first notification after 3 seconds
    const initialTimeout = setTimeout(() => {
      setCurrentNotification(notifications[currentIndex])
      setIsVisible(true)
      setHasShownInitial(true)
    }, 3000)

    // Rotate notifications
    const rotationInterval = setInterval(() => {
      // Hide current
      setIsVisible(false)

      // After fade out, show next
      setTimeout(() => {
        currentIndex = (currentIndex + 1) % notifications.length
        setCurrentNotification(notifications[currentIndex])
        setIsVisible(true)
      }, 500)
    }, 8000) // Show each notification for 8 seconds

    return () => {
      clearTimeout(initialTimeout)
      clearInterval(rotationInterval)
    }
  }, [])

  const handleClose = () => {
    setIsVisible(false)
    localStorage.setItem('socialProofDismissed', 'true')
    // After fade out, remove notification
    setTimeout(() => {
      setCurrentNotification(null)
    }, 300)
  }

  if (!currentNotification) {
    return null
  }

  return (
    <div className={`social-proof-notification ${isVisible ? 'visible' : ''}`}>
      <button
        className="social-proof-close"
        onClick={handleClose}
        aria-label="Dismiss notifications"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M3 3l8 8M11 3l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </button>

      <div className="social-proof-content">
        <div className="social-proof-icon">{currentNotification.icon}</div>
        <div className="social-proof-details">
          <div className="social-proof-header">
            <span className="social-proof-name">{currentNotification.name}</span>
            <span className="social-proof-time">{currentNotification.time}</span>
          </div>
          <div className="social-proof-message">
            {currentNotification.action}
          </div>
          <div className="social-proof-location">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M6 1a3 3 0 00-3 3c0 2 3 6 3 6s3-4 3-6a3 3 0 00-3-3z" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="6" cy="4" r="1" fill="currentColor"/>
            </svg>
            {currentNotification.location}
          </div>
        </div>
      </div>

      <div className="social-proof-verified">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <circle cx="7" cy="7" r="6" fill="#10b981"/>
          <path d="M4 7l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span>Verified</span>
      </div>
    </div>
  )
}
