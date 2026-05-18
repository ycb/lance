import { DEPARTMENTS } from '../data/scenario'

export function TeamStrip() {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none px-4">
      {DEPARTMENTS.map(dept => (
        <div
          key={dept.id}
          className="flex items-center gap-1.5 shrink-0 px-3 py-1.5 rounded-full bg-white shadow-sm border border-gray-100"
        >
          <span
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: dept.color }}
          />
          <span className="text-xs font-medium text-gray-700">{dept.abbr}</span>
          <span className="text-xs text-gray-400">{dept.count}</span>
        </div>
      ))}
    </div>
  )
}
