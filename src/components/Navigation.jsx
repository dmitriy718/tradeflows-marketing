import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useFocusTrap } from '../hooks/useKeyboardNavigation'
import './Navigation.css'

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const location = useLocation()
  const mobileMenuRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024)
    }

    // Set initial state
    handleResize()

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location])

  // Focus trap for mobile menu
  useFocusTrap(mobileMenuRef, isMobileMenuOpen && isMobile, () => {
    setIsMobileMenuOpen(false)
  })

  // Keyboard support: Close mobile menu on Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isMobileMenuOpen])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen && isMobile) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen, isMobile])

  const navLinks = [
    { path: '/features', label: 'Features' },
    { path: '/pricing', label: 'Pricing' },
    { path: '/vs-luxalgo', label: 'vs LuxAlgo', highlight: true },
    { path: '/knowledge-base', label: 'Knowledge Base' },
    { path: '/blog', label: 'Blog' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
  ]

  return (
    <nav
      className={`navigation ${isScrolled ? 'scrolled' : ''}`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="nav-container">
        <Link to="/" className="nav-logo" aria-label="TradeFlows Pro - Home">
          <img src="/logo-tf-shield.svg" alt="" aria-hidden="true" className="logo-icon" style={{ height: '40px', width: 'auto' }} />
          <span style={{
            fontSize: '20px',
            fontWeight: '600',
            color: '#8B92A9',
            letterSpacing: '0.5px',
            marginLeft: '12px'
          }} aria-label="TradeFlows Pro">
            TRADEFLOWS PRO
          </span>
        </Link>

        <div
          ref={mobileMenuRef}
          id="mobile-menu"
          className={`nav-menu ${isMobileMenuOpen ? 'open' : ''}`}
          aria-hidden={isMobile ? !isMobileMenuOpen : undefined}
          style={isMobileMenuOpen && isMobile ? {
            position: 'fixed',
            top: '72px',
            left: '0',
            right: '0',
            bottom: '0',
            height: 'calc(100vh - 72px)',
            minHeight: '500px',
            background: 'rgba(13, 15, 20, 0.98)',
            backdropFilter: 'blur(20px)',
            display: 'flex',
            flexDirection: 'column',
            padding: '2rem',
            gap: '2rem',
            transform: 'translateX(0)',
            transition: 'transform 0.3s ease',
            overflowY: 'auto',
            zIndex: 9999,
            visibility: 'visible'
          } : {}}
        >
          <ul className="nav-links" style={isMobileMenuOpen && isMobile ? {
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            gap: '1rem',
            alignItems: 'stretch',
            listStyle: 'none',
            margin: '0',
            padding: '0'
          } : {}}>
            {navLinks.map((link) => (
              <li key={link.path} style={isMobileMenuOpen && isMobile ? {
                width: '100%',
                display: 'block',
                listStyle: 'none'
              } : {}}>
                <Link
                  to={link.path}
                  className={`${location.pathname === link.path ? 'active' : ''} ${link.highlight ? 'highlight-glow' : ''}`}
                  aria-current={location.pathname === link.path ? 'page' : undefined}
                  style={isMobileMenuOpen && isMobile ? {
                    width: '100%',
                    padding: '1.5rem',
                    textAlign: 'center',
                    fontSize: '1.125rem',
                    display: 'block',
                    borderRadius: '8px',
                    transition: 'all 0.2s ease'
                  } : {}}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="nav-actions" style={isMobileMenuOpen && isMobile ? {
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            gap: '1rem',
            marginTop: '1.5rem'
          } : {}}>
            <a href="https://app.tradeflows.net?utm_source=website&utm_medium=navigation&utm_campaign=signin" className="btn btn-text">
              Sign In
            </a>
            <a href="https://app.tradeflows.net?signup=true&utm_source=website&utm_medium=navigation&utm_campaign=trial" className="btn btn-primary">
              Start Free Trial
            </a>
          </div>
        </div>

        <button
          className={`mobile-menu-toggle ${isMobileMenuOpen ? 'open' : ''}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
          type="button"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </button>
      </div>
    </nav>
  )
}
