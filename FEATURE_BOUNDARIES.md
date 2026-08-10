# FEATURE_BOUNDARIES.md

## Data layer (src/lib/placeholder-data.ts)

Owns: `Dog`/`Litter`/`LitterUpdate`/`MerchItem`/`DogVitals`/`Parent`/`Photo` types, all content
records, `brand` constants, selectors, and the shared `vitalCells()` / `formatDate()` / `formatPrice()` helpers
Does NOT Own: Rendering, routing, secrets. It names the passcode env var; it never holds a passcode
Communicates With: Imported by pages/components (one-way)
Isolation Level: Strong

## Access control (src/lib/litter-access.ts)

Owns: Passcode verification, cookie signing/validation, the fail-closed policy
Does NOT Own: UI, litter content, which litters exist (reads that from the data layer)
Communicates With: Server Actions and the portal page only — `server-only` makes client imports a build error
Isolation Level: Strong, and deliberately so. **Do not import this from a client component.**

## Design system (src/app/globals.css + layout fonts)

Owns: Color tokens, typography, brand utility classes, reveal animation CSS
Does NOT Own: Component structure or content
Communicates With: Consumed via class names everywhere
Isolation Level: Moderate (string-based coupling to all TSX)

## Site chrome (Nav / Footer / WaitlistCta)

Owns: Global navigation, contact/social footer, persistent conversion CTA
Does NOT Own: Page content, route definitions
Communicates With: layout.tsx (composition), placeholder-data (brand)
Isolation Level: Strong. WaitlistCta reads `usePathname()` to suppress itself on the buyer portal —
its only route awareness

## BloodlinePlate

Owns: Dog-card presentation, and whether the card is a link at all
Does NOT Own: Dog data, page layout, detail-page rendering
Communicates With: Receives a `Dog`; calls `vitalCells()`
Isolation Level: Strong
Note: the foundation/teaser distinction is decided **inside** the component. Callers must not wrap
it in their own link, or a teaser points at a 404.

## Dog profile panels (VitalsStrip / HealthCertificate / PedigreePanel)

Owns: Presentation of health results, certificates and pedigree
Does NOT Own: The data, or redaction — images arrive already redacted
Communicates With: Receive a `Dog`; VitalsStrip shares `vitalCells()` with BloodlinePlate
Isolation Level: Strong. Each renders nothing when its data is absent, so thin records degrade
gracefully rather than breaking

## Merch (src/app/shop + ShirtMockup)

Owns: Catalogue presentation and placeholder product art
Does NOT Own: Pricing logic, checkout, Stripe credentials
Communicates With: `merch` records; `formatPrice()`
Isolation Level: Strong. The Stripe seam is `MerchItem.stripePriceId` + swapping the disabled
button for a form action — no layout change required

## Buyer portal (src/app/litters/[slug]/updates)

Owns: Locked/unlocked rendering, the passcode form, sign-out
Does NOT Own: Verification logic (delegated to litter-access), litter content
Communicates With: litter-access via Server Actions
Isolation Level: Strong
Note: must stay `force-dynamic`, and must never be linked from a public litter index that
enumerates slugs

## Pages (app routes)

Owns: Per-route composition, copy, metadata, static params
Does NOT Own: Shared visuals (delegated to components), data shapes
Communicates With: components/, lib/placeholder-data
Isolation Level: Strong (pages never import each other)

## Reveal

Owns: In-viewport detection + visibility class toggling
Does NOT Own: Animation styles (CSS in globals), children content
Isolation Level: Strong

## Static assets (public/dogs, public/pedigrees)

Owns: The client's real photos, profile PDFs, and **redacted** certificate scans
Does NOT Own: Optimization (next/image) or references (the data layer holds paths)
Isolation Level: Strong
Note: `/images` holds unredacted originals and is gitignored. Anything entering `public/pedigrees/`
must be redacted and visually verified first (ADR-007)

## Cross-cutting constraints

* Conversion path (waitlist CTA) is chrome-level; pages only provide the `#waitlist` anchor on Home.
* The site must never display a health clearance the client doesn't hold — missing renders as "—".
* Passcodes and the signing secret live only in env vars, never in the repo or a commit message.
* Phase 2+ systems (Payload, Postgres, R2, Stripe) are out of repo; their seam is replacing
  placeholder-data record exports.
