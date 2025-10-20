import { useState, useEffect } from 'react'
import './LiveDemoWidget.css'

export default function LiveDemoWidget() {
  const [selectedSymbol, setSelectedSymbol] = useState('AAPL')
  const [currentPrice, setCurrentPrice] = useState(182.54)
  const [priceChange, setPriceChange] = useState(2.34)
  const [volume, setVolume] = useState('124.5M')
  const [signal, setSignal] = useState('BUY')
  const [confidence, setConfidence] = useState(87)
  const [isAnimating, setIsAnimating] = useState(false)

  const symbols = [
    { ticker: 'AAPL', name: 'Apple Inc.', price: 182.54, change: 2.34 },
    { ticker: 'GOOGL', name: 'Alphabet Inc.', price: 142.87, change: -1.23 },
    { ticker: 'MSFT', name: 'Microsoft Corp.', price: 378.91, change: 4.56 },
    { ticker: 'TSLA', name: 'Tesla Inc.', price: 256.78, change: 8.91 },
    { ticker: 'NVDA', name: 'NVIDIA Corp.', price: 495.23, change: 12.45 }
  ]

  const indicators = [
    { name: 'RSI', value: 65, status: 'bullish' },
    { name: 'MACD', value: 'Positive', status: 'bullish' },
    { name: 'Volume', value: 'Above Avg', status: 'neutral' },
    { name: 'Support', value: '$180.20', status: 'strong' }
  ]

  useEffect(() => {
    // Simulate real-time price updates
    const interval = setInterval(() => {
      setCurrentPrice(prev => {
        const change = (Math.random() - 0.5) * 2
        return Number((prev + change).toFixed(2))
      })
      setPriceChange(prev => {
        const change = (Math.random() - 0.5) * 0.5
        return Number((prev + change).toFixed(2))
      })
      setConfidence(prev => {
        const change = Math.floor(Math.random() * 5) - 2
        return Math.max(60, Math.min(95, prev + change))
      })
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const handleSymbolChange = (symbol) => {
    setIsAnimating(true)
    const selected = symbols.find(s => s.ticker === symbol)
    setSelectedSymbol(symbol)
    setCurrentPrice(selected.price)
    setPriceChange(selected.change)

    // Random signal generation for demo
    const signals = ['BUY', 'HOLD', 'SELL']
    const randomSignal = signals[Math.floor(Math.random() * signals.length)]
    setSignal(randomSignal)

    setTimeout(() => setIsAnimating(false), 500)
  }

  return (
    <div className="live-demo-widget">
      <div className="demo-header">
        <h3>Live Trading Demo</h3>
        <span className="demo-badge">LIVE</span>
      </div>

      <div className="symbol-selector">
        {symbols.map(sym => (
          <button
            key={sym.ticker}
            className={`symbol-btn ${selectedSymbol === sym.ticker ? 'active' : ''}`}
            onClick={() => handleSymbolChange(sym.ticker)}
          >
            {sym.ticker}
          </button>
        ))}
      </div>

      <div className={`price-display ${isAnimating ? 'animating' : ''}`}>
        <div className="current-price">
          <span className="price-label">Current Price</span>
          <span className="price-value">${currentPrice}</span>
          <span className={`price-change ${priceChange > 0 ? 'positive' : 'negative'}`}>
            {priceChange > 0 ? '+' : ''}{priceChange} ({((priceChange / currentPrice) * 100).toFixed(2)}%)
          </span>
        </div>
        <div className="volume-display">
          <span className="volume-label">Volume</span>
          <span className="volume-value">{volume}</span>
        </div>
      </div>

      <div className="ai-signal">
        <div className="signal-header">
          <span>AI Signal</span>
          <span className="confidence">Confidence: {confidence}%</span>
        </div>
        <div className={`signal-display ${signal.toLowerCase()}`}>
          <span className="signal-value">{signal}</span>
          <div className="confidence-bar">
            <div className="confidence-fill" style={{ width: `${confidence}%` }}></div>
          </div>
        </div>
      </div>

      <div className="indicators-grid">
        {indicators.map(ind => (
          <div key={ind.name} className={`indicator ${ind.status}`}>
            <span className="indicator-name">{ind.name}</span>
            <span className="indicator-value">{ind.value}</span>
          </div>
        ))}
      </div>

      <div className="demo-cta">
        <button className="try-now-btn">
          Try Full Platform Free
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <p className="demo-note">No credit card required • 14-day free trial</p>
      </div>
    </div>
  )
}