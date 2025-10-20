import { useState } from 'react';
import { createPortal } from 'react-dom';

// Simplified Interactive Product Tour
const InteractiveProductTour = ({ onComplete, autoStart = false }) => {
  const [isActive, setIsActive] = useState(autoStart);
  const [currentStep, setCurrentStep] = useState(0);

  // Simple tour steps
  const tourSteps = [
    {
      id: 'welcome',
      title: 'Welcome to TradeFlows Pro!',
      description: 'The most advanced AI-powered trading platform. Let\'s take a quick tour of the key features.',
      content: 'Get ready to discover powerful trading tools designed for success.'
    },
    {
      id: 'live-charts',
      title: 'Real-Time Market Data',
      description: 'Experience lightning-fast charts with millisecond updates.',
      content: 'Our charts update 20x faster than traditional platforms with over 100+ indicators available.'
    },
    {
      id: 'ai-copilot',
      title: 'Your AI Trading Copilot',
      description: 'Meet your personal AI assistant that learns your trading style.',
      content: 'Get AI-powered trade recommendations with 95% accuracy and real-time market analysis.'
    },
    {
      id: 'collaborative-trading',
      title: 'Trade Together, Win Together',
      description: 'Join live trading rooms with experts and peers.',
      content: 'Connect with 247+ traders online, share screens, and learn from the best.'
    },
    {
      id: 'automated-strategies',
      title: 'Automated Trading Strategies',
      description: 'Set it and forget it with our AI-powered automation.',
      content: 'Build custom strategies with our drag-and-drop builder and backtest instantly.'
    },
    {
      id: 'performance-analytics',
      title: 'Track Your Success',
      description: 'Advanced analytics to improve your trading.',
      content: 'Monitor win rates, total trades, profit/loss, and get AI-powered insights.'
    },
    {
      id: 'pricing',
      title: 'Choose Your Plan',
      description: 'Start your journey with our special offer.',
      content: 'Try TradeFlows Pro free for 14 days. No credit card required!'
    }
  ];

  const nextStep = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      completeTour();
    }
  };

  const previousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const skipTour = () => {
    setIsActive(false);
    if (onComplete) {
      onComplete({ skipped: true });
    }
  };

  const completeTour = () => {
    setIsActive(false);
    if (onComplete) {
      onComplete({ completed: true });
    }
  };

  const renderTourOverlay = () => {
    const step = tourSteps[currentStep];
    if (!step) return null;

    const tourProgress = ((currentStep + 1) / tourSteps.length) * 100;

    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 10000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        backdropFilter: 'blur(4px)'
      }}>
        <div style={{
          backgroundColor: '#1a1d29',
          borderRadius: '16px',
          padding: '32px',
          maxWidth: '600px',
          width: '90%',
          maxHeight: '80vh',
          overflow: 'auto',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
          border: '1px solid rgba(59, 158, 255, 0.3)'
        }}>
          {/* Header */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '24px'
          }}>
            <div style={{
              fontSize: '14px',
              color: '#9ca3af',
              fontWeight: '500'
            }}>
              Step {currentStep + 1} of {tourSteps.length}
            </div>
            <button
              onClick={skipTour}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#9ca3af',
                fontSize: '24px',
                cursor: 'pointer',
                padding: '4px',
                lineHeight: 1
              }}
            >
              ×
            </button>
          </div>

          {/* Content */}
          <div style={{ marginBottom: '32px' }}>
            <h2 style={{
              fontSize: '28px',
              fontWeight: '700',
              marginBottom: '12px',
              background: 'linear-gradient(135deg, #3b9eff, #10b981)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              {step.title}
            </h2>
            <p style={{
              fontSize: '16px',
              color: '#c3c8d4',
              marginBottom: '20px',
              lineHeight: '1.6'
            }}>
              {step.description}
            </p>
            <div style={{
              padding: '20px',
              backgroundColor: 'rgba(59, 158, 255, 0.1)',
              borderRadius: '8px',
              border: '1px solid rgba(59, 158, 255, 0.2)'
            }}>
              <p style={{
                color: '#f8f9fa',
                fontSize: '15px',
                lineHeight: '1.5'
              }}>
                {step.content}
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div style={{
            marginBottom: '24px'
          }}>
            <div style={{
              height: '4px',
              backgroundColor: 'rgba(59, 158, 255, 0.2)',
              borderRadius: '2px',
              overflow: 'hidden'
            }}>
              <div style={{
                height: '100%',
                width: `${tourProgress}%`,
                background: 'linear-gradient(90deg, #3b9eff, #10b981)',
                borderRadius: '2px',
                transition: 'width 0.3s ease'
              }} />
            </div>
          </div>

          {/* Actions */}
          <div style={{
            display: 'flex',
            gap: '12px',
            justifyContent: 'space-between'
          }}>
            <button
              onClick={previousStep}
              disabled={currentStep === 0}
              style={{
                padding: '12px 24px',
                backgroundColor: 'transparent',
                border: '1px solid rgba(59, 158, 255, 0.3)',
                color: currentStep === 0 ? '#6b7280' : '#3b9eff',
                borderRadius: '8px',
                fontSize: '15px',
                fontWeight: '600',
                cursor: currentStep === 0 ? 'not-allowed' : 'pointer',
                opacity: currentStep === 0 ? 0.5 : 1,
                transition: 'all 0.2s ease'
              }}
            >
              Previous
            </button>
            <button
              onClick={nextStep}
              style={{
                padding: '12px 24px',
                background: 'linear-gradient(135deg, #3b9eff, #10b981)',
                border: 'none',
                color: 'white',
                borderRadius: '8px',
                fontSize: '15px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'transform 0.2s ease'
              }}
              onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
            >
              {currentStep === tourSteps.length - 1 ? 'Get Started' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Only render if active
  if (!isActive) {
    return (
      <button
        onClick={() => setIsActive(true)}
        style={{
          position: 'fixed',
          bottom: '24px',
          left: '24px',
          padding: '12px 20px',
          background: 'linear-gradient(135deg, #3b9eff, #10b981)',
          border: 'none',
          borderRadius: '24px',
          color: 'white',
          fontSize: '14px',
          fontWeight: '600',
          cursor: 'pointer',
          boxShadow: '0 4px 12px rgba(59, 158, 255, 0.3)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          zIndex: 1000,
          transition: 'transform 0.2s ease'
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
      >
        <span>🎯</span>
        Start Interactive Tour
      </button>
    );
  }

  return createPortal(renderTourOverlay(), document.body);
};

export default InteractiveProductTour;