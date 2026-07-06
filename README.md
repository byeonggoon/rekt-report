# rekt-report

**Automated crypto exploit response**: register a hack incident, and the backend traces the stolen funds unattended, shows live progress on a public dashboard, and generates a compliance-ready evidence report (PDF) for stablecoin issuers (Tether/Circle) and exchanges.

Part 3 of a blockchain-investigation portfolio suite:

| Project | Role |
|---------|------|
| [chase-chain](https://github.com/byeonggoon/chase-chain) | Interactive multi-chain fund-tracing tool (investigator workbench) |
| [stableblacklist](https://github.com/byeonggoon/stableblacklist) | Stablecoin freeze / OFAC sanctions data infrastructure |
| **rekt-report** | Unattended incident-response pipeline (this repo) |

## How it works (v1)

```
Incident registered (hacker addresses + incident time, owner-only)
  → GitHub Actions trace worker (N-hop haircut taint propagation)
  → hop-level checkpoints in Supabase (resumable + live progress)
  → endpoints classified: CEX deposit / dormant funds / mixer / bridged out
  → standard evidence PDF: methodology, per-endpoint tainted amounts,
    path TX hashes, timeline, graph snapshot
  → public dashboard: incident cards + live trace status
```

Report **sending** is intentionally human-approved (not automated) and out of v1 scope.

## Trace methodology

- **Exploration**: haircut (proportional) taint propagation — branch priority and pruning (default: taint < 1%, max 10 hops, 500 addresses per incident)
- **Termination**: CEX / mixer arrival stops the branch; bridges are flagged as `bridge-out` (cross-chain continuation is a later phase)
- Chain coverage rollout: EVM (34 chains) → bridge continuation → Tron / Solana / Bitcoin

Core taint math is unit-tested (`lib/trace/`).

## Development phases

- [x] Phase 0 — scaffold: Next.js + TS strict, vitest, `rr_` schema, CI
- [x] Phase 1 — headless trace engine (EVM single-chain) + unit tests
  - [x] 1a — port chase-chain taint engine (haircut BFS) + 18 tests
  - [x] 1b — Etherscan V2 fetch layer + entity DB + 16 tests
  - [x] 1c — `npm run trace` CLI, verified on live data (Ronin hacker → Tornado Cash, 3 hops)
- [ ] Phase 2 — GH Actions worker + Supabase checkpoints (resumable jobs)
- [ ] Phase 3 — public dashboard (incident cards, live progress, endpoints)
- [ ] Phase 4 — standard evidence PDF generator
- [ ] Phase 5 — real-incident demo + public deployment (v1 complete)

## Stack

Next.js (App Router) · TypeScript strict · Supabase (`rr_` tables) · GitHub Actions worker · Vitest

## Commands

```bash
npm run dev        # dev server
npm test           # vitest
npm run typecheck  # tsc --noEmit
npm run lint
```
