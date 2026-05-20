import { motion } from 'framer-motion'

function StatusBadge({ status }) {
  const statusLower = status?.toLowerCase()
  const isOpen = statusLower === 'open' || statusLower === 'active'

  let label = ''
  if (statusLower === 'open') label = 'Open'
  else if (statusLower === 'closed') label = 'Closed'
  else if (statusLower === 'complete') label = 'Complete'
  else if (statusLower === 'active') label = 'Active'
  else label = status ? status.charAt(0).toUpperCase() + status.slice(1) : ''

  return (
    <span
      style={{
        background: isOpen ? '#dbeafe' : '#dcfce7',
        color: isOpen ? '#1d4ed8' : '#15803d',
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
      <p style={{ fontSize: 11, color: '#111827', fontWeight: 600 }}>{value ?? '—'}</p>
    </div>
  )
}

export function LinkedTicketDetail({ ticket, onBack }) {
  if (!ticket) return null

  return (
    <motion.div
      className="absolute inset-0 flex flex-col bg-white"
      style={{ zIndex: 40 }}
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 28, stiffness: 280 }}
    >
      <div className="h-12 bg-white border-b border-border flex items-center px-4 shrink-0" style={{ position: 'relative' }}>
        <button className="text-sm font-medium shrink-0" style={{ color: '#3363AC' }} onClick={onBack}>
          ← Guest Ticket
        </button>
        <p className="text-sm font-semibold text-foreground" style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
          Linked Ticket
        </p>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Title + description */}
        <section className="px-4 py-3 border-b border-gray-100">
          <p style={{ fontSize: 13, fontWeight: 700, color: '#111827', marginBottom: 6 }}>
            {ticket.title}
          </p>
          {ticket.reason && (
            <p style={{ fontSize: 11, color: '#374151', lineHeight: 1.5 }}>
              {ticket.reason}
            </p>
          )}
        </section>

        {/* 2-col metadata grid — ID lives here, not a separate section */}
        <section className="px-4 py-3">
          <SectionLabel>Details</SectionLabel>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px 16px' }}>
            <MetaCell label="Status" value={ticket.status ? ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1) : '—'} />
            <MetaCell label="Channel" value={ticket.channel} />
            <MetaCell label="Room" value={ticket.room} />
            <MetaCell label="ID" value={ticket.id} />
            <MetaCell label="Time" value={ticket.time} />
            <MetaCell label="Date" value={ticket.date} />
          </div>
        </section>
      </div>
    </motion.div>
  )
}
