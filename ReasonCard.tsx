import { useState } from 'react'
import * as Icons from 'lucide-react'

function widthClassFromImportance(x) {
  const pct = Math.max(0, Math.min(1, x || 0))
  // Map to twelfths
  const step = Math.round(pct * 12)
  const classes = [
    'w-0', 'w-1/12', 'w-2/12', 'w-3/12', 'w-4/12', 'w-5/12',
    'w-6/12', 'w-7/12', 'w-8/12', 'w-9/12', 'w-10/12', 'w-11/12', 'w-full'
  ]
  return classes[step]
}

export default function ReasonCard({ item, negative = false }) {
  const [open, setOpen] = useState(false)
  const Icon = Icons[item?.icon] || Icons.Info

  return (
    <div className="glass border border-gray-800 rounded-xl p-4 transition-all hover:shadow-lg">
      <div className="flex items-start gap-3">
        <div className={`p-2 rounded-lg ${negative ? 'bg-red-500/10 border border-red-500/30 text-red-400' : 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400'}`}>
          <Icon size={16} />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between gap-2">
            <h5 className="text-sm font-semibold text-white">{item?.title}</h5>
            <button
              onClick={() => setOpen((o) => !o)}
              className="text-xs text-gray-300 border border-gray-700 px-2 py-1 rounded hover:bg-gray-800 transition-colors"
            >
              {open ? 'Collapse' : 'Expand'}
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-1">{item?.description}</p>
          <div className="mt-3">
            <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
              <div className={`h-full ${negative ? 'bg-red-500' : 'bg-emerald-500'} ${widthClassFromImportance(item?.importance)}`}></div>
            </div>
            <div className="flex items-center justify-between mt-1 text-[11px] text-gray-400">
              <span>Importance: {Math.round((item?.importance || 0) * 100)}%</span>
              <span>Contribution: {item?.contribution >= 0 ? '+' : ''}{Math.round((item?.contribution || 0) * 100)}%</span>
            </div>
          </div>

          {open && (
            <div className="mt-3 rounded-lg border border-gray-800 bg-gray-900 p-3">
              <div className="grid sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <div className="text-gray-400">Why it mattered</div>
                  <div className="text-gray-300 mt-1">{item?.why}</div>
                </div>
                <div>
                  <div className="text-gray-400">Supporting evidence</div>
                  <div className="text-gray-300 mt-1">{item?.details}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}