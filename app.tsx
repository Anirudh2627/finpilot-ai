import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import LoadingScreen from './components/LoadingScreen'
import DecisionCard from './components/DecisionCard'
import WhySection from './components/WhySection'
import AgentTimeline from './components/AgentTimeline'
import SHAPChart from './components/SHAPChart'
import LIMECard from './components/LIMECard'
import CounterfactualSimulator from './components/CounterfactualSimulator'
import EvidenceExplorer from './components/EvidenceExplorer'
import TrustDashboard from './components/TrustDashboard'
import ExplanationMode from './components/ExplanationMode'
import JudgePanel from './components/JudgePanel'
import MarketTerminal from './components/MarketTerminal'
import Footer from './components/Footer'

const defaultResponse = {
  decision: 'BUY',
  confidence: 0.91,
  summary:
    'Revenue growth, positive market sentiment and your investment horizon strongly support a BUY recommendation.',
  top_reasons: [
    {
      id: 'rev-growth',
      type: 'positive',
      title: 'Revenue Growth increased 22%',
      importance: 0.92,
      icon: 'TrendingUp',
      description:
        'The company has sustained high double-digit revenue growth, beating sector averages.',
      details:
        'Revenue expanded 22% YoY driven by data center demand and AI acceleration. Growth quality is high with improving gross margins.',
      why: 'High revenue growth compounds returns over your 5-year horizon.',
      contribution: 0.34
    },
    {
      id: 'news-sentiment',
      type: 'positive',
      title: 'Positive News Sentiment',
      importance: 0.78,
      icon: 'Newspaper',
      description:
        'News and research flow remain broadly supportive over the past quarter.',
      details:
        'Strong analyst upgrades, favorable supply chain updates, and product launch coverage improved forward guidance consensus.',
      why: 'Sustained positive sentiment correlates with near-term momentum.',
      contribution: 0.19
    },
    {
      id: 'earnings',
      type: 'positive',
      title: 'Strong Quarterly Earnings',
      importance: 0.7,
      icon: 'BarChartBig',
      description:
        'Earnings and FCF beat with constructive forward commentary.',
      details:
        'EPS beat by 9%, operating leverage improved, and inventory discipline reduced cash burn.',
      why: 'Execution quality reduces downside risk.',
      contribution: 0.12
    },
    {
      id: 'risk-profile',
      type: 'positive',
      title: 'User matches Medium Risk Profile',
      importance: 0.62,
      icon: 'ShieldCheck',
      description:
        'Your stated risk tolerance and 5-year horizon align with potential volatility.',
      details:
        'Profile backtest indicates positive outcomes with medium volatility acceptance.',
      why: 'Alignment between risk profile and asset class improves adherence.',
      contribution: 0.08
    },
    {
      id: 'pe-ratio',
      type: 'negative',
      title: 'High PE Ratio',
      importance: 0.63,
      icon: 'AlertTriangle',
      description:
        'Valuation is elevated versus history and sector peers.',
      details:
        'Forward PE sits in the 85th percentile of the last 5 years; implies perfection in execution.',
      why: 'Elevated valuation increases drawdown sensitivity.',
      contribution: -0.12
    },
    {
      id: 'volatility',
      type: 'negative',
      title: 'Market Volatility',
      importance: 0.58,
      icon: 'Activity',
      description:
        'Cross-asset volatility remains above the 60th percentile.',
      details:
        'Implied volatility elevated on macro uncertainty and rates path dispersion.',
      why: 'Higher volatility increases path risk despite strong fundamentals.',
      contribution: -0.1
    }
  ],
  risks: ['Valuation compression', 'Macro shocks', 'Position crowding'],
  agent_trace: [
    {
      id: 'planner',
      name: 'Planner Agent',
      status: 'Completed',
      ms: 280,
      confidence: 0.98,
      output: 'Formulated analysis plan and tools.',
      logs: ['Parsed user objective', 'Selected tools: Markets, News, Risk']
    },
    {
      id: 'market',
      name: 'Market Agent',
      status: 'Completed',
      ms: 540,
      confidence: 0.93,
      output: 'Collected pricing, volumes, and factor tilts.',
      logs: ['Fetched price history', 'Computed momentum and volatility']
    },
    {
      id: 'news',
      name: 'News Agent',
      status: 'Completed',
      ms: 410,
      confidence: 0.9,
      output: 'Ingested multi-source sentiment.',
      logs: ['Reuters, Yahoo Finance, 12 research notes']
    },
    {
      id: 'risk',
      name: 'Risk Agent',
      status: 'Completed',
      ms: 320,
      confidence: 0.87,
      output: 'Aligned with user risk and horizon.',
      logs: ['Stress-tested adverse scenarios', 'Estimated drawdown profile']
    },
    {
      id: 'decision',
      name: 'Decision Agent',
      status: 'Completed',
      ms: 320,
      confidence: 0.91,
      output: 'BUY with high confidence over 5 years.',
      logs: ['Weighed evidence and uncertainty']
    },
    {
      id: 'trust',
      name: 'Trust Agent',
      status: 'Completed',
      ms: 240,
      confidence: 0.99,
      output: 'Explanation verified, sources consistent.',
      logs: ['Cross-checked evidence', 'Computed trust metrics']
    }
  ],
  shap: [
    {
      feature: 'Revenue Growth',
      contribution: 0.34,
      value: 22,
      average: 9,
      reason: 'Growth outpaces sector median',
      history: 'Sustained acceleration in data center revenue'
    },
    {
      feature: 'News Sentiment',
      contribution: 0.19,
      value: 0.71,
      average: 0.12,
      reason: 'Positive multi-source sentiment',
      history: 'Uptrend over 90 days'
    },
    {
      feature: 'Debt Ratio',
      contribution: -0.08,
      value: 0.34,
      average: 0.28,
      reason: 'Slightly elevated leverage',
      history: 'Stable over last year'
    },
    {
      feature: 'Volatility',
      contribution: -0.1,
      value: 0.63,
      average: 0.45,
      reason: 'Macro-induced volatility',
      history: 'Elevated but stabilizing'
    },
    {
      feature: 'PE Ratio',
      contribution: -0.12,
      value: 42,
      average: 28,
      reason: 'Valuation premium',
      history: 'Top quintile vs 5-year range'
    }
  ],
  lime: {
    positive: [
      { feature: 'Revenue Growth', why: 'Strong growth raises fair value' },
      { feature: 'Positive News', why: 'Momentum supports near-term gains' },
      { feature: 'Strong Earnings', why: 'Outperformance reduces downside' },
      { feature: 'Long Investment Horizon', why: 'Time smooths volatility' }
    ],
    negative: [
      { feature: 'High PE Ratio', why: 'Priced for perfection' },
      { feature: 'Volatility', why: 'Macro shocks can amplify drawdowns' }
    ],
    note: 'LIME highlights local feature effects around current scenario.'
  },
  counterfactuals: [
    {
      feature: 'Revenue Growth',
      kind: 'lt',
      value: 10,
      decision: 'SELL',
      deltaConfidence: -0.35,
      shap_deltas: [{ feature: 'Revenue Growth', delta: -0.3 }],
      reason: 'Sub-10% growth undermines thesis'
    },
    {
      feature: 'Revenue Growth',
      kind: 'between',
      min: 10,
      max: 15,
      decision: 'HOLD',
      deltaConfidence: -0.18,
      shap_deltas: [{ feature: 'Revenue Growth', delta: -0.18 }],
      reason: 'Moderate growth tempers conviction'
    },
    {
      feature: 'PE Ratio',
      kind: 'gt',
      value: 55,
      decision: 'HOLD',
      deltaConfidence: -0.2,
      shap_deltas: [{ feature: 'PE Ratio', delta: -0.1 }],
      reason: 'Valuation stretches beyond comfort'
    },
    {
      feature: 'Volatility',
      kind: 'gt',
      value: 0.75,
      decision: 'HOLD',
      deltaConfidence: -0.12,
      shap_deltas: [{ feature: 'Volatility', delta: -0.08 }],
      reason: 'Uncertainty increases path risk'
    },
    {
      feature: 'Investment Horizon',
      kind: 'lt',
      value: 2,
      decision: 'HOLD',
      deltaConfidence: -0.25,
      shap_deltas: [{ feature: 'Revenue Growth', delta: -0.15 }],
      reason: 'Short horizon reduces compounding benefits'
    }
  ],
  evidence: [
    {
      id: 'reuters',
      source: 'Reuters',
      verified: true,
      confidence: 0.97,
      contribution: 0.28,
      headline: 'NVIDIA beats expectations; raises guidance',
      summary:
        'Data center demand and AI accelerators drive revenue; margins expand.',
      why: 'Independent confirmation of growth and execution',
      quality: 'High'
    },
    {
      id: 'yahoo',
      source: 'Yahoo Finance',
      verified: true,
      confidence: 0.92,
      contribution: 0.18,
      headline: 'Analyst upgrades lift price targets',
      summary: 'Multiple brokers increase PTs on robust pipeline.',
      why: 'Consensus supports momentum',
      quality: 'High'
    },
    {
      id: 'sec',
      source: 'SEC Filing',
      verified: true,
      confidence: 0.95,
      contribution: 0.22,
      headline: '10-Q: revenue mix shifts to data center',
      summary: 'Detailed segment performance and cash flow improvements.',
      why: 'Primary source validation',
      quality: 'High'
    },
    {
      id: 'econ',
      source: 'Economic Indicators',
      verified: true,
      confidence: 0.88,
      contribution: 0.12,
      headline: 'Manufacturing PMI stabilizes',
      summary: 'Macro backdrop supportive but watch for rates path.',
      why: 'Macro filter for sector sensitivity',
      quality: 'Medium'
    }
  ],
  trust: {
    overall: 0.95,
    evidence_quality: 0.98,
    source_agreement: 0.94,
    model_confidence: 0.91,
    explainability: 1.0,
    audit_passed: true
  },
  execution_time: 2.1,
  /* Optional Market Terminal data to power the Bloomberg-style section */
  market: {
    tape: [
      { symbol: 'NIFTY 50', change: 0.42 },
      { symbol: 'BANKNIFTY', change: -0.18 },
      { symbol: 'SENSEX', change: 0.37 },
      { symbol: 'NASDAQ', change: 0.58 },
      { symbol: 'S&P 500', change: 0.24 },
      { symbol: 'DOW JONES', change: 0.12 },
      { symbol: 'FTSE', change: -0.22 },
      { symbol: 'NIKKEI', change: 0.44 },
      { symbol: 'BTC', change: 1.8 },
      { symbol: 'ETH', change: 1.2 },
      { symbol: 'GOLD', change: -0.15 },
      { symbol: 'SILVER', change: 0.21 },
      { symbol: 'CRUDE OIL', change: -0.6 },
      { symbol: 'USD/INR', change: 0.05 },
      { symbol: 'EUR/USD', change: -0.1 }
    ],
    watchlist: [
      { name: 'Apple', price: 198.32, chg: 0.84, vol: '59.2M', status: 'Open', ai: 'HOLD' },
      { name: 'Microsoft', price: 412.15, chg: 0.62, vol: '28.4M', status: 'Open', ai: 'BUY' },
      { name: 'NVIDIA', price: 127.9, chg: 1.22, vol: '72.1M', status: 'Open', ai: 'BUY' },
      { name: 'Tesla', price: 209.4, chg: -0.45, vol: '54.8M', status: 'Open', ai: 'HOLD' },
      { name: 'Amazon', price: 178.5, chg: 0.41, vol: '36.6M', status: 'Open', ai: 'BUY' },
      { name: 'Google', price: 163.2, chg: 0.28, vol: '22.9M', status: 'Open', ai: 'HOLD' },
      { name: 'Meta', price: 492.6, chg: 0.95, vol: '18.1M', status: 'Open', ai: 'BUY' },
      { name: 'Reliance', price: 2635.4, chg: 0.31, vol: '10.3M', status: 'Open', ai: 'HOLD' },
      { name: 'TCS', price: 3902.2, chg: -0.22, vol: '4.8M', status: 'Open', ai: 'HOLD' },
      { name: 'Infosys', price: 1510.5, chg: 0.14, vol: '6.1M', status: 'Open', ai: 'BUY' }
    ],
    movers: {
      gainers: [
        { name: 'NVDA', chg: 4.1 },
        { name: 'AMD', chg: 3.6 },
        { name: 'SHOP', chg: 3.1 }
      ],
      losers: [
        { name: 'XOM', chg: -2.4 },
        { name: 'BA', chg: -2.1 },
        { name: 'NFLX', chg: -1.8 }
      ],
      active: [
        { name: 'AAPL', vol: '59M' },
        { name: 'TSLA', vol: '55M' },
        { name: 'NVDA', vol: '72M' }
      ],
      high52: [{ name: 'MSFT' }, { name: 'META' }],
      low52: [{ name: 'TCS' }],
      trending: [{ name: 'ARM' }, { name: 'COIN' }]
    },
    insights: [
      { text: 'NVIDIA momentum remains positive.', confidence: 0.88 },
      { text: 'Banking sector sentiment improving.', confidence: 0.76 },
      { text: 'Gold demand increasing.', confidence: 0.71 },
      { text: 'Technology sector outperforming.', confidence: 0.82 }
    ],
    news: [
      { title: 'Chipmakers rally on AI demand', source: 'Reuters', time: '12m', sentiment: 0.7, confidence: 0.92 },
      { title: 'Fed minutes signal data dependence', source: 'Bloomberg', time: '28m', sentiment: 0.1, confidence: 0.86 },
      { title: 'Energy stocks slip as oil cools', source: 'Yahoo Finance', time: '42m', sentiment: -0.3, confidence: 0.79 }
    ],
    calendar: [
      { event: 'NVIDIA Earnings', date: 'Aug 20', importance: 'High', forecast: 'EPS 0.62', previous: '0.54' },
      { event: 'FOMC Decision', date: 'Sep 25', importance: 'High', forecast: 'Rates Hold', previous: 'Hold' },
      { event: 'US CPI', date: 'Aug 14', importance: 'High', forecast: '3.1%', previous: '3.3%' }
    ],
    system: {
      gemini: true,
      marketApi: true,
      newsApi: true,
      trust: true,
      explainability: true,
      latencyMs: 212,
      memory: '412 MB',
      apiRequests: 18,
      updated: 'Just now'
    }
  }
}

const loadingSequence = [
  'Planner Agent Running...',
  'Fetching Market Data...',
  'Reading News...',
  'Calculating Risk...',
  'Generating Decision...',
  'Verifying Explanation...',
  'Finalizing Recommendation...'
]

export default function App() {
  const [themeDark, setThemeDark] = useState(true)
  const [data, setData] = useState(defaultResponse)
  const [explanationMode, setExplanationMode] = useState('Investor') // Beginner | Investor | Technical
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const workspaceRef = useRef(null)
  const marketRef = useRef(null)

  const onAnalyze = useCallback((query) => {
    // Simulate full workflow
    setIsAnalyzing(true)
    setCurrentStep(0)
    let step = 0
    const interval = setInterval(() => {
      step += 1
      if (step < loadingSequence.length) {
        setCurrentStep(step)
      } else {
        clearInterval(interval)
        // Simulate updated response (kept consistent with contract)
        setData((prev) => ({
          ...prev,
          execution_time: 2.1,
          decision: 'BUY',
          confidence: 0.91,
          summary:
            'Revenue growth, positive market sentiment and your investment horizon strongly support a BUY recommendation.',
          // could adjust small bits to show freshness
        }))
        setIsAnalyzing(false)
        if (workspaceRef.current) {
          workspaceRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }
    }, 450)
  }, [])

  const toggleTheme = useCallback(() => {
    setThemeDark((d) => !d)
  }, [])

  const containerBg = themeDark ? 'bg-gray-950 text-gray-100' : 'bg-white text-gray-900'

  return (
    <div className={`min-h-screen ${containerBg}`}>
      <Header
        onToggleTheme={toggleTheme}
        dark={themeDark}
        onNavigate={(id) => {
          const el = id === 'markets' ? marketRef.current : workspaceRef.current
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }}
      />
      <main className="pt-20">
        <Hero onAnalyze={onAnalyze} />
        <section ref={marketRef} id="markets" className="w-full">
          <MarketTerminal data={data.market} />
        </section>

        <section id="workspace" ref={workspaceRef} className="w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
            <DecisionCard data={data} />
            <WhySection data={data} mode={explanationMode} />
            <AgentTimeline data={data} />
            <SHAPChart data={data} />
            <LIMECard data={data} mode={explanationMode} />
            <CounterfactualSimulator data={data} />
            <EvidenceExplorer data={data} />
            <TrustDashboard data={data} />
            <ExplanationMode value={explanationMode} onChange={setExplanationMode} />
            <JudgePanel data={data} />
          </div>
        </section>
      </main>

      <Footer />

      {isAnalyzing && (
        <LoadingScreen steps={loadingSequence} current={currentStep} />
      )}
    </div>
  )
}
