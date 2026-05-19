// src/components/issues/MessagesPanel.jsx
// Staff coordination thread. Left-aligned for incoming staff messages,
// right-aligned (cobalt) for outgoing (current user), centered for system events.

const DEPT_COLORS = {
  FD: '#3B82F6', HK: '#A855F7', ME: '#F97316',
  FB: '#F59E0B', RW: '#14B8A6', SEC: '#64748B', SUP: '#002E5A',
}

function MiniAvatar({ initials, deptId }) {
  const color = DEPT_COLORS[deptId] ?? '#9ca3af'
  return (
    <div style={{ width: 24, height: 24, borderRadius: '50%', border: `2px solid ${color}`, background: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 8, fontWeight: 700, color: '#374151', flexShrink: 0 }}>
      {initials}
    </div>
  )
}

function StaffBubble({ msg }) {
  return (
    <div style={{ display: 'flex', gap: 6, marginBottom: 10, alignItems: 'flex-start' }}>
      <MiniAvatar initials={msg.initials} deptId={msg.deptId} />
      <div>
        <div style={{ fontSize: 9, color: '#6b7280', marginBottom: 2 }}><span>{msg.name}</span>{' · '}{msg.time}</div>
        <div style={{ background: '#f3f4f6', borderRadius: '0 10px 10px 10px', padding: '6px 10px', fontSize: 11, color: '#111827', maxWidth: 220 }}>
          {msg.text}
        </div>
      </div>
    </div>
  )
}

function YouBubble({ msg }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 10 }}>
      <div>
        <div style={{ fontSize: 9, color: '#6b7280', marginBottom: 2, textAlign: 'right' }}>You · {msg.time}</div>
        <div style={{ background: '#002E5A', borderRadius: '10px 0 10px 10px', padding: '6px 10px', fontSize: 11, color: 'white', maxWidth: 220 }}>
          {msg.text}
        </div>
      </div>
    </div>
  )
}

function SystemEvent({ msg }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 10 }}>
      <span style={{ fontSize: 9, color: '#6b7280', background: '#f3f4f6', borderRadius: 12, padding: '3px 10px' }}>
        {msg.text}
      </span>
    </div>
  )
}

export function MessagesPanel({ thread }) {
  return (
    <div style={{ background: 'white', padding: '10px 12px', overflowY: 'auto', height: '100%' }}>
      {thread.map(msg => {
        if (msg.type === 'system') return <SystemEvent key={msg.id} msg={msg} />
        if (msg.type === 'you')    return <YouBubble   key={msg.id} msg={msg} />
        return <StaffBubble key={msg.id} msg={msg} />
      })}
      <button style={{ width: '100%', background: 'white', color: '#6b7280', border: '1px dashed #d1d5db', borderRadius: 8, padding: 7, fontSize: 11, marginTop: 4 }}>
        + Add Message
      </button>
    </div>
  )
}
