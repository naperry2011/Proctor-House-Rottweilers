# Architecture Decisions

ADR log. Write entries when a decision is hard to reverse, affects multiple components, or future-you will ask "why did we do it this way?"

---

## ADR-001: Payload CMS as single backend (over Supabase/Sanity/Airtable/Firebase)

**Date:** 2026-06-09 (spec), client-confirmed
**Status:** Accepted

**Context**
Non-technical client must self-manage dogs/litters AND review waitlist applications with the fewest logins. Supabase was the default assumption but adds a backend the client can't touch.

**Decision**
We will use Payload CMS running natively inside Next.js — content and application submissions in one admin. Postgres (Neon/Vercel) underneath; Cloudflare R2 for media (S3 adapter).

**Consequences**
- **Positive:** One login for the client; applications are queryable collections; no third-party form service
- **Negative:** Self-hosted backend to maintain
- **Neutral:** DB invisible to client

**Alternatives considered**
- Sanity + Formspree — submissions live in a third party
- Airtable — another tool/subscription
- Firebase — NoSQL, client still can't log in directly

---

## ADR-002: Placeholder data module as the future CMS schema contract

**Date:** 2026-06-10
**Status:** Accepted

**Context**
Phase 1 ships before any CMS exists, but pages need data shapes that survive the Phase 2 migration.

**Decision**
All content flows through typed exports in `src/lib/placeholder-data.ts` (`Dog`, `Litter`, `HealthClearances`). Pages/components consume the shapes, never the source. Phase 2 swaps record exports for Payload queries; type exports stay stable.

**Consequences**
- **Positive:** Zero component rewrites at CMS time; one seam to replace
- **Negative:** Type changes ripple everywhere (intentional friction)

---

## ADR-003: Phase 1 is local-first; no cloud accounts wired

**Date:** 2026-06-10
**Status:** Accepted

**Context**
Client owns Stripe/domain/hosting relationships; developer must not handle their credentials (spec §4: "Nick does not handle or enter payment credentials").

**Decision**
Build and verify everything locally. Cloud (Neon, R2, Vercel env, Stripe) connects later with client-owned accounts.

**Consequences**
- **Positive:** No credential liability; clean handoff story
- **Negative:** No public review URL until a deploy decision

---

## ADR-004: Stock photography is demo-only

**Date:** 2026-06-10
**Status:** Accepted (with hard launch condition)

**Context**
Client photos unavailable; site needed to look real for review. Pexels license permits commercial use.

**Decision**
Use Pexels Rottweiler photos as stand-ins for named dogs, hero, and litter imagery. Replacing them with the client's actual dogs is a launch blocker — buyers will compare the site dogs to the client's TikTok dogs.

**Consequences**
- **Positive:** Demo-ready immediately; legally safe
- **Negative:** Site misrepresents specific dogs until swapped — must not ship to production as-is

---

## ADR-005: Reveal animation must fail visible

**Date:** 2026-06-10
**Status:** Accepted

**Context**
IntersectionObserver callbacks never fired in an embedded preview browser; content stayed at opacity 0 forever.

**Decision**
`Reveal.tsx` pairs IO with an immediate in-viewport check and a passive scroll/resize listener fallback. If detection fails, content shows.

**Consequences**
- **Positive:** Conversion content can never be animation-hostage
- **Negative:** Slightly more listener bookkeeping

---
