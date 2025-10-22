/**
 * useKeyboardNavigation Hook
 * Provides keyboard navigation support for interactive components
 * Supports arrow keys, Home, End, Enter, Space, and Escape
 */

import { useEffect, useRef, useCallback, useState } from 'react'
import { Keys, isActionKey } from '../utils/accessibility'

/**
 * Hook for managing keyboard navigation in lists and menus
 * @param {Object} options - Configuration options
 * @param {number} options.itemCount - Number of items to navigate
 * @param {Function} options.onSelect - Callback when item is selected (Enter/Space)
 * @param {Function} options.onEscape - Callback when Escape is pressed
 * @param {boolean} options.loop - Whether navigation should loop (default: true)
 * @param {string} options.orientation - 'vertical' or 'horizontal' (default: 'vertical')
 * @returns {Object} - Navigation state and handlers
 */
export function useKeyboardNavigation(options = {}) {
  const {
    itemCount = 0,
    onSelect = () => {},
    onEscape = () => {},
    loop = true,
    orientation = 'vertical'
  } = options

  const currentIndexRef = useRef(0)

  const getNextIndex = useCallback((currentIndex, direction) => {
    let nextIndex = currentIndex

    if (direction === 'next') {
      nextIndex = currentIndex + 1
      if (nextIndex >= itemCount) {
        nextIndex = loop ? 0 : itemCount - 1
      }
    } else if (direction === 'previous') {
      nextIndex = currentIndex - 1
      if (nextIndex < 0) {
        nextIndex = loop ? itemCount - 1 : 0
      }
    } else if (direction === 'first') {
      nextIndex = 0
    } else if (direction === 'last') {
      nextIndex = itemCount - 1
    }

    return nextIndex
  }, [itemCount, loop])

  const handleKeyDown = useCallback((event, currentIndex) => {
    const isVertical = orientation === 'vertical'
    let newIndex = currentIndex

    switch(event.key) {
      case isVertical ? Keys.ARROW_DOWN : Keys.ARROW_RIGHT:
        event.preventDefault()
        newIndex = getNextIndex(currentIndex, 'next')
        break

      case isVertical ? Keys.ARROW_UP : Keys.ARROW_LEFT:
        event.preventDefault()
        newIndex = getNextIndex(currentIndex, 'previous')
        break

      case Keys.HOME:
        event.preventDefault()
        newIndex = getNextIndex(currentIndex, 'first')
        break

      case Keys.END:
        event.preventDefault()
        newIndex = getNextIndex(currentIndex, 'last')
        break

      case Keys.ENTER:
      case Keys.SPACE:
        event.preventDefault()
        onSelect(currentIndex)
        return currentIndex

      case Keys.ESCAPE:
        event.preventDefault()
        onEscape()
        return currentIndex

      default:
        return currentIndex
    }

    currentIndexRef.current = newIndex
    return newIndex
  }, [orientation, getNextIndex, onSelect, onEscape])

  return {
    handleKeyDown,
    currentIndex: currentIndexRef.current
  }
}

/**
 * Hook for managing focus trap in modals/dialogs
 * @param {React.RefObject} containerRef - Ref to container element
 * @param {boolean} isActive - Whether focus trap is active
 * @param {Function} onEscape - Callback when Escape is pressed
 */
export function useFocusTrap(containerRef, isActive = true, onEscape = () => {}) {
  const previousFocusRef = useRef(null)

  useEffect(() => {
    if (!isActive || !containerRef.current) return

    // Save current focus
    previousFocusRef.current = document.activeElement

    const container = containerRef.current
    const focusableElements = container.querySelectorAll(
      'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )

    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]

    // Focus first element
    if (firstElement) {
      firstElement.focus()
    }

    const handleKeyDown = (e) => {
      // Handle Escape
      if (e.key === Keys.ESCAPE) {
        onEscape()
        return
      }

      // Handle Tab
      if (e.key === Keys.TAB) {
        if (focusableElements.length === 1) {
          e.preventDefault()
          return
        }

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault()
            lastElement.focus()
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault()
            firstElement.focus()
          }
        }
      }
    }

    container.addEventListener('keydown', handleKeyDown)

    // Cleanup
    return () => {
      container.removeEventListener('keydown', handleKeyDown)

      // Restore focus
      if (previousFocusRef.current && previousFocusRef.current.focus) {
        previousFocusRef.current.focus()
      }
    }
  }, [isActive, containerRef, onEscape])
}

/**
 * Hook for managing roving tabindex in component lists
 * @param {number} itemCount - Number of items
 * @param {number} defaultIndex - Default focused index
 * @returns {Object} - Tab management utilities
 */
export function useRovingTabIndex(itemCount = 0, defaultIndex = 0) {
  const currentIndexRef = useRef(defaultIndex)

  const getTabIndex = useCallback((index) => {
    return index === currentIndexRef.current ? 0 : -1
  }, [])

  const setCurrentIndex = useCallback((index) => {
    currentIndexRef.current = index
  }, [])

  const handleKeyDown = useCallback((event, currentIndex) => {
    let newIndex = currentIndex

    switch(event.key) {
      case Keys.ARROW_DOWN:
      case Keys.ARROW_RIGHT:
        event.preventDefault()
        newIndex = (currentIndex + 1) % itemCount
        break

      case Keys.ARROW_UP:
      case Keys.ARROW_LEFT:
        event.preventDefault()
        newIndex = (currentIndex - 1 + itemCount) % itemCount
        break

      case Keys.HOME:
        event.preventDefault()
        newIndex = 0
        break

      case Keys.END:
        event.preventDefault()
        newIndex = itemCount - 1
        break

      default:
        return
    }

    setCurrentIndex(newIndex)
    return newIndex
  }, [itemCount, setCurrentIndex])

  return {
    getTabIndex,
    setCurrentIndex,
    handleKeyDown,
    currentIndex: currentIndexRef.current
  }
}

/**
 * Hook for announcing messages to screen readers
 * @returns {Function} - announce function
 */
export function useScreenReaderAnnounce() {
  const announcerRef = useRef(null)

  useEffect(() => {
    // Create announcer element if it doesn't exist
    if (!document.getElementById('a11y-announcer')) {
      const announcer = document.createElement('div')
      announcer.id = 'a11y-announcer'
      announcer.className = 'sr-only'
      announcer.setAttribute('aria-live', 'polite')
      announcer.setAttribute('aria-atomic', 'true')
      document.body.appendChild(announcer)
      announcerRef.current = announcer
    } else {
      announcerRef.current = document.getElementById('a11y-announcer')
    }

    return () => {
      // Don't remove announcer on unmount as it's shared
    }
  }, [])

  const announce = useCallback((message, priority = 'polite') => {
    if (announcerRef.current) {
      announcerRef.current.setAttribute('aria-live', priority)
      announcerRef.current.textContent = message

      // Clear after announcement
      setTimeout(() => {
        if (announcerRef.current) {
          announcerRef.current.textContent = ''
        }
      }, 1000)
    }
  }, [])

  return announce
}

/**
 * Hook for detecting and respecting user's motion preferences
 * @returns {boolean} - Whether user prefers reduced motion
 */
export function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    const handleChange = (e) => {
      setPrefersReducedMotion(e.matches)
    }

    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange)
      return () => mediaQuery.removeEventListener('change', handleChange)
    } else {
      // Older browsers
      mediaQuery.addListener(handleChange)
      return () => mediaQuery.removeListener(handleChange)
    }
  }, [])

  return prefersReducedMotion
}
