'use client';

import { useMemo } from 'react';
import Image from 'next/image';
import type { About, Settings } from '@/lib/api';

export function HomeAbout({ data, settings }: { data?: About | null; settings?: Settings | null } = {}) {
  const mainImage = data?.mainImageUrl?.trim() || '/parentclinic.jpg';
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
    <section id="about">
      <div className="container">
        <div className="about-simple">
          <div className="about-simple-visual rv">
            <div className="about-simple-frame">
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
          </div>
          <div className="about-simple-copy rv d1">
            <p className="ey">{eyebrow}</p>
            <div className="about-simple-stack">
              <div className="about-simple-piece">
                <h3 className="about-simple-heading">{missionTitle}</h3>
                <p className="about-simple-text">{missionBody}</p>
              </div>
              <div className="about-simple-piece">
                <h3 className="about-simple-heading about-simple-heading--vision">{visionTitle}</h3>
                <p className="about-simple-text">{visionBody}</p>
              </div>
              <div className="about-simple-piece">
                <h3 className="about-simple-heading">Core values</h3>
                <ul className="about-values-list">
                  {pillars.map((p) => (
                    <li key={p.id}>{p.title}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
