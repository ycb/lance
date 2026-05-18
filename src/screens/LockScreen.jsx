import { motion } from 'framer-motion'
import { useDemoFlow } from '../store/demoFlow'

export function LockScreen() {
  const { advance } = useDemoFlow()

  return (
    <div
      className="h-full flex flex-col bg-gradient-to-b from-slate-800 to-slate-900 cursor-pointer select-none"
      onClick={advance}
    >
      {/* time */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <p className="text-7xl font-thin text-white tracking-tight">9:41</p>
        <p className="text-sm text-white/60 mt-2">Monday, May 18</p>
      </div>

      {/* notification */}
      <motion.div
        className="mx-4 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.4 }}
      >
        <div className="bg-white/15 backdrop-blur-md rounded-2xl px-4 py-3.5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-500 flex items-center justify-center shrink-0">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold text-white">Lance</p>
                <p className="text-xs text-white/50">now</p>
              </div>
              <p className="text-sm text-white/90 mt-0.5 leading-snug">
                Decision needed — Room 408 guest comp
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* tap hint */}
      <p className="text-center text-white/30 text-xs pb-6">tap to open</p>
    </div>
  )
}
