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
    <footer className="border-t border-gold/15 bg-surface">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <p className="font-plate text-gold-metallic text-lg">
            {brand.name}
          </p>
          <p className="mt-1 font-plate text-xs tracking-[0.3em] text-muted">
            {brand.tagline}
          </p>
          <p className="mt-4 text-sm text-muted">{brand.positioning}</p>
        </div>

        <div className="text-sm">
          <p className="font-impact text-gold text-lg">Contact</p>
          <a
            href={brand.phoneHref}
            className="mt-2 block text-bone/90 hover:text-gold"
          >
            {brand.phone}
          </a>
          <p className="mt-1 text-muted">{brand.location}</p>
          <Link
            href="/about"
            className="mt-3 inline-block text-gold hover:underline"
          >
            About &amp; contact form →
          </Link>
        </div>

        <div className="text-sm">
          <p className="font-impact text-gold text-lg">Follow the pack</p>
          <ul className="mt-2 space-y-1">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-bone/90 hover:text-gold"
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
