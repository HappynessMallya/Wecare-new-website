import { notFound } from 'next/navigation';
import { getProgramsPublic } from '@/lib/public-api';

const TAG_CLASS: Record<string, string> = { t1: 't1', t2: 't2', t3: 't3', t4: 't4' };

type ProgramDetailsContent = {
  problem: string;
  activities: string[];
  targetCommunities: string[];
  impactNumbers: Array<{ value: string; label: string }>;
  partners: string[];
  photos: string[];
  videos: Array<{ label: string; href: string }>;
  testimonials: Array<{ quote: string; name: string; role: string }>;
};

const DETAILS_BY_KEY: Record<string, ProgramDetailsContent> = {
  ecd: {
    problem:
      'Many children miss critical support in their first five years, including nutrition, responsive caregiving, and safe early stimulation. This delays school readiness and healthy development.',
    activities: [
      'Parent clinic sessions during pregnancy and postnatal period',
      'Home and community ECD health promotion with caregivers',
      'Digital awareness campaigns through social media channels',
      'Practical sessions on responsive caregiving, child safety, and nutrition',
    ],
    targetCommunities: [
      'Pregnant women and partners',
      'Caregivers of children aged 0-5',
      'Low-income households in Mbeya and Mara',
    ],
    impactNumbers: [
      { value: '5,000+', label: 'Parents and caregivers reached' },
      { value: '2', label: 'Core regions covered (Mbeya and Mara)' },
      { value: '0-5', label: 'Critical child age group supported' },
    ],
    partners: ['Local government health teams', 'Community health workers', 'Primary care facilities', 'Parent groups'],
    photos: ['/parentclinic.jpg', '/parent-clinic.jpg', '/kids.jpg'],
    videos: [{ label: 'Digital health promotion explainer', href: '/programs/ecd' }],
    testimonials: [
      {
        quote: 'The parent sessions changed how we feed and care for our baby at home.',
        name: 'Parent participant',
        role: 'Mbeya',
      },
    ],
  },
  'quality-early-childhood-education': {
    problem:
      'Many children enter primary school without foundational learning readiness due to limited access to quality early childhood education and structured daycare support.',
    activities: [
      'Daycare and school readiness sessions for ages 1-5',
      'Early learning tools and classroom activity design',
      'Parent training to reinforce learning at home',
      'Community education on the value of early childhood learning',
    ],
    targetCommunities: ['Children aged 1-5', 'Parents and caregivers', 'Schools and community daycare centers'],
    impactNumbers: [
      { value: '800+', label: 'Children supported' },
      { value: '2', label: 'Model center regions (Mbeya and Mara)' },
      { value: '1-5', label: 'Age group served' },
    ],
    partners: ['Community schools', 'Teacher mentors', 'Parent committees', 'Local education officers'],
    photos: ['/kids.jpg', '/kids-at-work.jpg', '/parentclinic.jpg'],
    videos: [{ label: 'School readiness activity highlight', href: '/programs/quality-early-childhood-education' }],
    testimonials: [
      {
        quote: 'Children joining primary school are more confident and better prepared to learn.',
        name: 'School teacher',
        role: 'Mara',
      },
    ],
  },
  'child-care-in-public-spaces': {
    problem:
      'Working parents, especially women in markets, often lack safe child care options while earning income, exposing children to unsafe environments and lost early learning opportunities.',
    activities: [
      'Community and stakeholder mobilization in public markets',
      'Technical support to establish market-based child care centers',
      'Governance setup for community ownership and management',
      'Child protection and daily care routines in public spaces',
    ],
    targetCommunities: ['Women traders and market families', 'Children in public market settings', 'Market committees and local authorities'],
    impactNumbers: [
      { value: '1+', label: 'Market centers initiated' },
      { value: '2025', label: 'Flagship market center year' },
      { value: '100%', label: 'Community ownership model' },
    ],
    partners: ['Government of Tanzania local offices', 'Market leadership committees', 'Community volunteers', 'Civil society partners'],
    photos: ['/kids-at-work.jpg', '/parentclinic.jpg', '/kids.jpg'],
    videos: [{ label: 'Public market child care model overview', href: '/programs/child-care-in-public-spaces' }],
    testimonials: [
      {
        quote: 'Now I can run my business knowing my child is safe and learning nearby.',
        name: 'Market vendor',
        role: 'Mwanjelwa Market',
      },
    ],
  },
  'early-life-skills-training': {
    problem:
      'Children often miss age-appropriate life skills development linked to milestones, limiting confidence, social-emotional growth, and practical capability.',
    activities: [
      'Developmental milestone assessments with parents',
      'Social Emotional Learning club sessions',
      'Arts and Science club activities',
      'School and holiday program integration by age bands',
    ],
    targetCommunities: ['Children across school and holiday cohorts', 'Parents and caregivers', 'Schools and youth learning spaces'],
    impactNumbers: [
      { value: '210+', label: 'Children trained' },
      { value: '3', label: 'Academy clubs (SEL, Arts, Science)' },
      { value: '4', label: 'Age groups in holiday programs' },
    ],
    partners: ['Parents and caregivers', 'School program teams', 'Community mentors', 'Local youth facilitators'],
    photos: ['/life-skills.jpg', '/kids-at-work.jpg', '/kids.jpg'],
    videos: [{ label: 'Academy clubs in action', href: '/programs/early-life-skills-training' }],
    testimonials: [
      {
        quote: 'My child has grown in confidence and teamwork through the clubs.',
        name: 'Parent',
        role: 'Tarime',
      },
    ],
  },
};

function getProgramContent(id: string, tagType: string): ProgramDetailsContent {
  const byId = DETAILS_BY_KEY[id];
  if (byId) return byId;
  if (tagType === 't1') return DETAILS_BY_KEY.ecd;
  if (tagType === 't2') return DETAILS_BY_KEY['quality-early-childhood-education'];
  if (tagType === 't3') return DETAILS_BY_KEY['child-care-in-public-spaces'];
  return DETAILS_BY_KEY['early-life-skills-training'];
}

export default async function ProgramDetailPage({ params }: { params: { id: string } }) {
  const programs = await getProgramsPublic();
  const program = programs?.find((p) => p.id === params.id);

  if (!program) return notFound();
  const content = getProgramContent(program.id, program.tagType);

  return (
    <main id="main-content">
      <section id="program-detail">
        <div className="container">
          <div className="sh">
            <p className="ey ct">Programs</p>
            <h2>{program.title}</h2>
            <p>{program.subtitle}</p>
          </div>

          <div className="program-detail-hero">
            <div className="pimg program-detail-cover">
              {program.imageUrl ? (
                <img src={program.imageUrl} alt={program.imageAlt || program.title} loading="lazy" />
              ) : (
                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ color: 'var(--g400)', fontWeight: 700 }}>No image</span>
                </div>
              )}
              <div className="pov" />
              {program.tagLabel && <span className={`ptag ${TAG_CLASS[program.tagType] ?? 't1'}`}>{program.tagLabel}</span>}
            </div>
            <div className="program-detail-summary">
              {program.regionBadge && <span className="rg-badge">📍 {program.regionBadge}</span>}
              <h3>{program.title}</h3>
              {program.subtitle && <span className="psub">{program.subtitle}</span>}
              {program.body ? <p dangerouslySetInnerHTML={{ __html: program.body }} /> : null}
            </div>
          </div>

          <div className="program-detail-grid">
            <article className="program-section-card">
              <h4>Problem statement</h4>
              <p>{content.problem}</p>
            </article>
            <article className="program-section-card">
              <h4>Program activities</h4>
              <ul className="pout">
                {content.activities.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
            <article className="program-section-card">
              <h4>Target communities</h4>
              <ul className="pout">
                {content.targetCommunities.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
            <article className="program-section-card">
              <h4>Impact</h4>
              <div className="program-impact-numbers">
                {content.impactNumbers.map((n) => (
                  <div key={n.label} className="program-impact-item">
                    <strong>{n.value}</strong>
                    <small>{n.label}</small>
                  </div>
                ))}
              </div>
              {program.outcomes?.filter(Boolean).length ? (
                <ul className="pout" style={{ marginTop: 16 }}>
                  {program.outcomes.filter(Boolean).map((o) => (
                    <li key={o}>{o}</li>
                  ))}
                </ul>
              ) : null}
            </article>
            <article className="program-section-card">
              <h4>Partner organizations</h4>
              <ul className="pout">
                {content.partners.map((org) => (
                  <li key={org}>{org}</li>
                ))}
              </ul>
            </article>
            <article className="program-section-card">
              <h4>Photos and videos</h4>
              <div className="program-media-grid">
                {content.photos.map((src, i) => (
                  <img key={`${src}-${i}`} src={src} alt={`${program.title} evidence ${i + 1}`} loading="lazy" />
                ))}
              </div>
              <ul className="program-video-links">
                {content.videos.map((v) => (
                  <li key={v.label}>
                    <a href={v.href}>{v.label}</a>
                  </li>
                ))}
              </ul>
            </article>
            <article className="program-section-card program-testimonials">
              <h4>Testimonials</h4>
              <div className="program-testimonials-list">
                {content.testimonials.map((t) => (
                  <blockquote key={`${t.name}-${t.role}`}>
                    <p>&ldquo;{t.quote}&rdquo;</p>
                    <footer>
                      <strong>{t.name}</strong>
                      <small>{t.role}</small>
                    </footer>
                  </blockquote>
                ))}
              </div>
            </article>
          </div>

          <div className="pfoot program-detail-footer">
            <div>
              {program.footerStat ? <strong>{program.footerStat}</strong> : null}
              {program.footerStatLabel ? <small>{program.footerStatLabel}</small> : null}
            </div>
            <a href={program.ctaHref || '/#contact'} className="plink">
              {program.ctaLabel || 'Learn more'} →
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

