# Project Memory

Running history of what's been built and current state. Update after major changes.

## Current State

**Status:** Active Development — Phase 1.5 complete (real content + merch + buyer portal)
**Last Updated:** 2026-08-09
**Version:** `main` @ d121d95 — deployed to Vercel production

### What's Working
- Full design system: black+gold "Bold Urban" brand, Cinzel/Anton/Inter, gold-metallic utilities
- **The client's real dogs** — Hulk, Beauty, Princess Peach, Remi — with bios transcribed from their own PDFs. King Louie and King Kong appear as non-clickable "next generation" teasers
- Redacted FCI/KSS certificates on the three females; redacted AKC certified pedigree on Hulk
- Routes: Home, Our Dogs, dog detail, The Bloodline, Shop, public litter pages, About, and the gated buyer portal
- `/shop` merch catalogue with drawn SVG placeholder art and a documented Stripe seam
- Passcode-gated buyer update portal at `/litters/[slug]/updates`
- Mobile-verified at 375px: no horizontal overflow on any route, tap targets ≥36px, drawer links 48px
- `npx tsc --noEmit && npm run lint && npm run build` all clean
- Deployed on Vercel; **still behind Vercel SSO protection**, so the client cannot open it yet

### Known Issues
- **Only 5 photos across 4 dogs.** Beauty, Peach and Remi each carry a whole profile on one image, and most are landscape while the signature plate is a 4:5 portrait frame. Biggest visible weakness
- **No puppy photography at all** — `PhotoPlaceholder` fills the home-page litter slot and the portal feed
- **Hulk has no hip/elbow certificate** — only his AKC pedigree. He is the one dog without visible health proof, which is conspicuous for the foundation stud
- The Kings Litter sire is unnamed in every document; currently a placeholder string
- Contact and waitlist forms are still visual mockups (Phase 3)
- Social links still point at platform homepages, not the client's profiles
- Sample litter updates in the portal are illustrative copy, not real posts
- `npm audit` reports 6 high-severity advisories in the dev dependency tree

### In Progress
- Nothing in flight. Next session: turn off Vercel SSO, send the client email, then Phase 2 planning

## Implementation History

### 2026-06-10 - Phase 1 Foundation
**What was built:** Next.js 16 scaffold, design system, static pages, placeholder data layer, stock photography, dog detail pages, mobile hardening.
**Why:** Replace the bare GoDaddy template; lock brand + conversion skeleton before CMS phases.
**Files affected:** src/app/*, src/components/*, src/lib/placeholder-data.ts, public/dogs/*

### 2026-08-09 - Phase 1.5: real roster, merch, buyer portal
**What was built:** Replaced the three fictional dogs with the client's real four; migrated the health schema from OFA to FCI/KSS with all fields optional; added `/dogs`, `/shop`, `/litters/[slug]` and the passcode-gated `/litters/[slug]/updates`; published redacted certificate scans; swept unsupported pedigree claims out of the copy; mobile tap-target pass.
**Why:** Client delivered real assets (photos + four authored profile PDFs) and asked for a merch page; the buyer portal was our proposal to them.
**Files affected:** src/lib/placeholder-data.ts (rewritten), src/components/* (5 new), src/app/{dogs,shop,litters}/*, public/{dogs,pedigrees}/*, next.config.ts, .env.example

## Architecture Evolution

Static-first Next.js 16 (App Router) + Tailwind v4. One in-repo data module feeds every page at build time — still the CMS seam (ADR-002). Phase 1.5 introduced the first **dynamic** route and the first server-side secret: `/litters/[slug]/updates` is `force-dynamic`, reads env-var passcodes through a `server-only` module, and issues an HMAC-signed HttpOnly cookie. Everything else remains prerendered. Planned: Payload CMS + Postgres + R2 (Phase 2), real forms (Phase 3), Stripe (Phase 4), SEO/launch (Phase 5). See docs/ai/architecture.md.

## Lessons Learned

- **Read what the client actually sent, don't assume.** Four of the nine delivered "photos" were scanned documents — three FCI/KSS certificates and an AKC pedigree — carrying owner name, registration and microchip numbers. Two of them also contained health data the client's own PDFs had omitted (Peach's A/0 grades, Remi's registration), which corrected the data model.
- **A wrong secret must fail loudly.** `LITTER_ACCESS_SECRET` originally accepted any 16+ character string, so pasting the *generator command* instead of its output produced a fully working portal with a publicly-known signing key and no signal. Config that can be silently wrong needs a shape check that fails closed.
- **Never put a usable-looking example value in a public repo.** `.env.example` named a plausible passcode as the "good" example and it was immediately taken as a real value. Give the generator command, not a sample.
- Scroll-reveal needed a scroll-listener fallback: IntersectionObserver callbacks never fire in the embedded preview, leaving content invisible forever (ADR-005). Conversion beats motion.
- The preview pane produces no compositor frames, so CSS transitions never advance and `getComputedStyle` reads the *start* value. `opacity: 0` there is usually an artifact, not a bug — disable the transition to read the true end state before chasing it.
- Windows checkouts hide case-sensitivity bugs: `.JPG` assets work locally and 404 on Vercel. Normalize extensions at import time.
