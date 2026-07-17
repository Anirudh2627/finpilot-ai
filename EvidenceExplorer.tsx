import { useState } from 'react'
import { ExternalLink, Circle as CheckCircle2 } from 'lucide-react';
const AlertCircle = CheckCircle2;export default function EvidenceExplorer({ data }) {
  const items = data?.evidence || []
  const [openId, setOpenId] = useState(null)

  return (
    <section className="w-full">
      <div className="animate-fade-in-up">
        <h3 className="text-lg font-semibold text-white">Evidence Explorer</h3>
        <p className="text-xs text-gray-400 mt-1">
          Verify every claim. Inspect sources, summaries, and contributions.
        </p>
      </div>

      <div className="mt-4 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map((ev) => {
          const verified = !!ev.verified
          return (
            <div key={ev.id} className="glass border border-gray-800 rounded-2xl p-4">
              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold text-white">{ev.source}</div>
                {verified ? (
                  <span className="text-emerald-400 text-xs inline-flex items-center gap-1"><CheckCircle2 size={14} /> Verified</span>
                ) : (
                  <span className="text-amber-300 text-xs inline-flex items-center gap-1"><AlertCircle size={14} /> Unverified</span>
                )}
              </div>
              <div className="mt-2 text-xs text-gray-400">Confidence: {Math.round((ev.confidence || 0) * 100)}% • Contribution: {Math.round((ev.contribution || 0) * 100)}%</div>
              <div className="mt-2 text-sm text-gray-200 line-clamp-2">{ev.headline}</div>
              <button
                className="mt-3 text-xs text-emerald-400 hover:text-emerald-300 inline-flex items-center gap-1"
                onClick={() => setOpenId((id) => (id === ev.id ? null : ev.id))}
              >
                {openId === ev.id ? 'Hide details' : 'Open'}
                <ExternalLink size={14} />
              </button>

              {openId === ev.id && (
                <div className="mt-3 rounded-lg bg-gray-900 border border-gray-800 p-3">
                  <div className="text-xs text-gray-300">{ev.summary}</div>
                  <div className="mt-2 text-xs text-gray-400">Why used: {ev.why}</div>
                  <div className="mt-1 text-xs text-gray-400">Evidence Quality: {ev.quality}</div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}