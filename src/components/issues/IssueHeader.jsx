import { Badge } from '@/components/ui/badge'
import { Avatar } from '@/components/shared/Avatar'

export function IssueHeader({ commitment }) {
  return (
    <div className="bg-white border-b border-border px-4 py-3 shrink-0">
      {/* row 1: issue type + status badge */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold text-foreground">{commitment.issueType}</span>
        {commitment.severity === 'needs_decision' && (
          <Badge variant="destructive" className="text-[10px]">Decide</Badge>
        )}
        {commitment.severity === 'in_progress' && (
          <Badge className="text-[10px] bg-green-100 text-green-700 hover:bg-green-100 border-0">In Progress</Badge>
        )}
        {commitment.severity === 'resolved' && (
          <Badge variant="secondary" className="text-[10px]">Resolved</Badge>
        )}
      </div>

      {/* row 2: room + guest + elapsed */}
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm font-bold text-foreground">{commitment.room} · {commitment.guest}</p>
        <span className="text-xs text-muted-foreground">{commitment.elapsed}</span>
      </div>

      {/* row 3: assignee */}
      <div className="flex items-center gap-2">
        <Avatar
          initials={commitment.currentAssignee.initials}
          deptId={commitment.currentAssignee.deptId}
          status={commitment.severity === 'needs_decision' ? 'escalated' : 'active'}
          size="sm"
        />
        <div>
          <span className="text-xs font-medium text-foreground">{commitment.currentAssignee.name}</span>
          <span className="text[10px] text-muted-foreground ml-1.5">{commitment.currentAssignee.role}</span>
        </div>
      </div>
    </div>
  )
}
