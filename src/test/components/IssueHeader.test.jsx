import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { IssueHeader } from '../../components/issues/IssueHeader'
import { commitments } from '../../data/scenario'

describe('IssueHeader', () => {
  it('renders room number', () => {
    render(<IssueHeader commitment={commitments.acComp} />)
    expect(screen.getByText(/Rm 412/)).toBeInTheDocument()
  })

  it('renders elapsed time', () => {
    render(<IssueHeader commitment={commitments.acComp} />)
    expect(screen.getByText(/47 min/)).toBeInTheDocument()
  })

  it('renders assignee name', () => {
    render(<IssueHeader commitment={commitments.acComp} />)
    expect(screen.getByText('Sarah M.')).toBeInTheDocument()
  })

  it('renders issue type', () => {
    render(<IssueHeader commitment={commitments.acComp} />)
    expect(screen.getByText('Comp Request')).toBeInTheDocument()
  })

  it('renders Decide badge for needs_decision', () => {
    render(<IssueHeader commitment={commitments.acComp} />)
    expect(screen.getByText('Decide')).toBeInTheDocument()
  })

  it('renders In Progress badge for in_progress', () => {
    render(<IssueHeader commitment={commitments.cabana} />)
    expect(screen.getByText('In Progress')).toBeInTheDocument()
  })
})
