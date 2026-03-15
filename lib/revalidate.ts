'use server';

import { revalidatePath } from 'next/cache';

/**
 * Call this after saving or deleting content in the admin so the public
 * homepage (and layout) shows the new data on the next request instead of
 * waiting for the time-based cache (e.g. 60s) to expire.
 */
export async function revalidatePublicSite() {
  revalidatePath('/', 'layout');
}
