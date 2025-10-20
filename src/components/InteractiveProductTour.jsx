import React, { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';

// Interactive Product Tour with AI-Powered Guidance
const InteractiveProductTour = ({ onComplete, autoStart = false }) => {
  const [isActive, setIsActive] = useState(autoStart);
  const [currentStep, setCurrentStep] = useState(0);
  const [userPath, setUserPath] = useState([]);
  const [personalizationData, setPersonalizationData] = useState({});
  const [aiGuideMessages, setAiGuideMessages] = useState([]);
  const [userInteractions, setUserInteractions] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [tourProgress, setTourProgress] = useState(0);
  const [achievements, setAchievements] = useState([]);

  const overlayRef = useRef(null);
  const spotlightRef = useRef(null);
  const videoRef = useRef(null);
  const aiChatRef = useRef(null);

  // Tour steps with interactive elements
  const tourSteps = [
    {
      id: 'welcome',
      title: 'Welcome to TradeFlows Pro!',
      description: 'The most advanced AI-powered trading platform',
      type: 'modal',
      interactive: true,
      duration: 5000,
      animation: 'fadeInScale',
      content: (
        <div className="welcome-screen">
          <video autoPlay muted loop className="background-video">
            <source src="/videos/trading-hero.mp4" type="video/mp4" />
          </video>
          <div className="welcome-content">
            <h1 className="animated-title">Welcome to Your Trading Future</h1>
            <p className="subtitle">Let's take a personalized journey through TradeFlows Pro</p>
            <div className="user-questions">
              <h3>Tell us about yourself:</h3>
              <div className="question-buttons">
                <button onClick={() => handleUserChoice('beginner')} className="choice-btn">
                  🌱 I'm new to trading
                </button>
                <button onClick={() => handleUserChoice('intermediate')} className="choice-btn">
                  📈 I have some experience
                </button>
                <button onClick={() => handleUserChoice('expert')} className="choice-btn">
                  🚀 I'm an experienced trader
                </button>
              </div>
            </div>
          </div>
        </div>
      ),
      achievements: ['tour_started']
    },
    {
      id: 'live-charts',
      title: 'Real-Time Market Data',
      description: 'Experience lightning-fast charts with millisecond updates',
      targetElement: '.chart-demo',
      type: 'spotlight',
      interactive: true,
      simulation: 'liveChart',
      content: (
        <div className="feature-demo">
          <div className="interactive-chart" id="tour-chart">
            <canvas ref={initializeChart} />
          </div>
          <div className="chart-controls">
            <button onClick={() => simulateMarketMove('up')}>📈 Simulate Rally</button>
            <button onClick={() => simulateMarketMove('down')}>📉 Simulate Dip</button>
            <button onClick={() => simulateMarketMove('volatile')}>🎢 Volatile Market</button>
          </div>
          <div className="feature-highlights">
            <div className="highlight-item">
              <span className="icon">⚡</span>
              <span>50ms latency</span>
            </div>
            <div className="highlight-item">
              <span className="icon">📊</span>
              <span>100+ indicators</span>
            </div>
            <div className="highlight-item">
              <span className="icon">🔄</span>
              <span>Real-time sync</span>
            </div>
          </div>
        </div>
      ),
      aiTip: "Pro tip: Our charts update 20x faster than traditional platforms!",
      achievements: ['chart_interaction']
    },
    {
      id: 'ai-copilot',
      title: 'Your AI Trading Copilot',
      description: 'Meet your personal AI assistant that learns your trading style',
      type: 'interactive-demo',
      content: (
        <div className="ai-copilot-demo">
          <div className="ai-avatar">
            <div className="avatar-container">
              <div className="ai-face animated">
                <div className="eyes">
                  <div className="eye left"></div>
                  <div className="eye right"></div>
                </div>
                <div className="mouth speaking"></div>
              </div>
            </div>
            <div className="ai-chat">
              <div className="chat-messages" ref={aiChatRef}>
                {aiGuideMessages.map((msg, i) => (
                  <div key={i} className={`message ${msg.type}`}>
                    <span className="avatar">🤖</span>
                    <span className="text">{msg.text}</span>
                  </div>
                ))}
              </div>
              <input
                type="text"
                placeholder="Ask me anything about trading..."
                onKeyPress={handleAIChatInput}
                className="chat-input"
              />
            </div>
          </div>
          <div className="ai-capabilities">
            <h3>AI Capabilities:</h3>
            <ul className="capability-list">
              <li className="capability-item" data-animate="slideIn">
                <span className="icon">🧠</span>
                <span>Pattern Recognition</span>
                <span className="badge">ML Powered</span>
              </li>
              <li className="capability-item" data-animate="slideIn">
                <span className="icon">🎯</span>
                <span>Trade Recommendations</span>
                <span className="badge">95% Accuracy</span>
              </li>
              <li className="capability-item" data-animate="slideIn">
                <span className="icon">📰</span>
                <span>News Analysis</span>
                <span className="badge">Real-time</span>
              </li>
              <li className="capability-item" data-animate="slideIn">
                <span className="icon">⚠️</span>
                <span>Risk Management</span>
                <span className="badge">Advanced</span>
              </li>
            </ul>
          </div>
        </div>
      ),
      achievements: ['met_ai_copilot', 'asked_ai_question']
    },
    {
      id: 'collaborative-trading',
      title: 'Trade Together, Win Together',
      description: 'Join live trading rooms with experts and peers',
      type: 'immersive-video',
      content: (
        <div className="trading-room-preview">
          <video ref={videoRef} className="room-video" controls={false}>
            <source src="/videos/trading-room-demo.mp4" type="video/mp4" />
          </video>
          <div className="room-overlay">
            <div className="live-participants">
              <h4>Live Now:</h4>
              <div className="participant-bubbles">
                {generateParticipants().map((p, i) => (
                  <div key={i} className="participant" data-tooltip={p.name}>
                    <img src={p.avatar} alt={p.name} />
                    <span className="status-dot online"></span>
                  </div>
                ))}
              </div>
              <span className="participant-count">+247 traders online</span>
            </div>
            <div className="room-features">
              <div className="feature voice-chat">
                <span className="icon">🎤</span>
                <span>Voice Chat</span>
              </div>
              <div className="feature screen-share">
                <span className="icon">🖥️</span>
                <span>Screen Share</span>
              </div>
              <div className="feature live-trades">
                <span className="icon">💹</span>
                <span>Live Trades</span>
              </div>
            </div>
          </div>
          <button className="try-room-btn" onClick={simulateTradingRoom}>
            🚀 Try Trading Room
          </button>
        </div>
      ),
      achievements: ['explored_trading_room']
    },
    {
      id: 'automated-strategies',
      title: 'Automated Trading Strategies',
      description: 'Set it and forget it with our AI-powered automation',
      type: 'interactive-builder',
      content: (
        <div className="strategy-builder">
          <h3>Build Your Strategy:</h3>
          <div className="builder-interface">
            <div className="conditions-panel">
              <h4>When:</h4>
              <div className="condition-blocks">
                <div className="block draggable" draggable onDragStart={handleDragStart}>
                  📈 Price increases by
                  <input type="number" defaultValue="5" className="inline-input" />%
                </div>
                <div className="block draggable" draggable onDragStart={handleDragStart}>
                  📊 RSI is above
                  <input type="number" defaultValue="70" className="inline-input" />
                </div>
                <div className="block draggable" draggable onDragStart={handleDragStart}>
                  📰 Positive news sentiment
                </div>
              </div>
            </div>
            <div className="actions-panel">
              <h4>Then:</h4>
              <div className="action-blocks" onDrop={handleDrop} onDragOver={handleDragOver}>
                <div className="block-placeholder">Drop conditions here</div>
              </div>
              <div className="action-options">
                <button className="action-btn">💰 Buy</button>
                <button className="action-btn">💸 Sell</button>
                <button className="action-btn">🔔 Alert Me</button>
              </div>
            </div>
          </div>
          <div className="strategy-preview">
            <h4>Your Strategy:</h4>
            <div className="preview-text">
              {generateStrategyDescription()}
            </div>
            <button className="test-strategy-btn">⚡ Backtest Strategy</button>
          </div>
        </div>
      ),
      achievements: ['created_first_strategy']
    },
    {
      id: 'performance-analytics',
      title: 'Track Your Success',
      description: 'Advanced analytics to improve your trading',
      type: 'data-visualization',
      content: (
        <div className="analytics-showcase">
          <div className="metrics-grid">
            <div className="metric-card animate-count">
              <span className="value" data-target="247">0</span>
              <span className="label">Win Rate %</span>
              <div className="mini-chart">
                <svg viewBox="0 0 100 40">
                  <path d="M0,30 Q25,10 50,20 T100,5" stroke="#00ff88" fill="none" strokeWidth="2"/>
                </svg>
              </div>
            </div>
            <div className="metric-card animate-count">
              <span className="value" data-target="1847">0</span>
              <span className="label">Total Trades</span>
              <div className="mini-chart">
                <svg viewBox="0 0 100 40">
                  <path d="M0,35 L20,30 L40,20 L60,25 L80,10 L100,15" stroke="#4a90e2" fill="none" strokeWidth="2"/>
                </svg>
              </div>
            </div>
            <div className="metric-card animate-count">
              <span className="value">$<span data-target="52847">0</span></span>
              <span className="label">Total Profit</span>
              <div className="mini-chart">
                <svg viewBox="0 0 100 40">
                  <path d="M0,40 Q30,20 60,25 T100,10" stroke="#ffd700" fill="none" strokeWidth="2"/>
                </svg>
              </div>
            </div>
          </div>
          <div className="advanced-charts">
            <div className="heatmap">
              <h4>Performance Heatmap</h4>
              <div className="heatmap-grid">
                {generateHeatmap()}
              </div>
            </div>
            <div className="comparison-chart">
              <h4>You vs Market</h4>
              <canvas ref={initializeComparisonChart} />
            </div>
          </div>
        </div>
      ),
      achievements: ['viewed_analytics']
    },
    {
      id: 'pricing',
      title: 'Choose Your Plan',
      description: 'Start your journey with our special offer',
      type: 'interactive-pricing',
      content: (
        <div className="pricing-showcase">
          <div className="limited-offer">
            <div className="countdown-timer">
              <span className="timer-label">Limited Time Offer Ends In:</span>
              <div className="timer-display">
                <span className="time-unit">
                  <span className="value">{getTimeRemaining().hours}</span>
                  <span className="label">Hours</span>
                </span>
                <span className="separator">:</span>
                <span className="time-unit">
                  <span className="value">{getTimeRemaining().minutes}</span>
                  <span className="label">Minutes</span>
                </span>
                <span className="separator">:</span>
                <span className="time-unit">
                  <span className="value">{getTimeRemaining().seconds}</span>
                  <span className="label">Seconds</span>
                </span>
              </div>
            </div>
          </div>
          <div className="pricing-cards">
            <div className="pricing-card starter">
              <h3>Starter</h3>
              <div className="price">
                <span className="currency">$</span>
                <span className="amount">29</span>
                <span className="period">/month</span>
              </div>
              <ul className="features">
                <li>✅ Real-time charts</li>
                <li>✅ Basic indicators</li>
                <li>✅ Mobile app</li>
              </ul>
              <button className="select-plan-btn">Start Free Trial</button>
            </div>
            <div className="pricing-card pro featured">
              <div className="badge">MOST POPULAR</div>
              <h3>Pro</h3>
              <div className="price">
                <span className="currency">$</span>
                <span className="amount">79</span>
                <span className="period">/month</span>
                <div className="discount">Save $240/year</div>
              </div>
              <ul className="features">
                <li>✅ Everything in Starter</li>
                <li>✅ AI Trading Copilot</li>
                <li>✅ Automated strategies</li>
                <li>✅ Trading rooms</li>
                <li>✅ Advanced analytics</li>
              </ul>
              <button className="select-plan-btn primary">Start Free Trial</button>
            </div>
            <div className="pricing-card enterprise">
              <h3>Enterprise</h3>
              <div className="price">
                <span className="amount">Custom</span>
              </div>
              <ul className="features">
                <li>✅ Everything in Pro</li>
                <li>✅ Dedicated support</li>
                <li>✅ Custom integrations</li>
                <li>✅ White label options</li>
              </ul>
              <button className="select-plan-btn">Contact Sales</button>
            </div>
          </div>
        </div>
      ),
      achievements: ['viewed_pricing', 'tour_completed']
    }
  ];

  // Handle user personalization choices
  const handleUserChoice = (choice) => {
    setPersonalizationData(prev => ({ ...prev, experience: choice }));

    // Customize tour based on choice
    if (choice === 'beginner') {
      setAiGuideMessages([
        { type: 'ai', text: "Great! I'll guide you through everything step by step." },
        { type: 'ai', text: "Let's start with the basics and build your confidence!" }
      ]);
    } else if (choice === 'intermediate') {
      setAiGuideMessages([
        { type: 'ai', text: "Perfect! Let me show you our advanced features." },
        { type: 'ai', text: "You'll love our AI-powered tools!" }
      ]);
    } else {
      setAiGuideMessages([
        { type: 'ai', text: "Excellent! Let's dive into our pro features." },
        { type: 'ai', text: "I'll show you how to maximize your trading potential!" }
      ]);
    }

    // Track user path
    setUserPath(prev => [...prev, choice]);

    // Move to next step
    setTimeout(() => nextStep(), 2000);
  };

  // Initialize interactive chart
  const initializeChart = (canvas) => {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // Animate chart drawing
    let progress = 0;
    const animateChart = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw animated candlesticks
      const candles = generateCandlesticks(20);
      candles.forEach((candle, i) => {
        if (i < progress) {
          drawCandlestick(ctx, candle, i);
        }
      });

      if (progress < candles.length) {
        progress += 0.5;
        requestAnimationFrame(animateChart);
      }
    };

    animateChart();
  };

  // Simulate market movements
  const simulateMarketMove = (type) => {
    const canvas = document.querySelector('#tour-chart canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let frame = 0;
    const maxFrames = 60;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const candles = generateCandlesticks(20);

      // Apply movement based on type
      candles.forEach((candle, i) => {
        const factor = frame / maxFrames;

        if (type === 'up') {
          candle.high *= 1 + (factor * 0.1);
          candle.close *= 1 + (factor * 0.08);
        } else if (type === 'down') {
          candle.low *= 1 - (factor * 0.1);
          candle.close *= 1 - (factor * 0.08);
        } else {
          // Volatile
          candle.high *= 1 + (Math.sin(frame * 0.5) * 0.05);
          candle.low *= 1 - (Math.sin(frame * 0.5) * 0.05);
        }

        drawCandlestick(ctx, candle, i);
      });

      if (frame < maxFrames) {
        frame++;
        requestAnimationFrame(animate);
      }
    };

    animate();

    // Award achievement
    addAchievement('market_simulator');
  };

  // Handle AI chat input
  const handleAIChatInput = (e) => {
    if (e.key === 'Enter' && e.target.value.trim()) {
      const userMessage = e.target.value;

      // Add user message
      setAiGuideMessages(prev => [...prev,
        { type: 'user', text: userMessage }
      ]);

      // Simulate AI response
      setTimeout(() => {
        const response = generateAIResponse(userMessage);
        setAiGuideMessages(prev => [...prev,
          { type: 'ai', text: response }
        ]);

        // Scroll to bottom
        if (aiChatRef.current) {
          aiChatRef.current.scrollTop = aiChatRef.current.scrollHeight;
        }
      }, 1000);

      e.target.value = '';
      addAchievement('chatted_with_ai');
    }
  };

  // Generate AI response based on input
  const generateAIResponse = (input) => {
    const responses = {
      price: "Our Pro plan at $79/month includes all AI features, real-time data, and unlimited trading rooms!",
      features: "Key features include AI copilot, automated strategies, real-time collaboration, and advanced analytics.",
      demo: "You can start a 14-day free trial right now! No credit card required.",
      trading: "I can help you with strategy optimization, risk management, and market analysis!",
      default: "That's a great question! Our platform is designed to help traders at all levels succeed."
    };

    const keywords = Object.keys(responses);
    const matchedKey = keywords.find(key => input.toLowerCase().includes(key));

    return responses[matchedKey] || responses.default;
  };

  // Simulate trading room experience
  const simulateTradingRoom = () => {
    // Create immersive trading room overlay
    const roomOverlay = document.createElement('div');
    roomOverlay.className = 'trading-room-simulation';
    roomOverlay.innerHTML = `
      <div class="room-container">
        <div class="room-header">
          <h2>Live Trading Room - Demo</h2>
          <button class="close-btn">✕</button>
        </div>
        <div class="room-content">
          <div class="video-grid">
            <div class="video-tile main">
              <video autoplay muted></video>
              <span class="name-tag">You</span>
            </div>
            <div class="video-tile">
              <div class="avatar-placeholder">JD</div>
              <span class="name-tag">John Doe (Host)</span>
            </div>
            <div class="video-tile">
              <div class="avatar-placeholder">SM</div>
              <span class="name-tag">Sarah Miller</span>
            </div>
          </div>
          <div class="chat-panel">
            <div class="chat-messages">
              <div class="message">
                <strong>John:</strong> SPY looking bullish above 450
              </div>
              <div class="message">
                <strong>Sarah:</strong> Agreed, volume confirming the move
              </div>
              <div class="message highlight">
                <strong>AI Alert:</strong> 🚨 Unusual options activity detected in AAPL
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(roomOverlay);

    // Close button
    roomOverlay.querySelector('.close-btn').addEventListener('click', () => {
      roomOverlay.remove();
      addAchievement('tried_trading_room');
    });

    // Get user camera
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        const video = roomOverlay.querySelector('video');
        video.srcObject = stream;

        // Stop stream when closing
        roomOverlay.querySelector('.close-btn').addEventListener('click', () => {
          stream.getTracks().forEach(track => track.stop());
        });
      })
      .catch(err => console.log('Camera access denied'));
  };

  // Drag and drop handlers for strategy builder
  const handleDragStart = (e) => {
    e.dataTransfer.setData('text/plain', e.target.innerText);
    e.target.classList.add('dragging');
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.currentTarget.classList.add('drag-over');
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const data = e.dataTransfer.getData('text/plain');

    const newBlock = document.createElement('div');
    newBlock.className = 'block placed';
    newBlock.innerText = data;

    e.currentTarget.appendChild(newBlock);
    e.currentTarget.classList.remove('drag-over');

    addAchievement('built_strategy');
  };

  // Generate strategy description
  const generateStrategyDescription = () => {
    const conditions = document.querySelectorAll('.action-blocks .block');
    if (conditions.length === 0) return "Drag conditions to build your strategy";

    return `When ${Array.from(conditions).map(c => c.innerText).join(' AND ')}, execute selected action.`;
  };

  // Generate random participants for trading room
  const generateParticipants = () => {
    const names = ['Alex Chen', 'Maria Garcia', 'James Wilson', 'Emma Thompson', 'David Kim'];
    return names.map(name => ({
      name,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`
    }));
  };

  // Generate heatmap data
  const generateHeatmap = () => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
    const hours = Array.from({length: 10}, (_, i) => `${9+i}:00`);

    return (
      <table className="heatmap-table">
        <thead>
          <tr>
            <th></th>
            {days.map(day => <th key={day}>{day}</th>)}
          </tr>
        </thead>
        <tbody>
          {hours.map(hour => (
            <tr key={hour}>
              <td>{hour}</td>
              {days.map(day => {
                const intensity = Math.random();
                const color = `rgba(0, 255, 136, ${intensity})`;
                return (
                  <td key={day} style={{backgroundColor: color}}>
                    {Math.round(intensity * 100)}%
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  // Initialize comparison chart
  const initializeComparisonChart = (canvas) => {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // Animate comparison lines
    let progress = 0;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw grid
      ctx.strokeStyle = '#333';
      ctx.lineWidth = 0.5;
      for (let i = 0; i <= 10; i++) {
        const y = (canvas.height / 10) * i;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width * (progress / 100), y);
        ctx.stroke();
      }

      // Draw performance lines
      ctx.lineWidth = 2;

      // Your performance (green, trending up)
      ctx.strokeStyle = '#00ff88';
      ctx.beginPath();
      ctx.moveTo(0, canvas.height * 0.8);

      for (let x = 0; x <= progress; x++) {
        const y = canvas.height * (0.8 - (x / 100) * 0.5 + Math.sin(x * 0.1) * 0.05);
        ctx.lineTo((canvas.width / 100) * x, y);
      }
      ctx.stroke();

      // Market average (blue, flat)
      ctx.strokeStyle = '#4a90e2';
      ctx.beginPath();
      ctx.moveTo(0, canvas.height * 0.7);

      for (let x = 0; x <= progress; x++) {
        const y = canvas.height * (0.7 - (x / 100) * 0.1);
        ctx.lineTo((canvas.width / 100) * x, y);
      }
      ctx.stroke();

      if (progress < 100) {
        progress += 2;
        requestAnimationFrame(animate);
      }
    };

    animate();
  };

  // Get countdown timer
  const getTimeRemaining = () => {
    const total = Date.parse('2024-12-31') - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);

    return {
      hours: hours.toString().padStart(2, '0'),
      minutes: minutes.toString().padStart(2, '0'),
      seconds: seconds.toString().padStart(2, '0')
    };
  };

  // Generate candlestick data
  const generateCandlesticks = (count) => {
    const candles = [];
    let lastClose = 100;

    for (let i = 0; i < count; i++) {
      const open = lastClose;
      const change = (Math.random() - 0.5) * 5;
      const close = open + change;
      const high = Math.max(open, close) + Math.random() * 2;
      const low = Math.min(open, close) - Math.random() * 2;

      candles.push({ open, high, low, close });
      lastClose = close;
    }

    return candles;
  };

  // Draw candlestick
  const drawCandlestick = (ctx, candle, index) => {
    const x = index * 20 + 10;
    const candleWidth = 15;
    const height = ctx.canvas.height;

    // Scale prices to canvas
    const scale = height / 150;
    const y = (price) => height - price * scale;

    // Draw wick
    ctx.strokeStyle = candle.close > candle.open ? '#00ff88' : '#ff4444';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(x + candleWidth/2, y(candle.high));
    ctx.lineTo(x + candleWidth/2, y(candle.low));
    ctx.stroke();

    // Draw body
    ctx.fillStyle = candle.close > candle.open ? '#00ff88' : '#ff4444';
    const bodyHeight = Math.abs(y(candle.close) - y(candle.open));
    const bodyY = y(Math.max(candle.open, candle.close));

    ctx.fillRect(x, bodyY, candleWidth, bodyHeight || 1);
  };

  // Add achievement
  const addAchievement = (achievementId) => {
    if (!achievements.includes(achievementId)) {
      setAchievements(prev => [...prev, achievementId]);

      // Show achievement notification
      showAchievementNotification(achievementId);
    }
  };

  // Show achievement notification
  const showAchievementNotification = (achievementId) => {
    const achievementData = {
      tour_started: { icon: '🎯', title: 'Tour Started!', points: 10 },
      chart_interaction: { icon: '📊', title: 'Chart Master!', points: 20 },
      met_ai_copilot: { icon: '🤖', title: 'AI Friend!', points: 30 },
      asked_ai_question: { icon: '💬', title: 'Curious Trader!', points: 15 },
      explored_trading_room: { icon: '👥', title: 'Team Player!', points: 25 },
      created_first_strategy: { icon: '🎮', title: 'Strategy Builder!', points: 40 },
      viewed_analytics: { icon: '📈', title: 'Data Driven!', points: 20 },
      viewed_pricing: { icon: '💎', title: 'Ready to Trade!', points: 30 },
      tour_completed: { icon: '🏆', title: 'Tour Champion!', points: 100 },
      market_simulator: { icon: '🎢', title: 'Market Mover!', points: 25 },
      built_strategy: { icon: '🔧', title: 'Strategy Architect!', points: 35 },
      tried_trading_room: { icon: '🎥', title: 'Social Trader!', points: 30 },
      chatted_with_ai: { icon: '🗨️', title: 'AI Conversationalist!', points: 20 }
    };

    const achievement = achievementData[achievementId];
    if (!achievement) return;

    const notification = document.createElement('div');
    notification.className = 'achievement-notification';
    notification.innerHTML = `
      <div class="achievement-content">
        <span class="achievement-icon">${achievement.icon}</span>
        <div class="achievement-text">
          <div class="achievement-title">${achievement.title}</div>
          <div class="achievement-points">+${achievement.points} points</div>
        </div>
      </div>
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.classList.add('show');
    }, 100);

    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  };

  // Navigation functions
  const nextStep = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(prev => prev + 1);
      setTourProgress((currentStep + 1) / tourSteps.length * 100);

      // Track interaction
      setUserInteractions(prev => [...prev, {
        step: tourSteps[currentStep].id,
        timestamp: Date.now(),
        duration: Date.now() - (prev[prev.length - 1]?.timestamp || Date.now())
      }]);
    } else {
      completeTour();
    }
  };

  const previousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      setTourProgress((currentStep - 1) / tourSteps.length * 100);
    }
  };

  const skipTour = () => {
    setIsActive(false);
    if (onComplete) onComplete({ skipped: true });
  };

  const completeTour = () => {
    addAchievement('tour_completed');

    // Calculate engagement score
    const engagementScore = calculateEngagementScore();

    // Send analytics
    sendTourAnalytics({
      completed: true,
      steps: userPath,
      interactions: userInteractions,
      achievements: achievements,
      engagementScore,
      personalization: personalizationData
    });

    setIsActive(false);
    if (onComplete) {
      onComplete({
        completed: true,
        engagementScore,
        achievements
      });
    }
  };

  // Calculate engagement score
  const calculateEngagementScore = () => {
    const baseScore = achievements.length * 10;
    const interactionScore = userInteractions.reduce((sum, interaction) => {
      return sum + Math.min(interaction.duration / 1000, 60); // Cap at 60 seconds per step
    }, 0);

    return Math.round(baseScore + interactionScore);
  };

  // Send analytics
  const sendTourAnalytics = (data) => {
    // Send to analytics service
    if (window.gtag) {
      window.gtag('event', 'tour_completed', {
        engagement_score: data.engagementScore,
        achievements_count: data.achievements.length,
        user_experience: data.personalization.experience
      });
    }

    // Send to backend
    fetch('/api/tour-analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).catch(err => console.error('Analytics error:', err));
  };

  // Render tour overlay
  const renderTourOverlay = () => {
    const step = tourSteps[currentStep];
    if (!step) return null;

    return (
      <div className="tour-overlay" ref={overlayRef}>
        <div className="tour-backdrop" onClick={skipTour} />

        {step.type === 'spotlight' && (
          <div className="spotlight" ref={spotlightRef} />
        )}

        <div className={`tour-content ${step.type}`}>
          <div className="tour-header">
            <div className="step-indicator">
              Step {currentStep + 1} of {tourSteps.length}
            </div>
            <button className="close-btn" onClick={skipTour}>✕</button>
          </div>

          <div className="tour-body">
            <h2 className="tour-title">{step.title}</h2>
            <p className="tour-description">{step.description}</p>

            <div className="tour-interactive-content">
              {step.content}
            </div>

            {step.aiTip && (
              <div className="ai-tip">
                <span className="ai-icon">💡</span>
                <span className="tip-text">{step.aiTip}</span>
              </div>
            )}
          </div>

          <div className="tour-footer">
            <div className="tour-progress">
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{width: `${tourProgress}%`}}
                />
              </div>
            </div>

            <div className="tour-actions">
              <button
                className="tour-btn secondary"
                onClick={previousStep}
                disabled={currentStep === 0}
              >
                Previous
              </button>
              <button
                className="tour-btn primary"
                onClick={nextStep}
              >
                {currentStep === tourSteps.length - 1 ? 'Get Started' : 'Next'}
              </button>
            </div>
          </div>
        </div>

        {achievements.length > 0 && (
          <div className="achievements-tracker">
            <span className="tracker-label">Achievements:</span>
            <div className="achievement-badges">
              {achievements.slice(-5).map((a, i) => (
                <span key={i} className="badge-icon">🏆</span>
              ))}
            </div>
            <span className="points-total">
              {achievements.length * 20} points
            </span>
          </div>
        )}
      </div>
    );
  };

  return isActive ? createPortal(renderTourOverlay(), document.body) : (
    <button
      className="start-tour-btn"
      onClick={() => setIsActive(true)}
    >
      🎯 Start Interactive Tour
    </button>
  );
};

export default InteractiveProductTour;