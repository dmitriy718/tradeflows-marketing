// Knowledge Base Articles Data

export const kbCategories = [
  {
    id: 'getting-started',
    name: 'Getting Started',
    icon: '🚀',
    description: 'Everything you need to begin your trading journey'
  },
  {
    id: 'trading-features',
    name: 'Trading Features',
    icon: '📈',
    description: 'Learn about our advanced trading tools and capabilities'
  },
  {
    id: 'ai-strategies',
    name: 'AI & Strategies',
    icon: '🤖',
    description: 'Understanding AI-powered trading recommendations'
  },
  {
    id: 'portfolio',
    name: 'Portfolio Management',
    icon: '💼',
    description: 'Track and optimize your investment portfolio'
  },
  {
    id: 'technical-analysis',
    name: 'Technical Analysis',
    icon: '📊',
    description: 'Master charts, indicators, and analysis tools'
  },
  {
    id: 'account',
    name: 'Account & Billing',
    icon: '⚙️',
    description: 'Manage your subscription and account settings'
  }
]

export const kbArticles = [
  // Getting Started
  {
    id: 'quick-start-guide',
    category: 'getting-started',
    title: 'Quick Start Guide',
    description: 'Get up and running with TradeFlows Pro in 5 minutes',
    readTime: '5 min read',
    lastUpdated: '2024-01-15',
    content: `
# Quick Start Guide

Welcome to TradeFlows Pro! This guide will help you get started in just a few minutes.

## Step 1: Create Your Account

1. Click "Start Free Trial" on our homepage
2. Enter your email and create a strong password
3. Verify your email address
4. Complete your profile with basic information

## Step 2: Set Up Your Dashboard

Your dashboard is fully customizable:

- **Add Widgets**: Click the "+" button to add market data, charts, or watchlists
- **Arrange Layout**: Drag and drop widgets to your preferred positions
- **Save Layouts**: Create multiple dashboard layouts for different trading strategies
- **Set Preferences**: Choose your default market, currency, and time zone

## Step 3: Create Your First Watchlist

1. Navigate to the Markets tab
2. Search for symbols you want to track
3. Click the star icon to add to your watchlist
4. Organize symbols into custom lists (Stocks, Crypto, Forex, etc.)

## Step 4: Explore AI Recommendations

TradeFlows Pro's AI engine analyzes markets 24/7:

- View daily AI trade suggestions on your dashboard
- Each recommendation includes entry price, targets, and stop loss
- See confidence scores and risk/reward ratios
- Read detailed reasoning behind each suggestion

## Step 5: Set Up Alerts

Never miss a trading opportunity:

1. Go to Alerts in the main menu
2. Create price alerts for your watchlist symbols
3. Set up technical indicator alerts (RSI, MACD, etc.)
4. Enable AI signal notifications
5. Choose delivery method (email, SMS, push notification)

## Next Steps

- Explore our [Advanced Charting Tools](#advanced-charting)
- Learn about [Portfolio Tracking](#portfolio-basics)
- Understand [Risk Management](#risk-management-101)
- Join our [Community Forum](#)

## Need Help?

Our support team is here 24/7:
- Live chat in the app
- Email: support@tradeflows.net
- Phone: 1-800-TRADE-PRO
    `
  },
  {
    id: 'account-setup',
    category: 'getting-started',
    title: 'Account Setup & Verification',
    description: 'Complete guide to setting up and verifying your account',
    readTime: '7 min read',
    lastUpdated: '2024-01-15',
    content: `
# Account Setup & Verification

Setting up your TradeFlows Pro account properly ensures you get the most from our platform.

## Creating Your Account

### Email Registration

1. Visit https://app.tradeflows.net/signup
2. Enter a valid email address
3. Create a strong password (minimum 12 characters, including uppercase, lowercase, numbers, and symbols)
4. Agree to our Terms of Service and Privacy Policy
5. Click "Create Account"

### Email Verification

- Check your inbox for a verification email from noreply@tradeflows.net
- Click the verification link within 24 hours
- If you do not receive it, check your spam folder
- Request a new verification email from the login page if needed

## Profile Setup

### Personal Information

Complete your profile for a personalized experience:

- **Full Name**: Used for account identification
- **Country/Region**: Determines available markets and regulations
- **Time Zone**: Ensures accurate timestamps on all data
- **Language**: Choose from 12 supported languages
- **Currency**: Set your preferred display currency

### Trading Profile

Help our AI understand your trading style:

- **Experience Level**: Beginner, Intermediate, Advanced, Professional
- **Trading Goals**: Day trading, swing trading, long-term investing
- **Risk Tolerance**: Conservative, Moderate, Aggressive
- **Preferred Markets**: Stocks, Crypto, Forex, Commodities, Options
- **Capital Allocation**: Approximate trading capital range

### Security Settings

Protect your account:

- **Two-Factor Authentication (2FA)**: Enable SMS or authenticator app
- **Security Questions**: Set up 3 recovery questions
- **Trusted Devices**: Manage devices with automatic login
- **Login Notifications**: Get alerted to new login attempts
- **API Keys**: Generate keys for third-party integrations (Professional plan only)

## Account Verification

### Why Verify?

- Access to all platform features
- Higher trading limits
- Priority customer support
- Compliance with financial regulations

### Verification Levels

**Level 1: Email Verification**
- Confirms your email address
- Required for all users
- Instant verification

**Level 2: Identity Verification**
- Upload government-issued ID
- Selfie for facial recognition
- Unlocks full platform access
- Processed within 24 hours

**Level 3: Address Verification**
- Utility bill or bank statement
- Required for Professional plan
- Enables API access and higher limits
- Processed within 48 hours

### Required Documents

Acceptable identification documents:
- Passport
- Driver's license
- National ID card
- Residence permit

Address proof must be dated within 3 months:
- Utility bill (electricity, water, gas)
- Bank statement
- Government correspondence
- Lease agreement

### Verification Process

1. Navigate to Settings > Account Verification
2. Select verification level
3. Upload clear, unedited photos of documents
4. Submit for review
5. Receive email notification upon approval

## Subscription & Billing

### Free Trial

- 7 days of full Premium access
- No credit card required
- Automatically downgrades to free tier after trial
- Can upgrade to paid plan anytime

### Choosing a Plan

Compare plans at https://tradeflows.net/pricing:

- **Premium**: $49.99/month - Full trading features
- **Professional**: $79.99/month - Advanced tools + API access

### Payment Methods

Accepted payment methods:
- Credit cards (Visa, Mastercard, Amex, Discover)
- Debit cards
- PayPal (coming soon)
- Bank transfer for annual subscriptions

### Billing Cycle

- Monthly: Billed on the same day each month
- Annual: Save 20% with yearly billing
- Auto-renewal: Automatic unless canceled
- Prorated upgrades: Only pay the difference when upgrading

## Account Management

### Updating Information

Change account details anytime:
1. Go to Settings > Profile
2. Edit the information you want to change
3. Verify changes via email if updating sensitive data
4. Changes take effect immediately

### Privacy Settings

Control your data:
- **Data Sharing**: Opt in/out of analytics
- **Marketing Emails**: Manage communication preferences
- **Public Profile**: Show/hide your profile in community features
- **Trading History**: Choose what data to share with AI analysis

### Account Deletion

If you need to delete your account:
1. Go to Settings > Account > Delete Account
2. Export your data first (we delete everything after 90 days)
3. Confirm deletion via email
4. All data permanently deleted after 90-day grace period

## Getting Help

Having trouble with account setup?

- **Live Chat**: Click the chat icon (bottom right)
- **Email Support**: support@tradeflows.net
- **Phone Support**: 1-800-TRADE-PRO (Professional plan)
- **Help Center**: https://help.tradeflows.net
- **Community Forum**: https://community.tradeflows.net
    `
  },

  // Trading Features
  {
    id: 'real-time-data',
    category: 'trading-features',
    title: 'Real-Time Market Data',
    description: 'Understanding our comprehensive market data coverage',
    readTime: '8 min read',
    lastUpdated: '2024-01-14',
    content: `
# Real-Time Market Data

TradeFlows Pro provides institutional-grade market data across all major asset classes.

## Market Coverage

### Stocks & ETFs

**US Markets:**
- NYSE, NASDAQ, AMEX
- 10,000+ stocks and ETFs
- Real-time Level 1 quotes (all plans)
- Level 2 market depth (Premium+)
- Pre-market & after-hours data
- Corporate actions (splits, dividends)

**International Markets:**
- London Stock Exchange (LSE)
- Tokyo Stock Exchange (TSE)
- Hong Kong Stock Exchange (HKEX)
- Toronto Stock Exchange (TSX)
- 15+ additional exchanges
- Delayed quotes (15-20 minutes) or real-time (Professional plan)

### Cryptocurrency

**Coverage:**
- 500+ cryptocurrencies
- 1,000+ trading pairs
- Top exchanges: Binance, Coinbase, Kraken, FTX, Gemini
- DeFi tokens and stablecoins
- Real-time order book data

**Unique Features:**
- Cross-exchange price comparison
- Liquidity analysis
- On-chain metrics (whale movements, network activity)
- Social sentiment indicators

### Forex

**Major Pairs:**
- EUR/USD, GBP/USD, USD/JPY, USD/CHF
- AUD/USD, USD/CAD, NZD/USD

**Minor & Exotic Pairs:**
- 80+ currency pairs
- Emerging market currencies
- Cryptocurrency/fiat pairs

**Data Points:**
- Real-time bid/ask spreads
- Central bank rates
- Economic calendar integration
- Correlation matrices

### Commodities

**Metals:**
- Gold, Silver, Platinum, Palladium, Copper

**Energy:**
- Crude Oil (WTI, Brent), Natural Gas, Heating Oil

**Agriculture:**
- Corn, Wheat, Soybeans, Coffee, Sugar, Cotton

**Data Coverage:**
- Futures contracts (all expirations)
- Spot prices
- Contango/backwardation analysis
- Seasonal patterns

## Data Quality & Speed

### Latency

- **Premium Plan**: <100ms average latency
- **Professional Plan**: <50ms average latency
- **Direct Exchange Feeds**: Available for institutional clients

### Update Frequency

- Stocks: Real-time (sub-second updates)
- Crypto: Real-time (tick-by-tick)
- Forex: Real-time (tick-by-tick)
- Commodities: Real-time during trading hours

### Accuracy

- Direct exchange feeds (not third-party aggregators)
- Redundant data sources for reliability
- Automatic error detection and correction
- 99.99% uptime guarantee

## Data Features

### Level 1 Data (All Plans)

- Last trade price
- Bid/ask prices
- Volume
- Daily high/low/open/close
- Previous close
- Market status

### Level 2 Data (Premium+)

- Full order book depth
- Market maker quotes
- Order size at each price level
- Time & sales (tape)
- Order flow analysis
- Market maker identification

### Historical Data

**Free Trial:**
- 1 year of daily data
- Intraday data (1-minute bars) for 30 days

**Premium:**
- 5 years of daily data
- 1 year of intraday data (1-minute bars)
- Adjusted for splits and dividends

**Professional:**
- Unlimited historical data
- Tick-by-tick data available
- Custom data exports
- API access to historical database

## Market Information

### News & Events

Real-time news integration:
- Breaking news alerts
- Earnings releases
- Economic reports
- Regulatory filings (SEC, FINRA)
- Social media sentiment
- Analyst ratings changes

### Economic Calendar

Track market-moving events:
- Federal Reserve meetings
- Unemployment reports
- GDP releases
- Inflation data (CPI, PPI)
- Central bank decisions worldwide
- Customizable alerts for specific events

### Corporate Actions

Automatic tracking of:
- Stock splits
- Dividend payments
- Merger & acquisition announcements
- Earnings reports
- Shareholder meetings
- Rights offerings

## Data Visualization

### Real-Time Charts

Available chart types:
- Line charts
- Candlestick (Japanese, Heikin-Ashi)
- Bar charts (OHLC)
- Area charts
- Renko
- Point & Figure
- Kagi
- Three Line Break

### Timeframes

From 1-second to monthly:
- Tick charts
- 1, 5, 15, 30-minute bars
- 1, 2, 4-hour bars
- Daily, weekly, monthly
- Custom timeframes (Professional plan)

### Multiple Data Streams

- Compare up to 10 symbols simultaneously
- Overlay different asset classes
- Synchronized time periods
- Custom correlation analysis

## Data Export & API

### Manual Export (Premium+)

Export formats:
- CSV
- Excel (XLSX)
- JSON (Professional)
- XML (Professional)

### API Access (Professional Only)

RESTful API features:
- 10,000 requests per day
- Real-time WebSocket connections
- Historical data queries
- Symbol search and metadata
- Comprehensive documentation
- Client libraries (Python, JavaScript, Java, C#)

API endpoints:
- \`/quotes\` - Real-time quotes
- \`/bars\` - Historical OHLCV data
- \`/trades\` - Time & sales
- \`/orderbook\` - Level 2 data
- \`/news\` - Market news feed

### Third-Party Integrations

Connect TradeFlows Pro with:
- TradingView (import charts)
- Excel (live data feed)
- Python trading bots
- Portfolio tracking apps
- Tax software

## Mobile Data Access

### Mobile Apps

Full data access on iOS and Android:
- Real-time streaming quotes
- Interactive charts
- Watchlist synchronization
- Push notifications for price alerts
- Offline mode (cached data)

### Bandwidth Optimization

- Adaptive streaming (adjust to connection speed)
- Data compression
- Background refresh options
- WiFi-only mode available

## Data Privacy & Security

### Encryption

- 256-bit SSL/TLS encryption
- End-to-end data protection
- Secure WebSocket connections

### Compliance

- SOC 2 Type II certified
- GDPR compliant
- SEC/FINRA data distribution requirements
- Exchange data licensing agreements

## Troubleshooting

### Data Not Updating?

1. Check your internet connection
2. Verify market is open (trading hours)
3. Confirm subscription is active
4. Clear browser cache
5. Contact support if issue persists

### Delayed Quotes?

- Some international markets have 15-20 minute delays (free/Premium)
- Upgrade to Professional for real-time international data
- Check exchange permissions in Settings

### Missing Symbols?

- Search using ticker symbol or company name
- Try alternate exchanges (e.g., AAPL vs AAPL.US)
- Some symbols require specific market data subscriptions
- Contact support to request new symbols

## Future Enhancements

Coming in 2024:

- **Options Data**: Full options chains, Greeks, IV analysis
- **Fixed Income**: Government and corporate bonds
- **Alternative Data**: Satellite imagery, credit card data
- **Custom Indices**: Create and track your own market indices
- **Machine Learning Datasets**: Prepared datasets for algo trading
    `
  },

  // AI Strategies
  {
    id: 'ai-recommendations',
    category: 'ai-strategies',
    title: 'Understanding AI Trade Recommendations',
    description: 'How our AI analyzes markets and generates trade ideas',
    readTime: '10 min read',
    lastUpdated: '2024-01-13',
    content: `
# Understanding AI Trade Recommendations

TradeFlows Pro's AI engine analyzes millions of data points to identify high-probability trading opportunities.

## How Our AI Works

### Data Sources

Our AI processes:
- **Price Data**: 10+ years of historical price action across all markets
- **Technical Indicators**: 100+ indicators calculated in real-time
- **Fundamental Data**: Earnings, revenue, margins, growth rates
- **News Sentiment**: NLP analysis of 10,000+ news sources daily
- **Social Media**: Twitter, Reddit, StockTwits sentiment analysis
- **Economic Indicators**: GDP, unemployment, inflation, interest rates
- **Market Microstructure**: Order flow, volume profile, bid-ask spreads
- **Alternative Data**: Web traffic, satellite imagery, credit card data

### Machine Learning Models

We use ensemble learning with multiple models:

**Pattern Recognition:**
- Convolutional Neural Networks (CNN) for chart pattern detection
- Identifies head & shoulders, triangles, flags, double tops/bottoms
- Success rate: 72% accuracy on historical backtests

**Sentiment Analysis:**
- Natural Language Processing (NLP) for news and social media
- Classifies sentiment as bullish, bearish, or neutral
- Real-time sentiment scores for 5,000+ symbols

**Price Prediction:**
- LSTM (Long Short-Term Memory) networks for time series forecasting
- Predicts price movements 1-30 days ahead
- Confidence intervals for risk assessment

**Anomaly Detection:**
- Identifies unusual price/volume patterns
- Flags potential breakouts or reversals
- Early warning system for black swan events

### Training & Optimization

- Models retrained weekly on latest market data
- Walk-forward optimization to prevent overfitting
- Out-of-sample testing on 20% of data
- Continuous performance monitoring
- A/B testing of new model versions

## Types of AI Recommendations

### Daily Trade Ideas

**Swing Trades (2-10 days):**
- 5-10 ideas generated daily
- Focus on high-probability setups
- Typical risk/reward: 1:2 or better
- Confidence scores: 60-95%

**Day Trades (Intraday):**
- 10-20 ideas during market hours
- Momentum plays and mean reversion
- Quick entries and exits
- Higher frequency, smaller position sizes

**Long-Term Positions (Weeks to months):**
- 3-5 ideas per week
- Fundamental + technical analysis
- Portfolio building suggestions
- Lower turnover strategies

### Signal Types

**Bullish Signals:**
- 🟢 **Strong Buy**: Confidence >80%, multiple confirmations
- 🟢 **Buy**: Confidence 65-80%, good setup
- 🟡 **Weak Buy**: Confidence 60-65%, monitor closely

**Bearish Signals:**
- 🔴 **Strong Sell**: Confidence >80%, clear downtrend
- 🔴 **Sell**: Confidence 65-80%, weakness detected
- 🟡 **Weak Sell**: Confidence 60-65%, caution advised

**Neutral:**
- ⚪ **Hold**: No clear direction, wait for better entry
- ⚪ **Avoid**: High risk, low probability

## Reading AI Recommendations

### Recommendation Card

Each AI recommendation includes:

**Symbol & Direction**
- Ticker symbol (e.g., AAPL)
- Trade direction (Long/Short)
- Asset class icon

**Entry Details**
- Recommended entry price
- Entry time window (e.g., "Next 2 days")
- Multiple entry points (scale in)

**Targets & Stops**
- Target price 1 (conservative)
- Target price 2 (moderate)
- Target price 3 (aggressive)
- Stop loss price
- Trailing stop recommendation

**Risk/Reward Analysis**
- Risk amount (distance to stop)
- Reward potential (distance to target)
- Risk/Reward ratio (e.g., 1:3)
- Suggested position size

**Confidence Score**
- Percentage: 60-95%
- Visual gauge (color-coded)
- Historical accuracy for similar setups

**Reasoning**
Detailed explanation including:
- Pattern identified (e.g., "Cup and handle breakout")
- Supporting indicators (e.g., "RSI oversold, MACD bullish cross")
- Fundamental catalysts (e.g., "Earnings beat expectations")
- Sentiment analysis (e.g., "Social sentiment turning bullish")
- Market context (e.g., "Sector rotation into tech")

### Example Recommendation

**Symbol:** AAPL (Apple Inc.)
**Direction:** LONG
**Asset:** Stock

**Entry:** $175.50 - $177.00
**Entry Window:** Next 48 hours
**Scale In:** 50% at $176.50, 50% at $175.50

**Targets:**
- T1: $182.00 (+3.4%) - Conservative
- T2: $186.50 (+6.3%) - Moderate
- T3: $192.00 (+9.1%) - Aggressive

**Stop Loss:** $172.00 (-2.5%)
**Trailing Stop:** Activate at T1, trail by $3.00

**Risk/Reward:** 1:2.5
**Position Size:** 2-3% of portfolio
**Confidence:** 78%

**Reasoning:**
• Bullish engulfing pattern on daily chart
• Break above 50-day moving average ($175)
• RSI(14) at 58 (neutral to bullish)
• MACD bullish crossover confirmed
• Strong earnings report last week (+12% revenue beat)
• Sector rotation favoring large-cap tech
• Social sentiment score: 8.2/10 (very bullish)
• Institution accumulation detected (13F filings)

## Acting on Recommendations

### Best Practices

**1. Due Diligence**
- Do not blindly follow AI recommendations
- Verify the setup aligns with your analysis
- Check current news and market conditions
- Ensure it fits your trading strategy

**2. Position Sizing**
- Follow suggested position sizes
- Never risk more than 2% per trade
- Adjust for account size and risk tolerance
- Consider correlation with existing positions

**3. Entry Execution**
- Use limit orders at suggested entry prices
- Scale in with multiple entries if recommended
- Set alerts instead of market orders
- Do not chase if price runs away

**4. Exit Planning**
- Set stop loss immediately after entry
- Use trailing stops to lock in profits
- Take partial profits at each target
- Do not get greedy - stick to the plan

**5. Trade Management**
- Monitor position regularly
- Adjust stops as price moves in your favor
- Be ready to exit if thesis breaks
- Review performance after trade closes

### Risk Management

**Recommendations Include:**
- Maximum risk per trade (usually 1-2%)
- Suggested position size based on account
- Stop loss placement for risk control
- Correlation warnings (avoid overlapping risk)

**Your Responsibilities:**
- Verify calculations match your account size
- Adjust for personal risk tolerance
- Consider transaction costs
- Do not over-leverage

## Customizing AI Settings

### Risk Profile

Adjust AI to match your style:

**Conservative:**
- Higher confidence threshold (>75%)
- Wider stops, longer holding periods
- Lower position sizes
- Fewer recommendations (higher quality)

**Moderate:**
- Balanced confidence (>65%)
- Standard risk/reward (1:2)
- Moderate position sizes
- 5-10 ideas daily

**Aggressive:**
- Lower confidence OK (>60%)
- Tighter stops, faster trades
- Larger position sizes
- More recommendations (higher quantity)

### Market Preferences

Filter recommendations by:
- **Asset Classes**: Stocks, crypto, forex, commodities
- **Market Cap**: Large, mid, small cap
- **Sectors**: Technology, healthcare, finance, etc.
- **Geographies**: US, international, emerging markets
- **Strategies**: Momentum, mean reversion, breakouts, etc.

### Notification Settings

Control how you receive alerts:
- Email summaries (daily/weekly)
- SMS for high-confidence ideas (>80%)
- Push notifications (mobile app)
- In-app alerts
- Webhook integrations (Professional plan)

## AI Performance Tracking

### Historical Results

View AI performance metrics:
- **Win Rate**: Percentage of profitable trades
- **Avg Win/Loss**: Size of wins vs losses
- **Profit Factor**: Gross profit / gross loss
- **Max Drawdown**: Largest peak-to-trough decline
- **Sharpe Ratio**: Risk-adjusted returns
- **By Asset Class**: Performance breakdown
- **By Strategy Type**: Which patterns work best
- **By Market Condition**: Bull vs bear vs sideways

### Transparency

We provide full disclosure:
- All recommendations tracked (no cherry-picking)
- Historical accuracy by confidence level
- Monthly performance reports
- Backtesting results
- Model update changelog

### Continuous Improvement

How we improve AI over time:
- User feedback integration
- Failed trade analysis
- Market regime detection
- New data sources
- Model architecture upgrades

## Limitations & Disclaimers

### What AI Can't Do

- **Predict the Future**: AI provides probabilities, not certainties
- **Account for Black Swans**: Unexpected events can invalidate any model
- **Replace Judgment**: Human oversight is essential
- **Guarantee Profits**: Markets are inherently uncertain
- **Time the Market Perfectly**: Some losses are inevitable

### Past Performance

- Historical results do not guarantee future performance
- Backtested results may differ from live trading
- Slippage and commissions affect real-world returns
- Market conditions change over time

### Your Responsibility

- You make the final decision on every trade
- AI is a tool to assist, not replace, your analysis
- Always use proper risk management
- Never invest more than you can afford to lose
- Understand the trade before entering

## Getting Help

Questions about AI recommendations?

- **Tutorial Videos**: Step-by-step guides in the app
- **Webinars**: Weekly live Q&A sessions
- **Support**: Chat, email, or phone support
- **Community**: Discuss strategies with other traders
- **Blog**: Deep dives into AI methodology

## Coming Soon

Future AI enhancements:

- **Options Strategies**: AI-powered options trade ideas
- **Portfolio Optimization**: AI-suggested portfolio allocations
- **Auto-Trading**: Execute AI trades automatically (with approval)
- **Custom AI Models**: Train AI on your own strategy
- **Backtesting**: Test AI recommendations on historical data
- **Paper Trading**: Practice AI trades without real money
    `
  },

  // Portfolio Management
  {
    id: 'portfolio-tracking',
    category: 'portfolio',
    title: 'Portfolio Tracking & Analytics',
    description: 'Comprehensive guide to managing your investment portfolio',
    readTime: '12 min read',
    lastUpdated: '2024-01-12',
    content: `
# Portfolio Tracking & Analytics

TradeFlows Pro offers institutional-grade portfolio management tools for traders and investors.

## Setting Up Your Portfolio

### Adding Positions

**Manual Entry:**
1. Navigate to Portfolio tab
2. Click "Add Position"
3. Enter symbol, quantity, entry price, entry date
4. Add notes and tags (optional)
5. Click "Save"

**Import from Broker:**
- Connect your brokerage account (supported brokers: Interactive Brokers, TD Ameritrade, E*TRADE, Robinhood, Coinbase)
- Auto-sync holdings and transactions
- Real-time position updates
- Historical trade imports

**CSV Upload:**
- Download our template
- Fill in: Symbol, Quantity, Entry Price, Date, Type (long/short)
- Upload file to Portfolio > Import
- Review and confirm imported positions

### Multiple Portfolios

Organize holdings into separate portfolios:

**Use Cases:**
- Retirement account vs taxable account
- Long-term holdings vs short-term trades
- Different strategies (growth, income, speculation)
- Family members' accounts
- Paper trading vs live trading

**Management:**
- Create unlimited portfolios (all plans)
- Switch between portfolios with one click
- Combined view of all portfolios
- Individual or consolidated reporting

### Cash & Dividends

**Cash Tracking:**
- Enter cash deposits/withdrawals
- Track available buying power
- Monitor cash allocation percentage
- View cash flow history

**Dividend Management:**
- Automatic dividend tracking
- Reinvestment options
- Dividend calendar (upcoming payments)
- Yield on cost calculations
- Historical dividend income

## Performance Analytics

### P&L (Profit & Loss)

**Real-Time P&L:**
- Total portfolio value
- Unrealized gains/losses (open positions)
- Realized gains/losses (closed positions)
- Daily P&L change
- P&L by position, sector, asset class

**Historical Performance:**
- Daily, weekly, monthly, yearly returns
- Total return since inception
- CAGR (Compound Annual Growth Rate)
- Best/worst days, months, years
- Recovery from drawdowns

**Performance Charts:**
- Equity curve (portfolio value over time)
- Cumulative returns
- Monthly returns heat map
- Comparison to benchmarks (S&P 500, NASDAQ, etc.)
- Risk-adjusted returns (Sharpe, Sortino ratios)

### Position Analysis

**Current Holdings:**
- Position size (shares/units)
- Market value
- Entry price vs current price
- Unrealized gain/loss ($  and %)
- Percentage of portfolio
- Days held
- Cost basis (average cost for multiple entries)

**Position Performance:**
- Best performers (top 10)
- Worst performers (bottom 10)
- Largest positions by value
- Winners vs losers count
- Long vs short performance

**Sector & Asset Allocation:**
- Pie charts by sector
- Allocation by asset class
- Geographic exposure
- Market cap distribution
- Custom groupings

### Risk Metrics

**Portfolio Risk:**
- **Volatility**: Standard deviation of returns
- **Beta**: Sensitivity to market movements
- **Sharpe Ratio**: Risk-adjusted returns
- **Maximum Drawdown**: Largest peak-to-trough decline
- **Value at Risk (VaR)**: Potential loss at 95% confidence
- **Correlation Matrix**: How positions move together

**Position-Level Risk:**
- Position volatility
- Beta to portfolio
- Contribution to portfolio risk
- Concentration risk warnings
- Diversification score

**Stress Testing:**
- Simulate market crashes (-20%, -30%, -40%)
- Sector-specific shocks
- Interest rate changes
- Currency fluctuations
- Custom scenarios

## Portfolio Optimization

### Rebalancing

**Why Rebalance:**
- Maintain target allocation
- Lock in profits from winners
- Buy dips in losers
- Control risk creep

**Rebalancing Tools:**
- Target allocation vs actual
- Suggested trades to rebalance
- Tax-efficient rebalancing (harvest losses)
- Auto-rebalancing (Professional plan)
- Threshold-based or calendar-based

**Example:**

**Target:** 60% Stocks, 30% Bonds, 10% Cash
**Current:** 68% Stocks, 24% Bonds, 8% Cash

**Suggestions:**
• Sell $15,000 of stocks
• Buy $10,000 of bonds
• Deposit $5,000 cash

**Expected result:** Back to target allocation

### Diversification Analysis

**Diversification Score:**
- 0-100 scale
- Factors: number of positions, correlation, concentration
- Color-coded: Red (<40), Yellow (40-70), Green (>70)
- Improvement suggestions

**Concentration Warnings:**
- Alert if position >10% of portfolio
- Sector over-concentration (>25%)
- Single-asset class >80%
- Geographic concentration
- Correlated positions

### Asset Allocation Recommendations

AI-powered allocation suggestions:

**Based On:**
- Age and retirement timeline
- Risk tolerance
- Investment goals
- Current market conditions
- Historical optimal allocations

**Suggested Allocations:**
- Conservative: 70% bonds, 20% stocks, 10% cash
- Moderate: 50% stocks, 40% bonds, 10% cash
- Aggressive: 80% stocks, 15% bonds, 5% cash
- All-weather: 40% stocks, 40% bonds, 10% gold, 10% commodities

## Trade Journal

### Recording Trades

**Automatic Recording:**
- All trades logged automatically
- Entry/exit prices
- P&L calculations
- Holding period
- Position size

**Manual Additions:**
- Add notes and tags
- Attach screenshots
- Rate trade quality (1-5 stars)
- Mark as mistake/good trade
- Link to strategy or setup

### Trade Analysis

**Trade Statistics:**
- Total trades: 247
- Win rate: 64.8%
- Average win: $432
- Average loss: $287
- Profit factor: 1.85
- Largest win: $3,240
- Largest loss: $1,650
- Average hold time: 4.2 days

**By Strategy:**
- Momentum trades: 72% win rate
- Mean reversion: 58% win rate
- Breakouts: 61% win rate
- Trend following: 68% win rate

**By Market Condition:**
- Bull market: 70% win rate
- Bear market: 48% win rate
- Sideways: 62% win rate

**By Time:**
- Monday: 59% win rate
- Tuesday: 68% win rate
- Wednesday: 66% win rate
- Thursday: 63% win rate
- Friday: 61% win rate

### Improvement Insights

AI-powered trading insights:

- "Your win rate on momentum trades is 12% higher - focus more on this strategy"
- "You tend to exit winning trades too early (avg +2.1%), consider wider targets"
- "Your losses average 3.2% but wins only 2.8% - improve risk/reward ratio"
- "Friday trades underperform - avoid initiating new positions late week"
- "You're overtrading - your best months had 50% fewer trades"

## Tax Reporting

### Tax Documents

**Available Reports:**
- Realized gains/losses
- Dividend income
- Interest income
- Form 8949 (capital gains)
- Schedule D
- Wash sale adjustments
- Cost basis calculations

**Export Formats:**
- PDF
- CSV
- TurboTax-compatible
- H&R Block-compatible
- Direct to accountant

### Tax Optimization

**Tax-Loss Harvesting:**
- Identify positions with losses
- Sell to offset gains
- Automatic wash sale rule tracking
- Replacement security suggestions
- Estimated tax savings

**Long-Term vs Short-Term:**
- Visual indicators (held <1 year vs >1 year)
- Tax rate differences
- Calendar to optimal sale dates
- Notifications before 1-year mark

**Example:**

**Position:** TSLA
**Unrealized Loss:** -$2,450
**Held:** 157 days (short-term)

**Options:**
1. Harvest loss now → Save $612 in taxes (25% rate)
2. Wait 208 days for long-term → Lower future tax rate
3. Hold if thesis still valid

**Wash Sale Warning:**
Do not buy TSLA for 30 days after selling
Consider alternatives: RIVN, LCID, NIO

## Benchmarking

### Compare to Indices

Track performance vs:
- S&P 500
- NASDAQ 100
- Dow Jones
- Russell 2000
- MSCI World
- Sector-specific indices
- Custom benchmarks

**Metrics:**
- Absolute return difference
- Risk-adjusted returns (alpha)
- Correlation
- Beta
- Tracking error

### Peer Comparison

Compare to other TradeFlows Pro users:

- Users with similar portfolio size
- Same risk profile
- Same preferred markets
- Your performance percentile
- Anonymous leaderboards

**Privacy:**
- All data aggregated and anonymized
- Opt-in feature only
- No identifying information shared

## Alerts & Notifications

### Portfolio Alerts

Set up alerts for:

**Value Alerts:**
- Portfolio drops below $X
- Daily loss exceeds $X or X%
- Unrealized loss exceeds $X
- Portfolio hits all-time high

**Position Alerts:**
- Position gains/loses X%
- Position becomes X% of portfolio
- Dividend payment received
- Corporate action (split, merger)

**Risk Alerts:**
- Portfolio volatility spikes
- Correlation increases (concentrated risk)
- Maximum drawdown exceeded
- Margin call warning

### Notification Channels

Receive alerts via:
- Email
- SMS
- Push notifications (mobile app)
- In-app notifications
- Webhooks (Professional plan)

## Mobile Portfolio Management

### Mobile App Features

Full portfolio access on iOS/Android:

**View:**
- Real-time portfolio value
- Position list with current P&L
- Performance charts
- Risk metrics dashboard

**Manage:**
- Add/edit/delete positions
- Record trades
- View trade journal
- Rebalance suggestions

**Alerts:**
- Push notifications
- Portfolio value widgets
- Today view summary

**Offline Mode:**
- View cached portfolio data
- Edit positions (sync when online)
- Performance reports

## Advanced Features (Professional Plan)

### API Access

Programmatic portfolio management:

**Endpoints:**
- \`/portfolio\` - Get all positions
- \`/portfolio/performance\` - Historical returns
- \`/portfolio/risk\` - Risk metrics
- \`/trades\` - Trade journal
- \`/portfolio/rebalance\` - Rebalancing suggestions

**Use Cases:**
- Custom reporting
- Integration with other tools
- Automated strategies
- Portfolio consolidation across platforms

### Custom Reports

Build tailored reports:

**Report Builder:**
- Drag-and-drop interface
- 50+ metrics and charts
- Custom date ranges
- Saved templates
- Scheduled delivery (daily/weekly/monthly)

**Sharing:**
- PDF export
- Link sharing (read-only)
- Team collaboration
- Client reports (for advisors)

### Multi-Account Management

Manage multiple client portfolios:

**Features:**
- Unlimited sub-accounts
- Consolidated or individual views
- Performance comparison
- Family account tracking
- Advisor-client permissions

## Data Security

### Encryption

- 256-bit SSL/TLS encryption
- Encrypted data at rest
- Secure cloud backups
- Multi-factor authentication

### Privacy

- Your portfolio data is never shared
- Opt-in for benchmarking features
- Export and delete data anytime
- GDPR compliant

### Backups

- Automatic daily backups
- 90-day retention
- Point-in-time recovery
- Manual backup export

## Getting Help

Need assistance with portfolio features?

- **Video Tutorials**: Portfolio setup guides
- **Live Support**: Chat with our team
- **Webinars**: Weekly portfolio optimization sessions
- **Help Center**: Detailed documentation
- **Community**: Share strategies with other users

## Coming Soon

Planned portfolio features:

- **Crypto Portfolio Tracking**: Full DeFi integration
- **Options Tracking**: Track options positions and Greeks
- **Margin Analysis**: Margin requirements and usage
- **Scenario Analysis**: What-if portfolio simulations
- **Social Trading**: Follow top traders' portfolios
- **Robo-Advisor**: AI-managed portfolio option
    `
  },

  // Technical Analysis
  {
    id: 'advanced-charting',
    category: 'technical-analysis',
    title: 'Advanced Charting Tools',
    description: 'Master professional charting and technical analysis tools',
    readTime: '15 min read',
    lastUpdated: '2024-01-10',
    content: `
# Advanced Charting Tools

TradeFlows Pro provides professional-grade charting with 100+ technical indicators, drawing tools, and custom analysis features.

## Chart Types

### Candlestick Charts
- Japanese candlesticks (default)
- Heikin-Ashi (smoothed candles)
- Hollow candles
- Color schemes and customization

### Bar Charts
- OHLC bars
- HLC bars (no open)
- Colored by direction

### Line & Area Charts
- Simple line charts
- Weighted close
- Typical price
- Area fills with gradients

### Advanced Chart Types
- Renko (brick charts)
- Point & Figure
- Kagi charts
- Three Line Break
- Range bars
- Tick charts

## Technical Indicators

### Trend Indicators
- Moving Averages (SMA, EMA, WMA, VWMA)
- MACD (Moving Average Convergence Divergence)
- Parabolic SAR
- Ichimoku Cloud
- ADX (Average Directional Index)

### Momentum Indicators
- RSI (Relative Strength Index)
- Stochastic Oscillator
- Williams %R
- CCI (Commodity Channel Index)
- ROC (Rate of Change)

### Volatility Indicators
- Bollinger Bands
- ATR (Average True Range)
- Keltner Channels
- Donchian Channels
- Standard Deviation

### Volume Indicators
- Volume bars
- OBV (On-Balance Volume)
- Volume-Weighted Average Price (VWAP)
- Accumulation/Distribution
- Money Flow Index

### Custom Indicators
Professional plan includes:
- Indicator builder
- Custom formulas
- Pine Script compatibility
- Save and share indicators

## Drawing Tools

### Lines & Shapes
- Trend lines
- Horizontal/vertical lines
- Parallel channels
- Fibonacci retracements
- Fibonacci extensions
- Fibonacci fans
- Gann angles
- Rectangles, circles, triangles

### Pattern Recognition
AI-powered automatic detection:
- Head and shoulders
- Double tops/bottoms
- Triangles (ascending, descending, symmetrical)
- Flags and pennants
- Cup and handle
- Wedges

## Timeframes & Analysis

### Available Timeframes
- Tick charts (every trade)
- 1, 5, 15, 30 seconds
- 1, 5, 15, 30 minutes
- 1, 2, 4 hours
- Daily, weekly, monthly
- Custom timeframes (Professional)

### Multi-Timeframe Analysis
- Compare up to 6 timeframes
- Synchronized scrolling
- Timeframe alignment
- Higher timeframe overlays

## Chart Features

### Alerts
- Price alerts
- Indicator crossover alerts
- Drawing tool alerts
- Custom conditions

### Analysis Tools
- Measure tool
- Cross-hair with data
- Zoom and pan
- Screenshot export
- Video recording (Professional)

## Mobile Charting

Full charting on iOS/Android:
- All chart types
- Core indicators
- Drawing tools
- Touch gestures
- Sync with desktop

## Coming Soon
- Options chains visualization
- Level 2 market depth overlay
- Order flow analysis
- Volume profile
    `
  },
  {
    id: 'api-documentation',
    category: 'technical-analysis',
    title: 'API Documentation',
    description: 'Complete guide to TradeFlows Pro REST API and WebSocket connections',
    readTime: '20 min read',
    lastUpdated: '2024-01-09',
    content: `
# API Documentation

TradeFlows Pro provides a comprehensive REST API and WebSocket connections for programmatic access to market data, portfolio management, and trading features.

## Getting Started

### API Access
- Available on Professional plan only
- 10,000 requests per day
- Rate limit: 100 requests per minute
- WebSocket connections: up to 5 concurrent

### Authentication

**API Key Generation:**
1. Go to Settings > API Keys
2. Click "Generate New API Key"
3. Name your key (e.g., "Python Trading Bot")
4. Set permissions (read-only or read-write)
5. Copy and securely store your key
6. Never share your API key

**Authentication Header:**
\`\`\`
Authorization: Bearer YOUR_API_KEY
\`\`\`

### Base URL
\`\`\`
https://api.tradeflows.net/v1
\`\`\`

## REST API Endpoints

### Market Data

**GET /quotes/{symbol}**
Get real-time quote for a symbol

Request:
\`\`\`bash
curl -H "Authorization: Bearer YOUR_API_KEY" \\
  https://api.tradeflows.net/v1/quotes/AAPL
\`\`\`

Response:
\`\`\`json
{
  "symbol": "AAPL",
  "price": 175.43,
  "change": 2.15,
  "changePercent": 1.24,
  "volume": 54320000,
  "bid": 175.42,
  "ask": 175.44,
  "timestamp": "2024-01-15T14:30:00Z"
}
\`\`\`

**GET /bars/{symbol}**
Get historical OHLCV data

Parameters:
- timeframe: 1m, 5m, 15m, 1h, 1d
- start: ISO 8601 date
- end: ISO 8601 date
- limit: max 10000

Request:
\`\`\`bash
curl -H "Authorization: Bearer YOUR_API_KEY" \\
  "https://api.tradeflows.net/v1/bars/AAPL?timeframe=1d&limit=100"
\`\`\`

**GET /symbols/search**
Search for symbols

Parameters:
- q: search query
- asset_class: stocks, crypto, forex, commodities

### Portfolio

**GET /portfolio**
Get all portfolio positions

Response:
\`\`\`json
{
  "positions": [
    {
      "symbol": "AAPL",
      "quantity": 100,
      "avg_entry": 150.00,
      "current_price": 175.43,
      "unrealized_pnl": 2543.00,
      "unrealized_pnl_pct": 16.95
    }
  ],
  "total_value": 87650.00,
  "cash": 12350.00
}
\`\`\`

**POST /portfolio/positions**
Add a new position

**DELETE /portfolio/positions/{symbol}**
Remove a position

### AI Recommendations

**GET /ai/recommendations**
Get current AI trade recommendations

Parameters:
- confidence_min: 60-95
- asset_class: filter by asset class
- limit: max 50

Response:
\`\`\`json
{
  "recommendations": [
    {
      "symbol": "AAPL",
      "direction": "long",
      "entry_price": 175.50,
      "target_price": 185.00,
      "stop_loss": 172.00,
      "confidence": 78,
      "reasoning": "Bullish engulfing pattern..."
    }
  ]
}
\`\`\`

### Alerts

**GET /alerts**
List all alerts

**POST /alerts**
Create new alert

Request body:
\`\`\`json
{
  "symbol": "AAPL",
  "condition": "price_above",
  "value": 180.00,
  "notification": ["email", "sms"]
}
\`\`\`

## WebSocket API

### Connection

Connect to: \`wss://ws.tradeflows.net/v1\`

**Authentication:**
\`\`\`json
{
  "action": "auth",
  "key": "YOUR_API_KEY"
}
\`\`\`

### Subscribe to Quotes

\`\`\`json
{
  "action": "subscribe",
  "quotes": ["AAPL", "MSFT", "GOOGL"]
}
\`\`\`

**Quote Updates:**
\`\`\`json
{
  "type": "quote",
  "symbol": "AAPL",
  "price": 175.43,
  "timestamp": "2024-01-15T14:30:00Z"
}
\`\`\`

### Subscribe to Bars

\`\`\`json
{
  "action": "subscribe",
  "bars": {
    "AAPL": "1m",
    "MSFT": "5m"
  }
}
\`\`\`

## Rate Limits

- REST API: 100 requests/minute
- Daily limit: 10,000 requests
- WebSocket: 5 concurrent connections
- Messages: 1000/minute per connection

**Rate Limit Headers:**
\`\`\`
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1642251600
\`\`\`

## Error Handling

**Error Response:**
\`\`\`json
{
  "error": {
    "code": "INVALID_SYMBOL",
    "message": "Symbol not found",
    "status": 404
  }
}
\`\`\`

**Common Error Codes:**
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 429: Rate Limit Exceeded
- 500: Internal Server Error

## Client Libraries

### Python
\`\`\`python
pip install tradeflows-sdk

from tradeflows import TradeFlows

tf = TradeFlows(api_key='YOUR_API_KEY')
quote = tf.get_quote('AAPL')
print(quote.price)
\`\`\`

### JavaScript/Node.js
\`\`\`bash
npm install tradeflows-js

const TradeFlows = require('tradeflows-js');
const tf = new TradeFlows('YOUR_API_KEY');
const quote = await tf.getQuote('AAPL');
\`\`\`

### Java
\`\`\`xml
<dependency>
  <groupId>net.tradeflows</groupId>
  <artifactId>tradeflows-sdk</artifactId>
  <version>1.0.0</version>
</dependency>
\`\`\`

## Best Practices

### Security
- Never commit API keys to git
- Use environment variables
- Rotate keys regularly
- Use read-only keys when possible
- Monitor API usage

### Performance
- Cache responses when appropriate
- Use WebSocket for real-time data
- Batch requests when possible
- Implement exponential backoff
- Handle rate limits gracefully

### Error Handling
- Retry on 5xx errors
- Back off on 429 (rate limit)
- Log all errors
- Monitor API health

## Support

API questions?
- Documentation: https://docs.tradeflows.net/api
- GitHub: https://github.com/tradeflows/api-examples
- Support: api-support@tradeflows.net
- Status: https://status.tradeflows.net
    `
  },
  {
    id: 'security',
    category: 'account',
    title: 'Security & Data Protection',
    description: 'How we protect your data and keep your account secure',
    readTime: '10 min read',
    lastUpdated: '2024-01-08',
    content: `
# Security & Data Protection

TradeFlows Pro takes security seriously. Learn how we protect your account and data.

## Account Security

### Password Requirements

**Strong Passwords:**
- Minimum 12 characters
- Uppercase and lowercase letters
- Numbers and special characters
- No common words or patterns
- Not previously compromised

**Password Management:**
- Change password regularly
- Use a password manager
- Never reuse passwords
- Don't share your password

### Two-Factor Authentication (2FA)

**Setup 2FA:**
1. Settings > Security > Two-Factor Authentication
2. Choose method: SMS or Authenticator App
3. Scan QR code with authenticator
4. Enter verification code
5. Save backup codes

**Supported Authenticators:**
- Google Authenticator
- Authy
- Microsoft Authenticator
- 1Password

**Backup Codes:**
- 10 single-use codes
- Store securely offline
- Regenerate if compromised

### Login Security

**Features:**
- Login notifications
- Device tracking
- Location monitoring
- Suspicious activity alerts
- Session management
- Auto-logout after inactivity

**Trusted Devices:**
- Mark devices as trusted
- Skip 2FA on trusted devices
- Manage from Settings > Devices
- Revoke access anytime

## Data Encryption

### In Transit

**SSL/TLS Encryption:**
- 256-bit SSL certificates
- TLS 1.3 protocol
- Perfect Forward Secrecy
- HTTP Strict Transport Security (HSTS)

**All Communications Encrypted:**
- Website traffic
- Mobile app data
- API requests
- WebSocket connections

### At Rest

**Database Encryption:**
- AES-256 encryption
- Encrypted backups
- Encrypted file storage
- Key rotation every 90 days

**Sensitive Data:**
- Payment information tokenized
- Passwords hashed (bcrypt)
- API keys encrypted
- Personal data encrypted

## Payment Security

### PCI DSS Compliance

TradeFlows Pro is PCI DSS Level 1 compliant:
- We never store full card numbers
- Payments processed by Stripe
- Tokenized payment methods
- 3D Secure authentication
- Fraud detection systems

### Secure Checkout

**Features:**
- SSL-secured checkout
- Fraud monitoring
- Suspicious transaction blocking
- Chargeback protection
- Refund policies

## Data Privacy

### GDPR Compliance

Your rights under GDPR:
- Right to access your data
- Right to data portability
- Right to deletion
- Right to rectification
- Right to restrict processing

**Exercising Your Rights:**
- Settings > Privacy > Data Requests
- Export all your data (JSON/CSV)
- Request account deletion
- Response within 30 days

### Data Collection

**What We Collect:**
- Account information (email, name)
- Trading activity (for platform features)
- Usage analytics (anonymized)
- Device information
- Location data (IP-based)

**What We Don't Collect:**
- Social Security Numbers
- Bank account numbers
- Passwords (we store hashes only)
- Private messages content

### Data Sharing

**We Never:**
- Sell your data
- Share with third-party marketers
- Disclose without consent

**We May Share With:**
- Payment processors (Stripe)
- Cloud infrastructure (AWS)
- Analytics services (anonymized data)
- Law enforcement (if legally required)

## Infrastructure Security

### Cloud Security

**AWS Infrastructure:**
- SOC 2 Type II certified
- ISO 27001 compliant
- Regular security audits
- DDoS protection
- Redundant systems

**Data Centers:**
- Geographic redundancy
- 99.99% uptime SLA
- Real-time monitoring
- Disaster recovery plans

### Application Security

**Security Measures:**
- Web Application Firewall (WAF)
- SQL injection protection
- XSS prevention
- CSRF protection
- Rate limiting
- Input validation

**Security Testing:**
- Quarterly penetration testing
- Automated vulnerability scanning
- Code security reviews
- Bug bounty program

## Compliance & Certifications

### Industry Standards

**Certifications:**
- SOC 2 Type II
- ISO 27001
- PCI DSS Level 1
- GDPR compliant
- CCPA compliant

**Financial Regulations:**
- SEC compliance
- FINRA regulations
- FinCEN reporting
- KYC/AML procedures

## Incident Response

### Monitoring

**24/7 Security Monitoring:**
- Intrusion detection systems
- Anomaly detection
- Log analysis
- Threat intelligence
- Security operations center (SOC)

### Breach Protocol

**In Case of Security Incident:**
1. Immediate investigation
2. Contain and remediate
3. Notify affected users within 72 hours
4. Report to authorities if required
5. Post-incident analysis
6. Implement preventive measures

**User Notifications:**
- Email notifications
- In-app alerts
- Website banner
- Status page updates

## User Responsibilities

### Best Practices

**Protect Your Account:**
- Use strong, unique passwords
- Enable two-factor authentication
- Don't share credentials
- Log out of shared devices
- Keep software updated
- Beware of phishing

### Recognizing Threats

**Phishing Awareness:**
- We never ask for passwords via email
- Check sender email addresses
- Don't click suspicious links
- Verify URLs before entering data
- Report phishing to security@tradeflows.net

**Common Scams:**
- Fake support calls
- Phishing emails
- Social engineering
- Account takeover attempts
- Investment scams using our name

### Reporting Security Issues

**Found a vulnerability?**
- Email: security@tradeflows.net
- Bug bounty program: up to $10,000
- Responsible disclosure policy
- Safe harbor provisions

**What to Report:**
- Security vulnerabilities
- Suspicious activity
- Phishing attempts
- Unauthorized access
- Data breaches

## Data Backups

### Backup Policy

**Automated Backups:**
- Daily full backups
- Hourly incremental backups
- 90-day retention
- Geographic redundancy
- Encrypted backups

**Your Data:**
- Export anytime
- Multiple formats (JSON, CSV, Excel)
- Complete data portability
- No vendor lock-in

## Mobile App Security

### App Security Features

**iOS & Android:**
- Biometric authentication (Face ID, Touch ID)
- App PIN code
- Auto-lock after inactivity
- Secure storage
- Certificate pinning
- Jailbreak/root detection

**Permissions:**
- Camera (for ID verification only)
- Notifications (for alerts)
- Biometrics (for quick login)
- No unnecessary permissions

## API Security

### API Key Management

**Best Practices:**
- Never commit keys to git
- Use environment variables
- Rotate keys regularly
- Set appropriate permissions
- Monitor usage
- Revoke unused keys

**Key Permissions:**
- Read-only: View data only
- Read-write: Manage portfolio
- Admin: Full access (not recommended)

### API Rate Limiting

**Protection Measures:**
- Rate limits per key
- DDoS protection
- Anomaly detection
- Automatic key suspension if compromised

## Privacy Settings

### Account Privacy

**Customize Your Privacy:**
- Marketing communications opt-in/out
- Data sharing preferences
- Profile visibility (if community features enabled)
- Analytics tracking opt-out
- Cookie preferences

**Cookie Policy:**
- Essential cookies (required)
- Analytics cookies (optional)
- Advertising cookies (none)
- Manage in Settings > Privacy

## Updates & Transparency

### Security Updates

**Stay Informed:**
- Security bulletins
- Email notifications
- Status page: https://status.tradeflows.net
- Blog: security category
- Changelog

### Transparency Report

**Annual Report Includes:**
- Data requests from authorities
- Account terminations
- Security incidents
- Compliance metrics

## Children's Privacy

**COPPA Compliance:**
- No users under 18
- Age verification required
- Account termination if underage
- No data collection from minors

## International Users

### Data Transfers

**Cross-Border Data:**
- EU-US Privacy Shield (successor framework)
- Standard Contractual Clauses
- Adequate data protection
- User consent

**Data Residency:**
- Primary: US East (Virginia)
- Secondary: EU West (Ireland)
- Asia Pacific (Singapore) - coming soon

## Getting Help

Security questions or concerns?

- **Security Team**: security@tradeflows.net
- **Privacy Inquiries**: privacy@tradeflows.net
- **Report Vulnerability**: security@tradeflows.net
- **Status Page**: https://status.tradeflows.net
- **Help Center**: https://help.tradeflows.net/security

**Emergency Contact:**
Available 24/7 for critical security issues:
Phone: 1-800-TRADE-PRO ext. 911
    `
  },

  // Account & Billing
  {
    id: 'subscription-management',
    category: 'account',
    title: 'Subscription & Billing Management',
    description: 'Managing your TradeFlows Pro subscription',
    readTime: '6 min read',
    lastUpdated: '2024-01-11',
    content: `
# Subscription & Billing Management

Everything you need to know about managing your TradeFlows Pro subscription.

## Plans & Pricing

### Free Trial

**What's Included:**
- 7 days of full Premium access
- All features unlocked
- No credit card required
- No automatic charges

**After Trial:**
- Automatically downgrades to Free tier
- Keep your data and settings
- Upgrade anytime to restore access

### Premium Plan - $49.99/month

**Features:**
- Real-time market data (US markets)
- AI strategy recommendations
- Advanced technical analysis
- Unlimited watchlists
- Portfolio analytics
- Smart alerts & notifications
- Mobile & desktop apps
- Priority email support
- Data export (CSV)
- Custom indicators

**Best For:**
- Active traders
- Day and swing traders
- Portfolio managers
- Individual investors

### Professional Plan - $79.99/month

**Everything in Premium, plus:**
- API access (10,000 calls/day)
- Custom strategy builder
- Advanced portfolio analytics
- Multi-account management
- Real-time international data
- Priority support (24/7)
- Dedicated account manager
- Custom integrations
- Phone support
- Early access to new features
- White-label reports

**Best For:**
- Professional traders
- Algorithmic trading
- Trading firms
- Financial advisors
- High-volume traders

### Annual Billing

Save 20% with annual subscriptions:
- Premium: $479.99/year (was $599.88) - **Save $119.89**
- Professional: $767.99/year (was $959.88) - **Save $191.89**

Benefits:
- Lock in current pricing for a year
- Save 2.4 months of payments
- One invoice for expense tracking
- Priority feature requests

## Upgrading Your Plan

### How to Upgrade

1. Go to Settings > Subscription
2. Click "Upgrade Plan"
3. Select Premium or Professional
4. Choose monthly or annual billing
5. Enter payment information
6. Click "Complete Upgrade"

### Immediate Access

- Upgrade takes effect instantly
- All features unlocked immediately
- No waiting period

### Prorated Billing

**Upgrading Mid-Cycle:**
- Only pay difference for remaining days
- Example: Upgrade from Premium ($49.99) to Professional ($79.99) on day 15 of 30
- Charge: ($79.99 - $49.99) × (15/30) = $15.00
- Next full charge on your next billing date

**Fair Billing:**
- Never double-charged
- Automatic prorating
- Credit applied to future invoices if needed

## Downgrading Your Plan

### How to Downgrade

1. Settings > Subscription
2. Click "Change Plan"
3. Select lower tier plan
4. Confirm downgrade
5. Complete

### When It Takes Effect

- Downgrade at end of current billing period
- Continue using current plan until then
- No refunds for unused time
- All data preserved

### What You Keep

- All historical data
- Trade journal entries
- Portfolio positions
- Watchlists and alerts (up to free tier limits)
- Account settings

### What Changes

- Feature access reduced to new plan level
- API access disabled (if downgrading from Professional)
- Alert limits applied
- Support tier changes

## Canceling Your Subscription

### How to Cancel

1. Settings > Subscription > Cancel Plan
2. Select reason (helps us improve)
3. Confirm cancellation
4. Receive confirmation email

### What Happens

**Immediate:**
- Cancellation confirmed
- No future charges
- Access continues until end of paid period

**End of Billing Period:**
- Subscription expires
- Account downgrades to Free tier
- Data preserved for 90 days

**90 Days Later:**
- If no reactivation, data deleted
- Can export data before deletion
- Deletion notification sent 30 days prior

### Reactivating

**Within 90 Days:**
- All data restored
- Choose same or different plan
- No setup required

**After 90 Days:**
- Start fresh with new subscription
- Previous data not recoverable

## Payment Methods

### Accepted Methods

**Credit Cards:**
- Visa
- Mastercard
- American Express
- Discover

**Debit Cards:**
- All major debit cards

**Coming Soon:**
- PayPal
- Bank transfers (for annual plans)
- Cryptocurrency (BTC, ETH)

### Adding/Updating Payment Method

1. Settings > Billing > Payment Methods
2. Click "Add Payment Method" or "Update"
3. Enter card details
4. Click "Save"
5. Set as default (if multiple cards)

**Security:**
- We do not store your full card number
- Payments processed by Stripe (PCI DSS Level 1)
- 256-bit encryption
- 3D Secure authentication for high-value transactions

### Payment Issues

**Failed Payment:**
- Email notification sent
- 3 retry attempts over 7 days
- Grace period: 7 days to update payment
- If unresolved: downgrade to Free tier

**Updating Failed Payment:**
1. Check email for failed payment notice
2. Log in to Settings > Billing
3. Update payment method
4. Click "Retry Payment"
5. Subscription reactivated upon successful payment

## Billing & Invoices

### Billing Cycle

**Monthly:**
- Charged on the same day each month
- Example: Subscribe on Jan 15 → charged 15th of every month

**Annual:**
- Charged once per year on subscription anniversary
- Renewal reminder sent 30 days before

### Invoices

**Accessing Invoices:**
- Settings > Billing > Invoices
- View all past invoices
- Download as PDF
- Email to accountant

**Invoice Details:**
- Invoice number
- Date of charge
- Amount
- Plan details
- Payment method (last 4 digits)
- Billing address
- VAT/GST (if applicable)

### Tax Information

**Sales Tax:**
- Automatically calculated based on billing address
- US: State and local sales tax where applicable
- EU: VAT at appropriate rate
- Other countries: GST/VAT as required

**Updating Tax Info:**
1. Settings > Billing > Tax Information
2. Enter VAT ID (for EU businesses)
3. Update billing address
4. Save changes
5. Reflected on next invoice

## Refunds & Money-Back Guarantee

### 30-Day Money-Back Guarantee

**Eligibility:**
- First-time subscribers
- Within 30 days of initial purchase
- Annual or monthly plans

**Process:**
1. Contact support@tradeflows.net
2. Request refund (no reason required)
3. Refund processed within 5-7 business days
4. Full refund to original payment method

**Exclusions:**
- Not available for renewals (only first month/year)
- Must request within 30 days
- Account will be downgraded upon refund

### Other Refunds

**Accidental Billing:**
- Contact support immediately
- Refund if caught within 48 hours
- Goodwill refunds considered case-by-case

**Service Issues:**
- Prorated credit for extended outages
- Credit applied to account automatically
- Refund available upon request

**No Refunds For:**
- Partial months (mid-cycle cancellations)
- Downgrades
- Data export requests after cancellation

## Discounts & Promotions

### Student Discount

**50% off all plans**

**Eligibility:**
- Currently enrolled student
- Valid student email (.edu) or ID
- Verify annually

**How to Apply:**
1. Sign up with student email
2. Upload student ID
3. Wait for verification (24-48 hours)
4. Discount applied automatically

### Educator Discount

**50% off all plans**

**Eligibility:**
- Teachers, professors, instructors
- Currently employed at educational institution
- Verify annually

**How to Apply:**
- Contact support@tradeflows.net
- Provide proof of employment
- Discount code issued

### Non-Profit Discount

**30% off all plans**

**Eligibility:**
- Registered 501(c)(3) or equivalent
- Using for non-profit purposes

**How to Apply:**
- Email support with proof of non-profit status
- Custom discount code provided

### Referral Program

**Give $20, Get $20**

**How It Works:**
1. Share your referral link (Settings > Referral)
2. Friend signs up for paid plan
3. They get $20 credit on first invoice
4. You get $20 credit on next invoice
5. Unlimited referrals

### Promotional Codes

**Using Promo Codes:**
1. During checkout, enter code in "Promo Code" field
2. Click "Apply"
3. Discount reflected in total
4. Complete purchase

**Where to Find:**
- Email newsletters
- Social media (@tradeflowspro)
- Partner websites
- Webinars and events
- Holiday sales

## Enterprise Plans

### Custom Pricing

For teams and institutions:

**Features:**
- Unlimited users
- Custom data integrations
- On-premise deployment option
- Dedicated support team
- SLA guarantees
- Custom training
- White-label options

**Contact Sales:**
- Email: enterprise@tradeflows.net
- Phone: 1-800-TRADE-PRO ext. 2
- Request demo: https://tradeflows.net/demo

## Account Security

### Unauthorized Charges

**If you see charges you do not recognize:**

1. Check if it's a renewal (check billing date)
2. Verify payment method
3. Review subscription status
4. Contact support immediately if fraudulent
5. We'll investigate and refund if confirmed

**Preventing Fraud:**
- Enable two-factor authentication
- Use strong, unique passwords
- Do not share account credentials
- Log out of shared devices
- Monitor your statements

## FAQ

**Q: Can I change from monthly to annual mid-cycle?**
A: Yes! You'll receive credit for unused monthly subscription time applied to annual billing.

**Q: What happens if my payment fails?**
A: We'll retry 3 times over 7 days. You'll receive email notifications. Update your payment method to avoid service interruption.

**Q: Can I transfer my subscription to someone else?**
A: Subscriptions are non-transferable. The new user should sign up separately. Consider our referral program for credits.

**Q: Do you offer lifetime plans?**
A: Not currently. Lifetime deals were offered to early adopters only. Follow us for potential future promotions.

**Q: Is there a family plan?**
A: Not yet, but we're working on it! Professional plan includes multi-account management as a workaround.

## Getting Help

Billing questions?

- **Live Chat**: Instant support (click chat icon)
- **Email**: billing@tradeflows.net
- **Phone**: 1-800-TRADE-PRO (Premium/Professional)
- **Help Center**: https://help.tradeflows.net/billing
    `
  }
]

export function getArticleById(id) {
  return kbArticles.find(article => article.id === id)
}

export function getArticlesByCategory(categoryId) {
  return kbArticles.filter(article => article.category === categoryId)
}

export function getAllArticles() {
  return kbArticles
}

export function getCategoryById(id) {
  return kbCategories.find(cat => cat.id === id)
}
