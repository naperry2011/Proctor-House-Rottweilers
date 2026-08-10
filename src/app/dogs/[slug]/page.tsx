import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HealthCertificate } from "@/components/HealthCertificate";
import { PedigreePanel } from "@/components/PedigreePanel";
import { Reveal } from "@/components/Reveal";
import { VitalsStrip } from "@/components/VitalsStrip";
import { foundationDogs, getDog } from "@/lib/placeholder-data";

/**
 * Only foundation dogs get a detail page. Next Generation teasers are named on
 * /dogs but intentionally 404 here — there is no profile to show yet.
 */
export function generateStaticParams() {
  return foundationDogs().map((dog) => ({ slug: dog.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const dog = getDog((await params).slug);
  if (!dog || dog.tier !== "foundation") return {};
  return {
    title: dog.name,
    description: `${dog.name} — ${dog.description}`,
  };
}

export default async function DogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const dog = getDog((await params).slug);
  if (!dog || dog.tier !== "foundation") notFound();

  const firstName = dog.name.split(" ")[0];
  const hero = dog.photos[0];
  const gallery = dog.photos.slice(1);

  return (
    <>
      {/* Hero — full-bleed portrait with name plate over it */}
      <section className="relative flex min-h-[70vh] items-end overflow-hidden border-b border-gold/15">
        {hero && (
          <Image
            src={hero.src}
            alt={hero.alt}
            fill
            priority
            sizes="100vw"
            style={{ objectPosition: hero.focal }}
            className="object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/30" />
        <div className="relative mx-auto w-full max-w-6xl px-4 pb-12 pt-40 sm:px-6">
          <span className="rounded-full bg-ink/80 px-4 py-1.5 font-impact text-sm text-gold">
            {dog.role === "sire" ? "Sire" : "Dam"}
          </span>
          <h1 className="font-plate text-gold-metallic mt-4 text-4xl sm:text-6xl">
            {dog.name}
          </h1>
          {dog.tagline && (
            <p className="mt-2 text-sm font-medium uppercase tracking-wider text-bone/80">
              {dog.tagline}
            </p>
          )}
        </div>
      </section>

      <VitalsStrip dog={dog} />

      {/* Story */}
      <Reveal as="section" className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <p className="font-impact text-sm tracking-wider text-gold">
          The story
        </p>
        <h2 className="font-impact mt-2 text-3xl text-bone sm:text-4xl">
          Meet {firstName}
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-relaxed text-bone/80">
          {dog.history.map((paragraph) => (
            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
          ))}
        </div>

        {gallery.length > 0 && (
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {gallery.map((photo) => (
              <div
                key={photo.src}
                className="relative aspect-[4/3] overflow-hidden rounded-xl ring-1 ring-gold/25"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  style={{ objectPosition: photo.focal }}
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        )}

        <div className="mt-10 space-y-6">
          <HealthCertificate dog={dog} />
          <PedigreePanel dog={dog} />
        </div>
      </Reveal>

      {/* CTA */}
      <section className="border-t border-gold/15 py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="font-impact text-3xl text-bone sm:text-4xl">
            Want a puppy from {firstName}&rsquo;s line?
          </h2>
          <div className="mt-7 flex flex-wrap justify-center gap-4">
            <Link
              href="/#waitlist"
              className="bg-gold-metallic rounded-full px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-ink"
            >
              Join the Waitlist
            </Link>
            <Link
              href="/dogs"
              className="rounded-full border border-gold/40 px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-gold hover:bg-gold/10"
            >
              See all our dogs
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
