export function StructuredData() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'NGO',
    name: 'WeCARE Foundation',
    description:
      'Improving early childhood development in Tanzania. Supporting children, parents and communities to build strong foundations for lifelong learning.',
    url: 'https://wecarefoundation.org',
    email: 'Wecarefoundation025@gmail.com',
    areaServed: { '@type': 'Country', name: 'Tanzania' },
    sameAs: [],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
