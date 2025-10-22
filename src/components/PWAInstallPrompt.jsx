import { useState, useEffect } from 'react'
import { isStandalone } from '../utils/pwa'
import { trackEvent } from '../utils/analytics'

/**
 * PWA Install Prompt Component
 * Shows a prompt to install the app when criteria are met
 */
export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [showPrompt, setShowPrompt] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    // Check if already installed
    if (isStandalone()) {
      console.log('[PWA] App is already installed')
      return
    }

    // Check if user has dismissed before
    const hasDeclined = localStorage.getItem('pwa_install_declined')
    if (hasDeclined) {
      const declinedDate = new Date(hasDeclined)
      const daysSince = (Date.now() - declinedDate.getTime()) / (1000 * 60 * 60 * 24)

      // Show again after 7 days
      if (daysSince < 7) {
        console.log('[PWA] User declined recently, not showing prompt')
        return
      }
    }

    // Listen for beforeinstallprompt event
    const handleBeforeInstallPrompt = (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault()

      // Save the event for later use
      setDeferredPrompt(e)

      // Show our custom install prompt after a delay
      setTimeout(() => {
        setShowPrompt(true)
        trackEvent('pwa_prompt_shown', {
          event_category: 'pwa',
          event_label: 'install_prompt_shown'
        })
      }, 5000) // Show after 5 seconds
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)

    // Listen for successful installation
    window.addEventListener('appinstalled', () => {
      console.log('[PWA] App installed successfully')
      setShowPrompt(false)
      setDeferredPrompt(null)
      trackEvent('pwa_installed', {
        event_category: 'pwa',
        event_label: 'app_installed'
      })
    })

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    }
  }, [])

  const handleInstallClick = async () => {
    if (!deferredPrompt) return

    // Show the install prompt
    deferredPrompt.prompt()

    // Wait for the user's response
    const { outcome } = await deferredPrompt.userChoice

    console.log(`[PWA] User response: ${outcome}`)

    trackEvent('pwa_prompt_response', {
      event_category: 'pwa',
      event_label: outcome
    })

    if (outcome === 'dismissed') {
      // User declined
      localStorage.setItem('pwa_install_declined', new Date().toISOString())
    }

    // Reset the deferred prompt
    setDeferredPrompt(null)
    setShowPrompt(false)
  }

  const handleDismiss = () => {
    setShowPrompt(false)
    setDismissed(true)
    localStorage.setItem('pwa_install_declined', new Date().toISOString())

    trackEvent('pwa_prompt_dismissed', {
      event_category: 'pwa',
      event_label: 'user_dismissed'
    })
  }

  if (!showPrompt || dismissed) {
    return null
  }

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      left: '20px',
      right: '20px',
      maxWidth: '400px',
      margin: '0 auto',
      backgroundColor: '#1a1d29',
      borderRadius: '16px',
      padding: '20px',
      boxShadow: '0 12px 40px rgba(0, 0, 0, 0.5)',
      border: '1px solid rgba(59, 158, 255, 0.2)',
      zIndex: 9999,
      animation: 'slideUp 0.3s ease-out'
    }}>
      <style>{`
        @keyframes slideUp {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>

      <button
        onClick={handleDismiss}
        style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          background: 'transparent',
          border: 'none',
          color: '#9ca3af',
          fontSize: '24px',
          cursor: 'pointer',
          padding: '0',
          lineHeight: 1
        }}
      >
        ×
      </button>

      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '16px',
        marginBottom: '16px'
      }}>
        <div style={{
          width: '60px',
          height: '60px',
          borderRadius: '12px',
          background: 'linear-gradient(135deg, #3b9eff, #a78bfa)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '32px',
          flexShrink: 0
        }}>
          📱
        </div>

        <div style={{ flex: 1 }}>
          <h3 style={{
            margin: '0 0 8px 0',
            fontSize: '18px',
            fontWeight: '700',
            color: '#f8f9fa'
          }}>
            Install TradeFlows Pro
          </h3>
          <p style={{
            margin: 0,
            fontSize: '14px',
            color: '#9ca3af',
            lineHeight: 1.5
          }}>
            Get quick access from your home screen. Works offline and loads faster!
          </p>
        </div>
      </div>

      <div style={{
        display: 'flex',
        gap: '12px',
        marginTop: '16px'
      }}>
        <button
          onClick={handleInstallClick}
          style={{
            flex: 1,
            padding: '12px 20px',
            background: 'linear-gradient(135deg, #3b9eff, #2563eb)',
            border: 'none',
            borderRadius: '8px',
            color: 'white',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'transform 0.2s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        >
          Install App
        </button>
        <button
          onClick={handleDismiss}
          style={{
            padding: '12px 20px',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '8px',
            color: '#9ca3af',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'background 0.2s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'}
        >
          Not Now
        </button>
      </div>

      <div style={{
        marginTop: '12px',
        paddingTop: '12px',
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
        display: 'flex',
        gap: '12px',
        fontSize: '11px',
        color: '#6b7280'
      }}>
        <span>✓ Offline access</span>
        <span>✓ Fast loading</span>
        <span>✓ Home screen icon</span>
      </div>
    </div>
  )
}
