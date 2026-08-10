# IMPORT_GRAPH_SUMMARY.md

Shallow graph: pages → components → data module. No circular dependencies.

## Core Dependency Nodes

* **src/lib/placeholder-data.ts** — imported by every page, layout, Nav, Footer, Hero, and all dog
  components (types + records + brand + formatters). The single most load-bearing module; becomes
  the CMS adapter seam in Phase 2.
* **src/lib/litter-access.ts** — imported *only* by the portal page and its Server Actions. Marked
  `server-only`, so any client-component import is a build error. Keep it that way: it reads
  passcodes from `process.env`.
* **src/app/globals.css** — all styling tokens/utilities; every component's class names resolve here.
* **src/components/Reveal.tsx** — reused by most pages for scroll animation.
* **src/components/BloodlinePlate.tsx** — reused by Home, The Bloodline, /dogs and litter pages;
  defines the dog-card contract and owns the foundation/teaser branch.
* **`vitalCells()`** (exported from placeholder-data) — consumed by both BloodlinePlate and
  VitalsStrip. This exists specifically so the four vitals labels can't drift between the two.

## Potential Refactor Risk Areas

* **src/lib/placeholder-data.ts** — Phase 2 replaces record exports with Payload queries. Keep the
  type exports stable; everything imports from here. Changing a type intentionally ripples: run
  `npx tsc --noEmit` and treat the error list as the definitive consumer list.
* **Custom utility classes in globals.css** (`font-impact`, `font-plate`, `text-gold-metallic`,
  `bg-gold-metallic`, `reveal`/`is-visible`) — string-based contract across all TSX; renaming needs a
  global sweep.
* **src/app/layout.tsx font CSS variables** (`--font-cinzel/anton/inter`) must stay in sync with the
  `@theme` font tokens in globals.css.
* **`export const dynamic = "force-dynamic"`** in the portal page — load-bearing for security, and it
  looks like a removable line. Deleting it silently bypasses the gate.
* **Image path strings** in placeholder-data — the only link between records and `public/`. There is
  no build-time check that a `Photo.src` resolves; a typo 404s at runtime.
