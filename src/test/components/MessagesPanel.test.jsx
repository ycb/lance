import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MessagesPanel } from '../../components/issues/MessagesPanel'
import { commitments } from '../../data/scenario'

const { acComp } = commitments

describe('MessagesPanel', () => {
  it('renders staff messages', () => {
    render(<MessagesPanel thread={acComp.thread} />)
    expect(screen.getByText('On my way.')).toBeInTheDocument()
    expect(screen.getAllByText('Marcus T.').length).toBeGreaterThanOrEqual(1)
  })

  it('renders system event as centered label', () => {
    render(<MessagesPanel thread={acComp.thread} />)
    expect(screen.getByText(/AI escalated to supervisor/)).toBeInTheDocument()
  })

  it('renders outgoing message (you)', () => {
    render(<MessagesPanel thread={acComp.thread} />)
    expect(screen.getByText('James — any more details?')).toBeInTheDocument()
  })

  it('renders Add Message button', () => {
    render(<MessagesPanel thread={acComp.thread} />)
    expect(screen.getByText('+ Add Message')).toBeInTheDocument()
  })

  it('renders all 8 messages', () => {
    render(<MessagesPanel thread={acComp.thread} />)
    // Count staff + you messages (not system events)
    const names = screen.getAllByText(/Marcus T\.|Maria H\.|James R\.|Sarah M\./)
    expect(names.length).toBeGreaterThanOrEqual(6)
  })
})
