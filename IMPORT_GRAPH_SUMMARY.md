# IMPORT_GRAPH_SUMMARY.md

Shallow graph: pages → components → data module. No circular dependencies.

## Core Dependency Nodes

* src/lib/placeholder-data.ts — imported by every page, layout, Nav, Footer, Hero, SocialEmbed, BloodlinePlate (types + records + brand constants). The single most load-bearing module; becomes the CMS adapter seam in Phase 2.
* src/app/globals.css — all styling tokens/utilities; every component's class names resolve against it.
* src/components/Reveal.tsx — reused by all pages for scroll animation.
* src/components/BloodlinePlate.tsx — reused by Home and The Bloodline; defines the dog-card contract.

## Potential Refactor Risk Areas

* src/lib/placeholder-data.ts (Phase 2 will replace record exports with Payload queries — keep type exports stable; everything imports from here)
* Custom utility classes in globals.css (`font-impact`, `font-plate`, `text-gold-metallic`, `bg-gold-metallic`) — string-based contract used across all TSX; renaming requires a global sweep
* src/app/layout.tsx font CSS variables (`--font-cinzel/anton/inter`) must stay in sync with `@theme` font tokens in globals.css
