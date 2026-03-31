import type { Settings } from '@/lib/api';

export function StructuredData({ settings }: { settings?: Settings | null } = {}) {
  const siteName = settings?.siteName || 'WeCare Foundation';
  const email = settings?.contactEmail || 'info@wecare.or.tz';
  const phone = settings?.contactPhone || '+255768257970';
  const tagline = settings?.tagline || 'Enriching early childhood development for underserved families in Tanzania.';

  const sameAs: string[] = [];
  if (settings?.socialInstagram) sameAs.push(settings.socialInstagram);
  if (settings?.socialFacebook) sameAs.push(settings.socialFacebook);
  if (settings?.socialLinkedIn) sameAs.push(settings.socialLinkedIn);

  const org = {
    '@context': 'https://schema.org',
    '@type': 'NGO',
    '@id': 'https://wecare.or.tz/#organization',
    name: siteName,
    description: tagline,
    url: 'https://wecare.or.tz',
    logo: 'https://wecare.or.tz/logo.png',
    email,
    telephone: phone,
    foundingDate: '2022',
    founder: { '@type': 'Person', name: 'Elizabeth Maginga Thobias' },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Mbeya',
      addressCountry: 'TZ',
    },
    areaServed: [
      { '@type': 'AdministrativeArea', name: 'Mbeya Region' },
      { '@type': 'AdministrativeArea', name: 'Mara Region' },
    ],
    sameAs,
  };

  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://wecare.or.tz/#website',
    url: 'https://wecare.or.tz',
    name: siteName,
    publisher: { '@id': 'https://wecare.or.tz/#organization' },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(org) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }} />
    </>
  );
}
