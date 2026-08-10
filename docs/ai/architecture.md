# Architecture

System design at a glance. Pair with CODE_MAP.md (file map) and DATA_FLOW.md (system flows).

## System Overview

Static-first marketing/conversion site for a Rottweiler breeder. Almost every route prerenders at build time from one in-repo data module. Phase 1.5 added a single dynamic route — the passcode-gated buyer update portal — which is the only server-rendered surface and the only place a secret is read.

**Style:** Monolith (Next.js 16 App Router, mostly static output + one dynamic route)
**Hosting:** Vercel (production deployed; currently behind Vercel Authentication)

## Core Components

### App shell
- **Responsibility:** Fonts, metadata, viewport, global chrome composition
- **Tech:** Next.js 16 App Router, next/font (Cinzel/Anton/Inter)
- **Key files:** src/app/layout.tsx, src/app/globals.css

### Design system
- **Responsibility:** Brand tokens (ink/surface/gold/bone), gold-metallic gradient, type utilities, reveal animation CSS
- **Tech:** Tailwind CSS v4 `@theme`
- **Key files:** src/app/globals.css

### Data layer (CMS seam)
- **Responsibility:** All content types + records + brand constants + shared formatters
- **Tech:** Plain TS module
- **Key files:** src/lib/placeholder-data.ts
- **Depends on:** Nothing (leaf). Phase 2 replaces record exports with Payload queries; types are the contract (ADR-002)
- **Note:** `vitalCells()` is the single source of truth for the four vitals labels — both the plate and the detail strip call it so they cannot drift (ADR-006)

### Access control (buyer portal)
- **Responsibility:** Verify a per-litter passcode; issue and validate a signed access cookie
- **Tech:** Node `crypto` (HMAC-SHA256), `server-only`, Next Server Actions, `cookies()`
- **Key files:** src/lib/litter-access.ts, src/app/litters/[slug]/updates/{page,actions}.tsx
- **Depends on:** `LITTER_ACCESS_SECRET` + `LITTER_PASSCODE_*` env vars
- **Note:** Deterrence, not authentication — see Security Boundaries and ADR-008

### Pages
- **Responsibility:** Route composition, copy, metadata, static params
- **Key files:** src/app/{page,dogs,shop,litters,the-bloodline,about}
- **Depends on:** components/, data layer

### Components
- **Responsibility:** Reusable presentation (BloodlinePlate, VitalsStrip, PedigreePanel, HealthCertificate, ShirtMockup, PhotoPlaceholder, Hero, Nav, Footer, WaitlistCta, Reveal, SocialEmbed)
- **Key files:** src/components/*
- **Depends on:** Data layer types; globals.css utility classes

## Data Flow (Critical Path)

1. Build — placeholder-data records imported by pages
2. Prerender — all routes static except `/litters/[slug]/updates`
3. Serve — static HTML + `/_next/image`-optimized JPEGs
4. Convert — public pages funnel to `/#waitlist` (sticky CTA on mobile, suppressed inside the portal)
5. Portal — request → cookie check → locked form or update feed, rendered per request

## Data Stores

- None. Portal access state lives entirely in a signed client cookie; there is no session store.
- Planned: Neon Postgres (under Payload), Cloudflare R2 (media).

## External Integrations

- **Google Fonts** — build-time via next/font
- **Vercel** — hosting, env vars, deployment protection
- Planned: Payload CMS (Phase 2), Stripe Checkout on the client's account (Phase 4), TikTok/IG embeds (Phase 3)

## Security Boundaries

- **Public everything except `/litters/[slug]/updates`.**
- That route is gated by a per-litter passcode held in an env var, compared timing-safely over SHA-256 digests, granting an HMAC-signed, HttpOnly, SameSite=Lax cookie scoped to `/litters/<slug>` for 30 days.
- `import "server-only"` in `litter-access.ts` makes it a build error for any client component to pull passcodes into the browser bundle.
- Every failure path fails **closed**: missing/short/malformed secret, unknown litter, bad code → locked state, never an open page.
- **There is no rate limiting.** Accepted deliberately (ADR-008), mitigated by a fixed 400ms delay, a 10+ character code requirement, and no public litter index. **Nothing sensitive may go behind this gate** — puppy photos and progress notes only.
- Stripe keys will live only in client-owned accounts (ADR-003); the developer never handles them.
- Published certificate scans are redacted at the pixel level; unredacted originals stay in gitignored `/images` (ADR-007).

## Known Constraints / Trade-offs

- Mobile is the primary experience (traffic arrives from TikTok/IG); desktop is the adaptation
- Photography drives the design — pages degrade visually without strong images, and we currently have 5
- A new litter requires a new env var and a redeploy; this does not scale past a handful of litters (ADR-008)
- `LITTER_ACCESS_SECRET` rotation invalidates every buyer's access at once — it is the only revocation mechanism
