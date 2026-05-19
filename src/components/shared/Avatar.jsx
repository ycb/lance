const DEPT_COLORS = {
  FD:  '#3B82F6',
  FB:  '#F59E0B',
  RW:  '#14B8A6',
  HK:  '#A855F7',
  ME:  '#F97316',
  SEC: '#64748B',
  SUP: '#002E5A',
}

const SIZES = {
  xs: 'w-[22px] h-[22px] text-[8px] font-bold',
  sm: 'w-7 h-7 text-xs',
  md: 'w-9 h-9 text-sm',
  lg: 'w-11 h-11 text-base',
}

export function Avatar({ initials, deptId, status = 'pending', size = 'md' }) {
  const color = DEPT_COLORS[deptId] ?? '#9CA3AF'

  return (
    <div
      className={`${SIZES[size]} rounded-full flex items-center justify-center font-semibold bg-gray-100 text-gray-700 relative shrink-0`}
      style={{ outline: `2px solid ${color}`, outlineOffset: '1px' }}
    >
      {initials}

      {status === 'complete' && (
        <span
          data-testid="badge-complete"
          className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full flex items-center justify-center"
        >
          <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
          </svg>
        </span>
      )}

      {status === 'escalated' && (
        <span
          data-testid="badge-escalated"
          className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-red-500 rounded-full flex items-center justify-center text-white font-bold"
          style={{ fontSize: '9px' }}
        >
          !
        </span>
      )}
    </div>
  )
}
