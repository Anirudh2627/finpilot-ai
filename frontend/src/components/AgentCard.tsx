import { Circle as CheckCircle2, Loader2 } from 'lucide-react';export default function AgentCard({ agent, index }) {
  const done = agent.status === 'Completed'
  return (
    <div className="relative pl-10">
      <div className="absolute left-1.5 top-3">
        <div className={`w-5 h-5 rounded-full border-2 ${done ? 'border-emerald-500 bg-emerald-500/20' : 'border-amber-500 bg-amber-500/20'}`} />
      </div>
      <div className="glass border border-gray-800 rounded-xl p-4 animate-fade-in-up" style={{ animationDelay: `${index * 60}ms` }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-white">{agent.name}</span>
            {done ? (
              <span className="text-emerald-400 text-xs flex items-center gap-1"><CheckCircle2 size={14} /> Completed</span>
            ) : (
              <span className="text-amber-300 text-xs flex items-center gap-1"><Loader2 className="animate-spin" size={14} /> Running</span>
            )}
          </div>
          <div className="text-xs text-gray-400">
            Time: {agent.ms} ms • Confidence: {Math.round((agent.confidence || 0) * 100)}%
          </div>
        </div>
        <div className="mt-2 text-sm text-gray-300">{agent.output}</div>
        {agent.logs && agent.logs.length > 0 && (
          <div className="mt-2 rounded-lg bg-gray-900 border border-gray-800 p-2">
            <div className="text-xs text-gray-400">Logs</div>
            <ul className="mt-1 text-xs text-gray-300 list-disc pl-4">
              {agent.logs.map((l, i) => <li key={i}>{l}</li>)}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}