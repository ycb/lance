import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { AIActionCard } from '../../components/issues/AIActionCard'

const baseEvent = {
  id: 'tl_1',
  type: 'ai_action',
  text: 'Matched SOP: Equipment Failure · Dispatched Marcus T.',
  reasoning: 'The guest reported no AC. Our Equipment Failure SOP applies.',
  time: '9:09 AM',
}

describe('AIActionCard', () => {
  it('renders the summary text', () => {
    render(<AIActionCard event={baseEvent} />)
    expect(screen.getByText('Matched SOP: Equipment Failure · Dispatched Marcus T.')).toBeInTheDocument()
  })

  it('renders the AI badge', () => {
    render(<AIActionCard event={baseEvent} />)
    expect(screen.getByText('AI')).toBeInTheDocument()
  })

  it('renders Why? button', () => {
    render(<AIActionCard event={baseEvent} />)
    expect(screen.getByText('Why?')).toBeInTheDocument()
  })

  it('renders This looks wrong button', () => {
    render(<AIActionCard event={baseEvent} />)
    expect(screen.getByText('This looks wrong')).toBeInTheDocument()
  })

  it('shows flagged state after clicking This looks wrong', () => {
    render(<AIActionCard event={baseEvent} />)
    fireEvent.click(screen.getByText('This looks wrong'))
    expect(screen.getByText("Flagged — we'll review")).toBeInTheDocument()
  })

  it('shows reasoning text when Why? is clicked', () => {
    render(<AIActionCard event={baseEvent} />)
    fireEvent.click(screen.getByText('Why?'))
    expect(screen.getByText('The guest reported no AC. Our Equipment Failure SOP applies.')).toBeInTheDocument()
  })
})
