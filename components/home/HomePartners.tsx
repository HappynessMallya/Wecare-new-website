'use client';

import Image from 'next/image';

const PARTNERS = [
  { src: '/GOVERNMENT.svg', alt: 'Government of Tanzania', name: 'Government of Tanzania' },
  { src: '/TECDEN.png', alt: 'TECDEN', name: 'TECDEN' },
  { src: '/HELVETAS.png', alt: 'Helvetas Tanzania', name: 'Helvetas Tanzania' },
  { src: '/GSF.svg', alt: 'Global School Forum', name: 'Global School Forum' },
  { src: '/PEDITRICIAN.png', alt: 'Pediatric Association of Tanzania', name: 'Pediatric Association of Tanzania' },
  { textOnly: true, name: 'Parents' },
];

function PartnerItem({
  partner,
  keySuffix,
}: {
  partner: (typeof PARTNERS)[number];
  keySuffix: string;
}) {
  if ('textOnly' in partner && partner.textOnly) {
    return (
      <div key={`${partner.name}-${keySuffix}`} className="pl pl-text-only">
        <span className="pl-text-only-label">{partner.name}</span>
      </div>
    );
  }
  const { src, alt } = partner as { name: string; src: string; alt: string };
  return (
    <div key={`${partner.name}-${keySuffix}`} className="pl pl-logo">
      <Image
        src={src}
        alt={alt}
        width={120}
        height={48}
        className="pl-img object-contain"
      />
      <span className="pl-name">{partner.name}</span>
    </div>
  );
}

export function HomePartners() {
  return (
    <section id="partners">
      <div className="container">
        <div className="pw rv">
          <p className="ey bl ct">Our Partners &amp; Collaborators</p>
          <h2>Trusted Partners in Impact</h2>
          <p className="sub">
            Working alongside government, international organizations, and professional associations
            aligned with children&apos;s rights and early development
          </p>
          <div className="partners-ticker-wrap" aria-hidden>
            <div className="partners-ticker">
              <div className="plg plg-logos plg-ticker-inner">
                {PARTNERS.map((partner) => (
                  <PartnerItem key={`${partner.name}-a`} partner={partner} keySuffix="a" />
                ))}
              </div>
              <div className="plg plg-logos plg-ticker-inner">
                {PARTNERS.map((partner) => (
                  <PartnerItem key={`${partner.name}-b`} partner={partner} keySuffix="b" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
