import { motion } from 'framer-motion'
import { useDemoFlow } from '../store/demoFlow'

// variant: 'idle' | 'complete'
export function StaffView({ variant = 'idle' }) {
  const { advance } = useDemoFlow()
  const isComplete = variant === 'complete'

  return (
    <motion.div
      className="h-full flex flex-col bg-white"
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      transition={{ type: 'spring', damping: 28, stiffness: 280 }}
    >
      {/* staff header */}
      <div className="bg-purple-600 px-4 pt-4 pb-5">
        <p className="text-xs text-purple-200 font-medium">Maria H. · Housekeeping</p>
        <h2 className="text-lg font-bold text-white mt-0.5">My Task</h2>
        <p className="text-xs text-purple-200 mt-1">Step 2 of 2 · Cabana setup chain</p>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-5 space-y-4">
        {/* task card */}
        <div className="bg-gray-50 rounded-xl px-4 py-4">
          <p className="text-base font-semibold text-gray-900">Extra towels — Pool Level, Cabana 3</p>
          <p className="text-xs text-gray-500 mt-1">By 4:00 PM · From Lance via guest request</p>
          <p className="text-xs text-gray-500 mt-1 italic">"Guest hosting 8 people. Jordan R. has set up the cabana."</p>
        </div>

        {/* checklist */}
        <div className="space-y-2">
          {[
            'Collect extra towels from supply closet',
            'Deliver to Pool Level, Cabana 3',
            'Confirm with cabana guest',
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 px-4 py-3 bg-white rounded-xl border border-gray-100">
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${isComplete ? 'bg-green-500 border-green-500' : 'border-gray-300'}`}>
                {isComplete && (
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                  </svg>
                )}
              </div>
              <p className={`text-sm ${isComplete ? 'text-gray-400 line-through' : 'text-gray-700'}`}>{item}</p>
            </div>
          ))}
        </div>

        {/* photo area */}
        {isComplete && (
          <motion.div
            className="bg-purple-50 rounded-xl h-40 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="text-center">
              <div className="text-3xl mb-1">🛁</div>
              <p className="text-xs text-purple-700 font-medium">Towels delivered</p>
              <p className="text-xs text-purple-500">Cabana 3 · 3:52 PM</p>
            </div>
          </motion.div>
        )}
      </div>

      {/* CTA */}
      <div className="px-4 pb-8 pt-4 border-t border-gray-100">
        {!isComplete ? (
          <button
            className="w-full py-4 bg-purple-600 text-white rounded-xl font-semibold text-sm"
            onClick={advance}
          >
            Mark Complete + Submit Photo
          </button>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <button
              className="w-full py-4 bg-gray-900 text-white rounded-xl font-semibold text-sm"
              onClick={advance}
            >
              Submitted — Back to Board
            </button>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}
