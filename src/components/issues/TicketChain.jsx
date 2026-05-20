// src/components/issues/TicketChain.jsx
// Renders the connected chain of guest request, AI events, and staff steps.
// Left column: 22px avatar/badge + absolute connector line.
// Right column: card (white or grey/amber for AI).

import { useState } from 'react'

const DEPT_COLORS = {
  FD: '#3B82F6', HK: '#A855F7', ME: '#F97316',
  FB: '#F59E0B', RW: '#14B8A6', SEC: '#64748B', SUP: '#002E5A',
}

function ConnectorLeft({ position, children }) {
  // position: 'first' | 'middle' | 'last'
  const lineTop    = position === 'first'  ? '50%' : '0'
  const lineBottom = position === 'last'   ? '50%' : '-8px'

  return (
    <div style={{ position: 'relative', width: 22, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', alignSelf: 'stretch' }}>
      <div style={{ position: 'absolute', top: lineTop, bottom: lineBottom, left: '50%', width: 2, background: '#e5e7eb', transform: 'translateX(-50%)' }} />
      <div style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </div>
    </div>
  )
}

function StaffAvatar({ initials, deptId }) {
  const color = DEPT_COLORS[deptId] ?? '#9ca3af'
  const bg = deptId === 'SUP' ? '#e0e7ff' : '#f3f4f6'
  return (
    <div style={{ width: 22, height: 22, borderRadius: '50%', border: `2px solid ${color}`, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 8, fontWeight: 700, color: deptId === 'SUP' ? '#002E5A' : '#374151' }}>
      {initials}
    </div>
  )
}

function GuestAvatar() {
  return (
    <div style={{ width: 22, height: 22, borderRadius: '50%', background: '#f3f4f6', border: '2px solid #9ca3af', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11 }}>
      👤
    </div>
  )
}

function AIBadge({ variant }) {
  // variant: 'grey' | 'amber'
  const isAmber = variant === 'amber'
  return (
    <div style={{ background: isAmber ? '#fef3c7' : '#e5e7eb', borderRadius: 4, padding: '2px 3px', fontSize: 8, fontWeight: 700, color: isAmber ? '#92400e' : '#6b7280', width: 22, textAlign: 'center' }}>
      AI
    </div>
  )
}

function CheckDot({ done }) {
  if (done === 'check') {
    return (
      <div style={{ width: 18, height: 18, borderRadius: '50%', border: '2px solid #16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <span style={{ color: '#16a34a', fontSize: 11, lineHeight: 1 }}>✓</span>
      </div>
    )
  }
  if (done === 'pending') {
    return <div style={{ width: 18, height: 18, borderRadius: '50%', border: '2px solid #d1d5db', flexShrink: 0 }} />
  }
  return null
}

function OverflowMenu() {
  const [open, setOpen] = useState(false)

  return (
    <div style={{ position: 'relative', flexShrink: 0 }}>
      <button
        aria-label="AI action menu"
        onClick={() => setOpen(value => !value)}
        style={{
          background: 'transparent',
          border: 0,
          color: '#9ca3af',
          cursor: 'pointer',
          fontSize: 14,
          lineHeight: 1,
          padding: '2px 3px',
        }}
      >
        ···
      </button>
      {open && (
        <div
          style={{
            position: 'absolute',
            right: 0,
            top: 20,
            zIndex: 5,
            minWidth: 86,
            background: 'white',
            border: '1px solid #e5e7eb',
            borderRadius: 6,
            boxShadow: '0 8px 18px rgba(15, 23, 42, 0.12)',
            padding: 4,
          }}
        >
          <button style={menuItemStyle} onClick={() => setOpen(false)}>See why</button>
          <button style={menuItemStyle} onClick={() => setOpen(false)}>Flag this</button>
        </div>
      )}
    </div>
  )
}

const menuItemStyle = {
  display: 'block',
  width: '100%',
  background: 'transparent',
  border: 0,
  borderRadius: 4,
  color: '#374151',
  cursor: 'pointer',
  fontSize: 10,
  padding: '5px 7px',
  textAlign: 'left',
}

function Timestamp({ time }) {
  return (
    <div style={{ fontSize: 9, color: '#9ca3af', marginTop: 2 }}>
      {time} · May 18, 2026
    </div>
  )
}

// ── Card renderers ────────────────────────────────────────────────────────────

function GuestCard({ event, guestName, guestRoom }) {
  return (
    <div style={{ flex: 1, background: 'white', border: '1px solid #e5e7eb', borderRadius: 6, padding: '6px 8px', display: 'flex', alignItems: 'center', gap: 8 }}>
      <div style={{ flex: 1 }}>
        <span style={{ fontSize: 10, fontWeight: 600 }}>{guestName} · {guestRoom}</span>
        <div style={{ fontSize: 10, color: '#374151', marginTop: 1 }}>{event.text}</div>
        <Timestamp time={event.time} />
      </div>
      <CheckDot done="check" />
    </div>
  )
}

function AIGreyCard({ event }) {
  return (
    <div style={{ flex: 1, background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: 6, padding: '6px 8px', display: 'flex', alignItems: 'center', gap: 8 }}>
      <div style={{ fontSize: 10, color: '#374151', flex: 1 }}>
        {event.text}
        <Timestamp time={event.time} />
      </div>
      <OverflowMenu />
    </div>
  )
}

function AIAmberCard({ event }) {
  return (
    <div style={{ flex: 1, background: '#fffbeb', border: '1px solid #fde68a', borderRadius: 6, padding: '6px 8px', display: 'flex', alignItems: 'center', gap: 8 }}>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 10, fontWeight: 600, color: '#92400e' }}>{event.text}</div>
        {event.detail && <div style={{ fontSize: 10, color: '#374151', marginTop: 1 }}>{event.detail}</div>}
        <Timestamp time={event.time} />
      </div>
    </div>
  )
}

function findTeamTicketForEvent(teamTickets, event) {
  return teamTickets.find(ticket => ticket.sourceEventId === event.id)
}

function StaffCard({ event, teamTicket, onTeamTicketPress }) {
  const isActive   = event.status === 'active'
  const isComplete = event.status === 'complete'
  const interactive = Boolean(teamTicket && onTeamTicketPress)
  const Component = interactive ? 'button' : 'div'

  return (
    <Component
      type={interactive ? 'button' : undefined}
      onClick={interactive ? () => onTeamTicketPress(teamTicket) : undefined}
      style={{
        flex: 1,
        background: 'white',
        border: isActive ? '2px solid #002E5A' : '1px solid #e5e7eb',
        borderRadius: 6,
        padding: '6px 8px',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        cursor: interactive ? 'pointer' : 'default',
        textAlign: 'left',
      }}
    >
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <span style={{ fontSize: 10, fontWeight: 600 }}>{event.name}</span>
          {isActive && (
            <span style={{ fontSize: 8, fontWeight: 700, background: '#dbeafe', color: '#002E5A', padding: '1px 5px', borderRadius: 4 }}>
              ACTIVE
            </span>
          )}
          {isComplete && (
            <span style={{ fontSize: 8, fontWeight: 700, background: '#dcfce7', color: '#15803d', padding: '1px 5px', borderRadius: 4 }}>
              COMPLETE
            </span>
          )}
        </div>
        <div style={{ fontSize: 10, color: '#6b7280', marginTop: 1 }}>{event.role}</div>
        <div style={{ fontSize: 10, color: '#374151', marginTop: 1 }}>{event.action}</div>
        {event.detail && <div style={{ fontSize: 10, color: '#374151', marginTop: 1 }}>{event.detail}</div>}
        <Timestamp time={event.time} />
      </div>
      <CheckDot done={event.status === 'complete' ? 'check' : 'pending'} />
    </Component>
  )
}

// ── Main component ────────────────────────────────────────────────────────────

export function TicketChain({ timeline, teamTickets = [], guest, room, onTeamTicketPress }) {
  const last = timeline.length - 1

  return (
    <div style={{ background: 'white', padding: '10px 12px', overflowY: 'auto', height: '100%' }}>
      {timeline.map((event, i) => {
        const position = i === 0 ? 'first' : i === last ? 'last' : 'middle'

        if (event.type === 'guest') {
          return (
            <div key={event.id} style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
              <ConnectorLeft position={position}><GuestAvatar /></ConnectorLeft>
              <GuestCard event={event} guestName={guest} guestRoom={room} />
            </div>
          )
        }

        if (event.type === 'ai_action') {
          const isAmber = event.subtype === 'resolution_check'
          return (
            <div key={event.id} style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
              <ConnectorLeft position={position}><AIBadge variant={isAmber ? 'amber' : 'grey'} /></ConnectorLeft>
              {isAmber ? <AIAmberCard event={event} /> : <AIGreyCard event={event} />}
            </div>
          )
        }

        if (event.type === 'staff_step') {
          const teamTicket = findTeamTicketForEvent(teamTickets, event)

          return (
            <div key={event.id} style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
              <ConnectorLeft position={position}>
                <StaffAvatar initials={event.initials} deptId={event.deptId} />
              </ConnectorLeft>
              <StaffCard event={event} teamTicket={teamTicket} onTeamTicketPress={onTeamTicketPress} />
            </div>
          )
        }

        return null
      })}

      <button style={{ width: '100%', background: 'white', color: '#6b7280', border: '1px dashed #d1d5db', borderRadius: 8, padding: 7, fontSize: 11, marginTop: 4 }}>
        + Add Ticket
      </button>
    </div>
  )
}
