// src/screens/IssueDetail.jsx
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'sonner'
import { useDemoFlow } from '@/store/demoFlow'
import { IssueNavBar } from '@/components/issues/IssueNavBar'
import { TicketChain } from '@/components/issues/TicketChain'
import { MessagesPanel } from '@/components/issues/MessagesPanel'
import { PhotosPanel } from '@/components/issues/PhotosPanel'
import { OriginTicketDetail } from '@/components/issues/OriginTicketDetail'
import { TeamTicketDetail } from '@/components/issues/TeamTicketDetail'
import { LinkedTicketDetail } from '@/components/issues/LinkedTicketDetail'
import { Button } from '@/components/ui/button'
import { AISummary } from '@/components/shared/AISummary'
import { commitments } from '@/data/scenario'

const COMMITMENT_MAP = {
  ISSUE_DETAIL_COMP:   commitments.acComp,
  ISSUE_DETAIL_CABANA: commitments.cabana,
}

function getDraftSMS(optionId, fbAmount) {
  if (optionId === 'comp_night') {
    return `In consideration for the unanticipated room switch, we've issued a credit for one complimentary night at any Hilton property, up to $195. See your email for full details.`
  }
  if (optionId === 'comp_fb') {
    return `In consideration for the unanticipated room switch, we've added a ${fbAmount} F&B credit to your reservation. Enjoy at any of our dining venues — see your email for details.`
  }
  if (optionId === 'comp_none') {
    return `We're sorry for the inconvenience during your stay at The Grand Hilton. We've noted your feedback and hope the rest of your stay is exceptional. Please check your email for a personal note.`
  }
  return `Thank you for your patience. Please check your email for a personal note from our team.`
}

function getDraftEmail(optionId, fbAmount) {
  if (optionId === 'comp_night') {
    return `Dear Alex,\n\nWe sincerely apologize for the inconvenience of your unplanned room move during your stay at The Grand Hilton.\n\nAs a gesture of goodwill, we've added a one-night complimentary credit to your Hilton Honors account — valid at any Hilton property, up to $195 per night.\n\nCredit code: COMP-408-051826\n\nThis credit has been applied to your Hilton Honors account and will appear within 24 hours. You may apply it directly at checkout or present the code at any Hilton front desk.\n\nWe value your loyalty and look forward to welcoming you back.\n\nWarm regards,\nSarah M.\nShift Supervisor, The Grand Hilton`
  }
  if (optionId === 'comp_fb') {
    return `Dear Alex,\n\nWe sincerely apologize for the disruption to your stay at The Grand Hilton.\n\nAs a gesture of goodwill, we've applied a ${fbAmount} food & beverage credit to your reservation, valid through your stay at any of our dining venues.\n\nCredit code: FB-408-051826\n\nSimply mention this code when ordering and the credit will be applied automatically. No action needed on your part.\n\nWe hope the rest of your stay is exceptional.\n\nWarm regards,\nSarah M.\nShift Supervisor, The Grand Hilton`
  }
  if (optionId === 'comp_none') {
    return `Dear Alex,\n\nThank you for your patience and understanding during your stay at The Grand Hilton.\n\nWe sincerely apologize for the inconvenience of your unplanned room move. Your comfort is our top priority and we regret falling short of the experience you deserve.\n\nWe've shared your feedback with our team to prevent similar situations in the future. If there is anything we can do to make the remainder of your stay more comfortable, please reach out directly.\n\nWarm regards,\nSarah M.\nShift Supervisor, The Grand Hilton`
  }
  return `Dear Alex,\n\nThank you for your patience. We value your loyalty and want to ensure your experience with us is exceptional.\n\nPlease don't hesitate to reach out if there is anything we can do.\n\nWarm regards,\nSarah M.\nShift Supervisor, The Grand Hilton`
}

function getToastMessage(optionId, fbAmount) {
  if (optionId === 'comp_night') return 'Rm 408 notified · $195 comp issued'
  if (optionId === 'comp_fb') return `Rm 408 notified · ${fbAmount} F&B credit issued`
  if (optionId === 'comp_none') return 'Rm 408 notified · Apology sent'
  return 'Rm 408 notified · Response sent'
}

// ─── Resolution picker overlay ────────────────────────────────────────────────

function ResolutionView({ commitment, selected, setSelected, fbAmount, setFbAmount, customText, setCustomText, onBack, onNext }) {
  return (
    <motion.div
      className="absolute inset-0 flex flex-col bg-background"
      style={{ zIndex: 20 }}
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
        {commitment.aiSummary && (
          <div className="pb-2">
            <AISummary
              variant="badge"
              text={commitment.aiSummary}
              escalationReason={commitment.escalationReason}
            />
          </div>
        )}

        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider pb-1">Choose Response</p>

        {(commitment.compOptions ?? []).map(option => {
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

// ─── Draft & send overlay ─────────────────────────────────────────────────────

const CHANNELS = [
  { id: 'sms',   icon: '📱', label: 'Text Message' },
  { id: 'email', icon: '📧', label: 'Email'        },
]

function DraftAccordionItem({ step, icon, label, draft, viewed, expanded, onToggle }) {
  const [text, setText] = useState(draft)
  const [editing, setEditing] = useState(false)

  return (
    <div
      style={{
        border: expanded ? '1.5px solid #3363AC' : '1px solid #e5e7eb',
        borderRadius: 12,
        overflow: 'hidden',
        background: 'white',
      }}
    >
      {/* Header row */}
      <button
        onClick={onToggle}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          width: '100%',
          padding: '12px 14px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
        }}
      >
        {/* Step circle */}
        <span style={{
          width: 22,
          height: 22,
          borderRadius: '50%',
          background: viewed ? '#002E5A' : '#f3f4f6',
          color: viewed ? 'white' : '#9ca3af',
          fontSize: 11,
          fontWeight: 700,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}>
          {viewed ? '✓' : step}
        </span>

        <span style={{ fontSize: 13 }}>{icon}</span>

        <span style={{
          flex: 1,
          fontSize: 13,
          fontWeight: 600,
          color: '#111827',
        }}>
          {label}
        </span>

        {/* Status chip */}
        {viewed ? (
          <span style={{ fontSize: 10, fontWeight: 600, color: '#15803d' }}>Reviewed</span>
        ) : (
          <span style={{ fontSize: 10, color: '#9ca3af' }}>Tap to review</span>
        )}

        {/* Chevron */}
        <span style={{
          fontSize: 11,
          color: '#9ca3af',
          transform: expanded ? 'rotate(90deg)' : 'rotate(0deg)',
          transition: 'transform 0.15s ease',
          marginLeft: 4,
        }}>▶</span>
      </button>

      {/* Draft body */}
      {expanded && (
        <div style={{ borderTop: '1px solid #f3f4f6' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 14px 4px' }}>
            <p style={{ fontSize: 10, fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: 0.5 }}>
              Draft
            </p>
            <button
              style={{ fontSize: 11, color: '#3363AC', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}
              onClick={() => setEditing(e => !e)}
            >
              {editing ? 'Done' : 'Edit'}
            </button>
          </div>
          <div style={{ padding: '0 14px 14px' }}>
            {editing ? (
              <textarea
                value={text}
                onChange={e => setText(e.target.value)}
                style={{
                  width: '100%',
                  fontSize: 12,
                  lineHeight: 1.5,
                  color: '#111827',
                  border: '1px solid #e5e7eb',
                  borderRadius: 8,
                  padding: '8px 10px',
                  minHeight: 100,
                  resize: 'none',
                  outline: 'none',
                  fontFamily: 'inherit',
                  boxSizing: 'border-box',
                }}
              />
            ) : (
              <p style={{ fontSize: 12, color: '#374151', lineHeight: 1.55, whiteSpace: 'pre-line' }}>
                {text}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

function SendView({ selected, fbAmount, onBack, onSend }) {
  const smsDraft   = getDraftSMS(selected, fbAmount)
  const emailDraft = getDraftEmail(selected, fbAmount)

  const [expanded, setExpanded] = useState(null)
  const [viewed, setViewed]     = useState(new Set())

  const toggle = (id) => {
    setExpanded(prev => prev === id ? null : id)
    setViewed(prev => new Set([...prev, id]))
  }

  const allReviewed = viewed.has('sms') && viewed.has('email')

  return (
    <motion.div
      className="absolute inset-0 flex flex-col bg-background"
      style={{ zIndex: 20 }}
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 28, stiffness: 280 }}
    >
      <div className="h-12 bg-white border-b border-border flex items-center gap-3 px-4 shrink-0">
        <button className="text-primary text-sm font-medium shrink-0" onClick={onBack}>← Resolution</button>
        <p className="text-sm font-semibold text-foreground flex-1">Send to Guest</p>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          Approve Final Messaging
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <DraftAccordionItem
            step={1}
            icon="📱"
            label="Text Message"
            draft={smsDraft}
            viewed={viewed.has('sms')}
            expanded={expanded === 'sms'}
            onToggle={() => toggle('sms')}
          />
          <DraftAccordionItem
            step={2}
            icon="📧"
            label="Email"
            draft={emailDraft}
            viewed={viewed.has('email')}
            expanded={expanded === 'email'}
            onToggle={() => toggle('email')}
          />
        </div>

        {!allReviewed && (
          <p style={{ fontSize: 11, color: '#9ca3af', textAlign: 'center', marginTop: 16 }}>
            Review both drafts to enable sending
          </p>
        )}
      </div>

      <div className="px-4 pb-6 pt-3 border-t border-border bg-white shrink-0">
        <Button
          className="w-full"
          size="lg"
          disabled={!allReviewed}
          onClick={onSend}
        >
          Send &amp; Close Issue
        </Button>
      </div>
    </motion.div>
  )
}

// ─── Tab bar ──────────────────────────────────────────────────────────────────

const TABS = [
  { id: 'tickets',  label: (n) => `Team Tickets (${n})`  },
  { id: 'messages', label: (n) => `Messages (${n})` },
  { id: 'photos',   label: (n) => `Photos (${n})`   },
]

function TabBar({ active, onChange, counts }) {
  return (
    <div style={{ background: 'white', borderBottom: '2px solid #e5e7eb' }}>
      <div style={{ display: 'flex', justifyContent: 'space-around', padding: '0 8px' }}>
        {TABS.map(tab => {
          const isActive = active === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              style={{
                padding: '8px 4px',
                fontSize: 11,
                fontWeight: isActive ? 700 : 400,
                color: isActive ? '#002E5A' : '#6b7280',
                border: 'none',
                borderBottom: isActive ? '2px solid #002E5A' : '2px solid transparent',
                marginBottom: -2,
                background: 'none',
                cursor: 'pointer',
              }}
            >
              {tab.label(counts[tab.id] ?? 0)}
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ─── Main IssueDetail ─────────────────────────────────────────────────────────

export function IssueDetail() {
  const { currentState, advance, goTo, resolveComp } = useDemoFlow()
  const commitment = COMMITMENT_MAP[currentState]

  const [tab, setTab]               = useState('tickets')
  const [step, setStep]             = useState('detail')
  const [showOriginDetail, setShowOriginDetail] = useState(false)
  const [selectedTeamTicket, setSelectedTeamTicket] = useState(null)
  const [selectedLinkedTicket, setSelectedLinkedTicket] = useState(null)
  const [selectedComp, setSelectedComp] = useState(null)
  const [fbAmount, setFbAmount]     = useState('$75')
  const [customText, setCustomText] = useState('')

  if (!commitment) return null

  const photos = (commitment.thread || []).filter(m => m.hasPhoto)
  const counts = {
    tickets:  (commitment.teamTickets || []).length || (commitment.timeline || []).filter(event => event.type === 'staff_step').length,
    messages: (commitment.thread   || []).filter(message => message.type !== 'system').length,
    photos:   photos.length,
  }

  const handleSend = () => {
    resolveComp()
    advance()
    toast(getToastMessage(selectedComp, fbAmount), { duration: 3000 })
  }

  const detailOverlayOpen = showOriginDetail || Boolean(selectedTeamTicket) || Boolean(selectedLinkedTicket)

  const handleTeamTicketPress = (ticket) => {
    setSelectedTeamTicket(ticket)
  }

  const handleLinkedTicketPress = (linkedTicket) => {
    setSelectedLinkedTicket(linkedTicket)
  }

  // Show resolution CTA in TeamTicketDetail when viewing the supervisor auth ticket
  const isSupTicket = (t) => t?.deptId === 'SUP' && commitment.compOptions?.length > 0
  const teamTicketResolutionHandler = selectedTeamTicket && isSupTicket(selectedTeamTicket)
    ? () => {
        setSelectedTeamTicket(null)
        setShowOriginDetail(false)
        setStep('resolution')
      }
    : undefined

  return (
    <div className="h-full flex flex-col relative overflow-hidden" style={{ background: '#F4F2F2' }}>
      {!detailOverlayOpen && (
        <>
          <IssueNavBar
            guest={commitment.guest}
            room={commitment.room}
            loyaltyTier={commitment.loyaltyTier}
            originEvent={(commitment.timeline || [])[0]}
            elapsed={commitment.elapsed}
            checkIn={commitment.checkIn}
            nights={commitment.nights}
            ticketStats={commitment.ticketStats}
            requestStats={commitment.requestStats}
            originTicket={commitment.originTicket}
            linkedTicket={commitment.linkedTicket}
            teamTickets={commitment.teamTickets}
            originChannel={commitment.originChannel}
            aiSummary={commitment.aiSummary ?? commitment.summaryBrief}
            onBack={() => goTo('BOARD')}
            onOriginTicketPress={() => setShowOriginDetail(true)}
          />

          <TabBar active={tab} onChange={setTab} counts={counts} />

          <div className="flex-1 overflow-hidden">
            {tab === 'tickets'  && (
              <TicketChain
                timeline={(commitment.timeline || []).slice(1)}
                teamTickets={commitment.teamTickets || []}
                guest={commitment.guest}
                room={commitment.room}
                onTeamTicketPress={handleTeamTicketPress}
              />
            )}
            {tab === 'messages' && <MessagesPanel thread={commitment.thread || []} />}
            {tab === 'photos'   && <PhotosPanel  photos={photos} />}
          </div>

          {commitment.compOptions?.length > 0 && (
            <div className="shrink-0 px-3 py-3 bg-white border-t border-gray-200">
              <button
                className="w-full py-2.5 rounded-lg text-sm font-bold text-white"
                style={{ background: '#002E5A' }}
                onClick={() => setStep('resolution')}
              >
                Proceed to Resolution →
              </button>
            </div>
          )}
        </>
      )}

      <AnimatePresence>
        {showOriginDetail && (
          <OriginTicketDetail
            commitment={commitment}
            originEvent={(commitment.timeline || [])[0]}
            onBack={() => setShowOriginDetail(false)}
            onTeamTicketPress={handleTeamTicketPress}
            onLinkedTicketPress={handleLinkedTicketPress}
          />
        )}
      </AnimatePresence>

      {selectedTeamTicket && (
        <TeamTicketDetail
          ticket={selectedTeamTicket}
          originTicket={commitment.originTicket}
          onBack={() => {
            setSelectedTeamTicket(null)
            setShowOriginDetail(true)
          }}
          onClose={() => {
            setSelectedTeamTicket(null)
            setShowOriginDetail(false)
          }}
          onProceedToResolution={teamTicketResolutionHandler}
        />
      )}

      <AnimatePresence>
        {selectedLinkedTicket && (
          <LinkedTicketDetail
            ticket={selectedLinkedTicket}
            onBack={() => {
              setSelectedLinkedTicket(null)
              setShowOriginDetail(true)
            }}
          />
        )}
      </AnimatePresence>

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
            selected={selectedComp}
            fbAmount={fbAmount}
            onBack={() => setStep('resolution')}
            onSend={handleSend}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
