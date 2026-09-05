import { useState } from 'react'

export default function JudgePanel({ data }) {
  const [open, setOpen] = useState(false)
  const pretty = (obj) => JSON.stringify(obj, null, 2)

  return (
    <section className="w-full">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full text-left glass border border-gray-800 rounded-2xl p-4 hover:shadow-md transition-all"
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-white">Judge Mode</h3>
            <p className="text-xs text-gray-400 mt-1">Full transparency for verification and audit.</p>
          </div>
          <div className="text-xs text-gray-400">{open ? 'Collapse' : 'Expand'}</div>
        </div>
      </button>

      {open && (
        <div className="mt-3 grid lg:grid-cols-2 gap-4">
          <Panel title="Execution Time">{data.execution_time} seconds</Panel>
          <Panel title="Model">FinPilot Reasoner</Panel>
          <Panel title="Model Version">v1.0.0</Panel>
          <Panel title="Features Used">
            <pre className="bg-gray-900 text-gray-100 p-3 rounded text-xs overflow-auto">
              <code>{`Revenue Growth, News Sentiment, Debt Ratio, Volatility, PE Ratio`}</code>
            </pre>
          </Panel>
          <Panel title="Agent Logs">
            <pre className="bg-gray-900 text-gray-100 p-3 rounded text-xs overflow-auto">
              <code>{pretty(data.agent_trace)}</code>
            </pre>
          </Panel>
          <Panel title="Confidence Formula">
            <pre className="bg-gray-900 text-gray-100 p-3 rounded text-xs overflow-auto">
              <code>{`Confidence ≈ sigmoid(weighted_sum(SHAP) + trust_adjustments)`}</code>
            </pre>
          </Panel>
          <Panel title="SHAP Values">
            <pre className="bg-gray-900 text-gray-100 p-3 rounded text-xs overflow-auto">
              <code>{pretty(data.shap)}</code>
            </pre>
          </Panel>
          <Panel title="LIME Values">
            <pre className="bg-gray-900 text-gray-100 p-3 rounded text-xs overflow-auto">
              <code>{pretty(data.lime)}</code>
            </pre>
          </Panel>
          <Panel title="Counterfactual Analysis">
            <pre className="bg-gray-900 text-gray-100 p-3 rounded text-xs overflow-auto">
              <code>{pretty(data.counterfactuals)}</code>
            </pre>
          </Panel>
          <Panel title="JSON Response">
            <pre className="bg-gray-900 text-gray-100 p-3 rounded text-xs overflow-auto">
              <code>{pretty(data)}</code>
            </pre>
          </Panel>
        </div>
      )}
    </section>
  )
}

function Panel({ title, children }) {
  return (
    <div className="glass border border-gray-800 rounded-2xl p-4">
      <div className="text-sm font-semibold text-white">{title}</div>
      <div className="mt-2 text-xs text-gray-300">{children}</div>
    </div>
  )
}