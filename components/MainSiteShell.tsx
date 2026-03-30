import { Navbar } from '@/components/Navbar';
import { HashScrollOnNavigate } from '@/components/HashScrollOnNavigate';
import { Footer } from '@/components/Footer';
import { CookieBanner } from '@/components/CookieBanner';
import { StructuredData } from '@/components/StructuredData';
import { WhatsAppFloat } from '@/components/WhatsAppFloat';
import { HomeGallery } from '@/components/home/HomeGallery';
import { WeCareScripts } from '@/components/WeCareScripts';
import {
  getSettingsPublic,
  getNavPublic,
  getFooterPublic,
  getFooterLinksPublic,
  getProgramsPublic,
  getGalleryPublic,
} from '@/lib/public-api';

export async function MainSiteShell({ children }: Readonly<{ children: React.ReactNode }>) {
  const [settings, navItems, footer, footerLinks, programs, gallery] = await Promise.all([
    getSettingsPublic(),
    getNavPublic(),
    getFooterPublic(),
    getFooterLinksPublic(),
    getProgramsPublic(),
    getGalleryPublic(),
  ]);
  const programList = Array.isArray(programs) ? programs : [];

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-[var(--rose)] focus:px-4 focus:py-2 focus:text-white focus:outline-none"
      >
        Skip to main content
      </a>
      <StructuredData settings={settings} />
      <Navbar settings={settings} navItems={navItems} programs={programList} />
      <HashScrollOnNavigate />
      {children}
      <HomeGallery items={gallery} />
      <Footer settings={settings} footer={footer} footerLinks={footerLinks} />
      <WhatsAppFloat whatsappUrl={settings?.whatsappUrl} />
      <CookieBanner />
      <WeCareScripts />
    </>
  );
}
