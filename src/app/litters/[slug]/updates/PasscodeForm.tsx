"use client";

import { useActionState } from "react";
import { type UnlockState, unlockAction } from "./actions";

const initialState: UnlockState = {};

/**
 * The locked state. Client component only so we can show pending/error status —
 * the actual verification happens server-side in unlockAction.
 */
export function PasscodeForm({
  slug,
  litterName,
  phone,
  phoneHref,
}: {
  slug: string;
  litterName: string;
  phone: string;
  phoneHref: string;
}) {
  const [state, formAction, isPending] = useActionState(
    unlockAction,
    initialState,
  );

  return (
    <form action={formAction} className="w-full max-w-md">
      <input type="hidden" name="slug" value={slug} />

      <div className="relative overflow-hidden rounded-xl bg-surface p-px">
        <div className="bg-gold-metallic absolute inset-0 rounded-xl" />
        <div className="relative rounded-[11px] bg-surface p-7">
          <p className="font-plate text-gold text-xs tracking-[0.3em]">
            Private
          </p>
          <h1 className="font-impact mt-3 text-2xl text-bone sm:text-3xl">
            {litterName}
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-bone/75">
            Photo and video updates for families who have reserved a puppy from
            this litter. Enter the code your breeder gave you.
          </p>

          <label htmlFor="code" className="sr-only">
            Access code
          </label>
          <input
            id="code"
            name="code"
            type="text"
            required
            autoComplete="off"
            autoCapitalize="none"
            spellCheck={false}
            placeholder="Access code"
            aria-invalid={state.error ? true : undefined}
            aria-describedby={state.error ? "code-error" : undefined}
            className="mt-6 w-full rounded-lg border border-gold/30 bg-surface-2 px-4 py-3 text-base text-bone placeholder:text-muted focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
          />

          {state.error && (
            <p id="code-error" role="alert" className="mt-3 text-sm text-gold">
              {state.error}
            </p>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="bg-gold-metallic mt-5 w-full rounded-full px-6 py-3.5 text-sm font-bold uppercase tracking-wide text-ink transition-opacity disabled:opacity-60"
          >
            {isPending ? "Checking…" : "View updates"}
          </button>

          <p className="mt-5 text-xs text-muted">
            Lost your code?{" "}
            <a href={phoneHref} className="text-gold hover:underline">
              Call {phone}
            </a>
          </p>
        </div>
      </div>
    </form>
  );
}
