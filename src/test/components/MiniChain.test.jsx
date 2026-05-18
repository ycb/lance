import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MiniChain } from '../../components/shared/MiniChain'

const steps = [
  { id: '1', initials: 'MT', deptId: 'ME', status: 'complete'  },
  { id: '2', initials: 'MH', deptId: 'HK', status: 'complete'  },
  { id: '3', initials: 'FD', deptId: 'FD', status: 'escalated' },
]

describe('MiniChain', () => {
  it('renders all step initials', () => {
    render(<MiniChain steps={steps} />)
    expect(screen.getByText('MT')).toBeInTheDocument()
    expect(screen.getByText('MH')).toBeInTheDocument()
    expect(screen.getByText('FD')).toBeInTheDocument()
  })

  it('renders connectors between steps', () => {
    const { container } = render(<MiniChain steps={steps} />)
    const connectors = container.querySelectorAll('[data-testid="chain-connector"]')
    expect(connectors).toHaveLength(steps.length - 1)
  })

  it('renders single step with no connector', () => {
    const { container } = render(<MiniChain steps={[steps[0]]} />)
    expect(container.querySelectorAll('[data-testid="chain-connector"]')).toHaveLength(0)
  })
})
