"use server";

import { revalidatePath } from "next/cache";
import { lockLitter, unlockLitter } from "@/lib/litter-access";

export type UnlockState = { error?: string };

/**
 * Passcode submission. Returns an error message for the form rather than
 * throwing, so a wrong code re-renders the locked state in place.
 *
 * Deliberately vague on failure: "that code didn't work" tells a guesser
 * nothing about whether the litter exists or the gate is configured.
 */
export async function unlockAction(
  _prev: UnlockState,
  formData: FormData,
): Promise<UnlockState> {
  const slug = String(formData.get("slug") ?? "");
  const code = String(formData.get("code") ?? "");

  if (!slug) return { error: "Something went wrong. Please try again." };
  if (!code.trim()) return { error: "Enter the code your breeder gave you." };

  const result = await unlockLitter(slug, code);
  if (result.ok) {
    revalidatePath(`/litters/${slug}/updates`);
    return {};
  }

  if (result.reason === "not-configured") {
    return { error: "Updates aren't switched on for this litter yet." };
  }
  return { error: "That code didn't work. Double-check it and try again." };
}

export async function lockAction(formData: FormData): Promise<void> {
  const slug = String(formData.get("slug") ?? "");
  if (!slug) return;
  await lockLitter(slug);
  revalidatePath(`/litters/${slug}/updates`);
}
