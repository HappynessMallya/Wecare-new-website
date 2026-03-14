import type { Metadata } from 'next';
import { AdminAuthGuard } from '@/components/admin/AdminAuthGuard';

export const metadata: Metadata = {
  title: 'Admin | WeCare Foundation CMS',
  description: 'Manage WeCare Foundation website content',
  robots: 'noindex, nofollow',
};

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <AdminAuthGuard>{children}</AdminAuthGuard>;
}
