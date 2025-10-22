import { createContext, useContext, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import {
  initGA,
  initConsent,
  trackPageView,
  storeUTMParams,
  startPageTimer,
  trackTimeOnPage,
  incrementPageView
} from '../utils/analytics'

const AnalyticsContext = createContext({})

// Google Analytics 4 Measurement ID
// Replace with actual GA4 ID when available
const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX'

export function AnalyticsProvider({ children }) {
  const location = useLocation()

  // Initialize GA on mount
  useEffect(() => {
    // Initialize consent management
    initConsent()

    // Initialize Google Analytics
    initGA(GA_MEASUREMENT_ID)

    // Store UTM parameters from initial landing
    storeUTMParams()
  }, [])

  // Track page views on route change
  useEffect(() => {
    // Get page title from document or generate from path
    const pageTitle = document.title || location.pathname

    // Track the page view
    trackPageView(location.pathname, pageTitle)

    // Increment page view counter
    incrementPageView()

    // Start timer for time on page tracking
    startPageTimer()

    // Track time on page when leaving (cleanup)
    return () => {
      trackTimeOnPage(pageTitle)
    }
  }, [location])

  return (
    <AnalyticsContext.Provider value={{}}>
      {children}
    </AnalyticsContext.Provider>
  )
}

export function useAnalytics() {
  return useContext(AnalyticsContext)
}
