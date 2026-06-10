/**
 * Placeholder content for Phase 1 (foundation).
 *
 * These types mirror the spec's data model (§6) and are the contract the
 * Payload CMS collections will implement in Phase 2 — keep them stable.
 * Swap the placeholder records for CMS queries later; pages/components consume
 * these shapes, not the source.
 */

export type DogRole = "sire" | "dam";

/** OFA / health clearances rendered as Anton stat blocks on the bloodline plate. */
export interface HealthClearances {
  hips: string; // e.g. "OFA Good"
  elbows: string; // e.g. "OFA Normal"
  cardiac: string; // e.g. "Normal"
  eyes: string; // e.g. "CAER Clear"
}

export interface Dog {
  slug: string;
  name: string;
  role: DogRole;
  dateOfBirth: string; // ISO date
  /** First photo is the hero/plate image. Local /public paths for now. */
  photos: string[];
  /** YouTube / TikTok URLs — never re-hosted (spec §5). */
  videoUrls: string[];
  health: HealthClearances;
  titles: string[];
  pedigree: string; // champion import-line summary
  description: string;
  /** Story paragraphs for the dog detail page. Filler until client supplies real bios. */
  history: string[];
}

export type LitterStatus = "planned" | "expected" | "available";

export interface Litter {
  slug: string;
  sireSlug: string; // → Dog.slug
  damSlug: string; // → Dog.slug
  whelpDate: string; // ISO date (or expected)
  status: LitterStatus;
  note: string;
}

export const dogs: Dog[] = [
  {
    slug: "titan-vom-proctorhaus",
    name: "Titan vom Proctorhaus",
    role: "sire",
    dateOfBirth: "2021-03-14",
    photos: ["/dogs/titan.jpg"],
    videoUrls: ["https://www.youtube.com/"],
    health: {
      hips: "OFA Good",
      elbows: "OFA Normal",
      cardiac: "Normal",
      eyes: "CAER Clear",
    },
    titles: ["IPO1", "Champion-sired import"],
    pedigree: "Direct son of world-champion German/Serbian import lines.",
    description:
      "Foundation sire of the Designer Gorilla line — large, blocky, and dense bone with the steady family temperament the kennel is known for.",
    history: [
      "Titan came to Arizona at ten weeks old, selected from a litter of titled European imports for one thing: substance. Even as a puppy he carried the dense bone, broad skull, and calm confidence that would become the blueprint for the Designer Gorilla line.",
      "He earned his IPO1 at three, proving the line is more than looks — biddable, steady under pressure, and devoted to his family. Around the house he is a 130-pound shadow who thinks he is a lap dog.",
      "As a producer, Titan stamps his puppies with his head type and his temperament. Families consistently tell us the same thing: their Titan puppy is the easiest dog they have ever raised.",
    ],
  },
  {
    slug: "ofelia-vom-proctorhaus",
    name: "Ofelia vom Proctorhaus",
    role: "dam",
    dateOfBirth: "2021-08-02",
    photos: ["/dogs/ofelia.jpg"],
    videoUrls: ["https://www.tiktok.com/"],
    health: {
      hips: "OFA Excellent",
      elbows: "OFA Normal",
      cardiac: "Normal",
      eyes: "CAER Clear",
    },
    titles: ["BH", "Champion-line import"],
    pedigree: "European import dam from titled, health-tested champion stock.",
    description:
      "Our cornerstone dam — broad head, correct movement, and the affectionate, protective drive that defines a Loving Family Protector.",
    history: [
      "Ofelia is the heart of the program. Imported from a kennel whose dams have produced champions across three generations, she brought the feminine version of the gorilla build — broad head, deep chest, and effortless movement.",
      "She earned her BH with scores that surprised even her trainer, but her real gift is with people. Ofelia reads a room like no dog we have owned: gentle with children, watchful with strangers, and glued to whoever needs her most.",
      "Her litters are known for consistency — uniform structure, dark mahogany markings, and puppies that settle into family life like they were born for it. Because they were.",
    ],
  },
  {
    slug: "kingston-vom-proctorhaus",
    name: "Kingston vom Proctorhaus",
    role: "sire",
    dateOfBirth: "2022-05-19",
    photos: ["/dogs/kingston.jpg"],
    videoUrls: ["https://www.instagram.com/"],
    health: {
      hips: "OFA Good",
      elbows: "OFA Normal",
      cardiac: "Normal",
      eyes: "CAER Clear",
    },
    titles: ["Champion-sired import"],
    pedigree: "Stacked champion pedigree, oversized blocky phenotype.",
    description:
      "A standout of the Gorilla bloodline: massive substance paired with the trainable, people-first disposition buyers come to us for.",
    history: [
      "Kingston is the next chapter. A son of stacked champion lines on both sides, he was the pick of his litter and it showed early — at six months he was already turning heads at fun matches with his bone and head type.",
      "He matured into the biggest dog on the property, but his favorite job is greeting visitors at the gate with a wagging stub and a tennis ball. The 'gorilla' look with a golden-retriever heart.",
      "His first litters arrive this year, and the early pairings with Ofelia are the ones we have been planning for three years. Watch this space.",
    ],
  },
];

export const litters: Litter[] = [
  {
    slug: "titan-x-ofelia-2026",
    sireSlug: "titan-vom-proctorhaus",
    damSlug: "ofelia-vom-proctorhaus",
    whelpDate: "2026-08-15",
    status: "expected",
    note: "Designer Gorilla pairing — waitlist deposits opening soon.",
  },
  {
    slug: "kingston-x-ofelia-2026",
    sireSlug: "kingston-vom-proctorhaus",
    damSlug: "ofelia-vom-proctorhaus",
    whelpDate: "2026-11-01",
    status: "planned",
    note: "Planned winter litter — join the waitlist to be notified first.",
  },
];

export function getDog(slug: string): Dog | undefined {
  return dogs.find((d) => d.slug === slug);
}

/** Brand constants used across the site (spec §1). */
export const brand = {
  name: "Proctor House Rottweilers",
  tagline: "Loving Family Protectors",
  positioning: "Home of the Designer Gorillas",
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
