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

export default function HomePage() {
  return (
    <main id="main-content">
      <Hero />
      <SDGTicker />
      <HomeAbout />
      <ImpactBar />
      <HomePrograms />
      <HomeGallery />
      <HomeStories />
      <HomePartners />
      <Leadership />
      <HomeCTA />
      <HomeCTABanner />
      <NewsletterSection />
      <HomeContact />
      <WeCareScripts />
    </main>
  );
}
