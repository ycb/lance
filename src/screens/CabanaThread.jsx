import { motion } from 'framer-motion'
import { useDemoFlow } from '../store/demoFlow'
import { Avatar } from '../components/Avatar'
import { commitments } from '../data/scenario'

export function CabanaThread() {
  const { advance } = useDemoFlow()
  const { thread } = commitments.cabana

  return (
    <motion.div
      className="h-full flex flex-col bg-white"
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      transition={{ type: 'spring', damping: 28, stiffness: 280 }}
    >
      {/* nav */}
      <div className="flex items-center gap-3 px-4 pt-4 pb-3 border-b border-gray-100">
        <button className="text-blue-500 text-sm font-medium">← Board</button>
        <div className="flex-1">
          <p className="text-sm font-semibold text-gray-900">Cabana 3 Setup</p>
          <p className="text-xs text-gray-400">Alex Chen · Rm 412 · 18 min ago</p>
        </div>
        <span className="text-xs bg-green-100 text-green-700 font-semibold px-2 py-0.5 rounded-full">In Progress</span>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {/* step 1 - Jordan complete */}
        <div className="flex gap-3">
          <div className="flex flex-col items-center">
            <Avatar initials="JR" deptId="RW" status="complete" size="md" />
            <div className="w-px flex-1 bg-gray-100 mt-2" />
          </div>
          <div className="flex-1 pb-4">
            <div className="flex items-center gap-2">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Jordan R. — Recreation</p>
              <span className="text-xs text-gray-300">12 min ago</span>
            </div>
            <p className="text-sm text-gray-900 mt-0.5">Cabana 3 setup complete</p>
            <p className="text-xs text-gray-500 mt-1 italic">"{thread.jordanNote}"</p>
            {/* simulated photo */}
            <div className="mt-3 rounded-xl overflow-hidden bg-teal-100 h-36 flex items-center justify-center">
              <div className="text-center">
                <div className="text-3xl mb-1">🏖️</div>
                <p className="text-xs text-teal-700 font-medium">Cabana 3 — ready</p>
                <p className="text-xs text-teal-500">4 chairs · umbrella · 8 waters</p>
              </div>
            </div>
          </div>
        </div>

        {/* step 2 - Maria active */}
        <div className="flex gap-3">
          <div className="flex flex-col items-center">
            <Avatar initials="MH" deptId="HK" status="active" size="md" />
            <div className="w-px flex-1 bg-gray-100 mt-2" />
          </div>
          <div className="flex-1 pb-4">
            <div className="flex items-center gap-2">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Maria H. — Housekeeping</p>
              <span className="text-xs text-green-500 font-medium">Active</span>
            </div>
            <p className="text-sm text-gray-900 mt-0.5">Deliver extra towels to pool level</p>
            <p className="text-xs text-gray-500 mt-1">"{thread.mariaStatus}"</p>
          </div>
        </div>

        {/* F&B notification */}
        <div className="bg-amber-50 rounded-xl px-4 py-3">
          <p className="text-xs font-semibold text-amber-700 mb-1">F&B Notified</p>
          <p className="text-xs text-amber-800">{thread.fbNote}</p>
        </div>

        {/* tap to go to staff view */}
        <button
          className="w-full py-3.5 border-2 border-gray-900 text-gray-900 rounded-xl font-semibold text-sm"
          onClick={advance}
        >
          View Maria's Task
        </button>
      </div>
    </motion.div>
  )
}
