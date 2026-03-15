import { Hero } from '@/components/Hero';
import { SDGTicker } from '@/components/SDGTicker';
import { HomeAbout } from '@/components/home/HomeAbout';
import { HomePrograms } from '@/components/home/HomePrograms';
import { ImpactBar } from '@/components/ImpactBar';
import { HomeGallery } from '@/components/home/HomeGallery';
import { HomeStories } from '@/components/home/HomeStories';
import { HomePartners } from '@/components/home/HomePartners';
import { Leadership } from '@/components/Leadership';
import { HomeCTA } from '@/components/home/HomeCTA';
import { HomeCTABanner } from '@/components/home/HomeCTABanner';
import { HomeContact } from '@/components/HomeContact';
import { NewsletterSection } from '@/components/NewsletterSection';
import { WeCareScripts } from '@/components/WeCareScripts';
import {
  getSettingsPublic,
  getHeroSlidesPublic,
  getTickerItemsPublic,
  getAboutPublic,
  getImpactBarPublic,
  getProgramSectionPublic,
  getProgramsPublic,
  getGalleryPublic,
  getStoriesSectionPublic,
  getStoriesPublic,
  getPartnersSectionPublic,
  getPartnersPublic,
  getLeadershipPublic,
  getCTAInvolvedPublic,
  getCTABannerPublic,
  getNewsletterPublic,
  getContactSectionPublic,
} from '@/lib/public-api';

export default async function HomePage() {
  const [
    settings,
    heroSlides,
    tickerItems,
    about,
    impactItems,
    programSection,
    programs,
    gallery,
    storiesSection,
    stories,
    partnersSection,
    partners,
    leadership,
    ctaInvolved,
    ctaBanner,
    newsletter,
    contactSection,
  ] = await Promise.all([
    getSettingsPublic(),
    getHeroSlidesPublic(),
    getTickerItemsPublic(),
    getAboutPublic(),
    getImpactBarPublic(),
    getProgramSectionPublic(),
    getProgramsPublic(),
    getGalleryPublic(),
    getStoriesSectionPublic(),
    getStoriesPublic(),
    getPartnersSectionPublic(),
    getPartnersPublic(),
    getLeadershipPublic(),
    getCTAInvolvedPublic(),
    getCTABannerPublic(),
    getNewsletterPublic(),
    getContactSectionPublic(),
  ]);

  return (
    <main id="main-content">
      <Hero slides={heroSlides} settings={settings} impactItems={impactItems} />
      <SDGTicker items={tickerItems} />
      <HomeAbout data={about} settings={settings} />
      <ImpactBar items={impactItems} />
      <HomePrograms section={programSection} programs={programs} />
      <HomeGallery items={gallery} />
      <HomeStories section={storiesSection} stories={stories} />
      <HomePartners section={partnersSection} partners={partners} />
      <Leadership data={leadership} />
      <HomeCTA data={ctaInvolved} />
      <HomeCTABanner data={ctaBanner} />
      <NewsletterSection data={newsletter} />
      <HomeContact data={contactSection} settings={settings} />
      <WeCareScripts />
    </main>
  );
}
