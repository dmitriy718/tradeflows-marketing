import React, { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';

// Live Trading Simulator with Real Market Data
const LiveTradingSimulator = ({ embedded = false, onTradeComplete }) => {
  const [isActive, setIsActive] = useState(embedded);
  const [balance, setBalance] = useState(10000);
  const [portfolio, setPortfolio] = useState([]);
  const [marketData, setMarketData] = useState({});
  const [selectedSymbol, setSelectedSymbol] = useState('AAPL');
  const [orderType, setOrderType] = useState('market');
  const [quantity, setQuantity] = useState(1);
  const [currentPrice, setCurrentPrice] = useState(0);
  const [priceHistory, setPriceHistory] = useState([]);
  const [trades, setTrades] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [userRank, setUserRank] = useState(null);
  const [achievements, setAchievements] = useState([]);
  const [news, setNews] = useState([]);
  const [aiPrediction, setAiPrediction] = useState(null);
  const [chartType, setChartType] = useState('candlestick');
  const [indicators, setIndicators] = useState(['SMA', 'RSI']);
  const [alerts, setAlerts] = useState([]);
  const [isCompeting, setIsCompeting] = useState(false);
  const [competitionTime, setCompetitionTime] = useState(300); // 5 minutes

  const chartCanvasRef = useRef(null);
  const websocketRef = useRef(null);
  const animationFrameRef = useRef(null);

  // Popular trading symbols
  const symbols = [
    { ticker: 'AAPL', name: 'Apple Inc.', sector: 'Technology' },
    { ticker: 'TSLA', name: 'Tesla Inc.', sector: 'Automotive' },
    { ticker: 'GOOGL', name: 'Alphabet Inc.', sector: 'Technology' },
    { ticker: 'AMZN', name: 'Amazon.com Inc.', sector: 'E-Commerce' },
    { ticker: 'MSFT', name: 'Microsoft Corp.', sector: 'Technology' },
    { ticker: 'NVDA', name: 'NVIDIA Corp.', sector: 'Semiconductors' },
    { ticker: 'META', name: 'Meta Platforms', sector: 'Social Media' },
    { ticker: 'BTC', name: 'Bitcoin', sector: 'Cryptocurrency' },
    { ticker: 'ETH', name: 'Ethereum', sector: 'Cryptocurrency' },
    { ticker: 'SPY', name: 'S&P 500 ETF', sector: 'Index Fund' }
  ];

  useEffect(() => {
    if (isActive) {
      initializeSimulator();
      connectToMarketData();
      startPriceSimulation();
      fetchLeaderboard();
      generateNews();
    }

    return () => {
      if (websocketRef.current) {
        websocketRef.current.close();
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isActive]);

  // Initialize simulator
  const initializeSimulator = () => {
    // Set initial prices for all symbols
    const initialPrices = {};
    symbols.forEach(symbol => {
      initialPrices[symbol.ticker] = generateInitialPrice(symbol.ticker);
    });
    setMarketData(initialPrices);
    setCurrentPrice(initialPrices[selectedSymbol]);

    // Initialize price history
    const history = generatePriceHistory(selectedSymbol, 100);
    setPriceHistory(history);

    // Load saved progress if exists
    const savedProgress = localStorage.getItem('tradingSimulatorProgress');
    if (savedProgress) {
      const progress = JSON.parse(savedProgress);
      setBalance(progress.balance || 10000);
      setPortfolio(progress.portfolio || []);
      setTrades(progress.trades || []);
      setAchievements(progress.achievements || []);
    }
  };

  // Connect to simulated market data
  const connectToMarketData = () => {
    // Simulate WebSocket connection for real-time data
    const simulateWebSocket = {
      send: (data) => console.log('Sending:', data),
      close: () => console.log('WebSocket closed'),
      readyState: 1
    };

    websocketRef.current = simulateWebSocket;

    // Simulate incoming market data
    const marketUpdateInterval = setInterval(() => {
      if (!isActive) {
        clearInterval(marketUpdateInterval);
        return;
      }

      updateMarketPrices();
    }, 1000);
  };

  // Start price simulation
  const startPriceSimulation = () => {
    const animate = () => {
      if (!chartCanvasRef.current) return;

      drawChart();
      updateIndicators();

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();
  };

  // Generate initial price for a symbol
  const generateInitialPrice = (ticker) => {
    const basePrices = {
      AAPL: 175 + Math.random() * 10,
      TSLA: 250 + Math.random() * 20,
      GOOGL: 140 + Math.random() * 10,
      AMZN: 130 + Math.random() * 10,
      MSFT: 380 + Math.random() * 15,
      NVDA: 480 + Math.random() * 30,
      META: 320 + Math.random() * 20,
      BTC: 45000 + Math.random() * 2000,
      ETH: 2500 + Math.random() * 200,
      SPY: 450 + Math.random() * 10
    };

    return basePrices[ticker] || 100 + Math.random() * 50;
  };

  // Generate price history
  const generatePriceHistory = (symbol, count) => {
    const history = [];
    let basePrice = generateInitialPrice(symbol);

    for (let i = 0; i < count; i++) {
      const volatility = symbol.includes('BTC') || symbol.includes('ETH') ? 0.03 : 0.01;
      const change = (Math.random() - 0.5) * volatility * basePrice;
      const open = basePrice;
      const close = basePrice + change;
      const high = Math.max(open, close) + Math.random() * volatility * basePrice;
      const low = Math.min(open, close) - Math.random() * volatility * basePrice;
      const volume = Math.round(1000000 + Math.random() * 5000000);

      history.push({
        timestamp: Date.now() - (count - i) * 60000,
        open,
        high,
        low,
        close,
        volume
      });

      basePrice = close;
    }

    return history;
  };

  // Update market prices
  const updateMarketPrices = () => {
    setMarketData(prev => {
      const updated = { ...prev };

      Object.keys(updated).forEach(ticker => {
        const volatility = ticker.includes('BTC') || ticker.includes('ETH') ? 0.005 : 0.002;
        const change = (Math.random() - 0.5) * volatility;
        updated[ticker] = updated[ticker] * (1 + change);
      });

      return updated;
    });

    // Update current price for selected symbol
    setCurrentPrice(prev => {
      const volatility = selectedSymbol.includes('BTC') || selectedSymbol.includes('ETH') ? 0.005 : 0.002;
      const change = (Math.random() - 0.5) * volatility;
      const newPrice = prev * (1 + change);

      // Add to price history
      setPriceHistory(history => {
        const newCandle = {
          timestamp: Date.now(),
          open: history[history.length - 1]?.close || newPrice,
          high: newPrice * 1.001,
          low: newPrice * 0.999,
          close: newPrice,
          volume: Math.round(1000000 + Math.random() * 5000000)
        };

        return [...history.slice(-99), newCandle];
      });

      // Check for price alerts
      checkPriceAlerts(newPrice);

      return newPrice;
    });

    // Update portfolio values
    updatePortfolioValues();

    // Generate AI prediction occasionally
    if (Math.random() < 0.1) {
      generateAIPrediction();
    }
  };

  // Draw chart
  const drawChart = () => {
    const canvas = chartCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    // Clear canvas
    ctx.fillStyle = '#0a0e27';
    ctx.fillRect(0, 0, width, height);

    // Draw grid
    drawGrid(ctx, width, height);

    // Draw price data based on chart type
    if (chartType === 'candlestick') {
      drawCandlesticks(ctx, width, height);
    } else if (chartType === 'line') {
      drawLineChart(ctx, width, height);
    } else if (chartType === 'area') {
      drawAreaChart(ctx, width, height);
    }

    // Draw indicators
    indicators.forEach(indicator => {
      drawIndicator(ctx, width, height, indicator);
    });

    // Draw volume bars
    drawVolumeBars(ctx, width, height);

    // Draw current price line
    drawCurrentPriceLine(ctx, width, height);
  };

  // Draw candlesticks
  const drawCandlesticks = (ctx, width, height) => {
    const candles = priceHistory.slice(-50);
    if (candles.length === 0) return;

    const candleWidth = width / 50;
    const maxPrice = Math.max(...candles.map(c => c.high));
    const minPrice = Math.min(...candles.map(c => c.low));
    const priceRange = maxPrice - minPrice;

    candles.forEach((candle, i) => {
      const x = i * candleWidth + candleWidth / 2;
      const color = candle.close > candle.open ? '#00ff88' : '#ff4444';

      // Draw wick
      ctx.strokeStyle = color;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(x, ((maxPrice - candle.high) / priceRange) * height * 0.7);
      ctx.lineTo(x, ((maxPrice - candle.low) / priceRange) * height * 0.7);
      ctx.stroke();

      // Draw body
      ctx.fillStyle = color;
      const bodyTop = ((maxPrice - Math.max(candle.open, candle.close)) / priceRange) * height * 0.7;
      const bodyHeight = Math.abs(candle.close - candle.open) / priceRange * height * 0.7;
      ctx.fillRect(x - candleWidth * 0.3, bodyTop, candleWidth * 0.6, bodyHeight || 1);
    });
  };

  // Draw indicators
  const drawIndicator = (ctx, width, height, indicatorType) => {
    if (indicatorType === 'SMA') {
      // Simple Moving Average
      const period = 20;
      const smaValues = calculateSMA(priceHistory.slice(-50), period);

      ctx.strokeStyle = '#4a90e2';
      ctx.lineWidth = 2;
      ctx.beginPath();

      smaValues.forEach((value, i) => {
        const x = (i + period) * (width / 50);
        const y = ((Math.max(...priceHistory.slice(-50).map(c => c.high)) - value) /
          (Math.max(...priceHistory.slice(-50).map(c => c.high)) -
           Math.min(...priceHistory.slice(-50).map(c => c.low)))) * height * 0.7;

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });

      ctx.stroke();
    } else if (indicatorType === 'RSI') {
      // Relative Strength Index
      const rsiValues = calculateRSI(priceHistory.slice(-50));
      const rsiHeight = height * 0.2;
      const rsiY = height * 0.75;

      // Draw RSI background
      ctx.fillStyle = 'rgba(74, 144, 226, 0.1)';
      ctx.fillRect(0, rsiY, width, rsiHeight);

      // Draw overbought/oversold lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.lineWidth = 1;
      ctx.setLineDash([5, 5]);

      // 70 line
      ctx.beginPath();
      ctx.moveTo(0, rsiY + rsiHeight * 0.3);
      ctx.lineTo(width, rsiY + rsiHeight * 0.3);
      ctx.stroke();

      // 30 line
      ctx.beginPath();
      ctx.moveTo(0, rsiY + rsiHeight * 0.7);
      ctx.lineTo(width, rsiY + rsiHeight * 0.7);
      ctx.stroke();

      ctx.setLineDash([]);

      // Draw RSI line
      ctx.strokeStyle = '#ffd700';
      ctx.lineWidth = 2;
      ctx.beginPath();

      rsiValues.forEach((value, i) => {
        const x = i * (width / 50);
        const y = rsiY + rsiHeight * (1 - value / 100);

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });

      ctx.stroke();
    }
  };

  // Calculate SMA
  const calculateSMA = (data, period) => {
    const result = [];
    for (let i = period - 1; i < data.length; i++) {
      const sum = data.slice(i - period + 1, i + 1).reduce((acc, candle) => acc + candle.close, 0);
      result.push(sum / period);
    }
    return result;
  };

  // Calculate RSI
  const calculateRSI = (data) => {
    const period = 14;
    const changes = [];

    for (let i = 1; i < data.length; i++) {
      changes.push(data[i].close - data[i - 1].close);
    }

    const result = [];
    for (let i = period; i < changes.length; i++) {
      const gains = changes.slice(i - period, i).filter(c => c > 0);
      const losses = changes.slice(i - period, i).filter(c => c < 0);

      const avgGain = gains.length > 0 ? gains.reduce((a, b) => a + b, 0) / period : 0;
      const avgLoss = losses.length > 0 ? Math.abs(losses.reduce((a, b) => a + b, 0) / period) : 0;

      const rs = avgLoss === 0 ? 100 : avgGain / avgLoss;
      const rsi = 100 - (100 / (1 + rs));

      result.push(rsi);
    }

    return result;
  };

  // Execute trade
  const executeTrade = (type) => {
    const price = currentPrice;
    const total = price * quantity;
    const commission = total * 0.001; // 0.1% commission

    if (type === 'buy') {
      if (balance >= total + commission) {
        // Update balance
        setBalance(prev => prev - total - commission);

        // Add to portfolio
        const existingPosition = portfolio.find(p => p.symbol === selectedSymbol);
        if (existingPosition) {
          existingPosition.quantity += quantity;
          existingPosition.averagePrice = (
            (existingPosition.averagePrice * (existingPosition.quantity - quantity) + price * quantity) /
            existingPosition.quantity
          );
          setPortfolio([...portfolio]);
        } else {
          setPortfolio(prev => [...prev, {
            symbol: selectedSymbol,
            quantity,
            averagePrice: price,
            currentPrice: price
          }]);
        }

        // Record trade
        const trade = {
          id: Date.now(),
          type: 'buy',
          symbol: selectedSymbol,
          quantity,
          price,
          commission,
          timestamp: new Date()
        };

        setTrades(prev => [...prev, trade]);

        // Show notification
        showNotification(`Bought ${quantity} ${selectedSymbol} at $${price.toFixed(2)}`, 'success');

        // Check achievements
        checkAchievements('buy', trade);

        // Save progress
        saveProgress();
      } else {
        showNotification('Insufficient funds!', 'error');
      }
    } else if (type === 'sell') {
      const position = portfolio.find(p => p.symbol === selectedSymbol);

      if (position && position.quantity >= quantity) {
        // Calculate profit/loss
        const proceeds = price * quantity - commission;
        const cost = position.averagePrice * quantity;
        const profit = proceeds - cost;

        // Update balance
        setBalance(prev => prev + proceeds);

        // Update portfolio
        if (position.quantity === quantity) {
          setPortfolio(prev => prev.filter(p => p.symbol !== selectedSymbol));
        } else {
          position.quantity -= quantity;
          setPortfolio([...portfolio]);
        }

        // Record trade
        const trade = {
          id: Date.now(),
          type: 'sell',
          symbol: selectedSymbol,
          quantity,
          price,
          profit,
          commission,
          timestamp: new Date()
        };

        setTrades(prev => [...prev, trade]);

        // Show notification
        const profitText = profit > 0 ? `+$${profit.toFixed(2)}` : `-$${Math.abs(profit).toFixed(2)}`;
        showNotification(
          `Sold ${quantity} ${selectedSymbol} at $${price.toFixed(2)} (${profitText})`,
          profit > 0 ? 'success' : 'warning'
        );

        // Check achievements
        checkAchievements('sell', trade);

        // Update leaderboard if competing
        if (isCompeting) {
          updateLeaderboardScore();
        }

        // Save progress
        saveProgress();
      } else {
        showNotification(`You don't own enough ${selectedSymbol}!`, 'error');
      }
    }
  };

  // Check achievements
  const checkAchievements = (action, trade) => {
    const newAchievements = [];

    // First trade
    if (trades.length === 0) {
      newAchievements.push({
        id: 'first_trade',
        title: 'First Trade!',
        description: 'Executed your first trade',
        icon: '🎯'
      });
    }

    // Profitable trade
    if (trade.profit > 0) {
      newAchievements.push({
        id: 'profitable_trade',
        title: 'Profit Maker!',
        description: 'Made a profitable trade',
        icon: '💰'
      });
    }

    // Day trader (10 trades)
    if (trades.length >= 9) {
      newAchievements.push({
        id: 'day_trader',
        title: 'Day Trader!',
        description: 'Executed 10 trades',
        icon: '📈'
      });
    }

    // Diversified (5 different symbols)
    const uniqueSymbols = new Set(trades.map(t => t.symbol));
    if (uniqueSymbols.size >= 5) {
      newAchievements.push({
        id: 'diversified',
        title: 'Diversified!',
        description: 'Traded 5 different symbols',
        icon: '🌐'
      });
    }

    // Show new achievements
    newAchievements.forEach(achievement => {
      if (!achievements.some(a => a.id === achievement.id)) {
        setAchievements(prev => [...prev, achievement]);
        showAchievementNotification(achievement);
      }
    });
  };

  // Show achievement notification
  const showAchievementNotification = (achievement) => {
    const notification = document.createElement('div');
    notification.className = 'achievement-popup';
    notification.innerHTML = `
      <div class="achievement-content">
        <span class="achievement-icon">${achievement.icon}</span>
        <div>
          <div class="achievement-title">${achievement.title}</div>
          <div class="achievement-desc">${achievement.description}</div>
        </div>
      </div>
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.classList.add('show');
    }, 100);

    setTimeout(() => {
      notification.remove();
    }, 3000);
  };

  // Generate AI prediction
  const generateAIPrediction = () => {
    const sentiment = Math.random();
    const confidence = 50 + Math.random() * 50;
    const timeframe = ['1 hour', '4 hours', '1 day'][Math.floor(Math.random() * 3)];

    const prediction = {
      direction: sentiment > 0.5 ? 'bullish' : 'bearish',
      confidence: confidence.toFixed(1),
      targetPrice: currentPrice * (sentiment > 0.5 ? 1.02 : 0.98),
      timeframe,
      reasoning: generateAIReasoning(sentiment > 0.5)
    };

    setAiPrediction(prediction);
  };

  // Generate AI reasoning
  const generateAIReasoning = (bullish) => {
    const bullishReasons = [
      'Strong momentum indicators',
      'Breakout above resistance',
      'Positive market sentiment',
      'High volume confirmation',
      'Bullish chart pattern forming'
    ];

    const bearishReasons = [
      'Overbought conditions',
      'Resistance at current levels',
      'Declining volume',
      'Bearish divergence detected',
      'Support level breakdown'
    ];

    return bullish
      ? bullishReasons[Math.floor(Math.random() * bullishReasons.length)]
      : bearishReasons[Math.floor(Math.random() * bearishReasons.length)];
  };

  // Generate news
  const generateNews = () => {
    const newsTemplates = [
      { title: '{symbol} Reports Record Earnings', impact: 'positive' },
      { title: 'Analysts Upgrade {symbol} to Buy', impact: 'positive' },
      { title: '{symbol} Announces New Product Launch', impact: 'positive' },
      { title: '{symbol} Faces Regulatory Scrutiny', impact: 'negative' },
      { title: 'Market Volatility Impacts {symbol}', impact: 'neutral' },
      { title: '{symbol} CEO Announces Expansion Plans', impact: 'positive' },
      { title: 'Breaking: {symbol} Partnership Announced', impact: 'positive' },
      { title: '{symbol} Stock Under Pressure', impact: 'negative' }
    ];

    const newsList = [];
    for (let i = 0; i < 5; i++) {
      const template = newsTemplates[Math.floor(Math.random() * newsTemplates.length)];
      const symbol = symbols[Math.floor(Math.random() * symbols.length)];

      newsList.push({
        id: Date.now() + i,
        title: template.title.replace('{symbol}', symbol.name),
        impact: template.impact,
        time: `${Math.floor(Math.random() * 60)} min ago`,
        symbol: symbol.ticker
      });
    }

    setNews(newsList);

    // Update news periodically
    setTimeout(() => {
      if (isActive) {
        generateNews();
      }
    }, 30000);
  };

  // Fetch leaderboard
  const fetchLeaderboard = async () => {
    // Simulate fetching leaderboard data
    const leaders = [
      { rank: 1, name: 'TradeMaster', profit: 15234, winRate: 78 },
      { rank: 2, name: 'BullRunner', profit: 12847, winRate: 72 },
      { rank: 3, name: 'AlphaTrader', profit: 10923, winRate: 69 },
      { rank: 4, name: 'MarketWizard', profit: 9234, winRate: 71 },
      { rank: 5, name: 'ProfitHunter', profit: 8123, winRate: 65 }
    ];

    setLeaderboard(leaders);

    // Calculate user rank
    const totalProfit = calculateTotalProfit();
    const userPosition = leaders.findIndex(l => l.profit < totalProfit) + 1 || leaders.length + 1;
    setUserRank(userPosition);
  };

  // Calculate total profit
  const calculateTotalProfit = () => {
    const realizedProfit = trades
      .filter(t => t.type === 'sell')
      .reduce((sum, t) => sum + (t.profit || 0), 0);

    const unrealizedProfit = portfolio.reduce((sum, position) => {
      const currentValue = position.quantity * (marketData[position.symbol] || position.currentPrice);
      const cost = position.quantity * position.averagePrice;
      return sum + (currentValue - cost);
    }, 0);

    return realizedProfit + unrealizedProfit;
  };

  // Start competition mode
  const startCompetition = () => {
    setIsCompeting(true);
    setCompetitionTime(300);

    // Reset for fair competition
    setBalance(10000);
    setPortfolio([]);
    setTrades([]);

    showNotification('Competition started! You have 5 minutes to maximize profits!', 'info');

    // Competition timer
    const timer = setInterval(() => {
      setCompetitionTime(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          endCompetition();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // End competition
  const endCompetition = () => {
    setIsCompeting(false);

    const finalProfit = calculateTotalProfit();
    const winRate = calculateWinRate();

    // Show results
    showCompetitionResults({
      profit: finalProfit,
      winRate,
      trades: trades.length,
      rank: userRank
    });

    // Save to leaderboard
    submitToLeaderboard(finalProfit, winRate);
  };

  // Show competition results
  const showCompetitionResults = (results) => {
    const modal = document.createElement('div');
    modal.className = 'competition-results-modal';
    modal.innerHTML = `
      <div class="results-content">
        <h2>Competition Complete!</h2>
        <div class="results-stats">
          <div class="stat">
            <span class="label">Final Profit:</span>
            <span class="value ${results.profit > 0 ? 'positive' : 'negative'}">
              $${results.profit.toFixed(2)}
            </span>
          </div>
          <div class="stat">
            <span class="label">Win Rate:</span>
            <span class="value">${results.winRate}%</span>
          </div>
          <div class="stat">
            <span class="label">Total Trades:</span>
            <span class="value">${results.trades}</span>
          </div>
          <div class="stat">
            <span class="label">Your Rank:</span>
            <span class="value">#${results.rank}</span>
          </div>
        </div>
        <button class="close-btn">Continue Trading</button>
      </div>
    `;

    document.body.appendChild(modal);

    modal.querySelector('.close-btn').addEventListener('click', () => {
      modal.remove();
    });
  };

  // Calculate win rate
  const calculateWinRate = () => {
    const sellTrades = trades.filter(t => t.type === 'sell');
    if (sellTrades.length === 0) return 0;

    const profitableTrades = sellTrades.filter(t => t.profit > 0);
    return Math.round((profitableTrades.length / sellTrades.length) * 100);
  };

  // Save progress
  const saveProgress = () => {
    const progress = {
      balance,
      portfolio,
      trades,
      achievements
    };

    localStorage.setItem('tradingSimulatorProgress', JSON.stringify(progress));
  };

  // Show notification
  const showNotification = (message, type) => {
    const notification = document.createElement('div');
    notification.className = `trading-notification ${type}`;
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.classList.add('show');
    }, 100);

    setTimeout(() => {
      notification.remove();
    }, 3000);
  };

  // Render simulator
  const renderSimulator = () => {
    return (
      <div className={`trading-simulator ${embedded ? 'embedded' : 'fullscreen'}`}>
        {!embedded && (
          <button className="close-simulator" onClick={() => setIsActive(false)}>
            ✕
          </button>
        )}

        <div className="simulator-header">
          <h2>🎮 Live Trading Simulator</h2>
          <div className="account-info">
            <span className="balance">
              Balance: ${balance.toFixed(2)}
            </span>
            <span className="total-value">
              Total: ${(balance + calculatePortfolioValue()).toFixed(2)}
            </span>
            <span className={`profit ${calculateTotalProfit() >= 0 ? 'positive' : 'negative'}`}>
              P&L: ${calculateTotalProfit().toFixed(2)}
            </span>
          </div>
          {isCompeting && (
            <div className="competition-timer">
              ⏱️ {Math.floor(competitionTime / 60)}:{(competitionTime % 60).toString().padStart(2, '0')}
            </div>
          )}
        </div>

        <div className="simulator-content">
          <div className="left-panel">
            <div className="symbol-selector">
              <select
                value={selectedSymbol}
                onChange={(e) => {
                  setSelectedSymbol(e.target.value);
                  setPriceHistory(generatePriceHistory(e.target.value, 100));
                }}
              >
                {symbols.map(symbol => (
                  <option key={symbol.ticker} value={symbol.ticker}>
                    {symbol.ticker} - {symbol.name}
                  </option>
                ))}
              </select>
              <div className="current-price">
                ${currentPrice.toFixed(2)}
                <span className={getPriceChange() >= 0 ? 'up' : 'down'}>
                  {getPriceChange() >= 0 ? '▲' : '▼'} {Math.abs(getPriceChange()).toFixed(2)}%
                </span>
              </div>
            </div>

            <div className="chart-container">
              <div className="chart-controls">
                <button
                  className={chartType === 'candlestick' ? 'active' : ''}
                  onClick={() => setChartType('candlestick')}
                >
                  Candles
                </button>
                <button
                  className={chartType === 'line' ? 'active' : ''}
                  onClick={() => setChartType('line')}
                >
                  Line
                </button>
                <button
                  className={chartType === 'area' ? 'active' : ''}
                  onClick={() => setChartType('area')}
                >
                  Area
                </button>
              </div>
              <canvas
                ref={chartCanvasRef}
                width={600}
                height={400}
                className="price-chart"
              />
              <div className="indicator-toggles">
                <label>
                  <input
                    type="checkbox"
                    checked={indicators.includes('SMA')}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setIndicators([...indicators, 'SMA']);
                      } else {
                        setIndicators(indicators.filter(i => i !== 'SMA'));
                      }
                    }}
                  />
                  SMA
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={indicators.includes('RSI')}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setIndicators([...indicators, 'RSI']);
                      } else {
                        setIndicators(indicators.filter(i => i !== 'RSI'));
                      }
                    }}
                  />
                  RSI
                </label>
              </div>
            </div>

            <div className="trading-panel">
              <div className="order-type-selector">
                <button
                  className={orderType === 'market' ? 'active' : ''}
                  onClick={() => setOrderType('market')}
                >
                  Market Order
                </button>
                <button
                  className={orderType === 'limit' ? 'active' : ''}
                  onClick={() => setOrderType('limit')}
                >
                  Limit Order
                </button>
              </div>

              <div className="quantity-selector">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                />
                <button onClick={() => setQuantity(quantity + 1)}>+</button>
              </div>

              <div className="trade-buttons">
                <button className="buy-btn" onClick={() => executeTrade('buy')}>
                  Buy {quantity} @ ${currentPrice.toFixed(2)}
                </button>
                <button className="sell-btn" onClick={() => executeTrade('sell')}>
                  Sell {quantity} @ ${currentPrice.toFixed(2)}
                </button>
              </div>

              <div className="quick-amounts">
                <button onClick={() => setQuantity(1)}>1</button>
                <button onClick={() => setQuantity(5)}>5</button>
                <button onClick={() => setQuantity(10)}>10</button>
                <button onClick={() => setQuantity(25)}>25</button>
                <button onClick={() => setQuantity(100)}>100</button>
              </div>
            </div>
          </div>

          <div className="right-panel">
            {aiPrediction && (
              <div className="ai-prediction">
                <h3>🤖 AI Analysis</h3>
                <div className={`prediction ${aiPrediction.direction}`}>
                  <span className="direction">{aiPrediction.direction.toUpperCase()}</span>
                  <span className="confidence">{aiPrediction.confidence}% confident</span>
                </div>
                <div className="prediction-details">
                  <p>Target: ${aiPrediction.targetPrice.toFixed(2)}</p>
                  <p>Timeframe: {aiPrediction.timeframe}</p>
                  <p>Reason: {aiPrediction.reasoning}</p>
                </div>
              </div>
            )}

            <div className="portfolio-section">
              <h3>📊 Portfolio</h3>
              {portfolio.length === 0 ? (
                <p className="empty-portfolio">No positions yet</p>
              ) : (
                <div className="portfolio-list">
                  {portfolio.map(position => (
                    <div key={position.symbol} className="position-item">
                      <div className="position-header">
                        <span className="symbol">{position.symbol}</span>
                        <span className="quantity">{position.quantity} shares</span>
                      </div>
                      <div className="position-details">
                        <span>Avg: ${position.averagePrice.toFixed(2)}</span>
                        <span>Current: ${(marketData[position.symbol] || position.currentPrice).toFixed(2)}</span>
                        <span className={getPositionPnL(position) >= 0 ? 'profit' : 'loss'}>
                          {getPositionPnL(position) >= 0 ? '+' : ''}{getPositionPnL(position).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="news-section">
              <h3>📰 Market News</h3>
              <div className="news-list">
                {news.map(item => (
                  <div key={item.id} className={`news-item ${item.impact}`}>
                    <span className="news-time">{item.time}</span>
                    <span className="news-title">{item.title}</span>
                    {item.symbol && <span className="news-symbol">{item.symbol}</span>}
                  </div>
                ))}
              </div>
            </div>

            <div className="leaderboard-section">
              <h3>🏆 Leaderboard</h3>
              {!isCompeting && (
                <button className="compete-btn" onClick={startCompetition}>
                  Start 5-Min Competition
                </button>
              )}
              <div className="leaderboard-list">
                {leaderboard.map(leader => (
                  <div key={leader.rank} className="leader-item">
                    <span className="rank">#{leader.rank}</span>
                    <span className="name">{leader.name}</span>
                    <span className="profit">${leader.profit}</span>
                    <span className="win-rate">{leader.winRate}%</span>
                  </div>
                ))}
                {userRank && (
                  <div className="your-rank">
                    <span className="rank">#{userRank}</span>
                    <span className="name">You</span>
                    <span className="profit">${calculateTotalProfit().toFixed(0)}</span>
                    <span className="win-rate">{calculateWinRate()}%</span>
                  </div>
                )}
              </div>
            </div>

            <div className="achievements-section">
              <h3>🏅 Achievements</h3>
              <div className="achievements-grid">
                {achievements.map(achievement => (
                  <div key={achievement.id} className="achievement-badge" title={achievement.description}>
                    <span className="achievement-icon">{achievement.icon}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="trade-history">
          <h3>📜 Recent Trades</h3>
          <div className="trades-list">
            {trades.slice(-5).reverse().map(trade => (
              <div key={trade.id} className={`trade-item ${trade.type}`}>
                <span className="trade-type">{trade.type.toUpperCase()}</span>
                <span className="trade-symbol">{trade.symbol}</span>
                <span className="trade-quantity">{trade.quantity}x</span>
                <span className="trade-price">${trade.price.toFixed(2)}</span>
                {trade.profit !== undefined && (
                  <span className={`trade-profit ${trade.profit >= 0 ? 'positive' : 'negative'}`}>
                    {trade.profit >= 0 ? '+' : ''}{trade.profit.toFixed(2)}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Helper functions
  const calculatePortfolioValue = () => {
    return portfolio.reduce((sum, position) => {
      const currentPrice = marketData[position.symbol] || position.currentPrice;
      return sum + (position.quantity * currentPrice);
    }, 0);
  };

  const getPositionPnL = (position) => {
    const currentValue = position.quantity * (marketData[position.symbol] || position.currentPrice);
    const cost = position.quantity * position.averagePrice;
    return currentValue - cost;
  };

  const getPriceChange = () => {
    if (priceHistory.length < 2) return 0;
    const previousClose = priceHistory[priceHistory.length - 2]?.close || currentPrice;
    return ((currentPrice - previousClose) / previousClose) * 100;
  };

  const updatePortfolioValues = () => {
    setPortfolio(prev => prev.map(position => ({
      ...position,
      currentPrice: marketData[position.symbol] || position.currentPrice
    })));
  };

  const checkPriceAlerts = (price) => {
    // Check user-defined price alerts
    alerts.forEach(alert => {
      if (alert.symbol === selectedSymbol) {
        if (
          (alert.type === 'above' && price > alert.price) ||
          (alert.type === 'below' && price < alert.price)
        ) {
          showNotification(
            `🔔 Alert: ${selectedSymbol} is ${alert.type} ${alert.price}`,
            'info'
          );
        }
      }
    });
  };

  const updateLeaderboardScore = () => {
    // Submit score to leaderboard
    const score = calculateTotalProfit();
    // This would normally submit to a backend
    console.log('Updating leaderboard score:', score);
  };

  const submitToLeaderboard = (profit, winRate) => {
    // Submit final competition results
    const results = {
      profit,
      winRate,
      trades: trades.length,
      timestamp: Date.now()
    };

    // This would normally submit to a backend
    fetch('/api/simulator/leaderboard', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(results)
    }).catch(err => console.error('Failed to submit score:', err));
  };

  const drawGrid = (ctx, width, height) => {
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1;

    // Vertical lines
    for (let x = 0; x < width; x += 50) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }

    // Horizontal lines
    for (let y = 0; y < height; y += 50) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
  };

  const drawLineChart = (ctx, width, height) => {
    const prices = priceHistory.slice(-50);
    if (prices.length === 0) return;

    ctx.strokeStyle = '#00ff88';
    ctx.lineWidth = 2;
    ctx.beginPath();

    const maxPrice = Math.max(...prices.map(c => c.high));
    const minPrice = Math.min(...prices.map(c => c.low));
    const priceRange = maxPrice - minPrice;

    prices.forEach((candle, i) => {
      const x = (i / 50) * width;
      const y = ((maxPrice - candle.close) / priceRange) * height * 0.7;

      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });

    ctx.stroke();
  };

  const drawAreaChart = (ctx, width, height) => {
    const prices = priceHistory.slice(-50);
    if (prices.length === 0) return;

    const maxPrice = Math.max(...prices.map(c => c.high));
    const minPrice = Math.min(...prices.map(c => c.low));
    const priceRange = maxPrice - minPrice;

    // Create gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, height * 0.7);
    gradient.addColorStop(0, 'rgba(0, 255, 136, 0.4)');
    gradient.addColorStop(1, 'rgba(0, 255, 136, 0)');

    ctx.fillStyle = gradient;
    ctx.beginPath();

    // Start from bottom left
    ctx.moveTo(0, height * 0.7);

    // Draw top line
    prices.forEach((candle, i) => {
      const x = (i / 50) * width;
      const y = ((maxPrice - candle.close) / priceRange) * height * 0.7;
      ctx.lineTo(x, y);
    });

    // Close the path
    ctx.lineTo(width, height * 0.7);
    ctx.closePath();
    ctx.fill();

    // Draw the line on top
    drawLineChart(ctx, width, height);
  };

  const drawVolumeBars = (ctx, width, height) => {
    const volumes = priceHistory.slice(-50).map(c => c.volume);
    if (volumes.length === 0) return;

    const maxVolume = Math.max(...volumes);
    const barWidth = width / 50;
    const volumeHeight = height * 0.15;
    const volumeY = height * 0.98 - volumeHeight;

    volumes.forEach((volume, i) => {
      const x = i * barWidth;
      const barHeight = (volume / maxVolume) * volumeHeight;

      ctx.fillStyle = 'rgba(74, 144, 226, 0.3)';
      ctx.fillRect(x, volumeY + (volumeHeight - barHeight), barWidth - 1, barHeight);
    });
  };

  const drawCurrentPriceLine = (ctx, width, height) => {
    const prices = priceHistory.slice(-50);
    if (prices.length === 0) return;

    const maxPrice = Math.max(...prices.map(c => c.high));
    const minPrice = Math.min(...prices.map(c => c.low));
    const priceRange = maxPrice - minPrice;

    const y = ((maxPrice - currentPrice) / priceRange) * height * 0.7;

    ctx.strokeStyle = '#ffd700';
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 5]);

    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();

    ctx.setLineDash([]);

    // Price label
    ctx.fillStyle = '#ffd700';
    ctx.fillRect(width - 80, y - 12, 80, 24);
    ctx.fillStyle = '#0a0e27';
    ctx.font = '12px monospace';
    ctx.textAlign = 'right';
    ctx.fillText(`$${currentPrice.toFixed(2)}`, width - 5, y + 4);
  };

  return (
    <div className="trading-simulator-container">
      {!isActive && !embedded && (
        <button
          className="open-simulator-btn"
          onClick={() => setIsActive(true)}
        >
          🎮 Try Live Trading Simulator
        </button>
      )}
      {isActive && (embedded ? renderSimulator() : createPortal(renderSimulator(), document.body))}
    </div>
  );
};

export default LiveTradingSimulator;