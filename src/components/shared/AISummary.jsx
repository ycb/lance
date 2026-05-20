import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function AISummary({ variant = 'badge', text, escalationReason, reasoning, isEscalation }) {
  const [showWhy, setShowWhy] = useState(false)

  if (variant === 'badge') {
    return (
      <div style={{ background: '#eff6ff', borderLeft: '3px solid #3363AC', padding: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 8 }}>
          <span style={{ background: '#6b7280', color: 'white', fontSize: 9, fontWeight: 700, padding: '1px 4px', borderRadius: 3 }}>
            AI
          </span>
          <span style={{ fontSize: 10, fontWeight: 600, color: '#3363AC' }}>Summary</span>
        </div>
        <p style={{ fontSize: 11, color: '#1f2937', lineHeight: 1.4, marginBottom: 6 }}>
          {text}
        </p>
        {escalationReason && (
          <p style={{ fontSize: 9, color: '#3363AC', fontWeight: 500 }}>
            {escalationReason}
          </p>
        )}
      </div>
    )
  }

  if (variant === 'card') {
    return (
      <div className={`rounded-lg px-3 py-2.5 ${
        isEscalation
          ? 'bg-destructive/10 border border-destructive/20'
          : 'bg-muted border border-border'
      }`}>
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-1.5">
            <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider ${
              isEscalation
                ? 'bg-destructive/15 text-destructive'
                : 'bg-border text-muted-foreground'
            }`}>AI</span>
          </div>
          {!reasoning ? null : (
            <button
              className="text-[10px] text-muted-foreground/70 underline underline-offset-2"
              onClick={() => setShowWhy(w => !w)}
            >
              {showWhy ? 'Hide' : 'Why?'}
            </button>
          )}
        </div>

        <p className={`text-xs leading-snug ${
          isEscalation ? 'text-destructive font-medium' : 'text-foreground'
        }`}>
          {text}
        </p>

        <AnimatePresence>
          {showWhy && reasoning && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <p className="mt-2 pt-2 border-t border-border text-xs text-muted-foreground leading-relaxed">
                {reasoning}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }

  return null
}
