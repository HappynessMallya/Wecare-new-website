'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { Logo } from '@/components/Logo';
import { WHATSAPP_URL } from '@/lib/constants';
import type { Settings } from '@/lib/api';
import type { NavItem } from '@/lib/api';

const DEFAULT_NAV: { label: string; href: string }[] = [
  { label: 'About', href: '#about' },
  { label: 'Programs', href: '#programs' },
  { label: 'Impact', href: '#stories' },
  { label: 'Partners', href: '#partners' },
  { label: 'Leadership', href: '#leadership' },
  { label: 'Contact', href: '#contact' },
];

function navFromApi(items: NavItem[] | null): { label: string; href: string }[] {
  if (!items?.length) return DEFAULT_NAV;
  return items.map((i) => ({ label: i.label, href: i.href }));
}

export function Navbar({
  settings,
  navItems: navItemsProp,
}: {
  settings?: Settings | null;
  navItems?: NavItem[] | null;
} = {}) {
  const navItems = useMemo(() => navFromApi(navItemsProp ?? null), [navItemsProp]);
  const sectionIds = useMemo(() => navItems.map((i) => i.href.replace(/^#/, '')), [navItems]);
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
            const id = item.href.replace(/^#/, '');
            const isActive = activeId === id;
            return (
              <li key={item.label}>
                <Link href={item.href} className={isActive ? 'active' : undefined}>{item.label}</Link>
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
          <Link key={item.label} href={item.href} className={activeId === item.href.replace(/^#/, '') ? 'active' : undefined} onClick={() => setMobileOpen(false)}>
            {item.label}
          </Link>
        ))}
        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" onClick={() => setMobileOpen(false)} style={{ marginTop: 20, border: 'none', background: 'var(--rose)', color: 'white', borderRadius: 6, textAlign: 'center', padding: 16 }}>
          ❤ Donate Now
        </a>
      </div>
    </nav>
  );
}
