export default function Footer() {
  return (
    <footer className="mt-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid sm:grid-cols-3 gap-6">
          <div>
            <div className="text-white font-semibold">FinPilot AI</div>
            <p className="text-xs text-gray-400 mt-2">
              Explainable Autonomous Financial Decision Workspace for investors, advisors and enterprises.
            </p>
          </div>
          <div>
            <div className="text-white font-semibold">Company</div>
            <ul className="mt-2 space-y-1 text-sm">
              <li><a href="#about" className="text-gray-400 hover:text-gray-200">About</a></li>
              <li><a href="#careers" className="text-gray-400 hover:text-gray-200">Careers</a></li>
            </ul>
          </div>
          <div>
            <div className="text-white font-semibold">Resources</div>
            <ul className="mt-2 space-y-1 text-sm">
              <li><a href="#api" className="text-gray-400 hover:text-gray-200">API</a></li>
              <li><a href="#docs" className="text-gray-400 hover:text-gray-200">Documentation</a></li>
              <li><a href="#github" className="text-gray-400 hover:text-gray-200">GitHub</a></li>
              <li><a href="#privacy" className="text-gray-400 hover:text-gray-200">Privacy</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 text-xs text-gray-500">
          © {new Date().getFullYear()} FinPilot AI. All rights reserved.
        </div>
      </div>
    </footer>
  )
}