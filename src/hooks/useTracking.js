/**
 * useTracking Hook
 * Convenient hook for tracking analytics events throughout the app
 */

import { useCallback } from 'react'
import {
  trackCTAClick,
  trackFeatureView,
  trackTrialSignup,
  trackNewsletterSignup,
  trackPricingPlanView,
  trackComparisonView,
  trackFormSubmit,
  trackOutboundLink,
  trackSimulatorInteraction,
  incrementCTAClick,
  incrementFeatureView,
  getStoredUTMParams
} from '../utils/analytics'

export function useTracking() {
  // Track CTA clicks with automatic counter increment
  const trackCTA = useCallback((ctaName, ctaLocation) => {
    trackCTAClick(ctaName, ctaLocation)
    incrementCTAClick()
  }, [])

  // Track feature views with automatic counter increment
  const trackFeature = useCallback((featureName) => {
    trackFeatureView(featureName)
    incrementFeatureView()
  }, [])

  // Track trial signup with UTM attribution
  const trackTrial = useCallback((source) => {
    const utmParams = getStoredUTMParams()
    const attributedSource = utmParams.utm_source || source || 'direct'
    trackTrialSignup(attributedSource)
  }, [])

  // Track newsletter signup
  const trackNewsletter = useCallback((location) => {
    trackNewsletterSignup(location)
  }, [])

  // Track pricing plan view
  const trackPlan = useCallback((planName) => {
    trackPricingPlanView(planName)
  }, [])

  // Track comparison page view
  const trackComparison = useCallback(() => {
    trackComparisonView()
  }, [])

  // Track form submission
  const trackForm = useCallback((formName, formLocation) => {
    trackFormSubmit(formName, formLocation)
  }, [])

  // Track outbound link click
  const trackLink = useCallback((url, linkText) => {
    trackOutboundLink(url, linkText)
  }, [])

  // Track simulator interaction
  const trackSimulator = useCallback((action) => {
    trackSimulatorInteraction(action)
  }, [])

  return {
    trackCTA,
    trackFeature,
    trackTrial,
    trackNewsletter,
    trackPlan,
    trackComparison,
    trackForm,
    trackLink,
    trackSimulator
  }
}
