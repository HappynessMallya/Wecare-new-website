'use client';

import Link from 'next/link';
import { Instagram, Facebook, Linkedin } from 'lucide-react';
import { Logo } from '@/components/Logo';
import { SOCIAL_INSTAGRAM, SOCIAL_FACEBOOK, SOCIAL_LINKEDIN } from '@/lib/constants';
import { normalizeInternalNavHref } from '@/lib/nav-hrefs';
import type { Settings } from '@/lib/api';
import type { FooterCopy, FooterLinks } from '@/lib/api';

const DEFAULT_ORG = [
  { label: 'About Us', href: '/#about' },
  { label: 'Our Team', href: '/team' },
  { label: 'Partners', href: '/#partners' },
  { label: 'Contact', href: '/#contact' },
];

const DEFAULT_PROGRAM = [
  { label: 'Early Childhood Development', href: '/programs/ecd' },
  { label: 'Quality Early Childhood Education', href: '/programs/quality-early-childhood-education' },
  { label: 'Child Care in Public Spaces', href: '/programs/child-care-in-public-spaces' },
  { label: 'Early Life Skills Training', href: '/programs/early-life-skills-training' },
];

export function Footer({
  settings,
  footer,
  footerLinks,
}: {
  settings?: Settings | null;
  footer?: FooterCopy | null;
  footerLinks?: FooterLinks | null;
} = {}) {
  const orgLinks = footerLinks?.orgLinks?.length ? footerLinks.orgLinks : DEFAULT_ORG;
  const programLinks = footerLinks?.programLinks?.length ? footerLinks.programLinks : DEFAULT_PROGRAM;
  const copyright = footer?.copyright ?? '© 2026 WeCare Foundation. All rights reserved. Registered NGO — Tanzania.';

  return (
    <footer role="contentinfo">
      <div className="footer-accent" />
      <div className="footer-inner">
        <div className="footer-grid">
          <div>
            <div className="footer-brand-logo">
              <Logo showText dark size="footer" logoUrl={settings?.logoUrl} siteName={settings?.siteName} />
            </div>
            <p className="footer-desc">
              Committed to the best start in life for every child in Tanzania - through community, family, and innovative solutions since 2022.
            </p>
            <div className="footer-socials">
              <a className="footer-social" href={settings?.socialInstagram || SOCIAL_INSTAGRAM} target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Instagram size={16} /></a>
              <a className="footer-social" href={settings?.socialFacebook || SOCIAL_FACEBOOK} target="_blank" rel="noopener noreferrer" aria-label="Facebook"><Facebook size={16} /></a>
              <a className="footer-social" href={settings?.socialLinkedIn || SOCIAL_LINKEDIN} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Linkedin size={16} /></a>
            </div>
          </div>
          <div className="fcol">
            <h4 className="footer-col-title">Quick Links</h4>
            <ul>
              {orgLinks.map((link) => (
                <li key={link.label}>
                  <Link className="footer-link" href={normalizeInternalNavHref(link.href)}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="fcol">
            <h4 className="footer-col-title">Programs</h4>
            <ul>
              {programLinks.map((link) => (
                <li key={link.label}>
                  <Link className="footer-link" href={normalizeInternalNavHref(link.href)}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <small>{copyright}</small>
          <span className="footer-tagline">Every child deserves the best start. 💙</span>
        </div>
      </div>
    </footer>
  );
}
