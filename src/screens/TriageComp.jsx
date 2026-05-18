import { useState } from 'react'
import { motion } from 'framer-motion'
import { useDemoFlow } from '../store/demoFlow'
import { ChainView } from '../components/ChainView'
import { ConfirmationGate } from '../components/ConfirmationGate'
import { commitments } from '../data/scenario'

export function TriageComp() {
  const { advance } = useDemoFlow()
  const [selectedComp, setSelectedComp] = useState('comp_night')
  const [gateOpen, setGateOpen] = useState(false)
  const { chainHistory, aiSummary, compOptions } = commitments.acComp

  const selected = compOptions.find(o => o.id === selectedComp)

  const gateMessage = selected?.amount
    ? `Issue a ${selected.amount} ${selected.label.toLowerCase()} to Room 408? This will be applied to the folio in Opera.`
    : 'Decline compensation and send apology to Room 408?'

  return (
    <motion.div
      className="h-full flex flex-col bg-white"
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      transition={{ type: 'spring', damping: 28, stiffness: 280 }}
    >
      {/* nav */}
      <div className="flex items-center gap-3 px-4 pt-4 pb-3 border-b border-gray-100">
        <button className="text-blue-500 text-sm font-medium" onClick={() => {}}>
          ← Board
        </button>
        <div className="flex-1">
          <p className="text-sm font-semibold text-gray-900">Comp Request</p>
          <p className="text-xs text-gray-400">Room 408 · 31 min ago</p>
        </div>
        <span className="text-xs bg-red-100 text-red-600 font-semibold px-2 py-0.5 rounded-full">Decide</span>
      </div>

      {/* scrollable body */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {/* chain history */}
        <ChainView steps={chainHistory} />

        {/* ai summary */}
        <div className="bg-blue-50 rounded-xl px-4 py-3.5">
          <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-1.5">AI Summary</p>
          <p className="text-sm text-blue-900 leading-relaxed">{aiSummary}</p>
        </div>

        {/* comp options */}
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Choose Response</p>
          <div className="space-y-2">
            {compOptions.map(option => (
              <button
                key={option.id}
                className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl border-2 transition-colors ${
                  selectedComp === option.id
                    ? 'border-gray-900 bg-gray-900 text-white'
                    : 'border-gray-200 bg-white text-gray-700'
                }`}
                onClick={() => setSelectedComp(option.id)}
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-sm font-medium">{option.label}</span>
                  {option.recommended && (
                    <span className={`text-xs px-1.5 py-0.5 rounded font-medium ${
                      selectedComp === option.id ? 'bg-white/20 text-white' : 'bg-green-100 text-green-700'
                    }`}>
                      Recommended
                    </span>
                  )}
                </div>
                {option.amount && (
                  <span className="text-sm font-semibold">{option.amount}</span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* fixed footer */}
      <div className="px-4 pb-8 pt-4 border-t border-gray-100 bg-white">
        <button
          className="w-full py-4 bg-gray-900 text-white rounded-xl font-semibold text-sm"
          onClick={() => setGateOpen(true)}
        >
          Authorize Decision
        </button>
      </div>

      <ConfirmationGate
        open={gateOpen}
        message={gateMessage}
        onConfirm={advance}
        onCancel={() => setGateOpen(false)}
        confirmLabel="Confirm"
      />
    </motion.div>
  )
}
