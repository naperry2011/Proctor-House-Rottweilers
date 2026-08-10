import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PhotoPlaceholder } from "@/components/PhotoPlaceholder";
import { hasLitterAccess, isGateConfigured } from "@/lib/litter-access";
import {
  brand,
  formatDate,
  getLitter,
  getLitterUpdates,
} from "@/lib/placeholder-data";
import { PasscodeForm } from "./PasscodeForm";
import { lockAction } from "./actions";

/**
 * Buyer update feed, gated by a per-litter passcode.
 *
 * force-dynamic is explicit rather than relying on the implicit opt-out that
 * reading cookies() triggers: if this route were ever statically rendered, the
 * gate would be bypassed entirely. Verify it shows as ƒ (Dynamic) in the build
 * output.
 *
 * Deliberately not in the sitemap and not linked from a public litter index.
 */
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Litter Updates",
  robots: { index: false, follow: false },
};

export default async function LitterUpdatesPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const litter = getLitter(slug);
  if (!litter?.updatesEnabled) notFound();

  const configured = isGateConfigured(slug);
  const unlocked = configured && (await hasLitterAccess(slug));

  if (!unlocked) {
    return (
      <section className="flex min-h-[80vh] items-center justify-center px-4 py-20 sm:px-6">
        {configured ? (
          <PasscodeForm
            slug={slug}
            litterName={litter.name}
            phone={brand.phone}
            phoneHref={brand.phoneHref}
          />
        ) : (
          <div className="w-full max-w-md rounded-xl border border-gold/20 bg-surface p-7 text-center">
            <h1 className="font-impact text-2xl text-bone">{litter.name}</h1>
            <p className="mt-3 text-sm text-bone/75">
              Updates for this litter aren&rsquo;t switched on yet. If you have
              reserved a puppy, give us a call and we&rsquo;ll get you set up.
            </p>
            <a
              href={brand.phoneHref}
              className="bg-gold-metallic mt-6 inline-block rounded-full px-6 py-3 text-xs font-bold uppercase tracking-wide text-ink"
            >
              Call {brand.phone}
            </a>
          </div>
        )}
      </section>
    );
  }

  const updates = getLitterUpdates(slug);

  return (
    <>
      <section className="border-b border-gold/15 py-14">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="font-plate text-gold text-xs tracking-[0.3em]">
                Private · Buyer updates
              </p>
              <h1 className="font-impact mt-3 text-3xl text-bone sm:text-5xl">
                {litter.name}
              </h1>
              <p className="mt-2 text-sm text-muted">
                {litter.sire.name} × {litter.dam.name}
                {litter.whelpDate && ` · ${formatDate(litter.whelpDate)}`}
              </p>
            </div>
            <form action={lockAction}>
              <input type="hidden" name="slug" value={slug} />
              <button
                type="submit"
                className="rounded-full border border-gold/30 px-5 py-3 text-xs font-semibold uppercase tracking-wide text-muted transition-colors hover:text-gold"
              >
                Sign out
              </button>
            </form>
          </div>
        </div>
      </section>

      <section className="py-14">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          {updates.length === 0 ? (
            <p className="rounded-xl border border-gold/20 bg-surface p-6 text-bone/75">
              No updates posted yet. Check back soon — we post as the puppies
              hit their milestones.
            </p>
          ) : (
            <ol className="space-y-8">
              {updates.map((update) => (
                <li
                  key={update.id}
                  className="rounded-xl border border-gold/20 bg-surface p-6"
                >
                  <p className="font-impact text-xs tracking-wider text-gold">
                    {formatDate(update.date)}
                  </p>
                  <h2 className="font-plate text-gold-metallic mt-2 text-xl">
                    {update.title}
                  </h2>
                  <div className="mt-3 space-y-3 leading-relaxed text-bone/80">
                    {update.body.map((p) => (
                      <p key={p.slice(0, 40)}>{p}</p>
                    ))}
                  </div>

                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    {update.photos.length > 0
                      ? update.photos.map((photo) => (
                          <div
                            key={photo.src}
                            className="relative aspect-[4/3] overflow-hidden rounded-lg ring-1 ring-gold/25"
                          >
                            <Image
                              src={photo.src}
                              alt={photo.alt}
                              fill
                              sizes="(max-width: 640px) 100vw, 50vw"
                              style={{ objectPosition: photo.focal }}
                              className="object-cover"
                            />
                          </div>
                        ))
                      : /* No puppy photography supplied yet — show the slots so
                           the client can see the shape of a real update. */
                        [0, 1].map((i) => (
                          <div
                            key={i}
                            className="relative aspect-[4/3] overflow-hidden rounded-lg ring-1 ring-gold/25"
                          >
                            <PhotoPlaceholder label="Photo coming soon" />
                          </div>
                        ))}
                  </div>

                  {update.videoUrls && update.videoUrls.length > 0 && (
                    <ul className="mt-4 space-y-1">
                      {update.videoUrls.map((url) => (
                        <li key={url}>
                          <a
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm font-semibold text-gold hover:underline"
                          >
                            Watch the video →
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ol>
          )}

          <div className="mt-10 rounded-xl border border-gold/15 bg-surface/50 p-5 text-xs text-muted">
            <p>
              This page is private to families in this litter. Please don&rsquo;t
              share your access code — call {brand.phone} if you need another
              person added.
            </p>
          </div>

          <Link
            href="/"
            className="mt-6 inline-block py-2 text-sm font-semibold text-gold hover:underline"
          >
            ← Back to Proctor House
          </Link>
        </div>
      </section>
    </>
  );
}
