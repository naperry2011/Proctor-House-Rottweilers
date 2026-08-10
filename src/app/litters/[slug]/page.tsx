import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BloodlinePlate } from "@/components/BloodlinePlate";
import {
  brand,
  type Dog,
  formatDate,
  getDog,
  getLitter,
  litters,
  type LitterStatus,
} from "@/lib/placeholder-data";

const statusLabel: Record<LitterStatus, string> = {
  planned: "Planned",
  expected: "Expected",
  whelped: "Whelped",
  available: "Available Now",
};

export function generateStaticParams() {
  return litters.map((litter) => ({ slug: litter.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const litter = getLitter((await params).slug);
  if (!litter) return {};
  return {
    title: litter.name,
    description: `${litter.name} — ${litter.sire.name} × ${litter.dam.name}. ${litter.note}`,
  };
}

export default async function LitterPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const litter = getLitter((await params).slug);
  if (!litter) notFound();

  // Only in-roster parents get a plate; external studs stay as text.
  const parents = [litter.sire, litter.dam]
    .map((p) => (p.slug ? getDog(p.slug) : undefined))
    .filter((d): d is Dog => d !== undefined && d.tier === "foundation");

  return (
    <>
      <section className="border-b border-gold/15 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <span className="bg-gold-metallic rounded-full px-3 py-1 font-impact text-xs text-ink">
            {statusLabel[litter.status]}
          </span>
          <h1 className="font-impact mt-4 text-4xl text-bone sm:text-6xl">
            {litter.name}
          </h1>
          <p className="font-plate text-gold-metallic mt-3 text-lg">
            {litter.sire.name} × {litter.dam.name}
          </p>
          {litter.whelpDate && (
            <p className="mt-1 text-sm text-muted">
              Whelped {formatDate(litter.whelpDate)}
            </p>
          )}
          <p className="mt-5 max-w-2xl text-lg text-bone/75">{litter.note}</p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/#waitlist"
              className="bg-gold-metallic rounded-full px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-ink"
            >
              Join the Waitlist
            </Link>
            {litter.updatesEnabled && (
              <Link
                href={`/litters/${litter.slug}/updates`}
                className="rounded-full border border-gold/40 px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-gold hover:bg-gold/10"
              >
                Buyer updates
              </Link>
            )}
          </div>
        </div>
      </section>

      {parents.length > 0 && (
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className="font-impact text-3xl text-bone sm:text-4xl">
              The Pairing
            </h2>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {parents.map((dog) => (
                <BloodlinePlate key={dog.slug} dog={dog} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="border-t border-gold/15 py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="font-impact text-3xl text-bone sm:text-4xl">
            Questions about this litter?
          </h2>
          <div className="mt-7 flex flex-wrap justify-center gap-4">
            <a
              href={brand.phoneHref}
              className="bg-gold-metallic rounded-full px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-ink"
            >
              Call {brand.phone}
            </a>
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
