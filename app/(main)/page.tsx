import { Hero } from '@/components/Hero';
import { HomeAbout } from '@/components/home/HomeAbout';
import { Leadership } from '@/components/Leadership';
import { ImpactBar } from '@/components/ImpactBar';
import { HomePartners } from '@/components/home/HomePartners';
import { HomeContact } from '@/components/HomeContact';
import {
  getSettingsPublic,
  getHeroSlidesPublic,
  getAboutPublic,
  getImpactBarPublic,
  getProgramsPublic,
  getPartnersSectionPublic,
  getPartnersPublic,
  getLeadershipPublic,
  getContactSectionPublic,
} from '@/lib/public-api';

export default async function HomePage() {
  const [
    settings,
    heroSlides,
    about,
    impactItems,
    programs,
    partnersSection,
    partners,
    leadership,
    contactSection,
  ] = await Promise.all([
    getSettingsPublic(),
    getHeroSlidesPublic(),
    getAboutPublic(),
    getImpactBarPublic(),
    getProgramsPublic(),
    getPartnersSectionPublic(),
    getPartnersPublic(),
    getLeadershipPublic(),
    getContactSectionPublic(),
  ]);

  return (
    <main id="main-content">
      <Hero slides={heroSlides} settings={settings} programs={programs} />
      <HomeAbout data={about} settings={settings} />
      <Leadership data={leadership} />
      <ImpactBar items={impactItems} />
      <HomePartners section={partnersSection} partners={partners} />
      <HomeContact data={contactSection} settings={settings} />
    </main>
  );
}
