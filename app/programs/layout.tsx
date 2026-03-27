import { MainSiteShell } from '@/components/MainSiteShell';

export default function ProgramsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <MainSiteShell>{children}</MainSiteShell>;
}
