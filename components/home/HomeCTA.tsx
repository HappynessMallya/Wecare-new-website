'use client';

import { WHATSAPP_URL } from '@/lib/constants';
import type { CTAInvolved } from '@/lib/api';

const CARD_CLASS: Record<string, string> = { c1: 'c1', c2: 'c2', c3: 'c3' };

export function HomeCTA({ data }: { data?: CTAInvolved | null } = {}) {
  const eyebrow = data?.eyebrow?.trim() || 'Get Involved';
  const title = data?.title?.trim() || 'Be Part of the';
  const titleHighlight = data?.titleHighlight?.trim() || 'Change';
  const intro = data?.intro?.trim() || "There are meaningful ways to join WeCare's mission — whether you're a funder, partner organisation, or individual who believes every Tanzanian child deserves the best start in life.";
  const cards = data?.cards?.length ? data.cards : [
    { id: '1', iconEmoji: '❤️', title: 'Donate', body: 'Your contribution directly funds daycare centres, parent clinic sessions, school readiness programs, and the Mwanjelwa community child care centre in Mbeya. Every shilling creates real, measurable change.', ctaLabel: 'Make a Donation →', ctaHref: WHATSAPP_URL, styleClass: 'c1' as const, order: 0 },
    { id: '2', iconEmoji: '🤝', title: 'Partner With Us', body: "We welcome partnerships with NGOs, corporations, foundations, and government bodies. Co-create programs, fund initiatives, or share expertise to multiply impact across Tanzania's ECD landscape.", ctaLabel: 'Explore Partnership →', ctaHref: WHATSAPP_URL, styleClass: 'c2' as const, order: 1 },
    { id: '3', iconEmoji: '🙋', title: 'Volunteer', body: 'Bring your skills to Mbeya or Mara and make a direct difference. We welcome early childhood educators, health professionals, social workers, researchers, and communications specialists.', ctaLabel: 'Join as Volunteer →', ctaHref: '#contact', styleClass: 'c3' as const, order: 2 },
  ];
  const delay = ['', 'd1', 'd2'];

  return (
    <section id="involved">
      <div className="container">
        <div className="sh rv">
          <p className="ey ct">{eyebrow}</p>
          <h2>{title} <span>{titleHighlight}</span></h2>
          <p>{intro}</p>
        </div>
        <div className="invg">
          {cards.map((card, i) => (
            <div key={card.id} className={`invc ${CARD_CLASS[card.styleClass] ?? 'c1'} rv ${delay[i] ?? ''}`}>
              <div className="ico">{card.iconEmoji}</div>
              <h3>{card.title}</h3>
              <p>{card.body}</p>
              <a href={card.ctaHref} target={card.ctaHref.startsWith('http') ? '_blank' : undefined} rel={card.ctaHref.startsWith('http') ? 'noopener noreferrer' : undefined} className="ibtn">
                {card.ctaLabel}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
