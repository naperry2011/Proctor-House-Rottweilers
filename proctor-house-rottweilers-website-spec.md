# Proctor House Rottweilers — Website Project Spec

**Client:** Proctor House Rottweilers (Arizona)
**Type:** Paid client project
**Prepared by:** Nick
**Status:** Planning / architecture
**Last updated:** June 9, 2026

---

## 1. Project Overview

### Current state
The client's existing site (`proctorhouserottweilers.com`) is a bare GoDaddy Website
Builder template — essentially the tagline "Loving Family Protectors" repeated and a
single contact form. No dog profiles, no litters, no health/pedigree information, no
pricing, no waitlist flow. The bar to meaningfully out-build it is low.

### The asset they already have
A strong, established brand and audience:
- **Positioning:** "Designer Gorilla Bloodline" / "Home of the Designer Gorillas" —
  large, blocky Rottweilers from world champion import lines.
- **Tagline:** "Loving Family Protectors"
- **Social reach:** ~3,400 Facebook followers, an active TikTok (~400 videos),
  YouTube channel, and Instagram.
- **Location:** Arizona
- **Public contact:** 623-698-2961

### The real job of the site
Not to build an audience from scratch — they have one. The site exists to **convert
an existing social audience into waitlist applications and deposits**, and to look
like a premium operation that justifies the "Designer Gorilla" positioning.

### Goals (client confirmed: all of the above)
1. Sell puppies / take deposits
2. Build reputation & authority
3. Collect waitlist applications

---

## 2. Brand & Design Direction

**Direction: Bold Urban — high-energy, social-native, premium.** ✅ locked

The logo is gold engraved-serif on white (a luxury/heritage signal). The chosen UX
energy is bold and social-native. The bridge is **black + gold** — flip the white to
near-black and the gold reads as luxury *and* street at once. We honor the elegant
mark while delivering the loud, feed-continuous feel.

### Design system

**Palette (sampled from the logo)**

| Token | Hex | Use |
|-------|-----|-----|
| Ink | `#0B0A08` | Primary background (warm near-black) |
| Surface | `#141210` | Raised surfaces / cards |
| Surface 2 | `#1C1916` | Insets, stat blocks |
| Gold Hi | `#F3EED1` | Highlight / gradient top |
| Gold | `#CFB352` | Core brand color |
| Gold Deep | `#664C15` | Gradient base / shadows |
| Gold Metallic | `linear-gradient(135deg,#F3EED1,#CFB352,#8A6B22)` | Buttons, headline accents, frames |
| Mahogany | `#4A1E12` | Secondary accent (breed coat) |
| Bone | `#F5F1E6` | Primary text on dark |
| Muted | `#8C8579` | Secondary text |

**Typography**

- **Cinzel** (display/brand serif) — echoes the logo's engraved Trajan-style caps;
  free web stand-in for Trajan. Heritage moments, eyebrows, dog name plates. Used with
  restraint. *(If the client owns the actual logo font, swap it in here.)*
- **Anton** (impact display) — heavy condensed; the loud, social-native headlines.
- **Inter** (body / UI) — clean, readable.

**Principles**

- **Mobile-first, hard.** Traffic arrives mid-scroll from TikTok/IG on a phone. The
  mobile experience *is* the site.
- **Photography is the interface.** Big, full-bleed, high-contrast imagery. Design gets
  out of the way of great photos/video.
- **Motion that feels like the feed.** Scroll reveals, vertical (9:16) video framing,
  embedded TikTok/IG so the site breathes like their socials.
- **Conversion never more than a tap away.** Persistent gold "Join the Waitlist."
- **The pedigree is the moat.** Champion import lines + health clearances sell premium
  pricing *and* preempt skeptics of oversized Rottweilers.

**Signature element — the "bloodline plate."** Each dog is presented like a premium
collectible: gold hairline frame, engraved (Cinzel) name plate, and health clearances
rendered as bold Anton stat blocks. This is the element the site is remembered by.

> Note: the breed community has differing views on oversized/"gorilla" Rottweilers
> vs. breed standard. This is the client's established brand and breeding decision.
> Keeping health clearances and champion pedigrees prominent serves the brand and
> answers skeptics at the same time.

---

## 3. Site Architecture

| Page | Purpose |
|------|---------|
| **Home** | Brand hero, the bloodline story, featured dogs, current/upcoming litters, embedded social feed, strong waitlist CTA |
| **The Bloodline / Our Gorillas** | Centerpiece. Import-line story, champion pedigrees, what makes the line distinct |
| **Our Dogs** | Sires & dams, each linking to a detail page |
| **Dog Detail** | Photos/video, DOB, health clearances (OFA hips/elbows, cardiac, eyes), titles, pedigree |
| **Available Puppies / Litters** | Current & upcoming litters; each puppy with status (Available / Reserved / Sold), price, photos |
| **Waitlist Application** | Real screening form (not just a contact box) |
| **Health & Guarantee** | Health testing approach, guarantee terms, contract overview *(client-supplied content)* |
| **About / Contact** | Story, location, phone, social links, contact form |
| **Testimonials / Our Families** | Social proof from placed puppies |
| **Blog (optional)** | Breed care articles for SEO / organic traffic |

---

## 4. Features by Goal

### Reputation & authority
- Dog detail pages with health clearances and titles **prominent**, not buried.
- Champion import pedigree presentation.
- Testimonials from existing families.

### Waitlist applications
- Screening form: living situation, experience with the breed, why a Rott, vet
  reference, intended use (family/protection/show), timeline.
- The depth of the form itself signals a serious breeder who vets buyers.

### Selling puppies / deposits
- Per-puppy status workflow: Available → Reserved → Sold.
- Deposit collection via **Stripe Checkout**.
- **Important:** Stripe connects to the *client's own* account using their keys.
  Nick does not handle or enter payment credentials.

---

## 5. Tech Stack

| Layer | Choice | Notes |
|-------|--------|-------|
| Framework | **Next.js (App Router)** | SSG/SSR for SEO, image optimization for heavy photo/video |
| Hosting | **Vercel** | Already in use |
| CMS / backend | **Payload CMS** ✅ locked | Runs natively inside Next.js; client self-manages dogs, litters, *and* reviews applications in one admin |
| Database | **Postgres** (Neon or Vercel Postgres) ✅ locked | Plumbing underneath Payload; client never sees it |
| Media storage | **Cloudflare R2** ✅ locked | 10GB free, zero egress, S3-compatible (Payload S3 adapter) |
| Image optimization | **Next/Image** | Resizing/format handled on the Next.js side |
| Payments | **Stripe** | Client's connected account |
| Video | Embedded YouTube/TikTok (URLs stored in CMS) | Never re-hosted; existing social content does the work |

### Backend decision: alternatives to Supabase

The key constraint is that the client is **non-technical** and won't log into a raw
database. The decision is really "where do form submissions land, and how does the
client review them with the fewest logins."

| Option | How it works | Best for | Tradeoff |
|--------|-------------|----------|----------|
| **Payload CMS (single backend)** ⭐ | Applications are a collection alongside dogs/litters; one admin login | Cleanest client handoff, fewest moving parts | Self-hosted backend to maintain |
| **Sanity + Formspree/Basin** | Sanity for content; form service emails + stores submissions | Simple, low maintenance | Submissions live in a third party, not queryable |
| **Airtable** | Submissions land in a spreadsheet-like base; build a pipeline (New → Contacted → Approved → Deposit Paid) | Very client-friendly review UX | Another tool/subscription |
| **Vercel Postgres / Neon / Turso** | Hand-rolled DB | Full control | Requires building a custom admin for the client |
| **Firebase / Firestore** | Auth + DB + storage BaaS | Closest like-for-like swap for Supabase | NoSQL; client still won't log in directly |

**Recommendation:** Payload CMS as the single backend (content + applications in one
admin), or Sanity + a form service if a lighter footprint is preferred. Supabase is
viable but adds a backend the client can't touch.

---

## 6. Data Model

**Dog**
- name, role (sire / dam), date of birth, photos, video URLs
- health clearances (OFA hips, elbows, cardiac, eyes)
- titles, pedigree, description

**Litter**
- sire (→ Dog), dam (→ Dog), whelp date, status (planned / expected / available)

**Puppy**
- belongs to a Litter
- sex, color/markings, price, status (available / reserved / sold), photos

**Application**
- buyer contact, screening answers, status (new / contacted / approved / deposit paid)

**Testimonial**
- family name, quote, photo, placed puppy reference

---

## 7. Build Phases

**Phase 1 — Foundation**
Next.js scaffold on Vercel, design system / brand styling, static pages
(Home, Bloodline, About/Contact).

**Phase 2 — Content backend**
Stand up Payload CMS, model Dogs/Litters/Puppies, build Our Dogs + dog detail +
Available Puppies pages pulling from CMS.

**Phase 3 — Conversion**
Waitlist application form → backend collection, application review workflow for the
client, social feed embeds.

**Phase 4 — Commerce**
Stripe deposit checkout wired to client's account, puppy reservation status flow,
health/guarantee pages with client-supplied content.

**Phase 5 — Polish & launch**
SEO (metadata, sitemap, local "rottweiler puppies Arizona" targeting), performance
pass, content migration, domain cutover from GoDaddy, client admin training.

---

## 8. Open Items / Client Deliverables

These are the client's responsibility — scope them in writing to avoid liability:
- [ ] **Health guarantee text** (their wording / lawyer's)
- [ ] **Puppy contract** terms
- [ ] **Deposit refund policy** — explicit, in writing
- [ ] Stripe account ownership & connection
- [ ] Final dog roster, pedigrees, and health clearance documentation
- [ ] High-resolution photo/video assets
- [ ] Domain access (currently GoDaddy)

### Still to confirm
- Exact number of dogs / litters (sizing — hobby kennel vs. larger operation)
- Whether client wants to self-manage content (confirms CMS choice)
- Pricing tiers per bloodline
