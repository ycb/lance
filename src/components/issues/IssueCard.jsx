import { Avatar } from '@/components/shared/Avatar'
import { AISummary } from '@/components/shared/AISummary'
import { Badge } from '@/components/ui/badge'

function shortDate(date) {
  return date?.replace(/, \d{4}$/, '') ?? ''
}

function stepIndicator(chainSteps, severity) {
  if (!chainSteps?.length || severity === 'resolved') return null
  const total = chainSteps.length
  const activeIdx = chainSteps.findIndex(s => s.status === 'active' || s.status === 'escalated')
  const step = activeIdx >= 0 ? activeIdx + 1 : total
  return `Step ${step} of ${total}`
}

export function IssueCard({ commitment, onClick }) {
  const isResolved = commitment.severity === 'resolved'
  const indicator  = stepIndicator(commitment.chainSteps, commitment.severity)
  const title      = commitment.originTicket?.title ?? commitment.summary
  const sourceLine = commitment.originTicket
    ? `${commitment.originTicket.source} · ${commitment.originTicket.channel} · ${commitment.originTicket.time} · ${shortDate(commitment.originTicket.date)}`
    : null

  return (
    <button
      className={`w-full text-left mb-3 ${isResolved ? 'opacity-55' : ''}`}
      onClick={onClick}
      disabled={isResolved}
    >
      <div
        style={{
          background: 'white',
          border: '1px solid #e5e7eb',
          borderRadius: 10,
          boxShadow: '0 1px 2px rgba(17, 24, 39, 0.05)',
          overflow: 'hidden',
        }}
      >
        <div style={{ padding: '12px 14px' }}>
          {/* Guest · Room + elapsed */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
            <span style={{ fontSize: 11, color: '#6b7280' }}>
              {commitment.guest} · {commitment.room}
            </span>
            <span style={{ fontSize: 11, color: '#9ca3af' }}>{commitment.elapsed}</span>
          </div>

          {/* Title */}
          <p style={{ fontSize: 13, fontWeight: 700, color: '#111827', marginBottom: sourceLine ? 2 : 8, lineHeight: 1.3 }}>
            {title}
          </p>

          {/* Source line */}
          {sourceLine && (
            <p style={{ fontSize: 9, color: '#9ca3af', marginBottom: 8 }}>{sourceLine}</p>
          )}

          {/* AI Summary */}
          {commitment.aiSummary && (
            <div style={{ marginBottom: 8 }}>
              <AISummary
                variant="badge"
                text={commitment.aiSummary}
                escalationReason={commitment.escalationReason}
              />
            </div>
          )}

          {/* Linked ticket footer */}
          {commitment.linkedTicket && (
            <p style={{ fontSize: 9, color: '#9ca3af', marginBottom: 8 }}>
              Linked to {commitment.linkedTicket.id}
            </p>
          )}

          {/* Assignee row */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Avatar
                initials={commitment.currentAssignee.initials}
                deptId={commitment.currentAssignee.deptId}
                status={
                  commitment.severity === 'needs_decision' ? 'escalated'
                  : commitment.severity === 'resolved'     ? 'complete'
                  : 'active'
                }
                size="sm"
              />
              <span style={{ fontSize: 12, color: '#6b7280' }}>{commitment.currentAssignee.name}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              {indicator && (
                <span style={{ fontSize: 10, color: '#9ca3af' }}>{indicator}</span>
              )}
              {commitment.severity === 'needs_decision' && (
                <Badge variant="destructive" className="text-[10px] px-1.5 py-0">Decide</Badge>
              )}
            </div>
          </div>
        </div>
      </div>
    </button>
  )
}
