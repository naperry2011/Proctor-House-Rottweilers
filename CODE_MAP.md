# CODE_MAP.md

Repo: Proctor House Rottweilers — marketing/conversion site for an Arizona Rottweiler breeder.
Stack: Next.js 16 (App Router, Turbopack) · React 19 · TypeScript · Tailwind CSS v4.
Phase 1.5: real client content, merch storefront, and a passcode-gated buyer portal.
Still no CMS/DB/payments (Phases 2–5, see `proctor-house-rottweilers-website-spec.md`).

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

* src/components/Nav.tsx — sticky header, mobile drawer (client component); "Available Puppies" is the only remaining disabled link
* src/components/Footer.tsx — explore links, contact, socials, kennel motto; mobile bottom padding clears the fixed CTA
* src/components/WaitlistCta.tsx — fixed mobile-only "Join the Waitlist" button. Client component: reads `usePathname()` to hide itself on the buyer portal

## Bloodline Plate (signature component)

Category: UI

Primary Files:

* src/components/BloodlinePlate.tsx — gold-framed dog card: photo, Cinzel name plate, four vitals stat blocks. Two states in one component — foundation dogs link to `/dogs/[slug]`; "next generation" dogs render as a non-clickable teaser with an engraved monogram placeholder

Supporting Files:

* src/lib/placeholder-data.ts — `Dog` type and `vitalCells()` helper it consumes

## Dog Profile Detail

Category: UI

Primary Files:

* src/components/VitalsStrip.tsx — "Born + four results" strip; shares `vitalCells()` with the plate so labels can never drift
* src/components/HealthCertificate.tsx — redacted FCI/KSS certificate with an explanatory caption; renders nothing when a dog has none
* src/components/PedigreePanel.tsx — parents (linked when in-roster), breeder, notable production, ancestor name list, redacted AKC pedigree chart, profile PDF download

## Merch

Category: UI

Primary Files:

* src/app/shop/page.tsx — catalogue grid; CTAs disabled and labelled "Coming Soon" until Stripe lands
* src/components/ShirtMockup.tsx — inline SVG garment mockup used as placeholder product art (no stock photography to clean up later)

## Buyer Update Portal (passcode-gated)

Category: Feature (auth-adjacent)

Primary Files:

* src/lib/litter-access.ts — **server-only.** Passcode verification and the HMAC-signed access cookie. Read the header comment before touching: this is deterrence, not authentication (ADR-008)
* src/app/litters/[slug]/updates/page.tsx — locked/unlocked states; `force-dynamic` so the gate can never be prerendered away
* src/app/litters/[slug]/updates/actions.ts — `unlockAction` / `lockAction` Server Actions (cookies can only be set here, not during render)
* src/app/litters/[slug]/updates/PasscodeForm.tsx — client form using `useActionState`

Supporting Files:

* src/app/litters/[slug]/page.tsx — public litter page (pairing, status, link into the portal)
* .env.example — required env vars and the rules for choosing passcodes

## Content Data (real content → future CMS contract)

Category: Other (data layer)

Primary Files:

* src/lib/placeholder-data.ts — `Dog`, `Litter`, `LitterUpdate`, `MerchItem`, `DogVitals`, `Parent`, `Photo` types; records; selectors (`getDog`, `foundationDogs`, `getLitterUpdates`, …); `vitalCells()`, `formatDate()`, `formatPrice()`; `brand` constants

Notes:

* The data is now real and client-authored; only the *storage* is placeholder. Types are the contract Payload collections implement in Phase 2 (ADR-002).
* Health data is FCI/KSS (`hips: "A"`, `elbows: "0"`), not OFA, and every vitals field is optional (ADR-006).
* Passcodes are never in this file — `Litter.passcodeEnvKey` only names the env var.

## Pages

Category: UI

Primary Files:

* src/app/page.tsx — Home: hero, bloodline teaser, four foundation plates, litters, social block, #waitlist anchor
* src/app/dogs/page.tsx — Our Dogs index: foundation grid + "The Next Generation" teasers
* src/app/dogs/[slug]/page.tsx — dog detail: portrait hero, vitals strip, story, gallery, health certificate, pedigree. `generateStaticParams` filters to foundation dogs, so teaser slugs 404
* src/app/the-bloodline/page.tsx — brand centerpiece; shows 3 plates and links to /dogs to avoid duplicating it
* src/app/shop/page.tsx — merch catalogue
* src/app/litters/[slug]/page.tsx — public litter page
* src/app/about/page.tsx — story, contact details, disabled contact-form mockup

Supporting Files:

* src/components/Hero.tsx — home full-bleed hero
* src/components/Reveal.tsx — scroll-reveal wrapper (IntersectionObserver + scroll-listener fallback, ADR-005)
* src/components/SocialEmbed.tsx — 9:16 social tiles placeholder (real embeds = Phase 3)
* src/components/PhotoPlaceholder.tsx — drawn stand-in for puppy/litter photos the client hasn't supplied

## Static Assets

Category: Other

Primary Files:

* public/dogs/<slug>/*.jpg — the client's real dogs (5 photos across 4 dogs). Stock photography is gone
* public/pedigrees/*.pdf — client-authored profile PDFs (no PII, safe to publish)
* public/pedigrees/*-fci.jpg, *-akc-pedigree.jpg — **redacted** certificate scans. Registration/microchip numbers and owner name are painted out of the pixels (ADR-007)

Notes:

* `/images` (client originals, unredacted) is gitignored and must stay that way.
* No puppy photography exists yet — `PhotoPlaceholder` fills those slots.

## Config

Category: Infra

Primary Files:

* next.config.ts — empty; the SVG allowance was removed with the placeholders it existed for
* postcss.config.mjs, tsconfig.json, eslint.config.mjs, package.json
* .claude/launch.json — `dev` server config (npm run dev, port 3000)
* .env.example — committed; `.env.local` is gitignored
