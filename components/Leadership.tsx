'use client';

import Image from 'next/image';
import { Linkedin, Mail } from 'lucide-react';
import type { Leadership as LeadershipData } from '@/lib/api';

const DEFAULT_QUOTE =
  "Elizabeth Maginga Thobias founded WeCare Foundation in 2022 to ensure every child in Tanzania has access to quality early childhood development, care, and learning - working with communities and partners across Mbeya and Mara.";

export function Leadership({ data }: { data?: LeadershipData | null } = {}) {
  const heading =
    [data?.sectionTitle?.trim(), data?.sectionTitleHighlight?.trim()].filter(Boolean).join(' ') ||
    'Message from the CEO';
  const roleLabel = data?.eyebrow?.trim() || 'Founder & Chief Executive Officer';
  const name = data?.name?.trim() || 'Elizabeth';
  const nameHighlight = data?.nameHighlight?.trim() || 'Maginga Thobias';
  const photoUrl = data?.photoUrl?.trim() || '/ceo.png';
  const photoAlt = data?.photoAlt?.trim() || `${name} ${nameHighlight} – CEO, WeCare Foundation`;
  const quote = data?.paragraphs?.[1]?.trim() || DEFAULT_QUOTE;
  const email = data?.email?.trim() || 'Wecarefoundation025@gmail.com';

  return (
    <section id="leadership" className="ceo">
      <div className="ceo-pattern" />
      <div className="ceo-inner">
        <div className="ceo-header rv">
          <p className="eyebrow center">Leadership</p>
          <h2 id="ceo-heading" className="section-title">
            {heading}
          </h2>
        </div>
        <div className="ceo-card rv d1">
          <div className="ceo-photo-wrap">
            <div className="ceo-photo">
              <Image
                src={photoUrl}
                alt={photoAlt}
                fill
                sizes="(max-width: 1024px) 160px, 200px"
                className="object-cover"
                unoptimized={photoUrl.startsWith('http')}
              />
            </div>
            <div className="ceo-socials" aria-hidden>
              <span className="ceo-social-btn">
                <Linkedin size={13} />
              </span>
              <span className="ceo-social-btn">
                <Mail size={13} />
              </span>
            </div>
          </div>
          <div className="ceo-body">
            <p className="ceo-role">{roleLabel}</p>
            <p className="ceo-name">
              <span className="ceo-name-main">{name}</span>{' '}
              <span className="ceo-name-highlight">{nameHighlight}</span>
            </p>
            <p className="ceo-quote">&ldquo;{quote}&rdquo;</p>
            <a href={`mailto:${email}`} className="ceo-link">
              <Mail className="ceo-email-ico" size={15} aria-hidden />
              Get in touch with Elizabeth →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
