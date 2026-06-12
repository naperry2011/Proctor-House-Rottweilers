# ENTRY_POINTS.md

Static-first Next.js site. No workers, queues, cron, or API routes exist in Phase 1.

## Next.js App (dev / build / start)

Path: package.json scripts → `next dev` / `next build` / `next start`
Responsibility: Serve the App Router tree under src/app/
Invokes: src/app/layout.tsx (root), then route pages
Depends On: next.config.ts, src/app/globals.css

## Root Layout

Path: src/app/layout.tsx
Responsibility: Fonts, metadata/viewport, global chrome (Nav/Footer/WaitlistCta) around every route
Invokes: Nav, Footer, WaitlistCta
Depends On: src/lib/placeholder-data.ts (brand), src/app/globals.css

## Routes (all statically prerendered)

* `/` → src/app/page.tsx
* `/the-bloodline` → src/app/the-bloodline/page.tsx
* `/dogs/[slug]` → src/app/dogs/[slug]/page.tsx — slugs enumerated by `generateStaticParams()` from `dogs` in placeholder-data
* `/about` → src/app/about/page.tsx

## Preview/dev launcher

Path: .claude/launch.json (`dev`)
Responsibility: Dev-server config for Claude preview tooling (npm run dev, port 3000)

## Future entry points (not yet built)

* Payload CMS admin + API routes (Phase 2)
* Waitlist form submission handler (Phase 3)
* Stripe checkout/webhook routes (Phase 4)
