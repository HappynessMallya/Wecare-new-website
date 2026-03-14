import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CookieBanner } from '@/components/CookieBanner';
import { StructuredData } from '@/components/StructuredData';

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
  weight: ['300', '400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  icons: { icon: '/favicon.ico' },
  title: 'WeCARE Foundation | Early Childhood Development Tanzania',
  description:
    'Supporting children, parents and communities to build strong foundations for lifelong learning. Improving early childhood development in Tanzania.',
  openGraph: {
    title: 'WeCARE Foundation | Early Childhood Development Tanzania',
    description:
      'Supporting children, parents and communities to build strong foundations for lifelong learning.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WeCARE Foundation | Early Childhood Development Tanzania',
    description: 'Supporting children, parents and communities to build strong foundations for lifelong learning.',
  },
  robots: 'index, follow',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={montserrat.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="min-h-screen bg-white font-sans font-light text-neutral-800 antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-button focus:bg-rose focus:px-4 focus:py-2 focus:text-white focus:outline-none"
        >
          Skip to main content
        </a>
        <StructuredData />
        <Navbar />
        {children}
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}
