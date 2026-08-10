/**
 * Stand-in for imagery the client hasn't supplied yet — currently puppy and
 * litter photos, of which we have none.
 *
 * Drawn rather than sourced, for the same reason as ShirtMockup: a stock puppy
 * photo would misrepresent this kennel's actual puppies, which is precisely the
 * trap ADR-004 documents. This reads as a deliberate empty state instead, and
 * it drops out the moment a real Photo lands in the data.
 *
 * Fills its container — the caller owns the aspect ratio.
 */
export function PhotoPlaceholder({
  label = "Puppy photos coming soon",
  className = "",
}: {
  label?: string;
  className?: string;
}) {
  return (
    <div
      className={`relative flex h-full w-full items-center justify-center overflow-hidden bg-surface-2 ${className}`}
    >
      {/* Hairline frame, inset so it reads as a plate rather than a broken box */}
      <div className="pointer-events-none absolute inset-2 rounded-lg border border-dashed border-gold/25" />

      <div className="relative flex flex-col items-center gap-3 px-4 text-center">
        <svg
          viewBox="0 0 64 64"
          aria-hidden
          className="h-10 w-10 opacity-50"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ color: "var(--color-gold)" }}
        >
          {/* Camera body */}
          <rect x="6" y="18" width="52" height="36" rx="6" />
          <path d="M22 18l4-7h12l4 7" />
          <circle cx="32" cy="36" r="10" />
        </svg>
        <p className="font-plate text-[0.65rem] tracking-[0.25em] text-muted">
          {label}
        </p>
      </div>
    </div>
  );
}
