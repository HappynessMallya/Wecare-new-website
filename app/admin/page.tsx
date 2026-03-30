import Link from 'next/link';
import {
  Settings,
  Image,
  FileText,
  BarChart3,
  BookOpen,
  ImageIcon,
  MessageSquare,
  Handshake,
  User,
  Users,
  Megaphone,
  Mail,
  Navigation,
  PanelBottom,
  ExternalLink,
  Lightbulb,
  Zap,
} from 'lucide-react';

const sections = [
  { label: 'Settings', href: '/admin/settings', icon: Settings, desc: 'Site name, logo, contact & social', countLabel: '1 block' },
  { label: 'Hero', href: '/admin/hero', icon: Image, desc: 'Hero slides and headlines', countLabel: 'slides' },
  { label: 'SDG Ticker', href: '/admin/ticker', icon: FileText, desc: 'Ticker items below hero', countLabel: 'items' },
  { label: 'About', href: '/admin/about', icon: FileText, desc: 'About section and pillars', countLabel: '1 block' },
  { label: 'Impact Bar', href: '/admin/impact', icon: BarChart3, desc: 'Impact statistics', countLabel: 'stats' },
  { label: 'Programs', href: '/admin/programs', icon: BookOpen, desc: 'Programs list and section header', countLabel: 'programs' },
  { label: 'Gallery', href: '/admin/gallery', icon: ImageIcon, desc: 'Photo gallery items', countLabel: 'images' },
  { label: 'Impact Stories', href: '/admin/stories', icon: MessageSquare, desc: 'Testimonials and stories', countLabel: 'stories' },
  { label: 'Partners', href: '/admin/partners', icon: Handshake, desc: 'Partners list and header', countLabel: 'partners' },
  { label: 'Leadership', href: '/admin/leadership', icon: User, desc: 'CEO / leadership block', countLabel: '1 block' },
  { label: 'Team', href: '/admin/team', icon: Users, desc: 'Team members and page copy', countLabel: 'members' },
  { label: 'Get Involved & CTA', href: '/admin/cta', icon: Megaphone, desc: 'CTA cards and banner', countLabel: 'cards + banner' },
  { label: 'Newsletter', href: '/admin/newsletter', icon: Mail, desc: 'Newsletter section', countLabel: '1 block' },
  { label: 'Contact', href: '/admin/contact', icon: Mail, desc: 'Contact section copy', countLabel: '1 block' },
  { label: 'Navigation', href: '/admin/navigation', icon: Navigation, desc: 'Main nav links', countLabel: 'links' },
  { label: 'Footer', href: '/admin/footer', icon: PanelBottom, desc: 'Footer links and copyright', countLabel: 'links + blurb' },
];

const quickLinks = [
  { label: 'Settings', href: '/admin/settings', note: 'Logo, phone, WhatsApp, social' },
  { label: 'Hero', href: '/admin/hero', note: 'First thing visitors see' },
  { label: 'Programs', href: '/admin/programs', note: 'Core program cards' },
  { label: 'Contact', href: '/admin/contact', note: 'Form labels & messages' },
];

const tips = [
  'Logo, tagline, phone, WhatsApp and social links all live in **Settings**.',
  '**Hero** is the main carousel at the top of the site — keep slides and headlines up to date.',
  '**Navigation** and **Footer** control the main menu and footer link groups site-wide.',
  'After connecting your backend API, this dashboard can show live content counts and last-updated times.',
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      {/* Welcome + primary actions */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-800 text-[var(--blue)]">Dashboard</h1>
          <p className="mt-1 text-sm text-[var(--g600)] max-w-xl">
            Manage all content and settings for the WeCare Foundation website. Use the links below to edit any section.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-[var(--blue)] px-4 py-2.5 text-sm font-600 text-white transition-colors hover:opacity-90"
          >
            <ExternalLink className="h-4 w-4" />
            View live site
          </Link>
          <Link
            href="/admin/settings"
            className="inline-flex items-center gap-2 rounded-lg border border-[var(--blue)]/30 bg-white px-4 py-2.5 text-sm font-600 text-[var(--blue)] transition-colors hover:bg-[var(--blue-30)]"
          >
            <Settings className="h-4 w-4" />
            Settings
          </Link>
        </div>
      </div>

      {/* Quick jump — most-used sections */}
      <div className="rounded-xl border border-[var(--blue)]/10 bg-white p-5 shadow-sm">
        <h2 className="mb-3 flex items-center gap-2 text-sm font-700 uppercase tracking-wider text-[var(--blue)]">
          <Zap className="h-4 w-4" />
          Quick jump
        </h2>
        <p className="mb-4 text-sm text-[var(--g600)]">
          Most-used sections. Open any to edit.
        </p>
        <div className="flex flex-wrap gap-3">
          {quickLinks.map(({ label, href, note }) => (
            <Link
              key={href}
              href={href}
              className="rounded-lg border border-[var(--blue)]/20 bg-[var(--off)] px-4 py-2.5 text-sm font-600 text-[var(--blue)] transition-colors hover:border-[var(--rose)]/40 hover:bg-[var(--rose-15)] hover:text-[var(--rose)]"
            >
              <span className="block">{label}</span>
              <span className="block text-xs font-400 normal-case text-[var(--g600)]">{note}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Content overview — all sections */}
      <div>
        <h2 className="mb-4 text-lg font-700 text-[var(--blue)]">Content overview</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sections.map(({ label, href, icon: Icon, desc, countLabel }) => (
            <Link
              key={href}
              href={href}
              className="flex items-start gap-4 rounded-xl border border-[var(--blue)]/10 bg-white p-5 shadow-sm transition-all hover:border-[var(--rose)]/30 hover:shadow-md"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--rose-15)] text-[var(--rose)]">
                <Icon className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-700 text-[var(--blue)]">{label}</h3>
                <p className="mt-0.5 text-sm text-[var(--g600)]">{desc}</p>
                <p className="mt-1.5 text-xs font-600 uppercase tracking-wider text-[var(--g400)]">
                  {countLabel}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Tips for admins */}
      <div className="rounded-xl border border-[var(--blue)]/10 bg-white p-5 shadow-sm">
        <h2 className="mb-3 flex items-center gap-2 text-sm font-700 uppercase tracking-wider text-[var(--blue)]">
          <Lightbulb className="h-4 w-4" />
          Tips for managing content
        </h2>
        <ul className="space-y-2 text-sm text-[var(--g700)]">
          {tips.map((tip, i) => (
            <li key={i} className="flex gap-2">
              <span className="text-[var(--rose)]">•</span>
              <span
                dangerouslySetInnerHTML={{
                  __html: tip.replace(/\*\*(.*?)\*\*/g, '<strong class="text-[var(--blue)]">$1</strong>'),
                }}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
