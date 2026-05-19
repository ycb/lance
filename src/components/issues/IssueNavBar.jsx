// src/components/issues/IssueNavBar.jsx
// Issue-level navigation bar. White background — visually distinct from the cobalt AppHeader.
// Shows back arrow, issue title (room · guest), and elapsed time.

export function IssueNavBar({ title, elapsed, onBack }) {
  return (
    <div className="shrink-0 flex items-center gap-2 px-4 py-2.5 bg-white border-b border-gray-200">
      <button
        onClick={onBack}
        className="shrink-0 text-base font-bold leading-none"
        style={{ color: '#3363AC' }}
        aria-label="Back"
      >
        ←
      </button>
      <p className="flex-1 font-bold text-sm text-gray-900 truncate">{title}</p>
      <span className="text-xs shrink-0" style={{ color: '#6b7280' }}>
        {elapsed}
      </span>
    </div>
  )
}
