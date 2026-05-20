import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar } from '@/components/shared/Avatar'

const BORDER = {
  needs_decision: 'border-l-4 border-l-destructive',
  in_progress:    'border-l-4 border-l-green-500',
  resolved:       'border-l-4 border-l-border',
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

  return (
    <button
      className={`w-full text-left mb-3 ${isResolved ? 'opacity-55' : ''}`}
      onClick={onClick}
      disabled={isResolved}
    >
      <Card className={`${BORDER[commitment.severity]} shadow-sm`}>
        <CardContent className="px-4 py-3">
          {/* top row: badge + elapsed */}
          <div className="flex items-center justify-between mb-1.5">
            <Badge
              variant={commitment.severity === 'needs_decision' ? 'destructive' : 'secondary'}
              className="text-[10px] px-1.5 py-0"
            >
              {commitment.issueType}
            </Badge>
            <span className="text-[11px] text-muted-foreground">{commitment.elapsed}</span>
          </div>

          {/* room + guest */}
          <p className="text-xs text-muted-foreground">
            <span>{commitment.room}</span>
            <span> · </span>
            <span>{commitment.guest}</span>
          </p>

          {/* summary */}
          <p className="text-sm font-semibold text-foreground mt-0.5 leading-snug">
            {commitment.summary}
          </p>

          {/* assignee row */}
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-1.5">
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
              <span className="text-xs text-muted-foreground">{commitment.currentAssignee.name}</span>
            </div>
            <div className="flex items-center gap-2">
              {indicator && (
                <span className="text-[10px] text-muted-foreground">{indicator}</span>
              )}
              {commitment.severity === 'needs_decision' && (
                <Badge variant="destructive" className="text-[10px] px-1.5 py-0">Decide</Badge>
              )}
              {commitment.severity === 'in_progress' && (
                <Badge className="text-[10px] px-1.5 py-0 bg-green-100 text-green-700 hover:bg-green-100 border-0">
                  In Progress
                </Badge>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </button>
  )
}
