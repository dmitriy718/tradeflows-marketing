import { useState, useEffect } from 'react'
import './ROICalculator.css'

export default function ROICalculator() {
  const [monthlyTrades, setMonthlyTrades] = useState(50)
  const [avgTradeSize, setAvgTradeSize] = useState(5000)
  const [currentWinRate, setCurrentWinRate] = useState(55)
  const [billingPeriod, setBillingPeriod] = useState('monthly')

  // Calculate ROI metrics
  const calculateROI = () => {
    // TradeFlows Pro pricing
    const tfProMonthly = billingPeriod === 'monthly' ? 79.99 : 767.99 / 12

    // LuxAlgo + TradingView pricing
    const luxalgoMonthly = 59.99 // Ultimate plan
    const tradingViewMonthly = 14.95 // Minimum TradingView Pro
    const competitorTotal = luxalgoMonthly + tradingViewMonthly

    // Savings
    const monthlySavings = competitorTotal - tfProMonthly
    const annualSavings = monthlySavings * 12

    // Improved performance with AI
    // Conservative estimate: 2-5% improvement in win rate with AI strategies
    const improvedWinRate = Math.min(currentWinRate + 3, 100)
    const winRateImprovement = improvedWinRate - currentWinRate

    // Trading volume
    const monthlyVolume = monthlyTrades * avgTradeSize
    const annualVolume = monthlyVolume * 12

    // Additional profit from improved win rate
    // Assuming 1% avg profit per trade
    const avgProfitPerTrade = avgTradeSize * 0.01
    const additionalTradesWon = (monthlyTrades * winRateImprovement) / 100
    const monthlyAdditionalProfit = additionalTradesWon * avgProfitPerTrade
    const annualAdditionalProfit = monthlyAdditionalProfit * 12

    // Time saved (hours per month)
    // TradeFlows Pro saves ~10 hours/month with automation and AI
    const timeSavedHours = 10
    const timeSavedValue = timeSavedHours * 50 // $50/hr value

    // Total value
    const monthlyTotalValue = monthlySavings + monthlyAdditionalProfit + timeSavedValue
    const annualTotalValue = monthlyTotalValue * 12

    // ROI percentage
    const monthlyROI = (monthlyTotalValue / tfProMonthly) * 100
    const annualROI = (annualTotalValue / (tfProMonthly * 12)) * 100

    return {
      tfProMonthly: tfProMonthly.toFixed(2),
      competitorTotal: competitorTotal.toFixed(2),
      monthlySavings: monthlySavings.toFixed(2),
      annualSavings: annualSavings.toFixed(2),
      improvedWinRate: improvedWinRate.toFixed(1),
      winRateImprovement: winRateImprovement.toFixed(1),
      monthlyAdditionalProfit: monthlyAdditionalProfit.toFixed(2),
      annualAdditionalProfit: annualAdditionalProfit.toFixed(2),
      timeSavedHours: timeSavedHours,
      timeSavedValue: timeSavedValue.toFixed(2),
      monthlyTotalValue: monthlyTotalValue.toFixed(2),
      annualTotalValue: annualTotalValue.toFixed(2),
      monthlyROI: monthlyROI.toFixed(0),
      annualROI: annualROI.toFixed(0),
      monthlyVolume: monthlyVolume.toLocaleString(),
      annualVolume: annualVolume.toLocaleString()
    }
  }

  const roi = calculateROI()

  return (
    <div className="roi-calculator">
      <div className="roi-header">
        <h3>ROI Calculator</h3>
        <p>See how much value TradeFlows Pro delivers for your trading</p>
      </div>

      <div className="roi-content">
        {/* Input Controls */}
        <div className="roi-inputs">
          <div className="input-group">
            <label htmlFor="monthlyTrades">
              Monthly Trades
              <span className="input-value">{monthlyTrades}</span>
            </label>
            <input
              id="monthlyTrades"
              type="range"
              min="10"
              max="500"
              step="10"
              value={monthlyTrades}
              onChange={(e) => setMonthlyTrades(Number(e.target.value))}
            />
            <div className="range-labels">
              <span>10</span>
              <span>500</span>
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="avgTradeSize">
              Average Trade Size ($)
              <span className="input-value">${avgTradeSize.toLocaleString()}</span>
            </label>
            <input
              id="avgTradeSize"
              type="range"
              min="1000"
              max="50000"
              step="1000"
              value={avgTradeSize}
              onChange={(e) => setAvgTradeSize(Number(e.target.value))}
            />
            <div className="range-labels">
              <span>$1K</span>
              <span>$50K</span>
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="currentWinRate">
              Current Win Rate (%)
              <span className="input-value">{currentWinRate}%</span>
            </label>
            <input
              id="currentWinRate"
              type="range"
              min="30"
              max="80"
              step="1"
              value={currentWinRate}
              onChange={(e) => setCurrentWinRate(Number(e.target.value))}
            />
            <div className="range-labels">
              <span>30%</span>
              <span>80%</span>
            </div>
          </div>

          <div className="billing-toggle">
            <button
              className={billingPeriod === 'monthly' ? 'active' : ''}
              onClick={() => setBillingPeriod('monthly')}
            >
              Monthly
            </button>
            <button
              className={billingPeriod === 'annual' ? 'active' : ''}
              onClick={() => setBillingPeriod('annual')}
            >
              Annual (20% off)
            </button>
          </div>
        </div>

        {/* Results */}
        <div className="roi-results">
          {/* Cost Comparison */}
          <div className="result-section">
            <h4>Monthly Cost Comparison</h4>
            <div className="cost-comparison">
              <div className="cost-item competitor">
                <div className="cost-label">LuxAlgo + TradingView</div>
                <div className="cost-value">${roi.competitorTotal}/mo</div>
              </div>
              <div className="vs">vs</div>
              <div className="cost-item tradeflows">
                <div className="cost-label">TradeFlows Pro</div>
                <div className="cost-value">${roi.tfProMonthly}/mo</div>
              </div>
            </div>
            <div className="savings-highlight">
              <span className="savings-label">Monthly Savings:</span>
              <span className="savings-value">${roi.monthlySavings}</span>
            </div>
          </div>

          {/* Performance Improvement */}
          <div className="result-section">
            <h4>Expected Performance Improvement</h4>
            <div className="performance-metric">
              <div className="metric-item">
                <div className="metric-label">Win Rate Improvement</div>
                <div className="metric-value">+{roi.winRateImprovement}%</div>
                <div className="metric-detail">
                  {currentWinRate}% → {roi.improvedWinRate}%
                </div>
              </div>
              <div className="metric-item">
                <div className="metric-label">Additional Monthly Profit</div>
                <div className="metric-value positive">+${roi.monthlyAdditionalProfit}</div>
                <div className="metric-detail">From AI-optimized strategies</div>
              </div>
            </div>
          </div>

          {/* Time Savings */}
          <div className="result-section">
            <h4>Time Savings</h4>
            <div className="time-savings">
              <div className="time-stat">
                <span className="time-value">{roi.timeSavedHours} hours</span>
                <span className="time-label">saved per month</span>
              </div>
              <div className="time-stat">
                <span className="time-value">${roi.timeSavedValue}</span>
                <span className="time-label">value of time saved</span>
              </div>
            </div>
          </div>

          {/* Total Value */}
          <div className="result-section highlight">
            <h4>Total Monthly Value</h4>
            <div className="total-value-breakdown">
              <div className="value-item">
                <span>Cost Savings</span>
                <span>${roi.monthlySavings}</span>
              </div>
              <div className="value-item">
                <span>Additional Profit</span>
                <span className="positive">+${roi.monthlyAdditionalProfit}</span>
              </div>
              <div className="value-item">
                <span>Time Value</span>
                <span>${roi.timeSavedValue}</span>
              </div>
              <div className="value-total">
                <span>Total Monthly Value</span>
                <span className="total-amount">${roi.monthlyTotalValue}</span>
              </div>
            </div>

            <div className="roi-percentage">
              <div className="roi-label">Return on Investment</div>
              <div className="roi-value">{roi.monthlyROI}%</div>
              <div className="roi-annual">({roi.annualROI}% annually)</div>
            </div>
          </div>

          {/* Annual Summary */}
          <div className="result-section annual-summary">
            <h4>Annual Summary</h4>
            <div className="annual-grid">
              <div className="annual-stat">
                <div className="annual-stat-label">Total Annual Savings</div>
                <div className="annual-stat-value">${roi.annualSavings}</div>
              </div>
              <div className="annual-stat">
                <div className="annual-stat-label">Additional Annual Profit</div>
                <div className="annual-stat-value positive">+${roi.annualAdditionalProfit}</div>
              </div>
              <div className="annual-stat featured">
                <div className="annual-stat-label">Total Annual Value</div>
                <div className="annual-stat-value featured">${roi.annualTotalValue}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="roi-footer">
        <p className="roi-disclaimer">
          * Calculations are estimates based on conservative industry averages. Individual results may vary.
          Win rate improvements assume active use of AI strategy recommendations and proper risk management.
        </p>
        <a href="https://app.tradeflows.net?signup=true&utm_source=website&utm_medium=roi-calculator&utm_campaign=conversions" className="btn btn-primary btn-large">
          Start Your Free Trial
        </a>
      </div>
    </div>
  )
}
