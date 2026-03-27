'use client';

import Link from 'next/link';
import { Instagram, Facebook, Linkedin } from 'lucide-react';
import { Logo } from '@/components/Logo';
import { SOCIAL_INSTAGRAM, SOCIAL_FACEBOOK, SOCIAL_LINKEDIN } from '@/lib/constants';
import { normalizeInternalNavHref } from '@/lib/nav-hrefs';
import { WHATSAPP_URL, CONTACT_PHONE } from '@/lib/constants';
import type { Settings } from '@/lib/api';
import type { FooterCopy, FooterLinks } from '@/lib/api';

const DEFAULT_ORG = [
  { label: 'About WeCare', href: '#about' },
  { label: 'Our Mission & Vision', href: '#about' },
  { label: 'Our Approach', href: '#about' },
  { label: 'Where We Work', href: '#contact' },
];

const DEFAULT_PROGRAM = [
  { label: 'Early Childhood Development', href: '#programs' },
  { label: 'Early Childhood Education', href: '#programs' },
  { label: 'Child Care in Markets', href: '#programs' },
  { label: 'Early Life Skills', href: '#programs' },
  { label: 'Impact Stories', href: '#stories' },
];

const DEFAULT_INVOLVED = [
  { label: 'Donate', href: WHATSAPP_URL, external: true },
  { label: 'Partner With Us', href: WHATSAPP_URL, external: true },
  { label: 'Volunteer', href: '#involved', external: false },
  { label: 'Careers', href: '#contact', external: false },
  { label: 'Newsletter', href: '#nl', external: false },
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
  const whatsappUrl = settings?.whatsappUrl || WHATSAPP_URL;
  const contactPhone = settings?.contactPhone || CONTACT_PHONE;
  const orgLinks = footerLinks?.orgLinks?.length ? footerLinks.orgLinks : DEFAULT_ORG;
  const programLinks = footerLinks?.programLinks?.length ? footerLinks.programLinks : DEFAULT_PROGRAM;
  const involvedLinks = footerLinks?.involvedLinks?.length ? footerLinks.involvedLinks : DEFAULT_INVOLVED.map((l) => ({ ...l, href: l.external ? whatsappUrl : l.href }));
  const blurb = footer?.blurb ?? "A community-led NGO committed to quality early childhood development, learning, and health for underserved families in Tanzania. Enriching Children's Lives — one community at a time.";
  const copyright = footer?.copyright ?? '© 2026 WeCare Foundation. All rights reserved. Registered NGO — Tanzania.';
  const tagline = settings?.tagline ?? "Enriching Children's Lives";

  return (
    <footer role="contentinfo">
      <div className="fbar" />
      <div className="container">
        <div className="fg">
          <div className="fb">
            <div className="fl">
              <Logo showText showTagline dark logoUrl={settings?.logoUrl} siteName={settings?.siteName} />
            </div>
            <p>{blurb}</p>
            <p className="fphone">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="fphone-link">
                {contactPhone}
              </a>
              <span className="fphone-label"> — Call or WhatsApp</span>
            </p>
            <div className="fsoc">
              <a className="fsc" href={settings?.socialInstagram || SOCIAL_INSTAGRAM} target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Instagram className="fsc-ico" size={18} aria-hidden /></a>
              <a className="fsc" href={settings?.socialFacebook || SOCIAL_FACEBOOK} target="_blank" rel="noopener noreferrer" aria-label="Facebook"><Facebook className="fsc-ico" size={18} aria-hidden /></a>
              <a className="fsc" href={settings?.socialLinkedIn || SOCIAL_LINKEDIN} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Linkedin className="fsc-ico" size={18} aria-hidden /></a>
            </div>
          </div>
          <div className="fcol">
            <h4>Organization</h4>
            <ul>
              {orgLinks.map((link) => (
                <li key={link.label}>
                  <Link href={normalizeInternalNavHref(link.href)}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="fcol">
            <h4>Programs</h4>
            <ul>
              {programLinks.map((link) => (
                <li key={link.label}>
                  <Link href={normalizeInternalNavHref(link.href)}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="fcol">
            <h4>Get Involved</h4>
            <ul>
              {involvedLinks.map((link) => (
                <li key={link.label}>
                  {link.external ? (
                    <a href={link.href} target="_blank" rel="noopener noreferrer">{link.label}</a>
                  ) : (
                    <Link href={normalizeInternalNavHref(link.href)}>{link.label}</Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="fbot">
          <small>{copyright}</small>
          <span className="ftag">&quot;{tagline}&quot;</span>
          <div className="fbotl">
            <Link href="#">Privacy Policy</Link>
            <Link href="#">Terms of Service</Link>
            <Link href="#">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
