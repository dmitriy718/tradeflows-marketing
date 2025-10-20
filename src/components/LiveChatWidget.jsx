import { useState, useEffect, useRef } from 'react'
import './LiveChatWidget.css'

export default function LiveChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'agent',
      text: 'Hi! 👋 Welcome to TradeFlows Pro. How can we help you today?',
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [userName, setUserName] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [chatStarted, setChatStarted] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && chatStarted && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen, chatStarted])

  const quickReplies = [
    'How does the free trial work?',
    'What payment methods do you accept?',
    'Tell me about AI strategies',
    'Compare with LuxAlgo'
  ]

  const autoResponses = {
    'how does the free trial work': {
      text: 'Great question! Our 7-day free trial gives you full access to all Premium features. No credit card required. You can explore AI strategies, real-time data, advanced charting, and portfolio management. After 7 days, you can choose to upgrade to Premium ($49.99/mo) or Professional ($79.99/mo).',
      delay: 1500
    },
    'what payment methods do you accept': {
      text: 'We accept all major credit cards (Visa, MasterCard, American Express, Discover) and debit cards. All payments are processed securely through Stripe. We also offer PayPal for annual subscriptions.',
      delay: 1200
    },
    'tell me about ai strategies': {
      text: 'Our AI Strategy Builder analyzes real-time market conditions, your trading history, and risk profile to recommend optimal trading strategies. It adapts to changing market conditions and has helped our users improve their win rate by an average of 3-5%. Want to see it in action? Start your free trial!',
      delay: 2000
    },
    'compare with luxalgo': {
      text: 'TradeFlows Pro is a standalone professional platform with 17 feature advantages over LuxAlgo. We offer portfolio management, multi-account support, backtesting, and API access - features LuxAlgo doesn\'t provide. Plus, no need for a separate TradingView subscription. Check out our detailed comparison page!',
      delay: 1800
    },
    'pricing': {
      text: 'We have three plans: 7-Day Free Trial (then $49.99/mo), Premium at $49.99/mo ($479.99/year - save 20%), and Professional at $79.99/mo ($767.99/year - save 20%). All plans include mobile & desktop apps, real-time data, and AI strategies.',
      delay: 1400
    },
    'features': {
      text: 'TradeFlows Pro includes: Real-time market data for stocks, crypto, forex, and commodities • AI-powered strategy recommendations • Advanced charting with 100+ indicators • Portfolio analytics • Backtesting engine • Custom alerts • Multi-account management • API access (Professional plan) • 24/7 support',
      delay: 1600
    },
    'support': {
      text: 'We offer email support for all users (response within 24 hours), priority support for Premium members, and 24/7 support with a dedicated account manager for Professional members. You can also reach us at support@tradeflows.net or call us at 1-800-TRADEFLOW.',
      delay: 1300
    },
    'default': {
      text: 'Thanks for your question! Our support team typically responds within a few minutes during business hours (9 AM - 6 PM EST). For immediate assistance, email us at support@tradeflows.net or call 1-800-TRADEFLOW. Would you like to start a free trial while you wait?',
      delay: 1500
    }
  }

  const getAutoResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase()

    for (const [keyword, response] of Object.entries(autoResponses)) {
      if (lowerMessage.includes(keyword) || keyword === 'default') {
        if (keyword !== 'default') {
          return response
        }
      }
    }

    return autoResponses.default
  }

  const handleStartChat = (e) => {
    e.preventDefault()
    if (userName.trim() && userEmail.trim()) {
      setChatStarted(true)
      setMessages(prev => [
        ...prev,
        {
          id: Date.now(),
          type: 'agent',
          text: `Thanks ${userName}! I'm here to help. Feel free to ask me anything about TradeFlows Pro.`,
          timestamp: new Date()
        }
      ])
    }
  }

  const handleSendMessage = (text = null) => {
    const messageText = text || inputValue.trim()
    if (!messageText) return

    const userMessage = {
      id: Date.now(),
      type: 'user',
      text: messageText,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    // Simulate agent response
    const response = getAutoResponse(messageText)
    setTimeout(() => {
      setIsTyping(false)
      const agentMessage = {
        id: Date.now() + 1,
        type: 'agent',
        text: response.text,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, agentMessage])
    }, response.delay)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
  }

  if (!isOpen) {
    return (
      <button
        className="chat-widget-button"
        onClick={() => setIsOpen(true)}
        aria-label="Open chat"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M21 11.5C21 16.75 16.75 21 11.5 21C9.73 21 8.09 20.51 6.71 19.67L3 21L4.33 17.29C3.49 15.91 3 14.27 3 12.5C3 7.25 7.25 3 12.5 3C17.75 3 22 7.25 22 12.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span className="chat-badge">1</span>
      </button>
    )
  }

  return (
    <div className={`chat-widget ${isMinimized ? 'minimized' : ''}`}>
      <div className="chat-header">
        <div className="chat-header-info">
          <div className="agent-avatar">
            <div className="avatar-icon">TF</div>
            <span className="online-indicator"></span>
          </div>
          <div className="agent-details">
            <h4>TradeFlows Support</h4>
            <p>
              <span className="status-dot"></span>
              Online - Typically replies instantly
            </p>
          </div>
        </div>
        <div className="chat-header-actions">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            aria-label="Minimize chat"
            className="chat-action-btn"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M4 8h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
          <button
            onClick={() => setIsOpen(false)}
            aria-label="Close chat"
            className="chat-action-btn"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          <div className="chat-messages">
            {!chatStarted ? (
              <div className="chat-welcome">
                <div className="welcome-icon">
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                    <circle cx="24" cy="24" r="22" stroke="url(#welcomeGrad)" strokeWidth="2"/>
                    <path d="M24 16v12l6 6" stroke="url(#welcomeGrad)" strokeWidth="2" strokeLinecap="round"/>
                    <defs>
                      <linearGradient id="welcomeGrad">
                        <stop stopColor="#3b9eff"/>
                        <stop offset="1" stopColor="#10b981"/>
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <h3>Welcome to TradeFlows Pro!</h3>
                <p>Start a conversation with our support team. We typically respond within a few minutes.</p>

                <form onSubmit={handleStartChat} className="chat-start-form">
                  <input
                    type="text"
                    placeholder="Your name"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    required
                  />
                  <input
                    type="email"
                    placeholder="Your email"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    required
                  />
                  <button type="submit" className="btn btn-primary">
                    Start Chat
                  </button>
                </form>
              </div>
            ) : (
              <>
                {messages.map((message) => (
                  <div key={message.id} className={`chat-message ${message.type}`}>
                    {message.type === 'agent' && (
                      <div className="message-avatar">TF</div>
                    )}
                    <div className="message-content">
                      <div className="message-bubble">
                        {message.text}
                      </div>
                      <div className="message-time">{formatTime(message.timestamp)}</div>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="chat-message agent">
                    <div className="message-avatar">TF</div>
                    <div className="message-content">
                      <div className="message-bubble typing-indicator">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </>
            )}
          </div>

          {chatStarted && (
            <>
              {messages.length <= 2 && (
                <div className="chat-quick-replies">
                  {quickReplies.map((reply, index) => (
                    <button
                      key={index}
                      onClick={() => handleSendMessage(reply)}
                      className="quick-reply-btn"
                    >
                      {reply}
                    </button>
                  ))}
                </div>
              )}

              <div className="chat-input-container">
                <textarea
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  rows="1"
                  className="chat-input"
                />
                <button
                  onClick={() => handleSendMessage()}
                  disabled={!inputValue.trim()}
                  className="chat-send-btn"
                  aria-label="Send message"
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M18 2L9 11M18 2L12 18L9 11M18 2L2 8L9 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </>
          )}
        </>
      )}

      <div className="chat-footer">
        <span>Powered by TradeFlows Support</span>
      </div>
    </div>
  )
}
