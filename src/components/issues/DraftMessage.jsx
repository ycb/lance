import { useState } from 'react'
import { Textarea } from '@/components/ui/textarea'

export function DraftMessage({ initialText }) {
  const [text, setText] = useState(initialText)
  const [editing, setEditing] = useState(false)

  return (
    <div className="rounded-lg border border-border overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2.5 bg-muted/40 border-b border-border">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Draft Guest Message</p>
        <button
          className="text-xs text-primary font-medium"
          onClick={() => setEditing(e => !e)}
        >
          {editing ? 'Done' : 'Edit'}
        </button>
      </div>
      <div className="px-4 py-3">
        {editing ? (
          <Textarea
            value={text}
            onChange={e => setText(e.target.value)}
            className="text-sm min-h-[120px] resize-none border-0 p-0 focus-visible:ring-0"
          />
        ) : (
          <p className="text-sm text-foreground whitespace-pre-line leading-relaxed">{text}</p>
        )}
      </div>
    </div>
  )
}
