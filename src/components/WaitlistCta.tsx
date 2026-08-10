"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * Persistent mobile waitlist CTA — "conversion never more than a tap away"
 * (spec §2). Fixed to the bottom on phones (where most traffic lands from
 * TikTok/IG); hidden on desktop where the nav button is always visible.
 *
 * Hidden on the buyer update portal: those families have already reserved a
 * puppy, so a "Join the Waitlist" bar over their litter photos is noise at
 * best and confusing at worst.
 *
 * Links to /#waitlist for now; wires to the real screening form in Phase 3.
 */
export function WaitlistCta() {
  const pathname = usePathname();
  if (pathname?.startsWith("/litters/") && pathname.endsWith("/updates")) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] md:hidden">
      <Link
        href="/#waitlist"
        className="bg-gold-metallic block rounded-full px-6 py-3.5 text-center text-base font-bold uppercase tracking-wide text-ink shadow-2xl shadow-black/60"
      >
        Join the Waitlist
      </Link>
    </div>
  );
}
