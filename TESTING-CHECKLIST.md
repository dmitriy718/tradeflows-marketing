# Testing Checklist - TradeFlows Marketing Site

## Pre-Deployment Testing Guide

This comprehensive checklist ensures all features work correctly before deployment.

---

## 1. Navigation & Routing Tests

### Header Navigation
- [ ] Logo links to homepage
- [ ] All navigation links work correctly:
  - [ ] Features → `/features`
  - [ ] Pricing → `/pricing`
  - [ ] vs LuxAlgo → `/vs-luxalgo` (highlighted)
  - [ ] Knowledge Base → `/knowledge-base`
  - [ ] Blog → `/blog`
  - [ ] About → `/about`
  - [ ] Contact → `/contact`
- [ ] Sign In button links to `https://app.tradeflows.net?utm_source=website&utm_medium=navigation&utm_campaign=signin`
- [ ] Start Free Trial button links to `https://app.tradeflows.net?signup=true&utm_source=website&utm_medium=navigation&utm_campaign=trial`
- [ ] Mobile hamburger menu toggles correctly
- [ ] Navigation is sticky on scroll
- [ ] Active page is highlighted in navigation

### Footer Navigation
- [ ] All footer sections render correctly:
  - [ ] Product links (Features, Pricing, vs LuxAlgo)
  - [ ] Resources links (Getting Started, API Docs, Community & Blog, Support Center, Security)
  - [ ] Company links (About, Careers, Press Kit, System Status)
  - [ ] Legal links (Privacy Policy, Terms of Service)
- [ ] Social media icons present
- [ ] Footer links work correctly
- [ ] Copyright year displays correctly

### Route Testing
- [ ] Homepage loads at `/`
- [ ] All page routes work:
  - [ ] `/features`
  - [ ] `/pricing`
  - [ ] `/vs-luxalgo`
  - [ ] `/knowledge-base`
  - [ ] `/knowledge-base/:slug` (test with specific articles)
  - [ ] `/blog`
  - [ ] `/blog/:slug` (test with specific posts)
  - [ ] `/about`
  - [ ] `/contact`
  - [ ] `/careers`
  - [ ] `/privacy`
  - [ ] `/terms`
  - [ ] `/press-kit`
  - [ ] 404 page for invalid routes

---

## 2. Homepage Features

### Hero Section
- [ ] Hero title displays correctly
- [ ] AI badge renders
- [ ] CTA buttons work:
  - [ ] "Start Free 7-Day Trial" → correct URL with UTM
  - [ ] "Explore Features" → `/features`
- [ ] Trust stats display (50K+ users, $2.5B+ volume, 4.9/5 rating)
- [ ] Live dashboard preview animation works
- [ ] Hero background gradient displays

### Features Overview
- [ ] All 6 feature cards render:
  - [ ] Real-Time Market Data
  - [ ] AI Strategy Builder
  - [ ] Advanced Portfolio Management
  - [ ] Smart Alerts & Notifications
  - [ ] Technical Analysis Tools
  - [ ] Performance Analytics
- [ ] Feature icons display correctly
- [ ] "Learn more →" links work
- [ ] "View All Features" button → `/features`

### Comparison Callout
- [ ] LuxAlgo comparison section displays
- [ ] Stats show: 17 features won, Better Value, Standalone
- [ ] "View Full Comparison" button → `/vs-luxalgo`

### Testimonials
- [ ] All 3 testimonial cards render
- [ ] Star ratings display
- [ ] Author avatars and names show

### CTA Section
- [ ] Final CTA section renders
- [ ] "Start Free Trial" button works with UTM
- [ ] "View Pricing" button → `/pricing`
- [ ] Trust features display (✓ Full platform access, etc.)

---

## 3. Features Page

### Feature Sections
- [ ] Hero section displays
- [ ] All feature sections render:
  - [ ] Real-Time Market Data
  - [ ] AI-Powered Strategies
  - [ ] Portfolio Management
  - [ ] Technical Analysis
  - [ ] Smart Alerts
  - [ ] Mobile & Desktop Apps
- [ ] Feature cards display correctly
- [ ] Screenshots/images load
- [ ] CTAs link to correct pages

---

## 4. Pricing Page

### Pricing Cards
- [ ] All 3 pricing plans display:
  - [ ] 7-Day Free Trial ($0 for 7 days, then $49.99/month)
  - [ ] Premium ($49.99/month or $479.99/year)
  - [ ] Professional ($79.99/month or $767.99/year)
- [ ] Badges render correctly:
  - [ ] "Most Popular" on Free Trial (orange)
  - [ ] "Best Value" on Professional (green)
- [ ] Billing toggle (Monthly/Annual) works
- [ ] Prices update correctly when switching billing cycle
- [ ] Annual pricing shows savings (20% off)
- [ ] "Save 20%" badge displays on Annual option
- [ ] Feature lists display correctly for each plan
- [ ] CTA buttons link correctly:
  - [ ] "Start Free Trial" → app with trial UTM
  - [ ] "Get Premium" → app with premium UTM
  - [ ] "Get Professional" → app with professional UTM

### Comparison Table
- [ ] Full comparison table renders
- [ ] All feature categories display:
  - [ ] Market Data
  - [ ] Trading Tools
  - [ ] Portfolio & Analytics
  - [ ] Alerts & Notifications
  - [ ] API & Integration
  - [ ] Support
- [ ] Checkmarks (✓) and crosses (✗) display correctly
- [ ] Feature differences are clear

### ROI Calculator
- [ ] ROI Calculator component renders
- [ ] All sliders work:
  - [ ] Monthly Trades (10-500)
  - [ ] Average Trade Size ($1K-$50K)
  - [ ] Current Win Rate (30-80%)
- [ ] Billing toggle (Monthly/Annual) works
- [ ] Calculations update in real-time
- [ ] Results display correctly:
  - [ ] Cost Comparison (LuxAlgo + TradingView vs TradeFlows Pro)
  - [ ] Performance Improvement
  - [ ] Time Savings
  - [ ] Total Monthly Value
  - [ ] ROI Percentage
  - [ ] Annual Summary
- [ ] "Start Your Free Trial" button works with UTM

### FAQ Section
- [ ] All 8 FAQ items display
- [ ] Questions are readable
- [ ] Answers are clear and informative

---

## 5. Comparison Page (vs LuxAlgo)

### Hero Section
- [ ] Comparison hero displays
- [ ] Subtitle mentions feature count

### Score Summary
- [ ] Score cards display:
  - [ ] TradeFlows Pro: 17 features
  - [ ] LuxAlgo: 3 features
- [ ] Winner badge on TradeFlows card

### Quick Comparison
- [ ] All 6 quick comparison cards render
- [ ] Winner indicators work correctly
- [ ] Icons display

### Detailed Comparison Table
- [ ] All 20 features display in table
- [ ] Winner column highlights correctly
- [ ] Importance indicators (high/medium) show
- [ ] Checkmarks and text align properly

### ROI Calculator
- [ ] Integrated ROI Calculator works (same tests as Pricing page)

### CTA Section
- [ ] Final CTA displays
- [ ] Button links correctly with UTM

---

## 6. Knowledge Base

### KB Homepage
- [ ] Hero section displays
- [ ] Search bar renders (even if non-functional)
- [ ] All article categories display:
  - [ ] Getting Started
  - [ ] Trading Strategies
  - [ ] Platform Features
  - [ ] Account & Billing
  - [ ] Technical
- [ ] Article cards display:
  - [ ] Title
  - [ ] Description
  - [ ] Category badge
  - [ ] Read time
- [ ] Article links work → `/knowledge-base/:slug`

### KB Articles
Test with specific articles (quick-start-guide, api-documentation, security):
- [ ] Article hero displays
- [ ] Article title shows
- [ ] Category and read time display
- [ ] Content renders correctly
- [ ] Code blocks format properly (for API docs)
- [ ] Headings hierarchy is correct
- [ ] Back button → `/knowledge-base`
- [ ] Related articles section shows

---

## 7. Blog

### Blog Homepage
- [ ] Hero section displays
- [ ] All blog posts render as cards
- [ ] Post metadata displays:
  - [ ] Title
  - [ ] Author
  - [ ] Date
  - [ ] Read time
  - [ ] Category
- [ ] Post links work → `/blog/:slug`

### Blog Posts
Test with recent posts:
- [ ] Post hero displays
- [ ] Title, author, date show
- [ ] Content renders correctly
- [ ] Paragraphs formatted properly
- [ ] Back to blog link → `/blog`

---

## 8. About Page

- [ ] Company story section displays
- [ ] Mission statement renders
- [ ] Team section shows (if applicable)
- [ ] Values/principles display
- [ ] CTA section works

---

## 9. Contact Page

### Contact Form
- [ ] Form renders correctly
- [ ] All fields present:
  - [ ] Name
  - [ ] Email
  - [ ] Subject
  - [ ] Message
- [ ] Field validation works
- [ ] Submit button enabled/disabled correctly
- [ ] Form submission works (or shows appropriate message)

### Contact Information
- [ ] Support email displays
- [ ] Phone number shows (if applicable)
- [ ] Office address (if applicable)
- [ ] Social media links work

---

## 10. Press Kit Page

- [ ] Hero section displays
- [ ] Company overview shows with stats
- [ ] Logo download section:
  - [ ] PNG, SVG, EPS options
  - [ ] Download links work
- [ ] Product screenshots section:
  - [ ] All screenshots display
  - [ ] Images load correctly
- [ ] Brand guidelines section:
  - [ ] Do's and Don'ts display
  - [ ] Color palette shows with hex codes
- [ ] Press contact information displays

---

## 11. Careers Page

- [ ] Company culture section displays
- [ ] Benefits listed
- [ ] Open positions section (even if no openings)
- [ ] Application process explained
- [ ] CTA/contact information works

---

## 12. Legal Pages

### Privacy Policy
- [ ] Full policy displays
- [ ] Sections organized clearly
- [ ] Last updated date shows
- [ ] All legal content renders

### Terms of Service
- [ ] Full terms display
- [ ] Sections numbered/organized
- [ ] Last updated date shows
- [ ] All legal content renders

---

## 13. Conversion Features

### Live Chat Widget
- [ ] Chat button appears in bottom-right corner
- [ ] Chat button badge shows "1"
- [ ] Clicking button opens chat window
- [ ] Chat header displays:
  - [ ] Avatar (TF)
  - [ ] "TradeFlows Support" title
  - [ ] Online status indicator
  - [ ] Minimize and close buttons
- [ ] Welcome form renders (before chat starts):
  - [ ] Name field
  - [ ] Email field
  - [ ] "Start Chat" button
- [ ] Form validation works (requires name and email)
- [ ] After submitting welcome form:
  - [ ] Welcome message displays
  - [ ] Quick reply buttons show
  - [ ] Chat input becomes active
- [ ] Chat functionality:
  - [ ] Can type messages
  - [ ] Messages send on Enter key
  - [ ] User messages appear on right (blue gradient)
  - [ ] Agent messages appear on left (white)
  - [ ] Auto-responses trigger correctly for keywords:
    - [ ] "free trial" triggers trial info
    - [ ] "payment" triggers payment methods info
    - [ ] "ai strategies" triggers AI info
    - [ ] "luxalgo" triggers comparison info
    - [ ] Default response for other messages
  - [ ] Typing indicator shows during response delay
  - [ ] Messages scroll automatically
- [ ] Minimize button works (collapses to header only)
- [ ] Close button works (hides chat, button reappears)
- [ ] Chat persists during navigation (doesn't reset)

### Exit Intent Popup
- [ ] Popup doesn't show immediately on page load
- [ ] Popup triggers when mouse leaves top of viewport (after 5 second delay)
- [ ] Popup displays correctly:
  - [ ] Icon with gradient
  - [ ] "Wait! Don't Miss Out 🎁" heading
  - [ ] Subtitle text
  - [ ] 4 benefit items with checkmarks
  - [ ] Email input field
  - [ ] "Get Free Access" button
  - [ ] "OR" divider
  - [ ] "Start Your 7-Day Free Trial" button with arrow
  - [ ] Privacy notice at bottom
  - [ ] Close button (X) in top-right
- [ ] Form validation works (requires email)
- [ ] Submitting email shows success state:
  - [ ] Success icon (green checkmark)
  - [ ] "You're All Set! 🎉" message
  - [ ] Success message text
  - [ ] Links to Explore Features and View Pricing
- [ ] Close button dismisses popup
- [ ] Popup doesn't show again after:
  - [ ] Being dismissed (3 days)
  - [ ] Email submitted (never again)
  - [ ] Already shown in last 24 hours
- [ ] localStorage persists settings correctly
- [ ] Trial button links with correct UTM parameters
- [ ] Clicking overlay background closes popup
- [ ] Clicking inside popup doesn't close it

### Social Proof Notifications
- [ ] First notification appears after 3 seconds
- [ ] Notification displays in bottom-left corner
- [ ] Notification content shows:
  - [ ] Icon (emoji: ✨, 🚀, or ⭐)
  - [ ] User name
  - [ ] Action performed
  - [ ] Location
  - [ ] Time ago
  - [ ] "Verified" badge at bottom
  - [ ] Close button (X)
- [ ] Notifications rotate every 8 seconds:
  - [ ] Fade out smoothly
  - [ ] New notification fades in
  - [ ] Different names, locations, actions
- [ ] Notification types vary:
  - [ ] Signup notifications (✨)
  - [ ] Upgrade notifications (🚀)
  - [ ] Review notifications (⭐)
- [ ] Close button dismisses notifications
- [ ] Doesn't show again if dismissed (localStorage check)
- [ ] Animation is smooth (slide in from left)
- [ ] Doesn't conflict with chat widget (different corner)
- [ ] Hover effect works (shadow increases)

### Conversion Features - Mobile Responsiveness
- [ ] Live Chat:
  - [ ] Button sized correctly
  - [ ] Chat window fits mobile screen
  - [ ] Messages display properly
  - [ ] Input accessible
- [ ] Exit Intent:
  - [ ] Popup scales to mobile width
  - [ ] All content readable
  - [ ] Form inputs work on mobile
  - [ ] Buttons easily tappable
- [ ] Social Proof:
  - [ ] Notification positioned correctly
  - [ ] Text readable on small screens
  - [ ] Doesn't overlap with chat button

---

## 14. Performance Tests

### Lazy Loading
- [ ] Pages load on-demand (check Network tab)
- [ ] Loading spinner shows during page transitions
- [ ] No layout shift during loading

### Bundle Sizes (from build output)
- [ ] React vendor chunk: ~140 KB (~45 KB gzipped) ✓
- [ ] Main app bundle: ~34 KB (~10 KB gzipped) ✓
- [ ] Individual page chunks: 2-20 KB each ✓
- [ ] CSS code-split per page ✓
- [ ] Total initial load < 200 KB ✓

### Web Vitals Monitoring
- [ ] Open browser console
- [ ] Check for Web Vitals logs (development mode):
  - [ ] LCP (Largest Contentful Paint)
  - [ ] FID (First Input Delay)
  - [ ] CLS (Cumulative Layout Shift)
  - [ ] TTFB (Time to First Byte)
  - [ ] FCP (First Contentful Paint)
  - [ ] INP (Interaction to Next Paint)
- [ ] Performance Summary logs after load:
  - [ ] DOM Content Loaded time
  - [ ] Page Load Complete time
  - [ ] DNS Lookup time
  - [ ] TCP Connection time
  - [ ] Request Time
  - [ ] DOM Processing time

### Lighthouse Audit
Run Lighthouse in Chrome DevTools:
- [ ] Performance score > 90
- [ ] Accessibility score > 90
- [ ] Best Practices score > 90
- [ ] SEO score = 100
- [ ] No console errors
- [ ] No 404 errors

---

## 15. SEO & Meta Tags

### All Pages
- [ ] Page title in browser tab updates per page
- [ ] Meta description present
- [ ] Open Graph tags (for social sharing)
- [ ] Helmet async working correctly
- [ ] No duplicate meta tags
- [ ] Canonical URLs correct

### Specific Pages to Check
- [ ] Homepage: "TradeFlows Pro - AI-Powered Professional Trading Platform"
- [ ] Features: mentions key features
- [ ] Pricing: mentions pricing tiers
- [ ] vs LuxAlgo: mentions comparison
- [ ] Knowledge Base: SEO-friendly article titles
- [ ] Blog: SEO-optimized post titles

---

## 16. UTM Tracking

### All External Links
- [ ] Navigation "Sign In": `utm_source=website&utm_medium=navigation&utm_campaign=signin`
- [ ] Navigation "Start Free Trial": `utm_source=website&utm_medium=navigation&utm_campaign=trial`
- [ ] Homepage hero CTA: `utm_source=website&utm_medium=hero&utm_campaign=trial`
- [ ] Pricing CTAs: Include plan-specific UTM parameters
- [ ] Comparison page CTAs: Include comparison UTM
- [ ] ROI Calculator CTA: `utm_source=website&utm_medium=roi-calculator&utm_campaign=conversions`
- [ ] Exit Intent popup trial button: `utm_source=website&utm_medium=exit_intent&utm_campaign=trial`

### Verify in Browser
- [ ] Right-click → Inspect links
- [ ] Check href attributes contain correct UTM parameters
- [ ] No broken or malformed URLs

---

## 17. Responsive Design

### Breakpoints to Test
- [ ] Desktop (1920px+)
- [ ] Laptop (1440px)
- [ ] Tablet (768px)
- [ ] Mobile (375px, 414px)
- [ ] Large mobile (480px)

### Layout Tests Per Breakpoint
- [ ] Navigation adapts correctly
- [ ] Hero sections scale properly
- [ ] Cards stack on mobile
- [ ] Tables scroll horizontally on mobile
- [ ] Images scale appropriately
- [ ] Text remains readable
- [ ] Buttons easily tappable
- [ ] Forms work on all devices
- [ ] No horizontal scrolling (except intentional)

---

## 18. Browser Compatibility

### Browsers to Test
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

### Features to Verify
- [ ] All pages render correctly
- [ ] JavaScript features work
- [ ] CSS gradients display
- [ ] Animations smooth
- [ ] Forms functional
- [ ] Navigation works

---

## 19. Accessibility

### Keyboard Navigation
- [ ] Tab through all interactive elements
- [ ] Focus indicators visible
- [ ] Can navigate entire site without mouse
- [ ] Modals can be closed with Escape key
- [ ] Forms accessible via keyboard

### Screen Reader Compatibility
- [ ] Images have alt text
- [ ] Buttons have aria-labels
- [ ] Form inputs have labels
- [ ] Landmark regions defined
- [ ] Heading hierarchy correct (h1 → h2 → h3)

### Color Contrast
- [ ] Text readable on all backgrounds
- [ ] Meets WCAG AA standards (4.5:1 for normal text)
- [ ] Links distinguishable
- [ ] Buttons have sufficient contrast

---

## 20. Error Handling

### 404 Page
- [ ] Displays for invalid routes
- [ ] Has helpful message
- [ ] Provides link back to homepage
- [ ] Styled consistently with site

### Form Errors
- [ ] Contact form shows validation errors
- [ ] Chat widget requires name and email
- [ ] Error messages are clear
- [ ] Fields highlight on error

### Network Errors
- [ ] Graceful handling if external links fail
- [ ] No uncaught JavaScript errors
- [ ] Console clean (no errors in production build)

---

## 21. Blog Automation

### Blog System Files
- [ ] `scripts/generateBlogPost.js` exists
- [ ] 20 SEO keywords array present
- [ ] 3 article templates defined:
  - [ ] Complete Guide
  - [ ] Common Mistakes
  - [ ] Comparison Article
- [ ] Content generation function works
- [ ] Adds posts to `src/data/blogPosts.js`

### Windows Task Scheduler (if set up)
- [ ] `scripts/schedule-blog-posts.bat` exists
- [ ] Task scheduled for 8:00 AM EST daily
- [ ] Task runs as expected
- [ ] Logs generated in `logs/blog-generation.log`

### Manual Test
```bash
node scripts/generateBlogPost.js
```
- [ ] Generates new blog post successfully
- [ ] Post appears in blog list
- [ ] Post URL works
- [ ] Content formatted correctly

---

## 22. Security

### Headers
- [ ] No sensitive information exposed
- [ ] External links use proper UTM tracking
- [ ] No API keys in client-side code
- [ ] Forms don't expose internal data

### Dependencies
- [ ] No known vulnerabilities:
  ```bash
  npm audit
  ```
- [ ] All dependencies up to date (or documented exceptions)

---

## 23. Final Pre-Deployment Checklist

### Code Quality
- [ ] No console.log statements in production
- [ ] No debugger statements
- [ ] No commented-out code blocks
- [ ] Code formatted consistently
- [ ] No TODO comments remaining

### Build
- [ ] Production build completes successfully:
  ```bash
  npm run build
  ```
- [ ] No build warnings
- [ ] Bundle sizes acceptable
- [ ] All assets copied to dist/

### Environment
- [ ] Environment variables configured (if any)
- [ ] Production URLs correct
- [ ] API endpoints point to production (if applicable)

### Documentation
- [ ] README.md up to date
- [ ] PERFORMANCE-OPTIMIZATIONS.md complete
- [ ] TESTING-CHECKLIST.md (this file) complete
- [ ] Blog automation README exists

### Deployment Preparation
- [ ] IONOS VPS access configured
- [ ] Deployment script ready (if applicable)
- [ ] DNS settings verified
- [ ] SSL certificate ready
- [ ] Backup of current site (if replacing existing)

---

## Testing Tools

### Recommended Tools
1. **Chrome DevTools**
   - Performance tab
   - Network tab
   - Lighthouse
   - Console

2. **Browser Extensions**
   - WAVE (accessibility)
   - axe DevTools (accessibility)
   - React Developer Tools
   - Web Vitals extension

3. **Online Tools**
   - [PageSpeed Insights](https://pagespeed.web.dev/)
   - [GTmetrix](https://gtmetrix.com/)
   - [WebPageTest](https://www.webpagetest.org/)
   - [Mobile-Friendly Test](https://search.google.com/test/mobile-friendly)

4. **Testing Commands**
   ```bash
   # Development server
   npm run dev

   # Production build
   npm run build

   # Preview production build
   npm run preview

   # Check for security vulnerabilities
   npm audit

   # Generate blog post
   node scripts/generateBlogPost.js

   # Update UTM parameters
   node scripts/add-utm-parameters.js
   ```

---

## Issue Tracking

### Found Issues Template
```markdown
**Issue:** [Brief description]
**Location:** [Page/component]
**Severity:** [Critical/High/Medium/Low]
**Steps to Reproduce:**
1.
2.
3.

**Expected Behavior:**
[What should happen]

**Actual Behavior:**
[What actually happens]

**Screenshots:**
[If applicable]

**Fix Applied:**
[Description of fix]
```

---

## Sign-Off

### Testing Completed By
- [ ] Name: _______________
- [ ] Date: _______________
- [ ] Build Version: _______________

### Approvals
- [ ] Developer: _______________
- [ ] QA: _______________
- [ ] Product Owner: _______________

### Ready for Deployment
- [ ] All critical issues resolved
- [ ] All tests passing
- [ ] Performance metrics met
- [ ] Accessibility standards met
- [ ] SEO optimized
- [ ] Security verified

---

**Last Updated:** October 9, 2025
**Version:** 1.0.0
