'use client';

import { useEffect, useState, useCallback } from 'react';
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
  Menu,
  X,
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
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const closeSidebar = useCallback(() => setSidebarOpen(false), []);

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

  useEffect(() => {
    closeSidebar();
  }, [pathname, closeSidebar]);

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

  const sidebarContent = (
    <div className="sticky top-0 flex h-full min-h-screen flex-col bg-white md:h-screen" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
      <div className="flex items-center justify-between border-b border-[var(--blue)]/10 p-4 md:justify-start md:p-5">
        <Link href="/admin" className="flex items-center gap-3" onClick={closeSidebar}>
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
        <button
          type="button"
          onClick={() => setSidebarOpen((o) => !o)}
          className="rounded-lg p-2 text-[var(--g600)] hover:bg-[var(--g100)] hover:text-[var(--blue)] md:hidden"
          aria-label={sidebarOpen ? 'Close menu' : 'Open menu'}
        >
          {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      <nav className="flex-1 overflow-y-auto p-3">
        <ul className="space-y-0.5">
          {nav.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={closeSidebar}
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
          onClick={closeSidebar}
          className="block rounded-lg px-3 py-2 text-xs font-600 text-[var(--g600)] hover:bg-[var(--g100)] hover:text-[var(--blue)]"
        >
          ← View site
        </Link>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-[var(--off)] font-sans text-[var(--g800)] antialiased">
      {/* Desktop: always-visible sidebar */}
      <aside className="hidden w-64 shrink-0 border-r border-[var(--blue)]/10 md:block">
        {sidebarContent}
      </aside>
      {/* Mobile: overlay sidebar */}
      {sidebarOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/50 md:hidden"
            onClick={closeSidebar}
            aria-hidden
          />
          <aside className="fixed inset-y-0 left-0 z-50 w-72 max-w-[85vw] border-r border-[var(--blue)]/10 shadow-xl md:hidden">
            {sidebarContent}
          </aside>
        </>
      )}
      {/* Mobile: menu button when sidebar closed */}
      {!sidebarOpen && (
        <div className="fixed left-4 top-4 z-30 md:hidden">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="rounded-lg bg-white p-2 shadow-md border border-[var(--blue)]/10 text-[var(--g600)] hover:bg-[var(--g100)] hover:text-[var(--blue)]"
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      )}
      <main className="min-w-0 flex-1 overflow-x-hidden overflow-y-auto">
        <div className="p-4 pt-14 md:pt-8 md:p-8">{children}</div>
      </main>
    </div>
  );
}
