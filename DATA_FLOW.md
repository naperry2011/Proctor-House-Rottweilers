# DATA_FLOW.md

Phase 1 is fully static: one in-repo data module feeds all pages at build time. No runtime persistence, no network writes.

## Content → Pages (build time)

Source: src/lib/placeholder-data.ts (`dogs`, `litters`, `brand`)
Transport: ES module import
Processor: Route pages (page.tsx) + BloodlinePlate/Hero/Footer components
Storage: None (prerendered HTML)
Downstream Consumers: Browser

## Dog detail static generation

Source: `dogs` array
Transport: `generateStaticParams()` / `getDog(slug)`
Processor: src/app/dogs/[slug]/page.tsx
Storage: Prerendered route per slug
Downstream Consumers: Browser

## Images

Source: public/dogs/*.jpg
Transport: next/image → `/_next/image` optimizer (resize/format)
Processor: Next image optimization
Downstream Consumers: Browser

## Outbound-only user actions (no backend)

* Waitlist CTAs → in-page anchor `/#waitlist` (form lands Phase 3)
* Phone links → `tel:` URI
* Social tiles / footer links → external platforms (new tab)
* Contact form → disabled mockup; no submission path exists

## Future flows (per spec, not built)

* Browser form → Payload `applications` collection → Postgres (Phase 3)
* Admin → Payload CMS → Postgres + Cloudflare R2 media (Phase 2)
* Browser → Stripe Checkout → webhook → puppy status update (Phase 4)
