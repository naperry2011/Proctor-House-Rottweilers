import type { Metadata } from "next";
import Link from "next/link";
import { BloodlinePlate } from "@/components/BloodlinePlate";
import { Reveal } from "@/components/Reveal";
import {
  brand,
  foundationDogs,
  nextGenerationDogs,
} from "@/lib/placeholder-data";

export const metadata: Metadata = {
  title: "Our Dogs",
  description:
    "The sires and dams behind the Designer Gorilla Bloodline — pedigrees, FCI/KSS health results, and the story of each dog.",
};

export default function DogsPage() {
  const foundation = foundationDogs();
  const nextGen = nextGenerationDogs();

  return (
    <>
      <section className="border-b border-gold/15 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="font-impact text-sm tracking-wider text-gold">
            {brand.motto}
          </p>
          <h1 className="font-impact mt-3 text-4xl text-bone sm:text-6xl">
            Our Dogs
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-bone/75">
            Every dog carrying the Proctor House name is health tested and
            pedigreed. Hips and elbows are graded under the international
            FCI/KSS system — you can see the results on every card below, not
            buried in a PDF.
          </p>
        </div>
      </section>

      {/* Foundation */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="font-impact text-3xl text-bone sm:text-4xl">
            Foundation Dogs
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {foundation.map((dog) => (
              <Reveal key={dog.slug} className="h-full">
                <BloodlinePlate dog={dog} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Next Generation */}
      {nextGen.length > 0 && (
        <section className="border-t border-gold/15 bg-surface/40 py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className="font-impact text-3xl text-bone sm:text-4xl">
              The Next Generation
            </h2>
            <p className="mt-3 max-w-2xl text-bone/75">
              Retained from our Kings Litter and growing out here at Proctor
              House. Full profiles, photos and health results go up as they
              mature.
            </p>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {nextGen.map((dog) => (
                <Reveal key={dog.slug} className="h-full">
                  <BloodlinePlate dog={dog} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="border-t border-gold/15 py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="font-impact text-3xl text-bone sm:text-4xl">
            Interested in a puppy from these lines?
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
              Read the bloodline story
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
