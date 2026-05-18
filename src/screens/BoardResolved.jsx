import { motion } from 'framer-motion'
import { useDemoFlow } from '../store/demoFlow'
import { CommitmentCard } from '../components/CommitmentCard'
import { TeamStrip } from '../components/TeamStrip'
import { commitments } from '../data/scenario'

const resolvedCabana = {
  ...commitments.cabana,
  severity: 'resolved',
  stepLabel: 'All steps complete · just now',
  chainSteps: commitments.cabana.chainSteps.map(s => ({ ...s, status: 'complete' })),
}

const resolvedComp = {
  ...commitments.acComp,
  severity: 'resolved',
  stepLabel: 'Comp authorized · $195 · 12 min ago',
  chainSteps: commitments.acComp.chainSteps.map(s =>
    s.status === 'escalated' ? { ...s, status: 'complete' } : s
  ),
}

export function BoardResolved() {
  const { reset } = useDemoFlow()

  return (
    <motion.div
      className="h-full flex flex-col bg-gray-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* header */}
      <div className="bg-white px-4 pt-3 pb-4 shadow-sm">
        <div className="flex items-center justify-between mb-1">
          <p className="text-xs text-gray-400">The Grand Hilton · Morning Shift</p>
          <p className="text-xs text-gray-400">10:14 AM</p>
        </div>
        <h1 className="text-lg font-bold text-gray-900">Delivery Board</h1>
        <p className="text-xs text-gray-500">Jordan S., Shift Supervisor</p>
      </div>

      {/* team strip */}
      <div className="py-3 bg-white border-b border-gray-100">
        <TeamStrip />
      </div>

      {/* 3/3 banner */}
      <motion.div
        className="mx-4 mt-4 bg-green-500 rounded-xl px-4 py-3.5 flex items-center gap-3"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-lg">✓</div>
        <div>
          <p className="text-sm font-bold text-white">3/3 promises kept</p>
          <p className="text-xs text-green-100">Lance has notified Alex Chen and Room 408</p>
        </div>
      </motion.div>

      {/* resolved cards */}
      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-6">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-1">
          Resolved This Shift
        </p>
        <CommitmentCard commitment={commitments.stayExtension} onClick={() => {}} />
        <CommitmentCard commitment={resolvedCabana} onClick={() => {}} />
        <CommitmentCard commitment={resolvedComp} onClick={() => {}} />
      </div>

      {/* reset for demo replay */}
      <div className="px-4 pb-8 pt-3 border-t border-gray-100 bg-white">
        <button
          className="w-full py-3 text-xs text-gray-400 font-medium"
          onClick={reset}
        >
          ↺ Replay demo
        </button>
      </div>
    </motion.div>
  )
}
