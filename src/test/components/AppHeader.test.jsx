import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { AppHeader } from '../../components/layout/AppHeader'

describe('AppHeader', () => {
  it('renders hotel name', () => {
    render(<AppHeader />)
    expect(screen.getByText('Hilton San Francisco Union Square')).toBeInTheDocument()
  })

  it('renders logo image', () => {
    render(<AppHeader />)
    expect(screen.getByRole('img', { name: /hilton/i })).toBeInTheDocument()
  })

  it('renders SM user avatar', () => {
    render(<AppHeader />)
    expect(screen.getByText('SM')).toBeInTheDocument()
  })

  it('renders notification badge with count', () => {
    render(<AppHeader />)
    expect(screen.getByText('6')).toBeInTheDocument()
  })

  it('has cobalt background', () => {
    const { container } = render(<AppHeader />)
    const header = container.firstChild
    // jsdom normalises hex to rgb; both represent Hilton cobalt #002E5A
    expect(header.style.background).toMatch(/rgb\(0,\s*46,\s*90\)|#002E5A/i)
  })
})
