import { useState } from 'react'
import './FAQ.css'

export default function FAQ({ questions, title, subtitle, columns = 2 }) {
  const [openIndex, setOpenIndex] = useState(null)

  const toggleQuestion = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="faq-section">
      <div className="faq-container">
        {(title || subtitle) && (
          <div className="faq-header">
            {title && <h2 className="faq-title">{title}</h2>}
            {subtitle && <p className="faq-subtitle">{subtitle}</p>}
          </div>
        )}

        <div className={`faq-grid faq-grid-${columns}`}>
          {questions.map((item, index) => (
            <div
              key={index}
              className={`faq-item ${openIndex === index ? 'faq-item-open' : ''}`}
            >
              <button
                className="faq-question"
                onClick={() => toggleQuestion(index)}
                aria-expanded={openIndex === index}
              >
                <span className="faq-question-text">{item.question}</span>
                <span className="faq-toggle">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {openIndex === index ? (
                      <line x1="5" y1="12" x2="19" y2="12" />
                    ) : (
                      <>
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                      </>
                    )}
                  </svg>
                </span>
              </button>

              <div
                className="faq-answer-wrapper"
                style={{
                  maxHeight: openIndex === index ? '1000px' : '0'
                }}
              >
                <div className="faq-answer">{item.answer}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Common FAQ data that can be imported
export const commonFAQs = {
  general: [
    {
      question: 'What is TradeFlows Pro?',
      answer: 'TradeFlows Pro is an advanced AI-powered trading platform that provides real-time market data, intelligent trading recommendations, and comprehensive analytics to help traders make better decisions.'
    },
    {
      question: 'How does the AI recommendation system work?',
      answer: 'Our AI analyzes thousands of data points including price action, volume, technical indicators, news sentiment, and historical patterns to generate high-probability trading opportunities with detailed entry, exit, and stop-loss recommendations.'
    },
    {
      question: 'Can I try TradeFlows Pro before purchasing?',
      answer: 'Yes! We offer a 7-day free trial with full access to all Premium features. No credit card required to start your trial.'
    },
    {
      question: 'What markets and assets are supported?',
      answer: 'TradeFlows Pro supports stocks, ETFs, cryptocurrencies, forex, and commodities. You get real-time data for all major exchanges worldwide.'
    },
    {
      question: 'Can I use TradeFlows Pro on mobile?',
      answer: 'Yes! TradeFlows Pro has native mobile apps for both iOS and Android with full feature parity to the desktop platform. Your data syncs seamlessly across all devices.'
    },
    {
      question: 'Is my data secure?',
      answer: 'Absolutely. We use bank-level 256-bit encryption, are SOC 2 Type II certified, and comply with GDPR and PCI DSS standards. Your data is never sold to third parties.'
    }
  ],
  pricing: [
    {
      question: 'How much does TradeFlows Pro cost?',
      answer: 'We offer three plans: Free ($0 with basic features), Premium ($29.99/month), and Professional ($79.99/month). All paid plans include a 7-day free trial.'
    },
    {
      question: 'Can I cancel my subscription anytime?',
      answer: 'Yes! There are no contracts or commitments. You can cancel your subscription at any time from your account settings, and you\'ll retain access until the end of your billing period.'
    },
    {
      question: 'Do you offer refunds?',
      answer: 'We offer a 30-day money-back guarantee on all paid plans. If you\'re not satisfied, contact our support team within 30 days of purchase for a full refund.'
    },
    {
      question: 'Are there any additional fees?',
      answer: 'No hidden fees! All plans include real-time data, and you only pay the subscription price. You\'ll need a separate brokerage account to execute trades.'
    },
    {
      question: 'Can I upgrade or downgrade my plan?',
      answer: 'Yes, you can change your plan anytime. When upgrading, you\'ll receive prorated credit. When downgrading, the change takes effect at the next billing cycle.'
    },
    {
      question: 'Do you offer team or enterprise plans?',
      answer: 'Yes! We offer custom enterprise plans with volume discounts, dedicated support, and additional features. Contact our sales team for more information.'
    }
  ],
  technical: [
    {
      question: 'What devices and browsers are supported?',
      answer: 'TradeFlows Pro works on Windows, Mac, and Linux desktops with Chrome, Firefox, Safari, and Edge. Mobile apps are available for iOS 14+ and Android 8+'
    },
    {
      question: 'Can I integrate TradeFlows with my broker?',
      answer: 'Yes! Professional plan includes API access for integration with major brokers. We support direct connections to Interactive Brokers, TD Ameritrade, and more.'
    },
    {
      question: 'Is there an API for automated trading?',
      answer: 'Yes, Professional plan includes full REST API access with comprehensive documentation. You can build custom integrations and automated trading strategies.'
    },
    {
      question: 'What technical indicators are available?',
      answer: 'We offer 100+ technical indicators including RSI, MACD, Bollinger Bands, Fibonacci retracements, and many more. You can also create custom indicators.'
    },
    {
      question: 'Can I backtest trading strategies?',
      answer: 'Yes! Professional plan includes advanced backtesting with historical data going back 10 years. Test your strategies before risking real money.'
    },
    {
      question: 'What about system requirements?',
      answer: 'TradeFlows Pro is cloud-based and runs in your browser, so system requirements are minimal. You just need a stable internet connection and a modern browser.'
    }
  ]
}
