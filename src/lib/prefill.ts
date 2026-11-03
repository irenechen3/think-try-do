import type { InterestId } from "@/content/site";

/**
 * Tiny decoupled channel so adventure cards can pre-tick interests in the
 * waitlist form without sharing state through the component tree.
 */

export const PREFILL_EVENT = "ttd:prefill-interest";

export type PrefillDetail = { interest: InterestId; selected: boolean };

export function prefillInterest(interest: InterestId, selected: boolean): void {
  window.dispatchEvent(new CustomEvent<PrefillDetail>(PREFILL_EVENT, { detail: { interest, selected } }));
}
