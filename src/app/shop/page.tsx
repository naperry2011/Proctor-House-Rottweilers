import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { ShirtMockup } from "@/components/ShirtMockup";
import { brand, formatPrice, merch } from "@/lib/placeholder-data";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Proctor House Rottweilers kennel merch — tees and hoodies carrying the Designer Gorilla Bloodline mark. First drop coming soon.",
};

/**
 * Merch catalogue.
 *
 * STRIPE SEAM (Phase 4): each MerchItem carries an optional `stripePriceId`
 * that the CLIENT creates in their own Stripe dashboard. When that arrives,
 * this card's disabled button becomes a <form action={checkout}> posting the
 * slug to a Server Action that builds a Checkout Session with the client's
 * secret key. Nothing about this layout has to change, and we never handle
 * their credentials (ADR-003).
 *
 * Until then the CTA is disabled and labelled "Coming Soon" rather than a dead
 * "Add to Cart" — a greyed-out cart button on a live site reads as broken to a
 * first-time visitor arriving from TikTok.
 */
export default function ShopPage() {
  return (
    <>
      <section className="border-b border-gold/15 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="font-impact text-sm tracking-wider text-gold">
            Kennel merch
          </p>
          <h1 className="font-impact mt-3 text-4xl text-bone sm:text-6xl">
            Shop
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-bone/75">
            Wear the bloodline. Our first drop of tees and hoodies is in
            production — designs below are placeholders while the artwork is
            finalised.
          </p>
          <p className="mt-6 inline-block rounded-full border border-gold/30 bg-surface px-4 py-2 text-xs font-semibold uppercase tracking-wider text-gold">
            Checkout opening soon
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {merch.map((item) => (
              <Reveal key={item.slug} className="h-full">
                <article className="relative flex h-full flex-col overflow-hidden rounded-xl bg-surface">
                  <div className="pointer-events-none absolute inset-0 z-20 rounded-xl ring-1 ring-inset ring-gold/40" />
                  <div className="bg-gold-metallic absolute inset-0 z-10 rounded-xl p-px">
                    <div className="h-full w-full rounded-[11px] bg-surface" />
                  </div>

                  <div className="relative z-20 flex h-full flex-col">
                    <div className="aspect-square overflow-hidden rounded-t-xl">
                      <ShirtMockup
                        artwork={item.artwork}
                        hoodie={item.slug.includes("hoodie")}
                      />
                    </div>

                    <div className="flex flex-1 flex-col px-5 pt-5">
                      <h2 className="font-plate text-gold-metallic text-lg leading-tight">
                        {item.name}
                      </h2>
                      <p className="font-impact mt-1 text-xl text-bone">
                        {formatPrice(item.priceCents)}
                      </p>
                      <p className="mt-3 flex-1 text-sm leading-relaxed text-bone/75">
                        {item.description}
                      </p>

                      <div className="mt-4">
                        <p className="text-[0.6rem] uppercase tracking-[0.2em] text-muted">
                          Sizes
                        </p>
                        <ul className="mt-2 flex flex-wrap gap-1.5">
                          {item.sizes.map((size) => (
                            <li
                              key={size}
                              className="rounded border border-gold/20 px-2 py-1 text-xs text-bone/60"
                            >
                              {size}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="px-5 pb-5 pt-4">
                      <button
                        type="button"
                        disabled
                        aria-disabled="true"
                        className="w-full cursor-not-allowed rounded-full border border-gold/25 bg-surface-2 px-5 py-3 text-xs font-bold uppercase tracking-wide text-muted"
                      >
                        Coming Soon
                      </button>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <div className="mt-12 rounded-xl border border-gold/20 bg-surface p-6 text-sm text-bone/75">
            <p className="font-plate text-gold text-sm tracking-[0.2em]">
              Before the first drop
            </p>
            <p className="mt-3">
              Final artwork, pricing, sizing and stock are still being confirmed,
              and shipping and returns terms will be published here before
              anything goes on sale. Want first notice when it does?
            </p>
            <div className="mt-5 flex flex-wrap gap-4">
              <Link
                href="/#waitlist"
                className="bg-gold-metallic rounded-full px-6 py-3 text-xs font-bold uppercase tracking-wide text-ink"
              >
                Tell me when it drops
              </Link>
              <a
                href={brand.phoneHref}
                className="rounded-full border border-gold/40 px-6 py-3 text-xs font-bold uppercase tracking-wide text-gold hover:bg-gold/10"
              >
                Call {brand.phone}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
