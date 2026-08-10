import { type Dog, formatDate, vitalCells } from "@/lib/placeholder-data";

/**
 * "Born + four results" strip on the dog detail page. Health data is the moat
 * (spec §2/§4), so it sits directly under the hero rather than buried.
 *
 * Cells come from vitalCells() — the same helper the plate uses — so the label
 * set can never drift between the two surfaces.
 */
export function VitalsStrip({ dog }: { dog: Dog }) {
  const stats = vitalCells(dog);

  return (
    <section className="border-b border-gold/15 bg-surface/40">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px bg-gold/10 px-4 py-0 sm:px-6 md:grid-cols-5">
        {/* Full row on phones so the four results grid 2x2 beneath it */}
        <div className="col-span-2 bg-surface px-4 py-5 md:col-span-1">
          <p className="text-[0.65rem] uppercase tracking-[0.2em] text-muted">
            Born
          </p>
          <p className="font-impact mt-1 text-lg text-bone">
            {dog.dateOfBirth ? formatDate(dog.dateOfBirth) : "—"}
          </p>
        </div>
        {stats.map((s) => (
          <div key={s.key} className="bg-surface px-4 py-5">
            <p className="text-[0.65rem] uppercase tracking-[0.2em] text-muted">
              {s.label}
            </p>
            <p
              className={`font-impact mt-1 text-lg ${s.pending ? "text-muted" : "text-bone"}`}
            >
              {s.value}
            </p>
          </div>
        ))}
      </div>
      <div className="mx-auto max-w-6xl px-4 pb-4 sm:px-6">
        <p className="text-xs text-muted">
          Hips and elbows graded under the international FCI/KSS system, where
          <span className="text-bone/70"> A</span> is the top hip
          classification and <span className="text-bone/70">0</span> the top
          elbow classification.
        </p>
      </div>
    </section>
  );
}
