import { describe, it, expect, beforeEach } from 'vitest'
import { useDemoFlow, DEMO_STATES } from '../../store/demoFlow'

beforeEach(() => {
  useDemoFlow.setState({ currentIndex: 0, currentState: DEMO_STATES[0] })
})

describe('useDemoFlow', () => {
  it('starts at LOCK_SCREEN', () => {
    expect(useDemoFlow.getState().currentState).toBe('LOCK_SCREEN')
  })

  it('has 7 states', () => {
    expect(DEMO_STATES).toHaveLength(7)
  })

  it('second state is ISSUE_DETAIL_COMP', () => {
    useDemoFlow.getState().advance()
    expect(useDemoFlow.getState().currentState).toBe('ISSUE_DETAIL_COMP')
  })

  it('third state is BOARD', () => {
    useDemoFlow.getState().advance()
    useDemoFlow.getState().advance()
    expect(useDemoFlow.getState().currentState).toBe('BOARD')
  })

  it('advances through all states in order', () => {
    DEMO_STATES.forEach((state, i) => {
      expect(useDemoFlow.getState().currentState).toBe(state)
      if (i < DEMO_STATES.length - 1) useDemoFlow.getState().advance()
    })
  })

  it('does not advance past the last state', () => {
    useDemoFlow.setState({ currentIndex: DEMO_STATES.length - 1, currentState: DEMO_STATES[DEMO_STATES.length - 1] })
    useDemoFlow.getState().advance()
    expect(useDemoFlow.getState().currentState).toBe(DEMO_STATES[DEMO_STATES.length - 1])
  })

  it('resets to LOCK_SCREEN', () => {
    useDemoFlow.getState().advance()
    useDemoFlow.getState().advance()
    useDemoFlow.getState().reset()
    expect(useDemoFlow.getState().currentState).toBe('LOCK_SCREEN')
    expect(useDemoFlow.getState().currentIndex).toBe(0)
  })
})
