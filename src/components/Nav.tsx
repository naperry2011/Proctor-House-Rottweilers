"use client";

import Link from "next/link";
import { useState } from "react";
import { brand } from "@/lib/placeholder-data";

const liveLinks = [
  { href: "/", label: "Home" },
  { href: "/the-bloodline", label: "The Bloodline" },
  { href: "/about", label: "About / Contact" },
];

// Future-phase pages (CMS / forms). Shown but disabled so the IA reads complete.
const comingSoon = ["Our Dogs", "Available Puppies"];

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-gold/15 bg-ink/85 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Logo lockup placeholder — swap for real engraved-gold mark */}
        <Link href="/" className="group flex flex-col leading-none">
          <span className="font-plate text-gold-metallic text-base sm:text-lg">
            Proctor House
          </span>
          <span className="font-plate text-[0.6rem] tracking-[0.35em] text-muted sm:text-xs">
            Rottweilers
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-7 md:flex">
          {liveLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-bone/80 transition-colors hover:text-gold"
            >
              {l.label}
            </Link>
          ))}
          {comingSoon.map((label) => (
            <span
              key={label}
              title="Coming soon"
              className="cursor-not-allowed text-sm font-medium text-muted/60"
            >
              {label}
            </span>
          ))}
          <Link
            href="#waitlist"
            className="bg-gold-metallic rounded-full px-4 py-2 text-sm font-bold uppercase tracking-wide text-ink shadow-lg shadow-gold-deep/30 transition-transform hover:scale-[1.03]"
          >
            Join the Waitlist
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-md border border-gold/25 text-gold md:hidden"
        >
          <span className="text-xl leading-none">{open ? "✕" : "☰"}</span>
        </button>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div className="border-t border-gold/15 bg-surface md:hidden">
          <div className="flex flex-col px-4 py-3">
            {liveLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="py-3 text-base font-medium text-bone/90 hover:text-gold"
              >
                {l.label}
              </Link>
            ))}
            {comingSoon.map((label) => (
              <span
                key={label}
                className="py-3 text-base font-medium text-muted/60"
              >
                {label}{" "}
                <span className="text-[0.65rem] uppercase tracking-wider">
                  (soon)
                </span>
              </span>
            ))}
            <a
              href={brand.phoneHref}
              className="py-3 text-base font-medium text-gold"
            >
              Call {brand.phone}
            </a>
            <Link
              href="#waitlist"
              onClick={() => setOpen(false)}
              className="bg-gold-metallic mt-2 rounded-full px-4 py-3 text-center text-sm font-bold uppercase tracking-wide text-ink"
            >
              Join the Waitlist
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
