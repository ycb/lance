import { Badge } from '@/components/ui/badge'

function HiltonLogo() {
  return (
    <div className="flex items-center gap-2">
      <div className="w-7 h-7 bg-primary rounded flex items-center justify-center shrink-0">
        <span className="text-primary-foreground font-bold text-sm tracking-tight">H</span>
      </div>
      <div>
        <p className="text-xs font-bold text-primary tracking-widest leading-none">HILTON</p>
        <p className="text-[9px] text-muted-foreground tracking-wide leading-none mt-0.5">THE GRAND</p>
      </div>
    </div>
  )
}

function AlertsBell({ hasAlert = false }) {
  return (
    <button className="relative p-1">
      <svg className="w-5 h-5 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
      {hasAlert && (
        <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-destructive rounded-full" />
      )}
    </button>
  )
}

// mode: 'board' | 'detail'
export function AppHeader({ mode = 'board', title, subtitle, severity, onBack, hasAlert = false }) {
  if (mode === 'board') {
    return (
      <div className="h-12 bg-white border-b border-border flex items-center justify-between px-4 shrink-0">
        <HiltonLogo />
        <AlertsBell hasAlert={hasAlert} />
      </div>
    )
  }

  return (
    <div className="h-12 bg-white border-b border-border flex items-center gap-3 px-4 shrink-0">
      <button
        className="text-primary text-sm font-medium shrink-0"
        onClick={onBack}
      >
        ← Board
      </button>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-foreground truncate">{title}</p>
        {subtitle && <p className="text-xs text-muted-foreground truncate">{subtitle}</p>}
      </div>
      {severity === 'needs_decision' && (
        <Badge variant="destructive" className="shrink-0 text-xs">Decide</Badge>
      )}
      {severity === 'in_progress' && (
        <Badge className="shrink-0 text-xs bg-green-100 text-green-700 hover:bg-green-100">In Progress</Badge>
      )}
    </div>
  )
}
