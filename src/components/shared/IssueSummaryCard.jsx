// The one approved summary card. Used identically in IssueNavBar and IssueCard.

import { AISummary } from '@/components/shared/AISummary'
import { Avatar } from '@/components/shared/Avatar'
import { DeptChain } from '@/components/shared/DeptChain'

export function IssueSummaryCard({
  title,
  sourceLine,
  aiSummary,
  metaLine,
  // Optional: board list context shown above title
  guest,
  room,
  elapsed,
  // Optional: chain footer (board only)
  assignee,
  severity,
  chainSteps,
  // Optional: IssueNavBar fallback when there is no originTicket
  contextHeader,
}) {
  const hasChainFooter = chainSteps?.length > 0

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

      {/* metaLine — standalone for IssueNavBar (no chain footer) */}
      {metaLine && !hasChainFooter && (
        <p className="px-3 pb-2" style={{ fontSize: 9, color: '#9ca3af' }}>
          {metaLine}
        </p>
      )}

      {/* Chain footer (board only) */}
      {hasChainFooter && (
        <div
          className="px-3 pb-3"
          style={{ borderTop: '1px solid #f3f4f6', paddingTop: 8, marginTop: 2 }}
        >
          {/* metaLine on its own line above chain */}
          {metaLine && (
            <p style={{ fontSize: 9, color: '#9ca3af', marginBottom: 6 }}>{metaLine}</p>
          )}

          {/* Chain left, assignee right */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <DeptChain steps={chainSteps} />
            {assignee && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 5, flexShrink: 0 }}>
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
                <span style={{ fontSize: 11, color: '#374151', fontWeight: 500 }}>
                  {assignee.name}
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
