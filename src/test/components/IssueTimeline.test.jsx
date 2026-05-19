import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { IssueTimeline } from '../../components/issues/IssueTimeline'
import { commitments } from '../../data/scenario'

describe('IssueTimeline', () => {
  it('renders guest request as first item', () => {
    render(<IssueTimeline timeline={commitments.cabana.timeline} />)
    expect(screen.getByText(/pool party/)).toBeInTheDocument()
  })

  it('renders AI action card text', () => {
    render(<IssueTimeline timeline={commitments.cabana.timeline} />)
    expect(screen.getByText(/Cabana Package/)).toBeInTheDocument()
  })

  it('renders staff step name', () => {
    render(<IssueTimeline timeline={commitments.cabana.timeline} />)
    expect(screen.getByText('Jordan R.')).toBeInTheDocument()
  })

  it('renders multiple staff members', () => {
    render(<IssueTimeline timeline={commitments.cabana.timeline} />)
    expect(screen.getByText('Maria H.')).toBeInTheDocument()
  })
})
