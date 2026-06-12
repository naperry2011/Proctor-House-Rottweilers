# Project Memory

Running history of what's been built and current state. Update after major changes.

## Current State

**Status:** Active Development (Phase 1 of 5 complete)
**Last Updated:** 2026-06-10
**Version:** Phase 1 foundation (pre-deploy, local only)

### What's Working
- Full design system: black+gold "Bold Urban" brand, Cinzel/Anton/Inter, gold-metallic gradient utilities
- Static pages: Home, The Bloodline, About/Contact, Dog detail (`/dogs/[slug]`, statically generated)
- Signature "bloodline plate" component — gold-framed dog cards with OFA stat blocks, linking to detail pages
- Persistent waitlist CTA (sticky mobile button + nav button + `#waitlist` anchor section)
- Mobile-verified: no horizontal overflow on any route, 44px tap targets, footer clears fixed CTA, iOS safe-area padding
- `npm run build` clean; all routes prerender static

### Known Issues
- Dog photos are Pexels stock, NOT the client's actual dogs — must be replaced before launch (trust issue for a breeder)
- Contact form and waitlist form are visual mockups; no submission backend until Phase 3
- Social links point at platform homepages, not the client's actual profiles (URLs needed from client)
- `next.config.ts` keeps a `dangerouslyAllowSVG` block left over from removed SVG placeholders (harmless)

### In Progress
- Nothing in flight; Phase 1 delivered, awaiting go-ahead for Phase 2

## Implementation History

### 2026-06-10 - Phase 1 Foundation
**What was built:** Next.js 16 scaffold, design system, all static pages, placeholder data layer, real stock photography, dog detail pages with filler histories, mobile hardening pass.
**Why:** Replace bare GoDaddy template; lock brand + conversion skeleton before CMS phases.
**Files affected:** src/app/*, src/components/*, src/lib/placeholder-data.ts, public/dogs/*

## Architecture Evolution

Static-first Next.js 16 (App Router) + Tailwind v4 site; one in-repo data module (`src/lib/placeholder-data.ts`) feeds all pages at build time. Planned evolution per spec: Payload CMS + Postgres + Cloudflare R2 (Phase 2), waitlist forms (Phase 3), Stripe deposits (Phase 4), SEO/launch (Phase 5). See docs/ai/architecture.md.

## Lessons Learned

- Scroll-reveal needed a manual scroll-listener fallback: IntersectionObserver callbacks silently never fired in an embedded preview browser, leaving content permanently invisible. Conversion beats motion — always fail visible.
- Dog-name line-wrap differences staggered the plate stat blocks; fixed-minimum name zone + flex column keeps grid cards aligned.
- The embedded preview's screenshots render black after programmatic scrolls; verify via DOM measurements instead.
