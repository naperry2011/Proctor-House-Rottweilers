# DATA_FLOW.md

Almost everything is static: one in-repo data module feeds all pages at build time. The one
runtime flow is the buyer portal's passcode check. No database, no persisted user input.

## Content → Pages (build time)

Source: src/lib/placeholder-data.ts (`dogs`, `litters`, `litterUpdates`, `merch`, `brand`)
Transport: ES module import
Processor: Route pages + BloodlinePlate / VitalsStrip / PedigreePanel / HealthCertificate
Storage: None (prerendered HTML)
Downstream Consumers: Browser

## Dog detail static generation

Source: `foundationDogs()`
Transport: `generateStaticParams()` / `getDog(slug)`
Processor: src/app/dogs/[slug]/page.tsx
Storage: Prerendered route per foundation slug
Downstream Consumers: Browser
Note: next-generation dogs are deliberately excluded, so their slugs 404.

## Vitals rendering (single source of truth)

Source: `Dog.vitals` (all fields optional)
Transport: `vitalCells(dog)` — always returns 4 cells in `VITAL_FIELDS` order
Processor: BloodlinePlate (2×2 blocks) and VitalsStrip (Born + 4)
Note: missing values render as `VITAL_PENDING` ("—") in muted type. The site never asserts a
clearance the client doesn't hold (ADR-006).

## Buyer portal access (runtime, the only stateful flow)

1. **Request** → `/litters/[slug]/updates` (force-dynamic)
2. **Read** → `cookies()` → `ph_litter_<slug>`
3. **Verify** → recompute `HMAC-SHA256(LITTER_ACCESS_SECRET, "<slug>.<exp>")`, compare
   timing-safely over SHA-256 digests, check expiry
4. **Branch** → valid ⇒ render update feed; otherwise render the passcode form. Update
   content is never sent to the browser in the locked state
5. **Unlock** → form POST → `unlockAction` Server Action → compare submitted code against
   `process.env[litter.passcodeEnvKey]` → on success `cookies().set(...)` (HttpOnly, SameSite=Lax,
   Secure in production, path-scoped to `/litters/<slug>`, 30 days) → `revalidatePath`
6. **Sign out** → `lockAction` → same cookie, `maxAge: 0`

Storage: none server-side; the cookie *is* the state.
Failure mode: every branch fails closed.

## Images

Source: public/dogs/<slug>/*.jpg, public/pedigrees/*.jpg
Transport: next/image → `/_next/image` optimizer (resize/format)
Processor: Next image optimization
Downstream Consumers: Browser
Note: certificate scans are redacted **before** they enter `public/` — the bars are burned into
the pixels, not applied in CSS (ADR-007). Unredacted originals live in gitignored `/images`.

## Asset import (one-off, out of band)

Source: `/images` (client originals — mixed case, EXIF-rotated, unoptimized, some containing PII)
Processor: scratchpad PowerShell (EXIF orientation → resize → re-encode → redaction bars)
Sink: `public/dogs/`, `public/pedigrees/`
Note: not part of the build. Re-running it means redacting and eyeballing the output again.

## Outbound-only user actions (no backend)

* Waitlist CTAs → in-page anchor `/#waitlist` (real form lands Phase 3)
* Phone links → `tel:` URI
* Social tiles / footer links → external platforms (new tab)
* Contact form → disabled mockup; no submission path
* Shop "Coming Soon" buttons → disabled; Stripe seam documented in src/app/shop/page.tsx

## Future flows (per spec, not built)

* Browser form → Payload `applications` collection → Postgres (Phase 3)
* Admin → Payload CMS → Postgres + Cloudflare R2 media (Phase 2)
* Browser → Stripe Checkout → webhook → puppy status update (Phase 4)
* Payload accounts replace the portal's passcode cookie entirely (Phase 3, ADR-008)
