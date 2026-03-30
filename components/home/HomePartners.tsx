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

export function HomePartners({ section, partners: partnersProp }: { section?: PartnersSection | null; partners?: Partner[] | null } = {}) {
  const partners = useMemo(() => partnersProp?.length ? partnersProp : FALLBACK_PARTNERS, [partnersProp]);
  const eyebrow = section?.eyebrow?.trim() || 'Our Partners & Collaborators';
  const title = section?.title?.trim() || 'Trusted Partners in Impact';
  const subtitle = section?.subtitle?.trim() || "Working alongside government, international organizations, and professional associations aligned with children's rights and early development";

  return (
    <section id="partners" className="partners">
      <div className="partners-header rv">
        <p className="eyebrow center">{eyebrow}</p>
        <h2 className="section-title">{title}</h2>
        <p className="section-sub">{subtitle}</p>
      </div>
      <div className="ticker-wrap" aria-hidden>
        <div className="ticker-fade-l" />
        <div className="ticker-fade-r" />
        <div className="ticker-track">
          {[...partners, ...partners].map((partner, idx) => {
            if (partner.logoUrl) {
              return (
                <div key={`${partner.id}-${idx}`} className="pl pl-logo partner-chip">
                  <Image
                    src={partner.logoUrl}
                    alt={partner.logoAlt || partner.name}
                    width={120}
                    height={48}
                    className="pl-img object-contain"
                    unoptimized={partner.logoUrl.startsWith('http')}
                  />
                  <span className="pl-name">{partner.name}</span>
                </div>
              );
            }
            return (
              <div key={`${partner.id}-${idx}`} className="pl pl-text-only partner-chip">
                <span className="partner-dot" />
                {partner.name}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
