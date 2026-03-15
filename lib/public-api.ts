/**
 * Server-side only: fetch public CMS data with Next.js cache (ISR).
 * Use in layout/page server components. No auth is sent; backend must allow
 * unauthenticated GET for these routes (or expose public read endpoints).
 */
import type {
  Settings,
  HeroSlide,
  TickerItem,
  About,
  ImpactItem,
  ProgramSection,
  Program,
  GalleryItem,
  StoriesSection,
  Story,
  PartnersSection,
  Partner,
  Leadership,
  CTAInvolved,
  CTABanner,
  Newsletter,
  ContactSection,
  NavItem,
  FooterCopy,
  FooterLinks,
} from '@/lib/api';

const BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000';
const REVALIDATE = 30; // seconds; when admin saves, we also trigger on-demand revalidate so public site updates immediately

async function publicGet<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${BASE}${path}`, {
      next: { revalidate: REVALIDATE },
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) return null;
    const json = await res.json();
    return (json.data ?? json) as T;
  } catch {
    return null;
  }
}

export async function getSettingsPublic(): Promise<Settings | null> {
  return publicGet<Settings>('/api/settings');
}

export async function getHeroSlidesPublic(): Promise<HeroSlide[] | null> {
  // Try public route first (no auth); fallback to admin route for backends that only have one
  const data =
    (await publicGet<HeroSlide[]>('/api/hero/slides')) ??
    (await publicGet<HeroSlide[]>('/api/hero/slides/admin'));
  if (!Array.isArray(data)) return null;
  return data.filter((s) => s.isActive !== false).sort((a, b) => a.order - b.order);
}

export async function getTickerItemsPublic(): Promise<TickerItem[] | null> {
  const data = await publicGet<TickerItem[]>('/api/ticker/items');
  if (!Array.isArray(data)) return null;
  return data.sort((a, b) => a.order - b.order);
}

export async function getAboutPublic(): Promise<About | null> {
  return publicGet<About>('/api/about');
}

export async function getImpactBarPublic(): Promise<ImpactItem[] | null> {
  const data = await publicGet<ImpactItem[] | { items: ImpactItem[] }>('/api/impact/bar');
  if (!data) return null;
  const list = Array.isArray(data) ? data : data.items;
  return (list ?? []).sort((a, b) => a.order - b.order);
}

export async function getProgramSectionPublic(): Promise<ProgramSection | null> {
  return publicGet<ProgramSection>('/api/programs/section');
}

export async function getProgramsPublic(): Promise<Program[] | null> {
  const data = await publicGet<Program[]>('/api/programs/admin');
  if (!Array.isArray(data)) return null;
  return data.filter((p) => p.isActive !== false).sort((a, b) => a.order - b.order);
}

export async function getGalleryPublic(): Promise<GalleryItem[] | null> {
  const data = await publicGet<GalleryItem[]>('/api/gallery/admin');
  if (!Array.isArray(data)) return null;
  return data.sort((a, b) => a.order - b.order);
}

export async function getStoriesSectionPublic(): Promise<StoriesSection | null> {
  return publicGet<StoriesSection>('/api/stories/section');
}

export async function getStoriesPublic(): Promise<Story[] | null> {
  const data = await publicGet<Story[]>('/api/stories/admin');
  if (!Array.isArray(data)) return null;
  return data.sort((a, b) => a.order - b.order);
}

export async function getPartnersSectionPublic(): Promise<PartnersSection | null> {
  return publicGet<PartnersSection>('/api/partners/section');
}

export async function getPartnersPublic(): Promise<Partner[] | null> {
  const data = await publicGet<Partner[]>('/api/partners/admin');
  if (!Array.isArray(data)) return null;
  return data.sort((a, b) => a.order - b.order);
}

export async function getLeadershipPublic(): Promise<Leadership | null> {
  return publicGet<Leadership>('/api/leadership');
}

export async function getCTAInvolvedPublic(): Promise<CTAInvolved | null> {
  return publicGet<CTAInvolved>('/api/cta/involved');
}

export async function getCTABannerPublic(): Promise<CTABanner | null> {
  return publicGet<CTABanner>('/api/cta/banner');
}

export async function getNewsletterPublic(): Promise<Newsletter | null> {
  return publicGet<Newsletter>('/api/newsletter');
}

export async function getContactSectionPublic(): Promise<ContactSection | null> {
  return publicGet<ContactSection>('/api/contact/section');
}

export async function getNavPublic(): Promise<NavItem[] | null> {
  const data = await publicGet<NavItem[]>('/api/nav');
  if (!Array.isArray(data)) return null;
  return data.sort((a, b) => a.order - b.order);
}

export async function getFooterPublic(): Promise<FooterCopy | null> {
  return publicGet<FooterCopy>('/api/footer');
}

export async function getFooterLinksPublic(): Promise<FooterLinks | null> {
  return publicGet<FooterLinks>('/api/footer/links');
}
