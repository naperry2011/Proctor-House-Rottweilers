# ENTRY_POINTS.md

Mostly-static Next.js site. No workers, queues, cron, or REST API routes. Phase 1.5 added
Server Actions and one dynamic route.

## Next.js App (dev / build / start)

Path: package.json scripts → `next dev` / `next build` / `next start`
Responsibility: Serve the App Router tree under src/app/
Invokes: src/app/layout.tsx (root), then route pages
Depends On: next.config.ts, src/app/globals.css
Note: Next 16 runs Turbopack by default and refuses a second `next dev` on the same project (lockfile).

## Root Layout

Path: src/app/layout.tsx
Responsibility: Fonts, metadata/viewport, global chrome (Nav/Footer/WaitlistCta) around every route
Invokes: Nav, Footer, WaitlistCta
Depends On: src/lib/placeholder-data.ts (brand), src/app/globals.css

## Routes

Statically prerendered:

* `/` → src/app/page.tsx
* `/dogs` → src/app/dogs/page.tsx
* `/dogs/[slug]` → src/app/dogs/[slug]/page.tsx — slugs from `generateStaticParams()`, **filtered to foundation dogs** so next-generation teasers 404
* `/the-bloodline` → src/app/the-bloodline/page.tsx
* `/shop` → src/app/shop/page.tsx
* `/litters/[slug]` → src/app/litters/[slug]/page.tsx
* `/about` → src/app/about/page.tsx

Server-rendered on demand:

* `/litters/[slug]/updates` → src/app/litters/[slug]/updates/page.tsx
  `export const dynamic = "force-dynamic"` — explicit, not incidental. If this ever renders
  static the passcode gate is bypassed. Verify it shows as `ƒ (Dynamic)` in build output.

## Server Actions

Path: src/app/litters/[slug]/updates/actions.ts (`"use server"`)
Responsibility: `unlockAction` verifies a submitted passcode and sets the access cookie;
`lockAction` clears it
Invoked by: PasscodeForm (via `useActionState`) and the sign-out form
Depends On: src/lib/litter-access.ts, `LITTER_ACCESS_SECRET`, `LITTER_PASSCODE_*`
Note: cookies can only be written from a Server Action or Route Handler — never during render.

## Preview/dev launcher

Path: .claude/launch.json (`dev`)
Responsibility: Dev-server config for Claude preview tooling (npm run dev, port 3000)

## Future entry points (not yet built)

* Payload CMS admin + API routes (Phase 2)
* Waitlist form submission handler (Phase 3)
* Stripe checkout/webhook routes (Phase 4) — the merch seam is documented in src/app/shop/page.tsx
