import { motion, AnimatePresence } from 'framer-motion'
import { Avatar } from '@/components/shared/Avatar'

function GuestBubble({ message }) {
  return (
    <div className="flex justify-start mb-3">
      <div className="max-w-[80%]">
        <p className="text-[10px] text-muted-foreground mb-1">Guest · {message.time}</p>
        <div className="bg-muted rounded-2xl rounded-tl-sm px-3 py-2">
          <p className="text-sm text-foreground">"{message.text}"</p>
        </div>
      </div>
    </div>
  )
}

function StaffBubble({ message }) {
  return (
    <div className="flex gap-2.5 mb-3">
      <Avatar initials={message.initials} deptId={message.deptId} status="complete" size="sm" />
      <div className="flex-1 min-w-0">
        <p className="text-[10px] text-muted-foreground mb-1">{message.name} · {message.time}</p>
        <div className="bg-white border border-border rounded-2xl rounded-tl-sm px-3 py-2 inline-block max-w-full">
          <p className="text-sm text-foreground">{message.text}</p>
        </div>
      </div>
    </div>
  )
}

function SystemMsg({ message }) {
  if (message.isEscalation) {
    return (
      <div className="mb-3 px-3 py-2 bg-destructive/10 border border-destructive/20 rounded-lg">
        <p className="text-xs text-destructive font-medium text-center">{message.text}</p>
        <p className="text-[10px] text-destructive/70 text-center mt-0.5">{message.time}</p>
      </div>
    )
  }
  return (
    <div className="mb-3 px-3 py-1.5">
      <p className="text-[11px] text-muted-foreground italic text-center">{message.text}</p>
      <p className="text-[10px] text-muted-foreground/60 text-center mt-0.5">{message.time}</p>
    </div>
  )
}

export function ThreadDrawer({ open, messages, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <div className="absolute inset-0 z-40 flex items-end">
          <div className="absolute inset-0 bg-black/40" onClick={onClose} />
          <motion.div
            className="relative w-full bg-white rounded-t-2xl flex flex-col"
            style={{ maxHeight: '80%' }}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-border shrink-0">
              <p className="text-sm font-semibold text-foreground">Thread · {messages.length} messages</p>
              <button className="w-7 h-7 rounded-full bg-muted flex items-center justify-center" onClick={onClose}>
                <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-4 py-4">
              {messages.map(msg => {
                if (msg.type === 'guest') return <GuestBubble key={msg.id} message={msg} />
                if (msg.type === 'staff') return <StaffBubble key={msg.id} message={msg} />
                return <SystemMsg key={msg.id} message={msg} />
              })}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
