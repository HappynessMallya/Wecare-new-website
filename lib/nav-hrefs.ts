/**
 * Hash-only links (e.g. #about) resolve on the *current* route. From /programs/* they
 * become /programs#about and break. Prefix with / so they always hit the homepage section.
 */
export function normalizeInternalNavHref(href: string): string {
  const h = href.trim();
  if (!h) return '/';
  if (h === '#programs') return '/programs/ecd';
  if (h.startsWith('#')) return `/${h}`;
  return h;
}
