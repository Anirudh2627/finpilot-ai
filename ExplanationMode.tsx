export default function ExplanationMode({ value, onChange }) {
  const tabs = ['Beginner', 'Investor', 'Technical']
  return (
    <section className="w-full">
      <div className="animate-fade-in-up">
        <h3 className="text-lg font-semibold text-white">Explanation Mode</h3>
        <p className="text-xs text-gray-400 mt-1">Change how explanations are written across sections.</p>
      </div>
      <div className="mt-3 inline-flex rounded-lg border border-gray-800 bg-gray-900 p-1">
        {tabs.map((t) => {
          const active = value === t
          return (
            <button
              key={t}
              onClick={() => onChange(t)}
              className={`px-3 py-1.5 text-sm rounded-md transition-colors ${active ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-gray-200'}`}
            >
              {t}
            </button>
          )
        })}
      </div>
      <div className="mt-2 text-xs text-gray-400">
        {value === 'Beginner' && 'Plain English with minimal jargon.'}
        {value === 'Investor' && 'Professional financial language and metrics.'}
        {value === 'Technical' && 'SHAP, LIME, counterfactuals and confidence formulas.'}
      </div>
    </section>
  )
}