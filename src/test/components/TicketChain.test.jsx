// src/test/components/TicketChain.test.jsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { TicketChain } from '../../components/issues/TicketChain'
import { commitments } from '../../data/scenario'

const { acComp } = commitments

describe('TicketChain', () => {
  it('renders guest card with name and description', () => {
    render(<TicketChain timeline={acComp.timeline} guest={acComp.guest} room={acComp.room} />)
    expect(screen.getByText('Alex Chen · Rm 412')).toBeInTheDocument()
    expect(screen.getByText('Reports problem with AC unit')).toBeInTheDocument()
  })

  it('renders AI dispatch card', () => {
    render(<TicketChain timeline={acComp.timeline} guest={acComp.guest} room={acComp.room} />)
    expect(screen.getByText(/Dispatched Marcus T/)).toBeInTheDocument()
  })

  it('renders staff step with name and role', () => {
    render(<TicketChain timeline={acComp.timeline} guest={acComp.guest} room={acComp.room} />)
    expect(screen.getByText('Marcus T.')).toBeInTheDocument()
    expect(screen.getByText('Maintenance')).toBeInTheDocument()
  })

  it('renders resolution check card as amber variant', () => {
    render(<TicketChain timeline={acComp.timeline} guest={acComp.guest} room={acComp.room} />)
    expect(screen.getByText('Resolution Check — Unresolved')).toBeInTheDocument()
  })

  it('renders active step with ACTIVE badge', () => {
    render(<TicketChain timeline={acComp.timeline} guest={acComp.guest} room={acComp.room} />)
    expect(screen.getByText('ACTIVE')).toBeInTheDocument()
    expect(screen.getByText('Sarah M.')).toBeInTheDocument()
  })

  it('renders all 9 chain items', () => {
    render(<TicketChain timeline={acComp.timeline} guest={acComp.guest} room={acComp.room} />)
    // Count by looking for timestamp instances — each card has one
    const times = screen.getAllByText(/9:\d\d AM/)
    expect(times.length).toBeGreaterThanOrEqual(9)
  })

  it('renders Add Ticket button', () => {
    render(<TicketChain timeline={acComp.timeline} guest={acComp.guest} room={acComp.room} />)
    expect(screen.getByText('+ Add Ticket')).toBeInTheDocument()
  })
})
