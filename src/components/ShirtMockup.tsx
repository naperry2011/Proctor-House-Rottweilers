import type { MerchItem } from "@/lib/placeholder-data";

/**
 * Placeholder product art, drawn rather than photographed.
 *
 * Deliberate choice: stock apparel photos would have to be swapped out later
 * (the same trap ADR-004 documents for the dog photos), and a fake product
 * photo implies a product that exists. A drawn mockup reads as an intentional
 * placeholder while still showing the client the print layout and hierarchy.
 *
 * Inline SVG, so it never touches next/image or the optimizer.
 */
export function ShirtMockup({
  artwork,
  hoodie = false,
}: {
  artwork: MerchItem["artwork"];
  hoodie?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 400 400"
      role="img"
      aria-label={`Placeholder artwork: ${artwork.headline} ${artwork.sub ?? ""}`.trim()}
      className="h-full w-full"
    >
      <defs>
        <linearGradient id="phr-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F3EED1" />
          <stop offset="55%" stopColor="#CFB352" />
          <stop offset="100%" stopColor="#8A6B22" />
        </linearGradient>
      </defs>

      <rect width="400" height="400" fill="#1C1916" />

      {/* Garment silhouette */}
      <g fill="#141210" stroke="url(#phr-gold)" strokeWidth="1.5" opacity="0.9">
        <path
          d={
            "M140 92 L108 112 L88 152 L118 170 L128 152 " +
            "L128 330 L272 330 L272 152 L282 170 L312 152 " +
            "L292 112 L260 92 L228 104 L172 104 Z"
          }
        />
        {/* Collar */}
        <path
          d={
            hoodie
              ? "M172 104 Q200 138 228 104 Q214 92 200 92 Q186 92 172 104 Z"
              : "M172 104 Q200 126 228 104"
          }
          fill={hoodie ? "#0B0A08" : "none"}
        />
      </g>

      {/* Print area */}
      <text
        x="200"
        y="205"
        textAnchor="middle"
        fill="url(#phr-gold)"
        fontSize={artwork.headline.length > 12 ? 24 : 30}
        fontWeight="700"
        letterSpacing="1.5"
        fontFamily="var(--font-impact), Impact, sans-serif"
      >
        {artwork.headline}
      </text>
      {artwork.sub && (
        <text
          x="200"
          y="234"
          textAnchor="middle"
          fill="#F5F1E6"
          opacity="0.75"
          fontSize={artwork.sub.length > 14 ? 13 : 16}
          letterSpacing="3"
          fontFamily="var(--font-display), Georgia, serif"
        >
          {artwork.sub}
        </text>
      )}
      <line
        x1="152"
        y1="248"
        x2="248"
        y2="248"
        stroke="url(#phr-gold)"
        strokeWidth="1.5"
      />

      <text
        x="200"
        y="362"
        textAnchor="middle"
        fill="#8C8579"
        fontSize="10"
        letterSpacing="2.5"
        fontFamily="var(--font-sans), system-ui, sans-serif"
      >
        ARTWORK PLACEHOLDER
      </text>
    </svg>
  );
}
