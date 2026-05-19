import { motion, AnimatePresence } from 'framer-motion'

export function PhotoDrawer({ open, photos, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <div className="absolute inset-0 z-40 flex items-end">
          <div className="absolute inset-0 bg-black/40" onClick={onClose} />
          <motion.div
            className="relative w-full bg-white rounded-t-2xl flex flex-col"
            style={{ maxHeight: '70%' }}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-border shrink-0">
              <p className="text-sm font-semibold text-foreground">Photos · {photos.length}</p>
              <button className="w-7 h-7 rounded-full bg-muted flex items-center justify-center" onClick={onClose}>
                <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-4 py-4">
              <div className="grid grid-cols-2 gap-3">
                {photos.map(photo => (
                  <div key={photo.id} className="bg-muted rounded-xl h-36 flex items-center justify-center border border-border">
                    <div className="text-center px-2">
                      <div className="text-3xl mb-1">{photo.photoEmoji}</div>
                      <p className="text-[10px] text-muted-foreground font-medium">{photo.photoCaption}</p>
                      <p className="text-[9px] text-muted-foreground/60 mt-0.5">{photo.name} · {photo.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
