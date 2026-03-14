'use client';

const PARTNERS = [
  { src: '/GOVERNMENT.svg', alt: 'Government of Tanzania', name: 'Government of Tanzania' },
  { src: '/TECDEN.png', alt: 'TECDEN', name: 'TECDEN' },
  { src: '/HELVETAS.png', alt: 'Helvetas Tanzania', name: 'Helvetas Tanzania' },
  { src: '/GSF.svg', alt: 'Global School Forum', name: 'Global School Forum' },
  { src: '/PEDITRICIAN.png', alt: 'Pediatric Association of Tanzania', name: 'Pediatric Association of Tanzania' },
];

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
          <div className="plg plg-logos">
            {PARTNERS.map((partner) => (
              <div key={partner.name} className="pl pl-logo">
                <img src={partner.src} alt={partner.alt} className="pl-img" />
                <span className="pl-name">{partner.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
