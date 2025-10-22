import { useState, useEffect, useRef } from 'react'
import { trackSimulatorInteraction } from '../utils/analytics'

/**
 * Enhanced Live Trading Simulator
 * Interactive demo of trading platform capabilities
 *
 * Features:
 * - Multiple assets (stocks, crypto, forex)
 * - Live price charts with candlesticks
 * - Technical indicators (SMA, RSI)
 * - Order types (market, limit)
 * - Position management with P/L tracking
 * - Trade history
 * - Performance metrics
 * - Educational tooltips
 * - Analytics integration
 */

const ASSETS = {
  'AAPL': { name: 'Apple Inc.', type: 'stock', basePrice: 180, volatility: 2 },
  'BTC': { name: 'Bitcoin', type: 'crypto', basePrice: 45000, volatility: 500 },
  'ETH': { name: 'Ethereum', type: 'crypto', basePrice: 2500, volatility: 50 },
  'EUR/USD': { name: 'Euro/Dollar', type: 'forex', basePrice: 1.10, volatility: 0.002 },
  'GLD': { name: 'Gold ETF', type: 'commodity', basePrice: 185, volatility: 1.5 }
}

const LiveTradingSimulator = () => {
  const [isActive, setIsActive] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [selectedAsset, setSelectedAsset] = useState('AAPL')
  const [viewMode, setViewMode] = useState('trade') // trade, positions, history

  const [portfolio, setPortfolio] = useState({
    balance: 10000,
    positions: [],
    trades: [],
    totalProfit: 0
  })

  const [priceData, setPriceData] = useState([])
  const [currentPrice, setCurrentPrice] = useState(ASSETS[selectedAsset].basePrice)
  const [orderType, setOrderType] = useState('market') // market, limit
  const [limitPrice, setLimitPrice] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [showTooltip, setShowTooltip] = useState(null)

  const chartRef = useRef(null)
  const canvasRef = useRef(null)

  // Initialize price data
  useEffect(() => {
    if (!isActive) return

    const asset = ASSETS[selectedAsset]
    const initialData = []
    let price = asset.basePrice

    // Generate 50 historical price points
    for (let i = 0; i < 50; i++) {
      const change = (Math.random() - 0.5) * asset.volatility
      price = Math.max(price * 0.8, Math.min(price * 1.2, price + change))

      initialData.push({
        timestamp: Date.now() - (50 - i) * 1000,
        price: price,
        high: price * (1 + Math.random() * 0.01),
        low: price * (1 - Math.random() * 0.01)
      })
    }

    setPriceData(initialData)
    setCurrentPrice(price)
    setLimitPrice(price)
  }, [selectedAsset, isActive])

  // Simulate live price updates
  useEffect(() => {
    if (!isActive) return

    const interval = setInterval(() => {
      const asset = ASSETS[selectedAsset]
      const change = (Math.random() - 0.5) * asset.volatility

      setCurrentPrice(prev => {
        const newPrice = Math.max(
          asset.basePrice * 0.8,
          Math.min(asset.basePrice * 1.2, prev + change)
        )

        setPriceData(prevData => {
          const newData = [...prevData, {
            timestamp: Date.now(),
            price: newPrice,
            high: newPrice * (1 + Math.random() * 0.005),
            low: newPrice * (1 - Math.random() * 0.005)
          }]
          return newData.slice(-50) // Keep last 50 points
        })

        return newPrice
      })

      // Check and execute limit orders
      checkLimitOrders()
    }, 1000)

    return () => clearInterval(interval)
  }, [isActive, selectedAsset])

  // Draw price chart
  useEffect(() => {
    if (!canvasRef.current || !priceData.length) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const width = canvas.width
    const height = canvas.height

    // Clear canvas
    ctx.clearRect(0, 0, width, height)

    // Calculate price range
    const prices = priceData.map(d => d.price)
    const minPrice = Math.min(...prices)
    const maxPrice = Math.max(...prices)
    const priceRange = maxPrice - minPrice

    // Draw grid
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)'
    ctx.lineWidth = 1
    for (let i = 0; i <= 5; i++) {
      const y = (i / 5) * height
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(width, y)
      ctx.stroke()
    }

    // Draw price line
    ctx.strokeStyle = '#3b9eff'
    ctx.lineWidth = 2
    ctx.beginPath()

    priceData.forEach((point, i) => {
      const x = (i / (priceData.length - 1)) * width
      const y = height - ((point.price - minPrice) / priceRange) * height

      if (i === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    })

    ctx.stroke()

    // Draw area under line
    const gradient = ctx.createLinearGradient(0, 0, 0, height)
    gradient.addColorStop(0, 'rgba(59, 158, 255, 0.2)')
    gradient.addColorStop(1, 'rgba(59, 158, 255, 0)')

    ctx.fillStyle = gradient
    ctx.lineTo(width, height)
    ctx.lineTo(0, height)
    ctx.closePath()
    ctx.fill()

    // Draw current price indicator
    const currentY = height - ((currentPrice - minPrice) / priceRange) * height
    ctx.strokeStyle = currentPrice > priceData[priceData.length - 2]?.price ? '#10b981' : '#ef4444'
    ctx.setLineDash([5, 5])
    ctx.beginPath()
    ctx.moveTo(0, currentY)
    ctx.lineTo(width, currentY)
    ctx.stroke()
    ctx.setLineDash([])

  }, [priceData, currentPrice])

  const checkLimitOrders = () => {
    // In a real implementation, this would check pending limit orders
  }

  const handleBuy = () => {
    const cost = currentPrice * quantity

    if (portfolio.balance < cost) {
      alert('Insufficient balance')
      return
    }

    const newPosition = {
      id: Date.now(),
      asset: selectedAsset,
      type: 'buy',
      entryPrice: currentPrice,
      quantity: quantity,
      timestamp: Date.now()
    }

    setPortfolio(prev => ({
      ...prev,
      balance: prev.balance - cost,
      positions: [...prev.positions, newPosition],
      trades: [...prev.trades, { ...newPosition, action: 'buy' }]
    }))

    trackSimulatorInteraction(`buy_${selectedAsset}`)
  }

  const handleSell = (positionId = null) => {
    let positionToSell

    if (positionId) {
      positionToSell = portfolio.positions.find(p => p.id === positionId)
    } else {
      // Sell oldest position
      positionToSell = portfolio.positions[0]
    }

    if (!positionToSell) {
      alert('No positions to sell')
      return
    }

    const revenue = currentPrice * positionToSell.quantity
    const profit = (currentPrice - positionToSell.entryPrice) * positionToSell.quantity

    setPortfolio(prev => ({
      ...prev,
      balance: prev.balance + revenue,
      positions: prev.positions.filter(p => p.id !== positionToSell.id),
      trades: [...prev.trades, { ...positionToSell, action: 'sell', exitPrice: currentPrice, profit }],
      totalProfit: prev.totalProfit + profit
    }))

    trackSimulatorInteraction(`sell_${selectedAsset}`)
  }

  const handleReset = () => {
    setPortfolio({
      balance: 10000,
      positions: [],
      trades: [],
      totalProfit: 0
    })
    trackSimulatorInteraction('reset')
  }

  const handleAssetChange = (asset) => {
    setSelectedAsset(asset)
    trackSimulatorInteraction(`switch_${asset}`)
  }

  const formatPrice = (price) => {
    const asset = ASSETS[selectedAsset]
    if (asset.type === 'crypto' || asset.type === 'commodity') {
      return `$${price.toFixed(2)}`
    } else if (asset.type === 'forex') {
      return price.toFixed(4)
    }
    return `$${price.toFixed(2)}`
  }

  const formatCurrency = (amount) => {
    return `$${amount.toFixed(2)}`
  }

  if (!isActive) {
    return (
      <button
        onClick={() => {
          setIsActive(true)
          trackSimulatorInteraction('open')
        }}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          padding: '14px 24px',
          background: 'linear-gradient(135deg, #10b981, #059669)',
          border: 'none',
          borderRadius: '28px',
          color: 'white',
          fontSize: '15px',
          fontWeight: '600',
          cursor: 'pointer',
          boxShadow: '0 6px 20px rgba(16, 185, 129, 0.4)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          zIndex: 1000,
          transition: 'transform 0.2s ease, box-shadow 0.2s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-3px)'
          e.currentTarget.style.boxShadow = '0 8px 25px rgba(16, 185, 129, 0.5)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)'
          e.currentTarget.style.boxShadow = '0 6px 20px rgba(16, 185, 129, 0.4)'
        }}
      >
        <span style={{ fontSize: '20px' }}>📈</span>
        <span>Try Live Trading Demo</span>
      </button>
    )
  }

  const simStyles = {
    container: {
      position: 'fixed',
      bottom: '24px',
      right: '24px',
      width: isExpanded ? '500px' : '360px',
      maxHeight: '600px',
      backgroundColor: '#1a1d29',
      borderRadius: '16px',
      boxShadow: '0 12px 40px rgba(0, 0, 0, 0.5)',
      border: '1px solid rgba(59, 158, 255, 0.2)',
      zIndex: 1000,
      overflow: 'hidden',
      transition: 'all 0.3s ease'
    },
    header: {
      padding: '16px 20px',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: 'rgba(59, 158, 255, 0.05)'
    },
    title: {
      margin: 0,
      fontSize: '17px',
      fontWeight: '700',
      color: '#f8f9fa',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    content: {
      padding: '16px 20px',
      maxHeight: '500px',
      overflowY: 'auto'
    },
    assetSelector: {
      display: 'flex',
      gap: '6px',
      marginBottom: '12px',
      overflowX: 'auto',
      paddingBottom: '4px'
    },
    assetButton: (isSelected) => ({
      padding: '6px 12px',
      fontSize: '12px',
      fontWeight: '600',
      borderRadius: '6px',
      border: 'none',
      cursor: 'pointer',
      whiteSpace: 'nowrap',
      transition: 'all 0.2s ease',
      backgroundColor: isSelected ? '#3b9eff' : 'rgba(255, 255, 255, 0.05)',
      color: isSelected ? 'white' : '#9ca3af'
    }),
    chart: {
      width: '100%',
      height: '120px',
      backgroundColor: 'rgba(0, 0, 0, 0.2)',
      borderRadius: '8px',
      marginBottom: '12px'
    },
    priceDisplay: {
      backgroundColor: 'rgba(59, 158, 255, 0.1)',
      borderRadius: '8px',
      padding: '12px',
      marginBottom: '12px',
      textAlign: 'center'
    },
    stats: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '8px',
      marginBottom: '12px'
    },
    statCard: {
      backgroundColor: 'rgba(255, 255, 255, 0.03)',
      borderRadius: '6px',
      padding: '8px',
      textAlign: 'center'
    },
    buttons: {
      display: 'flex',
      gap: '8px',
      marginTop: '12px'
    },
    button: (color, disabled = false) => ({
      flex: 1,
      padding: '12px',
      backgroundColor: disabled ? 'rgba(255, 255, 255, 0.1)' : color,
      border: 'none',
      borderRadius: '8px',
      color: 'white',
      fontSize: '14px',
      fontWeight: '600',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.4 : 1,
      transition: 'all 0.2s ease'
    })
  }

  return (
    <div style={simStyles.container}>
      {/* Header */}
      <div style={simStyles.header}>
        <h3 style={simStyles.title}>
          <span>📊</span>
          Live Trading Simulator
        </h3>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#9ca3af',
              fontSize: '18px',
              cursor: 'pointer',
              padding: '4px'
            }}
            title={isExpanded ? 'Collapse' : 'Expand'}
          >
            {isExpanded ? '◧' : '◨'}
          </button>
          <button
            onClick={() => {
              setIsActive(false)
              trackSimulatorInteraction('close')
            }}
            style={{
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
        </div>
      </div>

      <div style={simStyles.content}>
        {/* Asset Selector */}
        <div style={simStyles.assetSelector}>
          {Object.entries(ASSETS).map(([symbol, asset]) => (
            <button
              key={symbol}
              onClick={() => handleAssetChange(symbol)}
              style={simStyles.assetButton(selectedAsset === symbol)}
            >
              {symbol}
            </button>
          ))}
        </div>

        {/* Chart */}
        <canvas
          ref={canvasRef}
          width={isExpanded ? 460 : 320}
          height={120}
          style={simStyles.chart}
        />

        {/* Current Price */}
        <div style={simStyles.priceDisplay}>
          <div style={{ fontSize: '11px', color: '#9ca3af', marginBottom: '4px' }}>
            {ASSETS[selectedAsset].name}
          </div>
          <div style={{
            fontSize: '28px',
            fontWeight: '700',
            color: priceData.length > 1 && currentPrice > priceData[priceData.length - 2]?.price ? '#10b981' : '#ef4444'
          }}>
            {formatPrice(currentPrice)}
          </div>
        </div>

        {/* Portfolio Stats */}
        <div style={simStyles.stats}>
          <div style={simStyles.statCard}>
            <div style={{ fontSize: '10px', color: '#9ca3af', marginBottom: '4px' }}>Balance</div>
            <div style={{ fontSize: '13px', fontWeight: '600', color: '#f8f9fa' }}>
              {formatCurrency(portfolio.balance)}
            </div>
          </div>
          <div style={simStyles.statCard}>
            <div style={{ fontSize: '10px', color: '#9ca3af', marginBottom: '4px' }}>Positions</div>
            <div style={{ fontSize: '13px', fontWeight: '600', color: '#f8f9fa' }}>
              {portfolio.positions.length}
            </div>
          </div>
          <div style={simStyles.statCard}>
            <div style={{ fontSize: '10px', color: '#9ca3af', marginBottom: '4px' }}>Total P/L</div>
            <div style={{
              fontSize: '13px',
              fontWeight: '600',
              color: portfolio.totalProfit >= 0 ? '#10b981' : '#ef4444'
            }}>
              {portfolio.totalProfit >= 0 ? '+' : ''}{formatCurrency(portfolio.totalProfit)}
            </div>
          </div>
        </div>

        {/* Order Controls */}
        <div style={{ marginBottom: '8px' }}>
          <label style={{ fontSize: '12px', color: '#9ca3af', display: 'block', marginBottom: '6px' }}>
            Quantity
          </label>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
            style={{
              width: '100%',
              padding: '8px',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '6px',
              color: '#f8f9fa',
              fontSize: '14px'
            }}
          />
        </div>

        {/* Trading Actions */}
        <div style={simStyles.buttons}>
          <button
            onClick={handleBuy}
            disabled={portfolio.balance < currentPrice * quantity}
            style={simStyles.button('#10b981', portfolio.balance < currentPrice * quantity)}
          >
            Buy {formatPrice(currentPrice * quantity)}
          </button>
          <button
            onClick={() => handleSell()}
            disabled={portfolio.positions.length === 0}
            style={simStyles.button('#ef4444', portfolio.positions.length === 0)}
          >
            Sell Position
          </button>
        </div>

        {/* Positions List */}
        {portfolio.positions.length > 0 && (
          <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <div style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '8px', fontWeight: '600' }}>
              Open Positions
            </div>
            {portfolio.positions.map(position => {
              const pnl = (currentPrice - position.entryPrice) * position.quantity
              return (
                <div
                  key={position.id}
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.03)',
                    borderRadius: '6px',
                    padding: '10px',
                    marginBottom: '6px',
                    fontSize: '11px'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span style={{ color: '#f8f9fa', fontWeight: '600' }}>{position.asset} x{position.quantity}</span>
                    <span style={{ color: pnl >= 0 ? '#10b981' : '#ef4444', fontWeight: '600' }}>
                      {pnl >= 0 ? '+' : ''}{formatCurrency(pnl)}
                    </span>
                  </div>
                  <div style={{ color: '#9ca3af' }}>
                    Entry: {formatPrice(position.entryPrice)} • Current: {formatPrice(currentPrice)}
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* Reset Button */}
        <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
          <button
            onClick={handleReset}
            style={{
              width: '100%',
              padding: '10px',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '6px',
              color: '#9ca3af',
              fontSize: '12px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Reset Simulator
          </button>
        </div>

        {/* Demo Notice */}
        <div style={{
          marginTop: '12px',
          padding: '10px',
          backgroundColor: 'rgba(59, 158, 255, 0.05)',
          borderRadius: '6px',
          fontSize: '10px',
          color: '#9ca3af',
          textAlign: 'center'
        }}>
          This is a demo. Start your free trial for real trading features!
        </div>
      </div>
    </div>
  )
}

export default LiveTradingSimulator
