import { useEffect, useRef } from 'react'
import { trackScrollDepth } from '../utils/analytics'

/**
 * ScrollTracker Component
 * Tracks scroll depth for analytics and engagement metrics
 */
export default function ScrollTracker() {
  const trackedDepths = useRef(new Set())

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight - windowHeight
      const scrolled = window.scrollY

      // Calculate scroll percentage
      const scrollPercent = Math.round((scrolled / documentHeight) * 100)

      // Track at 25%, 50%, 75%, and 100% scroll depths
      const depths = [25, 50, 75, 100]

      depths.forEach(depth => {
        if (scrollPercent >= depth && !trackedDepths.current.has(depth)) {
          trackedDepths.current.add(depth)
          trackScrollDepth(depth)
        }
      })
    }

    // Add throttled scroll listener
    let timeoutId
    const throttledScroll = () => {
      if (timeoutId) return
      timeoutId = setTimeout(() => {
        handleScroll()
        timeoutId = null
      }, 500) // Throttle to once per 500ms
    }

    window.addEventListener('scroll', throttledScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', throttledScroll)
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [])

  return null // This component doesn't render anything
}
