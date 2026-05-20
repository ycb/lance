const FILTERS = [
  { id: 'critical',    label: 'Critical'    },
  { id: 'in-progress', label: 'In Progress' },
  { id: 'resolved',    label: 'Resolved'    },
]

export function IssueFilters({ value, onChange, counts = {} }) {
  return (
    <div style={{ background: 'white', borderBottom: '1px solid #e5e7eb' }}>
      <div style={{ display: 'flex', justifyContent: 'space-around', padding: '0 8px' }}>
        {FILTERS.map(f => {
          const isActive = value === f.id
          const count = counts[f.id]
          return (
            <button
              key={f.id}
              onClick={() => onChange(f.id)}
              style={{
                padding: '9px 4px',
                fontSize: 11,
                fontWeight: isActive ? 700 : 400,
                color: isActive ? '#002E5A' : '#6b7280',
                border: 'none',
                borderBottom: isActive ? '2px solid #002E5A' : '2px solid transparent',
                marginBottom: -1,
                background: 'none',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
            >
              {f.id !== 'all' && count != null ? `${f.label} (${count})` : f.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
