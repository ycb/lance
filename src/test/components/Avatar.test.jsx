import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Avatar } from '../../components/shared/Avatar'

describe('Avatar', () => {
  it('renders initials', () => {
    render(<Avatar initials="JR" deptId="RW" status="active" />)
    expect(screen.getByText('JR')).toBeInTheDocument()
  })

  it('applies department outline color as inline style', () => {
    const { container } = render(<Avatar initials="MT" deptId="ME" status="active" />)
    const el = container.firstChild
    expect(el.style.outline).toContain('#F97316')
  })

  it('shows checkmark badge when status is complete', () => {
    const { container } = render(<Avatar initials="MH" deptId="HK" status="complete" />)
    expect(container.querySelector('[data-testid="badge-complete"]')).toBeInTheDocument()
  })

  it('shows exclamation badge when status is escalated', () => {
    const { container } = render(<Avatar initials="!" deptId="FD" status="escalated" />)
    expect(container.querySelector('[data-testid="badge-escalated"]')).toBeInTheDocument()
  })

  it('shows no badge when status is active or pending', () => {
    const { container } = render(<Avatar initials="JR" deptId="RW" status="active" />)
    expect(container.querySelector('[data-testid="badge-complete"]')).not.toBeInTheDocument()
    expect(container.querySelector('[data-testid="badge-escalated"]')).not.toBeInTheDocument()
  })
})
