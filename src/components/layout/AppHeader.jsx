// src/components/layout/AppHeader.jsx
// Global app header — identical on every screen.
// Cobalt background, Hilton logo, hotel name, SM avatar with notification badge.

export function AppHeader() {
  return (
    <div
      className="shrink-0 flex items-center px-4 py-2.5 gap-3"
      style={{ background: '#002E5A' }}
    >
      <img
        src="/logo.png"
        alt="Hilton"
        className="w-8 h-8 rounded shrink-0 object-cover"
      />
      <div className="flex-1 min-w-0">
        <p className="text-white font-bold text-xs leading-snug">
          Hilton San Francisco Union Square
        </p>
      </div>
      <div className="relative shrink-0">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
          style={{ background: 'rgba(255,255,255,0.15)' }}
        >
          SM
        </div>
        <div
          className="absolute -top-0.5 -right-0.5 min-w-[16px] h-4 rounded-full flex items-center justify-center text-white font-bold border"
          style={{ background: '#B71234', borderColor: '#002E5A', fontSize: '9px', padding: '0 3px' }}
        >
          1
        </div>
      </div>
    </div>
  )
}
