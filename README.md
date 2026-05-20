# Lance — Hotel Operations, Reimagined

A high-fidelity mobile prototype for **Hilton San Francisco Union Square** — one of the largest hotels in the United States, with 1,921 rooms across 46 floors.

Lance is an AI-powered operations platform that gives hotel staff a single surface to manage guest issues, coordinate teams, and close the loop — from a push notification to a resolved comp request, in minutes.

<img width="429" height="886" alt="image" src="https://github.com/user-attachments/assets/840aea6b-cb03-498c-b9c9-fe6b7adbbd41" />

---

## The Problem

At a property this size, a guest complaint touches four departments before a supervisor even sees it. Ticket handoffs happen in group chats. Compensation approvals require phone calls. There's no single view of what's open, who owns it, or what happened.

Lance changes that.

---

## What It Does

**AI-driven issue management** — Every guest request is triaged, routed, and tracked automatically. The AI creates tickets, dispatches staff, and escalates when human judgment is needed.

**Real-time chain of custody** — A visual department chain shows every handoff at a glance: Maintenance → Housekeeping → Front Desk → Supervisor. Complete, active, and pending steps in one row.

**Supervisor decision flow** — When a comp request exceeds frontline authority, it lands on the supervisor's screen with full context, AI-recommended resolution, and one-tap draft messages for SMS and email.

**Full audit trail** — Every action is logged. When the issue is resolved, the updated ticket shows who did what, when, and what was communicated to the guest.

---

## The Demo Flow

Two stories unfolding on the same morning shift at 1,921-room Hilton SF Union Square:

### Nina Patel · Rm 408 — Comp Request
> Push notification → Issue Detail → Resolution → Send to Guest → Resolved

A guest was relocated due to a noisy AC unit next door. The request exceeds frontline authority and escalates to Supervisor Sarah M. The full loop: choose compensation, review AI-drafted SMS + email, send, and close. The card moves from Critical → Resolved with real-time chain and notification count updates.

### Alex Chen · Rm 412 — Cabana Setup
> Board → Issue Detail → Staff View

An 8-person pool party needs cabana setup by 4pm. Recreation and Housekeeping are dispatched by AI. The supervisor sees chain status, team messages, and photo confirmations in real time.

---

## Key Screens

| Screen | Description |
|--------|-------------|
| **Lock Screen** | Push notification surfaces the critical issue before you even unlock |
| **Issue Board** | Critical / In Progress / Resolved tabs · live counts · search and department filters |
| **Issue Detail** | Origin ticket · AI summary · team ticket chain · messages · photos |
| **Ticket Details** | Full guest profile, reservation, linked tickets |
| **Resolution Flow** | Comp options with AI recommendation → draft review → one-tap send |
| **Staff View** | Staff-facing task card with checklist and photo confirmation |
| **Teams** | 110 staff on shift across 7 departments |
| **AI Agent** | Ask anything: SOPs, guest history, occupancy, VIP guests |

---

## Stack

- **React 19** + Vite
- **Tailwind CSS** + shadcn/ui components
- **Framer Motion** for screen transitions and micro-animations
- **Zustand** for demo state machine
- **Vitest** + React Testing Library — 81 tests

---

## Running Locally

```bash
npm install
npm run dev
```

Runs as a phone-framed single-page app. No backend required — all scenario data lives in `src/data/scenario.js`.

---

*Product prototype. All guest names and data are fictional.*
