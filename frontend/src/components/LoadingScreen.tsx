import { Circle as CheckCircle2 } from 'lucide-react';export default function LoadingScreen({ steps, current }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur">
      <div className="w-full max-w-lg glass border border-gray-800 rounded-2xl p-6 shadow-2xl">
        <h3 className="text-lg font-semibold text-white">Running FinPilot Analysis</h3>
        <p className="text-xs text-gray-400 mt-1">
          Explainable Agentic AI workflow in progress...
        </p>
        <div className="mt-4 space-y-2 max-h-64 overflow-auto pr-2">
          {steps.map((label, idx) => {
            const done = idx < current
            const active = idx === current
            return (
              <div
                key={label}
                className={`flex items-center justify-between rounded-lg border px-3 py-2 ${done
                  ? 'border-emerald-700/40 bg-emerald-900/10'
                  : active
                  ? 'border-amber-700/40 bg-amber-900/10'
                  : 'border-gray-800 bg-gray-900/30'
                }`}
              >
                <span className={`text-sm ${done ? 'text-emerald-400' : active ? 'text-amber-300 animate-pulse' : 'text-gray-400'}`}>
                  {label}
                </span>
                {done && <CheckCircle2 className="text-emerald-400" size={16} />}
                {active && !done && (
                  <div className="h-2 w-16 bg-amber-500/30 rounded-full overflow-hidden">
                    <div className="h-full w-1/2 bg-amber-400 animate-pulse"></div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
        <div className="mt-4 h-2 w-full bg-gray-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-emerald-500 transition-all duration-300"
            style={{ width: `${Math.round(((current + 1) / steps.length) * 100)}%` }}
          ></div>
        </div>
      </div>
    </div>
  )
}