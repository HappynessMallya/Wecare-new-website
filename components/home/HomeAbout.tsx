'use client';

import { useMemo } from 'react';
import Image from 'next/image';
import { Users, Globe2, HeartHandshake } from 'lucide-react';
import type { About, Settings } from '@/lib/api';

export function HomeAbout({ data, settings }: { data?: About | null; settings?: Settings | null } = {}) {
  const mainImage = data?.mainImageUrl?.trim() || '/parentclinic.jpg';
  const secondaryImage = data?.secondaryImageUrl?.trim() || '/kids-at-work.jpg';
  const siteName = settings?.siteName?.trim() || 'WeCare Foundation';
  const mainImageAlt = `${siteName} — community and early childhood`;

  const pillars = useMemo(
    () =>
      data?.pillars?.length
        ? data.pillars
        : [
            { id: '1', title: 'Collaborative approach', description: '', iconEmoji: '', colorKey: 'r' as const },
            { id: '2', title: 'Community-led', description: '', iconEmoji: '', colorKey: 'b' as const },
            { id: '3', title: 'Parent-centered', description: '', iconEmoji: '', colorKey: 'a' as const },
          ],
    [data?.pillars],
  );

  const eyebrow = data?.eyebrow?.trim() || 'Who We Are';
  const missionTitle = data?.missionTitle?.trim() || 'Our mission';
  const missionBody =
    data?.missionBody?.trim() ||
    'To contribute towards attainment of quality early childhood development, learning, and health outcomes through innovative solutions, community and family engagement.';
  const visionTitle = data?.visionTitle?.trim() || 'Our vision';
  const visionBody =
    data?.visionBody?.trim() ||
    'To provide access to the best start of life for all children in early development, learning, and health across Tanzania.';

  return (
    <section id="about" className="about">
      <div className="about-inner">
        <div className="about-img-wrap rv">
          <div className="about-img-main">
            <Image
              src={mainImage}
              alt={mainImageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 48vw"
              className="object-cover"
              unoptimized={mainImage.startsWith('http')}
              priority={false}
            />
          </div>
          <div className="about-img-accent">
            <Image
              src={secondaryImage}
              alt={`${siteName} — secondary`}
              fill
              sizes="(max-width: 1024px) 50vw, 26vw"
              className="object-cover"
              unoptimized={secondaryImage.startsWith('http')}
              priority={false}
            />
          </div>
          <div className="about-badge">
            <div className="about-badge-num">Est. 2022</div>
            <div className="about-badge-label">Tanzania</div>
          </div>
        </div>
        <div className="about-content rv d1">
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="section-title">
            Every child deserves the <span className="accent">best start</span> in life
          </h2>
          <div className="about-mv-card">
            <strong>{missionTitle}</strong>
            <p>{missionBody}</p>
          </div>
          <div className="about-mv-card vision">
            <strong>{visionTitle}</strong>
            <p>{visionBody}</p>
          </div>
          <h3 className="value-heading">Core Values</h3>
          <div className="value-list">
            {pillars.map((p) => (
              <div className="value-row" key={p.id}>
                <span className="value-icon" aria-hidden>
                  {p.colorKey === 'r' ? <HeartHandshake size={18} /> : p.colorKey === 'b' ? <Globe2 size={18} /> : <Users size={18} />}
                </span>
                <span className="value-text">{p.title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
