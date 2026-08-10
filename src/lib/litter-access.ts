import "server-only";

import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { getLitter } from "@/lib/placeholder-data";

/**
 * Passcode gate for the buyer update feed.
 *
 * ============================ READ THIS FIRST ============================
 * This is DETERRENCE, NOT AUTHENTICATION.
 *
 * It stops a stranger stumbling into a buyer feed. It does not stop a
 * determined attacker, and it cannot stop a buyer forwarding the code to
 * anyone. There is no rate limiting (see below). Therefore: nothing behind
 * this gate may ever be sensitive. Puppy photos and progress notes only —
 * no addresses, no contracts, no payment details, no buyer contact details.
 *
 * Phase 3 replaces this with real per-buyer accounts in Payload, which brings
 * sessions, revocation, an audit trail, and lets the client change codes
 * without a redeploy. See ADR-006.
 * ========================================================================
 *
 * Design notes:
 * - Passcodes live in env vars, never in the repo. A hash committed to the
 *   repo would be brute-forced offline in seconds against a short, human-typed
 *   code, so env vars are strictly better here.
 * - `import "server-only"` makes it a build error for any client component to
 *   pull this module in, so the codes cannot leak into the browser bundle.
 * - Comparison hashes both sides first: timingSafeEqual throws on a length
 *   mismatch, and that throw would itself leak the passcode's length.
 * - The cookie is scoped per litter, so a Cinema buyer's cookie cannot open
 *   Kings.
 * - Every path fails CLOSED. Missing config renders the locked state; it never
 *   falls open and never crashes the build.
 */

const COOKIE_PREFIX = "ph_litter_";
const MAX_AGE_SECONDS = 60 * 60 * 24 * 30; // 30 days
const ENV_PREFIX = "LITTER_PASSCODE_";

/** Uniform delay on every verification attempt, success or failure. */
const ATTEMPT_DELAY_MS = 400;

export type UnlockResult =
  | { ok: true }
  | { ok: false; reason: "bad-code" | "not-configured" | "unknown-litter" };

function sha256(value: string): Buffer {
  return createHmac("sha256", "phr-digest").update(value).digest();
}

function secret(): string | undefined {
  const s = process.env.LITTER_ACCESS_SECRET;
  return s && s.length >= 16 ? s : undefined;
}

/**
 * The configured passcode for a litter, or undefined when unset.
 * The env key comes from our own data file, but we still allowlist the prefix
 * so a future data edit can never turn this into an arbitrary env read.
 */
function passcodeFor(slug: string): string | undefined {
  const litter = getLitter(slug);
  if (!litter?.updatesEnabled || !litter.passcodeEnvKey) return undefined;
  if (!litter.passcodeEnvKey.startsWith(ENV_PREFIX)) return undefined;
  const code = process.env[litter.passcodeEnvKey];
  return code && code.length > 0 ? code : undefined;
}

/** True when this litter can be unlocked at all (secret + passcode present). */
export function isGateConfigured(slug: string): boolean {
  return Boolean(secret() && passcodeFor(slug));
}

function cookieName(slug: string): string {
  return `${COOKIE_PREFIX}${slug}`;
}

function sign(slug: string, expiresAt: number, key: string): string {
  return createHmac("sha256", key)
    .update(`${slug}.${expiresAt}`)
    .digest("base64url");
}

/** Reads the cookie and verifies its signature and expiry. Fails closed. */
export async function hasLitterAccess(slug: string): Promise<boolean> {
  const key = secret();
  if (!key) return false;

  const raw = (await cookies()).get(cookieName(slug))?.value;
  if (!raw) return false;

  const [expRaw, providedSig] = raw.split(".");
  const expiresAt = Number(expRaw);
  if (!providedSig || !Number.isFinite(expiresAt)) return false;
  if (expiresAt <= Math.floor(Date.now() / 1000)) return false;

  const expected = sign(slug, expiresAt, key);
  return timingSafeEqual(sha256(expected), sha256(providedSig));
}

/**
 * Verifies a submitted passcode and, on success, sets the access cookie.
 * MUST be called from a Server Action or Route Handler — cookies().set is not
 * allowed during Server Component rendering.
 */
export async function unlockLitter(
  slug: string,
  submitted: string,
): Promise<UnlockResult> {
  // Constant-ish cost regardless of outcome, and it blunts naive scripted
  // guessing. Not a substitute for real rate limiting.
  await new Promise((r) => setTimeout(r, ATTEMPT_DELAY_MS));

  const litter = getLitter(slug);
  if (!litter?.updatesEnabled) return { ok: false, reason: "unknown-litter" };

  const key = secret();
  const expected = passcodeFor(slug);
  if (!key || !expected) return { ok: false, reason: "not-configured" };

  const matches = timingSafeEqual(sha256(submitted.trim()), sha256(expected));
  if (!matches) return { ok: false, reason: "bad-code" };

  const expiresAt = Math.floor(Date.now() / 1000) + MAX_AGE_SECONDS;
  (await cookies()).set({
    name: cookieName(slug),
    value: `${expiresAt}.${sign(slug, expiresAt, key)}`,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: `/litters/${slug}`,
    maxAge: MAX_AGE_SECONDS,
  });

  return { ok: true };
}

/** Clears access. Matters on shared or family devices. */
export async function lockLitter(slug: string): Promise<void> {
  (await cookies()).set({
    name: cookieName(slug),
    value: "",
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: `/litters/${slug}`,
    maxAge: 0,
  });
}

/** Helper for generating a strong code to hand the client. Not used at runtime. */
export function suggestPasscode(): string {
  return randomBytes(9).toString("base64url");
}
