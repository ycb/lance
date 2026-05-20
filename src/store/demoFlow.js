import { create } from 'zustand'

export const DEMO_STATES = [
  'LOCK_SCREEN',
  'ISSUE_DETAIL_COMP',
  'BOARD',
  'ISSUE_DETAIL_CABANA',
  'STAFF_VIEW',
  'STAFF_COMPLETE',
  'BOARD_RESOLVED',
]

export const useDemoFlow = create((set, get) => ({
  currentIndex: 0,
  currentState: DEMO_STATES[0],
  compResolved: false,
  advance: () => {
    const next = get().currentIndex + 1
    if (next < DEMO_STATES.length) {
      set({ currentIndex: next, currentState: DEMO_STATES[next] })
    }
  },
  goTo: (state) => {
    const index = DEMO_STATES.indexOf(state)
    if (index !== -1) set({ currentIndex: index, currentState: state })
  },
  resolveComp: () => set({ compResolved: true }),
  reset: () => set({ currentIndex: 0, currentState: DEMO_STATES[0], compResolved: false }),
}))
