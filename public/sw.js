/**
 * Service Worker for TradeFlows Pro Marketing Site
 *
 * Features:
 * - Offline support with cached fallback
 * - Intelligent caching strategies
 * - Background sync
 * - Push notifications (future)
 * - Automatic updates
 */

const CACHE_VERSION = 'v1.0.0'
const CACHE_NAME = `tradeflows-marketing-${CACHE_VERSION}`
const RUNTIME_CACHE = `tradeflows-runtime-${CACHE_VERSION}`

// Assets to cache on install
const PRECACHE_ASSETS = [
  '/',
  '/offline.html',
  '/manifest.json',
  '/logo-tf-shield.svg',
  '/logo-tf-shield-icon.svg',
  '/favicon.svg'
]

// Routes that should always be fetched from network (then cached)
const NETWORK_FIRST_ROUTES = [
  '/api/',
  '/blog/',
  '/knowledge-base/'
]

// Routes that can be served from cache (then updated)
const CACHE_FIRST_ROUTES = [
  '/assets/',
  '/images/',
  '.css',
  '.js',
  '.svg',
  '.png',
  '.jpg',
  '.jpeg',
  '.webp',
  '.woff',
  '.woff2'
]

// Install event - cache essential assets
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installing...')

  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Precaching essential assets')
      return cache.addAll(PRECACHE_ASSETS)
    }).then(() => {
      console.log('[Service Worker] Installed successfully')
      return self.skipWaiting() // Activate immediately
    })
  )
})

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activating...')

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name.startsWith('tradeflows-') && name !== CACHE_NAME && name !== RUNTIME_CACHE)
          .map((name) => {
            console.log('[Service Worker] Deleting old cache:', name)
            return caches.delete(name)
          })
      )
    }).then(() => {
      console.log('[Service Worker] Activated successfully')
      return self.clients.claim() // Take control of all pages immediately
    })
  )
})

// Fetch event - implement caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Skip cross-origin requests
  if (url.origin !== location.origin) {
    return
  }

  // Skip chrome-extension and non-GET requests
  if (url.protocol === 'chrome-extension:' || request.method !== 'GET') {
    return
  }

  // Determine caching strategy based on URL
  if (shouldUseNetworkFirst(url.pathname)) {
    event.respondWith(networkFirst(request))
  } else if (shouldUseCacheFirst(url.pathname)) {
    event.respondWith(cacheFirst(request))
  } else {
    // Default: Network first with cache fallback
    event.respondWith(networkFirst(request))
  }
})

// Network First Strategy (for dynamic content)
async function networkFirst(request) {
  try {
    const networkResponse = await fetch(request)

    // Cache successful responses
    if (networkResponse && networkResponse.status === 200) {
      const cache = await caches.open(RUNTIME_CACHE)
      cache.put(request, networkResponse.clone())
    }

    return networkResponse
  } catch (error) {
    console.log('[Service Worker] Network request failed, falling back to cache:', request.url)

    // Try cache
    const cachedResponse = await caches.match(request)
    if (cachedResponse) {
      return cachedResponse
    }

    // If HTML page and not in cache, return offline page
    if (request.headers.get('accept').includes('text/html')) {
      const offlinePage = await caches.match('/offline.html')
      if (offlinePage) {
        return offlinePage
      }
    }

    // Return error response
    return new Response('Offline - Content not available', {
      status: 503,
      statusText: 'Service Unavailable',
      headers: new Headers({
        'Content-Type': 'text/plain'
      })
    })
  }
}

// Cache First Strategy (for static assets)
async function cacheFirst(request) {
  // Try cache first
  const cachedResponse = await caches.match(request)
  if (cachedResponse) {
    // Update cache in background
    fetch(request).then((networkResponse) => {
      if (networkResponse && networkResponse.status === 200) {
        caches.open(RUNTIME_CACHE).then((cache) => {
          cache.put(request, networkResponse)
        })
      }
    }).catch(() => {
      // Silently fail background update
    })

    return cachedResponse
  }

  // Not in cache, fetch from network
  try {
    const networkResponse = await fetch(request)

    // Cache the response
    if (networkResponse && networkResponse.status === 200) {
      const cache = await caches.open(RUNTIME_CACHE)
      cache.put(request, networkResponse.clone())
    }

    return networkResponse
  } catch (error) {
    console.log('[Service Worker] Cache and network failed for:', request.url)

    // Return error response
    return new Response('Content not available', {
      status: 503,
      statusText: 'Service Unavailable',
      headers: new Headers({
        'Content-Type': 'text/plain'
      })
    })
  }
}

// Helper: Check if route should use network-first strategy
function shouldUseNetworkFirst(pathname) {
  return NETWORK_FIRST_ROUTES.some(route => pathname.includes(route))
}

// Helper: Check if route should use cache-first strategy
function shouldUseCacheFirst(pathname) {
  return CACHE_FIRST_ROUTES.some(route => pathname.includes(route) || pathname.endsWith(route))
}

// Message event - handle messages from clients
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }

  if (event.data && event.data.type === 'GET_VERSION') {
    event.ports[0].postMessage({ version: CACHE_VERSION })
  }

  if (event.data && event.data.type === 'CLEAR_CACHE') {
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => caches.delete(name))
      )
    }).then(() => {
      event.ports[0].postMessage({ success: true })
    })
  }
})

// Background Sync (for future offline form submissions)
self.addEventListener('sync', (event) => {
  console.log('[Service Worker] Background sync:', event.tag)

  if (event.tag === 'sync-analytics') {
    // Sync pending analytics events
    event.waitUntil(syncAnalytics())
  }
})

async function syncAnalytics() {
  // Placeholder for analytics sync
  console.log('[Service Worker] Syncing analytics...')
  return Promise.resolve()
}

// Push notifications (for future implementation)
self.addEventListener('push', (event) => {
  if (!event.data) return

  const data = event.data.json()

  const options = {
    body: data.body || 'New update from TradeFlows Pro',
    icon: '/logo-tf-shield-icon.svg',
    badge: '/logo-tf-shield-icon.svg',
    vibrate: [200, 100, 200],
    tag: data.tag || 'default',
    data: data.url || '/',
    actions: [
      { action: 'open', title: 'Open', icon: '/logo-tf-shield-icon.svg' },
      { action: 'close', title: 'Close', icon: '/logo-tf-shield-icon.svg' }
    ]
  }

  event.waitUntil(
    self.registration.showNotification(data.title || 'TradeFlows Pro', options)
  )
})

// Notification click
self.addEventListener('notificationclick', (event) => {
  event.notification.close()

  if (event.action === 'open' || !event.action) {
    const urlToOpen = event.notification.data || '/'

    event.waitUntil(
      clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
        // Check if there's already a window open
        for (const client of clientList) {
          if (client.url === urlToOpen && 'focus' in client) {
            return client.focus()
          }
        }
        // Open new window
        if (clients.openWindow) {
          return clients.openWindow(urlToOpen)
        }
      })
    )
  }
})

console.log('[Service Worker] Loaded successfully')
