import { create } from 'zustand'

export const DEMO_STATES = [
  'LOCK_SCREEN',
  'BOARD_INITIAL',
  'TRIAGE_COMP',
  'BOARD_COMP_RESOLVED',
  'CABANA_THREAD',
  'STAFF_VIEW',
  'STAFF_COMPLETE',
  'BOARD_RESOLVED',
]

export const useDemoFlow = create((set, get) => ({
  currentIndex: 0,
  currentState: DEMO_STATES[0],
  advance: () => {
    const next = get().currentIndex + 1
    if (next < DEMO_STATES.length) {
      set({ currentIndex: next, currentState: DEMO_STATES[next] })
    }
  },
  reset: () => set({ currentIndex: 0, currentState: DEMO_STATES[0] }),
}))
