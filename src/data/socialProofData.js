/**
 * Social Proof Data - Dynamic notifications for building trust
 * Real-looking user actions with varied types and locations
 */

// Realistic first names pool
const firstNames = {
  male: ['Michael', 'David', 'Robert', 'James', 'Christopher', 'Daniel', 'Brian', 'Kevin', 'Thomas', 'Matthew', 'Andrew', 'Ryan', 'Jason', 'Jonathan', 'Nicholas', 'Steven', 'Timothy', 'Benjamin', 'Justin', 'Samuel'],
  female: ['Sarah', 'Jennifer', 'Amanda', 'Lisa', 'Emily', 'Michelle', 'Jessica', 'Ashley', 'Stephanie', 'Rachel', 'Lauren', 'Megan', 'Hannah', 'Samantha', 'Natalie', 'Victoria', 'Rebecca', 'Katherine', 'Elizabeth', 'Madison']
}

// Realistic last names pool
const lastNames = [
  'Rodriguez', 'Chen', 'Kim', 'Wilson', 'Taylor', 'Martinez', 'Anderson', 'Thompson',
  'Patel', 'Davis', 'Lee', 'Brown', 'White', 'Garcia', 'Johnson', 'Miller', 'Moore',
  'Martin', 'Jackson', 'Harris', 'Clark', 'Lewis', 'Walker', 'Hall', 'Allen', 'Young',
  'King', 'Wright', 'Scott', 'Green', 'Baker', 'Nelson', 'Carter', 'Mitchell', 'Roberts',
  'Phillips', 'Campbell', 'Parker', 'Evans', 'Edwards', 'Collins', 'Stewart', 'Morris',
  'Murphy', 'Cook', 'Rogers', 'Morgan', 'Peterson', 'Cooper', 'Reed', 'Bailey', 'Bell'
]

// Global locations with realistic distribution
export const locations = [
  // United States (major trading hubs)
  { city: 'New York', region: 'NY', country: 'USA', weight: 10 },
  { city: 'Chicago', region: 'IL', country: 'USA', weight: 7 },
  { city: 'San Francisco', region: 'CA', country: 'USA', weight: 8 },
  { city: 'Los Angeles', region: 'CA', country: 'USA', weight: 6 },
  { city: 'Boston', region: 'MA', country: 'USA', weight: 5 },
  { city: 'Seattle', region: 'WA', country: 'USA', weight: 5 },
  { city: 'Austin', region: 'TX', country: 'USA', weight: 5 },
  { city: 'Miami', region: 'FL', country: 'USA', weight: 4 },
  { city: 'Denver', region: 'CO', country: 'USA', weight: 3 },
  { city: 'Atlanta', region: 'GA', country: 'USA', weight: 4 },
  { city: 'Dallas', region: 'TX', country: 'USA', weight: 4 },
  { city: 'Phoenix', region: 'AZ', country: 'USA', weight: 3 },
  { city: 'San Diego', region: 'CA', country: 'USA', weight: 3 },
  { city: 'Nashville', region: 'TN', country: 'USA', weight: 2 },
  { city: 'Portland', region: 'OR', country: 'USA', weight: 3 },

  // International (financial centers)
  { city: 'London', region: '', country: 'UK', weight: 8 },
  { city: 'Singapore', region: '', country: 'SG', weight: 7 },
  { city: 'Hong Kong', region: '', country: 'HK', weight: 6 },
  { city: 'Tokyo', region: '', country: 'JP', weight: 5 },
  { city: 'Toronto', region: 'ON', country: 'Canada', weight: 4 },
  { city: 'Sydney', region: 'NSW', country: 'Australia', weight: 4 },
  { city: 'Frankfurt', region: '', country: 'Germany', weight: 3 },
  { city: 'Zurich', region: '', country: 'Switzerland', weight: 3 },
  { city: 'Dubai', region: '', country: 'UAE', weight: 3 },
  { city: 'Amsterdam', region: '', country: 'Netherlands', weight: 2 },
  { city: 'Paris', region: '', country: 'France', weight: 2 },
  { city: 'Seoul', region: '', country: 'South Korea', weight: 3 },
  { city: 'Mumbai', region: '', country: 'India', weight: 2 },
  { city: 'São Paulo', region: '', country: 'Brazil', weight: 2 }
]

// Notification types with templates
export const notificationTypes = {
  signup: {
    icon: '✨',
    templates: [
      'started their free trial',
      'joined TradeFlows Pro',
      'signed up for a trial',
      'created an account',
      'started trading'
    ],
    weight: 30
  },
  upgrade: {
    icon: '🚀',
    templates: [
      'upgraded to Professional',
      'upgraded to Premium',
      'went Pro',
      'subscribed to annual plan',
      'became a Pro member'
    ],
    weight: 15
  },
  trade: {
    icon: '📈',
    templates: [
      'made their first trade',
      'executed a winning trade',
      'completed a trade on AAPL',
      'just traded BTC',
      'placed a trade using AI strategy'
    ],
    weight: 25
  },
  profit: {
    icon: '💰',
    templates: [
      'achieved +15% profit this week',
      'hit their profit target',
      'made $2,500 this month',
      'earned their first profit',
      'reached +20% portfolio growth'
    ],
    weight: 10
  },
  milestone: {
    icon: '🎯',
    templates: [
      'reached 100 trades',
      'hit 50 consecutive winning days',
      'completed their first year',
      'achieved Elite Trader status',
      'earned Pro Trader badge'
    ],
    weight: 8
  },
  feature: {
    icon: '⚡',
    templates: [
      'activated AI strategy assistant',
      'enabled real-time alerts',
      'connected their broker account',
      'set up portfolio tracking',
      'started using backtesting'
    ],
    weight: 15
  },
  review: {
    icon: '⭐',
    templates: [
      'gave us 5 stars',
      'left a positive review',
      'rated us 5 stars',
      'recommended TradeFlows Pro',
      'wrote a testimonial'
    ],
    weight: 7
  }
}

/**
 * Generate a random name
 */
export function generateRandomName() {
  const gender = Math.random() > 0.5 ? 'male' : 'female'
  const firstName = firstNames[gender][Math.floor(Math.random() * firstNames[gender].length)]
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)]
  return `${firstName} ${lastName}`
}

/**
 * Generate a random location based on weights
 */
export function generateRandomLocation() {
  const totalWeight = locations.reduce((sum, loc) => sum + loc.weight, 0)
  let random = Math.random() * totalWeight

  for (const location of locations) {
    random -= location.weight
    if (random <= 0) {
      if (location.region) {
        return `${location.city}, ${location.region}`
      }
      return `${location.city}, ${location.country}`
    }
  }

  return 'New York, NY' // Fallback
}

/**
 * Generate a random notification type based on weights
 */
export function generateRandomNotificationType() {
  const totalWeight = Object.values(notificationTypes).reduce((sum, type) => sum + type.weight, 0)
  let random = Math.random() * totalWeight

  for (const [key, value] of Object.entries(notificationTypes)) {
    random -= value.weight
    if (random <= 0) {
      return { type: key, ...value }
    }
  }

  return { type: 'signup', ...notificationTypes.signup } // Fallback
}

/**
 * Generate a random time ago (in minutes)
 */
export function generateRandomTimeAgo() {
  // Weighted towards more recent times
  const random = Math.random()

  if (random < 0.4) {
    // 40% chance: 1-10 minutes ago
    const minutes = Math.floor(Math.random() * 10) + 1
    return minutes === 1 ? '1 minute ago' : `${minutes} minutes ago`
  } else if (random < 0.7) {
    // 30% chance: 10-30 minutes ago
    const minutes = Math.floor(Math.random() * 20) + 10
    return `${minutes} minutes ago`
  } else if (random < 0.9) {
    // 20% chance: 30-60 minutes ago
    const minutes = Math.floor(Math.random() * 30) + 30
    return `${minutes} minutes ago`
  } else {
    // 10% chance: 1-3 hours ago
    const hours = Math.floor(Math.random() * 3) + 1
    return hours === 1 ? '1 hour ago' : `${hours} hours ago`
  }
}

/**
 * Generate a random notification
 */
export function generateNotification() {
  const notificationType = generateRandomNotificationType()
  const template = notificationType.templates[
    Math.floor(Math.random() * notificationType.templates.length)
  ]

  return {
    type: notificationType.type,
    icon: notificationType.icon,
    name: generateRandomName(),
    location: generateRandomLocation(),
    action: template,
    time: generateRandomTimeAgo(),
    timestamp: Date.now()
  }
}

/**
 * Generate a pool of notifications
 */
export function generateNotificationPool(count = 50) {
  const notifications = []
  for (let i = 0; i < count; i++) {
    notifications.push(generateNotification())
  }
  return notifications
}

/**
 * Get random delay for next notification (in ms)
 * More realistic timing with varied intervals
 */
export function getRandomDelay() {
  const random = Math.random()

  if (random < 0.3) {
    // 30% chance: 5-10 seconds
    return (Math.random() * 5 + 5) * 1000
  } else if (random < 0.6) {
    // 30% chance: 10-20 seconds
    return (Math.random() * 10 + 10) * 1000
  } else if (random < 0.85) {
    // 25% chance: 20-40 seconds
    return (Math.random() * 20 + 20) * 1000
  } else {
    // 15% chance: 40-60 seconds
    return (Math.random() * 20 + 40) * 1000
  }
}

/**
 * Get display duration for notification (in ms)
 */
export function getDisplayDuration(notificationType) {
  // Longer for more important notifications
  const baseDuration = 6000 // 6 seconds

  const multipliers = {
    profit: 1.5,
    milestone: 1.3,
    upgrade: 1.2,
    trade: 1.0,
    signup: 0.9,
    feature: 0.9,
    review: 1.1
  }

  return baseDuration * (multipliers[notificationType] || 1.0)
}
