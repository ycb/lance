// src/test/components/TicketChain.test.jsx
import { describe, it, expect, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { TicketChain } from '../../components/issues/TicketChain'
import { commitments } from '../../data/scenario'

const { acComp } = commitments

describe('TicketChain', () => {
  it('renders guest card with name and description', () => {
    render(<TicketChain timeline={acComp.timeline} guest={acComp.guest} room={acComp.room} />)
    expect(screen.getByText('Nina Patel · Rm 408')).toBeInTheDocument()
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

  it('opens an overflow menu on standard grey AI action items', () => {
    render(<TicketChain timeline={acComp.timeline} guest={acComp.guest} room={acComp.room} />)

    fireEvent.click(screen.getAllByLabelText('AI action menu')[0])

    expect(screen.getByText('See why')).toBeInTheDocument()
    expect(screen.getByText('Flag this')).toBeInTheDocument()
  })

  it('does not render a pending team-ticket circle on the resolution check AI action', () => {
    const { container } = render(<TicketChain timeline={acComp.timeline} guest={acComp.guest} room={acComp.room} />)

    const pendingCircles = Array.from(container.querySelectorAll('div')).filter(node =>
      node.getAttribute('style')?.includes('border: 2px solid rgb(209, 213, 219)')
    )

    expect(pendingCircles).toHaveLength(1)
  })

  it('calls onTeamTicketPress when a staff team ticket is clicked', () => {
    const onTeamTicketPress = vi.fn()

    render(
      <TicketChain
        timeline={acComp.timeline}
        teamTickets={acComp.teamTickets}
        guest={acComp.guest}
        room={acComp.room}
        onTeamTicketPress={onTeamTicketPress}
      />,
    )

    fireEvent.click(screen.getByText('Authorize comp · Room 408'))

    expect(onTeamTicketPress).toHaveBeenCalledWith(
      expect.objectContaining({ id: 'TT-004', title: 'Authorize compensation' }),
    )
  })
})
