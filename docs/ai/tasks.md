# Tasks

Active work. Update as items are completed and new work is identified.

## Sprint / Iteration

**Range:** 2026-06-10 (Phase 1 build session)
**Goal:** Phase 1 foundation — complete

## In Progress

- (none)

## Up Next

- [ ] Deploy Phase 1 to Vercel for client review — small
- [ ] Get real social profile URLs from client and replace platform-homepage links in `placeholder-data.ts` — tiny
- [ ] Phase 2 kickoff: Payload CMS + Neon Postgres + R2 setup — large (needs account decisions with client)

## Blocked

- [ ] Replace stock dog photos with real roster — blocked on client assets, since 2026-06-10
- [ ] Health/guarantee page content — blocked on client's lawyer wording
- [ ] Stripe integration — blocked on client Stripe account

## Recently Completed

- [x] Next.js 16 scaffold + design system (tokens, fonts, gradients) — 2026-06-10
- [x] Home / The Bloodline / About pages — 2026-06-10
- [x] BloodlinePlate signature component + equal-height grid fix — 2026-06-10
- [x] Dog detail pages with filler histories (`/dogs/[slug]`) — 2026-06-10
- [x] Real stock photography (Pexels, commercial-safe) — 2026-06-10
- [x] Mobile pass: overflow audit, footer/CTA clearance, 44px tap targets, iOS safe area — 2026-06-10
- [x] Repo index docs (CODE_MAP etc.) + docs/ai scaffold — 2026-06-10

## Bugs

- (none known)

## Tech Debt

- [ ] `next.config.ts` SVG allowance no longer needed (placeholders removed) — trivial, remove in next touch
- [ ] `Reveal.tsx` uses a `@ts-expect-error` on the polymorphic ref — revisit if component grows
