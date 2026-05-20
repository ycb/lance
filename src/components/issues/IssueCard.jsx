import { IssueSummaryCard } from '@/components/shared/IssueSummaryCard'

function shortDate(date) {
  return date?.replace(/, \d{4}$/, '') ?? ''
}

function getStepIndicator(chainSteps, severity) {
  if (!chainSteps?.length || severity === 'resolved') return null
  const total = chainSteps.length
  const activeIdx = chainSteps.findIndex(s => s.status === 'active' || s.status === 'escalated')
  const step = activeIdx >= 0 ? activeIdx + 1 : total
  return `Step ${step} of ${total}`
}

export function IssueCard({ commitment, onClick }) {
  const isResolved = commitment.severity === 'resolved'
  const title      = commitment.originTicket?.title ?? commitment.summary
  const sourceLine = commitment.originTicket
    ? `${commitment.originTicket.source} · ${commitment.originTicket.channel} · ${commitment.originTicket.time} · ${shortDate(commitment.originTicket.date)}`
    : null
  const metaLine   = commitment.linkedTicket ? `Linked to ${commitment.linkedTicket.id}` : null
  const indicator  = getStepIndicator(commitment.chainSteps, commitment.severity)

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
        stepIndicator={indicator}
      />
    </button>
  )
}
