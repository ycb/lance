import { motion, AnimatePresence } from 'framer-motion'

export function ConfirmationGate({ open, message, onConfirm, onCancel, confirmLabel = 'Confirm' }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="absolute inset-0 z-50 flex items-end"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-black/40" onClick={onCancel} />
          <motion.div
            className="relative w-full bg-white rounded-t-2xl px-6 pt-6 pb-10 shadow-2xl"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-6" />
            <p className="text-sm text-gray-700 text-center leading-relaxed mb-6">{message}</p>
            <button
              className="w-full py-3.5 bg-gray-900 text-white rounded-xl font-semibold text-sm mb-3"
              onClick={onConfirm}
            >
              {confirmLabel}
            </button>
            <button
              className="w-full py-3 text-gray-500 text-sm font-medium"
              onClick={onCancel}
            >
              Cancel
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
