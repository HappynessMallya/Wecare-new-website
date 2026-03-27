/**
 * Fallback content used when the API returns no data (e.g. backend down or 401).
 * Shown on the public site only in that case. Admin dashboard can preview these
 * here so you know which files/entries are code-only and can be removed from the project.
 */
import type { HeroSlide, Program, ProgramSection } from '@/lib/api';

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

export const PROGRAMS_SECTION_FALLBACK: ProgramSection = {
  eyebrow: 'Our Program Focus Areas',
  title: 'Four Programs.',
  titleHighlight: 'One Mission.',
  introParagraph:
    'WeCare Foundation implements four evidence-based program areas designed to improve early childhood development, learning, care, and family wellbeing in Tanzania.',
};

export const PROGRAMS_FALLBACK: Program[] = [
  {
    id: 'ecd',
    imageUrl: '/parentclinic.jpg',
    imageAlt: 'Early childhood development program Tanzania',
    tagLabel: 'Ages 0 - 5',
    tagType: 't1',
    regionBadge: 'Mbeya & Mara Regions',
    title: 'Early Childhood Development',
    subtitle: 'Investing in achieving child optimal development',
    body:
      'WeCare implements programs that offer quality early childhood development. Our approach addresses five core components: child good health, adequate nutrition, responsive caregiving, child security and safety, and opportunities for quality early learning. The program supports the critical period from birth to five years through parent engagement during pregnancy and after birth, using parent clinic sessions and digital health promotion.',
    outcomes: [
      'Parent clinic sessions for caregivers and partners',
      'Digital ECD health promotion through social networks',
      'Guidance on nutrition, safety, and responsive caregiving',
      'Focus on developmental support from age zero to five',
    ],
    footerStat: '5,000+',
    footerStatLabel: 'Parents and caregivers reached',
    ctaLabel: 'Learn more',
    ctaHref: '/#contact',
    order: 0,
    isActive: true,
  },
  {
    id: 'quality-early-childhood-education',
    imageUrl: '/kids.jpg',
    imageAlt: 'Daycare and school readiness activities',
    tagLabel: 'Ages 1 - 5',
    tagType: 't2',
    regionBadge: 'Mbeya & Mara Regions',
    title: 'Quality Early Childhood Education',
    subtitle: 'Investing in school readiness for primary school',
    body:
      'WeCare implements programs that provide opportunities for early learning. We have established daycare centers that offer child care and school readiness activities for children aged 1-5 years. Our center model integrates early learning with early childhood development so children can achieve developmental milestones and foundational academic skills that prepare them for primary school.',
    outcomes: [
      'Daycare and pre-school readiness activities',
      'Integrated developmental milestone support',
      'Early learning and foundational academic preparation',
      'Center model implemented in Mbeya and Mara',
    ],
    footerStat: '800+',
    footerStatLabel: 'Children supported',
    ctaLabel: 'Learn more',
    ctaHref: '/#contact',
    order: 1,
    isActive: true,
  },
  {
    id: 'child-care-in-public-spaces',
    imageUrl: '/kids-at-work.jpg',
    imageAlt: 'Child care solution in public market',
    tagLabel: 'Public Markets',
    tagType: 't3',
    regionBadge: 'Public markets in Tanzania',
    title: 'Offering Child Care Solutions in Public Spaces',
    subtitle: 'Supports child care centers in Tanzania public markets',
    body:
      'We collaborate with the Government of Tanzania, communities, and other stakeholders to establish child care options in public markets. Many women and parents come to markets with children where safe care options are often unavailable. Through community and stakeholder engagement, WeCare supports establishment of centers that are then owned by the community.',
    outcomes: [
      'Community and stakeholder mobilization',
      'Market-based child care center establishment support',
      'Public market safety and care solutions for children',
      'Community-owned model for long-term sustainability',
    ],
    footerStat: '1+',
    footerStatLabel: 'Market centers initiated',
    ctaLabel: 'Learn more',
    ctaHref: '/#contact',
    order: 2,
    isActive: true,
  },
  {
    id: 'early-life-skills-training',
    imageUrl: '/life-skills.jpg',
    imageAlt: 'Children learning early life skills',
    tagLabel: 'Clubs & Skills',
    tagType: 't4',
    regionBadge: 'School and holiday programs',
    title: 'Train Early Life Skills to Children',
    subtitle: 'Age-based life skills aligned with development milestones',
    body:
      'We collaborate with parents to assess developmental milestones and design activities that build early life skills by age. We operate three Academy Clubs: Social Emotional Learning, Arts, and Science. These clubs are integrated in school and holiday programs to help children build confidence, creativity, and practical capabilities.',
    outcomes: [
      'Milestone-based assessments and activity plans',
      'Social emotional learning, arts, and science clubs',
      'School and holiday program integration',
      'Age-appropriate life skills development pathways',
    ],
    footerStat: '210+',
    footerStatLabel: 'Children trained',
    ctaLabel: 'Learn more',
    ctaHref: '/#contact',
    order: 3,
    isActive: true,
  },
];
