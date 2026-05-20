import { motion } from 'framer-motion'
import { LoyaltyBadge } from '@/components/shared/LoyaltyBadge'

function StatusBadge({ status }) {
  const statusLower = status?.toLowerCase()
  const isOpen = statusLower === 'open'
  const isActive = statusLower === 'active'

  let label = ''
  if (statusLower === 'open') label = 'Open'
  else if (statusLower === 'closed') label = 'Closed'
  else if (statusLower === 'complete') label = 'Complete'
  else if (statusLower === 'active') label = 'Active'
  else label = status ? status.charAt(0).toUpperCase() + status.slice(1) : ''

  const isClosed = statusLower === 'closed'
  const bgColor = (isOpen || isActive) ? '#dbeafe' : isClosed ? '#f3f4f6' : '#dcfce7'
  const textColor = (isOpen || isActive) ? '#1d4ed8' : isClosed ? '#6b7280' : '#15803d'

  return (
    <span
      style={{
        background: bgColor,
        color: textColor,
        borderRadius: 999,
        fontSize: 9,
        fontWeight: 700,
        padding: '2px 6px',
        whiteSpace: 'nowrap',
      }}
    >
      {label}
    </span>
  )
}

function SectionLabel({ children }) {
  return (
    <p style={{ fontSize: 10, fontWeight: 700, color: '#6b7280', letterSpacing: 0.6, textTransform: 'uppercase', marginBottom: 8 }}>
      {children}
    </p>
  )
}

function MetaCell({ label, value }) {
  return (
    <div>
      <p style={{ fontSize: 9, color: '#9ca3af', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.4, marginBottom: 2 }}>
        {label}
      </p>
      <p style={{ fontSize: 11, color: '#111827', fontWeight: 600 }}>{value}</p>
    </div>
  )
}

function capitalize(s) {
  return s ? s.charAt(0).toUpperCase() + s.slice(1) : ''
}

export function OriginTicketDetail({ commitment, originEvent, onBack, onLinkedTicketPress, onTeamTicketPress }) {
  const reservation = commitment.reservation ?? {}
  const originTicket = commitment.originTicket ?? {
    id: 'TICKET',
    title: originEvent?.text,
    description: commitment.summaryBrief,
    status: 'open',
    source: 'Guest-created',
    channel: commitment.originChannel,
    reporter: commitment.guest,
    room: commitment.room,
    time: originEvent?.time,
    date: 'May 18, 2026',
  }
  const linkedTicket = commitment.linkedTicket
  const teamTickets = commitment.teamTickets ?? []
  const linkedCount = linkedTicket ? 1 : 0

  return (
    <motion.div
      className="absolute inset-0 flex flex-col bg-white"
      style={{ zIndex: 30 }}
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 28, stiffness: 280 }}
    >
      <div className="h-12 bg-white border-b border-border flex items-center px-4 shrink-0" style={{ position: 'relative' }}>
        <button className="text-sm font-medium shrink-0" style={{ color: '#3363AC' }} onClick={onBack}>
          ← Issue Overview
        </button>
        <p className="text-sm font-semibold text-foreground" style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
          Ticket Details
        </p>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Guest row */}
        <section className="px-4 py-3 border-b border-gray-100">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 }}>
              <p style={{ color: '#111827', fontSize: 14, fontWeight: 700, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {commitment.guest}
              </p>
              <LoyaltyBadge tier={commitment.loyaltyTier} />
            </div>
            <button style={{ color: '#3363AC', fontSize: 11, background: 'transparent', border: 0, whiteSpace: 'nowrap' }} onClick={() => {}}>
              View in PMS →
            </button>
          </div>
        </section>

        {/* Active Reservation — above Customer Ticket */}
        <section className="px-4 py-3 border-b border-gray-100">
          <SectionLabel>Active Reservation</SectionLabel>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px 16px' }}>
            <MetaCell label="Room" value={reservation.room} />
            <MetaCell label="Nights" value={reservation.nights} />
            <MetaCell label="Check-in" value={reservation.checkIn} />
            <MetaCell label="Check-out" value={reservation.checkOut} />
            <MetaCell label="Rate" value={reservation.rate} />
          </div>
        </section>

        {/* Customer Ticket — 2-col metadata, no standalone status pill */}
        <section className="px-4 py-3 border-b border-gray-100">
          <SectionLabel>Customer Ticket</SectionLabel>
          <p style={{ fontSize: 13, fontWeight: 600, color: '#111827', marginBottom: 6 }}>
            {originTicket.title}
          </p>
          {originTicket.description && (
            <p style={{ fontSize: 11, color: '#374151', lineHeight: 1.45, marginBottom: 10 }}>
              {originTicket.description}
            </p>
          )}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px 16px' }}>
            <MetaCell label="Status" value={capitalize(originTicket.status)} />
            <MetaCell label="Source" value={originTicket.source} />
            <MetaCell label="Channel" value={originTicket.channel} />
            <MetaCell label="Reporter" value={originTicket.reporter} />
            <MetaCell label="Time" value={originTicket.time} />
            <MetaCell label="Date" value={originTicket.date} />
            <MetaCell label="ID" value={originTicket.id} />
          </div>
        </section>

        {/* Linked Ticket (N) — collapsed summary row */}
        {linkedTicket && (
          <section className="px-4 py-3 border-b border-gray-100">
            <SectionLabel>Linked Ticket ({linkedCount})</SectionLabel>
            <button
              onClick={() => onLinkedTicketPress?.(linkedTicket)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                width: '100%',
                padding: '8px 0',
                border: 'none',
                background: 'none',
                cursor: 'pointer',
                textAlign: 'left',
              }}
            >
              <StatusBadge status={linkedTicket.status} />
              <p style={{ flex: 1, minWidth: 0, fontSize: 12, fontWeight: 600, color: '#111827' }}>
                {linkedTicket.title}
              </p>
              <span style={{ fontSize: 12, color: '#6b7280', flexShrink: 0 }}>→</span>
            </button>
          </section>
        )}

        {/* Team Tickets (N) */}
        <section className="px-4 py-3">
          <SectionLabel>Team Tickets ({teamTickets.length})</SectionLabel>
          {teamTickets.map(ticket => (
            <button
              key={ticket.id}
              onClick={() => onTeamTicketPress?.(ticket)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '8px 4px',
                borderBottom: '1px solid #f9fafb',
                width: '100%',
                border: 'none',
                background: 'none',
                cursor: 'pointer',
                textAlign: 'left',
              }}
            >
              <StatusBadge status={ticket.status} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ color: '#111827', fontSize: 11, fontWeight: 600 }}>{ticket.title}</p>
                <p style={{ color: '#6b7280', fontSize: 10, marginTop: 1 }}>{ticket.owner} · {ticket.role}</p>
              </div>
              <span style={{ fontSize: 12, color: '#6b7280', flexShrink: 0 }}>→</span>
            </button>
          ))}
        </section>
      </div>
    </motion.div>
  )
}
