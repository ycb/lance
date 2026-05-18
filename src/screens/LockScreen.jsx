import { motion } from 'framer-motion'
import { useDemoFlow } from '@/store/demoFlow'

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
        className="mx-4 mb-6"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
      >
        <div className="bg-white/12 backdrop-blur-xl rounded-2xl px-4 py-3.5 border border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shrink-0">
              <span className="text-primary-foreground font-bold text-sm">H</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-0.5">
                <p className="text-xs font-semibold text-white">Lance · The Grand Hilton</p>
                <p className="text-[10px] text-white/50">now</p>
              </div>
              <p className="text-sm text-white/90 leading-snug font-medium">
                Decision needed — Room 408 guest comp
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      <p className="text-center text-white/25 text-xs pb-8">tap to open</p>
    </div>
  )
}
