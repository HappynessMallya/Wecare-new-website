'use client';

import { WHATSAPP_URL } from '@/lib/constants';
import type { CTABanner as CTABannerData } from '@/lib/api';

export function HomeCTABanner({ data }: { data?: CTABannerData | null } = {}) {
  const imageUrl = data?.imageUrl?.trim() || '/kids.jpg';
  const imageAlt = data?.imageAlt?.trim() || 'WeCare Foundation children Tanzania – every child deserves a strong start';
  const title = data?.title?.trim() || 'Every Child Deserves a';
  const titleHighlight = data?.titleHighlight?.trim() || 'Strong Start in Life';
  const body = data?.body?.trim() || "Join WeCare Foundation in building Tanzania's next generation — in Mbeya, Mara, and beyond. Your support transforms the lives of children and families across Tanzania.";
  const primaryLabel = data?.primaryButtonLabel?.trim() || '❤ Donate Today';
  const primaryHref = data?.primaryButtonHref?.trim() || WHATSAPP_URL;
  const secondaryLabel = data?.secondaryButtonLabel?.trim() || 'Partner With Us';
  const secondaryHref = data?.secondaryButtonHref?.trim() || WHATSAPP_URL;

  return (
    <section id="ctab">
      <img src={imageUrl} alt={imageAlt} loading="lazy" />
      <div className="ov" />
      <div className="container">
        <div className="ctac">
          <h2>{title} <span>{titleHighlight}</span></h2>
          <p>{body}</p>
          <div className="ctabtns">
            <a href={primaryHref} target="_blank" rel="noopener noreferrer" className="btn b-rose">
              {primaryLabel} <span className="arr">→</span>
            </a>
            <a href={secondaryHref} target="_blank" rel="noopener noreferrer" className="btn b-ghost">
              {secondaryLabel} <span className="arr">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
