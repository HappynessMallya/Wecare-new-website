import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CookieBanner } from '@/components/CookieBanner';
import { StructuredData } from '@/components/StructuredData';
import { WhatsAppFloat } from '@/components/WhatsAppFloat';
import {
  getSettingsPublic,
  getNavPublic,
  getFooterPublic,
  getFooterLinksPublic,
} from '@/lib/public-api';

export default async function MainSiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [settings, navItems, footer, footerLinks] = await Promise.all([
    getSettingsPublic(),
    getNavPublic(),
    getFooterPublic(),
    getFooterLinksPublic(),
  ]);

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-[var(--rose)] focus:px-4 focus:py-2 focus:text-white focus:outline-none"
      >
        Skip to main content
      </a>
      <StructuredData settings={settings} />
      <Navbar settings={settings} navItems={navItems} />
      {children}
      <Footer settings={settings} footer={footer} footerLinks={footerLinks} />
      <WhatsAppFloat whatsappUrl={settings?.whatsappUrl} />
      <CookieBanner />
    </>
  );
}
