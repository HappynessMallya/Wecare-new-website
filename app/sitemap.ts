import type { MetadataRoute } from 'next';

const BASE = 'https://wecare.or.tz';

export default function sitemap(): MetadataRoute.Sitemap {
  const programs = [
    'ecd',
    'quality-early-childhood-education',
    'child-care-in-public-spaces',
    'early-life-skills-training',
  ];

  return [
    { url: BASE, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE}/team`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    ...programs.map((id) => ({
      url: `${BASE}/programs/${id}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    })),
  ];
}
