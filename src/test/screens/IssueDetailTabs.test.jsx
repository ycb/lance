import { beforeEach, describe, expect, it } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { IssueDetail } from '../../screens/IssueDetail'
import { DEMO_STATES, useDemoFlow } from '../../store/demoFlow'

beforeEach(() => {
  useDemoFlow.setState({ currentIndex: 1, currentState: DEMO_STATES[1] })
})

describe('IssueDetail tabs', () => {
  it('renders demo-aligned tab labels and counts', () => {
    render(<IssueDetail />)

    expect(screen.getByText('Team Tickets (4)')).toBeInTheDocument()
    expect(screen.getByText('Messages (7)')).toBeInTheDocument()
    expect(screen.getByText('Photos (2)')).toBeInTheDocument()
  })

  it('renders sample photos in the Photos tab', () => {
    render(<IssueDetail />)

    fireEvent.click(screen.getByText('Photos (2)'))

    expect(screen.getByText('Room 408 — ready')).toBeInTheDocument()
    expect(screen.getByText('AC compressor label')).toBeInTheDocument()
  })

  it('opens team ticket from tab and backs to issue overview (not ticket details)', () => {
    render(<IssueDetail />)

    fireEvent.click(screen.getByText('Authorize comp · Room 408'))

    expect(screen.getByText('Team Ticket')).toBeInTheDocument()
    expect(screen.getByText('Authorize compensation')).toBeInTheDocument()

    fireEvent.click(screen.getByText('← Issue Overview'))

    // Should return to issue overview, not ticket details
    expect(screen.getByText('Team Tickets (4)')).toBeInTheDocument()
    expect(screen.queryByText('Customer Ticket')).not.toBeInTheDocument()
  })

  it('opens team ticket from ticket details and backs to ticket details', () => {
    render(<IssueDetail />)

    // Open ticket details first
    fireEvent.click(screen.getByText('Guest requests compensation after room move'))
    expect(screen.getByText('Ticket Details')).toBeInTheDocument()

    // Open a team ticket from within ticket details
    fireEvent.click(screen.getByText('Authorize compensation'))
    expect(screen.getByText('Team Ticket')).toBeInTheDocument()

    // Back should return to ticket details (use last back button — TeamTicketDetail overlays OriginTicketDetail)
    const backButtons = screen.getAllByText('← Issue Overview')
    fireEvent.click(backButtons[backButtons.length - 1])
    expect(screen.getByText('Customer Ticket')).toBeInTheDocument()
    expect(screen.getByText('Guest requests compensation after room move')).toBeInTheDocument()
  })
})
