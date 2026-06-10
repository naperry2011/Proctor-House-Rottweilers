import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/Reveal";
import { dogs, getDog } from "@/lib/placeholder-data";

export function generateStaticParams() {
  return dogs.map((dog) => ({ slug: dog.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const dog = getDog((await params).slug);
  if (!dog) return {};
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
  if (!dog) notFound();

  const firstName = dog.name.split(" ")[0];
  const stats = [
    { label: "Hips", value: dog.health.hips },
    { label: "Elbows", value: dog.health.elbows },
    { label: "Cardiac", value: dog.health.cardiac },
    { label: "Eyes", value: dog.health.eyes },
  ];

  return (
    <>
      {/* Hero — full-bleed portrait with name plate over it */}
      <section className="relative flex min-h-[70vh] items-end overflow-hidden border-b border-gold/15">
        <Image
          src={dog.photos[0]}
          alt={dog.name}
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_40%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/30" />
        <div className="relative mx-auto w-full max-w-6xl px-4 pb-12 pt-40 sm:px-6">
          <span className="rounded-full bg-ink/80 px-4 py-1.5 font-impact text-sm text-gold">
            {dog.role === "sire" ? "Sire" : "Dam"}
          </span>
          <h1 className="font-plate text-gold-metallic mt-4 text-4xl sm:text-6xl">
            {dog.name}
          </h1>
          {dog.titles.length > 0 && (
            <p className="mt-2 text-sm font-medium uppercase tracking-wider text-bone/80">
              {dog.titles.join(" · ")}
            </p>
          )}
        </div>
      </section>

      {/* Vitals — Anton stat blocks, prominent (reputation is the moat) */}
      <section className="border-b border-gold/15 bg-surface/40">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px bg-gold/10 px-4 py-0 sm:px-6 md:grid-cols-5">
          <div className="bg-surface px-4 py-5">
            <p className="text-[0.65rem] uppercase tracking-[0.2em] text-muted">
              Born
            </p>
            <p className="font-impact mt-1 text-lg text-bone">
              {dog.dateOfBirth}
            </p>
          </div>
          {stats.map((s) => (
            <div key={s.label} className="bg-surface px-4 py-5">
              <p className="text-[0.65rem] uppercase tracking-[0.2em] text-muted">
                {s.label}
              </p>
              <p className="font-impact mt-1 text-lg text-bone">{s.value}</p>
            </div>
          ))}
        </div>
      </section>

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

        <div className="mt-10 rounded-xl border border-gold/20 bg-surface p-6">
          <p className="font-plate text-gold text-sm tracking-[0.2em]">
            Pedigree
          </p>
          <p className="mt-2 text-bone/80">{dog.pedigree}</p>
          <p className="mt-3 text-xs text-muted">
            Full pedigree documentation available on request.
          </p>
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
              href="/the-bloodline"
              className="rounded-full border border-gold/40 px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-gold hover:bg-gold/10"
            >
              Back to the Bloodline
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
