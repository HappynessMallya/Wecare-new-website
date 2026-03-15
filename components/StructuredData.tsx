import type { Settings } from '@/lib/api';

export function StructuredData({ settings }: { settings?: Settings | null } = {}) {
  const siteName = settings?.siteName || 'WeCare Foundation';
  const email = settings?.contactEmail || 'Wecarefoundation025@gmail.com';
  const tagline = settings?.tagline || 'Enriching early childhood development for underserved families in Tanzania.';

  const sameAs: string[] = [];
  if (settings?.socialInstagram) sameAs.push(settings.socialInstagram);
  if (settings?.socialFacebook) sameAs.push(settings.socialFacebook);
  if (settings?.socialLinkedIn) sameAs.push(settings.socialLinkedIn);

  const data = {
    '@context': 'https://schema.org',
    '@type': 'NGO',
    name: siteName,
    description: tagline,
    url: 'https://wecare.or.tz',
    email,
    areaServed: { '@type': 'Country', name: 'Tanzania' },
    sameAs,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
