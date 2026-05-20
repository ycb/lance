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

  it('opens team ticket detail directly and backs into customer ticket detail', () => {
    render(<IssueDetail />)

    fireEvent.click(screen.getByText('Authorize comp · Room 408'))

    expect(screen.getByText('Team Ticket')).toBeInTheDocument()
    expect(screen.getByText('Authorize compensation')).toBeInTheDocument()

    fireEvent.click(screen.getByText('← Ticket'))

    expect(screen.getByText('Customer Ticket')).toBeInTheDocument()
    expect(screen.getByText('Guest requests compensation after room move')).toBeInTheDocument()
  })
})
