import { DEPT } from '@/data/scenario'

function DeptSquare({ deptId, status }) {
  const dept  = DEPT[deptId]
  const color = dept?.color ?? '#9ca3af'
  const abbr  = dept?.abbr ?? deptId.slice(0, 2)

  const isActive  = status === 'active' || status === 'escalated'
  const isPending = status === 'pending' || status === 'skipped'

  return (
    <div
      style={{
        width: 28,
        height: 28,
        borderRadius: 3,
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: color,
        opacity: isPending ? 0.3 : 1,
        outline: isActive ? '2px solid white' : 'none',
        outlineOffset: 1,
        boxShadow: isActive ? `0 0 0 3px ${color}` : 'none',
      }}
    >
      <span style={{ fontSize: abbr.length === 1 ? 12 : 9, color: 'white', fontWeight: 700, letterSpacing: -0.2 }}>
        {abbr}
      </span>
    </div>
  )
}

export function DeptChain({ steps }) {
  if (!steps?.length) return null

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {steps.map((step, i) => (
        <div key={step.id} style={{ display: 'flex', alignItems: 'center' }}>
          <DeptSquare deptId={step.deptId} status={step.status} />
          {i < steps.length - 1 && (
            <div style={{ width: 10, height: 1, background: '#d1d5db', flexShrink: 0 }} />
          )}
        </div>
      ))}
    </div>
  )
}
