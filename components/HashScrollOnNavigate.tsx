'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/** After client navigation to `/#section`, scroll the target into view (Next may not always do this). */
export function HashScrollOnNavigate() {
  const pathname = usePathname();

  useEffect(() => {
    const hash = typeof window !== 'undefined' ? window.location.hash : '';
    if (!hash || hash === '#') return;
    const id = decodeURIComponent(hash.slice(1));
    if (!id) return;
    requestAnimationFrame(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }, [pathname]);

  return null;
}
