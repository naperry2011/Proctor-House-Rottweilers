import Image from "next/image";
import type { Dog } from "@/lib/placeholder-data";

/**
 * The FCI/KSS hip-elbow certificate, shown as proof rather than a claim —
 * "health clearances prominent, not buried" (spec §4).
 *
 * The published image is REDACTED at the pixel level: registration number,
 * microchip number, owner name and address are painted out before the file
 * ever reaches /public (ADR-007). The grades, the dog's name and DOB, the
 * examining vet and both stamps are all intact, which is what makes it
 * evidence. The caption says so plainly — a visitor who spots black bars
 * should know why they're there rather than wonder what's being hidden.
 *
 * Renders nothing when a dog has no certificate on file (Hulk today).
 */
export function HealthCertificate({ dog }: { dog: Dog }) {
  const cert = dog.healthCertificate;
  if (!cert) return null;

  const firstName = dog.name.split(" ")[0];

  return (
    <div className="rounded-xl border border-gold/20 bg-surface p-6">
      <p className="font-plate text-gold text-sm tracking-[0.2em]">
        Health Testing
      </p>
      <p className="mt-3 leading-relaxed text-bone/80">
        {firstName}&rsquo;s international FCI/KSS hip and elbow evaluation.
        <span className="text-bone"> Hips {dog.vitals.hips ?? "—"}</span> and
        <span className="text-bone"> elbows {dog.vitals.elbows ?? "—"}</span> are
        the top classifications on this certificate.
      </p>

      <a
        href={cert.src}
        target="_blank"
        rel="noopener noreferrer"
        className="group mt-5 block overflow-hidden rounded-lg ring-1 ring-gold/30 transition hover:ring-gold/60"
      >
        <div className="relative aspect-[4/3] bg-bone">
          <Image
            src={cert.src}
            alt={cert.alt}
            fill
            sizes="(max-width: 768px) 100vw, 720px"
            className="object-contain"
          />
        </div>
      </a>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
        <p className="text-xs text-muted">
          Registration and microchip numbers, and our contact details, are
          redacted for privacy. Originals available on request.
        </p>
        <a
          href={cert.src}
          target="_blank"
          rel="noopener noreferrer"
          className="whitespace-nowrap py-1 text-xs font-semibold text-gold hover:underline"
        >
          View full size →
        </a>
      </div>
    </div>
  );
}
