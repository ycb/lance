import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { IssueTimeline } from '../../components/issues/IssueTimeline'
import { commitments } from '../../data/scenario'

describe('IssueTimeline', () => {
  it('renders guest request as first item', () => {
    render(<IssueTimeline timeline={commitments.acComp.timeline} />)
    expect(screen.getByText(/My AC isn't working/)).toBeInTheDocument()
  })

  it('renders AI action card text', () => {
    render(<IssueTimeline timeline={commitments.acComp.timeline} />)
    expect(screen.getByText(/Matched SOP: Equipment Failure/)).toBeInTheDocument()
  })

  it('renders staff step name', () => {
    render(<IssueTimeline timeline={commitments.acComp.timeline} />)
    expect(screen.getByText('Marcus T.')).toBeInTheDocument()
  })

  it('renders multiple staff members', () => {
    render(<IssueTimeline timeline={commitments.acComp.timeline} />)
    expect(screen.getByText('Maria H.')).toBeInTheDocument()
    expect(screen.getByText('Front Desk')).toBeInTheDocument()
  })
})
