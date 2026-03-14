import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CookieBanner } from '@/components/CookieBanner';
import { StructuredData } from '@/components/StructuredData';
import { WhatsAppFloat } from '@/components/WhatsAppFloat';

export default function MainSiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-[var(--rose)] focus:px-4 focus:py-2 focus:text-white focus:outline-none"
      >
        Skip to main content
      </a>
      <StructuredData />
      <Navbar />
      {children}
      <Footer />
      <WhatsAppFloat />
      <CookieBanner />
    </>
  );
}
