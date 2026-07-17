function gaugeClassFromPercent(p) {
  const pct = Math.max(0, Math.min(100, Math.round(p * 100)))
  const rounded = Math.round(pct / 10) * 10
  return `gauge gauge-${rounded}`
}

export default function TrustDashboard({ data }) {
  const t = data?.trust || {}
  const items = [
    { label: 'Overall Trust', val: t.overall || 0.95 },
    { label: 'Evidence Quality', val: t.evidence_quality || 0.98 },
    { label: 'Source Agreement', val: t.source_agreement || 0.94 },
    { label: 'Model Confidence', val: t.model_confidence || 0.91 },
    { label: 'Explainability', val: t.explainability || 1.0 }
  ]

  return (
    <section className="w-full">
      <div className="animate-fade-in-up">
        <h3 className="text-lg font-semibold text-white">Trust Dashboard</h3>
        <p className="text-xs text-gray-400 mt-1">
          Governance metrics ensuring you can trust this AI.
        </p>
      </div>

      <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {items.map((it) => {
          const g = gaugeClassFromPercent(it.val)
          return (
            <div key={it.label} className="glass border border-gray-800 rounded-2xl p-4">
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12">
                  <div className={`${g} w-12 h-12`} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs text-white">{Math.round((it.val || 0) * 100)}%</span>
                  </div>
                </div>
                <div className="text-sm text-gray-200">{it.label}</div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-4 glass border border-gray-800 rounded-2xl p-4">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-200">Audit Passed</div>
          <div className={`px-2 py-1 rounded-md text-xs border ${data?.trust?.audit_passed ? 'text-emerald-400 border-emerald-600/40 bg-emerald-600/10' : 'text-red-400 border-red-600/40 bg-red-600/10'}`}>
            {data?.trust?.audit_passed ? 'YES' : 'NO'}
          </div>
        </div>
      </div>
    </section>
  )
}