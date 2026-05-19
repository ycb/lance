import { useState } from 'react'
import { motion } from 'framer-motion'
import { useDemoFlow } from '@/store/demoFlow'
import { AppHeader } from '@/components/layout/AppHeader'
import { BottomNav } from '@/components/layout/BottomNav'
import { IssueCard } from '@/components/issues/IssueCard'
import { IssueFilters } from '@/components/issues/IssueFilters'
import { TeamsStub } from './TeamsStub'
import { AIAgentStub } from './AIAgentStub'
import { commitments } from '@/data/scenario'

function filterCommitments(all, filter) {
  if (filter === 'all') return all
  if (filter === 'critical') return all.filter(c => c.severity === 'needs_decision')
  if (filter === 'in-progress') return all.filter(c => c.severity === 'in_progress')
  if (filter === 'resolved') return all.filter(c => c.severity === 'resolved')
  return all
}

export function DeliveryBoard() {
  const { advance, currentIndex } = useDemoFlow()
  const [activeTab, setActiveTab] = useState('issues')
  const [filter, setFilter] = useState('all')

  // After index 2 (BOARD state), comp is already resolved
  const acCard = currentIndex >= 2 ? {
    ...commitments.acComp,
    severity: 'resolved',
    stepLabel: 'Comp authorized · $195',
    currentAssignee: { initials: 'FD', deptId: 'FD', name: 'Front Desk', role: 'Guest Services' },
    chainSteps: commitments.acComp.chainSteps.map(s =>
      s.status === 'escalated' ? { ...s, status: 'complete' } : s
    ),
  } : commitments.acComp

  const allIssues = [acCard, commitments.cabana, commitments.stayExtension]
  const filtered = filterCommitments(allIssues, filter)

  return (
    <div className="h-full flex flex-col bg-muted/30">
      <AppHeader mode="board" hasAlert={currentIndex < 2} />

      {activeTab === 'issues' && (
        <>
          <div className="flex items-center justify-around px-4 py-2 bg-background border-b border-border">
            {[
              { label: 'Today', value: 5 },
              { label: 'Critical', value: 1 },
              { label: 'In Progress', value: 1 },
              { label: 'Resolved', value: 3 },
            ].map(({ label, value }) => (
              <div key={label} className="flex items-center gap-1">
                <span className="text-sm font-semibold text-foreground">{value}</span>
                <span className="text-xs text-muted-foreground">{label}</span>
              </div>
            ))}
          </div>
          <IssueFilters value={filter} onChange={setFilter} />
          <motion.div
            className="flex-1 overflow-y-auto px-4 pt-4 pb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            {filtered.length === 0 && (
              <p className="text-sm text-muted-foreground text-center mt-8">No issues in this category</p>
            )}
            {filtered.map(commitment => (
              <IssueCard
                key={commitment.id}
                commitment={commitment}
                onClick={commitment.id === 'cabana' ? advance : undefined}
              />
            ))}
          </motion.div>
        </>
      )}

      {activeTab === 'teams' && (
        <div className="flex-1 overflow-hidden">
          <TeamsStub />
        </div>
      )}

      {activeTab === 'ai' && (
        <div className="flex-1 overflow-hidden">
          <AIAgentStub />
        </div>
      )}

      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  )
}
