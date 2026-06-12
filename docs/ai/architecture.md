# Architecture

System design at a glance. Pair with CODE_MAP.md (file map) and DATA_FLOW.md (system flows).

## System Overview

Static-first marketing/conversion site for a Rottweiler breeder. All routes prerender at build time from one in-repo data module; no runtime backend exists in Phase 1. Target deploy: Vercel.

**Style:** Monolith (Next.js App Router, static output)
**Hosting:** Local dev now; Vercel planned

## Core Components

### App shell
- **Responsibility:** Fonts, metadata, viewport, global chrome composition
- **Tech:** Next.js 16 App Router, next/font (Cinzel/Anton/Inter)
- **Key files:** src/app/layout.tsx, src/app/globals.css
- **Depends on:** Design tokens, chrome components, brand constants

### Design system
- **Responsibility:** Brand tokens (ink/surface/gold/bone), gold-metallic gradient, type utilities, reveal animation CSS
- **Tech:** Tailwind CSS v4 `@theme`
- **Key files:** src/app/globals.css

### Data layer (CMS seam)
- **Responsibility:** All content types + records + brand constants
- **Tech:** Plain TS module
- **Key files:** src/lib/placeholder-data.ts
- **Depends on:** Nothing (leaf). Phase 2 replaces record exports with Payload queries; types are the contract (ADR-002).

### Pages
- **Responsibility:** Route composition, copy, metadata, static params
- **Key files:** src/app/page.tsx, src/app/the-bloodline/page.tsx, src/app/dogs/[slug]/page.tsx, src/app/about/page.tsx
- **Depends on:** components/, data layer

### Components
- **Responsibility:** Reusable presentation (BloodlinePlate, Hero, Nav, Footer, WaitlistCta, Reveal, SocialEmbed)
- **Key files:** src/components/*
- **Depends on:** Data layer types; globals.css utility classes

## Data Flow (Critical Path)

1. Build — placeholder-data records imported by pages
2. Prerender — all routes static (`generateStaticParams` for /dogs/[slug])
3. Serve — static HTML + `/_next/image`-optimized JPEGs
4. Convert — every page funnels to `/#waitlist` anchor (sticky CTA on mobile)

## Data Stores

- None in Phase 1. Planned: Neon Postgres (under Payload), Cloudflare R2 (media).

## External Integrations

- **Google Fonts** — build-time via next/font
- Planned: Payload CMS (Phase 2), Stripe Checkout on client's account (Phase 4), TikTok/IG embeds (Phase 3)

## Security Boundaries

- No auth, no user input persisted (forms are disabled mockups). Future: Payload admin auth (Phase 2); Stripe keys live only in client-owned accounts (ADR-003).

## Known Constraints / Trade-offs

- Mobile is the primary experience (traffic arrives from TikTok/IG); desktop is the adaptation
- Photography drives the design — pages degrade visually without strong images
- Stock dog photos are demo-only and block production launch (ADR-004)
