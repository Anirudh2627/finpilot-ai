export default function LIMECard({ data, mode }) {
  const lime = data?.lime || { positive: [], negative: [] }
  return (
    <section className="w-full">
      <div className="animate-fade-in-up">
        <h3 className="text-lg font-semibold text-white">LIME Explanation</h3>
        <p className="text-xs text-gray-400 mt-1">
          Local feature importance around the current prediction. Mode: {mode}
        </p>
      </div>

      <div className="mt-4 grid lg:grid-cols-2 gap-4">
        <div className="glass border border-gray-800 rounded-2xl p-4">
          <h4 className="text-sm text-emerald-400 font-semibold">Positive Factors</h4>
          <ul className="mt-2 space-y-2">
            {lime.positive.map((f) => (
              <li key={f.feature} className="flex items-start gap-3">
                <span className="mt-0.5 h-2 w-2 rounded-full bg-emerald-500"></span>
                <div>
                  <div className="text-sm text-white">{f.feature}</div>
                  <div className="text-xs text-gray-400">Why: {f.why}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="glass border border-gray-800 rounded-2xl p-4">
          <h4 className="text-sm text-red-400 font-semibold">Negative Factors</h4>
          <ul className="mt-2 space-y-2">
            {lime.negative.map((f) => (
              <li key={f.feature} className="flex items-start gap-3">
                <span className="mt-0.5 h-2 w-2 rounded-full bg-red-500"></span>
                <div>
                  <div className="text-sm text-white">{f.feature}</div>
                  <div className="text-xs text-gray-400">Why: {f.why}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-3 text-xs text-gray-400">
        Removing Revenue Growth changes prediction: LIME indicates the model would downgrade without this factor.
      </div>
    </section>
  )
}