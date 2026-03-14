'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Settings,
  Image as HeroIcon,
  FileText,
  BarChart3,
  BookOpen,
  ImageIcon,
  MessageSquare,
  Handshake,
  User,
  Megaphone,
  Mail,
  Navigation,
  PanelBottom,
  LogOut,
} from 'lucide-react';
import { getAccessToken, getMe, logout } from '@/lib/api';
import type { AdminUser } from '@/lib/api';

const nav = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Settings', href: '/admin/settings', icon: Settings },
  { label: 'Hero', href: '/admin/hero', icon: HeroIcon },
  { label: 'SDG Ticker', href: '/admin/ticker', icon: FileText },
  { label: 'About', href: '/admin/about', icon: FileText },
  { label: 'Impact Bar', href: '/admin/impact', icon: BarChart3 },
  { label: 'Programs', href: '/admin/programs', icon: BookOpen },
  { label: 'Gallery', href: '/admin/gallery', icon: ImageIcon },
  { label: 'Impact Stories', href: '/admin/stories', icon: MessageSquare },
  { label: 'Partners', href: '/admin/partners', icon: Handshake },
  { label: 'Leadership', href: '/admin/leadership', icon: User },
  { label: 'Get Involved & CTA', href: '/admin/cta', icon: Megaphone },
  { label: 'Newsletter', href: '/admin/newsletter', icon: Mail },
  { label: 'Contact', href: '/admin/contact', icon: Mail },
  { label: 'Navigation', href: '/admin/navigation', icon: Navigation },
  { label: 'Footer', href: '/admin/footer', icon: PanelBottom },
];

export function AdminAuthGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isPublicPage = pathname === '/admin/login' || pathname === '/admin/forgot-password';
  const [user, setUser] = useState<AdminUser | null>(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (isPublicPage) {
      setChecking(false);
      return;
    }
    const token = getAccessToken();
    if (!token) {
      window.location.href = '/admin/login';
      return;
    }
    getMe()
      .then((u) => {
        setUser(u);
        setChecking(false);
      })
      .catch(() => {
        setChecking(false);
        window.location.href = '/admin/login';
      });
  }, [isPublicPage]);

  const handleLogout = async () => {
    await logout();
    window.location.href = '/admin/login';
  };

  if (isPublicPage) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--off)] font-sans text-[var(--g800)] antialiased">
        {children}
      </div>
    );
  }

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--off)] font-sans antialiased">
        <p className="text-[var(--g600)]">Loading…</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[var(--off)] font-sans text-[var(--g800)] antialiased">
      <aside
        className="w-64 shrink-0 border-r border-[var(--blue)]/10 bg-white"
        style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
      >
        <div className="sticky top-0 flex h-screen flex-col">
          <div className="border-b border-[var(--blue)]/10 p-5">
            <Link href="/admin" className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="WeCare Foundation"
                width={40}
                height={40}
                className="h-10 w-10 shrink-0 object-contain"
              />
              <div className="min-w-0">
                <span className="block text-lg font-800 text-[var(--blue)]">WeCare</span>
                <span className="block text-xs font-600 text-[var(--rose)]">Admin</span>
              </div>
            </Link>
          </div>
          <nav className="flex-1 overflow-y-auto p-3">
            <ul className="space-y-0.5">
              {nav.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-600 text-[var(--blue)] transition-colors hover:bg-[var(--rose-15)] hover:text-[var(--rose)]"
                    >
                      <Icon className="h-4 w-4 shrink-0" />
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          <div className="border-t border-[var(--blue)]/10 p-3 space-y-1">
            {user && (
              <p className="px-3 py-1 text-xs text-[var(--g600)] truncate" title={user.email}>
                {user.email}
              </p>
            )}
            <button
              type="button"
              onClick={handleLogout}
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs font-600 text-[var(--g600)] hover:bg-[var(--g100)] hover:text-[var(--blue)]"
            >
              <LogOut className="h-3.5 w-3.5" />
              Log out
            </button>
            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-lg px-3 py-2 text-xs font-600 text-[var(--g600)] hover:bg-[var(--g100)] hover:text-[var(--blue)]"
            >
              ← View site
            </Link>
          </div>
        </div>
      </aside>
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
