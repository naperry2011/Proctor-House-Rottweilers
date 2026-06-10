import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { brand } from "@/lib/placeholder-data";

export const metadata: Metadata = {
  title: "About & Contact",
  description:
    "Proctor House Rottweilers — a family Rottweiler breeder in Arizona producing health-tested Designer Gorillas from champion import lines. Get in touch.",
};

const socials = [
  { label: "Facebook", href: brand.social.facebook },
  { label: "TikTok", href: brand.social.tiktok },
  { label: "YouTube", href: brand.social.youtube },
  { label: "Instagram", href: brand.social.instagram },
];

export default function AboutPage() {
  return (
    <>
      <section className="border-b border-gold/15">
        <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
          <p className="font-plate text-xs tracking-[0.4em] text-gold">
            {brand.tagline}
          </p>
          <h1 className="font-impact mt-4 text-5xl text-bone sm:text-7xl">
            About &amp; <span className="text-gold-metallic">Contact</span>
          </h1>
        </div>
      </section>

      <div className="mx-auto grid max-w-6xl gap-14 px-4 py-20 sm:px-6 lg:grid-cols-2">
        {/* Story + contact details */}
        <Reveal>
          <h2 className="font-impact text-3xl text-bone sm:text-4xl">
            Our Story
          </h2>
          <div className="mt-5 space-y-4 text-lg leading-relaxed text-bone/80">
            <p>
              Proctor House Rottweilers is a family breeding program in{" "}
              {brand.location}, home of the Designer Gorillas. We raise a limited
              number of litters from world-champion import lines, with every dog
              health-tested and every puppy raised underfoot in our home.
            </p>
            <p>
              We breed for substance and soundness, and we place carefully —
              great dogs deserve great homes.
            </p>
          </div>

          <div className="mt-8 space-y-3">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-muted">
                Phone
              </p>
              <a
                href={brand.phoneHref}
                className="font-impact text-2xl text-gold-metallic"
              >
                {brand.phone}
              </a>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-muted">
                Location
              </p>
              <p className="text-lg text-bone">{brand.location}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-muted">
                Follow
              </p>
              <div className="mt-1 flex flex-wrap gap-3">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-gold/30 px-4 py-1.5 text-sm text-bone/90 hover:bg-gold/10 hover:text-gold"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        {/* Contact form — visual mockup only in Phase 1 (real submission later) */}
        <Reveal>
          <form
            className="rounded-2xl border border-gold/20 bg-surface p-6 sm:p-8"
            aria-label="Contact form (preview)"
          >
            <h2 className="font-impact text-2xl text-bone">Send a Message</h2>
            <p className="mt-1 text-sm text-muted">
              Form is a preview — wiring up in a later phase. For now, call or DM.
            </p>

            <div className="mt-6 space-y-4">
              <Field label="Name" id="name" placeholder="Your name" />
              <Field
                label="Email"
                id="email"
                type="email"
                placeholder="you@email.com"
              />
              <Field
                label="Phone"
                id="phone"
                type="tel"
                placeholder={brand.phone}
              />
              <div>
                <label
                  htmlFor="message"
                  className="text-xs uppercase tracking-[0.2em] text-muted"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  disabled
                  placeholder="Tell us a bit about your home and what you're looking for…"
                  className="mt-1 w-full rounded-lg border border-gold/20 bg-surface-2 px-4 py-3 text-bone placeholder:text-muted/70 focus:outline-none"
                />
              </div>
            </div>

            <button
              type="button"
              disabled
              className="bg-gold-metallic mt-6 w-full cursor-not-allowed rounded-full px-6 py-3.5 text-sm font-bold uppercase tracking-wide text-ink opacity-70"
            >
              Send (coming soon)
            </button>
          </form>
        </Reveal>
      </div>
    </>
  );
}

function Field({
  label,
  id,
  type = "text",
  placeholder,
}: {
  label: string;
  id: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="text-xs uppercase tracking-[0.2em] text-muted"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        disabled
        placeholder={placeholder}
        className="mt-1 w-full rounded-lg border border-gold/20 bg-surface-2 px-4 py-3 text-bone placeholder:text-muted/70 focus:outline-none"
      />
    </div>
  );
}
