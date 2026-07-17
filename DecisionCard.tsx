import { useMemo } from 'react'
import { Zap, Timer, Circle as BookOpenCheck, ArrowUpRight, Shield } from 'lucide-react';function gaugeClassFromPercent(pct) {
  const step = Math.max(0, Math.min(100, Math.round(pct * 100)))
  const rounded = Math.round(step / 10) * 10
  return `gauge gauge-${rounded}`
}

function recColor(decision) {
  if (decision === 'BUY') return 'bg-emerald-600/15 text-emerald-400 border-emerald-600/40'
  if (decision === 'HOLD') return 'bg-amber-600/15 text-amber-400 border-amber-600/40'
  return 'bg-red-600/15 text-red-400 border-red-600/40'
}

export default function DecisionCard({ data }) {
  const srcCount = useMemo(() => (data?.evidence?.length || 0), [data])
  const confGauge = useMemo(() => gaugeClassFromPercent(data?.confidence || 0), [data])

  return (
    <section className="w-full">
      <div className="glass border border-gray-800 rounded-2xl p-6 shadow-xl animate-fade-in-up">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className={`px-3 py-1.5 rounded-full border ${recColor(data?.decision)} relative`}>
              <span className="text-xs font-semibold tracking-wide">{data?.decision}</span>
              <span className="absolute inset-0 rounded-full animate-[pulse-soft_1.6s_ease_infinite]"></span>
            </div>
            <h2 className="text-xl font-semibold text-white">
              Recommendation
            </h2>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative w-16 h-16">
              <div className={`${confGauge} w-16 h-16`} />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-sm font-semibold text-white">
                  {Math.round((data?.confidence || 0) * 100)}%
                </span>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3 text-xs">
              <Stat icon={<Shield size={14} />} label="Risk" value="Medium" />
              <Stat icon={<Zap size={14} />} label="Expected Return" value="High" />
              <Stat icon={<Timer size={14} />} label="Exec Time" value={`${data?.execution_time || 2.1}s`} />
              <Stat icon={<BookOpenCheck size={14} />} label="Sources Used" value={srcCount} />
              <Stat icon={<ArrowUpRight size={14} />} label="Horizon" value="5 Years" />
              <Stat icon={<ArrowUpRight size={14} />} label="Action" value={data?.decision} />
            </div>
          </div>
        </div>

        <p className="mt-5 text-gray-300 text-sm">
          {data?.summary}
        </p>
      </div>
    </section>
  )
}

function Stat({ icon, label, value }) {
  return (
    <div className="px-3 py-2 rounded-lg bg-gray-900 border border-gray-800">
      <div className="flex items-center gap-2 text-gray-400">{icon}<span>{label}</span></div>
      <div className="mt-1 text-white font-medium">{value}</div>
    </div>
  )
}