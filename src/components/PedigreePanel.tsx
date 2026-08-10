import Link from "next/link";
import type { Dog, Parent } from "@/lib/placeholder-data";

/**
 * "The pedigree is the moat" (spec §2), made literal.
 *
 * Every section renders only when the underlying data exists, so a thin record
 * degrades to a smaller panel rather than a broken one.
 *
 * The ancestor list is deliberately a LIST, not a tree: the client's PDFs give
 * us influential names behind each dog without stating each one's exact
 * position in the chart. Drawing a tree would assert relationships we can't
 * source.
 *
 * We never render registration or microchip numbers — see the privacy note in
 * placeholder-data.ts.
 */
function ParentCell({ label, parent }: { label: string; parent?: Parent }) {
  return (
    <div className="bg-surface-2 px-4 py-3">
      <p className="text-[0.6rem] uppercase tracking-[0.2em] text-muted">
        {label}
      </p>
      {parent ? (
        parent.slug ? (
          <Link
            href={`/dogs/${parent.slug}`}
            className="font-plate mt-1 block text-gold hover:underline"
          >
            {parent.name} →
          </Link>
        ) : (
          <p className="font-plate mt-1 text-bone/85">{parent.name}</p>
        )
      ) : (
        <p className="font-plate mt-1 text-muted">—</p>
      )}
    </div>
  );
}

export function PedigreePanel({ dog }: { dog: Dog }) {
  const firstName = dog.name.split(" ")[0];
  const hasNames = (dog.pedigreeNames?.length ?? 0) > 0;

  return (
    <div className="rounded-xl border border-gold/20 bg-surface p-6">
      <p className="font-plate text-gold text-sm tracking-[0.2em]">Pedigree</p>

      {dog.pedigree && (
        <p className="mt-3 leading-relaxed text-bone/80">{dog.pedigree}</p>
      )}

      {/* Parents */}
      <div className="mt-5 grid grid-cols-1 gap-px overflow-hidden rounded-lg bg-gold/10 sm:grid-cols-2">
        <ParentCell label="Sire" parent={dog.sire} />
        <ParentCell label="Dam" parent={dog.dam} />
      </div>

      {(dog.breeder || dog.notableProduction) && (
        <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
          {dog.breeder && (
            <p className="text-bone/70">
              <span className="text-muted">Breeder:</span> {dog.breeder}
            </p>
          )}
          {dog.notableProduction &&
            (dog.notableLitterSlug ? (
              <Link
                href={`/litters/${dog.notableLitterSlug}`}
                className="rounded-full border border-gold/40 px-3 py-1 text-xs font-semibold text-gold hover:bg-gold/10"
              >
                {dog.notableProduction} →
              </Link>
            ) : (
              <span className="rounded-full border border-gold/40 px-3 py-1 text-xs font-semibold text-gold">
                {dog.notableProduction}
              </span>
            ))}
        </div>
      )}

      {/* Ancestors */}
      {hasNames && (
        <div className="mt-6">
          <p className="text-[0.65rem] uppercase tracking-[0.2em] text-muted">
            Behind the name
          </p>
          <ul className="mt-3 grid grid-cols-1 gap-x-6 sm:grid-cols-2">
            {dog.pedigreeNames?.map((name) => (
              <li
                key={name}
                className="font-plate border-b border-gold/10 py-2 text-sm text-bone/75"
              >
                {name}
              </li>
            ))}
          </ul>
        </div>
      )}

      {dog.pedigreePdf && (
        <a
          href={dog.pedigreePdf}
          download
          className="mt-6 inline-block rounded-full border border-gold/40 px-5 py-2.5 text-xs font-bold uppercase tracking-wide text-gold transition-colors hover:bg-gold/10"
        >
          Download {firstName}&rsquo;s profile (PDF)
        </a>
      )}

      <p className="mt-4 text-xs text-muted">
        Full certified pedigree and health documentation available on request.
      </p>
    </div>
  );
}
