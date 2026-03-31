'use client';

import Image from 'next/image';
import { Linkedin, Mail } from 'lucide-react';
import type { Leadership as LeadershipData } from '@/lib/api';

const DEFAULT_QUOTE =
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
  const quote = data?.paragraphs?.[1]?.trim() || DEFAULT_QUOTE;
  const email = data?.email?.trim() || 'info@wecare.or.tz';

  return (
    <section id="leadership" className="ceo">
      <div className="ceo-pattern" />
      <div className="ceo-inner">
        <div className="ceo-header reveal">
          <div className="eyebrow center">Leadership</div>
          <h2 id="ceo-heading" className="section-title">{heading}</h2>
        </div>
        <div className="ceo-card-lg reveal reveal-delay-1">
          <div className="ceo-photo-lg">
            <Image
              src={photoUrl}
              alt={photoAlt}
              fill
              sizes="(max-width: 768px) 100vw, 340px"
              className="object-cover"
              style={{ objectPosition: 'center 15%' }}
              unoptimized={photoUrl.startsWith('http')}
            />
            {/* badge removed per request */}
          </div>
          <div className="ceo-body-lg">
            <p className="ceo-role-lg">{roleLabel}</p>
            <h3 className="ceo-name-lg">
              {name} <span>{nameHighlight}</span>
            </h3>
            <blockquote className="ceo-quote-lg">
              &ldquo;{quote}&rdquo;
            </blockquote>
            <div className="ceo-actions">
              <a href={`mailto:${email}`} className="ceo-action-btn primary">
                <Mail size={16} aria-hidden /> Email Elizabeth
              </a>
              <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" className="ceo-action-btn secondary">
                <Linkedin size={16} aria-hidden /> LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
