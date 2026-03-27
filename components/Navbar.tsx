'use client';

import { useState, useEffect, useMemo, type MouseEvent } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown } from 'lucide-react';
import { Logo } from '@/components/Logo';
import { WHATSAPP_URL } from '@/lib/constants';
import { normalizeInternalNavHref } from '@/lib/nav-hrefs';
import type { NavItem, Program, Settings } from '@/lib/api';

/** Used when the CMS returns no nav items. Only links that exist on the public site. */
const RECOMMENDED_NAV: { label: string; href: string }[] = [
  { label: 'Home', href: '/#hero' },
  { label: 'About Us', href: '/#about' },
  { label: 'Programs', href: '/programs/ecd' },
  { label: 'Partners', href: '/#partners' },
  { label: 'Our Team', href: '/team' },
  { label: 'Contact', href: '/#contact' },
];

function navFromApi(items: NavItem[] | null): { label: string; href: string }[] {
  if (!items?.length) return RECOMMENDED_NAV;
  return items
    .map((i) => ({
      label: i.label,
      href: normalizeInternalNavHref(i.href),
    }))
    .filter((i) => {
      const label = i.label.toLowerCase().trim();
      const href = i.href.toLowerCase();
      // Per latest IA, these two are removed from header nav.
      if (label === 'get involved' || href === '/#involved' || href === '#involved') return false;
      if (label === 'news & updates' || label === 'news and updates' || href === '/#nl' || href === '#nl') return false;
      if (label === 'impact' || href === '/#stories' || href === '#stories') return false;
      return true;
    });
}

/** Section id for scroll-spy; null for routes without an on-page anchor (e.g. /programs). */
function hrefToScrollId(href: string): string | null {
  if (href === '/' || href === '/#hero' || href === '#hero') return 'hero';
  if (href.startsWith('/#')) return href.slice(2) || null;
  if (href.startsWith('#')) return href.slice(1);
  return null;
}

/** Programs nav row uses a dropdown; match by URL so CMS labels like "Our Programs" still work. */
function isProgramsNavItem(item: { label: string; href: string }): boolean {
  const path = item.href.split('?')[0].replace(/\/$/, '').toLowerCase();
  if (path.startsWith('/programs') || path === '#programs') return true;
  const q = item.label.toLowerCase().trim();
  return q === 'programs' || q === 'program' || q === 'our programs';
}

function ensureProgramsItem(items: { label: string; href: string }[]): { label: string; href: string }[] {
  if (items.some((i) => isProgramsNavItem(i))) return items;
  const aboutIndex = items.findIndex((i) => i.href === '/#about');
  if (aboutIndex >= 0) {
    return [
      ...items.slice(0, aboutIndex + 1),
      { label: 'Programs', href: '/programs/ecd' },
      ...items.slice(aboutIndex + 1),
    ];
  }
  return [{ label: 'Programs', href: '/programs/ecd' }, ...items];
}

function ensureTeamItem(items: { label: string; href: string }[]): { label: string; href: string }[] {
  if (items.some((i) => i.href === '/team' || i.label.toLowerCase().trim() === 'our team')) return items;
  const partnersIndex = items.findIndex((i) => i.href === '/#partners');
  if (partnersIndex >= 0) {
    return [
      ...items.slice(0, partnersIndex + 1),
      { label: 'Our Team', href: '/team' },
      ...items.slice(partnersIndex + 1),
    ];
  }
  return [...items, { label: 'Our Team', href: '/team' }];
}

function closeDetailsFromLink(e: MouseEvent<HTMLElement>) {
  const details = e.currentTarget.closest('details');
  if (details) details.open = false;
}

export function Navbar({
  settings,
  navItems: navItemsProp,
  programs: programsProp,
}: {
  settings?: Settings | null;
  navItems?: NavItem[] | null;
  programs?: Program[] | null;
} = {}) {
  const programs = programsProp ?? [];
  const pathname = usePathname();
  const programsSectionActive = pathname === '/programs' || pathname.startsWith('/programs/');
  const navItemsBase = useMemo(() => navFromApi(navItemsProp ?? null), [navItemsProp]);
  const navItems = useMemo(() => ensureTeamItem(ensureProgramsItem(navItemsBase)), [navItemsBase]);
  const sectionIds = useMemo(
    () => navItems.map((i) => hrefToScrollId(i.href)).filter((id): id is string => id != null),
    [navItems],
  );
  const whatsappUrl = settings?.whatsappUrl || WHATSAPP_URL;
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const updateActive = () => {
      const top = 120;
      let current: string | null = null;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= top && rect.bottom > 0) {
          current = id;
          break;
        }
      }
      setActiveId((prev) => (current !== prev ? current : prev));
    };
    updateActive();
    window.addEventListener('scroll', updateActive, { passive: true });
    return () => window.removeEventListener('scroll', updateActive);
  }, [sectionIds]);

  return (
    <nav
      id="nav"
      className={scrolled ? 'sc' : ''}
      data-menu-open={mobileOpen ? 'true' : undefined}
      role="banner"
    >
      <div className="nw">
        <Logo
          showText
          showTagline
          tagline={settings?.tagline ?? "Enriching Children's Lives"}
          logoUrl={settings?.logoUrl}
          siteName={settings?.siteName}
          className="flex-shrink-0"
          size="nav"
        />

        <ul className="nl">
          {navItems.map((item) => {
            const scrollId = hrefToScrollId(item.href);
            const isPrograms = isProgramsNavItem(item);
            const isTeam = item.href === '/team';
            const isActive =
              isPrograms && programsSectionActive
                ? true
                : isTeam
                  ? pathname === '/team'
                  : scrollId != null && activeId === scrollId;
            const hasPrograms = programs.length > 0;
            return (
              <li key={item.label}>
                {isPrograms ? (
                  <details className="nav-program-details">
                    <summary className={isActive ? 'active' : undefined} aria-haspopup="menu">
                      <span>{item.label}</span>
                      <ChevronDown className="nav-program-chevron" size={16} strokeWidth={2.5} aria-hidden />
                    </summary>
                    <div className="nav-program-menu" role="menu" aria-label="Programs">
                      {hasPrograms ? programs.map((p) => (
                        <Link
                          key={p.id}
                          href={`/programs/${p.id}`}
                          className="nav-program-link"
                          role="menuitem"
                          onClick={closeDetailsFromLink}
                        >
                          {p.title}
                        </Link>
                      )) : (
                        <span className="nav-program-link nav-program-empty" aria-hidden>
                          Program list coming soon
                        </span>
                      )}
                    </div>
                  </details>
                ) : (
                  <Link href={item.href} className={isActive ? 'active' : undefined}>
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>

        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="nd">
            ❤ Donate Now
          </a>
          <button
            type="button"
            className="bg"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-label="Menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      <div id="mn" className={mobileOpen ? 'open' : ''}>
        {navItems.map((item) => (
          (() => {
            const isPrograms = isProgramsNavItem(item);
            const isTeam = item.href === '/team';
            const hasPrograms = programs.length > 0;
            const scrollId = hrefToScrollId(item.href);
            const isActive =
              isPrograms && programsSectionActive
                ? true
                : isTeam
                  ? pathname === '/team'
                  : scrollId != null && activeId === scrollId;

            if (isPrograms) {
              return (
                <details className="nav-program-details nav-program-details-mobile" key={item.label}>
                  <summary className={isActive ? 'active' : undefined} aria-haspopup="menu">
                    <span>{item.label}</span>
                    <ChevronDown className="nav-program-chevron" size={18} strokeWidth={2.5} aria-hidden />
                  </summary>
                  <div className="nav-program-menu nav-program-menu-mobile" role="menu" aria-label="Programs">
                    {hasPrograms ? programs.map((p) => (
                      <Link
                        key={p.id}
                        href={`/programs/${p.id}`}
                        className="nav-program-link"
                        role="menuitem"
                        onClick={() => setMobileOpen(false)}
                      >
                        {p.title}
                      </Link>
                    )) : (
                      <span className="nav-program-link nav-program-empty" aria-hidden>
                        Program list coming soon
                      </span>
                    )}
                  </div>
                </details>
              );
            }

            return (
              <Link
                key={item.label}
                href={item.href}
                className={isActive ? 'active' : undefined}
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            );
          })()
        ))}
        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" onClick={() => setMobileOpen(false)} style={{ marginTop: 20, border: 'none', background: 'var(--rose)', color: 'white', borderRadius: 6, textAlign: 'center', padding: 16 }}>
          ❤ Donate Now
        </a>
      </div>
    </nav>
  );
}
