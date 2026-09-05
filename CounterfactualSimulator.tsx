import { useMemo, useState } from 'react'

function applyCounterfactualRules({ baseDecision, baseConfidence, rules, state }) {
  // Evaluate rules in priority order; first strongest delta applies
  let picked = null
  for (const r of rules) {
    const val = state[r.feature]
    if (r.kind === 'lt' && val < r.value) picked = r
    if (r.kind === 'gt' && val > r.value) picked = r
    if (r.kind === 'between' && val >= r.min && val <= r.max) picked = r
  }
  if (!picked) {
    return { decision: baseDecision, confidence: baseConfidence, applied: null }
  }
  const conf = Math.max(0.01, Math.min(0.99, baseConfidence + picked.deltaConfidence))
  return { decision: picked.decision, confidence: conf, applied: picked }
}

export default function CounterfactualSimulator({ data }) {
  // Initial feature state from data
  const base = {
    'Revenue Growth': data?.shap?.find((s) => s.feature === 'Revenue Growth')?.value || 22,
    'Debt Ratio': (data?.shap?.find((s) => s.feature === 'Debt Ratio')?.value || 0.34) * 100,
    'News Sentiment': (data?.shap?.find((s) => s.feature === 'News Sentiment')?.value || 0.71) * 100,
    'Risk Level': 2, // 1=Low,2=Medium,3=High
    'Investment Horizon': 5
  }
  const [features, setFeatures] = useState(base)

  const result = useMemo(() => {
    return applyCounterfactualRules({
      baseDecision: data?.decision || 'HOLD',
      baseConfidence: data?.confidence || 0.5,
      rules: data?.counterfactuals || [],
      state: {
        'Revenue Growth': features['Revenue Growth'],
        'PE Ratio': data?.shap?.find((s) => s.feature === 'PE Ratio')?.value || 42,
        'Volatility': data?.shap?.find((s) => s.feature === 'Volatility')?.value || 0.63,
        'Investment Horizon': features['Investment Horizon']
      }
    })
  }, [features, data])

  const confidencePct = Math.round((result.confidence || 0) * 100)
  const recColor = result.decision === 'BUY'
    ? 'text-emerald-400 border-emerald-600/40 bg-emerald-600/10'
    : result.decision === 'HOLD'
    ? 'text-amber-400 border-amber-600/40 bg-amber-600/10'
    : 'text-red-400 border-red-600/40 bg-red-600/10'

  return (
    <section className="w-full">
      <div className="animate-fade-in-up">
        <h3 className="text-lg font-semibold text-white">What If Simulator</h3>
        <p className="text-xs text-gray-400 mt-1">
          Move sliders to explore counterfactuals. See how the recommendation, confidence and contributions would change.
        </p>
      </div>

      <div className="mt-4 grid lg:grid-cols-3 gap-4">
        <div className="glass border border-gray-800 rounded-2xl p-4">
          <Slider
            label="Revenue Growth"
            suffix="%"
            min={0} max={40} step={1}
            value={features['Revenue Growth']}
            onChange={(v) => setFeatures((s) => ({ ...s, 'Revenue Growth': v }))}
          />
          <Slider
            label="Debt Ratio"
            suffix="%"
            min={0} max={100} step={1}
            value={features['Debt Ratio']}
            onChange={(v) => setFeatures((s) => ({ ...s, 'Debt Ratio': v }))}
          />
          <Slider
            label="News Sentiment"
            suffix="%"
            min={0} max={100} step={1}
            value={features['News Sentiment']}
            onChange={(v) => setFeatures((s) => ({ ...s, 'News Sentiment': v }))}
          />
          <Slider
            label="Risk Level"
            min={1} max={3} step={1}
            value={features['Risk Level']}
            labels={['Low', 'Medium', 'High']}
            onChange={(v) => setFeatures((s) => ({ ...s, 'Risk Level': v }))}
          />
          <Slider
            label="Investment Horizon"
            suffix="y"
            min={1} max={10} step={1}
            value={features['Investment Horizon']}
            onChange={(v) => setFeatures((s) => ({ ...s, 'Investment Horizon': v }))}
          />
        </div>

        <div className="glass border border-gray-800 rounded-2xl p-4">
          <h4 className="text-sm text-gray-300 font-semibold">Live Recommendation</h4>
          <div className={`mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border ${recColor} transition-all duration-300`}>
            <span className="text-sm font-semibold">{result.decision}</span>
          </div>
          <div className="mt-4">
            <div className="text-xs text-gray-400">Confidence</div>
            <div className="mt-1 h-2 w-full bg-gray-800 rounded-full overflow-hidden">
              <div
                className={`h-full ${result.decision === 'BUY' ? 'bg-emerald-500' : result.decision === 'HOLD' ? 'bg-amber-500' : 'bg-red-500'}`}
                style={{ width: `${confidencePct}%` }}
              ></div>
            </div>
            <div className="mt-1 text-xs text-gray-300">{confidencePct}%</div>
          </div>
          {result.applied && (
            <div className="mt-4 rounded-lg bg-gray-900 border border-gray-800 p-3 text-xs text-gray-300">
              Rule applied: {result.applied.reason}
            </div>
          )}
        </div>

        <div className="glass border border-gray-800 rounded-2xl p-4">
          <h4 className="text-sm text-gray-300 font-semibold">Counterfactual Explainability</h4>
          <ul className="mt-2 space-y-2 text-xs text-gray-300">
            <li>Lowering Revenue Growth below 10% would change to SELL.</li>
            <li>Shortening Investment Horizon under 2 years reduces conviction.</li>
            <li>Excessive Valuation (PE &gt; 55) triggers HOLD until fundamentals catch up.</li>
          </ul>
          <div className="mt-3 text-xs text-gray-400">
            This panel demonstrates how adjustments would alter the outcome.
          </div>
        </div>
      </div>
    </section>
  )
}

function Slider({ label, min, max, step, value, onChange, suffix, labels }) {
  return (
    <div className="mb-4">
      <div className="flex items-center justify-between">
        <span className="text-sm text-white">{label}</span>
        <span className="text-xs text-gray-400">
          {labels ? labels[value - 1] : `${value}${suffix || ''}`}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-emerald-500"
      />
      <div className="flex justify-between text-[11px] text-gray-500 mt-1">
        <span>{labels ? labels[0] : `${min}${suffix || ''}`}</span>
        <span>{labels ? labels[labels.length - 1] : `${max}${suffix || ''}`}</span>
      </div>
    </div>
  )
}