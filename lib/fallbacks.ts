/**
 * Fallback content used when the API returns no data (e.g. backend down or 401).
 * Shown on the public site only in that case. Admin dashboard can preview these
 * here so you know which files/entries are code-only and can be removed from the project.
 */
import type { HeroSlide } from '@/lib/api';

export const HERO_FALLBACK_SLIDES: HeroSlide[] = [
  { id: 'f1', imageUrl: '/parent-clinic.jpg', alt: 'Parent clinic sessions Tanzania', title: 'Parent Clinic Sessions', subtitle: 'Responsive caregiving & nutrition', order: 0, isActive: true },
  { id: 'f2', imageUrl: '/sports.jpg', alt: 'WeCare sports and life skills Tanzania', title: 'Sports & Life Skills', subtitle: 'Ages 3–15+ · Academy Clubs', order: 1, isActive: true },
  { id: 'f3', imageUrl: '/life-skills.jpg', alt: 'Early life skills program Tanzania', title: 'Early Life Skills', subtitle: 'Quality early learning', order: 2, isActive: true },
  { id: 'f4', imageUrl: '/airport.jpg', alt: 'WeCare Foundation community and travel', title: 'Community & Outreach', subtitle: 'Reaching families where they are', order: 3, isActive: true },
];

/** About section fallback image paths (used when API has no data). */
export const ABOUT_FALLBACK_IMAGES = [
  { label: 'Main image', path: '/parentclinic.jpg' },
  { label: 'Secondary image', path: '/kids-at-work.jpg' },
] as const;

/** Gallery fallback items (image path + label). */
export const GALLERY_FALLBACK_IMAGES = [
  { path: '/parent-clinic.jpg', label: 'Parent Clinic' },
  { path: '/kids.jpg', label: 'Daycare & Children' },
  { path: '/parentclinic.jpg', label: 'Parent Engagement' },
  { path: '/kids-at-work.jpg', label: 'Child at WeCare' },
  { path: '/kids-planting.jpg', label: 'Life Skills & Environment' },
] as const;
