import { useState } from 'react'
import { motion } from 'framer-motion'
import { useDemoFlow } from '@/store/demoFlow'
import { AppHeader } from '@/components/layout/AppHeader'
import { BottomNav } from '@/components/layout/BottomNav'
import { HistorySection } from '@/components/issues/HistorySection'
import { ThreadSection } from '@/components/issues/ThreadSection'
import { DraftMessage } from '@/components/issues/DraftMessage'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { commitments } from '@/data/scenario'

// Which commitment to show for each demo state
const COMMITMENT_MAP = {
  ISSUE_DETAIL_COMP:   commitments.acComp,
  ISSUE_DETAIL_CABANA: commitments.cabana,
}

function CompOptions({ options, selected, onSelect }) {
  return (
    <div className="space-y-2">
      {options.map(option => (
        <button
          key={option.id}
          className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl border-2 transition-colors ${
            selected === option.id
              ? 'border-primary bg-primary text-primary-foreground'
              : 'border-border bg-white text-foreground'
          }`}
          onClick={() => onSelect(option.id)}
        >
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">{option.label}</span>
            {option.recommended && (
              <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${
                selected === option.id ? 'bg-white/20 text-white' : 'bg-green-100 text-green-700'
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
  )
}

function ConfirmSheet({ open, message, onConfirm, onCancel }) {
  if (!open) return null
  return (
    <div className="absolute inset-0 z-50 flex items-end">
      <div className="absolute inset-0 bg-black/40" onClick={onCancel} />
      <motion.div
        className="relative w-full bg-white rounded-t-2xl px-6 pt-5 pb-10 shadow-2xl"
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 28, stiffness: 300 }}
      >
        <div className="w-10 h-1 bg-border rounded-full mx-auto mb-5" />
        <p className="text-sm text-foreground text-center leading-relaxed mb-6">{message}</p>
        <Button className="w-full mb-3" onClick={onConfirm}>Confirm</Button>
        <button className="w-full py-2 text-sm text-muted-foreground font-medium" onClick={onCancel}>Cancel</button>
      </motion.div>
    </div>
  )
}

export function IssueDetail() {
  const { currentState, advance } = useDemoFlow()
  const commitment = COMMITMENT_MAP[currentState]
  const isComp = currentState === 'ISSUE_DETAIL_COMP'
  const [selectedComp, setSelectedComp] = useState('comp_night')
  const [confirmOpen, setConfirmOpen] = useState(false)

  if (!commitment) return null

  const selected = commitment.compOptions?.find(o => o.id === selectedComp)
  const confirmMessage = selected?.amount
    ? `Issue a ${selected.amount} ${selected.label.toLowerCase()} to ${commitment.room}? This will be applied to the folio in Opera.`
    : `Decline compensation and send apology to ${commitment.room}?`

  return (
    <motion.div
      className="h-full flex flex-col bg-muted/30"
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      transition={{ type: 'spring', damping: 28, stiffness: 280 }}
    >
      <AppHeader
        mode="detail"
        title={commitment.issueType}
        subtitle={`${commitment.room} · ${commitment.elapsed}`}
        severity={commitment.severity}
        onBack={() => {}}
      />

      {/* scrollable body */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 pb-6">

        {/* history (chain record) */}
        <HistorySection steps={commitment.chainHistory} />

        {/* thread (group coordination) */}
        <ThreadSection messages={commitment.thread} />

        {/* decision panel — comp only */}
        {isComp && (
          <>
            <Separator />

            {/* AI Summary */}
            <div className="bg-blue-50 rounded-xl px-4 py-3.5">
              <div className="flex items-center gap-2 mb-1.5">
                <p className="text-xs font-semibold text-blue-700 uppercase tracking-wider">AI Summary</p>
                <span className="text-[10px] bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full font-medium">
                  {commitment.escalationReason}
                </span>
              </div>
              <p className="text-sm text-blue-900 leading-relaxed">{commitment.aiSummary}</p>
            </div>

            {/* comp options */}
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Choose Response</p>
              <CompOptions
                options={commitment.compOptions}
                selected={selectedComp}
                onSelect={setSelectedComp}
              />
            </div>

            {/* draft message */}
            <DraftMessage initialText={commitment.draftMessage} />
          </>
        )}

        {/* in-progress panel — cabana only */}
        {!isComp && (
          <Button
            variant="outline"
            className="w-full"
            onClick={advance}
          >
            View Maria's Task
          </Button>
        )}
      </div>

      {/* fixed action bar — comp only */}
      {isComp && (
        <div className="px-4 pb-4 pt-3 border-t border-border bg-white shrink-0">
          <Button className="w-full" size="lg" onClick={() => setConfirmOpen(true)}>
            Authorize &amp; Send
          </Button>
        </div>
      )}

      <BottomNav activeTab="issues" />

      <ConfirmSheet
        open={confirmOpen}
        message={confirmMessage}
        onConfirm={advance}
        onCancel={() => setConfirmOpen(false)}
      />
    </motion.div>
  )
}
