import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BloodlinePlate } from "@/components/BloodlinePlate";
import { Reveal } from "@/components/Reveal";
import { foundationDogs, brand } from "@/lib/placeholder-data";

export const metadata: Metadata = {
  title: "The Bloodline",
  description:
    "The Designer Gorilla Bloodline — respected Serbian and European pedigrees, oversized blocky structure, and FCI/KSS health testing behind every Proctor House Rottweiler.",
};

const pillars = [
  {
    title: "Pedigrees That Read",
    body: "Rotco-Roler, Crni Vitez, Timit-Tor, Vom Hause Edelstein. Our dogs trace to respected Serbian and European bloodlines, documented on AKC certified pedigrees.",
  },
  {
    title: "Built Like Gorillas",
    body: "Large, blocky heads, dense bone, and substance on purpose. The phenotype the brand is known for, bred deliberately and selectively.",
  },
  {
    title: "Health, Documented",
    body: "Our breeding dogs carry international FCI/KSS hip and elbow evaluations — and where we have it, Embark DNA screening. Size never comes at the cost of soundness.",
  },
];

export default function BloodlinePage() {
  return (
    <>
      {/* Header */}
      <section className="relative overflow-hidden border-b border-gold/15">
        <Image
          src="/dogs/hulk-vom-proctor-house/standing.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_25%] opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/75 to-ink/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink to-transparent" />
        <div className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6">
          <p className="font-plate text-xs tracking-[0.4em] text-gold">
            {brand.positioning}
          </p>
          <h1 className="font-impact mt-4 text-5xl text-bone sm:text-7xl">
            The <span className="text-gold-metallic">Bloodline</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-bone/80">
            The pedigree is the moat. This is the line behind the Designer
            Gorillas — where the dogs come from, why they look the way they do,
            and the health testing that backs every one.
          </p>
        </div>
      </section>

      {/* The story */}
      <Reveal as="section" className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
        <h2 className="font-impact text-3xl text-bone sm:text-4xl">
          Generation After Generation
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-relaxed text-bone/80">
          <p>
            Proctor House began with a simple conviction: if you want
            extraordinary Rottweilers, you start with extraordinary stock. Our
            foundation dogs are backed by respected Serbian and European
            bloodlines, documented on AKC certified pedigrees.
          </p>
          <p>
            From there the line was bred toward a clear vision — the oversized,
            blocky &ldquo;gorilla&rdquo; build, paired with the steady,
            affectionate, protective temperament that makes a Rottweiler a true{" "}
            <span className="text-gold">Loving Family Protector</span>.
          </p>
          <p>
            What separates a bloodline from a series of litters is what you keep.
            Princess Peach was born here, evaluated here, and brought back into
            the program as a producer. Out of Beauty&rsquo;s Kings Litter we held
            back two males rather than sell them. That is the whole idea:{" "}
            <span className="text-gold">{brand.motto}</span>
          </p>
          <p className="rounded-lg border border-gold/20 bg-surface p-5 text-base text-bone/75">
            <span className="font-semibold text-gold">A note on size:</span> the
            breed community holds differing views on oversized versus
            breed-standard Rottweilers. This is our established breeding decision
            — and it is exactly why we keep pedigrees and health results front
            and center. Substance and soundness, together.
          </p>
        </div>
      </Reveal>

      {/* Pillars */}
      <section className="bg-surface/40 py-20">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 sm:px-6 md:grid-cols-3">
          {pillars.map((p) => (
            <Reveal key={p.title}>
              <div className="h-full rounded-xl border border-gold/20 bg-surface p-7">
                <h3 className="font-plate text-gold-metallic text-lg">
                  {p.title}
                </h3>
                <p className="mt-3 text-bone/75">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* The dogs */}
      <Reveal as="section" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-impact text-3xl text-bone sm:text-4xl">
            The Dogs Behind the Line
          </h2>
          <Link
            href="/dogs"
            className="hidden whitespace-nowrap py-2 text-sm font-semibold text-gold hover:underline sm:block"
          >
            See all our dogs →
          </Link>
        </div>
        {/* Three here, full roster on /dogs — the two pages shouldn't be twins. */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {foundationDogs()
            .slice(0, 3)
            .map((dog) => (
              <BloodlinePlate key={dog.slug} dog={dog} />
            ))}
        </div>
        <Link
          href="/dogs"
          className="mt-6 inline-block py-2 text-sm font-semibold text-gold hover:underline sm:hidden"
        >
          See all our dogs →
        </Link>
      </Reveal>

      {/* CTA */}
      <section className="border-t border-gold/15 py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="font-impact text-3xl text-bone sm:text-5xl">
            Want a puppy from this line?
          </h2>
          <Link
            href="/#waitlist"
            className="bg-gold-metallic mt-8 inline-block rounded-full px-8 py-4 text-sm font-bold uppercase tracking-wide text-ink"
          >
            Join the Waitlist
          </Link>
        </div>
      </section>
    </>
  );
}
