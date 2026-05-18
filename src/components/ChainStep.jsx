import { Avatar } from './Avatar'

const STATUS_STYLES = {
  complete:  'text-gray-900',
  active:    'text-gray-900',
  escalated: 'text-red-600',
  pending:   'text-gray-400',
  skipped:   'text-gray-300',
}

export function ChainStep({ step }) {
  return (
    <div className="flex gap-3 py-3">
      <div className="flex flex-col items-center">
        <Avatar initials={step.initials} deptId={step.deptId} status={step.status} size="md" />
        <div className="w-px flex-1 bg-gray-100 mt-2" />
      </div>
      <div className="flex-1 pb-2">
        <div className="flex items-center gap-2">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{step.role}</p>
          <span className="text-xs text-gray-300">{step.time}</span>
        </div>
        <p className={`text-sm mt-0.5 ${STATUS_STYLES[step.status]}`}>{step.action}</p>
        {step.outcome && (
          <p className="text-xs text-gray-500 mt-1 italic">"{step.outcome}"</p>
        )}
      </div>
    </div>
  )
}
