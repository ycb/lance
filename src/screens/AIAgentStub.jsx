export function AIAgentStub() {
  return (
    <div className="h-full flex flex-col bg-background">
      <div className="px-4 py-3 border-b border-border">
        <h2 className="text-base font-bold text-foreground">AI Agent</h2>
        <p className="text-xs text-muted-foreground">Ask anything about operations, SOPs, or guest history</p>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4">
        {/* example Q&A */}
        <div className="flex justify-end mb-4">
          <div className="bg-primary text-primary-foreground rounded-2xl rounded-tr-sm px-4 py-2.5 max-w-[78%]">
            <p className="text-sm">What's the SOP for a cabana request?</p>
          </div>
        </div>

        <div className="flex gap-3 mb-4">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shrink-0 mt-0.5">
            <span className="text-primary-foreground font-bold text-xs">AI</span>
          </div>
          <div className="flex-1 bg-muted rounded-2xl rounded-tl-sm px-4 py-3">
            <p className="text-sm font-semibold text-foreground mb-1.5">Cabana Package SOP</p>
            <div className="space-y-1">
              {[
                'Recreation assigns lead staff to setup',
                'Standard: 4 chairs, umbrella, 4 waters per guest',
                'F&B notified for poolside service availability',
                'Housekeeping on standby for extra linens',
                'Target: ready 30 min before requested time',
              ].map((item, i) => (
                <div key={i} className="flex gap-2">
                  <span className="text-xs text-muted-foreground shrink-0">{i + 1}.</span>
                  <p className="text-xs text-muted-foreground">{item}</p>
                </div>
              ))}
            </div>
            <p className="text-[10px] text-muted-foreground/70 mt-2">Source: Cabana SOP v2.3 · Last updated Jan 2026</p>
          </div>
        </div>
      </div>

      <div className="px-4 pb-4">
        <div className="flex gap-2 border border-border rounded-xl px-4 py-3 bg-white">
          <p className="flex-1 text-sm text-muted-foreground">Ask about SOPs, occupancy, VIP guests...</p>
          <button className="text-primary">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
