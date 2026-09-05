import SearchBar from './SearchBar'

export default function Hero({ onAnalyze }) {
  return (
    <section className="w-full bg-gradient-to-b from-gray-950 to-gray-900 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="animate-fade-in-up">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white tracking-tight">
            Explainable Autonomous Financial Advisor
          </h1>
          <p className="mt-3 text-gray-300 max-w-2xl">
            Receive investment recommendations that are transparent, evidence-backed and fully explainable.
          </p>
        </div>

        <div className="mt-8">
          <SearchBar
            placeholder="Should I invest ₹2,00,000 in NVIDIA for the next 5 years?"
            onAnalyze={onAnalyze}
          />
          <p className="mt-3 text-xs text-gray-400">
            Press Analyze to watch FinPilot AI think through markets, news, risk and evidence in real time.
          </p>
        </div>
      </div>
    </section>
  )
}