import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { LoyaltyBadge } from '../../components/shared/LoyaltyBadge'

describe('LoyaltyBadge', () => {
  it('renders title-cased pill text for loyalty tiers', () => {
    render(<LoyaltyBadge tier="diamond-reserve" />)

    const badge = screen.getByText('Diamond Reserve')
    expect(badge).toBeInTheDocument()
    expect(badge.style.background).toBe('rgb(17, 17, 17)')
    expect(badge.style.color).toBe('white')
  })

  it('renders non-member as plain muted text', () => {
    render(<LoyaltyBadge tier="non-member" />)

    const badge = screen.getByText('Non Member')
    expect(badge).toBeInTheDocument()
    expect(badge.style.background).toBe('')
    expect(badge.style.border).toBe('')
    expect(badge.style.color).toBe('rgb(107, 114, 128)')
  })
})
