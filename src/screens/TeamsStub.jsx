import { DEPARTMENTS } from '@/data/scenario'

export function TeamsStub() {
  return (
    <div className="h-full flex flex-col bg-background">
      <div className="px-4 py-3 border-b border-border">
        <h2 className="text-base font-bold text-foreground">Teams On Shift</h2>
        <p className="text-xs text-muted-foreground">Morning shift · 110 staff on property</p>
      </div>
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2">
        {DEPARTMENTS.map(dept => (
          <div key={dept.id} className="flex items-center justify-between px-4 py-3 bg-white rounded-lg border border-border">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: dept.color }} />
              <p className="text-sm font-medium text-foreground">{dept.label}</p>
            </div>
            <span className="text-xs font-semibold text-muted-foreground">{dept.count}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
