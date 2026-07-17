function widthClassFromPercent(pctAbs) {
  const pct = Math.max(0, Math.min(1, pctAbs))
  const step = Math.round(pct * 12)
  const classes = [
    'w-0', 'w-1/12', 'w-2/12', 'w-3/12', 'w-4/12', 'w-5/12',
    'w-6/12', 'w-7/12', 'w-8/12', 'w-9/12', 'w-10/12', 'w-11/12', 'w-full'
  ]
  return classes[step]
}

export default function SHAPChart({ data }) {
  const items = data?.shap || []
  return (
    <section className="w-full">
      <div className="animate-fade-in-up">
        <h3 className="text-lg font-semibold text-white">SHAP Explainability</h3>
        <p className="text-xs text-gray-400 mt-1">
          Feature contributions to the decision. Hover each bar for details.
        </p>
      </div>

      <div className="mt-4 glass border border-gray-800 rounded-2xl p-4">
        <div className="space-y-3">
          {items.map((it) => {
            const pos = it.contribution >= 0
            const width = widthClassFromPercent(Math.min(Math.abs(it.contribution), 0.4)) // cap for visual
            return (
              <div key={it.feature} className="group">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-200">{it.feature}</span>
                  <span className={`text-xs ${pos ? 'text-emerald-400' : 'text-red-400'}`}>
                    {pos ? '+' : ''}{Math.round(it.contribution * 100)}%
                  </span>
                </div>
                <div className="mt-1 h-6 w-full bg-gray-900 rounded-lg border border-gray-800 overflow-hidden">
                  <div className={`h-full ${pos ? 'bg-emerald-600' : 'bg-red-600'} ${width} transition-all`}></div>
                </div>
                <div className="mt-1 text-xs text-gray-400">
                  Current: {it.value} • Average: {it.average} • Reason: {it.reason}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}