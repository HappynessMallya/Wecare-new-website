'use client';

import Image from 'next/image';
import { Mail } from 'lucide-react';
import type { Leadership as LeadershipData } from '@/lib/api';

const DEFAULT_INTRO =
  "Elizabeth Maginga Thobias founded WeCare Foundation in 2022 to ensure every child in Tanzania has access to quality early childhood development, care, and learning — working with communities and partners across Mbeya and Mara.";

export function Leadership({ data }: { data?: LeadershipData | null } = {}) {
  const heading =
    [data?.sectionTitle?.trim(), data?.sectionTitleHighlight?.trim()].filter(Boolean).join(' ') ||
    'Message from the CEO';
  const roleLabel = data?.eyebrow?.trim() || 'Founder & Chief Executive Officer';
  const name = data?.name?.trim() || 'Elizabeth';
  const nameHighlight = data?.nameHighlight?.trim() || 'Maginga Thobias';
  const photoUrl = data?.photoUrl?.trim() || '/ceo.png';
  const photoAlt = data?.photoAlt?.trim() || `${name} ${nameHighlight} – CEO, WeCare Foundation`;
  const message =
    data?.paragraphs?.[0]?.trim() ||
    DEFAULT_INTRO;
  const email = data?.email?.trim() || 'Wecarefoundation025@gmail.com';

  return (
    <section id="leadership" className="ceo-section" aria-labelledby="ceo-heading">
      <div className="container">
        <h2 id="ceo-heading" className="ceo-heading">
          {heading}
        </h2>
        <div className="ceo-card rv d1">
          <div className="ceo-photo-wrap">
            <Image
              src={photoUrl}
              alt={photoAlt}
              fill
              sizes="(max-width: 1024px) 160px, 200px"
              className="ceo-photo"
              unoptimized={photoUrl.startsWith('http')}
            />
          </div>
          <div className="ceo-body">
            <p className="ceo-role">{roleLabel}</p>
            <p className="ceo-name">
              <span className="ceo-name-main">{name}</span>{' '}
              <span className="ceo-name-highlight">{nameHighlight}</span>
            </p>
            <p className="ceo-message">{message}</p>
            <a href={`mailto:${email}`} className="ceo-email">
              <Mail className="ceo-email-ico" size={15} aria-hidden />
              {email}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
