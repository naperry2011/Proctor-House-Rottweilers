import { brand } from "@/lib/placeholder-data";

/**
 * Social-feed placeholder (spec §2/§3). Real TikTok/IG embeds land in Phase 3 —
 * for now this shows 9:16 framed tiles so the layout and "feed-continuous" feel
 * are locked in. URLs come from the CMS later.
 */
const tiles = [
  { platform: "TikTok", href: brand.social.tiktok },
  { platform: "Instagram", href: brand.social.instagram },
  { platform: "YouTube", href: brand.social.youtube },
];

export function SocialEmbed() {
  return (
    <div className="grid grid-cols-3 gap-3 sm:gap-4">
      {tiles.map((t) => (
        <a
          key={t.platform}
          href={t.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex aspect-[9/16] flex-col items-center justify-center overflow-hidden rounded-lg border border-gold/20 bg-surface text-center"
        >
          <span className="bg-gold-metallic absolute inset-x-0 top-0 h-1" />
          <span className="font-impact text-2xl text-gold-metallic">▶</span>
          <span className="mt-2 px-2 text-xs font-semibold uppercase tracking-wider text-bone/80 group-hover:text-gold">
            {t.platform}
          </span>
          <span className="mt-1 text-[0.6rem] text-muted">Feed embed soon</span>
        </a>
      ))}
    </div>
  );
}
