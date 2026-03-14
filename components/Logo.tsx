import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';

const LOGO_SIZE = { default: 52, nav: 62 } as const;

const DEFAULT_TAGLINE = 'Mbeya & Mara · Tanzania · Est. 2022';

export function Logo({ className, showText = true, showTagline = false, tagline, dark = false, size = 'default' }: { className?: string; showText?: boolean; showTagline?: boolean; tagline?: string; dark?: boolean; size?: 'default' | 'nav' }) {
  const wh = LOGO_SIZE[size];
  const logoImage = (
    <Image
      src="/logo.png"
      alt="WeCare Foundation"
      width={wh}
      height={wh}
      className="flex-shrink-0"
      priority
    />
  );
  const baseClass = cn('flex items-center gap-3 no-underline', className);
  const taglineText = tagline ?? DEFAULT_TAGLINE;
  const textBlock = showText ? (
    <div className={dark ? '' : 'nltxt'}>
      <span className="top">WeCare Foundation</span>
      {showTagline && <span className="btm">{taglineText}</span>}
    </div>
  ) : null;
  if (showText) {
    if (dark) {
      return (
        <div className={baseClass}>
          {logoImage}
          {textBlock}
        </div>
      );
    }
    return (
      <Link href="#hero" className={cn(baseClass, 'nlogo')}>
        {logoImage}
        {textBlock}
      </Link>
    );
  }
  return <div className={baseClass}>{logoImage}</div>;
}
