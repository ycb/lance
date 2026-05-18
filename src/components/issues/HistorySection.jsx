import { useState } from 'react'
import { Avatar } from '@/components/shared/Avatar'

const STATUS_COLOR = {
  complete:  'text-foreground',
  active:    'text-foreground',
  escalated: 'text-destructive',
  pending:   'text-muted-foreground',
}

function HistoryStep({ step, isLast }) {
  return (
    <div className="flex gap-3">
      <div className="flex flex-col items-center shrink-0">
        <Avatar initials={step.initials} deptId={step.deptId} status={step.status} size="md" />
        {!isLast && <div className="w-px flex-1 bg-border mt-1.5 mb-0" />}
      </div>
      <div className={`flex-1 ${isLast ? 'pb-0' : 'pb-4'}`}>
        <div className="flex items-baseline gap-2">
          <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">{step.role}</p>
          <span className="text-[10px] text-muted-foreground/60">{step.time}</span>
        </div>
        <p className={`text-sm mt-0.5 ${STATUS_COLOR[step.status]}`}>{step.action}</p>
        {step.outcome && (
          <p className="text-xs text-muted-foreground mt-1 italic">"{step.outcome}"</p>
        )}
      </div>
    </div>
  )
}

export function HistorySection({ steps }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="rounded-lg border border-border overflow-hidden">
      <button
        className="w-full flex items-center justify-between px-4 py-3 bg-muted/40 text-left"
        onClick={() => setExpanded(e => !e)}
      >
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">History</span>
          <span className="text-[10px] bg-border text-muted-foreground rounded-full px-2 py-0.5">{steps.length} steps</span>
        </div>
        <svg
          className={`w-4 h-4 text-muted-foreground transition-transform ${expanded ? 'rotate-180' : ''}`}
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {expanded && (
        <div className="px-4 pt-4 pb-2">
          {steps.map((step, i) => (
            <HistoryStep key={step.id} step={step} isLast={i === steps.length - 1} />
          ))}
        </div>
      )}
    </div>
  )
}
