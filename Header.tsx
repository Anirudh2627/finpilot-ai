import { useState } from 'react'
import { LineChart, Settings, User, Sun, Moon, Menu, X } from 'lucide-react';export default function Header({ onToggleTheme, dark, onNavigate }) {
  const [open, setOpen] = useState(false)
  const linkClass =
    'px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-800 rounded-md transition-colors duration-200'

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <div className="glass border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              className="sm:hidden p-2 rounded-md hover:bg-gray-800 text-gray-300"
              onClick={() => setOpen((o) => !o)}
              aria-label="Toggle Menu"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-emerald-600/10 border border-emerald-600/30 text-emerald-400">
                <LineChart size={18} />
              </div>
              <span className="font-semibold tracking-tight text-white">FinPilot AI</span>
              <span className="text-xs text-amber-400/80 border border-amber-500/30 rounded px-2 py-0.5 ml-2">
                Explainable Autonomous Financial Decision Workspace
              </span>
            </div>
          </div>

          <nav className="hidden sm:flex items-center gap-1">
            <a href="#workspace" onClick={(e) => { e.preventDefault(); onNavigate('workspace') }} className={linkClass}>Workspace</a>
            <a href="#markets" onClick={(e) => { e.preventDefault(); onNavigate('markets') }} className={linkClass}>Markets</a>
            <a href="#portfolio" className={linkClass}>Portfolio</a>
            <a href="#docs" className={linkClass}>Documentation</a>
            <a href="#api" className={linkClass}>API</a>
            <a href="#about" className={linkClass}>About</a>
          </nav>

          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={onToggleTheme}
              className="p-2 rounded-md bg-gray-800 hover:bg-gray-700 text-gray-300 transition-colors"
              aria-label="Toggle Theme"
            >
              {dark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <button className="p-2 rounded-md bg-gray-800 hover:bg-gray-700 text-gray-300 transition-colors" aria-label="Settings">
              <Settings size={16} />
            </button>
            <button className="pl-3 pr-3 py-1.5 rounded-md bg-gray-800 hover:bg-gray-700 text-gray-200 border border-gray-700 transition-colors" aria-label="Profile">
              <div className="flex items-center gap-2">
                <User size={14} />
                <span className="text-sm">Analyst</span>
              </div>
            </button>
          </div>
        </div>

        {open && (
          <div className="sm:hidden border-t border-gray-800 px-4 py-3 space-y-1 bg-gray-900">
            <a href="#workspace" onClick={(e) => { e.preventDefault(); onNavigate('workspace'); setOpen(false) }} className={linkClass}>Workspace</a>
            <a href="#markets" onClick={(e) => { e.preventDefault(); onNavigate('markets'); setOpen(false) }} className={linkClass}>Markets</a>
            <a href="#portfolio" className={linkClass}>Portfolio</a>
            <a href="#docs" className={linkClass}>Documentation</a>
            <a href="#api" className={linkClass}>API</a>
            <a href="#about" className={linkClass}>About</a>
            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => { onToggleTheme(); setOpen(false) }}
                className="p-2 rounded-md bg-gray-800 hover:bg-gray-700 text-gray-300 transition-colors"
                aria-label="Toggle Theme Mobile"
              >
                {dark ? <Sun size={16} /> : <Moon size={16} />}
              </button>
              <button className="p-2 rounded-md bg-gray-800 hover:bg-gray-700 text-gray-300 transition-colors" aria-label="Settings Mobile">
                <Settings size={16} />
              </button>
              <button className="p-2 rounded-md bg-gray-800 hover:bg-gray-700 text-gray-300 transition-colors" aria-label="Profile Mobile">
                <User size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}