import { describe, it, expect, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { OriginTicketDetail } from '../../components/issues/OriginTicketDetail'
import { commitments } from '../../data/scenario'

const commitment = commitments.acComp

describe('OriginTicketDetail', () => {
  it('renders sections in correct order: guest, customer ticket, reservation, linked ticket, team tickets', () => {
    const { container } = render(
      <OriginTicketDetail
        commitment={commitment}
        originEvent={commitment.timeline[0]}
        onBack={() => {}}
        onTeamTicketPress={() => {}}
        onLinkedTicketPress={() => {}}
      />,
    )

    const sections = container.querySelectorAll('section')
    // sections[0] = guest, sections[1] = customer ticket, sections[2] = reservation, etc.
    // Order: Guest → Active Reservation → Customer Ticket → Linked Ticket → Team Tickets
    const guestSection = sections[0]
    const reservationSection = sections[1]
    const customerTicketSection = sections[2]
    const linkedTicketSection = sections[3]
    const teamTicketsSection = sections[4]

    expect(guestSection.textContent).toContain('Alex Chen')
    expect(reservationSection.textContent).toContain('Active Reservation')
    expect(customerTicketSection.textContent).toContain('Customer Ticket')
    expect(linkedTicketSection.textContent).toContain('Linked Ticket')
    expect(teamTicketsSection.textContent).toContain('Team Tickets')
  })

  it('renders customer ticket and active reservation details', () => {
    render(
      <OriginTicketDetail
        commitment={commitment}
        originEvent={commitment.timeline[0]}
        onBack={() => {}}
        onTeamTicketPress={() => {}}
        onLinkedTicketPress={() => {}}
      />,
    )

    expect(screen.getByText('Guest Ticket')).toBeInTheDocument()
    expect(screen.getByText('Diamond')).toBeInTheDocument()
    expect(screen.getAllByText('Alex Chen').length).toBeGreaterThanOrEqual(2)
    expect(screen.getByText('View in PMS →')).toBeInTheDocument()
    expect(screen.getByText('Customer Ticket')).toBeInTheDocument()
    expect(screen.getByText('Guest requests compensation after room move')).toBeInTheDocument()
    expect(screen.getByText(/Guest was relocated to Room 408/)).toBeInTheDocument()
    expect(screen.getByText('AI-created')).toBeInTheDocument()
    expect(screen.getByText('May 17, 2026')).toBeInTheDocument()
    expect(screen.getByText('May 20, 2026')).toBeInTheDocument()
    expect(screen.getByText('AAA Rate')).toBeInTheDocument()
  })

  it('renders linked ticket as collapsed summary row (not expanded details)', () => {
    render(
      <OriginTicketDetail
        commitment={commitment}
        originEvent={commitment.timeline[0]}
        onBack={() => {}}
        onTeamTicketPress={() => {}}
        onLinkedTicketPress={() => {}}
      />,
    )

    expect(screen.getByText(/Linked Ticket/)).toBeInTheDocument()
    expect(screen.getByText('Room 410 reports noisy AC next door')).toBeInTheDocument()
    // Linked ticket should NOT show expanded reason text
    expect(screen.queryByText(/relocation created downstream/)).not.toBeInTheDocument()
  })

  it('calls onLinkedTicketPress when linked ticket row is clicked', () => {
    const onLinkedTicketPress = vi.fn()

    render(
      <OriginTicketDetail
        commitment={commitment}
        originEvent={commitment.timeline[0]}
        onBack={() => {}}
        onTeamTicketPress={() => {}}
        onLinkedTicketPress={onLinkedTicketPress}
      />,
    )

    const linkedTicketRow = screen.getByText('Room 410 reports noisy AC next door').closest('button')
    fireEvent.click(linkedTicketRow)

    expect(onLinkedTicketPress).toHaveBeenCalledTimes(1)
    expect(onLinkedTicketPress).toHaveBeenCalledWith(commitment.linkedTicket)
  })

  it('renders team tickets as clickable rows with count in label', () => {
    render(
      <OriginTicketDetail
        commitment={commitment}
        originEvent={commitment.timeline[0]}
        onBack={() => {}}
        onTeamTicketPress={() => {}}
        onLinkedTicketPress={() => {}}
      />,
    )

    expect(screen.getByText(`Team Tickets (${commitment.teamTickets.length})`)).toBeInTheDocument()
    expect(screen.getByText('Diagnose noisy AC issue')).toBeInTheDocument()
    expect(screen.getByText('Prep alternate room')).toBeInTheDocument()
    expect(screen.getByText('Relocate guest and capture sentiment')).toBeInTheDocument()
    expect(screen.getByText('Authorize compensation')).toBeInTheDocument()
  })

  it('calls onTeamTicketPress when team ticket row is clicked', () => {
    const onTeamTicketPress = vi.fn()

    render(
      <OriginTicketDetail
        commitment={commitment}
        originEvent={commitment.timeline[0]}
        onBack={() => {}}
        onTeamTicketPress={onTeamTicketPress}
        onLinkedTicketPress={() => {}}
      />,
    )

    const teamTicketRow = screen.getByText('Diagnose noisy AC issue').closest('button')
    fireEvent.click(teamTicketRow)

    expect(onTeamTicketPress).toHaveBeenCalledTimes(1)
    expect(onTeamTicketPress).toHaveBeenCalledWith(expect.objectContaining({
      title: 'Diagnose noisy AC issue'
    }))
  })

  it('calls onBack from the nav back button', () => {
    const onBack = vi.fn()

    render(
      <OriginTicketDetail
        commitment={commitment}
        originEvent={commitment.timeline[0]}
        onBack={onBack}
        onTeamTicketPress={() => {}}
        onLinkedTicketPress={() => {}}
      />,
    )

    fireEvent.click(screen.getByText('← Ticket'))

    expect(onBack).toHaveBeenCalledTimes(1)
  })
})
