function NavItem({ icon, label, active, onClick }) {
  return (
    <button
      className={`flex flex-col items-center gap-0.5 px-4 py-2 min-w-0 flex-1 ${active ? 'text-primary' : 'text-muted-foreground'}`}
      onClick={onClick}
    >
      <span className={`w-5 h-5 ${active ? 'text-primary' : 'text-muted-foreground'}`}>{icon}</span>
      <span className={`text-[10px] font-medium ${active ? 'text-primary' : 'text-muted-foreground'}`}>{label}</span>
      {active && <span className="w-4 h-0.5 bg-primary rounded-full" />}
    </button>
  )
}

const IssuesIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
  </svg>
)

const TeamsIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
)

const AIIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
      d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2h-2" />
  </svg>
)

// activeTab: 'issues' | 'teams' | 'ai'
export function BottomNav({ activeTab = 'issues', onTabChange }) {
  return (
    <div className="h-16 bg-white border-t border-border flex items-center justify-around shrink-0">
      <NavItem icon={<IssuesIcon />} label="Issues" active={activeTab === 'issues'} onClick={() => onTabChange?.('issues')} />
      <NavItem icon={<TeamsIcon />} label="Teams" active={activeTab === 'teams'} onClick={() => onTabChange?.('teams')} />
      <NavItem icon={<AIIcon />} label="AI Agent" active={activeTab === 'ai'} onClick={() => onTabChange?.('ai')} />
    </div>
  )
}
