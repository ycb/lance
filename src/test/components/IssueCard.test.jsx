import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { IssueCard } from '../../components/issues/IssueCard'
import { commitments } from '../../data/scenario'

describe('IssueCard', () => {
  it('renders issue type badge', () => {
    render(<IssueCard commitment={commitments.cabana} onClick={() => {}} />)
    expect(screen.getByText('Setup')).toBeInTheDocument()
  })

  it('renders room and guest', () => {
    render(<IssueCard commitment={commitments.cabana} onClick={() => {}} />)
    expect(screen.getByText('Rm 412')).toBeInTheDocument()
    expect(screen.getByText(/Alex Chen/)).toBeInTheDocument()
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
    const btn = screen.getByRole('button')
    expect(btn).toBeDisabled()
  })

  it('shows step indicator for in-progress commitment', () => {
    render(<IssueCard commitment={commitments.cabana} onClick={() => {}} />)
    // cabana chainSteps: [COMPLETE, ACTIVE, COMPLETE] → active is index 1 → "Step 2 of 3"
    expect(screen.getByText('Step 2 of 3')).toBeInTheDocument()
  })

  it('does not show step indicator for resolved commitment', () => {
    render(<IssueCard commitment={commitments.stayExtension} onClick={() => {}} />)
    expect(screen.queryByText(/Step \d+ of \d+/)).not.toBeInTheDocument()
  })
})
