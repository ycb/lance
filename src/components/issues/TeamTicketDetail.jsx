import { motion } from 'framer-motion'

function StatusBadge({ status }) {
  const statusLower = status?.toLowerCase()
  const isActive = statusLower === 'active'
  const isOpen = statusLower === 'open'

  let label = ''
  if (statusLower === 'open') label = 'Open'
  else if (statusLower === 'closed') label = 'Closed'
  else if (statusLower === 'complete') label = 'Complete'
  else if (statusLower === 'active') label = 'Active'
  else label = status ? status.charAt(0).toUpperCase() + status.slice(1) : ''

  const bgColor = (isOpen || isActive) ? '#dbeafe' : '#dcfce7'
  const textColor = (isOpen || isActive) ? '#1d4ed8' : '#15803d'

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
      <p style={{ fontSize: 11, color: '#111827', fontWeight: 600 }}>{value ?? '—'}</p>
    </div>
  )
}

const DEPT_LABELS = {
  FD: 'Front Desk', FB: 'F&B', RW: 'Recreation',
  HK: 'Housekeeping', ME: 'Maintenance', SEC: 'Security', SUP: 'Supervisor',
}

export function TeamTicketDetail({ ticket, teamTicket, originTicket, headerTitle = 'Team Ticket', onBack, onBackToCustomerTicket, onClose, onProceedToResolution }) {
  const detailTicket = ticket ?? teamTicket
  const handleBack = onBack ?? onBackToCustomerTicket

  if (!detailTicket) return null

  return (
    <motion.div
      className="absolute inset-0 flex flex-col bg-white"
      style={{ zIndex: 35 }}
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 28, stiffness: 280 }}
    >
      <div className="h-12 bg-white border-b border-border flex items-center px-4 shrink-0" style={{ position: 'relative' }}>
        <button className="text-sm font-medium shrink-0" style={{ color: '#3363AC' }} onClick={handleBack}>
          ← Ticket
        </button>
        <p className="text-sm font-semibold text-foreground" style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
          {headerTitle}
        </p>
        <button
          aria-label="Close team ticket"
          className="text-sm font-medium shrink-0"
          style={{ color: '#3363AC', marginLeft: 'auto' }}
          onClick={onClose}
        >
          Close
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Title + description */}
        <section className="px-4 py-3 border-b border-gray-100">
          <p style={{ fontSize: 13, fontWeight: 700, color: '#111827', marginBottom: 6 }}>
            {detailTicket.title}
          </p>
          {detailTicket.description && (
            <p style={{ fontSize: 11, color: '#374151', lineHeight: 1.45 }}>
              {detailTicket.description}
            </p>
          )}
        </section>

        {/* 2-col metadata grid */}
        <section className="px-4 py-3 border-b border-gray-100">
          <SectionLabel>Details</SectionLabel>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px 16px' }}>
            <MetaCell label="Status" value={detailTicket.status ? detailTicket.status.charAt(0).toUpperCase() + detailTicket.status.slice(1) : '—'} />
            <MetaCell label="Dept" value={DEPT_LABELS[detailTicket.deptId] ?? detailTicket.deptId} />
            <MetaCell label="Owner" value={detailTicket.owner} />
            <MetaCell label="Role" value={detailTicket.role} />
            <MetaCell label="Time" value={detailTicket.time} />
            <MetaCell label="Date" value={detailTicket.date} />
            <MetaCell label="ID" value={detailTicket.id} />
          </div>
        </section>

        {/* Customer Ticket reference */}
        {originTicket && (
          <section className="px-4 py-3 border-b border-gray-100">
            <SectionLabel>Customer Ticket</SectionLabel>
            <p style={{ fontSize: 12, fontWeight: 600, color: '#111827', marginBottom: 6 }}>
              {originTicket.title}
            </p>
            {originTicket.description && (
              <p style={{ fontSize: 11, color: '#374151', lineHeight: 1.45, marginBottom: 10 }}>
                {originTicket.description}
              </p>
            )}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px 16px' }}>
              <MetaCell label="Source" value={originTicket.source} />
              <MetaCell label="Channel" value={originTicket.channel} />
              <MetaCell label="Reporter" value={originTicket.reporter} />
              <MetaCell label="Time" value={originTicket.time} />
              <MetaCell label="Date" value={originTicket.date} />
              <MetaCell label="ID" value={originTicket.id} />
            </div>
          </section>
        )}

        {/* Outcome */}
        <section className="px-4 py-3">
          <SectionLabel>Outcome</SectionLabel>
          <p style={{ fontSize: 11, color: detailTicket.outcome ? '#374151' : '#9ca3af' }}>
            {detailTicket.outcome ?? 'Awaiting completion'}
          </p>
        </section>
      </div>

      {onProceedToResolution && (
        <div className="shrink-0 px-3 py-3 bg-white border-t border-gray-200">
          <button
            className="w-full py-2.5 rounded-lg text-sm font-bold text-white"
            style={{ background: '#002E5A' }}
            onClick={onProceedToResolution}
          >
            Proceed to Resolution →
          </button>
        </div>
      )}
    </motion.div>
  )
}
