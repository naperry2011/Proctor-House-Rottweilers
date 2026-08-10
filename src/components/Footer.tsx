import Link from "next/link";
import { brand } from "@/lib/placeholder-data";

const socials = [
  { label: "Facebook", href: brand.social.facebook },
  { label: "TikTok", href: brand.social.tiktok },
  { label: "YouTube", href: brand.social.youtube },
  { label: "Instagram", href: brand.social.instagram },
];

export function Footer() {
  return (
    // pb-24 on mobile keeps the copyright clear of the fixed waitlist CTA
    <footer className="border-t border-gold/15 bg-surface pb-24 md:pb-0">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <p className="font-plate text-gold-metallic text-lg">
            {brand.name}
          </p>
          <p className="mt-1 font-plate text-xs tracking-[0.3em] text-muted">
            {brand.tagline}
          </p>
          <p className="mt-4 text-sm text-muted">{brand.positioning}</p>
          <p className="mt-4 max-w-xs text-sm italic text-bone/60">
            &ldquo;{brand.motto}&rdquo;
          </p>
        </div>

        <div className="text-sm">
          <p className="font-impact text-gold text-lg">Explore</p>
          {/* py-2 keeps these at a ~40px tap target on phones, where most
              traffic lands. Without it they render ~17px tall. */}
          <ul className="mt-1">
            {[
              { href: "/dogs", label: "Our Dogs" },
              { href: "/the-bloodline", label: "The Bloodline" },
              { href: "/shop", label: "Shop" },
              { href: "/about", label: "About & Contact" },
            ].map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="block py-2 text-bone/90 hover:text-gold"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <a
            href={brand.phoneHref}
            className="mt-3 block py-2 font-semibold text-gold hover:underline"
          >
            {brand.phone}
          </a>
          <p className="mt-1 text-muted">{brand.location}</p>
        </div>

        <div className="text-sm">
          <p className="font-impact text-gold text-lg">Follow the pack</p>
          <ul className="mt-1">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block py-2 text-bone/90 hover:text-gold"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-gold/10 px-4 py-5 text-center text-xs text-muted sm:px-6">
        © {brand.name}. {brand.location}. All rights reserved.
      </div>
    </footer>
  );
}
