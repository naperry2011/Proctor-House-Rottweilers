# Roadmap

Forward-looking direction. Pair with tasks.md (active work) and memory.md (history).
Source of truth for scope: `proctor-house-rottweilers-website-spec.md` (client-approved spec).

## Vision

Convert Proctor House Rottweilers' existing social audience (~3,400 FB followers, active TikTok/YT/IG) into waitlist applications and deposits, with a premium site that justifies the "Designer Gorilla" positioning. Client goals: sell puppies/deposits, build authority, collect screened applications.

## Current Focus

**Theme:** Get Phase 1.5 in front of the client and collect what's blocking launch
**Goals:**
1. Client can actually open the site (Vercel SSO is currently blocking them)
2. Client sign-off on the buyer-portal concept before any real buyer sees it
3. Collect the remaining assets — photos above all

## Now

- **Unblock client review:** disable Vercel Authentication (or switch to password protection), then send the prepared email
- **Buyer portal sign-off:** the concept is ours, not the client's — they need to approve it and choose how codes get handed out

## Next

- **Photography chase.** 5 photos across 4 dogs, zero puppy photos, and no hip/elbow certificate for Hulk. Everything else is polish until this lands
- **Phase 2 — Content backend:** Payload CMS inside Next.js, Postgres (Neon), Cloudflare R2 media; model Dogs/Litters/Puppies. The types in `src/lib/placeholder-data.ts` are the schema contract (ADR-002)
- **Phase 3 — Conversion:** real waitlist screening form → Payload collection, client review workflow, live TikTok/IG embeds. Also replaces the portal's passcode gate with real per-buyer accounts (ADR-008)

## Later

- **Phase 4 — Commerce:** Stripe Checkout deposits and merch (client's own account/keys), puppy Available→Reserved→Sold flow, health/guarantee pages
- **Phase 5 — Polish & launch:** SEO ("rottweiler puppies Arizona"), performance, GoDaddy domain cutover, client admin training

## Recently Completed

- Phase 1.5 — real roster, redacted certificates, merch storefront, passcode-gated buyer portal, mobile pass - 2026-08-09
- Phase 1 foundation (design system, static pages, plates, dog details) - 2026-06-10

## Deferred / Cancelled

- Blog — optional per spec, not scheduled
- Supabase as backend — rejected in spec; Payload chosen (single admin for a non-technical client)
- Publishing unredacted certificate scans — rejected; redacted versions ship instead (ADR-007)

## Decision points waiting on the client

- **Litter cadence.** Each new litter currently needs an env var and a redeploy. Fine at two a year, untenable at six — if the cadence is high, pull Payload forward rather than extending the env-var approach (ADR-008)
- **Domain timing.** Attaching proctorhouserottweilers.com makes `main` the live public site, placeholder merch art and all
- **Certificates.** Whether the redaction level is right, or they want originals shown

## Client deliverables (blocking, per spec §8)

- Health guarantee text, puppy contract, deposit refund policy (their lawyer's wording)
- Stripe account ownership + connection, and `price_…` IDs for merch
- Puppy photos; more dog photos; Hulk's FCI/KSS certificate; the Kings Litter sire's name
- Real social profile URLs; GoDaddy domain access
