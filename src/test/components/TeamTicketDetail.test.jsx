import { describe, it, expect, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { TeamTicketDetail } from '../../components/issues/TeamTicketDetail'
import { commitments } from '../../data/scenario'

const ticket = commitments.acComp.teamTickets?.[3]

describe('TeamTicketDetail', () => {
  it('renders team ticket ownership, status, source customer ticket, and task detail', () => {
    render(
      <TeamTicketDetail
        teamTicket={ticket}
        originTicket={commitments.acComp.originTicket}
        onBackToCustomerTicket={() => {}}
        onClose={() => {}}
      />,
    )

    expect(screen.getByText('Team Ticket')).toBeInTheDocument()
    expect(screen.getByText('Authorize compensation')).toBeInTheDocument()
    expect(screen.getByText('Sarah M.')).toBeInTheDocument()
    expect(screen.getAllByText('Supervisor').length).toBeGreaterThanOrEqual(1)
    expect(screen.getByText('Active')).toBeInTheDocument()
    expect(screen.getByText('Guest requests compensation after room move')).toBeInTheDocument()
    expect(screen.getByText(/Review context and authorize guest recovery/)).toBeInTheDocument()
    expect(screen.getByText('Awaiting completion')).toBeInTheDocument()
  })

  it('backs to the customer ticket via ← Issue Overview', () => {
    const onBackToCustomerTicket = vi.fn()

    render(
      <TeamTicketDetail
        teamTicket={ticket}
        originTicket={commitments.acComp.originTicket}
        onBackToCustomerTicket={onBackToCustomerTicket}
      />,
    )

    fireEvent.click(screen.getByText('← Issue Overview'))

    expect(onBackToCustomerTicket).toHaveBeenCalledTimes(1)
  })
})
