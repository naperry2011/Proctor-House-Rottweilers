# CODE_MAP.md

Repo: Proctor House Rottweilers — marketing/conversion site for an Arizona Rottweiler breeder.
Stack: Next.js 16 (App Router, Turbopack) · React 19 · TypeScript · Tailwind CSS v4.
Phase 1 (foundation) only: static pages + design system + placeholder data. No CMS/DB/payments yet (Phases 2–5, see `proctor-house-rottweilers-website-spec.md`).

## Design System

Category: UI

Primary Files:

* src/app/globals.css — Tailwind v4 `@theme` tokens (ink/surface/gold/bone palette), gold-metallic gradient, `.font-plate` / `.font-impact` / `.text-gold-metallic` utilities, `.reveal` animation CSS
* src/app/layout.tsx — font loading (Cinzel/Anton/Inter via next/font), root metadata, viewport, page chrome composition

External Integrations:

* Google Fonts (build-time, via next/font)

## Site Chrome

Category: UI

Primary Files:

* src/components/Nav.tsx — sticky header, mobile drawer (client component), disabled "coming soon" links for Phase 2 pages
* src/components/Footer.tsx — contact, socials, tagline; mobile bottom padding clears fixed CTA
* src/components/WaitlistCta.tsx — fixed mobile-only "Join the Waitlist" button (links to /#waitlist)

## Bloodline Plate (signature component)

Category: UI

Primary Files:

* src/components/BloodlinePlate.tsx — gold-framed dog card: photo, Cinzel name plate, OFA stat blocks; whole card links to /dogs/[slug]

Supporting Files:

* src/lib/placeholder-data.ts — `Dog` type it consumes

## Content Data (placeholder → future CMS contract)

Category: Other (data layer)

Primary Files:

* src/lib/placeholder-data.ts — `Dog`, `Litter`, `HealthClearances` types; `dogs`, `litters` records; `getDog()`; `brand` constants

Notes:

* These types are the contract Payload CMS collections will implement in Phase 2. Pages consume the shapes, not the source.

## Pages

Category: UI

Primary Files:

* src/app/page.tsx — Home: hero, bloodline teaser, featured plates, litters, social block, #waitlist anchor section
* src/app/the-bloodline/page.tsx — brand centerpiece narrative + pillars + all plates
* src/app/dogs/[slug]/page.tsx — dog detail: portrait hero, vitals strip, history story, pedigree, CTA (static via generateStaticParams)
* src/app/about/page.tsx — story, contact details, disabled contact-form mockup

Supporting Files:

* src/components/Hero.tsx — home full-bleed hero
* src/components/Reveal.tsx — scroll-reveal wrapper (IntersectionObserver + scroll-listener fallback)
* src/components/SocialEmbed.tsx — 9:16 social tiles placeholder (real embeds = Phase 3)

## Static Assets

Category: Other

Primary Files:

* public/dogs/*.jpg — Pexels stock Rottweiler photos (titan/ofelia/kingston/hero/closeup/puppy-run); MUST be replaced with client's real dogs before launch

## Config

Category: Infra

Primary Files:

* next.config.ts — image optimizer SVG allowance (legacy of removed SVG placeholders; harmless)
* postcss.config.mjs, tsconfig.json, eslint.config.mjs, package.json
* .claude/launch.json — `dev` server config (npm run dev, port 3000)
