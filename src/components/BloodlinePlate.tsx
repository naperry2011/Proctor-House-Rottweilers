import Image from "next/image";
import Link from "next/link";
import { type Dog, vitalCells } from "@/lib/placeholder-data";

/**
 * The "bloodline plate" — the signature element the site is remembered by
 * (spec §2). Premium collectible: gold hairline frame, engraved (Cinzel) name
 * plate, and health results rendered as bold Anton stat blocks.
 *
 * Two states, one component:
 *  - foundation dogs link to their detail page
 *  - "next generation" dogs (named, no photos yet) render as a non-clickable
 *    teaser. The link must be dropped HERE, not by the caller, or the card
 *    points at a page that intentionally 404s.
 *
 * The 4:5 photo frame, the fixed name zone and the four stat cells are held
 * constant across both states so a mixed grid keeps its rhythm.
 *
 * Driven entirely by the `Dog` shape so it drops straight onto CMS data.
 */
export function BloodlinePlate({ dog }: { dog: Dog }) {
  const stats = vitalCells(dog);
  const photo = dog.photos[0];
  const isTeaser = !photo;
  const firstName = dog.name.split(" ")[0];
  const subtitle = dog.tagline ?? (dog.titles.length > 0 ? dog.titles.join(" · ") : null);

  const card = (
    <article className="relative flex h-full flex-col overflow-hidden rounded-xl bg-surface transition-transform duration-300 group-hover:-translate-y-1">
      {/* Gold hairline frame */}
      <div className="pointer-events-none absolute inset-0 z-20 rounded-xl ring-1 ring-inset ring-gold/40 transition group-hover:ring-gold/70" />
      <div className="bg-gold-metallic absolute inset-0 z-10 rounded-xl p-px">
        <div className="h-full w-full rounded-[11px] bg-surface" />
      </div>

      <div className="relative z-20 flex h-full flex-col">
        {/* Photo — or the engraved placeholder for a teaser */}
        <div className="relative aspect-[4/5] overflow-hidden rounded-t-xl">
          {photo ? (
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              style={{ objectPosition: photo.focal }}
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-surface-2">
              <span
                aria-hidden
                className="font-plate text-gold-metallic text-6xl opacity-40"
              >
                {firstName.charAt(0)}
              </span>
            </div>
          )}

          <span className="absolute left-3 top-3 rounded-full bg-ink/80 px-3 py-1 font-impact text-xs text-gold">
            {dog.role === "sire" ? "Sire" : "Dam"}
          </span>

          {isTeaser ? (
            <span className="absolute bottom-3 right-3 rounded-full bg-ink/80 px-3 py-1.5 text-xs font-semibold text-muted">
              Photos coming soon
            </span>
          ) : (
            <span className="absolute bottom-3 right-3 rounded-full bg-ink/80 px-3 py-1.5 text-xs font-semibold text-gold opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              Meet {firstName} →
            </span>
          )}
        </div>

        {/* Engraved name plate — fixed-minimum zone so cards align */}
        <div className="flex min-h-[5.5rem] flex-col justify-start px-5 pt-5">
          <h3 className="font-plate text-gold-metallic text-xl leading-tight">
            {dog.name}
          </h3>
          {subtitle && (
            <p className="mt-1 text-xs font-medium uppercase tracking-wider text-muted">
              {subtitle}
            </p>
          )}
        </div>

        {/* Health results as Anton stat blocks */}
        <dl className="mt-4 grid grid-cols-2 gap-px bg-gold/10 px-5">
          {stats.map((s) => (
            <div key={s.key} className="bg-surface-2 px-3 py-2">
              <dt className="text-[0.6rem] uppercase tracking-[0.2em] text-muted">
                {s.label}
              </dt>
              <dd
                className={`font-impact text-sm ${s.pending ? "text-muted" : "text-bone"}`}
              >
                {s.value}
              </dd>
            </div>
          ))}
        </dl>

        <p className="flex-1 px-5 py-4 text-sm leading-relaxed text-bone/75">
          {dog.description}
        </p>

        <span
          className={`px-5 pb-4 text-xs font-semibold uppercase tracking-wider ${
            isTeaser
              ? "text-muted"
              : "text-gold/80 transition-colors group-hover:text-gold"
          }`}
        >
          {isTeaser ? "Profile in progress" : `Read ${firstName}’s story →`}
        </span>
      </div>
    </article>
  );

  if (isTeaser) {
    return <div className="group block h-full">{card}</div>;
  }

  return (
    <Link href={`/dogs/${dog.slug}`} className="group block h-full">
      {card}
    </Link>
  );
}
