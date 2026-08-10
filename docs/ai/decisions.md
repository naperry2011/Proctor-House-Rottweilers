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
**Status:** ✅ Resolved 2026-08-09 — all Pexels files deleted, replaced with the
client's real dogs (Beauty, Hulk, Princess Peach, Remi). See ADR-006.

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

## ADR-006: Health model is FCI/KSS, not OFA — and all fields are optional

**Date:** 2026-08-09
**Status:** Accepted

**Context**
Phase 1 invented OFA clearances (hips/elbows/cardiac/eyes, all required) for
three fictional dogs. The client's real dogs are graded under the international
**FCI/KSS** system — hips `A`, elbows `0` — with AKC registration and, for Hulk
only, Embark DNA screening. No cardiac or eyes data exists for any dog.

**Decision**
`HealthClearances {hips,elbows,cardiac,eyes}` → `DogVitals {hips?,elbows?,dna?,
registration?}`, all optional. The strip is a fixed four cells (Hips / Elbows /
DNA / Registry) rendered from a single `vitalCells()` helper; a missing value
renders as a muted em dash. Renamed `health` → `vitals` because "AKC
registration" is not a health clearance and that mislabel would have shipped
into the client's CMS admin.

**Consequences**
- **Positive:** The site can never assert a clearance the client doesn't hold —
  which matters most here, since health claims are exactly what skeptics of
  oversized Rottweilers attack. One helper means the plate and the detail strip
  cannot drift apart.
- **Negative:** Any dog without full data shows visible gaps. That is the point,
  but it needs explaining to the client.

---

## ADR-007: Client certificate scans are not published (owner PII)

**Date:** 2026-08-09
**Status:** Accepted

**Context**
Three of the nine delivered images turned out to be FCI/KSS hip-elbow
certificates rather than photos, and the fourth "pedigree" file is Hulk's AKC
certified pedigree chart. All four carry the owner's full name, AKC
registration numbers, and **microchip numbers**.

**Decision**
Do not publish the scans. Transcribe the non-sensitive content — the grades
(`A`, `0`), the registry (`AKC`), and the ancestor names — and render it as
designed UI instead. `/images` is gitignored so the originals stay local. The
client-authored profile PDFs contain no such identifiers and are published as
downloads.

**Consequences**
- **Positive:** No microchip or registration number is ever exposed. The
  rendered pedigree panel also looks better than a phone photo of paperwork.
- **Negative:** Buyers can't see the certificates as proof. If the client wants
  that, we publish redacted versions — an explicit, separate decision.

---

## ADR-008: Litter portal passcodes are deterrence, not authentication

**Date:** 2026-08-09
**Status:** Accepted (temporary — superseded by Payload in Phase 3)

**Context**
The client wants private photo/video updates for families who have paid a
deposit, before any backend or auth system exists.

**Decision**
One passcode per litter, stored in env vars (`LITTER_PASSCODE_*`), verified in
a Server Action with a hashed timing-safe compare, granting an HMAC-signed
HttpOnly cookie scoped to `/litters/<slug>`. `import "server-only"` keeps codes
out of the client bundle; the route is `force-dynamic` so it can never be
statically rendered past the gate.

**Consequences**
- **Positive:** Ships now, zero dependencies, no DB. Verified against forged,
  expired, cross-litter and wrong-secret cookies.
- **Negative:** **No rate limiting** — accepted deliberately, since in-memory
  counters don't work across serverless instances and adding Upstash for two
  pages isn't worth it. Mitigated by a fixed 400ms delay, a 10+ character code
  requirement, and no public litter index. A shared code is a shared code.
  **Therefore nothing sensitive may ever go behind this gate** — puppy photos
  and progress notes only.
- **Negative:** A new litter needs a new env var and a redeploy. Fine at two
  litters a year, untenable at six — if the cadence is higher, pull Payload
  forward instead.

---
