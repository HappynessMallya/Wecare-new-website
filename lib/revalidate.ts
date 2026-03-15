'use server';

import { revalidatePath, revalidateTag } from 'next/cache';

/**
 * Clears ALL public-site fetch caches (every section at once).
 * Call after saving anything in the admin dashboard.
 */
export async function revalidatePublicSite() {
  revalidateTag('public-site');
  // Also revalidate every individual section tag so nothing is missed.
  const tags = [
    'settings', 'hero', 'ticker', 'about', 'impact', 'programs',
    'gallery', 'stories', 'partners', 'leadership', 'cta',
    'newsletter', 'contact', 'nav', 'footer',
  ] as const;
  tags.forEach((t) => revalidateTag(t));
  revalidatePath('/', 'layout');
  revalidatePath('/', 'page');
}

/**
 * Clears only a specific section's fetch cache.
 * Use this for faster, more targeted revalidation when you know exactly what changed.
 */
export async function revalidateSection(
  tag: 'settings' | 'hero' | 'ticker' | 'about' | 'impact' | 'programs' |
       'gallery' | 'stories' | 'partners' | 'leadership' | 'cta' |
       'newsletter' | 'contact' | 'nav' | 'footer'
) {
  revalidateTag(tag);
  revalidatePath('/', 'page');
}
