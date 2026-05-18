import { useState } from 'react'
import { ChainStep } from './ChainStep'

export function ChainView({ steps }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="bg-gray-50 rounded-xl overflow-hidden">
      <button
        className="w-full flex items-center justify-between px-4 py-3 text-left"
        onClick={() => setExpanded(e => !e)}
      >
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Chain History</span>
          <span className="text-xs bg-gray-200 text-gray-600 rounded-full px-2 py-0.5">{steps.length} steps</span>
        </div>
        <svg
          className={`w-4 h-4 text-gray-400 transition-transform ${expanded ? 'rotate-180' : ''}`}
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {expanded && (
        <div className="px-4 pb-2">
          {steps.map(step => (
            <ChainStep key={step.id} step={step} />
          ))}
        </div>
      )}
    </div>
  )
}
