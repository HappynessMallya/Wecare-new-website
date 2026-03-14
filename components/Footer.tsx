'use client';

import Link from 'next/link';
import { Logo } from '@/components/Logo';
import { WHATSAPP_URL } from '@/lib/constants';

const orgLinks = [
  { label: 'About WeCare', href: '#about' },
  { label: 'Our Mission & Vision', href: '#about' },
  { label: 'Our Approach', href: '#about' },
  { label: 'Where We Work', href: '#contact' },
];

const programLinks = [
  { label: 'Early Childhood Development', href: '#programs' },
  { label: 'Early Childhood Education', href: '#programs' },
  { label: 'Child Care in Markets', href: '#programs' },
  { label: 'Early Life Skills', href: '#programs' },
  { label: 'Impact Stories', href: '#stories' },
];

const involvedLinks = [
  { label: 'Donate', href: WHATSAPP_URL, external: true },
  { label: 'Partner With Us', href: WHATSAPP_URL, external: true },
  { label: 'Volunteer', href: '#involved', external: false },
  { label: 'Careers', href: '#contact', external: false },
  { label: 'Newsletter', href: '#nl', external: false },
];

export function Footer() {
  return (
    <footer role="contentinfo">
      <div className="fbar" />
      <div className="container">
        <div className="fg">
          <div className="fb">
            <div className="fl">
              <Logo showText showTagline dark />
            </div>
            <p>
              A community-led NGO committed to quality early childhood development, learning, and health for underserved families in Tanzania. Enriching Children&apos;s Lives — one community at a time.
            </p>
            <div className="fsoc">
              <a className="fsc" href="#" aria-label="Instagram">📸</a>
              <a className="fsc" href="#" aria-label="Facebook">📘</a>
              <a className="fsc" href="#" aria-label="Twitter">🐦</a>
              <a className="fsc" href="#" aria-label="LinkedIn">💼</a>
            </div>
          </div>
          <div className="fcol">
            <h4>Organization</h4>
            <ul>
              {orgLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="fcol">
            <h4>Programs</h4>
            <ul>
              {programLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href}>{link.label}</Link>
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
                    <Link href={link.href}>{link.label}</Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="fbot">
          <small>© 2026 WeCare Foundation. All rights reserved. Registered NGO — Tanzania.</small>
          <span className="ftag">&quot;Enriching Children&apos;s Lives&quot;</span>
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
