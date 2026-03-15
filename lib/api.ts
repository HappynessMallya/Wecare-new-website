/**
 * WeCare Admin API client.
 * Base URL: NEXT_PUBLIC_API_URL (dev: http://localhost:3000, prod: https://api.wecare.or.tz)
 */
import axios, { type AxiosInstance } from 'axios';

const BASE_URL =
  typeof window !== 'undefined'
    ? (process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000')
    : process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000';

export const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

/** Unwrap envelope: response.data.data */
export function unwrap<T>(res: { data: { data: T } }): T {
  return res.data.data;
}

/** Get stored access token (client-only) */
export function getAccessToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('accessToken');
}

/** Get stored refresh token (client-only) */
export function getRefreshToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('refreshToken');
}

/** Store tokens after login (client-only) */
export function setTokens(accessToken: string, refreshToken: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
}

/** Clear tokens (logout) (client-only) */
export function clearTokens(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
}

/** Redirect to admin login (client-only) */
function redirectToLogin(): void {
  if (typeof window === 'undefined') return;
  window.location.href = '/admin/login';
}

// Attach token on every request (client-side)
api.interceptors.request.use((config) => {
  if (typeof window === 'undefined') return config;
  const token = localStorage.getItem('accessToken');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Auto-refresh on 401
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;
      const refreshToken = getRefreshToken();
      if (!refreshToken) {
        clearTokens();
        redirectToLogin();
        return Promise.reject(error);
      }
      try {
        const { data } = await axios.post<{ data: { accessToken: string } }>(
          `${BASE_URL}/api/auth/refresh`,
          { refreshToken }
        );
        const accessToken = data.data.accessToken;
        setTokens(accessToken, refreshToken);
        original.headers.Authorization = `Bearer ${accessToken}`;
        return api(original);
      } catch {
        clearTokens();
        redirectToLogin();
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

// --- Auth ---
export interface AdminUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'super_admin' | 'admin' | 'editor';
  isActive: boolean;
  lastLoginAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export async function login(email: string, password: string) {
  const res = await api.post<{ data: { accessToken: string; refreshToken: string; user: AdminUser } }>(
    '/api/auth/login',
    { email, password }
  );
  const { accessToken, refreshToken, user } = unwrap(res);
  setTokens(accessToken, refreshToken);
  return user;
}

export async function logout() {
  try {
    await api.post('/api/auth/logout');
  } catch {
    // ignore
  }
  clearTokens();
}

export async function getMe(): Promise<AdminUser> {
  const res = await api.get<{ data: AdminUser }>('/api/auth/me');
  return unwrap(res);
}

export async function forgotPassword(email: string) {
  await api.post('/api/auth/forgot-password', { email });
}

export async function changePassword(currentPassword: string, newPassword: string) {
  await api.post('/api/auth/change-password', { currentPassword, newPassword });
}

// --- Settings ---
export interface Settings {
  id: string;
  siteName: string;
  tagline: string;
  heroHeadline: string;
  logoUrl: string;
  contactPhone: string;
  whatsappUrl: string;
  contactEmail: string;
  officeLocation: string;
  regionsActive: string;
  socialInstagram: string;
  socialFacebook: string;
  socialLinkedIn: string;
  createdAt?: string;
  updatedAt?: string;
}

export async function getSettings(): Promise<Settings> {
  const res = await api.get<{ data: Settings }>('/api/settings');
  return unwrap(res);
}

export async function updateSettings(data: Partial<Settings>): Promise<Settings> {
  const res = await api.put<{ data: Settings }>('/api/settings', data);
  return unwrap(res);
}

// --- Hero slides ---
export interface HeroSlide {
  id: string;
  imageUrl: string;
  alt: string;
  title: string;
  subtitle: string;
  order: number;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export async function getHeroSlides(): Promise<HeroSlide[]> {
  const res = await api.get<{ data: HeroSlide[] }>('/api/hero/slides/admin');
  return unwrap(res);
}

export async function createHeroSlide(data: Omit<HeroSlide, 'id' | 'createdAt' | 'updatedAt'>) {
  const res = await api.post<{ data: HeroSlide }>('/api/hero/slides', data);
  return unwrap(res);
}

export async function updateHeroSlide(id: string, data: Partial<HeroSlide>) {
  const res = await api.put<{ data: HeroSlide }>(`/api/hero/slides/${id}`, data);
  return unwrap(res);
}

export async function deleteHeroSlide(id: string) {
  await api.delete(`/api/hero/slides/${id}`);
}

export async function reorderHeroSlides(order: string[]) {
  const res = await api.patch<{ data: HeroSlide[] }>('/api/hero/slides/reorder', { order });
  return unwrap(res);
}

// --- Ticker ---
export interface TickerItem {
  id: string;
  label: string;
  colorKey: 'blue' | 'rose' | 'orange' | 'azure';
  order: number;
  createdAt?: string;
  updatedAt?: string;
}

export async function getTickerItems(): Promise<TickerItem[]> {
  const res = await api.get<{ data: TickerItem[] }>('/api/ticker/items');
  return unwrap(res);
}

export async function createTickerItem(data: Omit<TickerItem, 'id' | 'createdAt' | 'updatedAt'>) {
  const res = await api.post<{ data: TickerItem }>('/api/ticker/items', data);
  return unwrap(res);
}

export async function updateTickerItem(id: string, data: Partial<TickerItem>) {
  const res = await api.put<{ data: TickerItem }>(`/api/ticker/items/${id}`, data);
  return unwrap(res);
}

export async function deleteTickerItem(id: string) {
  await api.delete(`/api/ticker/items/${id}`);
}

export async function reorderTickerItems(order: string[]) {
  const res = await api.patch<{ data: TickerItem[] }>('/api/ticker/items/reorder', { order });
  return unwrap(res);
}

// --- About ---
export interface AboutPillar {
  id: string;
  title: string;
  description: string;
  iconEmoji: string;
  colorKey: 'r' | 'b' | 'a' | 'o';
}

export interface About {
  id: string;
  eyebrow: string;
  title: string;
  titleHighlight: string;
  tagline: string;
  introParagraph1: string;
  introParagraph2: string;
  missionTitle: string;
  missionBody: string;
  visionTitle: string;
  visionBody: string;
  mainImageUrl: string;
  secondaryImageUrl: string;
  regionsBadgeNumber: string;
  regionsBadgeLabel: string;
  pillars: AboutPillar[];
  createdAt?: string;
  updatedAt?: string;
}

export async function getAbout(): Promise<About> {
  const res = await api.get<{ data: About }>('/api/about');
  return unwrap(res);
}

export async function updateAbout(data: Partial<About>): Promise<About> {
  const res = await api.put<{ data: About }>('/api/about', data);
  return unwrap(res);
}

// --- Impact bar ---
export interface ImpactItem {
  id: string;
  iconEmoji: string;
  number: string;
  suffix: string;
  label: string;
  subtitle: string;
  order: number;
  createdAt?: string;
  updatedAt?: string;
}

export async function getImpactBar(): Promise<ImpactItem[]> {
  const res = await api.get<{ data: ImpactItem[] | { items: ImpactItem[] } }>('/api/impact/bar');
  const data = unwrap(res);
  return Array.isArray(data) ? data : data.items;
}

export async function updateImpactBar(items: ImpactItem[]): Promise<ImpactItem[]> {
  // Strip all IDs — the backend does a full replaceAll (soft-delete + re-create), so
  // sending existing UUIDs causes TypeORM to update the soft-deleted rows instead of
  // creating fresh ones, resulting in items silently disappearing.
  const payload = items.map(({ id: _id, createdAt: _c, updatedAt: _u, ...rest }) => rest);
  const res = await api.put<{ data: ImpactItem[] }>('/api/impact/bar', { items: payload });
  return unwrap(res);
}

// --- Programs ---
export interface ProgramSection {
  eyebrow: string;
  title: string;
  titleHighlight?: string;
  introParagraph: string;
}

export interface Program {
  id: string;
  imageUrl: string;
  imageAlt: string;
  tagLabel: string;
  tagType: string;
  regionBadge: string;
  title: string;
  subtitle: string;
  body: string;
  outcomes: string[];
  footerStat: string;
  footerStatLabel: string;
  ctaLabel: string;
  ctaHref: string;
  order: number;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export async function getProgramsAdmin(): Promise<Program[]> {
  const res = await api.get<{ data: Program[] }>('/api/programs/admin');
  return unwrap(res);
}

export async function getProgramSection(): Promise<ProgramSection> {
  const res = await api.get<{ data: ProgramSection }>('/api/programs/section');
  return unwrap(res);
}

export async function createProgram(data: Omit<Program, 'id' | 'createdAt' | 'updatedAt'>) {
  const res = await api.post<{ data: Program }>('/api/programs', data);
  return unwrap(res);
}

export async function updateProgram(id: string, data: Partial<Program>) {
  const res = await api.put<{ data: Program }>(`/api/programs/${id}`, data);
  return unwrap(res);
}

export async function deleteProgram(id: string) {
  await api.delete(`/api/programs/${id}`);
}

export async function updateProgramSection(data: Partial<ProgramSection>) {
  const res = await api.put<{ data: ProgramSection }>('/api/programs/section', data);
  return unwrap(res);
}

export async function reorderPrograms(order: string[]) {
  const res = await api.patch<{ data: Program[] }>('/api/programs/reorder', { order });
  return unwrap(res);
}

// --- Gallery ---
export interface GalleryItem {
  id: string;
  imageUrl: string;
  alt: string;
  label: string;
  order: number;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export async function getGalleryAdmin(): Promise<GalleryItem[]> {
  const res = await api.get<{ data: GalleryItem[] }>('/api/gallery/admin');
  return unwrap(res);
}

export async function createGalleryItem(data: Omit<GalleryItem, 'id' | 'createdAt' | 'updatedAt'>) {
  const res = await api.post<{ data: GalleryItem }>('/api/gallery', data);
  return unwrap(res);
}

export async function updateGalleryItem(id: string, data: Partial<GalleryItem>) {
  const res = await api.put<{ data: GalleryItem }>(`/api/gallery/${id}`, data);
  return unwrap(res);
}

export async function deleteGalleryItem(id: string) {
  await api.delete(`/api/gallery/${id}`);
}

export async function reorderGallery(order: string[]) {
  const res = await api.patch<{ data: GalleryItem[] }>('/api/gallery/reorder', { order });
  return unwrap(res);
}

// --- Stories ---
export interface Story {
  id: string;
  name: string;
  role: string;
  quote: string;
  imageUrl: string;
  imageAlt: string;
  order: number;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface StoriesSection {
  eyebrow: string;
  title: string;
  titleHighlight: string;
  introItalic: string;
  introParagraph: string;
  approachTitle: string;
  approachBody: string;
  sdgTags?: Array<{ label: string; icon: string; class: string }>;
}

export async function getStoriesAdmin(): Promise<Story[]> {
  const res = await api.get<{ data: Story[] }>('/api/stories/admin');
  return unwrap(res);
}

export async function getStoriesSection(): Promise<StoriesSection> {
  const res = await api.get<{ data: StoriesSection }>('/api/stories/section');
  return unwrap(res);
}

export async function createStory(data: Omit<Story, 'id' | 'createdAt' | 'updatedAt'>) {
  const res = await api.post<{ data: Story }>('/api/stories', data);
  return unwrap(res);
}

export async function updateStory(id: string, data: Partial<Story>) {
  const res = await api.put<{ data: Story }>(`/api/stories/${id}`, data);
  return unwrap(res);
}

export async function deleteStory(id: string) {
  await api.delete(`/api/stories/${id}`);
}

export async function updateStoriesSection(data: Partial<StoriesSection>) {
  const res = await api.put<{ data: StoriesSection }>('/api/stories/section', data);
  return unwrap(res);
}

export async function reorderStories(order: string[]) {
  const res = await api.patch<{ data: Story[] }>('/api/stories/reorder', { order });
  return unwrap(res);
}

// --- Partners ---
export interface Partner {
  id: string;
  name: string;
  logoUrl: string | null;
  logoAlt: string | null;
  textOnly: boolean;
  order: number;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface PartnersSection {
  eyebrow: string;
  title: string;
  subtitle: string;
}

export async function getPartnersAdmin(): Promise<Partner[]> {
  const res = await api.get<{ data: Partner[] }>('/api/partners/admin');
  return unwrap(res);
}

export async function getPartnersSection(): Promise<PartnersSection> {
  const res = await api.get<{ data: PartnersSection }>('/api/partners/section');
  return unwrap(res);
}

export async function createPartner(data: Omit<Partner, 'id' | 'createdAt' | 'updatedAt'>) {
  const res = await api.post<{ data: Partner }>('/api/partners', data);
  return unwrap(res);
}

export async function updatePartner(id: string, data: Partial<Partner>) {
  const res = await api.put<{ data: Partner }>(`/api/partners/${id}`, data);
  return unwrap(res);
}

export async function deletePartner(id: string) {
  await api.delete(`/api/partners/${id}`);
}

export async function updatePartnersSection(data: Partial<PartnersSection>) {
  const res = await api.put<{ data: PartnersSection }>('/api/partners/section', data);
  return unwrap(res);
}

export async function reorderPartners(order: string[]) {
  const res = await api.patch<{ data: Partner[] }>('/api/partners/reorder', { order });
  return unwrap(res);
}

// --- Leadership ---
export interface Leadership {
  id: string;
  sectionEyebrow: string;
  sectionTitle: string;
  sectionTitleHighlight: string;
  photoUrl: string;
  photoAlt: string;
  badgeTitle: string;
  badgeSubtitle: string;
  eyebrow: string;
  name: string;
  nameHighlight: string;
  paragraphs: string[];
  email: string;
  createdAt?: string;
  updatedAt?: string;
}

export async function getLeadership(): Promise<Leadership> {
  const res = await api.get<{ data: Leadership }>('/api/leadership');
  return unwrap(res);
}

export async function updateLeadership(data: Partial<Leadership>): Promise<Leadership> {
  const res = await api.put<{ data: Leadership }>('/api/leadership', data);
  return unwrap(res);
}

// --- CTA Involved ---
export interface CTACard {
  id: string;
  iconEmoji: string;
  title: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
  styleClass: 'c1' | 'c2' | 'c3';
  order: number;
}

export interface CTAInvolved {
  eyebrow: string;
  title: string;
  titleHighlight: string;
  intro: string;
  cards: CTACard[];
}

export async function getCTAInvolved(): Promise<CTAInvolved> {
  const res = await api.get<{ data: CTAInvolved }>('/api/cta/involved');
  return unwrap(res);
}

export async function updateCTAInvolved(data: Partial<CTAInvolved>): Promise<CTAInvolved> {
  const res = await api.put<{ data: CTAInvolved }>('/api/cta/involved', data);
  return unwrap(res);
}

// --- CTA Banner ---
export interface CTABanner {
  id: string;
  imageUrl: string;
  imageAlt: string;
  title: string;
  titleHighlight: string;
  body: string;
  primaryButtonLabel: string;
  primaryButtonHref: string;
  secondaryButtonLabel: string;
  secondaryButtonHref: string;
  createdAt?: string;
  updatedAt?: string;
}

export async function getCTABanner(): Promise<CTABanner> {
  const res = await api.get<{ data: CTABanner }>('/api/cta/banner');
  return unwrap(res);
}

export async function updateCTABanner(data: Partial<CTABanner>): Promise<CTABanner> {
  const res = await api.put<{ data: CTABanner }>('/api/cta/banner', data);
  return unwrap(res);
}

// --- Newsletter ---
export interface Newsletter {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  inputPlaceholder: string;
  buttonLabel: string;
  disclaimer: string;
  createdAt?: string;
  updatedAt?: string;
}

export async function getNewsletter(): Promise<Newsletter> {
  const res = await api.get<{ data: Newsletter }>('/api/newsletter');
  return unwrap(res);
}

export async function updateNewsletter(data: Partial<Newsletter>): Promise<Newsletter> {
  const res = await api.put<{ data: Newsletter }>('/api/newsletter', data);
  return unwrap(res);
}

// --- Contact section ---
export interface ContactSection {
  id: string;
  eyebrow: string;
  title: string;
  titleHighlight: string;
  intro: string;
  formTitle: string;
  fullNameLabel: string;
  organizationLabel: string;
  emailLabel: string;
  inquiryTypeLabel: string;
  messageLabel: string;
  submitLabel: string;
  successMessage: string;
  whatsappButtonLabel: string;
  createdAt?: string;
  updatedAt?: string;
}

export async function getContactSection(): Promise<ContactSection> {
  const res = await api.get<{ data: ContactSection }>('/api/contact/section');
  return unwrap(res);
}

export async function updateContactSection(data: Partial<ContactSection>): Promise<ContactSection> {
  const res = await api.put<{ data: ContactSection }>('/api/contact/section', data);
  return unwrap(res);
}

// --- Nav ---
export interface NavItem {
  id: string;
  label: string;
  href: string;
  order: number;
  isActive?: boolean;
}

export async function getNav(): Promise<NavItem[]> {
  const res = await api.get<{ data: NavItem[] }>('/api/nav');
  return unwrap(res);
}

export async function updateNav(items: NavItem[]): Promise<NavItem[]> {
  const res = await api.put<{ data: NavItem[] }>('/api/nav', { items });
  return unwrap(res);
}

// --- Footer ---
export interface FooterCopy {
  blurb: string;
  copyright: string;
}

export interface FooterLinkItem {
  label: string;
  href: string;
  external?: boolean;
}

export interface FooterLinks {
  orgLinks: FooterLinkItem[];
  programLinks: FooterLinkItem[];
  involvedLinks: FooterLinkItem[];
}

export async function getFooter(): Promise<FooterCopy> {
  const res = await api.get<{ data: FooterCopy }>('/api/footer');
  return unwrap(res);
}

export async function updateFooter(data: Partial<FooterCopy>): Promise<FooterCopy> {
  const res = await api.put<{ data: FooterCopy }>('/api/footer', data);
  return unwrap(res);
}

export async function getFooterLinks(): Promise<FooterLinks> {
  const res = await api.get<{ data: FooterLinks }>('/api/footer/links');
  return unwrap(res);
}

export async function updateFooterLinks(data: Partial<FooterLinks>): Promise<FooterLinks> {
  const res = await api.put<{ data: FooterLinks }>('/api/footer/links', data);
  return unwrap(res);
}

// --- Media ---
export async function getMediaLimits() {
  const res = await api.get<{
    data: {
      maxImageSizeBytes: number;
      maxImageSizeMb: number;
      maxVideoSizeBytes: number;
      maxVideoSizeMb: number;
      maxImageDimension: number;
    };
  }>('/api/media/limits');
  return unwrap(res);
}

export async function getPresignedUrl(filename: string, contentType: string) {
  const res = await api.post<{
    data: { uploadUrl: string; publicUrl: string; mediaId: string; maxSizeBytes: number };
  }>('/api/media/presign', { filename, contentType });
  return unwrap(res);
}

export async function uploadMedia(file: File) {
  const formData = new FormData();
  formData.append('file', file);
  const res = await api.post<{ data: { url: string; mediaId: string } }>('/api/media/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return unwrap(res);
}

// --- Error helper ---
export function getApiErrorMessage(error: unknown): string {
  const res = (error as { response?: { data?: { message?: string; details?: string[]; statusCode?: number } } })
    ?.response?.data;
  if (!res) return 'Network error. Please try again.';
  if (res.details && Array.isArray(res.details)) return res.details.join(', ');
  const statusMessages: Record<number, string> = {
    400: res.message ?? 'Invalid input.',
    401: 'Session expired. Please log in again.',
    403: 'You do not have permission to do this.',
    404: 'Item not found.',
    409: res.message ?? 'Conflict — item already exists.',
    413: 'File too large.',
    429: 'Too many requests. Please wait and try again.',
  };
  return statusMessages[res.statusCode ?? 0] ?? res.message ?? 'Something went wrong.';
}
