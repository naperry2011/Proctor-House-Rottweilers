import Image from "next/image";
import Link from "next/link";
import { Hero } from "@/components/Hero";
import { BloodlinePlate } from "@/components/BloodlinePlate";
import { SocialEmbed } from "@/components/SocialEmbed";
import { Reveal } from "@/components/Reveal";
import { dogs, litters, getDog, brand } from "@/lib/placeholder-data";

const statusLabel: Record<string, string> = {
  planned: "Planned",
  expected: "Expected",
  available: "Available Now",
};

export default function Home() {
  const featured = dogs.slice(0, 3);

  return (
    <>
      <Hero />

      {/* Bloodline story teaser */}
      <Reveal as="section" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <p className="font-impact text-gold text-sm tracking-wider">
          The pedigree is the moat
        </p>
        <h2 className="font-impact mt-3 max-w-3xl text-3xl text-bone sm:text-5xl">
          Champion import lines. Health clearances on every dog.
        </h2>
        <p className="mt-5 max-w-2xl text-lg text-bone/75">
          {brand.positioning} — our Rottweilers trace to world-champion European
          imports, bred for the oversized, blocky structure the line is known for
          and backed by full OFA health testing. It is what justifies the
          investment and answers the skeptics.
        </p>
        <Link
          href="/the-bloodline"
          className="mt-6 inline-block font-semibold text-gold hover:underline"
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
            <span
              className="hidden text-sm font-medium text-muted sm:block"
              title="Coming soon"
            >
              Full roster coming soon
            </span>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
          <h2 className="font-impact text-3xl text-bone sm:text-4xl">
            Current &amp; Upcoming Litters
          </h2>
          <div className="relative hidden aspect-[4/3] overflow-hidden rounded-xl ring-1 ring-gold/30 lg:block">
            <Image
              src="/dogs/puppy-run.jpg"
              alt="Rottweiler puppy running on grass"
              fill
              sizes="320px"
              className="object-cover"
            />
          </div>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {litters.map((litter) => {
            const sire = getDog(litter.sireSlug);
            const dam = getDog(litter.damSlug);
            return (
              <div
                key={litter.slug}
                className="rounded-xl border border-gold/20 bg-surface p-6"
              >
                <div className="flex items-center justify-between">
                  <span className="bg-gold-metallic rounded-full px-3 py-1 font-impact text-xs text-ink">
                    {statusLabel[litter.status]}
                  </span>
                  <span className="text-sm text-muted">
                    Whelp: {litter.whelpDate}
                  </span>
                </div>
                <p className="font-plate text-gold-metallic mt-4 text-lg">
                  {sire?.name} × {dam?.name}
                </p>
                <p className="mt-2 text-sm text-bone/75">{litter.note}</p>
                <Link
                  href="#waitlist"
                  className="mt-4 inline-block text-sm font-semibold text-gold hover:underline"
                >
                  Reserve a spot on the waitlist →
                </Link>
              </div>
            );
          })}
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
