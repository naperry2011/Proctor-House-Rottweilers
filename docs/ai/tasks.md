# Tasks

Active work. Update as items are completed and new work is identified.

## Sprint / Iteration

**Range:** 2026-08-09 (Phase 1.5 — real roster, merch, buyer portal)
**Goal:** Get the client's actual dogs on the site, add a merch surface, and
prototype the buyer update portal for client sign-off.

## In Progress

- (none)

## Up Next

- [ ] Deploy to Vercel for client review — client sets `LITTER_ACCESS_SECRET`
      and the `LITTER_PASSCODE_*` vars (see `.env.example`); we never handle
      their credentials (ADR-003)
- [ ] Walk the client through the buyer portal concept + the security caveats
      in ADR-008 before it goes in front of any buyer
- [ ] Phase 2 kickoff: Payload CMS + Neon Postgres + R2

## Blocked — need from client

- [ ] **More photos.** Only 5 usable photos across 4 dogs (Hulk 2, everyone else
      1). Beauty, Peach and Remi each carry their whole profile on one image.
      Portrait/vertical shots especially — the signature plate is a 4:5 frame
      and most of what we have is landscape.
- [ ] **Puppy / litter photos.** None exist yet. `<PhotoPlaceholder>` fills the
      slots on the home page and in the portal feed — drop real `Photo` entries
      into `litterUpdates[].photos` and the placeholders disappear on their own.
- [ ] **The Kings Litter sire.** Not named in any PDF; currently a placeholder
      string in `litters[]`.
- [ ] **Confirm Hulk is the only DNA-tested dog** — his is the only Embark
      result in the PDFs, so the other three show "—" under DNA.
- [ ] **Hulk's FCI/KSS certificate.** Beauty, Peach and Remi each have a scan on
      their profile now; Hulk has none, so his page shows no Health Testing
      section even though his PDF states hips A / elbows 0. Ask the client for
      the scan — it's the odd one out on an otherwise consistent set.
- [ ] **Confirm Beauty's timeline.** DOB 2024-05-14 and already dam of the Kings
      Litter with two retained males. Chronologically tight; sanity-check before
      it is public.
- [ ] Real social profile URLs — `brand.social` still points at platform
      homepages, and a footer linking to facebook.com root looks amateur
- [ ] Health guarantee text, puppy contract, deposit refund policy (their lawyer)
- [ ] Shirt artwork, final pricing, sizes, shipping & returns terms
- [ ] Stripe account + `price_…` IDs (client's own account)
- [ ] GoDaddy domain access

## Recently Completed

- [x] Real roster: Beauty, Hulk, Princess Peach, Remi — bios transcribed from the
      client's own PDFs; Titan/Ofelia/Kingston deleted — 2026-08-09
- [x] Schema migration `health` → `vitals`, FCI/KSS model, all fields optional,
      shared `vitalCells()` helper (ADR-006) — 2026-08-09
- [x] Asset pipeline: EXIF-aware resize, lowercase `.jpg` normalization
      (Vercel's FS is case-sensitive), 5.02MB → 1.8MB — 2026-08-09
- [x] Withheld 3 certificate scans + 1 pedigree chart carrying owner PII
      (ADR-007); `/images` gitignored — 2026-08-09
- [x] `/dogs` index + Next Generation teasers (King Louie, King Kong) — 2026-08-09
- [x] `PedigreePanel` with parent links (Peach → Hulk), ancestor lists and PDF
      downloads — 2026-08-09
- [x] `/shop` merch catalogue with drawn SVG placeholder art + Stripe seam — 2026-08-09
- [x] `/litters/[slug]` public pages + passcode-gated `/updates` (ADR-008) — 2026-08-09
- [x] Copy audit: removed unsupported "world-champion import" claims sitewide — 2026-08-09
- [x] Removed the `dangerouslyAllowSVG` block from `next.config.ts` — 2026-08-09

## Bugs

- (none known)

## Tech Debt

- [ ] `Reveal.tsx` uses a `@ts-expect-error` on the polymorphic ref — revisit if
      the component grows
- [ ] `src/lib/placeholder-data.ts` is no longer placeholder *data*, only
      placeholder *storage*. Rename to `content.ts` when Payload lands.
- [ ] `npm audit` reports 6 high-severity advisories in the dev dependency tree —
      triage before launch
- [ ] The portal's sample `litterUpdates` are illustrative copy; replace with
      real posts once the client approves the concept
