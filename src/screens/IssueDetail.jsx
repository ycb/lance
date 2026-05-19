import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'sonner'
import { useDemoFlow } from '@/store/demoFlow'
import { AppHeader } from '@/components/layout/AppHeader'
import { BottomNav } from '@/components/layout/BottomNav'
import { IssueHeader } from '@/components/issues/IssueHeader'
import { IssueTimeline } from '@/components/issues/IssueTimeline'
import { ThreadDrawer } from '@/components/issues/ThreadDrawer'
import { PhotoDrawer } from '@/components/issues/PhotoDrawer'
import { DraftMessage } from '@/components/issues/DraftMessage'
import { Button } from '@/components/ui/button'
import { commitments } from '@/data/scenario'

const COMMITMENT_MAP = {
  ISSUE_DETAIL_COMP:   commitments.acComp,
  ISSUE_DETAIL_CABANA: commitments.cabana,
}

function getDraft(optionId, fbAmount) {
  if (optionId === 'comp_night') {
    return `Dear Guest,\n\nWe sincerely apologize for the inconvenience caused by the AC issue and the need to relocate you. As a valued guest, we've applied a one-night credit of $195 to your account — no action needed on your part.\n\nWe're committed to making the rest of your stay exceptional.\n\nWarmly,\nJordan S.\nShift Supervisor, The Grand Hilton`
  }
  if (optionId === 'comp_fb') {
    return `Dear Guest,\n\nWe sincerely apologize for the disruption to your stay. As a gesture of goodwill, we've applied a ${fbAmount} F&B credit to your account — enjoy it at any of our dining venues.\n\nWe look forward to making it up to you.\n\nWarmly,\nJordan S.\nShift Supervisor, The Grand Hilton`
  }
  if (optionId === 'comp_none') {
    return `Dear Guest,\n\nWe sincerely apologize for the inconvenience caused during your stay. Your comfort is our top priority and we're sorry we fell short.\n\nIf there's anything we can do to make the rest of your stay more comfortable, please don't hesitate to reach out.\n\nWarmly,\nJordan S.\nShift Supervisor, The Grand Hilton`
  }
  return `Dear Guest,\n\nThank you for your patience. We value your business and want to ensure your experience with us is exceptional.\n\nWarmly,\nJordan S.\nShift Supervisor, The Grand Hilton`
}

function getToastMessage(optionId, fbAmount) {
  if (optionId === 'comp_night') return 'Room 408 notified · $195 comp issued'
  if (optionId === 'comp_fb') return `Room 408 notified · ${fbAmount} F&B credit issued`
  if (optionId === 'comp_none') return 'Room 408 notified · Apology sent'
  return 'Room 408 notified · Response sent'
}

// ─── Step 1: Resolution Picker ───────────────────────────────────────────────

function ResolutionView({ commitment, selected, setSelected, fbAmount, setFbAmount, customText, setCustomText, onBack, onNext }) {
  return (
    <motion.div
      className="absolute inset-0 flex flex-col bg-background"
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 28, stiffness: 280 }}
    >
      <div className="h-12 bg-white border-b border-border flex items-center gap-3 px-4 shrink-0">
        <button className="text-primary text-sm font-medium shrink-0" onClick={onBack}>← Issue</button>
        <p className="text-sm font-semibold text-foreground flex-1">Choose Resolution</p>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-2">
        <div className="bg-blue-50 rounded-xl px-4 py-3 mb-4">
          <p className="text-xs font-semibold text-blue-700 uppercase tracking-wider mb-1">AI Summary</p>
          <p className="text-sm text-blue-900 leading-relaxed">{commitment.aiSummary}</p>
          <p className="text-[10px] text-blue-600 mt-1.5 font-medium">{commitment.escalationReason}</p>
        </div>

        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider pb-1">Choose Response</p>

        {commitment.compOptions.map(option => {
          const isSelected = selected === option.id
          return (
            <button
              key={option.id}
              className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl border-2 transition-colors text-left ${
                isSelected
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border bg-white text-foreground'
              }`}
              onClick={() => setSelected(option.id)}
            >
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <span className="text-sm font-medium">{option.label}</span>
                {option.recommended && (
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium shrink-0 ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-green-100 text-green-700'
                  }`}>Recommended</span>
                )}
              </div>
              {option.editable ? (
                <div
                  className={`flex items-center gap-1 shrink-0 ${isSelected ? 'text-white' : 'text-foreground'}`}
                  onClick={e => e.stopPropagation()}
                >
                  <span className="text-sm font-semibold">$</span>
                  <input
                    type="number"
                    value={fbAmount.replace('$', '')}
                    onChange={e => setFbAmount('$' + e.target.value)}
                    className={`w-12 text-sm font-semibold text-right bg-transparent border-b ${
                      isSelected ? 'border-white/40' : 'border-border'
                    } focus:outline-none`}
                    onClick={e => { e.stopPropagation(); setSelected(option.id) }}
                  />
                  <svg className="w-3 h-3 opacity-60 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </div>
              ) : option.amount ? (
                <span className="text-sm font-semibold shrink-0">{option.amount}</span>
              ) : null}
            </button>
          )
        })}

        {selected === 'comp_custom' && (
          <textarea
            value={customText}
            onChange={e => setCustomText(e.target.value)}
            placeholder="Describe the custom resolution..."
            className="w-full mt-2 px-3 py-2 text-sm border border-border rounded-xl focus:outline-none focus:ring-1 focus:ring-primary min-h-[80px] resize-none"
          />
        )}
      </div>

      <div className="px-4 pb-6 pt-3 border-t border-border bg-white shrink-0">
        <Button className="w-full" size="lg" disabled={!selected} onClick={onNext}>
          Next: Draft Message →
        </Button>
      </div>
    </motion.div>
  )
}

// ─── Step 2: Draft & Send ─────────────────────────────────────────────────────

function SendView({ commitment, selected, fbAmount, onBack, onSend }) {
  const [draft, setDraft] = useState(() => getDraft(selected, fbAmount))

  return (
    <motion.div
      className="absolute inset-0 flex flex-col bg-background"
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 28, stiffness: 280 }}
    >
      <div className="h-12 bg-white border-b border-border flex items-center gap-3 px-4 shrink-0">
        <button className="text-primary text-sm font-medium shrink-0" onClick={onBack}>← Resolution</button>
        <p className="text-sm font-semibold text-foreground flex-1">Send to Guest</p>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Contact Method</p>
          <div className="space-y-2">
            <div className="flex items-center justify-between px-4 py-3 bg-muted/40 rounded-xl border border-border">
              <div className="flex items-center gap-2">
                <span className="text-base">📱</span>
                <div>
                  <p className="text-xs font-medium text-foreground">Text message</p>
                  <p className="text-[10px] text-muted-foreground">We're on it — update coming shortly</p>
                </div>
              </div>
              <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">Immediate</span>
            </div>
            <div className="flex items-center justify-between px-4 py-3 bg-muted/40 rounded-xl border border-border">
              <div className="flex items-center gap-2">
                <span className="text-base">📧</span>
                <div>
                  <p className="text-xs font-medium text-foreground">Email</p>
                  <p className="text-[10px] text-muted-foreground">Comp details + full apology</p>
                </div>
              </div>
              <span className="text-[10px] bg-muted text-muted-foreground px-2 py-0.5 rounded-full font-medium">Within 5 min</span>
            </div>
          </div>
        </div>

        <DraftMessage initialText={draft} />
      </div>

      <div className="px-4 pb-6 pt-3 border-t border-border bg-white shrink-0">
        <Button className="w-full" size="lg" onClick={onSend}>
          Send &amp; Close Issue
        </Button>
      </div>
    </motion.div>
  )
}

// ─── Main IssueDetail ─────────────────────────────────────────────────────────

export function IssueDetail() {
  const { currentState, advance } = useDemoFlow()
  const commitment = COMMITMENT_MAP[currentState]
  const isComp = currentState === 'ISSUE_DETAIL_COMP'

  const [step, setStep] = useState('detail')
  const [selectedComp, setSelectedComp] = useState(null)
  const [fbAmount, setFbAmount] = useState('$75')
  const [customText, setCustomText] = useState('')
  const [threadOpen, setThreadOpen] = useState(false)
  const [photoOpen, setPhotoOpen] = useState(false)

  if (!commitment) return null

  const photos = (commitment.thread || []).filter(m => m.hasPhoto)
  const threadCount = (commitment.thread || []).length

  const handleSend = () => {
    advance()
    toast(getToastMessage(selectedComp, fbAmount), { duration: 3000 })
  }

  return (
    <div className="h-full flex flex-col bg-muted/30 relative overflow-hidden">
      <AppHeader
        mode="detail"
        title={commitment.issueType}
        severity={commitment.severity}
        onBack={() => {}}
      />

      <IssueHeader commitment={commitment} />

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 pb-4">
        {commitment.timeline && (
          <IssueTimeline timeline={commitment.timeline} />
        )}

        <div className="flex gap-2 pt-1">
          {threadCount > 0 && (
            <button
              className="flex-1 py-2.5 px-3 rounded-xl border border-border bg-white text-xs font-medium text-foreground"
              onClick={() => setThreadOpen(true)}
            >
              View Thread ({threadCount} messages)
            </button>
          )}
          {photos.length > 0 && (
            <button
              className="flex-1 py-2.5 px-3 rounded-xl border border-border bg-white text-xs font-medium text-foreground"
              onClick={() => setPhotoOpen(true)}
            >
              View Photos ({photos.length})
            </button>
          )}
        </div>

        {!isComp && (
          <Button variant="outline" className="w-full" onClick={advance}>
            View Maria's Task
          </Button>
        )}
      </div>

      {isComp && (
        <div className="px-4 pb-4 pt-3 border-t border-border bg-white shrink-0">
          <Button className="w-full" size="lg" onClick={() => setStep('resolution')}>
            Resolve Issue
          </Button>
        </div>
      )}

      <BottomNav activeTab="issues" />

      <AnimatePresence>
        {step === 'resolution' && (
          <ResolutionView
            commitment={commitment}
            selected={selectedComp}
            setSelected={setSelectedComp}
            fbAmount={fbAmount}
            setFbAmount={setFbAmount}
            customText={customText}
            setCustomText={setCustomText}
            onBack={() => setStep('detail')}
            onNext={() => setStep('send')}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {step === 'send' && (
          <SendView
            commitment={commitment}
            selected={selectedComp}
            fbAmount={fbAmount}
            onBack={() => setStep('resolution')}
            onSend={handleSend}
          />
        )}
      </AnimatePresence>

      <ThreadDrawer
        open={threadOpen}
        messages={commitment.thread || []}
        onClose={() => setThreadOpen(false)}
      />

      <PhotoDrawer
        open={photoOpen}
        photos={photos}
        onClose={() => setPhotoOpen(false)}
      />
    </div>
  )
}
