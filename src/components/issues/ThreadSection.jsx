import { Avatar } from '@/components/shared/Avatar'

function GuestBubble({ message }) {
  return (
    <div className="flex justify-start mb-3">
      <div className="max-w-[80%]">
        <p className="text-[10px] text-muted-foreground mb-1">Guest · {message.time}</p>
        <div className="bg-muted rounded-2xl rounded-tl-sm px-3 py-2">
          <p className="text-sm text-foreground">"{message.text}"</p>
        </div>
      </div>
    </div>
  )
}

function StaffBubble({ message }) {
  return (
    <div className="flex gap-2.5 mb-3">
      <Avatar initials={message.initials} deptId={message.deptId} status="complete" size="sm" />
      <div className="flex-1 min-w-0">
        <p className="text-[10px] text-muted-foreground mb-1">{message.name} · {message.time}</p>
        <div className="bg-white border border-border rounded-2xl rounded-tl-sm px-3 py-2 inline-block max-w-full">
          <p className="text-sm text-foreground">{message.text}</p>
        </div>
        {message.hasPhoto && (
          <div className="mt-2 rounded-xl overflow-hidden bg-secondary h-28 flex items-center justify-center border border-border max-w-[200px]">
            <div className="text-center px-2">
              <div className="text-2xl mb-1">{message.photoEmoji}</div>
              <p className="text-[10px] text-muted-foreground font-medium">{message.photoCaption}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function SystemEvent({ message }) {
  if (message.isEscalation) {
    return (
      <div className="mb-3 px-3 py-2 bg-destructive/10 border border-destructive/20 rounded-lg">
        <p className="text-xs text-destructive font-medium text-center">{message.text}</p>
        <p className="text-[10px] text-destructive/70 text-center mt-0.5">{message.time}</p>
      </div>
    )
  }
  return (
    <div className="mb-3 px-3 py-1.5">
      <p className="text-[11px] text-muted-foreground italic text-center leading-snug">{message.text}</p>
      <p className="text-[10px] text-muted-foreground/60 text-center mt-0.5">{message.time}</p>
    </div>
  )
}

export function ThreadSection({ messages }) {
  return (
    <div>
      <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-3">Thread</p>
      <div>
        {messages.map(msg => {
          if (msg.type === 'guest') return <GuestBubble key={msg.id} message={msg} />
          if (msg.type === 'staff') return <StaffBubble key={msg.id} message={msg} />
          return <SystemEvent key={msg.id} message={msg} />
        })}
      </div>
    </div>
  )
}
