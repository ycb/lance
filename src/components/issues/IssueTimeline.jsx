import { Avatar } from '@/components/shared/Avatar'
import { AIActionCard } from './AIActionCard'

const STATUS_BADGE = {
  complete:  { label: 'Done',      cls: 'bg-green-100 text-green-700' },
  active:    { label: 'Active',    cls: 'bg-blue-100 text-blue-700'  },
  escalated: { label: 'Escalated', cls: 'bg-destructive/10 text-destructive' },
  pending:   { label: 'Pending',   cls: 'bg-muted text-muted-foreground' },
}

function GuestOrigin({ event, isLast }) {
  return (
    <div className="flex gap-3">
      <div className="flex flex-col items-center shrink-0">
        <div className="w-8 h-8 rounded-full bg-muted border-2 border-border flex items-center justify-center shrink-0">
          <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        {!isLast && <div className="w-px flex-1 bg-border mt-1" />}
      </div>
      <div className={`flex-1 ${isLast ? 'pb-0' : 'pb-4'}`}>
        <div className="flex items-baseline gap-2 mb-1">
          <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Guest request</span>
          <span className="text-[10px] text-muted-foreground/60">{event.time}</span>
        </div>
        <div className="bg-muted rounded-2xl rounded-tl-sm px-3 py-2 inline-block">
          <p className="text-sm text-foreground">"{event.text}"</p>
        </div>
      </div>
    </div>
  )
}

function StaffStep({ event, isLast }) {
  const badge = STATUS_BADGE[event.status] || STATUS_BADGE.pending
  return (
    <div className="flex gap-3">
      <div className="flex flex-col items-center shrink-0">
        <Avatar initials={event.initials} deptId={event.deptId} status={event.status} size="md" />
        {!isLast && <div className="w-px flex-1 bg-border mt-1" />}
      </div>
      <div className={`flex-1 ${isLast ? 'pb-0' : 'pb-4'}`}>
        <div className="flex items-center justify-between mb-0.5">
          <div className="flex items-baseline gap-2">
            <span className="text-xs font-semibold text-foreground">{event.name}</span>
            <span className="text-[10px] text-muted-foreground">{event.role}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded uppercase ${badge.cls}`}>{badge.label}</span>
            <span className="text-[10px] text-muted-foreground/60">{event.time}</span>
          </div>
        </div>
        <p className="text-xs text-muted-foreground">{event.action}</p>
        {event.outcome && (
          <p className="text-xs text-muted-foreground mt-1 italic">"{event.outcome}"</p>
        )}
      </div>
    </div>
  )
}

function AIActionRow({ event, isLast }) {
  return (
    <div className="flex gap-3">
      <div className="flex flex-col items-center shrink-0 w-8">
        <div className="w-px h-2 bg-border" />
        {!isLast && <div className="w-px flex-1 bg-border" />}
      </div>
      <div className={`flex-1 ${isLast ? 'pb-0' : 'pb-3'}`}>
        <AIActionCard event={event} />
      </div>
    </div>
  )
}

export function IssueTimeline({ timeline }) {
  return (
    <div>
      {timeline.map((event, i) => {
        const isLast = i === timeline.length - 1
        if (event.type === 'guest') return <GuestOrigin key={event.id} event={event} isLast={isLast} />
        if (event.type === 'ai_action') return <AIActionRow key={event.id} event={event} isLast={isLast} />
        if (event.type === 'staff_step') return <StaffStep key={event.id} event={event} isLast={isLast} />
        return null
      })}
    </div>
  )
}
