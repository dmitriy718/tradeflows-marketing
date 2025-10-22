/**
 * Skip Link Component for Accessibility
 * Allows keyboard users to skip directly to main content
 * WCAG 2.1 Success Criterion 2.4.1 (Bypass Blocks)
 */

import { useState } from 'react'

export default function SkipLink() {
  const [isFocused, setIsFocused] = useState(false)

  const handleClick = (e) => {
    e.preventDefault()
    const mainContent = document.getElementById('main-content')

    if (mainContent) {
      // Set tabindex to allow programmatic focus
      mainContent.setAttribute('tabindex', '-1')
      mainContent.focus()

      // Remove tabindex after focus to restore normal tab order
      mainContent.addEventListener('blur', () => {
        mainContent.removeAttribute('tabindex')
      }, { once: true })

      // Scroll into view
      mainContent.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <a
      href="#main-content"
      className={`skip-link ${isFocused ? 'skip-link-focused' : ''}`}
      onClick={handleClick}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    >
      Skip to main content
    </a>
  )
}
