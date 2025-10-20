/**
 * Web Vitals Performance Monitoring
 * Tracks Core Web Vitals: LCP, FID, CLS, TTFB, FCP, INP
 */

// Report web vitals to analytics
const reportWebVital = (metric) => {
  // Log to console in development
  if (import.meta.env.DEV) {
    console.log(`[Web Vitals] ${metric.name}:`, metric.value, metric)
  }

  // In production, send to analytics service
  // Examples: Google Analytics, custom analytics endpoint
  if (import.meta.env.PROD) {
    // Send to Google Analytics if available
    if (window.gtag) {
      window.gtag('event', metric.name, {
        event_category: 'Web Vitals',
        event_label: metric.id,
        value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
        non_interaction: true,
      })
    }

    // Send to custom analytics endpoint (optional)
    // fetch('/api/analytics/vitals', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(metric)
    // }).catch(console.error)
  }
}

// Get rating based on metric thresholds
const getRating = (name, value) => {
  const thresholds = {
    LCP: { good: 2500, needsImprovement: 4000 },
    FID: { good: 100, needsImprovement: 300 },
    CLS: { good: 0.1, needsImprovement: 0.25 },
    TTFB: { good: 800, needsImprovement: 1800 },
    FCP: { good: 1800, needsImprovement: 3000 },
    INP: { good: 200, needsImprovement: 500 }
  }

  const threshold = thresholds[name]
  if (!threshold) return 'unknown'

  if (value <= threshold.good) return 'good'
  if (value <= threshold.needsImprovement) return 'needs-improvement'
  return 'poor'
}

// Largest Contentful Paint (LCP)
const getLCP = (onReport) => {
  if (typeof window === 'undefined' || !('PerformanceObserver' in window)) return

  const observer = new PerformanceObserver((list) => {
    const entries = list.getEntries()
    const lastEntry = entries[entries.length - 1]

    const metric = {
      name: 'LCP',
      value: lastEntry.renderTime || lastEntry.loadTime,
      rating: getRating('LCP', lastEntry.renderTime || lastEntry.loadTime),
      id: `v3-${Date.now()}-${Math.floor(Math.random() * 1000000)}`,
      entries: [lastEntry]
    }

    onReport(metric)
  })

  try {
    observer.observe({ type: 'largest-contentful-paint', buffered: true })
  } catch (e) {
    // LCP not supported
  }
}

// First Input Delay (FID)
const getFID = (onReport) => {
  if (typeof window === 'undefined' || !('PerformanceObserver' in window)) return

  const observer = new PerformanceObserver((list) => {
    const entries = list.getEntries()
    entries.forEach((entry) => {
      const metric = {
        name: 'FID',
        value: entry.processingStart - entry.startTime,
        rating: getRating('FID', entry.processingStart - entry.startTime),
        id: `v3-${Date.now()}-${Math.floor(Math.random() * 1000000)}`,
        entries: [entry]
      }

      onReport(metric)
    })
  })

  try {
    observer.observe({ type: 'first-input', buffered: true })
  } catch (e) {
    // FID not supported
  }
}

// Cumulative Layout Shift (CLS)
const getCLS = (onReport) => {
  if (typeof window === 'undefined' || !('PerformanceObserver' in window)) return

  let clsValue = 0
  let clsEntries = []

  const observer = new PerformanceObserver((list) => {
    const entries = list.getEntries()

    entries.forEach((entry) => {
      if (!entry.hadRecentInput) {
        clsValue += entry.value
        clsEntries.push(entry)
      }
    })

    const metric = {
      name: 'CLS',
      value: clsValue,
      rating: getRating('CLS', clsValue),
      id: `v3-${Date.now()}-${Math.floor(Math.random() * 1000000)}`,
      entries: clsEntries
    }

    onReport(metric)
  })

  try {
    observer.observe({ type: 'layout-shift', buffered: true })
  } catch (e) {
    // CLS not supported
  }
}

// Time to First Byte (TTFB)
const getTTFB = (onReport) => {
  if (typeof window === 'undefined' || !window.performance) return

  const navigationEntry = performance.getEntriesByType('navigation')[0]
  if (!navigationEntry) return

  const ttfb = navigationEntry.responseStart - navigationEntry.requestStart

  const metric = {
    name: 'TTFB',
    value: ttfb,
    rating: getRating('TTFB', ttfb),
    id: `v3-${Date.now()}-${Math.floor(Math.random() * 1000000)}`,
    entries: [navigationEntry]
  }

  onReport(metric)
}

// First Contentful Paint (FCP)
const getFCP = (onReport) => {
  if (typeof window === 'undefined' || !('PerformanceObserver' in window)) return

  const observer = new PerformanceObserver((list) => {
    const entries = list.getEntries()
    entries.forEach((entry) => {
      if (entry.name === 'first-contentful-paint') {
        const metric = {
          name: 'FCP',
          value: entry.startTime,
          rating: getRating('FCP', entry.startTime),
          id: `v3-${Date.now()}-${Math.floor(Math.random() * 1000000)}`,
          entries: [entry]
        }

        onReport(metric)
        observer.disconnect()
      }
    })
  })

  try {
    observer.observe({ type: 'paint', buffered: true })
  } catch (e) {
    // FCP not supported
  }
}

// Interaction to Next Paint (INP)
const getINP = (onReport) => {
  if (typeof window === 'undefined' || !('PerformanceObserver' in window)) return

  let maxDuration = 0
  let entries = []

  const observer = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
      if (entry.duration > maxDuration) {
        maxDuration = entry.duration
        entries.push(entry)

        const metric = {
          name: 'INP',
          value: maxDuration,
          rating: getRating('INP', maxDuration),
          id: `v3-${Date.now()}-${Math.floor(Math.random() * 1000000)}`,
          entries: entries
        }

        onReport(metric)
      }
    })
  })

  try {
    observer.observe({ type: 'event', buffered: true, durationThreshold: 16 })
  } catch (e) {
    // INP not supported
  }
}

// Initialize all web vitals monitoring
export function initWebVitals() {
  // Check if browser supports required APIs
  if (typeof window === 'undefined') return

  // Track all Core Web Vitals
  getLCP(reportWebVital)
  getFID(reportWebVital)
  getCLS(reportWebVital)
  getTTFB(reportWebVital)
  getFCP(reportWebVital)
  getINP(reportWebVital)

  // Log performance summary in development
  if (import.meta.env.DEV) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        const perfData = performance.getEntriesByType('navigation')[0]
        if (perfData) {
          console.group('📊 Performance Summary')
          console.log('DOM Content Loaded:', Math.round(perfData.domContentLoadedEventEnd - perfData.fetchStart), 'ms')
          console.log('Page Load Complete:', Math.round(perfData.loadEventEnd - perfData.fetchStart), 'ms')
          console.log('DNS Lookup:', Math.round(perfData.domainLookupEnd - perfData.domainLookupStart), 'ms')
          console.log('TCP Connection:', Math.round(perfData.connectEnd - perfData.connectStart), 'ms')
          console.log('Request Time:', Math.round(perfData.responseEnd - perfData.requestStart), 'ms')
          console.log('DOM Processing:', Math.round(perfData.domComplete - perfData.domInteractive), 'ms')
          console.groupEnd()
        }
      }, 2000)
    })
  }
}

// Export individual metric functions for testing
export {
  getLCP,
  getFID,
  getCLS,
  getTTFB,
  getFCP,
  getINP,
  reportWebVital
}
