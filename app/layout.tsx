import type { Metadata, Viewport } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
  weight: ['300', '400', '500', '600', '700', '800', '900'],
});

const SITE_URL = 'https://wecare.or.tz';
const SITE_NAME = 'WeCare Foundation';
const DESCRIPTION = 'WeCare Foundation supports early childhood development in Tanzania — improving learning, health, and care outcomes for children aged 0–8 through family engagement and community-led solutions across Mbeya and Mara.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Early Childhood Development Tanzania`,
    template: `%s | ${SITE_NAME}`,
  },
  description: DESCRIPTION,
  keywords: [
    'WeCare Foundation', 'early childhood development', 'Tanzania', 'ECD',
    'Mbeya', 'Mara', 'child care', 'parent clinic', 'school readiness',
    'community development', 'NGO Tanzania', 'children education',
    'life skills training', 'daycare Tanzania',
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  icons: {
    icon: '/favicon.ico',
    apple: '/logo.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} | Enriching Children's Lives`,
    description: DESCRIPTION,
    images: [{ url: '/logo.png', width: 512, height: 512, alt: `${SITE_NAME} logo` }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} | Enriching Children's Lives`,
    description: DESCRIPTION,
    images: ['/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: { canonical: SITE_URL },
  category: 'nonprofit',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#0A3487',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={montserrat.variable} suppressHydrationWarning>
      <head>
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen bg-white font-sans font-light text-neutral-800 antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
