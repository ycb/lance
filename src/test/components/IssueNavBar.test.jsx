import { describe, it, expect, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { IssueNavBar } from '../../components/issues/IssueNavBar'
import { commitments } from '../../data/scenario'

const commitment = commitments.acComp

describe('IssueNavBar', () => {
  it('renders loyalty, reservation context, ticket metadata, and AI summary', () => {
    const { container } = render(
      <IssueNavBar
        guest={commitment.guest}
        room={commitment.room}
        loyaltyTier="diamond"
        elapsed={commitment.elapsed}
        checkIn="May 17"
        nights={3}
        ticketStats={{ total: 2, open: 1 }}
        requestStats={{ total: 2, open: 1 }}
        originTicket={commitment.originTicket}
        linkedTicket={commitment.linkedTicket}
        teamTickets={commitment.teamTickets}
        originEvent={commitment.timeline[0]}
        originChannel="App"
        aiSummary={commitment.summaryBrief}
        onBack={() => {}}
        onOriginTicketPress={() => {}}
      />,
    )

    expect(screen.getByText('Nina Patel · Rm 408')).toBeInTheDocument()
    expect(screen.getByText('Diamond')).toBeInTheDocument()
    expect(container.querySelector('[data-testid="nav-loyalty-slot"]')).toContainElement(screen.getByText('Diamond'))
    expect(screen.getByText('Check-in May 17 · 3 nights · 2 requests | 1 open')).toBeInTheDocument()
    expect(screen.getByText('Guest requests compensation after room move')).toBeInTheDocument()
    expect(screen.getByText('AI-created · App · 9:35 AM · May 18')).toBeInTheDocument()
    expect(screen.getByText('Linked to T002')).toBeInTheDocument()
    expect(screen.queryByText(/2 tickets \| 1 open/)).not.toBeInTheDocument()
    expect(screen.queryByText('Reports problem with AC unit')).not.toBeInTheDocument()
    expect(screen.getByText(/Guest relocated to Room 408/)).toBeInTheDocument()
  })

  it('calls onOriginTicketPress from the ticket rows', () => {
    const onOriginTicketPress = vi.fn()

    render(
      <IssueNavBar
        guest={commitment.guest}
        room={commitment.room}
        loyaltyTier="diamond"
        elapsed={commitment.elapsed}
        checkIn="May 17"
        nights={3}
        ticketStats={{ total: 2, open: 1 }}
        requestStats={{ total: 2, open: 1 }}
        originTicket={commitment.originTicket}
        linkedTicket={commitment.linkedTicket}
        teamTickets={commitment.teamTickets}
        originEvent={commitment.timeline[0]}
        originChannel="App"
        aiSummary={commitment.summaryBrief}
        onBack={() => {}}
        onOriginTicketPress={onOriginTicketPress}
      />,
    )

    fireEvent.click(screen.getByText('Guest requests compensation after room move'))

    expect(onOriginTicketPress).toHaveBeenCalledTimes(1)
  })

  it('calls onOriginTicketPress from the whole issue summary item', () => {
    const onOriginTicketPress = vi.fn()

    render(
      <IssueNavBar
        guest={commitment.guest}
        room={commitment.room}
        loyaltyTier="diamond"
        elapsed={commitment.elapsed}
        checkIn="May 17"
        nights={3}
        ticketStats={{ total: 2, open: 1 }}
        requestStats={{ total: 2, open: 1 }}
        originTicket={commitment.originTicket}
        linkedTicket={commitment.linkedTicket}
        teamTickets={commitment.teamTickets}
        originEvent={commitment.timeline[0]}
        originChannel="App"
        aiSummary={commitment.summaryBrief}
        onBack={() => {}}
        onOriginTicketPress={onOriginTicketPress}
      />,
    )

    fireEvent.click(screen.getByText('Nina Patel · Rm 408'))
    fireEvent.click(screen.getByText(/Guest relocated to Room 408/))

    expect(onOriginTicketPress).toHaveBeenCalledTimes(2)
  })

  it('does not show a nested row chevron that implies only the title row is tappable', () => {
    render(
      <IssueNavBar
        guest={commitment.guest}
        room={commitment.room}
        loyaltyTier="diamond"
        elapsed={commitment.elapsed}
        checkIn="May 17"
        nights={3}
        ticketStats={{ total: 2, open: 1 }}
        requestStats={{ total: 2, open: 1 }}
        originTicket={commitment.originTicket}
        linkedTicket={commitment.linkedTicket}
        teamTickets={commitment.teamTickets}
        originEvent={commitment.timeline[0]}
        originChannel="App"
        aiSummary={commitment.summaryBrief}
        onBack={() => {}}
        onOriginTicketPress={() => {}}
      />,
    )

    expect(screen.queryByText('›')).not.toBeInTheDocument()
  })

  it('uses an at-rest whole-surface affordance without extra action copy or icons', () => {
    const onOriginTicketPress = vi.fn()

    const { container } = render(
      <IssueNavBar
        guest={commitment.guest}
        room={commitment.room}
        loyaltyTier="diamond"
        elapsed={commitment.elapsed}
        checkIn="May 17"
        nights={3}
        ticketStats={{ total: 2, open: 1 }}
        requestStats={{ total: 2, open: 1 }}
        originTicket={commitment.originTicket}
        linkedTicket={commitment.linkedTicket}
        teamTickets={commitment.teamTickets}
        originEvent={commitment.timeline[0]}
        originChannel="App"
        aiSummary={commitment.summaryBrief}
        onBack={() => {}}
        onOriginTicketPress={onOriginTicketPress}
      />,
    )

    expect(screen.queryByText('View ticket')).not.toBeInTheDocument()
    expect(screen.queryByTestId('ticket-detail-affordance')).not.toBeInTheDocument()
    expect(screen.getByTestId('origin-ticket-surface')).toBeInTheDocument()
    expect(screen.getByTestId('origin-ticket-surface').style.background).toBe('white')
    expect(container.firstChild).toHaveClass('active:bg-gray-100')
    expect(container.firstChild).toHaveClass('hover:bg-gray-50')

    fireEvent.click(screen.getByText('Nina Patel · Rm 408'))

    expect(onOriginTicketPress).toHaveBeenCalledTimes(1)
  })
})
