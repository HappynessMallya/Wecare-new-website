import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';

const logoImage = (
  <Image
    src="/logo.png"
    alt="WeCare Foundation"
    width={52}
    height={52}
    className="flex-shrink-0"
    priority
  />
);

export function Logo({ className, showText = true, showTagline = false, dark = false }: { className?: string; showText?: boolean; showTagline?: boolean; dark?: boolean }) {
  const baseClass = cn('flex items-center gap-3 no-underline', className);
  const textBlock = showText ? (
    <div className={dark ? '' : 'nltxt'}>
      <span className="top">WeCare Foundation</span>
      {showTagline && <span className="btm">Mbeya & Mara · Tanzania · Est. 2022</span>}
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
