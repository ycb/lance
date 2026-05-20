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

  it('shows linked ticket in chain footer when present', () => {
    render(<IssueCard commitment={commitments.acComp} onClick={() => {}} />)
    expect(screen.getByText('Linked to T002')).toBeInTheDocument()
  })

  it('renders dept chain with abbrs for all steps', () => {
    render(<IssueCard commitment={commitments.cabana} onClick={() => {}} />)
    // cabana chain: RW→'R' (complete), HK→'H' (active), FB→'FB' (complete)
    expect(screen.getByText('R')).toBeInTheDocument()
    expect(screen.getByText('H')).toBeInTheDocument()
    expect(screen.getByText('FB')).toBeInTheDocument()
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
})
