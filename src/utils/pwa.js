/**
 * PWA Utilities
 * Service worker registration and PWA install prompt handling
 */

// Register service worker
export async function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/'
      })

      console.log('[PWA] Service Worker registered successfully:', registration.scope)

      // Handle updates
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing

        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            // New service worker available
            console.log('[PWA] New content available, please refresh')

            // Notify user of update
            if (window.confirm('New version available! Refresh to update?')) {
              newWorker.postMessage({ type: 'SKIP_WAITING' })
              window.location.reload()
            }
          }
        })
      })

      // Auto-update on controller change
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        console.log('[PWA] Controller changed, reloading page')
        window.location.reload()
      })

      return registration
    } catch (error) {
      console.error('[PWA] Service Worker registration failed:', error)
      return null
    }
  } else {
    console.log('[PWA] Service Workers not supported')
    return null
  }
}

// Unregister service worker (for development/debugging)
export async function unregisterServiceWorker() {
  if ('serviceWorker' in navigator) {
    const registrations = await navigator.serviceWorker.getRegistrations()
    for (const registration of registrations) {
      await registration.unregister()
    }
    console.log('[PWA] Service Worker unregistered')
  }
}

// Check if app is standalone (installed as PWA)
export function isStandalone() {
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    window.navigator.standalone === true ||
    document.referrer.includes('android-app://')
  )
}

// Check if browser supports installation
export function canInstall() {
  return 'beforeinstallprompt' in window
}

// Get service worker version
export async function getServiceWorkerVersion() {
  if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
    return new Promise((resolve) => {
      const messageChannel = new MessageChannel()
      messageChannel.port1.onmessage = (event) => {
        resolve(event.data.version)
      }
      navigator.serviceWorker.controller.postMessage(
        { type: 'GET_VERSION' },
        [messageChannel.port2]
      )
    })
  }
  return null
}

// Clear all caches (for debugging)
export async function clearAllCaches() {
  if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
    return new Promise((resolve) => {
      const messageChannel = new MessageChannel()
      messageChannel.port1.onmessage = (event) => {
        resolve(event.data.success)
      }
      navigator.serviceWorker.controller.postMessage(
        { type: 'CLEAR_CACHE' },
        [messageChannel.port2]
      )
    })
  }
  return false
}

// Check online status
export function isOnline() {
  return navigator.onLine
}

// Listen for online/offline events
export function onNetworkChange(callback) {
  window.addEventListener('online', () => callback(true))
  window.addEventListener('offline', () => callback(false))

  // Return cleanup function
  return () => {
    window.removeEventListener('online', () => callback(true))
    window.removeEventListener('offline', () => callback(false))
  }
}

// Request persistent storage (for large caches)
export async function requestPersistentStorage() {
  if ('storage' in navigator && 'persist' in navigator.storage) {
    const isPersisted = await navigator.storage.persisted()
    console.log(`[PWA] Storage persisted: ${isPersisted}`)

    if (!isPersisted) {
      const result = await navigator.storage.persist()
      console.log(`[PWA] Storage persistence granted: ${result}`)
      return result
    }
    return true
  }
  return false
}

// Get storage estimate
export async function getStorageEstimate() {
  if ('storage' in navigator && 'estimate' in navigator.storage) {
    const estimate = await navigator.storage.estimate()
    const percentageUsed = (estimate.usage / estimate.quota * 100).toFixed(2)

    return {
      usage: estimate.usage,
      quota: estimate.quota,
      percentage: percentageUsed,
      usageMB: (estimate.usage / (1024 * 1024)).toFixed(2),
      quotaMB: (estimate.quota / (1024 * 1024)).toFixed(2)
    }
  }
  return null
}
