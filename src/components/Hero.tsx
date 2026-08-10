import Image from "next/image";
import Link from "next/link";
import { brand } from "@/lib/placeholder-data";

/**
 * Full-bleed brand hero (spec §3). Anton impact headline + gold-metallic accent.
 *
 * Uses Beauty's wide shot — at 2560x1440 it is the only client asset with the
 * resolution for a full-bleed 88vh hero. Focal point favours the left-of-centre
 * subject so the headline column doesn't cover her.
 */
export function Hero() {
  return (
    <section className="relative flex min-h-[88vh] items-center overflow-hidden">
      {/* Full-bleed hero photo with ink overlays so the headline stays legible */}
      <Image
        src="/dogs/beauty-vom-proctor-house/portrait.jpg"
        alt="Beauty Vom Proctor House standing in the Proctor House run"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[62%_center] opacity-60"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/70 to-ink/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/60" />
      <div className="bg-gold-metallic absolute -right-24 top-1/4 h-72 w-72 rounded-full opacity-10 blur-3xl" />

      <div className="relative mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
        <p className="font-plate text-xs tracking-[0.4em] text-gold sm:text-sm">
          {brand.positioning}
        </p>
        <h1 className="font-impact mt-4 text-5xl text-bone sm:text-7xl lg:text-8xl">
          Designer Gorilla
          <br />
          <span className="text-gold-metallic">Bloodline</span>
        </h1>
        <p className="mt-6 max-w-xl text-lg text-bone/80">
          Large, blocky Rottweilers from respected Serbian and European
          bloodlines. Health-tested, temperament-true — bred in{" "}
          {brand.location} to be{" "}
          <span className="font-semibold text-gold">{brand.tagline}</span>.
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-4">
          <Link
            href="#waitlist"
            className="bg-gold-metallic rounded-full px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-ink shadow-lg shadow-gold-deep/30 transition-transform hover:scale-[1.03]"
          >
            Join the Waitlist
          </Link>
          <Link
            href="/the-bloodline"
            className="rounded-full border border-gold/40 px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-gold transition-colors hover:bg-gold/10"
          >
            The Bloodline
          </Link>
        </div>
      </div>
    </section>
  );
}
