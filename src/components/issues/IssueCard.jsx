import { IssueSummaryCard } from '@/components/shared/IssueSummaryCard'

function shortDate(date) {
  return date?.replace(/, \d{4}$/, '') ?? ''
}

export function IssueCard({ commitment, onClick }) {
  const isResolved = commitment.severity === 'resolved'
  const title      = commitment.originTicket?.title ?? commitment.summary
  const sourceLine = commitment.originTicket
    ? `${commitment.originTicket.source} · ${commitment.originTicket.channel} · ${commitment.originTicket.time} · ${shortDate(commitment.originTicket.date)}`
    : null
  const metaLine   = commitment.linkedTicket ? `Linked to ${commitment.linkedTicket.id}` : null

  return (
    <button
      className={`w-full text-left mb-3 ${isResolved ? 'opacity-55' : ''}`}
      onClick={onClick}
      disabled={isResolved}
    >
      <IssueSummaryCard
        title={title}
        sourceLine={sourceLine}
        aiSummary={commitment.aiSummary}
        metaLine={metaLine}
        guest={commitment.guest}
        room={commitment.room}
        elapsed={commitment.elapsed}
        assignee={commitment.currentAssignee}
        severity={commitment.severity}
        chainSteps={commitment.chainSteps}
      />
    </button>
  )
}
