export function PhoneFrame({ children }) {
  return (
    <div className="min-h-screen bg-gray-800 flex items-center justify-center p-8">
      <div
        className="relative bg-white overflow-hidden shadow-2xl"
        style={{
          width: '390px',
          height: '844px',
          borderRadius: '44px',
          outline: '10px solid #1a1a1a',
        }}
      >
        {/* status bar */}
        <div className="absolute top-0 left-0 right-0 h-12 flex items-center justify-between px-8 z-10 pointer-events-none">
          <span className="text-xs font-semibold text-gray-900">9:41</span>
          <div className="w-24 h-6 bg-black rounded-full" />
          <div className="flex gap-1 items-center">
            <svg className="w-4 h-3 text-gray-900" fill="currentColor" viewBox="0 0 20 12">
              <rect x="0" y="3" width="4" height="9" rx="1" />
              <rect x="5.5" y="2" width="4" height="10" rx="1" />
              <rect x="11" y="0" width="4" height="12" rx="1" />
              <rect x="16.5" y="0" width="3" height="12" rx="1" opacity="0.3"/>
            </svg>
            <svg className="w-6 h-3 text-gray-900" fill="currentColor" viewBox="0 0 24 12">
              <rect x="0" y="1" width="20" height="10" rx="2" stroke="currentColor" strokeWidth="1" fill="none"/>
              <rect x="1.5" y="2.5" width="14" height="7" rx="1" />
              <path d="M21 4v4a2 2 0 000-4z" />
            </svg>
          </div>
        </div>
        {/* content area */}
        <div className="absolute inset-0 top-12 overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  )
}
