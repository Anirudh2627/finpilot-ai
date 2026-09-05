import { useState } from 'react'
import { Search } from 'lucide-react';export default function SearchBar({ placeholder, onAnalyze }) {
  const [value, setValue] = useState('Should I invest ₹2,00,000 in NVIDIA for the next 5 years?')

  return (
    <div className="w-full">
      <div className="flex items-center gap-2 p-2 rounded-xl bg-gray-900 border border-gray-800 shadow-lg">
        <div className="px-3 py-2 bg-gray-800 rounded-lg text-gray-300">
          <Search size={16} />
        </div>
        <input
          className="flex-1 bg-transparent outline-none text-gray-100 placeholder:text-gray-500 text-sm"
          placeholder={placeholder}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button
          onClick={() => onAnalyze(value)}
          className="px-4 py-2 bg-emerald-600 text-white rounded-lg shadow hover:bg-emerald-500 hover:shadow-lg transition-all duration-200 transform hover:scale-105"
        >
          Analyze
        </button>
      </div>
    </div>
  )
}