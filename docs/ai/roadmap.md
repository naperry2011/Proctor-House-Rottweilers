# Roadmap

Forward-looking direction. Pair with tasks.md (active work) and memory.md (history).
Source of truth for scope: `proctor-house-rottweilers-website-spec.md` (client-approved spec).

## Vision

Convert Proctor House Rottweilers' existing social audience (~3,400 FB followers, active TikTok/YT/IG) into waitlist applications and deposits, with a premium site that justifies the "Designer Gorilla" positioning. Client goals: sell puppies/deposits, build authority, collect screened applications.

## Current Focus

**Theme:** Phase 1 foundation — done; awaiting client review and Phase 2 go-ahead
**Goals:**
1. Client sign-off on brand/design direction and page structure
2. Collect client deliverables blocking later phases (photos, Stripe, policies)

## Now

- Phase 1 delivered locally — needs client review + Vercel deploy decision

## Next

- **Phase 2 — Content backend:** Payload CMS inside Next.js, Postgres (Neon), Cloudflare R2 media; model Dogs/Litters/Puppies; Our Dogs + Available Puppies pages from CMS. The `Dog`/`Litter` types in `src/lib/placeholder-data.ts` are the schema contract.
- **Phase 3 — Conversion:** Real waitlist screening form → Payload collection, client review workflow, live TikTok/IG embeds.

## Later

- **Phase 4 — Commerce:** Stripe Checkout deposits (client's own account/keys), puppy Available→Reserved→Sold flow, health/guarantee pages (client-supplied text)
- **Phase 5 — Polish & launch:** SEO ("rottweiler puppies Arizona"), performance, content migration, GoDaddy domain cutover, client admin training

## Recently Completed

- Phase 1 foundation (design system, static pages, plates, dog details, mobile pass) - 2026-06-10

## Deferred / Cancelled

- Blog — optional per spec, not scheduled
- Supabase as backend — rejected in spec; Payload chosen (single admin for non-technical client)

## Client deliverables (blocking, per spec §8)

- Health guarantee text, puppy contract, deposit refund policy (their lawyer's wording)
- Stripe account ownership + connection
- Final dog roster, pedigrees, health clearance docs, hi-res photos/videos
- Real social profile URLs; GoDaddy domain access
