import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useDemoFlow } from '@/store/demoFlow'
import { AppHeader } from '@/components/layout/AppHeader'
import { BottomNav } from '@/components/layout/BottomNav'
import { IssueCard } from '@/components/issues/IssueCard'
import { IssueFilters } from '@/components/issues/IssueFilters'
import { TeamsStub } from './TeamsStub'
import { AIAgentStub } from './AIAgentStub'
import { commitments, DEPT } from '@/data/scenario'

// ─── Extra demo cards (non-interactive, display only) ────────────────────────

const EXTRA_CARDS = [
  {
    id: 'ex1',
    severity: 'needs_decision',
    guest: 'Michael Park',
    room: 'Rm 1204',
    elapsed: '1h 12m',
    originTicket: {
      title: 'Suite upgrade not honored at check-in',
      source: 'AI-created', channel: 'Front Desk', time: '8:22 AM', date: 'May 18, 2026',
    },
    aiSummary: 'Guest booked suite upgrade via app but was assigned a standard room due to inventory error. Requesting original booking be honored or equivalent compensation.',
    currentAssignee: { initials: 'SM', deptId: 'SUP', name: 'Sarah M.' },
    chainSteps: [
      { id: 'ex1s1', deptId: 'FD', status: 'complete' },
      { id: 'ex1s2', deptId: 'SUP', status: 'escalated' },
    ],
  },
  {
    id: 'ex2',
    severity: 'needs_decision',
    guest: 'Priya Nair',
    room: 'Rm 3308',
    elapsed: '2h 5m',
    originTicket: {
      title: 'Noise complaint — adjacent room unresolved',
      source: 'AI-created', channel: 'Phone', time: '7:45 AM', date: 'May 18, 2026',
    },
    aiSummary: 'Repeat noise complaint from Rm 3308. Security visited twice with no resolution. Guest requesting room change or compensation for disrupted sleep.',
    currentAssignee: { initials: 'SM', deptId: 'SUP', name: 'Sarah M.' },
    chainSteps: [
      { id: 'ex2s1', deptId: 'SEC', status: 'complete' },
      { id: 'ex2s2', deptId: 'FD', status: 'complete' },
      { id: 'ex2s3', deptId: 'SUP', status: 'escalated' },
    ],
  },
  {
    id: 'ex3',
    severity: 'needs_decision',
    guest: 'David Kim',
    room: 'Rm 812',
    elapsed: '38m',
    originTicket: {
      title: 'Billing dispute — minibar charges denied',
      source: 'AI-created', channel: 'App', time: '9:18 AM', date: 'May 18, 2026',
    },
    aiSummary: 'Guest disputing $84 minibar charge, states items were not consumed. No photo evidence from housekeeping on record. Charge reversal requires supervisor approval.',
    currentAssignee: { initials: 'SM', deptId: 'SUP', name: 'Sarah M.' },
    chainSteps: [
      { id: 'ex3s1', deptId: 'HK', status: 'complete' },
      { id: 'ex3s2', deptId: 'FD', status: 'complete' },
      { id: 'ex3s3', deptId: 'SUP', status: 'escalated' },
    ],
  },
  {
    id: 'ex4',
    severity: 'in_progress',
    guest: 'Sarah Johnson',
    room: 'Rm 2201',
    elapsed: '22m',
    summary: 'Rollaway bed requested for family room',
    aiSummary: 'Family of 4 in standard double room requesting rollaway bed for child. Housekeeping assigned and en route with estimated 10-minute arrival.',
    currentAssignee: { initials: 'MH', deptId: 'HK', name: 'Maria H.' },
    chainSteps: [
      { id: 'ex4s1', deptId: 'FD', status: 'complete' },
      { id: 'ex4s2', deptId: 'HK', status: 'active' },
    ],
  },
  {
    id: 'ex5',
    severity: 'resolved',
    guest: 'Tom Walsh',
    room: 'Rm 505',
    elapsed: '1h ago',
    summary: 'Late checkout approved through 2pm',
    aiSummary: 'Guest requested late checkout to 2pm. Housekeeping schedule confirmed capacity. Approved and noted in Opera. No further action required.',
    currentAssignee: { initials: 'FD', deptId: 'FD', name: 'Front Desk' },
    chainSteps: [
      { id: 'ex5s1', deptId: 'FD', status: 'complete' },
    ],
  },
]

// Realistic display counts for the tab bar (overrides computed counts)
const DISPLAY_COUNTS = { critical: 5, 'in-progress': 24, resolved: 47 }

// ─── Ghost placeholder card ──────────────────────────────────────────────────

function GhostCard({ index }) {
  return (
    <div
      style={{
        background: '#f3f4f6',
        border: '1px solid #e5e7eb',
        borderRadius: 10,
        height: index % 2 === 0 ? 96 : 80,
        marginBottom: 12,
        opacity: 0.55,
      }}
    />
  )
}

// ─── Search + filter bar ─────────────────────────────────────────────────────

const SORT_OPTIONS = ['Severity', 'Elapsed']

function SearchFilterBar() {
  const [filterOpen, setFilterOpen] = useState(false)
  const [activeSort, setActiveSort] = useState('Severity')
  const [activeDepts, setActiveDepts] = useState([])

  const toggleDept = (id) =>
    setActiveDepts(prev => prev.includes(id) ? prev.filter(d => d !== id) : [...prev, id])

  return (
    <div style={{ background: 'white', borderBottom: '1px solid #e5e7eb', padding: '8px 12px' }}>
      {/* Row: search + filter button */}
      <div style={{ display: 'flex', gap: 8 }}>
        <div style={{
          flex: 1, display: 'flex', alignItems: 'center', gap: 6,
          background: '#f3f4f6', borderRadius: 8, padding: '7px 10px',
        }}>
          <svg width="13" height="13" viewBox="0 0 20 20" fill="none" stroke="#9ca3af" strokeWidth="2">
            <circle cx="8.5" cy="8.5" r="5.5" /><path d="M15 15l-3-3" strokeLinecap="round" />
          </svg>
          <input
            placeholder="Search guests, rooms, issues…"
            style={{ flex: 1, border: 'none', background: 'transparent', fontSize: 12, outline: 'none', color: '#374151' }}
          />
        </div>
        <button
          onClick={() => setFilterOpen(o => !o)}
          style={{
            display: 'flex', alignItems: 'center', gap: 5,
            padding: '7px 12px', borderRadius: 8,
            border: '1px solid ' + (filterOpen ? '#3363AC' : '#e5e7eb'),
            background: filterOpen ? '#eff6ff' : 'white',
            fontSize: 12, fontWeight: 600,
            color: filterOpen ? '#3363AC' : '#374151',
            cursor: 'pointer',
          }}
        >
          <svg width="13" height="13" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 5h14M6 10h8M9 15h2" strokeLinecap="round" />
          </svg>
          Filter
          <span style={{ fontSize: 9, marginTop: 1 }}>{filterOpen ? '▲' : '▼'}</span>
        </button>
      </div>

      {/* Filter panel */}
      <AnimatePresence>
        {filterOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.15 }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{ paddingTop: 12 }}>
              {/* Sort */}
              <p style={{ fontSize: 10, fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 6 }}>
                Sort by
              </p>
              <div style={{ display: 'flex', gap: 6, marginBottom: 12 }}>
                {SORT_OPTIONS.map(opt => (
                  <button
                    key={opt}
                    onClick={() => setActiveSort(opt)}
                    style={{
                      padding: '4px 12px', borderRadius: 999, fontSize: 11, fontWeight: 500, cursor: 'pointer',
                      border: '1px solid ' + (activeSort === opt ? '#002E5A' : '#e5e7eb'),
                      background: activeSort === opt ? '#002E5A' : 'white',
                      color: activeSort === opt ? 'white' : '#374151',
                    }}
                  >
                    {opt}
                  </button>
                ))}
              </div>

              {/* Department */}
              <p style={{ fontSize: 10, fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 6 }}>
                Department
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {Object.values(DEPT).map(d => {
                  const active = activeDepts.includes(d.id)
                  return (
                    <button
                      key={d.id}
                      onClick={() => toggleDept(d.id)}
                      style={{
                        padding: '4px 12px', borderRadius: 999, fontSize: 11, fontWeight: 500, cursor: 'pointer',
                        border: '1px solid ' + (active ? d.color : '#e5e7eb'),
                        background: active ? d.color : 'white',
                        color: active ? 'white' : '#374151',
                      }}
                    >
                      {d.label}
                    </button>
                  )
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── Main board ──────────────────────────────────────────────────────────────

function filterCommitments(all, filter) {
  if (filter === 'all') return all
  if (filter === 'critical') return all.filter(c => c.severity === 'needs_decision')
  if (filter === 'in-progress') return all.filter(c => c.severity === 'in_progress')
  if (filter === 'resolved') return all.filter(c => c.severity === 'resolved')
  return all
}

export function DeliveryBoard() {
  const { advance, goTo, compResolved, boardFilter, setBoardFilter } = useDemoFlow()
  const [activeTab, setActiveTab] = useState('issues')
  const filter = boardFilter
  const setFilter = setBoardFilter

  const acCard = compResolved ? {
    ...commitments.acComp,
    severity: 'resolved',
    stepLabel: 'Comp authorized · $195',
    currentAssignee: { initials: 'SM', deptId: 'SUP', name: 'Sarah M.', role: 'Supervisor' },
    chainSteps: commitments.acComp.chainSteps.map(s =>
      s.status === 'escalated' ? { ...s, status: 'complete' } : s
    ),
  } : commitments.acComp

  const coreIssues  = [acCard, commitments.cabana, commitments.stayExtension]
  const filteredCore  = filterCommitments(coreIssues, filter)
  const filteredExtra = filterCommitments(EXTRA_CARDS, filter)
  const allFiltered   = [...filteredCore, ...filteredExtra]

  const displayCount = DISPLAY_COUNTS[filter] ?? allFiltered.length
  const ghostCount   = Math.max(0, displayCount - allFiltered.length)
  const visibleGhosts = Math.min(ghostCount, 3)

  return (
    <div className="h-full flex flex-col bg-muted/30">
      <AppHeader />

      {activeTab === 'issues' && (
        <>
          <IssueFilters value={filter} onChange={setFilter} counts={DISPLAY_COUNTS} />
          <SearchFilterBar />
          <motion.div
            className="flex-1 overflow-y-auto px-4 pt-4 pb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            {allFiltered.length === 0 && visibleGhosts === 0 && (
              <p className="text-sm text-muted-foreground text-center mt-8">No issues in this category</p>
            )}
            {filteredCore.map(commitment => (
              <IssueCard
                key={commitment.id}
                commitment={commitment}
                onClick={
                  commitment.id === 'cabana'   ? advance :
                  commitment.id === 'ac_comp'  ? () => goTo('ISSUE_DETAIL_COMP') :
                  undefined
                }
              />
            ))}
            {filteredExtra.map(commitment => (
              <IssueCard
                key={commitment.id}
                commitment={commitment}
                onClick={undefined}
              />
            ))}
            {Array.from({ length: visibleGhosts }).map((_, i) => (
              <GhostCard key={`ghost-${i}`} index={i} />
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
