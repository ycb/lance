import { Avatar } from './Avatar'

export function MiniChain({ steps }) {
  return (
    <div className="flex items-center gap-1 mt-2.5">
      {steps.map((step, i) => (
        <div key={step.id} className="flex items-center gap-1">
          <Avatar
            initials={step.initials}
            deptId={step.deptId}
            status={step.status}
            size="sm"
          />
          {i < steps.length - 1 && (
            <div
              data-testid="chain-connector"
              className="w-4 h-px bg-gray-300"
            />
          )}
        </div>
      ))}
    </div>
  )
}
