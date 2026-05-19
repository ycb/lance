import { motion } from 'framer-motion'
import { useDemoFlow } from '@/store/demoFlow'
import { AppHeader } from '@/components/layout/AppHeader'
import { BottomNav } from '@/components/layout/BottomNav'
import { IssueCard } from '@/components/issues/IssueCard'
import { commitments } from '@/data/scenario'

const resolvedCabana = {
  ...commitments.cabana,
  severity: 'resolved',
  stepLabel: 'All steps complete · just now',
  currentAssignee: { initials: 'MH', deptId: 'HK', name: 'Maria H.', role: 'Housekeeping' },
  chainSteps: commitments.cabana.chainSteps.map(s => ({ ...s, status: 'complete' })),
}

const resolvedComp = {
  ...commitments.acComp,
  severity: 'resolved',
  stepLabel: 'Comp authorized · $195 · 12 min ago',
  currentAssignee: { initials: 'FD', deptId: 'FD', name: 'Front Desk', role: 'Guest Services' },
  chainSteps: commitments.acComp.chainSteps.map(s =>
    s.status === 'escalated' ? { ...s, status: 'complete' } : s
  ),
}

export function BoardResolved() {
  const { reset } = useDemoFlow()

  return (
    <div className="h-full flex flex-col bg-muted/30">
      <AppHeader />

      <motion.div
        className="flex-1 overflow-y-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* 3/3 banner */}
        <motion.div
          className="mx-4 mt-4 mb-2 bg-green-500 rounded-xl px-4 py-3.5 flex items-center gap-3"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <div className="w-8 h-8 rounded-full bg-white/25 flex items-center justify-center text-white font-bold text-sm shrink-0">✓</div>
          <div>
            <p className="text-sm font-bold text-white">3/3 promises kept this shift</p>
            <p className="text-xs text-green-100">Lance has notified Alex Chen and Room 408</p>
          </div>
        </motion.div>

        <div className="px-4 pt-2 pb-4">
          <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-1">Resolved This Shift</p>
          <IssueCard commitment={commitments.stayExtension} onClick={() => {}} />
          <IssueCard commitment={resolvedCabana} onClick={() => {}} />
          <IssueCard commitment={resolvedComp} onClick={() => {}} />
        </div>
      </motion.div>

      <div className="px-4 pb-2 pt-2 border-t border-border bg-white shrink-0">
        <button className="w-full py-2 text-xs text-muted-foreground font-medium" onClick={reset}>
          ↺ Replay demo
        </button>
      </div>

      <BottomNav activeTab="issues" />
    </div>
  )
}
