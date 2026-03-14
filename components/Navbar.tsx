'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Logo } from '@/components/Logo';
import { WHATSAPP_URL } from '@/lib/constants';

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Programs', href: '#programs' },
  { label: 'Impact', href: '#stories' },
  { label: 'Partners', href: '#partners' },
  { label: 'Leadership', href: '#leadership' },
  { label: 'Contact', href: '#contact' },
];

const SECTION_IDS = navItems.map((item) => item.href.slice(1));

export function Navbar() {
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
      for (const id of SECTION_IDS) {
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
  }, []);

  return (
    <nav
      id="nav"
      className={scrolled ? 'sc' : ''}
      data-menu-open={mobileOpen ? 'true' : undefined}
      role="banner"
    >
      <div className="nw">
        <Logo showText showTagline={false} className="flex-shrink-0" size="nav" />

        <ul className="nl">
          {navItems.map((item) => {
            const id = item.href.slice(1);
            const isActive = activeId === id;
            return (
              <li key={item.label}>
                <Link href={item.href} className={isActive ? 'active' : undefined}>{item.label}</Link>
              </li>
            );
          })}
        </ul>

        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="nd">
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
        <Link href="#about" className={activeId === 'about' ? 'active' : undefined} onClick={() => setMobileOpen(false)}>About Us</Link>
        <Link href="#programs" className={activeId === 'programs' ? 'active' : undefined} onClick={() => setMobileOpen(false)}>Our Programs</Link>
        <Link href="#stories" className={activeId === 'stories' ? 'active' : undefined} onClick={() => setMobileOpen(false)}>Impact</Link>
        <Link href="#partners" className={activeId === 'partners' ? 'active' : undefined} onClick={() => setMobileOpen(false)}>Partners</Link>
        <Link href="#leadership" className={activeId === 'leadership' ? 'active' : undefined} onClick={() => setMobileOpen(false)}>Leadership</Link>
        <Link href="#contact" className={activeId === 'contact' ? 'active' : undefined} onClick={() => setMobileOpen(false)}>Contact</Link>
        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" onClick={() => setMobileOpen(false)} style={{ marginTop: 20, border: 'none', background: 'var(--rose)', color: 'white', borderRadius: 6, textAlign: 'center', padding: 16 }}>
          ❤ Donate Now
        </a>
      </div>
    </nav>
  );
}
