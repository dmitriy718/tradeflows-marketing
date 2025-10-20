/**
 * UTM Parameter Utility
 * Adds tracking parameters to external links for analytics
 */

/**
 * Build a URL with UTM parameters
 * @param {string} baseUrl - The base URL (e.g., 'https://app.tradeflows.net')
 * @param {Object} options - UTM parameters
 * @param {string} options.source - utm_source (e.g., 'website', 'blog')
 * @param {string} options.medium - utm_medium (e.g., 'homepage', 'pricing', 'cta')
 * @param {string} options.campaign - utm_campaign (e.g., 'hero-cta', 'vs-luxalgo')
 * @param {string} [options.content] - utm_content (optional)
 * @param {string} [options.term] - utm_term (optional)
 * @param {Object} [options.params] - Additional query parameters
 * @returns {string} - URL with UTM parameters
 */
export function buildUTMLink(baseUrl, options = {}) {
  const {
    source = 'website',
    medium = 'referral',
    campaign = 'general',
    content,
    term,
    params = {}
  } = options;

  const url = new URL(baseUrl);

  // Add UTM parameters
  url.searchParams.set('utm_source', source);
  url.searchParams.set('utm_medium', medium);
  url.searchParams.set('utm_campaign', campaign);

  if (content) url.searchParams.set('utm_content', content);
  if (term) url.searchParams.set('utm_term', term);

  // Add additional parameters
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });

  return url.toString();
}

/**
 * Pre-configured URL builders for common scenarios
 */

// App signup links
export const appSignupLink = (options = {}) => buildUTMLink(
  'https://app.tradeflows.net',
  {
    source: 'website',
    medium: options.medium || 'cta',
    campaign: options.campaign || 'signup',
    content: options.content,
    params: { signup: 'true', ...options.params }
  }
);

// App login links
export const appLoginLink = (options = {}) => buildUTMLink(
  'https://app.tradeflows.net',
  {
    source: 'website',
    medium: options.medium || 'navigation',
    campaign: options.campaign || 'login',
    content: options.content,
    params: options.params
  }
);

// Specific plan signup links
export const planSignupLink = (plan, options = {}) => buildUTMLink(
  'https://app.tradeflows.net',
  {
    source: 'website',
    medium: options.medium || 'pricing',
    campaign: options.campaign || `plan-${plan}`,
    content: options.content,
    params: { signup: 'true', plan, ...options.params }
  }
);

// Feature-specific links
export const featureLink = (feature, options = {}) => buildUTMLink(
  'https://app.tradeflows.net',
  {
    source: 'website',
    medium: options.medium || 'features',
    campaign: options.campaign || `feature-${feature}`,
    content: options.content,
    params: options.params
  }
);

// Blog CTA links
export const blogCTALink = (article, options = {}) => buildUTMLink(
  'https://app.tradeflows.net',
  {
    source: 'blog',
    medium: options.medium || 'article',
    campaign: options.campaign || article,
    content: options.content,
    params: { signup: 'true', ...options.params }
  }
);

// Comparison page links
export const comparisonLink = (competitor, options = {}) => buildUTMLink(
  'https://app.tradeflows.net',
  {
    source: 'website',
    medium: options.medium || 'comparison',
    campaign: options.campaign || `vs-${competitor}`,
    content: options.content,
    params: { signup: 'true', ...options.params }
  }
);

// ROI calculator links
export const roiCalculatorLink = (options = {}) => buildUTMLink(
  'https://app.tradeflows.net',
  {
    source: 'website',
    medium: options.medium || 'roi-calculator',
    campaign: options.campaign || 'conversions',
    content: options.content,
    params: { signup: 'true', ...options.params }
  }
);

/**
 * Get UTM parameters for current page
 * Useful for passing UTM data from landing page to app
 */
export function getCurrentUTMParams() {
  if (typeof window === 'undefined') return {};

  const params = new URLSearchParams(window.location.search);
  const utmParams = {};

  ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'].forEach(param => {
    if (params.has(param)) {
      utmParams[param] = params.get(param);
    }
  });

  return utmParams;
}

/**
 * Store UTM parameters in sessionStorage
 * Persists across page navigations
 */
export function storeUTMParams() {
  if (typeof window === 'undefined') return;

  const utmParams = getCurrentUTMParams();
  if (Object.keys(utmParams).length > 0) {
    sessionStorage.setItem('utmParams', JSON.stringify(utmParams));
  }
}

/**
 * Retrieve stored UTM parameters
 */
export function getStoredUTMParams() {
  if (typeof window === 'undefined') return {};

  const stored = sessionStorage.getItem('utmParams');
  return stored ? JSON.parse(stored) : {};
}

/**
 * Clear stored UTM parameters
 */
export function clearUTMParams() {
  if (typeof window === 'undefined') return;
  sessionStorage.removeItem('utmParams');
}
