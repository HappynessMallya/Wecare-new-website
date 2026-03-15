'use client';

import { useMemo } from 'react';
import Image from 'next/image';
import type { Partner, PartnersSection } from '@/lib/api';

const FALLBACK_PARTNERS: Partner[] = [
  { id: '1', name: 'Government of Tanzania', logoUrl: '/GOVERNMENT.svg', logoAlt: 'Government of Tanzania', textOnly: false, order: 0 },
  { id: '2', name: 'TECDEN', logoUrl: '/TECDEN.png', logoAlt: 'TECDEN', textOnly: false, order: 1 },
  { id: '3', name: 'Helvetas Tanzania', logoUrl: '/HELVETAS.png', logoAlt: 'Helvetas Tanzania', textOnly: false, order: 2 },
  { id: '4', name: 'Global School Forum', logoUrl: '/GSF.svg', logoAlt: 'Global School Forum', textOnly: false, order: 3 },
  { id: '5', name: 'Pediatric Association of Tanzania', logoUrl: '/PEDITRICIAN.png', logoAlt: 'Pediatric Association of Tanzania', textOnly: false, order: 4 },
  { id: '6', name: 'Parents', logoUrl: null, logoAlt: null, textOnly: true, order: 5 },
];

function PartnerItem({ partner, keySuffix }: { partner: Partner; keySuffix: string }) {
  if (partner.textOnly) {
    return (
      <div key={`${partner.id}-${keySuffix}`} className="pl pl-text-only">
        <span className="pl-text-only-label">{partner.name}</span>
      </div>
    );
  }
  const src = partner.logoUrl || '';
  const alt = partner.logoAlt || partner.name;
  return (
    <div key={`${partner.id}-${keySuffix}`} className="pl pl-logo">
      <Image
        src={src}
        alt={alt}
        width={120}
        height={48}
        className="pl-img object-contain"
        unoptimized={src.startsWith('http')}
      />
      <span className="pl-name">{partner.name}</span>
    </div>
  );
}

export function HomePartners({ section, partners: partnersProp }: { section?: PartnersSection | null; partners?: Partner[] | null } = {}) {
  const partners = useMemo(() => partnersProp?.length ? partnersProp : FALLBACK_PARTNERS, [partnersProp]);
  const eyebrow = section?.eyebrow?.trim() || 'Our Partners & Collaborators';
  const title = section?.title?.trim() || 'Trusted Partners in Impact';
  const subtitle = section?.subtitle?.trim() || "Working alongside government, international organizations, and professional associations aligned with children's rights and early development";

  return (
    <section id="partners">
      <div className="container">
        <div className="pw rv">
          <p className="ey bl ct">{eyebrow}</p>
          <h2>{title}</h2>
          <p className="sub">{subtitle}</p>
          <div className="partners-ticker-wrap" aria-hidden>
            <div className="partners-ticker">
              <div className="plg plg-logos plg-ticker-inner">
                {partners.map((partner) => (
                  <PartnerItem key={`${partner.id}-a`} partner={partner} keySuffix="a" />
                ))}
              </div>
              <div className="plg plg-logos plg-ticker-inner">
                {partners.map((partner) => (
                  <PartnerItem key={`${partner.id}-b`} partner={partner} keySuffix="b" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
