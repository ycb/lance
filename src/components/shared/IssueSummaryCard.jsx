// The one approved summary card. Used identically in IssueNavBar and IssueCard.

import { AISummary } from '@/components/shared/AISummary'
import { Avatar } from '@/components/shared/Avatar'
import { Badge } from '@/components/ui/badge'

export function IssueSummaryCard({
  title,
  sourceLine,
  aiSummary,
  metaLine,
  // Optional: board list context shown above title
  guest,
  room,
  elapsed,
  // Optional: assignee row shown below metaLine
  assignee,
  severity,
  stepIndicator,
  // Optional: IssueNavBar fallback when there is no originTicket
  contextHeader,
}) {
  return (
    <div
      data-testid="origin-ticket-surface"
      style={{
        background: 'white',
        border: '1px solid #e5e7eb',
        borderRadius: 7,
        boxShadow: '0 1px 0 rgba(17, 24, 39, 0.03)',
        overflow: 'hidden',
      }}
    >
      {/* IssueNavBar fallback: no originTicket, show check-in context line */}
      {contextHeader && (
        <div className="px-3 pt-2 pb-1" style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 10, color: '#6b7280' }}>
          {contextHeader}
        </div>
      )}

      {/* Board: guest · room + elapsed */}
      {(guest || elapsed) && (
        <div className="px-3 pt-2 pb-0" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {guest && room && <span style={{ fontSize: 11, color: '#6b7280' }}>{guest} · {room}</span>}
          {elapsed && <span style={{ fontSize: 11, color: '#9ca3af' }}>{elapsed}</span>}
        </div>
      )}

      {/* Title + source line */}
      {title && (
        <div className="px-3 py-2">
          <p style={{ flex: 1, minWidth: 0, fontSize: 12, fontWeight: 700, color: '#111827' }}>{title}</p>
          {sourceLine && (
            <p style={{ fontSize: 9, color: '#9ca3af', marginTop: 1 }}>{sourceLine}</p>
          )}
        </div>
      )}

      {/* AI Summary */}
      {aiSummary && (
        <div className="px-3 pb-2">
          <AISummary variant="badge" text={aiSummary} />
        </div>
      )}

      {/* Linked ticket / lower metadata */}
      {metaLine && (
        <p className="px-3 pb-2" style={{ fontSize: 9, color: '#9ca3af' }}>
          {metaLine}
        </p>
      )}

      {/* Board: assignee row */}
      {assignee && (
        <div
          className="px-3 pb-3"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '1px solid #f3f4f6',
            paddingTop: 8,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Avatar
              initials={assignee.initials}
              deptId={assignee.deptId}
              status={
                severity === 'needs_decision' ? 'escalated'
                : severity === 'resolved'     ? 'complete'
                : 'active'
              }
              size="sm"
            />
            <span style={{ fontSize: 12, color: '#6b7280' }}>{assignee.name}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {stepIndicator && (
              <span style={{ fontSize: 10, color: '#9ca3af' }}>{stepIndicator}</span>
            )}
            {severity === 'needs_decision' && (
              <Badge variant="destructive" className="text-[10px] px-1.5 py-0">Decide</Badge>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
