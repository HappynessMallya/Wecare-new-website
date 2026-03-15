'use client';

import { useMemo } from 'react';
import Image from 'next/image';
import type { About, Settings } from '@/lib/api';

const PILLAR_CLASS: Record<string, string> = { r: 'r', b: 'b', a: 'a', o: 'o' };

export function HomeAbout({ data, settings }: { data?: About | null; settings?: Settings | null } = {}) {
  const mainImage = data?.mainImageUrl?.trim() || '/parentclinic.jpg';
  const secondaryImage = data?.secondaryImageUrl?.trim() || '/kids-at-work.jpg';
  const bgLogoUrl = settings?.logoUrl?.trim() || '/logo.png';
  const siteName = settings?.siteName?.trim() || 'WeCare Foundation';
  const mainImageAlt = `${siteName} programme — community and children`;
  const secondaryImageAlt = `Child at ${siteName} early learning programme`;
  const regionsNumber = data?.regionsBadgeNumber?.trim() || '2';
  const regionsLabel = data?.regionsBadgeLabel?.trim() || 'Regions\nMbeya & Mara';
  const pillars = useMemo(() => data?.pillars?.length ? data.pillars : [
    { id: '1', title: 'Collaborative Approach', description: 'We engage community and stakeholders, governments, policy makers, and civil society for sustainable impact.', iconEmoji: '🤝', colorKey: 'r' as const },
    { id: '2', title: 'Community-Led', description: 'Programs are designed with communities — ensuring solutions are contextual, trusted, and lasting.', iconEmoji: '🏘️', colorKey: 'b' as const },
    { id: '3', title: 'Parent-Centered', description: 'Working parents and caregivers are at the heart of everything — we provide sustainable child care solutions.', iconEmoji: '👨‍👩‍👧', colorKey: 'a' as const },
  ], [data?.pillars]);
  const eyebrow = data?.eyebrow?.trim() || 'Who We Are';
  const title = data?.title?.trim() || "Tanzania's Community-Led ECD Foundation";
  const titleHighlight = data?.titleHighlight?.trim() || 'ECD Foundation';
  const tagline = data?.tagline?.trim() || "Enriching Children's Lives — One Family at a Time";
  const intro1 = data?.introParagraph1?.trim() || "WeCare Foundation (WeF) is a Non-Governmental Organization founded in 2022 in Tanzania. WeCare partners with the Government of Tanzania and national ECD stakeholders to implement programs for quality early childhood development and learning.";
  const intro2 = data?.introParagraph2?.trim() || "Our focus areas: Child good health, Adequate nutrition, Responsive caregiving, Child security and safety, and Opportunities for quality early learning. We are community-led, delivering impact through community and stakeholder engagement. WeCare also provides sustainable child care solutions that support working parents.";
  const missionTitle = data?.missionTitle?.trim() || 'Our Mission';
  const missionBody = data?.missionBody?.trim() || "To contribute towards attainment of quality early childhood development, learning, and health outcomes through innovative solutions, community and family engagement.";
  const visionTitle = data?.visionTitle?.trim() || 'Our Vision';
  const visionBody = data?.visionBody?.trim() || "To provide access to the best start of life for all children in early development, learning, and health across Tanzania.";

  return (
    <section id="about">
      <div className="about-bg-logo" aria-hidden>
        <Image src={bgLogoUrl} alt="" width={560} height={560} className="about-bg-logo-img" unoptimized={bgLogoUrl.startsWith('http')} />
      </div>
      <div className="container">
        <div className="ag">
          <div className="ag-left">
            <div className="aphotos rv">
              <div className="apm">
                <Image
                  src={mainImage}
                  alt={mainImageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  unoptimized={mainImage.startsWith('http')}
                />
              </div>
              <div className="apt">
                <Image
                  src={secondaryImage}
                  alt={secondaryImageAlt}
                  width={180}
                  height={180}
                  className="object-cover w-full h-full"
                  unoptimized={secondaryImage.startsWith('http')}
                />
              </div>
              <div className="apb">
                <span className="n">{regionsNumber}</span>
                <span className="s">
                  {regionsLabel.split('\n').map((line, i) => (
                    <span key={i}>{i > 0 && <br />}{line}</span>
                  ))}
                </span>
              </div>
            </div>
            <div className="about-pillars">
              {pillars.map((pill) => (
                <div key={pill.id} className="pill">
                  <div className={`pill-ico ${PILLAR_CLASS[pill.colorKey] ?? 'r'}`}>{pill.iconEmoji}</div>
                  <div className="pill-txt">
                    <strong>{pill.title}</strong>
                    <small>{pill.description}</small>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="ac rv d1">
            <p className="ey">{eyebrow}</p>
            <h2>
              {title.replace(titleHighlight, '').trim()}{' '}
              <span>{titleHighlight}</span>
            </h2>
            <span className="acit">{tagline}</span>
            <p>{intro1}</p>
            <p>{intro2}</p>
            <div className="mvcards">
              <div className="mvc">
                <h4>{missionTitle}</h4>
                <p>{missionBody}</p>
              </div>
              <div className="mvc v">
                <h4>{visionTitle}</h4>
                <p>{visionBody}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
