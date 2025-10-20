import { useState, useEffect } from 'react';

// Simplified Live Trading Simulator
const LiveTradingSimulator = () => {
  const [isActive, setIsActive] = useState(false);
  const [portfolio, setPortfolio] = useState({
    balance: 10000,
    positions: [],
    profit: 0
  });
  const [currentPrice, setCurrentPrice] = useState(100);

  // Simulate price movement
  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setCurrentPrice(prev => {
        const change = (Math.random() - 0.5) * 2;
        return Math.max(50, Math.min(150, prev + change));
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive]);

  const handleBuy = () => {
    if (portfolio.balance >= currentPrice) {
      setPortfolio(prev => ({
        ...prev,
        balance: prev.balance - currentPrice,
        positions: [...prev.positions, { price: currentPrice, type: 'buy' }]
      }));
    }
  };

  const handleSell = () => {
    if (portfolio.positions.length > 0) {
      const lastPosition = portfolio.positions[portfolio.positions.length - 1];
      const profit = currentPrice - lastPosition.price;

      setPortfolio(prev => ({
        ...prev,
        balance: prev.balance + currentPrice,
        positions: prev.positions.slice(0, -1),
        profit: prev.profit + profit
      }));
    }
  };

  if (!isActive) {
    return (
      <button
        onClick={() => setIsActive(true)}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          padding: '12px 20px',
          background: 'linear-gradient(135deg, #10b981, #059669)',
          border: 'none',
          borderRadius: '24px',
          color: 'white',
          fontSize: '14px',
          fontWeight: '600',
          cursor: 'pointer',
          boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          zIndex: 1000,
          transition: 'transform 0.2s ease'
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
      >
        <span>📈</span>
        Try Trading Simulator
      </button>
    );
  }

  return (
    <div style={{
      position: 'fixed',
      bottom: '24px',
      right: '24px',
      width: '320px',
      backgroundColor: '#1a1d29',
      borderRadius: '12px',
      padding: '20px',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
      border: '1px solid rgba(59, 158, 255, 0.2)',
      zIndex: 1000
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '16px'
      }}>
        <h3 style={{
          margin: 0,
          fontSize: '16px',
          fontWeight: '600',
          color: '#f8f9fa'
        }}>
          Trading Simulator
        </h3>
        <button
          onClick={() => setIsActive(false)}
          style={{
            background: 'transparent',
            border: 'none',
            color: '#9ca3af',
            fontSize: '20px',
            cursor: 'pointer',
            padding: '0',
            lineHeight: 1
          }}
        >
          ×
        </button>
      </div>

      {/* Price Display */}
      <div style={{
        backgroundColor: 'rgba(59, 158, 255, 0.1)',
        borderRadius: '8px',
        padding: '12px',
        marginBottom: '16px',
        textAlign: 'center'
      }}>
        <div style={{
          fontSize: '12px',
          color: '#9ca3af',
          marginBottom: '4px'
        }}>
          Current Price
        </div>
        <div style={{
          fontSize: '24px',
          fontWeight: '700',
          color: currentPrice > 100 ? '#10b981' : '#ef4444'
        }}>
          ${currentPrice.toFixed(2)}
        </div>
      </div>

      {/* Portfolio Stats */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '12px',
        marginBottom: '16px'
      }}>
        <div style={{
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '8px',
          padding: '8px',
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: '11px',
            color: '#9ca3af',
            marginBottom: '2px'
          }}>
            Balance
          </div>
          <div style={{
            fontSize: '14px',
            fontWeight: '600',
            color: '#f8f9fa'
          }}>
            ${portfolio.balance.toFixed(0)}
          </div>
        </div>
        <div style={{
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '8px',
          padding: '8px',
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: '11px',
            color: '#9ca3af',
            marginBottom: '2px'
          }}>
            P/L
          </div>
          <div style={{
            fontSize: '14px',
            fontWeight: '600',
            color: portfolio.profit >= 0 ? '#10b981' : '#ef4444'
          }}>
            {portfolio.profit >= 0 ? '+' : ''}${portfolio.profit.toFixed(0)}
          </div>
        </div>
      </div>

      {/* Trading Actions */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '8px'
      }}>
        <button
          onClick={handleBuy}
          disabled={portfolio.balance < currentPrice}
          style={{
            padding: '10px',
            backgroundColor: '#10b981',
            border: 'none',
            borderRadius: '6px',
            color: 'white',
            fontSize: '14px',
            fontWeight: '600',
            cursor: portfolio.balance < currentPrice ? 'not-allowed' : 'pointer',
            opacity: portfolio.balance < currentPrice ? 0.5 : 1,
            transition: 'all 0.2s ease'
          }}
        >
          Buy
        </button>
        <button
          onClick={handleSell}
          disabled={portfolio.positions.length === 0}
          style={{
            padding: '10px',
            backgroundColor: '#ef4444',
            border: 'none',
            borderRadius: '6px',
            color: 'white',
            fontSize: '14px',
            fontWeight: '600',
            cursor: portfolio.positions.length === 0 ? 'not-allowed' : 'pointer',
            opacity: portfolio.positions.length === 0 ? 0.5 : 1,
            transition: 'all 0.2s ease'
          }}
        >
          Sell
        </button>
      </div>

      {/* Positions */}
      {portfolio.positions.length > 0 && (
        <div style={{
          marginTop: '12px',
          paddingTop: '12px',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <div style={{
            fontSize: '11px',
            color: '#9ca3af',
            marginBottom: '4px'
          }}>
            Positions: {portfolio.positions.length}
          </div>
        </div>
      )}
    </div>
  );
};

export default LiveTradingSimulator;