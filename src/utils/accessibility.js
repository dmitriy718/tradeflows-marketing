/**
 * Accessibility Utilities for WCAG AA Compliance
 * Provides helpers for keyboard navigation, ARIA attributes, and screen reader support
 */

/**
 * Checks if an element has sufficient color contrast for WCAG AA
 * @param {string} foreground - Foreground color (hex)
 * @param {string} background - Background color (hex)
 * @param {boolean} largeText - Is the text large (18pt+ or 14pt+ bold)
 * @returns {boolean} - True if contrast ratio meets WCAG AA
 */
export function checkColorContrast(foreground, background, largeText = false) {
  const ratio = getContrastRatio(foreground, background)
  const minRatio = largeText ? 3 : 4.5
  return ratio >= minRatio
}

/**
 * Calculate contrast ratio between two colors
 */
function getContrastRatio(color1, color2) {
  const lum1 = getLuminance(color1)
  const lum2 = getLuminance(color2)
  const brightest = Math.max(lum1, lum2)
  const darkest = Math.min(lum1, lum2)
  return (brightest + 0.05) / (darkest + 0.05)
}

/**
 * Calculate relative luminance of a color
 */
function getLuminance(hexColor) {
  const rgb = hexToRgb(hexColor)
  const [r, g, b] = rgb.map(val => {
    const sRGB = val / 255
    return sRGB <= 0.03928
      ? sRGB / 12.92
      : Math.pow((sRGB + 0.055) / 1.055, 2.4)
  })
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

/**
 * Convert hex color to RGB array
 */
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16)
      ]
    : [0, 0, 0]
}

/**
 * Generate ARIA live region announcer for dynamic content
 */
export function announceToScreenReader(message, priority = 'polite') {
  const announcer = document.getElementById('a11y-announcer') || createAnnouncer()
  announcer.setAttribute('aria-live', priority)
  announcer.textContent = message

  // Clear after announcement
  setTimeout(() => {
    announcer.textContent = ''
  }, 1000)
}

function createAnnouncer() {
  const announcer = document.createElement('div')
  announcer.id = 'a11y-announcer'
  announcer.className = 'sr-only'
  announcer.setAttribute('aria-live', 'polite')
  announcer.setAttribute('aria-atomic', 'true')
  document.body.appendChild(announcer)
  return announcer
}

/**
 * Trap focus within a modal or dialog
 */
export function trapFocus(element) {
  const focusableElements = element.querySelectorAll(
    'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
  )

  const firstElement = focusableElements[0]
  const lastElement = focusableElements[focusableElements.length - 1]

  const handleTabKey = (e) => {
    if (e.key !== 'Tab') return

    if (e.shiftKey) {
      if (document.activeElement === firstElement) {
        lastElement.focus()
        e.preventDefault()
      }
    } else {
      if (document.activeElement === lastElement) {
        firstElement.focus()
        e.preventDefault()
      }
    }
  }

  element.addEventListener('keydown', handleTabKey)

  // Return cleanup function
  return () => {
    element.removeEventListener('keydown', handleTabKey)
  }
}

/**
 * Restore focus to element after modal closes
 */
export function manageFocus() {
  let previousFocus = null

  return {
    save: () => {
      previousFocus = document.activeElement
    },
    restore: () => {
      if (previousFocus && previousFocus.focus) {
        previousFocus.focus()
      }
    }
  }
}

/**
 * Generate unique ID for ARIA labeling
 */
let idCounter = 0
export function generateId(prefix = 'a11y') {
  return `${prefix}-${++idCounter}`
}

/**
 * Check if user prefers reduced motion
 */
export function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Check if user prefers dark mode
 */
export function prefersDarkMode() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

/**
 * Keyboard event helpers
 */
export const Keys = {
  ENTER: 'Enter',
  SPACE: ' ',
  ESCAPE: 'Escape',
  TAB: 'Tab',
  ARROW_UP: 'ArrowUp',
  ARROW_DOWN: 'ArrowDown',
  ARROW_LEFT: 'ArrowLeft',
  ARROW_RIGHT: 'ArrowRight',
  HOME: 'Home',
  END: 'End'
}

/**
 * Check if key event is an action key (Enter or Space)
 */
export function isActionKey(event) {
  return event.key === Keys.ENTER || event.key === Keys.SPACE
}

/**
 * Prevent default and stop propagation for action keys
 */
export function handleActionKey(event, callback) {
  if (isActionKey(event)) {
    event.preventDefault()
    callback(event)
  }
}

/**
 * Get accessible label for element
 */
export function getAccessibleLabel(element) {
  // Check aria-label
  if (element.hasAttribute('aria-label')) {
    return element.getAttribute('aria-label')
  }

  // Check aria-labelledby
  if (element.hasAttribute('aria-labelledby')) {
    const labelId = element.getAttribute('aria-labelledby')
    const labelElement = document.getElementById(labelId)
    return labelElement ? labelElement.textContent : ''
  }

  // Check associated label
  if (element.id) {
    const label = document.querySelector(`label[for="${element.id}"]`)
    if (label) return label.textContent
  }

  // Check placeholder (not ideal but fallback)
  if (element.hasAttribute('placeholder')) {
    return element.getAttribute('placeholder')
  }

  return ''
}

/**
 * Validate form field accessibility
 */
export function validateFieldAccessibility(field) {
  const issues = []

  // Check for label
  const label = getAccessibleLabel(field)
  if (!label) {
    issues.push('Field lacks accessible label')
  }

  // Check for error message association
  if (field.hasAttribute('aria-invalid') && field.getAttribute('aria-invalid') === 'true') {
    if (!field.hasAttribute('aria-describedby')) {
      issues.push('Invalid field lacks error message association')
    }
  }

  // Check for required attribute communication
  if (field.hasAttribute('required') && !field.hasAttribute('aria-required')) {
    issues.push('Required field should have aria-required="true"')
  }

  return issues
}

/**
 * Roving tabindex manager for keyboard navigation in lists
 */
export class RovingTabIndex {
  constructor(container, items) {
    this.container = container
    this.items = items
    this.currentIndex = 0

    this.initialize()
  }

  initialize() {
    this.items.forEach((item, index) => {
      item.setAttribute('tabindex', index === 0 ? '0' : '-1')
      item.addEventListener('keydown', (e) => this.handleKeyDown(e, index))
      item.addEventListener('focus', () => this.setCurrentIndex(index))
    })
  }

  handleKeyDown(event, index) {
    let newIndex = index

    switch(event.key) {
      case Keys.ARROW_DOWN:
      case Keys.ARROW_RIGHT:
        event.preventDefault()
        newIndex = (index + 1) % this.items.length
        break

      case Keys.ARROW_UP:
      case Keys.ARROW_LEFT:
        event.preventDefault()
        newIndex = (index - 1 + this.items.length) % this.items.length
        break

      case Keys.HOME:
        event.preventDefault()
        newIndex = 0
        break

      case Keys.END:
        event.preventDefault()
        newIndex = this.items.length - 1
        break

      default:
        return
    }

    this.items[newIndex].focus()
  }

  setCurrentIndex(index) {
    this.items[this.currentIndex].setAttribute('tabindex', '-1')
    this.currentIndex = index
    this.items[this.currentIndex].setAttribute('tabindex', '0')
  }

  destroy() {
    this.items.forEach(item => {
      item.removeAttribute('tabindex')
    })
  }
}

/**
 * ARIA roles and properties reference
 */
export const AriaRoles = {
  ALERT: 'alert',
  ALERTDIALOG: 'alertdialog',
  BUTTON: 'button',
  CHECKBOX: 'checkbox',
  DIALOG: 'dialog',
  GRID: 'grid',
  GRIDCELL: 'gridcell',
  LINK: 'link',
  LIST: 'list',
  LISTITEM: 'listitem',
  MAIN: 'main',
  MENU: 'menu',
  MENUBAR: 'menubar',
  MENUITEM: 'menuitem',
  NAVIGATION: 'navigation',
  PROGRESSBAR: 'progressbar',
  RADIO: 'radio',
  RADIOGROUP: 'radiogroup',
  SEARCH: 'search',
  TAB: 'tab',
  TABLIST: 'tablist',
  TABPANEL: 'tabpanel',
  TEXTBOX: 'textbox',
  TOOLBAR: 'toolbar'
}
