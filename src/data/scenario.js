// src/data/scenario.js

export const DEPT = {
  FD:  { id: 'FD',  label: 'Front Desk',    abbr: 'FD',  color: '#3B82F6', count: 4  },
  FB:  { id: 'FB',  label: 'F&B',           abbr: 'FB',  color: '#F59E0B', count: 12 },
  RW:  { id: 'RW',  label: 'Recreation',    abbr: 'RW',  color: '#14B8A6', count: 6  },
  HK:  { id: 'HK',  label: 'Housekeeping',  abbr: 'HK',  color: '#A855F7', count: 18 },
  ME:  { id: 'ME',  label: 'Maintenance',   abbr: 'ME',  color: '#F97316', count: 6  },
  SEC: { id: 'SEC', label: 'Security',      abbr: 'SEC', color: '#64748B', count: 3  },
}

export const DEPARTMENTS = Object.values(DEPT)

// step status
export const S = {
  PENDING:   'pending',
  ACTIVE:    'active',
  COMPLETE:  'complete',
  SKIPPED:   'skipped',
  ESCALATED: 'escalated',
}

// commitment severity
export const SEV = {
  NEEDS_DECISION: 'needs_decision',
  IN_PROGRESS:    'in_progress',
  RESOLVED:       'resolved',
}

export const commitments = {
  stayExtension: {
    id: 'stay_extension',
    severity: SEV.RESOLVED,
    guest: 'Alex Chen · Rm 412',
    summary: 'Stay extended — May 19 to May 21',
    stepLabel: 'Updated in Opera · 2 min ago',
    elapsed: '2 min ago',
    chainSteps: [
      { id: 'se1', initials: 'FD', deptId: 'FD', status: S.COMPLETE },
    ],
  },

  cabana: {
    id: 'cabana',
    severity: SEV.IN_PROGRESS,
    guest: 'Alex Chen · Rm 412',
    summary: 'Cabana 3 — pool party setup by 4pm',
    stepLabel: 'Maria H. delivering towels',
    elapsed: '18 min ago',
    chainSteps: [
      { id: 'cc1', initials: 'JR', deptId: 'RW', status: S.COMPLETE },
      { id: 'cc2', initials: 'MH', deptId: 'HK', status: S.ACTIVE   },
      { id: 'cc3', initials: 'FB', deptId: 'FB', status: S.COMPLETE },
    ],
    thread: {
      jordanPhoto: true,
      jordanNote: 'Cabana 3 set up. Chairs, umbrella, 8 waters on table.',
      mariaStatus: 'On it — 10 min out',
      fbNote: 'F&B notified. Poolside service available on guest request.',
    },
  },

  acComp: {
    id: 'ac_comp',
    severity: SEV.NEEDS_DECISION,
    guest: 'Rm 408 (moved from 410)',
    summary: 'Guest requesting comp for room move disruption',
    stepLabel: 'Exceeds frontline authority · Decide now',
    elapsed: '31 min ago',
    chainSteps: [
      { id: 'ac1', initials: 'MT', deptId: 'ME', status: S.COMPLETE  },
      { id: 'ac2', initials: 'MH', deptId: 'HK', status: S.COMPLETE  },
      { id: 'ac3', initials: 'FD', deptId: 'FD', status: S.COMPLETE  },
      { id: 'ac4', initials: '!',  deptId: 'FD', status: S.ESCALATED },
    ],
    chainHistory: [
      {
        id: 'h1',
        initials: 'MT',
        deptId: 'ME',
        name: 'Marcus T.',
        role: 'Maintenance',
        action: 'Diagnose and repair AC unit, Room 410',
        status: S.COMPLETE,
        outcome: 'Compressor failed. Needs parts. Est. 2+ day repair.',
        time: '31 min ago',
      },
      {
        id: 'h2',
        initials: 'MH',
        deptId: 'HK',
        name: 'Maria H.',
        role: 'Housekeeping',
        action: 'Prepare Room 408 for guest move',
        status: S.COMPLETE,
        outcome: 'Room 408 cleaned and confirmed ready.',
        time: '24 min ago',
      },
      {
        id: 'h3',
        initials: 'FD',
        deptId: 'FD',
        name: 'Front Desk',
        role: 'Guest Services',
        action: 'Notify guest and assist with relocation to Room 408',
        status: S.COMPLETE,
        outcome: 'Guest moved to 408. Expressed frustration. Requesting compensation.',
        time: '19 min ago',
      },
    ],
    aiSummary:
      'Guest experienced unplanned room move due to equipment failure. One night of disruption. Requesting compensation. One-night comp matches the disruption duration and aligns with standard recovery policy.',
    compOptions: [
      { id: 'comp_night', label: 'Comp one night',    amount: '$195', recommended: true  },
      { id: 'comp_fb',    label: 'F&B credit',         amount: '$75',  recommended: false },
      { id: 'comp_none',  label: 'Decline with apology', amount: null, recommended: false },
    ],
  },
}
