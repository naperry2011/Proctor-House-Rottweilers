/**
 * Content contract for Proctor House Rottweilers.
 *
 * ADR-002: these types are the schema the Payload CMS collections will
 * implement in Phase 2. Pages/components consume the shapes, never the source.
 * Swapping the record exports for Payload queries must require zero component
 * edits — keep the types stable.
 *
 * Naming note: the module is still called "placeholder-data", but as of the
 * 2026-08 asset delivery the DATA is real and client-authored (transcribed from
 * the four kennel PDFs and the FCI/KSS certificates). Only the *storage* is
 * placeholder.
 *
 * PRIVACY: the client's certificate scans carry owner name, AKC registration
 * numbers and microchip numbers. Never surface those. We publish the grade
 * ("A", "0") and the registry ("AKC"), never the identifying numbers.
 */

/* ------------------------------------------------------------------ dogs -- */

export type DogRole = "sire" | "dam";

/**
 * Roster tier. "foundation" dogs have a full detail page; "next-generation"
 * dogs are named teasers with no photos yet (the Kings Litter keepers).
 * Payload: a select field, so the client promotes a dog with a dropdown.
 */
export type DogTier = "foundation" | "next-generation";

/**
 * A parent. Always has a display name; `slug` is present only when the parent
 * is itself on our roster (Peach's sire is Hulk). One shape covers both the
 * internal and external case — renderers link when a slug exists.
 * Payload: group { name: text, dog: relationship→dogs (optional) }.
 */
export interface Parent {
  name: string;
  /** → Dog.slug, when this parent is on our own roster. */
  slug?: string;
}

/**
 * The FIXED four-cell vitals strip. Order comes from VITAL_FIELDS and never
 * varies between dogs — the grid rhythm is a design invariant. Fields are
 * optional because the client's records are genuinely uneven (only Hulk has
 * DNA testing); a missing value renders as VITAL_PENDING rather than
 * collapsing the grid or inventing a clearance.
 *
 * Replaces the old OFA-shaped HealthClearances {hips,elbows,cardiac,eyes}.
 * These dogs are graded under FCI/KSS, where "A" and "0" are the top marks.
 */
export interface DogVitals {
  /** FCI/KSS hip grade, e.g. "A". */
  hips?: string;
  /** FCI/KSS elbow grade, e.g. "0". */
  elbows?: string;
  /** e.g. "Embark Clear". */
  dna?: string;
  /** Registry only — never the registration number. e.g. "AKC". */
  registration?: string;
}

export type VitalKey = keyof DogVitals;

/** Canonical label + order for the vitals strip. Single source of truth. */
export const VITAL_FIELDS: readonly { key: VitalKey; label: string }[] = [
  { key: "hips", label: "Hips" },
  { key: "elbows", label: "Elbows" },
  { key: "dna", label: "DNA" },
  { key: "registration", label: "Registry" },
] as const;

/** Rendered when a vital is unknown. Never an empty cell, never a guess. */
export const VITAL_PENDING = "—";

export interface Photo {
  /** /public path for now; R2 URL in Phase 2. */
  src: string;
  alt: string;
  /** CSS object-position, e.g. "center 35%". Phone framing varies a lot. */
  focal?: string;
}

export interface Dog {
  slug: string;
  name: string;
  role: DogRole;
  tier: DogTier;
  /** ISO date. Optional — Next Generation dogs may not be published yet. */
  dateOfBirth?: string;
  /** Role line from the client's PDFs, e.g. "Foundation Stud". Not a title. */
  tagline?: string;
  /** Earned titles only (IPO1, BH, CH…). Empty across this roster today. */
  titles: string[];
  /** First photo is the plate/hero image. Empty array = teaser state. */
  photos: Photo[];
  /** YouTube / TikTok URLs — never re-hosted (spec §5). */
  videoUrls: string[];
  vitals: DogVitals;
  sire?: Parent;
  dam?: Parent;
  /** Kennel of record; set for homebred dogs. */
  breeder?: string;
  /** e.g. "The Kings Litter". */
  notableProduction?: string;
  notableLitterSlug?: string;
  /** Ancestor names off the pedigree, rendered as an engraved name list. */
  pedigreeNames?: string[];
  /** Prose pedigree summary. */
  pedigree?: string;
  /** Client-authored profile PDF, /public path. Safe to publish (no PII). */
  pedigreePdf?: string;
  /** One-line summary used on the plate. */
  description: string;
  /** Story paragraphs for the detail page. */
  history: string[];
}

/* --------------------------------------------------------------- litters -- */

export type LitterStatus = "planned" | "expected" | "whelped" | "available";

export interface Litter {
  slug: string;
  /** Display name, e.g. "The Kings Litter". */
  name: string;
  /** Parent shape, not raw slugs — a litter may have an external stud. */
  sire: Parent;
  dam: Parent;
  /** ISO date, actual or expected. */
  whelpDate?: string;
  status: LitterStatus;
  note: string;
  /**
   * Passcode-gated buyer update feed. When true, /litters/[slug]/updates
   * exists and requires the code named by passcodeEnvKey.
   */
  updatesEnabled: boolean;
  /**
   * Name of the env var holding this litter's passcode, e.g.
   * "LITTER_PASSCODE_KINGS". The code itself is NEVER in this file.
   */
  passcodeEnvKey?: string;
}

export interface LitterUpdate {
  id: string;
  /** → Litter.slug */
  litterSlug: string;
  /** ISO date */
  date: string;
  title: string;
  body: string[];
  photos: Photo[];
  videoUrls?: string[];
}

/* ----------------------------------------------------------------- merch -- */

export type MerchStatus = "coming-soon" | "available" | "sold-out";

export interface MerchItem {
  slug: string;
  name: string;
  description: string;
  /** Integer cents. Never a float, never a preformatted string. */
  priceCents: number;
  currency: "usd";
  sizes: string[];
  /** Placeholder art is drawn by <ShirtMockup>; this carries the design text. */
  artwork: { headline: string; sub?: string };
  status: MerchStatus;
  /**
   * Stripe Price ID, created by the CLIENT in their own dashboard. Phase 4
   * reads this to build a Checkout Session. `price_…` IDs are not secrets.
   * We never handle the client's keys (ADR-003).
   */
  stripePriceId?: string;
}

/* ----------------------------------------------------------------- data -- */

export const dogs: Dog[] = [
  {
    slug: "hulk-vom-proctor-house",
    name: "Hulk Vom Proctor House",
    role: "sire",
    tier: "foundation",
    dateOfBirth: "2022-07-21",
    tagline: "Foundation Stud",
    titles: [],
    photos: [
      {
        src: "/dogs/hulk-vom-proctor-house/portrait.jpg",
        alt: "Hulk Vom Proctor House sitting, showing his broad head and heavy bone",
        focal: "center 22%",
      },
      {
        src: "/dogs/hulk-vom-proctor-house/standing.jpg",
        alt: "Hulk Vom Proctor House seated beside the kennel run",
        focal: "center 25%",
      },
    ],
    videoUrls: [],
    vitals: {
      hips: "A",
      elbows: "0",
      dna: "Embark Clear",
      registration: "AKC",
    },
    sire: { name: "Hannibal Rotco-Roler" },
    dam: { name: "Khybearah Von Der Sol" },
    notableProduction: "The Cinema Litter",
    notableLitterSlug: "the-cinema-litter",
    pedigreeNames: [
      "Marshall Rotco-Roler",
      "Hulk Crni Vitez",
      "Eminem Vom Hause Edelstein",
      "Dolcegabbana Vom Tannenfeld",
      "Diablo Timit-Tor",
      "Doctor Timit-Tor",
    ],
    pedigree:
      "American-bred and backed by strong Serbian and European bloodlines, Hulk's AKC certified pedigree stacks Rotco-Roler, Crni Vitez, Timit-Tor and Vom Hause Edelstein lines on both sides.",
    pedigreePdf: "/pedigrees/hulk-vom-proctor-house.pdf",
    description:
      "A cornerstone male of the Designer Gorilla Bloodline — powerful structure, heavy bone, and an impressive headpiece.",
    history: [
      "Hulk Vom Proctor House is a cornerstone male of Proctor House Rottweilers and an important part of the foundation behind our Designer Gorilla Bloodline.",
      "Born July 21, 2022, Hulk is an American-bred Rottweiler backed by strong Serbian and European bloodlines. He represents exactly what we strive to produce at Proctor House: powerful structure, heavy bone, an impressive headpiece, strong breed type, confident temperament, and undeniable presence.",
      "Hulk isn't just about looks and pedigree. He carries an A rating on his hips and a 0 on his elbows through his international FCI/KSS evaluation, and he has been DNA tested through Embark and cleared of more than 272 genetic health conditions — information we use to make educated, responsible decisions when selecting his breeding partners.",
      "Hulk represents the combination of power, pedigree, health, structure, and production quality that we want carrying the Proctor House name. His genetics will continue to play an important role in the generations we produce moving forward.",
    ],
  },
  {
    slug: "beauty-vom-proctor-house",
    name: "Beauty Vom Proctor House",
    role: "dam",
    tier: "foundation",
    dateOfBirth: "2024-05-14",
    tagline: "Mother of the Kings Litter",
    titles: [],
    photos: [
      {
        src: "/dogs/beauty-vom-proctor-house/portrait.jpg",
        alt: "Beauty Vom Proctor House standing on the turf run in a leather harness",
        focal: "42% 30%",
      },
    ],
    videoUrls: [],
    vitals: { hips: "A", elbows: "0", registration: "AKC" },
    sire: { name: "Xico De Yolcris" },
    dam: { name: "Vaina De Yolcris" },
    notableProduction: "The Kings Litter",
    notableLitterSlug: "the-kings-litter",
    pedigreeNames: [
      "Eminem Vom Hause Edelstein",
      "Doctor Timit-Tor",
      "Roko Vom Hause Edelstein",
      "Lotta Vom Hause Edelstein",
      "Lucifer Timit-Tor",
      "Hera Timit-Tor",
      "Lex Vom Hause Edelstein",
    ],
    pedigree:
      "An impressive European pedigree bringing together respected Vom Hause Edelstein and Timit-Tor bloodlines through Xico and Vaina De Yolcris.",
    pedigreePdf: "/pedigrees/beauty-vom-proctor-house.pdf",
    description:
      "A proven producer — strong structure, substance, a powerful headpiece, and the dam behind our Kings Litter.",
    history: [
      "Beauty Vom Proctor House is a standout female within the Proctor House Rottweilers breeding program. Combining an impressive European pedigree, excellent health results, powerful Rottweiler type, and proven production, Beauty has established herself as an important part of the foundation and future of our program.",
      "Born May 14, 2024, Beauty is the daughter of Xico De Yolcris × Vaina De Yolcris. Her pedigree brings together respected European bloodlines and influential dogs, including Eminem Vom Hause Edelstein, Doctor Timit-Tor, Roko Vom Hause Edelstein, Lotta Vom Hause Edelstein, Lucifer Timit-Tor, Hera Timit-Tor, and Lex Vom Hause Edelstein.",
      "Beauty possesses many of the qualities we strive for at Proctor House: strong structure, substance, impressive breed type, a powerful headpiece, beautiful expression, and unmistakable Rottweiler presence. Her combination of phenotype and pedigree made her an exciting addition to our breeding program, but what she has produced has made her even more valuable to our future.",
      "Beauty has already made her mark as the mother of our Kings Litter. The quality we saw from that litter led us to retain two males for the future of Proctor House — King Louie, our breeder's pick, and King Kong. Keeping both within our own program reflects how highly we value what Beauty produced.",
    ],
  },
  {
    slug: "princess-peach-vom-proctor-house",
    name: "Princess Peach Vom Proctor House",
    role: "dam",
    tier: "foundation",
    dateOfBirth: "2024-02-22",
    tagline: "Mother of the Cinema Litter",
    titles: [],
    photos: [
      {
        src: "/dogs/princess-peach-vom-proctor-house/portrait.jpg",
        alt: "Princess Peach Vom Proctor House standing in profile on the gravel run",
        focal: "45% 35%",
      },
    ],
    videoUrls: [],
    vitals: { hips: "A", elbows: "0", registration: "AKC" },
    // Homebred: her sire is on our own roster, so this parent links internally.
    sire: { name: "Hulk Vom Proctor House", slug: "hulk-vom-proctor-house" },
    dam: { name: "Dzesi Vom Tannenfeld" },
    breeder: "Proctor House Rottweilers",
    notableProduction: "The Cinema Litter",
    notableLitterSlug: "the-cinema-litter",
    pedigreeNames: [
      "Hannibal Rotco-Roler",
      "Marshall Rotco-Roler",
      "Diablo Timit-Tor",
      "Hulk Crni Vitez",
      "Eminem Vom Hause Edelstein",
      "Doctor Timit-Tor",
      "Lucifer Timit-Tor",
      "Lex Vom Hause Edelstein",
      "Mia Vom Haus Maresi",
    ],
    pedigree:
      "Proctor House genetics on her sire's side and respected European bloodlines throughout — a daughter of Hulk carrying forward one of the cornerstone males behind our program.",
    pedigreePdf: "/pedigrees/princess-peach-vom-proctor-house.pdf",
    description:
      "Bred and raised here — a homebred daughter of Hulk and the dam behind our Cinema Litter.",
    history: [
      "Princess Peach Vom Proctor House is a homebred female who represents the continued development of the Proctor House Rottweilers breeding program. With Proctor House genetics on her sire's side and respected European bloodlines throughout her pedigree, Peach brings together power, substance, structure, breed type, and generations of carefully selected genetics.",
      "Born February 22, 2024, Peach is the daughter of Hulk Vom Proctor House × Dzesi Vom Tannenfeld. As a daughter of Hulk, she carries forward one of the cornerstone males behind our program while adding the influence of Dzesi's Serbian pedigree.",
      "Being homebred makes Peach especially important to us. She represents a generation of Proctor House genetics that we were able to produce, evaluate, raise, and ultimately incorporate back into our own breeding program. She represents exactly what our Designer Gorilla Bloodline is about — building generation after generation rather than simply producing individual litters.",
      "For us, every generation has a purpose. Peach going from a puppy produced here at Proctor House to becoming the mother of our Cinema Litter is exactly what building a true bloodline is all about.",
    ],
  },
  {
    slug: "remi-vom-proctor-house",
    name: "Remi Vom Proctor House",
    role: "dam",
    tier: "foundation",
    dateOfBirth: "2024-10-12",
    tagline: "Proctor House Female",
    titles: [],
    photos: [
      {
        src: "/dogs/remi-vom-proctor-house/portrait.jpg",
        alt: "Remi Vom Proctor House sitting square, showing her headpiece and substance",
        focal: "center 18%",
      },
    ],
    videoUrls: [],
    vitals: { hips: "A", elbows: "0", registration: "AKC" },
    sire: { name: "Hemmy Black Vom Proctor House" },
    dam: { name: "Dzesi Vom Tannenfeld" },
    pedigree:
      "Bred from carefully selected bloodlines to continue building on the genetics behind our program.",
    pedigreePdf: "/pedigrees/remi-vom-proctor-house.pdf",
    description:
      "The next generation of Proctor House females — heavy bone, a powerful headpiece, and unmistakable presence.",
    history: [
      "Remi Vom Proctor House is a powerful young female representing the next generation of Proctor House Rottweilers. Bred from carefully selected bloodlines, Remi brings together the combination of structure, substance, pedigree, and breed type that we strive to preserve throughout our program.",
      "Born October 12, 2024, Remi is the daughter of Hemmy Black Vom Proctor House × Dzesi Vom Tannenfeld. This pairing was designed to continue building upon the genetics behind our program while producing a female with the quality and foundation to play an important role in the future of Proctor House.",
      "Remi possesses the strong characteristics we look for in our females: heavy bone, a powerful headpiece, excellent substance, strong structure, and an unmistakable Rottweiler presence. As she has matured, she has continued to develop into the type of female we envisioned when the breeding was planned.",
      "With her combination of pedigree, health, structure, and presence, we believe she has the foundation to become an important female within our breeding program and contribute to the generations that follow.",
    ],
  },

  /* --- Next Generation: named, photographed later. No detail pages. --- */
  {
    slug: "king-louie-vom-proctor-house",
    name: "King Louie Vom Proctor House",
    role: "sire",
    tier: "next-generation",
    tagline: "Breeder's Pick — Kings Litter",
    titles: [],
    photos: [],
    videoUrls: [],
    vitals: {},
    sire: { name: "Kings Litter sire" },
    dam: { name: "Beauty Vom Proctor House", slug: "beauty-vom-proctor-house" },
    breeder: "Proctor House Rottweilers",
    description:
      "Retained from the Kings Litter as our breeder's pick, growing out for the next chapter of the program.",
    history: [],
  },
  {
    slug: "king-kong-vom-proctor-house",
    name: "King Kong Vom Proctor House",
    role: "sire",
    tier: "next-generation",
    tagline: "Kings Litter",
    titles: [],
    photos: [],
    videoUrls: [],
    vitals: {},
    sire: { name: "Kings Litter sire" },
    dam: { name: "Beauty Vom Proctor House", slug: "beauty-vom-proctor-house" },
    breeder: "Proctor House Rottweilers",
    description:
      "Retained from the Kings Litter, carrying Beauty's genetics forward into the next generation of Proctor House.",
    history: [],
  },
];

/**
 * NOTE FOR FUTURE PAIRINGS: Peach and Remi are maternal half-sisters (both out
 * of Dzesi Vom Tannenfeld), and Hulk is Peach's sire. Hulk × Peach is a
 * father/daughter pairing and must never be recorded here.
 */
export const litters: Litter[] = [
  {
    slug: "the-kings-litter",
    name: "The Kings Litter",
    sire: { name: "Kings Litter sire" },
    dam: { name: "Beauty Vom Proctor House", slug: "beauty-vom-proctor-house" },
    status: "whelped",
    note: "Produced King Louie (breeder's pick) and King Kong, both retained for the Proctor House program.",
    updatesEnabled: true,
    passcodeEnvKey: "LITTER_PASSCODE_KINGS",
  },
  {
    slug: "the-cinema-litter",
    name: "The Cinema Litter",
    sire: { name: "Hulk Vom Proctor House", slug: "hulk-vom-proctor-house" },
    dam: {
      name: "Princess Peach Vom Proctor House",
      slug: "princess-peach-vom-proctor-house",
    },
    status: "whelped",
    note: "Peach's homegrown Proctor House foundation paired with carefully selected genetics.",
    updatesEnabled: true,
    passcodeEnvKey: "LITTER_PASSCODE_CINEMA",
  },
];

/**
 * Sample buyer-portal updates so the client can see the shape of the feed.
 * Replace with real posts once the portal is approved; photos intentionally
 * empty until the client supplies puppy imagery.
 */
export const litterUpdates: LitterUpdate[] = [
  {
    id: "cinema-week-6",
    litterSlug: "the-cinema-litter",
    date: "2026-07-28",
    title: "Week 6 — weaning and first outdoor play",
    body: [
      "Everyone is fully weaned and eating four times a day. Weights are right where we want them and the whole litter is moving well.",
      "We opened the side run this week so they get real footing under them. Expect the next batch of photos to be a lot muddier.",
    ],
    photos: [],
  },
  {
    id: "cinema-week-4",
    litterSlug: "the-cinema-litter",
    date: "2026-07-14",
    title: "Week 4 — eyes open, temperaments showing",
    body: [
      "Eyes and ears are fully open and the personalities are starting to separate. Early neurological stimulation is done and we have started crate introductions.",
      "Individual photos of each puppy go up next week, once they hold still for longer than a second.",
    ],
    photos: [],
  },
  {
    id: "kings-going-home",
    litterSlug: "the-kings-litter",
    date: "2026-06-02",
    title: "Going-home week",
    body: [
      "Final vet checks are complete and every puppy is cleared to travel. Microchip paperwork and health records go home in your folder.",
      "King Louie and King Kong are staying with us at Proctor House — thank you to everyone who understood why we held them back.",
    ],
    photos: [],
  },
];

export const merch: MerchItem[] = [
  {
    slug: "designer-gorilla-tee",
    name: "Designer Gorilla Tee",
    description:
      "Heavyweight black cotton tee with the Designer Gorilla Bloodline mark across the chest in metallic gold.",
    priceCents: 3500,
    currency: "usd",
    sizes: ["S", "M", "L", "XL", "2XL", "3XL"],
    artwork: { headline: "DESIGNER", sub: "GORILLA BLOODLINE" },
    status: "coming-soon",
  },
  {
    slug: "how-you-breed-em-tee",
    name: "How You Breed 'Em Tee",
    description:
      "The kennel motto, front and center. Black on black with a gold outline print.",
    priceCents: 3500,
    currency: "usd",
    sizes: ["S", "M", "L", "XL", "2XL", "3XL"],
    artwork: { headline: "HOW YOU", sub: "BREED 'EM" },
    status: "coming-soon",
  },
  {
    slug: "loving-family-protectors-tee",
    name: "Loving Family Protectors Tee",
    description:
      "The tagline that started it all, set in engraved serif caps over the Proctor House crest.",
    priceCents: 3200,
    currency: "usd",
    sizes: ["S", "M", "L", "XL", "2XL", "3XL"],
    artwork: { headline: "LOVING FAMILY", sub: "PROTECTORS" },
    status: "coming-soon",
  },
  {
    slug: "proctor-house-hoodie",
    name: "Proctor House Hoodie",
    description:
      "Heavyweight fleece hoodie with the full kennel lockup on the back and a small crest on the chest.",
    priceCents: 6500,
    currency: "usd",
    sizes: ["S", "M", "L", "XL", "2XL", "3XL"],
    artwork: { headline: "PROCTOR HOUSE", sub: "ROTTWEILERS" },
    status: "coming-soon",
  },
];

/* ------------------------------------------------------------- selectors -- */

export function getDog(slug: string): Dog | undefined {
  return dogs.find((d) => d.slug === slug);
}

export function getLitter(slug: string): Litter | undefined {
  return litters.find((l) => l.slug === slug);
}

/** Newest first. */
export function getLitterUpdates(litterSlug: string): LitterUpdate[] {
  return litterUpdates
    .filter((u) => u.litterSlug === litterSlug)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getMerch(slug: string): MerchItem | undefined {
  return merch.find((m) => m.slug === slug);
}

/** Dogs with full profiles. These are the only ones with detail pages. */
export function foundationDogs(): Dog[] {
  return dogs.filter((d) => d.tier === "foundation");
}

/** Named teasers — no photos, no detail page. */
export function nextGenerationDogs(): Dog[] {
  return dogs.filter((d) => d.tier === "next-generation");
}

/**
 * The four vitals cells for a dog: always length 4, always in VITAL_FIELDS
 * order. Both the plate and the detail strip call THIS — the label list must
 * never be duplicated in a component again.
 */
export function vitalCells(
  dog: Dog,
): { key: VitalKey; label: string; value: string; pending: boolean }[] {
  return VITAL_FIELDS.map((f) => {
    const value = dog.vitals[f.key];
    return {
      key: f.key,
      label: f.label,
      value: value ?? VITAL_PENDING,
      pending: value === undefined,
    };
  });
}

/** "2022-07-21" → "July 21, 2022". Avoids printing raw ISO at the user. */
export function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

/** 3500 → "$35". Integer cents in, display string out. */
export function formatPrice(cents: number): string {
  return (cents / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: cents % 100 === 0 ? 0 : 2,
  });
}

/** Brand constants used across the site (spec §1). */
export const brand = {
  name: "Proctor House Rottweilers",
  tagline: "Loving Family Protectors",
  positioning: "Home of the Designer Gorillas",
  motto: "It's not what you feed 'em, it's how you breed 'em.",
  bloodline: "Designer Gorilla Bloodline",
  location: "Arizona",
  phone: "623-698-2961",
  phoneHref: "tel:+16236982961",
  social: {
    facebook: "https://www.facebook.com/",
    tiktok: "https://www.tiktok.com/",
    youtube: "https://www.youtube.com/",
    instagram: "https://www.instagram.com/",
  },
} as const;
