import { DEPT } from '@/data/scenario'

function DeptSquare({ deptId, status }) {
  const color = DEPT[deptId]?.color ?? '#9ca3af'
  const abbr  = deptId.slice(0, 3)

  const isComplete = status === 'complete'
  const isPending  = status === 'pending' || status === 'skipped'

  return (
    <div
      style={{
        width: 22,
        height: 22,
        borderRadius: 3,
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: isComplete ? '#e5e7eb' : color,
        opacity: isPending ? 0.3 : 1,
      }}
    >
      {isComplete ? (
        <span style={{ fontSize: 9, color: '#6b7280', fontWeight: 700 }}>✓</span>
      ) : (
        <span style={{ fontSize: abbr.length > 2 ? 6 : 7, color: 'white', fontWeight: 700, letterSpacing: -0.2 }}>
          {abbr}
        </span>
      )}
    </div>
  )
}

export function DeptChain({ steps }) {
  if (!steps?.length) return null

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
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
