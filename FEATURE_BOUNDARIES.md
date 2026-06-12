# FEATURE_BOUNDARIES.md

## Data layer (src/lib/placeholder-data.ts)

Owns: `Dog`/`Litter`/`HealthClearances` types, all content records, `brand` constants, `getDog()`
Does NOT Own: Rendering, formatting, routing
Communicates With: Imported by pages/components (one-way)
Isolation Level: Strong

## Design system (src/app/globals.css + layout fonts)

Owns: Color tokens, typography, brand utility classes, reveal animation CSS
Does NOT Own: Component structure or content
Communicates With: Consumed via class names everywhere
Isolation Level: Moderate (string-based coupling to all TSX)

## Site chrome (Nav / Footer / WaitlistCta)

Owns: Global navigation, contact/social footer, persistent conversion CTA
Does NOT Own: Page content, route definitions
Communicates With: layout.tsx (composition), placeholder-data (brand)
Isolation Level: Strong

## BloodlinePlate

Owns: Dog-card presentation and its link to /dogs/[slug]
Does NOT Own: Dog data, page layout, detail-page rendering
Communicates With: Receives `Dog` prop; navigates to dog detail route
Isolation Level: Strong

## Pages (app routes)

Owns: Per-route composition, copy, metadata, static params
Does NOT Own: Shared visuals (delegated to components), data shapes
Communicates With: components/, lib/placeholder-data
Isolation Level: Strong (pages never import each other)

## Reveal

Owns: In-viewport detection + visibility class toggling
Does NOT Own: Animation styles (CSS in globals), children content
Communicates With: Wraps arbitrary children; no data deps
Isolation Level: Strong

## Static assets (public/dogs)

Owns: Stock photo files (placeholder — replace with client assets pre-launch)
Does NOT Own: Optimization (next/image) or references (data layer holds paths)
Communicates With: Referenced by path strings from placeholder-data and components
Isolation Level: Strong

## Cross-cutting constraints

* Conversion path (waitlist CTA) is chrome-level; pages only provide the `#waitlist` anchor target on Home.
* Phase 2+ systems (Payload, Postgres, R2, Stripe) are out of repo entirely; their only planned seam is replacing placeholder-data record exports.
