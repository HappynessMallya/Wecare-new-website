import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';

const LOGO_SIZE = { default: 52, nav: 62 } as const;

const DEFAULT_TAGLINE = 'Mbeya & Mara · Tanzania · Est. 2022';
const DEFAULT_SITE_NAME = 'WeCare Foundation';

export function Logo({
  className,
  showText = true,
  showTagline = false,
  tagline,
  dark = false,
  size = 'default',
  logoUrl,
  siteName,
}: {
  className?: string;
  showText?: boolean;
  showTagline?: boolean;
  tagline?: string;
  dark?: boolean;
  size?: 'default' | 'nav';
  logoUrl?: string | null;
  siteName?: string | null;
}) {
  const wh = LOGO_SIZE[size];
  const src = logoUrl && logoUrl.trim() ? logoUrl : '/logo.png';
  const alt = siteName?.trim() || DEFAULT_SITE_NAME;
  const logoImage = (
    <Image
      src={src}
      alt={alt}
      width={wh}
      height={wh}
      className="flex-shrink-0 object-contain"
      priority
      unoptimized={src.startsWith('http')}
    />
  );
  const baseClass = cn('flex items-center gap-3 no-underline', className);
  const taglineText = tagline ?? DEFAULT_TAGLINE;
  const nameText = siteName?.trim() || DEFAULT_SITE_NAME;
  const textBlock = showText ? (
    <div className={dark ? '' : 'nltxt'}>
      <span className="top">{nameText}</span>
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
