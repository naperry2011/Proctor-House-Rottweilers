import Image from "next/image";
import Link from "next/link";
import type { Dog } from "@/lib/placeholder-data";

/**
 * The "bloodline plate" — the signature element the site is remembered by (spec §2).
 * Premium collectible: gold hairline frame, engraved (Cinzel) name plate, and
 * health clearances rendered as bold Anton stat blocks.
 *
 * The whole plate links to the dog's detail page. Equal-height layout: the card
 * fills its grid cell, the name zone has a fixed minimum so wrapping names don't
 * push the stat blocks out of alignment across cards.
 *
 * Driven entirely by the `Dog` shape so it drops straight onto CMS data in Phase 2.
 */
export function BloodlinePlate({ dog }: { dog: Dog }) {
  const stats: { label: string; value: string }[] = [
    { label: "Hips", value: dog.health.hips },
    { label: "Elbows", value: dog.health.elbows },
    { label: "Cardiac", value: dog.health.cardiac },
    { label: "Eyes", value: dog.health.eyes },
  ];

  return (
    <Link href={`/dogs/${dog.slug}`} className="group block h-full">
      <article className="relative flex h-full flex-col overflow-hidden rounded-xl bg-surface transition-transform duration-300 group-hover:-translate-y-1">
        {/* Gold hairline frame */}
        <div className="pointer-events-none absolute inset-0 z-20 rounded-xl ring-1 ring-inset ring-gold/40 transition group-hover:ring-gold/70" />
        <div className="bg-gold-metallic absolute inset-0 z-10 rounded-xl p-px">
          <div className="h-full w-full rounded-[11px] bg-surface" />
        </div>

        <div className="relative z-20 flex h-full flex-col">
          {/* Photo */}
          <div className="relative aspect-[4/5] overflow-hidden rounded-t-xl">
            <Image
              src={dog.photos[0]}
              alt={dog.name}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <span className="absolute left-3 top-3 rounded-full bg-ink/80 px-3 py-1 font-impact text-xs text-gold">
              {dog.role === "sire" ? "Sire" : "Dam"}
            </span>
            {/* Hover affordance */}
            <span className="absolute bottom-3 right-3 rounded-full bg-ink/80 px-3 py-1.5 text-xs font-semibold text-gold opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              Meet {dog.name.split(" ")[0]} →
            </span>
          </div>

          {/* Engraved name plate — fixed-minimum zone so cards align */}
          <div className="flex min-h-[5.5rem] flex-col justify-start px-5 pt-5">
            <h3 className="font-plate text-gold-metallic text-xl leading-tight">
              {dog.name}
            </h3>
            {dog.titles.length > 0 && (
              <p className="mt-1 text-xs font-medium uppercase tracking-wider text-muted">
                {dog.titles.join(" · ")}
              </p>
            )}
          </div>

          {/* Health clearances as Anton stat blocks */}
          <dl className="mt-4 grid grid-cols-2 gap-px bg-gold/10 px-5">
            {stats.map((s) => (
              <div key={s.label} className="bg-surface-2 px-3 py-2">
                <dt className="text-[0.6rem] uppercase tracking-[0.2em] text-muted">
                  {s.label}
                </dt>
                <dd className="font-impact text-sm text-bone">{s.value}</dd>
              </div>
            ))}
          </dl>

          <p className="flex-1 px-5 py-4 text-sm leading-relaxed text-bone/75">
            {dog.description}
          </p>

          <span className="px-5 pb-4 text-xs font-semibold uppercase tracking-wider text-gold/80 transition-colors group-hover:text-gold">
            Read {dog.name.split(" ")[0]}&rsquo;s story →
          </span>
        </div>
      </article>
    </Link>
  );
}
