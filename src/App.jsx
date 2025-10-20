import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import LiveChatWidget from './components/LiveChatWidget'
import ExitIntentPopup from './components/ExitIntentPopup'
import SocialProofNotifications from './components/SocialProofNotifications'
// Lazy load to prevent initialization errors
const InteractiveProductTour = lazy(() => import('./components/InteractiveProductTour'))
const LiveTradingSimulator = lazy(() => import('./components/LiveTradingSimulator'))

// Lazy load pages for better performance
const HomePage = lazy(() => import('./pages/HomePage'))
const FeaturesPage = lazy(() => import('./pages/FeaturesPage'))
const PricingPage = lazy(() => import('./pages/PricingPage'))
const KnowledgeBasePage = lazy(() => import('./pages/KnowledgeBasePage'))
const KBArticle = lazy(() => import('./pages/KBArticle'))
const AboutPage = lazy(() => import('./pages/AboutPage'))
const ContactPage = lazy(() => import('./pages/ContactPage'))
const BlogPage = lazy(() => import('./pages/BlogPage'))
const BlogPost = lazy(() => import('./pages/BlogPost'))
const CareersPage = lazy(() => import('./pages/CareersPage'))
const PrivacyPage = lazy(() => import('./pages/PrivacyPage'))
const TermsPage = lazy(() => import('./pages/TermsPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))
const ComparisonPage = lazy(() => import('./pages/ComparisonPage'))
const PressKitPage = lazy(() => import('./pages/PressKitPage'))

// Loading fallback component
function PageLoader() {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '60vh',
      fontSize: '18px',
      color: '#64748b'
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '16px'
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          border: '3px solid #e2e8f0',
          borderTop: '3px solid #3b9eff',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite'
        }}></div>
        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Navigation />
      <main>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/features" element={<FeaturesPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/vs-luxalgo" element={<ComparisonPage />} />
            <Route path="/knowledge-base" element={<KnowledgeBasePage />} />
            <Route path="/knowledge-base/:slug" element={<KBArticle />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/press-kit" element={<PressKitPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <LiveChatWidget />
      <ExitIntentPopup />
      <SocialProofNotifications />
      <Suspense fallback={<div />}>
        <InteractiveProductTour autoStart={false} />
        <LiveTradingSimulator />
      </Suspense>
    </>
  )
}
