import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { CommitmentCard } from '../../components/CommitmentCard'
import { commitments } from '../../data/scenario'

describe('CommitmentCard', () => {
  it('renders guest and summary', () => {
    render(<CommitmentCard commitment={commitments.cabana} onClick={() => {}} />)
    expect(screen.getByText(/Alex Chen · Rm 412/)).toBeInTheDocument()
    expect(screen.getByText('Cabana 3 — pool party setup by 4pm')).toBeInTheDocument()
  })

  it('shows Decide badge for needs_decision severity', () => {
    render(<CommitmentCard commitment={commitments.acComp} onClick={() => {}} />)
    expect(screen.getByText('Decide')).toBeInTheDocument()
  })

  it('does not show Decide badge for in_progress severity', () => {
    render(<CommitmentCard commitment={commitments.cabana} onClick={() => {}} />)
    expect(screen.queryByText('Decide')).not.toBeInTheDocument()
  })

  it('calls onClick when tapped', () => {
    const onClick = vi.fn()
    render(<CommitmentCard commitment={commitments.acComp} onClick={onClick} />)
    fireEvent.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalledOnce()
  })
})
