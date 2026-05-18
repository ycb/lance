import { MiniChain } from './MiniChain'

const SEVERITY = {
  needs_decision: 'border-l-4 border-red-500 bg-white',
  in_progress:    'border-l-4 border-green-500 bg-white',
  resolved:       'border-l-4 border-gray-300 bg-gray-50',
}

export function CommitmentCard({ commitment, onClick }) {
  const isResolved = commitment.severity === 'resolved'

  return (
    <button
      className={`w-full text-left px-4 py-3.5 rounded-xl shadow-sm mb-3 ${SEVERITY[commitment.severity]} ${isResolved ? 'opacity-60' : ''}`}
      onClick={onClick}
      disabled={isResolved}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="text-xs text-gray-400 truncate">{commitment.guest}</p>
          <p className="text-sm font-semibold text-gray-900 mt-0.5 leading-snug">{commitment.summary}</p>
          <p className="text-xs text-gray-400 mt-0.5">{commitment.stepLabel}</p>
        </div>
        {commitment.severity === 'needs_decision' && (
          <span className="shrink-0 text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-semibold mt-0.5">
            Decide
          </span>
        )}
      </div>
      <MiniChain steps={commitment.chainSteps} />
    </button>
  )
}
