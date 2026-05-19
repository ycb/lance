import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function AIActionCard({ event }) {
  const [flagged, setFlagged] = useState(false)
  const [showWhy, setShowWhy] = useState(false)

  return (
    <div className={`rounded-lg px-3 py-2.5 ${
      event.isEscalation
        ? 'bg-destructive/10 border border-destructive/20'
        : 'bg-muted border border-border'
    }`}>
      {/* header row */}
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-1.5">
          <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider ${
            event.isEscalation
              ? 'bg-destructive/15 text-destructive'
              : 'bg-border text-muted-foreground'
          }`}>AI</span>
          <span className="text-[10px] text-muted-foreground">{event.time}</span>
        </div>
        {!flagged ? (
          <button
            className="text-[10px] text-muted-foreground/70 underline underline-offset-2"
            onClick={() => setFlagged(true)}
          >
            This looks wrong
          </button>
        ) : (
          <span className="text-[10px] text-muted-foreground italic">Flagged — we'll review</span>
        )}
      </div>

      {/* summary */}
      <p className={`text-xs leading-snug ${
        event.isEscalation ? 'text-destructive font-medium' : 'text-foreground'
      }`}>
        {event.text}
      </p>

      {/* Why? toggle */}
      {event.reasoning && (
        <button
          className="mt-1.5 text-[10px] text-primary font-medium"
          onClick={() => setShowWhy(w => !w)}
        >
          {showWhy ? 'Hide' : 'Why?'}
        </button>
      )}

      {/* reasoning */}
      <AnimatePresence>
        {showWhy && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="mt-2 pt-2 border-t border-border text-xs text-muted-foreground leading-relaxed">
              {event.reasoning}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
