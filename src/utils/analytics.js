/**
 * Analytics Utility
 * Comprehensive analytics and conversion tracking for TradeFlows Marketing
 *
 * Features:
 * - Google Analytics 4 integration
 * - Event tracking for user actions
 * - Conversion tracking for trials and signups
 * - UTM parameter tracking
 * - Privacy-compliant implementation
 */

// Initialize Google Analytics 4
export const initGA = (measurementId) => {
  if (typeof window === 'undefined') return

  // Load GA4 script
  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`
  document.head.appendChild(script)

  // Initialize dataLayer
  window.dataLayer = window.dataLayer || []
  function gtag() {
    window.dataLayer.push(arguments)
  }
  window.gtag = gtag

  gtag('js', new Date())
  gtag('config', measurementId, {
    send_page_view: false, // We'll send manually for SPA
    cookie_flags: 'SameSite=None;Secure'
  })
}

// Track page views (for React Router)
export const trackPageView = (path, title) => {
  if (typeof window === 'undefined' || !window.gtag) return

  window.gtag('event', 'page_view', {
    page_path: path,
    page_title: title,
    page_location: window.location.href
  })
}

// Track custom events
export const trackEvent = (eventName, eventParams = {}) => {
  if (typeof window === 'undefined' || !window.gtag) return

  window.gtag('event', eventName, eventParams)
}

// Conversion tracking for trial signups
export const trackTrialSignup = (source = 'unknown') => {
  trackEvent('trial_signup', {
    event_category: 'conversion',
    event_label: source,
    value: 1
  })

  // Track as conversion
  window.gtag?.('event', 'conversion', {
    send_to: 'AW-CONVERSION_ID/CONVERSION_LABEL', // Replace with actual conversion ID
    value: 19.99, // Trial value
    currency: 'USD'
  })
}

// Track CTA clicks
export const trackCTAClick = (ctaName, ctaLocation) => {
  trackEvent('cta_click', {
    event_category: 'engagement',
    cta_name: ctaName,
    cta_location: ctaLocation
  })
}

// Track feature exploration
export const trackFeatureView = (featureName) => {
  trackEvent('feature_view', {
    event_category: 'engagement',
    feature_name: featureName
  })
}

// Track comparison page views (vs LuxAlgo)
export const trackComparisonView = () => {
  trackEvent('comparison_view', {
    event_category: 'engagement',
    comparison_type: 'luxalgo'
  })
}

// Track newsletter signups
export const trackNewsletterSignup = (location) => {
  trackEvent('newsletter_signup', {
    event_category: 'conversion',
    signup_location: location
  })
}

// Track pricing plan views
export const trackPricingPlanView = (planName) => {
  trackEvent('pricing_plan_view', {
    event_category: 'engagement',
    plan_name: planName
  })
}

// Track video plays (if any demo videos)
export const trackVideoPlay = (videoName) => {
  trackEvent('video_play', {
    event_category: 'engagement',
    video_name: videoName
  })
}

// Track simulator interactions
export const trackSimulatorInteraction = (action) => {
  trackEvent('simulator_interaction', {
    event_category: 'engagement',
    action: action
  })
}

// Track outbound links
export const trackOutboundLink = (url, linkText) => {
  trackEvent('outbound_link', {
    event_category: 'engagement',
    link_url: url,
    link_text: linkText
  })
}

// Track form submissions
export const trackFormSubmit = (formName, formLocation) => {
  trackEvent('form_submit', {
    event_category: 'engagement',
    form_name: formName,
    form_location: formLocation
  })
}

// Track scroll depth
export const trackScrollDepth = (depth) => {
  trackEvent('scroll_depth', {
    event_category: 'engagement',
    scroll_depth: depth
  })
}

// UTM Parameter Tracking
export const getUTMParams = () => {
  if (typeof window === 'undefined') return {}

  const params = new URLSearchParams(window.location.search)

  return {
    utm_source: params.get('utm_source') || null,
    utm_medium: params.get('utm_medium') || null,
    utm_campaign: params.get('utm_campaign') || null,
    utm_term: params.get('utm_term') || null,
    utm_content: params.get('utm_content') || null
  }
}

// Store UTM params in sessionStorage for attribution
export const storeUTMParams = () => {
  if (typeof window === 'undefined') return

  const utmParams = getUTMParams()

  // Only store if we have at least one UTM parameter
  if (Object.values(utmParams).some(val => val !== null)) {
    sessionStorage.setItem('utm_params', JSON.stringify(utmParams))
  }
}

// Get stored UTM params for conversion attribution
export const getStoredUTMParams = () => {
  if (typeof window === 'undefined') return {}

  try {
    const stored = sessionStorage.getItem('utm_params')
    return stored ? JSON.parse(stored) : {}
  } catch {
    return {}
  }
}

// Track time on page
let pageStartTime = null

export const startPageTimer = () => {
  pageStartTime = Date.now()
}

export const trackTimeOnPage = (pageName) => {
  if (!pageStartTime) return

  const timeSpent = Math.round((Date.now() - pageStartTime) / 1000) // seconds

  trackEvent('time_on_page', {
    event_category: 'engagement',
    page_name: pageName,
    time_seconds: timeSpent
  })

  pageStartTime = null
}

// Enhanced error tracking
export const trackError = (error, errorInfo = {}) => {
  trackEvent('exception', {
    description: error.message || 'Unknown error',
    fatal: false,
    ...errorInfo
  })
}

// Track user engagement score
export const calculateEngagementScore = () => {
  // This could be based on multiple factors:
  // - Pages viewed
  // - Time on site
  // - Features explored
  // - CTAs clicked
  // - Forms submitted

  const pagesViewed = parseInt(sessionStorage.getItem('pages_viewed') || '0')
  const ctasClicked = parseInt(sessionStorage.getItem('ctas_clicked') || '0')
  const featuresViewed = parseInt(sessionStorage.getItem('features_viewed') || '0')

  const score = (pagesViewed * 10) + (ctasClicked * 20) + (featuresViewed * 15)

  return Math.min(score, 100) // Cap at 100
}

export const trackEngagementScore = () => {
  const score = calculateEngagementScore()

  trackEvent('engagement_score', {
    event_category: 'analytics',
    score: score
  })
}

// Increment engagement counters
export const incrementPageView = () => {
  if (typeof window === 'undefined') return
  const current = parseInt(sessionStorage.getItem('pages_viewed') || '0')
  sessionStorage.setItem('pages_viewed', (current + 1).toString())
}

export const incrementCTAClick = () => {
  if (typeof window === 'undefined') return
  const current = parseInt(sessionStorage.getItem('ctas_clicked') || '0')
  sessionStorage.setItem('ctas_clicked', (current + 1).toString())
}

export const incrementFeatureView = () => {
  if (typeof window === 'undefined') return
  const current = parseInt(sessionStorage.getItem('features_viewed') || '0')
  sessionStorage.setItem('features_viewed', (current + 1).toString())
}

// Privacy-compliant analytics opt-out
export const setAnalyticsConsent = (hasConsent) => {
  if (typeof window === 'undefined' || !window.gtag) return

  window.gtag('consent', 'update', {
    analytics_storage: hasConsent ? 'granted' : 'denied'
  })

  localStorage.setItem('analytics_consent', hasConsent ? 'true' : 'false')
}

export const hasAnalyticsConsent = () => {
  if (typeof window === 'undefined') return false
  return localStorage.getItem('analytics_consent') === 'true'
}

// Initialize consent (default to granted for now, should be based on user preference)
export const initConsent = () => {
  if (typeof window === 'undefined' || !window.gtag) return

  window.gtag('consent', 'default', {
    analytics_storage: 'granted',
    ad_storage: 'denied', // Don't use ad storage by default
    wait_for_update: 500
  })
}
