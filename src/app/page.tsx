import Link from "next/link";
import { Hero } from "@/components/Hero";
import { BloodlinePlate } from "@/components/BloodlinePlate";
import { PhotoPlaceholder } from "@/components/PhotoPlaceholder";
import { SocialEmbed } from "@/components/SocialEmbed";
import { Reveal } from "@/components/Reveal";
import {
  brand,
  foundationDogs,
  formatDate,
  litters,
  type LitterStatus,
} from "@/lib/placeholder-data";

const statusLabel: Record<LitterStatus, string> = {
  planned: "Planned",
  expected: "Expected",
  whelped: "Whelped",
  available: "Available Now",
};

export default function Home() {
  const featured = foundationDogs();

  return (
    <>
      <Hero />

      {/* Bloodline story teaser */}
      <Reveal as="section" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <p className="font-impact text-gold text-sm tracking-wider">
          The pedigree is the moat
        </p>
        <h2 className="font-impact mt-3 max-w-3xl text-3xl text-bone sm:text-5xl">
          Serbian &amp; European bloodlines. Health results on every dog.
        </h2>
        <p className="mt-5 max-w-2xl text-lg text-bone/75">
          {brand.positioning} — our Rottweilers trace to respected Serbian and
          European bloodlines, bred for the oversized, blocky structure the line
          is known for and backed by international FCI/KSS hip and elbow
          testing. It is what justifies the investment and answers the skeptics.
        </p>
        <Link
          href="/the-bloodline"
          className="mt-4 inline-block py-2 font-semibold text-gold hover:underline"
        >
          Read the bloodline story →
        </Link>
      </Reveal>

      {/* Featured dogs — bloodline plates */}
      <section className="bg-surface/40 py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex items-end justify-between gap-4">
            <h2 className="font-impact text-3xl text-bone sm:text-4xl">
              Our Foundation Dogs
            </h2>
            <Link
              href="/dogs"
              className="hidden py-2 text-sm font-semibold text-gold hover:underline sm:block"
            >
              See all our dogs →
            </Link>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((dog) => (
              <Reveal key={dog.slug} className="h-full">
                <BloodlinePlate dog={dog} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Current / upcoming litters */}
      <Reveal as="section" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="grid items-center gap-8 lg:grid-cols-[1fr_320px]">
          <div>
            <h2 className="font-impact text-3xl text-bone sm:text-4xl">
              Our Litters
            </h2>
            <p className="mt-3 max-w-2xl text-bone/75">
              Families who have reserved a puppy get private photo and video
              updates as their litter grows — ask us for your access code.
            </p>
          </div>
          {/* Placeholder until the client supplies puppy photography. */}
          <div className="relative hidden aspect-[4/3] overflow-hidden rounded-xl ring-1 ring-gold/30 lg:block">
            <PhotoPlaceholder />
          </div>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {litters.map((litter) => (
            <div
              key={litter.slug}
              className="rounded-xl border border-gold/20 bg-surface p-6"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="bg-gold-metallic rounded-full px-3 py-1 font-impact text-xs text-ink">
                  {statusLabel[litter.status]}
                </span>
                {litter.whelpDate && (
                  <span className="text-sm text-muted">
                    {formatDate(litter.whelpDate)}
                  </span>
                )}
              </div>
              <p className="font-plate text-gold-metallic mt-4 text-lg">
                {litter.name}
              </p>
              <p className="mt-1 text-sm text-muted">
                {litter.sire.name} × {litter.dam.name}
              </p>
              <p className="mt-2 text-sm text-bone/75">{litter.note}</p>
              {/* py-2 keeps these at a usable tap size on phones */}
              <div className="mt-2 flex flex-wrap gap-x-5">
                <Link
                  href="/#waitlist"
                  className="py-2 text-sm font-semibold text-gold hover:underline"
                >
                  Reserve a spot on the waitlist →
                </Link>
                {litter.updatesEnabled && (
                  <Link
                    href={`/litters/${litter.slug}/updates`}
                    className="py-2 text-sm font-semibold text-bone/70 hover:text-gold hover:underline"
                  >
                    Buyer updates →
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </Reveal>

      {/* Social feed */}
      <section className="bg-surface/40 py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="font-impact text-3xl text-bone sm:text-4xl">
            Straight From the Feed
          </h2>
          <p className="mt-3 max-w-xl text-bone/75">
            ~3,400 followers and 400+ videos of the pack in real life. Follow
            along — the dogs sell themselves.
          </p>
          <div className="mt-8 max-w-2xl">
            <SocialEmbed />
          </div>
        </div>
      </section>

      {/* Waitlist CTA anchor */}
      <section
        id="waitlist"
        className="scroll-mt-24 border-t border-gold/15 py-24"
      >
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="font-impact text-4xl text-bone sm:text-6xl">
            Join the <span className="text-gold-metallic">Waitlist</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-bone/75">
            We place a limited number of puppies and vet every home. The full
            screening application opens here soon. Until then, reach out directly.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href={brand.phoneHref}
              className="bg-gold-metallic rounded-full px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-ink"
            >
              Call {brand.phone}
            </a>
            <Link
              href="/about"
              className="rounded-full border border-gold/40 px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-gold hover:bg-gold/10"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
