'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { MapPin, Baby, Users, ArrowRight, Sprout, ChevronLeft, ChevronRight } from 'lucide-react';
import type { ProgramDetail } from '@/lib/api';

type Detail = {
  heroTitle: string;
  heroSub: string;
  chips: string[];
  challenge: string[];
  activities: string[];
  impactNumbers: Array<{ value: string; label: string; description: string }>;
  testimonials: Array<{ quote: string; name: string; role: string }>;
  partners: string[];
  photos: string[];
};

const FALLBACK_BY_ID: Record<string, Detail> = {
  ecd: {
    heroTitle: 'Early Childhood Development',
    heroSub: "Holistic support for Tanzania's youngest children aged 0–8, ensuring they reach their developmental potential through family engagement and community-led solutions.",
    chips: ['Mbeya & Mara', 'Ages 0–8', '5,000+ families'],
    challenge: ['In Tanzania, many children under 8 lack access to stimulating, safe, and supportive environments during their most critical years.', 'WeCare Foundation works directly with families in Mbeya and Mara — training caregivers, supporting community-run spaces, and connecting families to services.'],
    activities: ['Parent clinic sessions during pregnancy and postnatal period', 'Home and community ECD health promotion', 'Digital awareness campaigns through social media', 'Practical sessions on responsive caregiving and nutrition'],
    impactNumbers: [
      { value: '5,000+', label: 'Parents & Caregivers Reached', description: 'Through parent clinic sessions, home visits, and digital health promotion across Mbeya and Mara regions.' },
      { value: '2', label: 'Regions Covered', description: 'Active ECD programmes in Mbeya and Mara with community health workers and government partners.' },
      { value: '0–5', label: 'Critical Age Group', description: 'Targeting the most critical developmental window — pregnancy through the first five years.' },
    ],
    testimonials: [
      { quote: 'The parent sessions changed how we feed and care for our baby at home.', name: 'Parent participant', role: 'Mbeya' },
      { quote: 'We learned that talking and playing with our children is just as important as feeding them.', name: 'Caregiver', role: 'Mara Region' },
      { quote: 'The community health workers showed us practical techniques for our baby.', name: 'Young mother', role: 'Mbeya' },
    ],
    partners: ['Government of Tanzania', 'Community Health Workers', 'Primary Care Facilities', 'Parent Groups', 'TECDEN'],
    photos: ['/parentclinic.jpg', '/parent-clinic.jpg', '/kids.jpg', '/kids-planting.jpg', '/kids-at-work.jpg'],
  },
  'quality-early-childhood-education': {
    heroTitle: 'Quality Early Childhood Education',
    heroSub: 'Structured, quality early learning building school readiness and lifelong learning foundations for children aged 1–5.',
    chips: ['Mbeya & Mara', 'Ages 1–5', '800+ children'],
    challenge: ['Many children enter primary school without foundational readiness.', 'WeCare supports communities with practical early learning systems.'],
    activities: ['Daycare and school readiness sessions', 'Early learning tools and classroom design', 'Parent training to reinforce learning at home', 'Community education on early childhood learning'],
    impactNumbers: [
      { value: '800+', label: 'Children Supported', description: 'Enrolled in structured daycare and pre-school readiness programmes across two model centres.' },
      { value: '2', label: 'Model Centres', description: 'Established in Mbeya and Mara with integrated developmental tracking.' },
      { value: '1–5', label: 'Age Group Served', description: 'Children in the critical pre-school window receiving structured learning support.' },
    ],
    testimonials: [
      { quote: 'Children joining primary school are more confident and better prepared.', name: 'School teacher', role: 'Mara' },
      { quote: 'My daughter recognizes letters and numbers before starting school.', name: 'Parent', role: 'Mbeya' },
    ],
    partners: ['Community Schools', 'Teacher Mentors', 'Parent Committees', 'Local Education Officers'],
    photos: ['/kids.jpg', '/kids-at-work.jpg', '/parentclinic.jpg', '/kids-planting.jpg'],
  },
  'child-care-in-public-spaces': {
    heroTitle: 'Child Care in Public Spaces',
    heroSub: 'Safe, community-owned child care models in market spaces so parents can work while children stay protected.',
    chips: ['Mwanjelwa, Mbeya', 'Public Markets', 'Community-owned'],
    challenge: ['Working parents in markets often lack safe child care options.', 'WeCare collaborates with authorities to establish care spaces in public areas.'],
    activities: ['Community mobilization in public markets', 'Technical support for market-based centres', 'Governance setup for community ownership', 'Child protection routines in public spaces'],
    impactNumbers: [
      { value: '1+', label: 'Market Centres', description: 'First centre at Mwanjelwa Market, Mbeya — fully community-owned and managed.' },
      { value: '2025', label: 'Flagship Year', description: 'Inaugural market-based child care centre launched with full stakeholder buy-in.' },
      { value: '100%', label: 'Community Owned', description: 'Centres governed by the community for long-term sustainability.' },
    ],
    testimonials: [
      { quote: 'Now I can run my business knowing my child is safe nearby.', name: 'Market vendor', role: 'Mwanjelwa Market' },
      { quote: 'We no longer worry about our children when we trade.', name: 'Women trader group', role: 'Mbeya' },
    ],
    partners: ['Government of Tanzania', 'Market Committees', 'Community Volunteers', 'Civil Society Partners'],
    photos: ['/kids-at-work.jpg', '/parentclinic.jpg', '/kids.jpg', '/parent-clinic.jpg'],
  },
  'early-life-skills-training': {
    heroTitle: 'Early Life Skills Training',
    heroSub: 'Age-appropriate life skills pathways strengthening social-emotional growth, creativity, and confidence.',
    chips: ['School & Holiday Programs', 'Ages 3+', '210+ children'],
    challenge: ['Children often miss age-appropriate life skills development.', 'WeCare runs club-based pathways in schools and holiday programs.'],
    activities: ['Developmental milestone assessments', 'Social Emotional Learning sessions', 'Arts and Science club activities', 'School and holiday program integration'],
    impactNumbers: [
      { value: '210+', label: 'Children Trained', description: 'Across SEL, Arts, and Science academy clubs in school and holiday programmes.' },
      { value: '3', label: 'Academy Clubs', description: 'Social Emotional Learning, Arts, and Science — each for age-appropriate skill building.' },
      { value: '4', label: 'Age Groups', description: 'Structured pathways for ages 3–5, 6–9, 10–12, and 15+ with milestone progression.' },
    ],
    testimonials: [
      { quote: 'My child has grown in confidence and teamwork through the clubs.', name: 'Parent', role: 'Tarime' },
      { quote: 'The holiday programmes gave my children something meaningful to learn.', name: 'Mother of three', role: 'Mbeya' },
    ],
    partners: ['Parents & Caregivers', 'School Program Teams', 'Community Mentors', 'Local Youth Facilitators'],
    photos: ['/life-skills.jpg', '/kids-at-work.jpg', '/kids.jpg', '/sports.jpg', '/kids-planting.jpg'],
  },
};

function resolve(detail: ProgramDetail | null, key: string): Detail {
  const fb = FALLBACK_BY_ID[key] ?? FALLBACK_BY_ID.ecd;
  if (!detail) return fb;
  return {
    heroTitle: detail.heroTitle?.trim() || fb.heroTitle,
    heroSub: detail.heroSubtitle?.trim() || fb.heroSub,
    chips: detail.chips?.length ? detail.chips : fb.chips,
    challenge: detail.challengeParagraphs?.length ? detail.challengeParagraphs : fb.challenge,
    activities: detail.activities?.length ? detail.activities.flatMap((a) => a.items) : fb.activities,
    impactNumbers: detail.impactNumbers?.length ? detail.impactNumbers.map((n, i) => ({ ...n, description: fb.impactNumbers[i]?.description || '' })) : fb.impactNumbers,
    testimonials: detail.testimonials?.length ? detail.testimonials : fb.testimonials,
    partners: detail.partners?.length ? detail.partners : fb.partners,
    photos: detail.galleryImages?.length ? detail.galleryImages : fb.photos,
  };
}

export function ProgramPageClient({ programId, detail, whatsappUrl }: { programId: string; detail: ProgramDetail | null; whatsappUrl: string }) {
  const d = resolve(detail, programId);
  const [tIdx, setTIdx] = useState(0);
  const photoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (d.testimonials.length <= 1) return;
    const t = setInterval(() => setTIdx((i) => (i + 1) % d.testimonials.length), 6000);
    return () => clearInterval(t);
  }, [d.testimonials.length]);

  const scrollPhotos = (dir: number) => {
    photoRef.current?.scrollBy({ left: dir * 340, behavior: 'smooth' });
  };

  const t = d.testimonials[tIdx] ?? d.testimonials[0];

  return (
    <main id="main-content">
      {/* HERO */}
      <section className="prog-hero">
        <div className="prog-hero-bg" />
        <div className="prog-hero-overlay" />
        <div className="prog-hero-content">
          <div className="breadcrumb">
            <a href="/">Home</a><span className="breadcrumb-sep">/</span>
            <a href="/#programs">Programs</a><span className="breadcrumb-sep">/</span>
            <span style={{ color: 'rgba(255,255,255,0.85)' }}>{d.heroTitle}</span>
          </div>
          <div className="prog-tag"><Sprout size={14} /> Program</div>
          <h1 className="prog-hero-title">
            {d.heroTitle.split(' ').slice(0, -1).join(' ')}{' '}
            <span className="accent">{d.heroTitle.split(' ').slice(-1)}</span>
          </h1>
          <p className="prog-hero-sub">{d.heroSub}</p>
          <div className="prog-meta">
            {d.chips.map((chip, i) => (
              <div key={chip} className="prog-meta-chip">
                {i === 0 && <MapPin size={14} />}{i === 1 && <Baby size={14} />}{i === 2 && <Users size={14} />}
                {chip}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CHALLENGE */}
      <div className="prog-section-white">
        <div className="prog-content-wrap">
          <section className="prog-section reveal">
            <div className="body-eyebrow">The Challenge</div>
            <h2 className="body-title">Why this program exists</h2>
            {d.challenge.map((p) => <p key={p} className="body-text">{p}</p>)}
          </section>
        </div>
      </div>

      {/* IMPACT STATS (detailed, after challenge) */}
      <div className="prog-section-off">
        <div className="prog-content-wrap">
          <section className="prog-section reveal">
            <div className="body-eyebrow">Our Impact</div>
            <h2 className="body-title">Program Results</h2>
            <div className="prog-stats-grid">
              {d.impactNumbers.map((n) => (
                <div key={n.label} className="prog-stat-card">
                  <div className="prog-stat-num">{n.value.replace('+', '')}<em>{n.value.includes('+') ? '+' : ''}</em></div>
                  <div className="prog-stat-label">{n.label}</div>
                  <p className="prog-stat-desc">{n.description}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* PHOTOS (scrollable) */}
      <div className="prog-photos-section">
        <div className="prog-photos-header">
          <div>
            <div className="body-eyebrow">In the Field</div>
            <h2 className="body-title" style={{ marginBottom: 0 }}>Program Gallery</h2>
          </div>
          <div className="prog-photos-arrows">
            <button type="button" className="prog-photos-arrow" onClick={() => scrollPhotos(-1)} aria-label="Scroll left"><ChevronLeft size={20} /></button>
            <button type="button" className="prog-photos-arrow" onClick={() => scrollPhotos(1)} aria-label="Scroll right"><ChevronRight size={20} /></button>
          </div>
        </div>
        <div className="prog-photos-scroll" ref={photoRef}>
          {d.photos.map((src, i) => (
            <div key={i} className="prog-photos-item">
              <Image src={src} alt={`${d.heroTitle} ${i + 1}`} fill className="object-cover" sizes="(max-width: 768px) 80vw, 320px" unoptimized={src.startsWith('http')} />
            </div>
          ))}
        </div>
      </div>

      {/* TESTIMONIAL SLIDER */}
      <div className="prog-section-accent">
        <div className="prog-content-wrap">
          <section className="prog-testimonial reveal">
            <div className="testimonial-avatar">{t.name.charAt(0).toUpperCase()}</div>
            <blockquote className="testimonial-quote">&ldquo;{t.quote}&rdquo;</blockquote>
            <div className="testimonial-name">{t.name}</div>
            <div className="testimonial-role">{t.role}</div>
            {d.testimonials.length > 1 && (
              <div className="testimonial-dots">
                {d.testimonials.map((_, i) => (
                  <button key={i} type="button" className={`testimonial-dot${i === tIdx ? ' active' : ''}`} onClick={() => setTIdx(i)} aria-label={`Testimonial ${i + 1}`} />
                ))}
              </div>
            )}
          </section>
        </div>
      </div>

      {/* ACTIVITIES */}
      <div className="prog-section-white">
        <div className="prog-content-wrap">
          <section className="prog-section reveal">
            <div className="body-eyebrow">What We Do</div>
            <h2 className="body-title">Program Activities</h2>
            <ul className="prog-activities-list">
              {d.activities.map((a) => <li key={a}>{a}</li>)}
            </ul>
          </section>
        </div>
      </div>

      {/* PARTNERS (ticker style) */}
      <div className="prog-section-off">
        <div style={{ maxWidth: 'min(var(--container-max,1380px), 100%)', margin: '0 auto', padding: '64px clamp(16px, 4vw, 60px)' }}>
          <section className="prog-section reveal" style={{ textAlign: 'center' }}>
            <div className="body-eyebrow" style={{ justifyContent: 'center' }}>Who We Work With</div>
            <h2 className="body-title">Program Partners</h2>
            <div className="ticker-wrap" aria-hidden>
              <div className="ticker-fade-l" style={{ background: 'linear-gradient(to right, var(--off, #f9f8f6), transparent)' }} />
              <div className="ticker-fade-r" style={{ background: 'linear-gradient(to left, var(--off, #f9f8f6), transparent)' }} />
              <div className="ticker-track">
                {[...d.partners, ...d.partners, ...d.partners].map((p, i) => (
                  <div key={`${p}-${i}`} className="partner-chip"><span className="partner-dot" />{p}</div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* SUPPORT CTA */}
      <div className="prog-section-blue">
        <div className="prog-content-wrap">
          <section className="prog-support-cta-full reveal">
            <h3>Support this program</h3>
            <p>Your support directly funds home visits, caregiver training, and community ECD hubs across the regions we serve.</p>
            <div className="prog-support-btns">
              <a className="prog-support-btn primary" href={whatsappUrl} target="_blank" rel="noopener noreferrer">Donate to This Program</a>
              <a className="prog-support-btn ghost" href={whatsappUrl} target="_blank" rel="noopener noreferrer">Become a Partner <ArrowRight size={14} /></a>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
