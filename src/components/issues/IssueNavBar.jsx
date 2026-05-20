// src/components/issues/IssueNavBar.jsx
// Unified issue header: back/elapsed row, origin ticket row, AI summary — one white section.

import { LoyaltyBadge } from '@/components/shared/LoyaltyBadge'
import { IssueSummaryCard } from '@/components/shared/IssueSummaryCard'

function ticketCountText(ticketStats) {
  const total = ticketStats?.total ?? 0
  const open = ticketStats?.open ?? 0
  return `${total} ${total === 1 ? 'ticket' : 'tickets'} | ${open} open`
}

function requestCountText(requestStats) {
  const total = requestStats?.total ?? 0
  const open = requestStats?.open ?? 0
  return `${total} ${total === 1 ? 'request' : 'requests'} | ${open} open`
}

function shortDate(date) {
  return date?.replace(/, \d{4}$/, '') ?? ''
}

export function IssueNavBar({
  guest,
  room,
  loyaltyTier = 'non-member',
  elapsed,
  checkIn,
  nights,
  ticketStats,
  requestStats,
  originTicket,
  linkedTicket,
  teamTickets = [],
  originEvent,
  originChannel,
  aiSummary,
  onBack,
  onOriginTicketPress,
}) {
  const openOriginTicket = () => {
    onOriginTicketPress?.()
  }

  const handleSummaryKeyDown = event => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      openOriginTicket()
    }
  }

  const hasCustomerTicket = Boolean(originTicket)
  const requestContext = requestStats
    ? `Check-in ${checkIn} · ${nights} nights · ${requestCountText(requestStats)}`
    : ticketStats
      ? `Check-in ${checkIn} · ${nights} nights · ${ticketCountText(ticketStats)}`
      : null
  const title = originTicket?.title ?? originEvent?.text
  const sourceLine = originTicket
    ? `${originTicket.source} · ${originTicket.channel} · ${originTicket.time} · ${shortDate(originTicket.date)}`
    : `${originChannel} · ${originEvent?.time} · May 18, 2026`
  const metaLine = originTicket && linkedTicket
    ? `Linked to ${linkedTicket.id}`
    : null

  return (
    <div
      className="shrink-0 bg-white border-b border-gray-200 transition-colors duration-150 hover:bg-gray-50 active:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#3363AC]"
      role="button"
      tabIndex={0}
      onClick={openOriginTicket}
      onKeyDown={handleSummaryKeyDown}
      style={{ cursor: 'pointer' }}
    >
      {/* Top row: title + loyalty + close X */}
      <div className="flex items-center gap-2 px-4 pt-2.5 pb-1">
        <div className="flex-1 min-w-0 flex items-center gap-1.5">
          <p className="font-bold text-sm text-gray-900 truncate">{guest} · {room}</p>
          <span className="shrink-0 text-gray-400 font-bold text-sm select-none">·</span>
          <div data-testid="nav-loyalty-slot" className="shrink-0 flex items-center">
            <LoyaltyBadge tier={loyaltyTier} />
          </div>
        </div>
        <button
          onClick={event => {
            event.stopPropagation()
            onBack?.()
          }}
          className="shrink-0 flex items-center justify-center"
          style={{ width: 24, height: 24, borderRadius: 12, background: '#f3f4f6', color: '#6b7280', fontSize: 14, lineHeight: 1 }}
          aria-label="Close"
        >
          ✕
        </button>
      </div>

      {checkIn && nights && requestContext && (
        <p className="px-4 pb-2" style={{ fontSize: 10, color: '#6b7280' }}>
          {requestContext}
        </p>
      )}

      <div className="px-3 pb-3">
        <IssueSummaryCard
          title={title}
          sourceLine={sourceLine}
          aiSummary={aiSummary}
          metaLine={metaLine}
          contextHeader={!hasCustomerTicket && checkIn && nights && ticketStats ? (
            <>
              <span style={{ flex: 1, minWidth: 0 }}>Check-in {checkIn} · {nights} nights · {ticketCountText(ticketStats)}</span>
              <span style={{ color: '#6b7280', flexShrink: 0 }}>{elapsed}</span>
            </>
          ) : null}
        />
      </div>
    </div>
  )
}
