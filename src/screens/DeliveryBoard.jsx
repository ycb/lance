import { motion } from 'framer-motion'
import { useDemoFlow } from '../store/demoFlow'
import { CommitmentCard } from '../components/CommitmentCard'
import { TeamStrip } from '../components/TeamStrip'
import { commitments } from '../data/scenario'

// variant: 'initial' | 'comp_resolved'
export function DeliveryBoard({ variant = 'initial' }) {
  const { advance } = useDemoFlow()

  const acCard = variant === 'initial' ? commitments.acComp : {
    ...commitments.acComp,
    severity: 'resolved',
    stepLabel: 'Comp authorized · $195 · 0 min ago',
    chainSteps: commitments.acComp.chainSteps.map(s =>
      s.status === 'escalated' ? { ...s, status: 'complete' } : s
    ),
  }

  return (
    <motion.div
      className="h-full flex flex-col bg-gray-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25 }}
    >
      {/* header */}
      <div className="bg-white px-4 pt-3 pb-4 shadow-sm">
        <div className="flex items-center justify-between mb-1">
          <p className="text-xs text-gray-400">The Grand Hilton · Morning Shift</p>
          <p className="text-xs text-gray-400">9:41 AM</p>
        </div>
        <h1 className="text-lg font-bold text-gray-900">Delivery Board</h1>
        <p className="text-xs text-gray-500">Jordan S., Shift Supervisor</p>
      </div>

      {/* team strip */}
      <div className="py-3 bg-white border-b border-gray-100">
        <TeamStrip />
      </div>

      {/* commitment feed */}
      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-6">

        {/* needs decision */}
        {variant === 'initial' && (
          <div className="mb-5">
            <p className="text-xs font-semibold text-red-500 uppercase tracking-wider mb-2 px-1">
              Needs Your Decision
            </p>
            <CommitmentCard commitment={acCard} onClick={advance} />
          </div>
        )}

        {/* in progress */}
        <div className="mb-5">
          <p className="text-xs font-semibold text-green-600 uppercase tracking-wider mb-2 px-1">
            In Progress
          </p>
          <CommitmentCard
            commitment={commitments.cabana}
            onClick={variant === 'comp_resolved' ? advance : undefined}
          />
        </div>

        {/* resolved */}
        <div>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-1">
            Resolved This Shift
          </p>
          <CommitmentCard commitment={commitments.stayExtension} onClick={() => {}} />
          {variant === 'comp_resolved' && (
            <CommitmentCard commitment={acCard} onClick={() => {}} />
          )}
        </div>
      </div>
    </motion.div>
  )
}
