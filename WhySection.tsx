import ReasonCard from './ReasonCard'

export default function WhySection({ data, mode }) {
  const positives = (data?.top_reasons || []).filter((r) => r.type === 'positive')
  const negatives = (data?.top_reasons || []).filter((r) => r.type === 'negative')

  return (
    <section className="w-full">
      <div className="animate-fade-in-up">
        <h3 className="text-lg font-semibold text-white">Why did the AI decide this?</h3>
        <p className="text-xs text-gray-400 mt-1">
          Transparent reasoning with importance, contribution and evidence. Mode: {mode}
        </p>
      </div>
      <div className="mt-4 grid lg:grid-cols-2 gap-4">
        <div className="space-y-3">
          <h4 className="text-sm text-emerald-400 font-semibold">Positive Reasons</h4>
          {positives.map((r) => (
            <ReasonCard key={r.id} item={r} />
          ))}
        </div>
        <div className="space-y-3">
          <h4 className="text-sm text-red-400 font-semibold">Negative Reasons</h4>
          {negatives.map((r) => (
            <ReasonCard key={r.id} item={r} negative />
          ))}
        </div>
      </div>
    </section>
  )
}