'use client';

import { Mail } from 'lucide-react';
import type { Leadership as LeadershipData } from '@/lib/api';

export function Leadership({ data }: { data?: LeadershipData | null } = {}) {
  const eyebrow = data?.sectionEyebrow?.trim() || 'Our Leadership';
  const sectionTitle = data?.sectionTitle?.trim() || 'Meet the';
  const sectionHighlight = data?.sectionTitleHighlight?.trim() || 'Founder & CEO';
  const roleLabel = data?.eyebrow?.trim() || 'Founder & Chief Executive Officer';
  const name = data?.name?.trim() || 'Elizabeth';
  const nameHighlight = data?.nameHighlight?.trim() || 'Maginga Thobias';
  const photoUrl = data?.photoUrl?.trim() || '/ceo.png';
  const photoAlt = data?.photoAlt?.trim() || `${name} ${nameHighlight} – CEO WeCare Foundation`;
  const badgeTitle = 'WeCare\nFoundation';
  const badgeRole = 'CEO & Founder';
  const paragraphs = data?.paragraphs?.length ? data.paragraphs : [
    "Elizabeth Maginga Thobias is the visionary founder and CEO of WeCare Foundation. She established WeCare in 2022 with a singular mission: to ensure every child in Tanzania — regardless of their family's economic circumstances — has access to quality early childhood development, care, and learning.",
    "Under her leadership, WeCare has grown from a community initiative in Mbeya into a nationally recognised ECD organisation operating across Mbeya and Mara regions, partnering with the Government of Tanzania, international organisations, and local communities to deliver sustainable impact for children and families.",
    "Elizabeth leads WeCare's four core programs: Early Childhood Development, Quality Early Learning, Child Care in Public Spaces, and Early Life Skills Training — reaching over 5,000 parents and 800+ children across Tanzania.",
  ];
  const email = data?.email?.trim() || 'Wecarefoundation025@gmail.com';

  return (
    <section id="leadership">
      <div className="container">
        <div className="sh rv" style={{ marginBottom: 56 }}>
          <p className="ey ct">{eyebrow}</p>
          <h2>{sectionTitle} <span>{sectionHighlight}</span></h2>
        </div>
        <div className="ldr rv d1">
          <div className="ldr-photo">
            <img src={photoUrl} alt={photoAlt} />
            <div className="ldr-badge">
              <strong>{badgeTitle.replace('\n', '\n')}</strong>
              <small>{badgeRole}</small>
            </div>
          </div>
          <div className="ldr-content">
            <p className="ey">{roleLabel}</p>
            <h2>{name} <span>{nameHighlight}</span></h2>
            {paragraphs.map((p, i) => <p key={i}>{p}</p>)}
            <a href={`mailto:${email}`} className="ldr-email">
              <Mail className="ldr-email-ico" size={16} aria-hidden />
              {email}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
