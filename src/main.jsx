import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { AnalyticsProvider } from './components/AnalyticsProvider'
import App from './App'
import './styles/global.css'
import { initWebVitals } from './utils/webVitals'
import { registerServiceWorker } from './utils/pwa'

// Initialize Web Vitals monitoring
initWebVitals()

// Register service worker for PWA functionality
if (import.meta.env.PROD) {
  registerServiceWorker()
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <AnalyticsProvider>
          <App />
        </AnalyticsProvider>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>,
)
