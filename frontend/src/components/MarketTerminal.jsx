export default function MarketTerminal({ data }) {
  const tape = data?.tape || []
  const watchlist = data?.watchlist || []

  return (
    <section className="border-y border-gray-800 bg-gray-950/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <p className="text-xs uppercase tracking-wide text-gray-400 mb-3">Market Terminal</p>

        <div className="ticker rounded-md mb-4">
          <div className="ticker-track py-2 px-4 text-sm text-gray-200">
            {[...tape, ...tape].map((item, idx) => (
              <span key={`${item.symbol}-${idx}`} className="mr-8">
                <span className="font-medium">{item.symbol}</span>{' '}
                <span className={item.change >= 0 ? 'text-emerald-400' : 'text-red-400'}>
                  {item.change >= 0 ? '+' : ''}{item.change}%
                </span>
              </span>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto border border-gray-800 rounded-md">
          <table className="w-full text-sm">
            <thead className="bg-gray-900 text-gray-300">
              <tr>
                <th className="text-left px-3 py-2">Stock</th>
                <th className="text-left px-3 py-2">Price</th>
                <th className="text-left px-3 py-2">Change</th>
                <th className="text-left px-3 py-2">AI</th>
              </tr>
            </thead>
            <tbody>
              {watchlist.map((item) => (
                <tr key={item.name} className="border-t border-gray-800 text-gray-200">
                  <td className="px-3 py-2">{item.name}</td>
                  <td className="px-3 py-2">{item.price}</td>
                  <td className={item.chg >= 0 ? 'px-3 py-2 text-emerald-400' : 'px-3 py-2 text-red-400'}>
                    {item.chg >= 0 ? '+' : ''}{item.chg}%
                  </td>
                  <td className="px-3 py-2">{item.ai}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
