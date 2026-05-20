import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { IssueCard } from '../../components/issues/IssueCard'
import { commitments } from '../../data/scenario'

describe('IssueCard', () => {
  it('renders title from originTicket when present', () => {
    render(<IssueCard commitment={commitments.acComp} onClick={() => {}} />)
    expect(screen.getByText('Guest requests compensation after room move')).toBeInTheDocument()
  })

  it('renders title from summary when no originTicket', () => {
    render(<IssueCard commitment={commitments.cabana} onClick={() => {}} />)
    expect(screen.getByText('Cabana 3 — pool party setup by 4pm')).toBeInTheDocument()
  })

  it('renders room and guest', () => {
    render(<IssueCard commitment={commitments.cabana} onClick={() => {}} />)
    expect(screen.getByText(/Rm 412/)).toBeInTheDocument()
    expect(screen.getByText(/Alex Chen/)).toBeInTheDocument()
  })

  it('shows AI summary when present', () => {
    render(<IssueCard commitment={commitments.acComp} onClick={() => {}} />)
    expect(screen.getByText(/Guest experienced unplanned room move/)).toBeInTheDocument()
  })

  it('shows linked ticket footer when present', () => {
    render(<IssueCard commitment={commitments.acComp} onClick={() => {}} />)
    expect(screen.getByText('Linked to T002')).toBeInTheDocument()
  })

  it('shows Decide badge for needs_decision', () => {
    render(<IssueCard commitment={commitments.acComp} onClick={() => {}} />)
    expect(screen.getByText('Decide')).toBeInTheDocument()
  })

  it('shows assignee name', () => {
    render(<IssueCard commitment={commitments.cabana} onClick={() => {}} />)
    expect(screen.getByText('Maria H.')).toBeInTheDocument()
  })

  it('calls onClick when tapped', () => {
    const onClick = vi.fn()
    render(<IssueCard commitment={commitments.acComp} onClick={onClick} />)
    fireEvent.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('is not clickable when resolved', () => {
    const onClick = vi.fn()
    render(<IssueCard commitment={commitments.stayExtension} onClick={onClick} />)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('shows step indicator for in-progress commitment', () => {
    render(<IssueCard commitment={commitments.cabana} onClick={() => {}} />)
    expect(screen.getByText('Step 2 of 3')).toBeInTheDocument()
  })

  it('does not show step indicator for resolved commitment', () => {
    render(<IssueCard commitment={commitments.stayExtension} onClick={() => {}} />)
    expect(screen.queryByText(/Step \d+ of \d+/)).not.toBeInTheDocument()
  })
})
