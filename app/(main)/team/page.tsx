import { getLeadershipPublic, getTeamMembersPublic, getTeamSectionPublic } from '@/lib/public-api';
import Image from 'next/image';
import { WHATSAPP_URL } from '@/lib/constants';
import type { TeamMember, TeamPageSection } from '@/lib/api';

const SECTION_FALLBACK: TeamPageSection = {
  heroEyebrow: 'The People Behind the Mission',
  heroTitle: 'Meet Our',
  heroTitleHighlight: 'Team',
  heroSubtitle: "Dedicated leaders, educators, and community builders working together to give Tanzania's youngest children the foundation they deserve.",
  foundersEyebrow: 'Leadership',
  foundersTitle: 'Founder & Director',
  leadersEyebrow: 'On the Ground',
  leadersTitle: 'Programme Leaders',
  leadersSubtitle: "Our regional leaders work directly with communities, schools, and families to bring WeCare's programmes to life every day.",
  staffEyebrow: 'Our Team',
  staffTitle: 'Staff & Volunteers',
  joinEyebrow: 'Join Us',
  joinTitle: 'Passionate about',
  joinTitleHighlight: "children's futures?",
  joinSubtitle: "We're always looking for dedicated people to join WeCare as staff, volunteers, or partners. Get in touch and let's make a difference together.",
  joinPrimaryLabel: 'View Open Roles',
  joinPrimaryHref: WHATSAPP_URL,
  joinSecondaryLabel: 'Volunteer With Us',
  joinSecondaryHref: WHATSAPP_URL,
};

const TEAM_FALLBACK: TeamMember[] = [
  { id: 'leader-mbeya', name: 'Leader Name — Mbeya', role: 'School / Programme Leader', region: 'Mbeya Region', bio: "Leads WeCare's ECD school and community programmes across Mbeya region, managing local staff, caregiver training, and government relations with a hands-on, community-first approach.", photoUrl: '', photoAlt: '', email: '', linkedInUrl: '', category: 'programme_leader', order: 0 },
  { id: 'leader-tarime', name: 'Leader Name — Tarime', role: 'School / Programme Leader', region: 'Mara Region (Tarime)', bio: "Oversees WeCare's Tarime-based ECD programmes including school operations, Life Skills Training for children, and partnerships with local health facilities and ward offices.", photoUrl: '', photoAlt: '', email: '', linkedInUrl: '', category: 'programme_leader', order: 1 },
  { id: 'staff-1', name: 'Staff Member', role: 'Programme Officer', region: 'Mbeya', bio: "Coordinates daily programme activities, caregiver workshops, and community outreach across WeCare's Mbeya operations.", photoUrl: '', photoAlt: '', email: '', linkedInUrl: '', category: 'staff', order: 2 },
  { id: 'staff-2', name: 'Staff Member', role: 'Monitoring & Evaluation', region: 'Mara', bio: "Manages impact data collection, programme reporting, and learning documentation to demonstrate WeCare's evidence base to partners.", photoUrl: '', photoAlt: '', email: '', linkedInUrl: '', category: 'staff', order: 3 },
  { id: 'staff-3', name: 'Staff Member', role: 'Communications', region: 'Mbeya', bio: "Manages WeCare's community communications, social media presence, and storytelling to amplify programme impact across Tanzania.", photoUrl: '', photoAlt: '', email: '', linkedInUrl: '', category: 'staff', order: 4 },
];

function byCategory(members: TeamMember[], cat: TeamMember['category']) {
  return members.filter((m) => m.category === cat);
}

export default async function TeamPage() {
  const [leadership, teamMembers, teamSection] = await Promise.all([
    getLeadershipPublic(),
    getTeamMembersPublic(),
    getTeamSectionPublic(),
  ]);

  const s = teamSection ?? SECTION_FALLBACK;
  const members = teamMembers?.length ? teamMembers : TEAM_FALLBACK;
  const whatsappUrl = WHATSAPP_URL;

  const directorName = [leadership?.name?.trim(), leadership?.nameHighlight?.trim()].filter(Boolean).join(' ') || 'Elizabeth Maginga Thobias';
  const directorRole = leadership?.eyebrow?.trim() || 'Founder & Chief Executive Officer';
  const directorPhoto = leadership?.photoUrl?.trim() || '/ceo.png';
  const directorBio = leadership?.paragraphs?.length
    ? leadership.paragraphs
    : [
        "Elizabeth founded WeCare Foundation in 2022 after witnessing firsthand the developmental gaps facing Tanzania's youngest children. With a deep commitment to community-led change, she has built WeCare from the ground up — creating programs that reach over 5,000 families across Mbeya and Mara.",
        "Her approach centres on parent empowerment, community trust, and innovative solutions tailored to Tanzania's unique context.",
      ];
  const directorEmail = leadership?.email?.trim() || 'elizabeth@wecare.or.tz';

  const leaders = byCategory(members, 'programme_leader');
  const staffAndVolunteers = [...byCategory(members, 'staff'), ...byCategory(members, 'volunteer')];

  return (
    <main id="main-content">
      {/* HERO */}
      <section className="team-hero">
        <div className="team-hero-bg" />
        <div className="team-hero-pattern" />
        <div className="team-hero-blobs" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} />
        <div className="team-hero-inner">
          <div className="team-hero-eyebrow">{s.heroEyebrow}</div>
          <h1 className="team-hero-title">
            {s.heroTitle} <span className="accent">{s.heroTitleHighlight}</span>
          </h1>
          <p className="team-hero-sub">{s.heroSubtitle}</p>
        </div>
      </section>

      {/* FOUNDER & DIRECTOR */}
      <section className="team-section">
        <div className="team-inner">
          <div className="team-section-header reveal">
            <div className="eyebrow">{s.foundersEyebrow}</div>
            <h2 className="section-title">{s.foundersTitle}</h2>
          </div>
          <div className="leader-card reveal reveal-delay-1">
            <div className="leader-img-wrap">
              <div className="leader-img">
                <Image src={directorPhoto} alt={directorName} fill className="object-cover" unoptimized={directorPhoto.startsWith('http')} />
              </div>
              <div className="leader-badge">CEO &amp; Founder</div>
            </div>
            <div className="leader-content">
              <div className="leader-role">{directorRole}</div>
              <h2 className="leader-name">{directorName}</h2>
              {directorBio.map((p, i) => (
                <p key={i} className="leader-bio">{p}</p>
              ))}
              <div className="leader-divider" />
              <div className="leader-meta">
                <div className="leader-meta-row">
                  <div className="leader-meta-icon">📍</div>
                  <div><div className="leader-meta-label">Based in</div><div className="leader-meta-val">Mbeya, Tanzania</div></div>
                </div>
                <div className="leader-meta-row">
                  <div className="leader-meta-icon">🌍</div>
                  <div><div className="leader-meta-label">Focus Regions</div><div className="leader-meta-val">Mbeya &amp; Mara</div></div>
                </div>
                <div className="leader-meta-row">
                  <div className="leader-meta-icon">📅</div>
                  <div><div className="leader-meta-label">With WeCare Since</div><div className="leader-meta-val">2022 (Founder)</div></div>
                </div>
              </div>
              <div className="leader-links">
                <a className="leader-link-btn primary" href={`mailto:${directorEmail}`}>✉ Email Elizabeth</a>
                <a className="leader-link-btn secondary" href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">in LinkedIn</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROGRAMME LEADERS */}
      <section className="school-leaders">
        <div className="school-leaders-inner">
          <div className="team-section-header reveal">
            <div className="eyebrow">{s.leadersEyebrow}</div>
            <h2 className="section-title">{s.leadersTitle}</h2>
            <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.6)', maxWidth: 520, marginTop: 14, lineHeight: 1.7 }}>
              {s.leadersSubtitle}
            </p>
          </div>
          <div className="school-grid">
            {leaders.map((m, i) => (
              <div key={m.id} className={`school-card reveal${i > 0 ? ` reveal-delay-${i}` : ''}`}>
                <div className="school-card-header">
                  {m.photoUrl ? (
                    <div className="school-card-avatar" style={{ position: 'relative', overflow: 'hidden', borderRadius: '50%' }}>
                      <Image src={m.photoUrl} alt={m.photoAlt || m.name} width={64} height={64} className="object-cover" unoptimized={m.photoUrl.startsWith('http')} />
                    </div>
                  ) : (
                    <div className={`school-card-avatar av${(i % 2) + 1}`} />
                  )}
                  <div>
                    <div className="school-card-role">{m.role}</div>
                    <div className="school-card-name">{m.name}</div>
                    <div className="school-card-region">📍 {m.region}</div>
                  </div>
                </div>
                <div className="school-card-body">
                  <p className="school-card-bio">{m.bio}</p>
                  <div className="school-card-links">
                    <a className="school-link-btn li" href={m.linkedInUrl || '#'}>in LinkedIn</a>
                    <a className="school-link-btn contact" href={m.email ? `mailto:${m.email}` : '#'}>✉ Contact</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STAFF & VOLUNTEERS */}
      <section className="team-section">
        <div className="team-inner">
          <div className="team-section-header reveal">
            <div className="eyebrow">{s.staffEyebrow}</div>
            <h2 className="section-title">{s.staffTitle}</h2>
          </div>
          <div className="team-grid">
            {staffAndVolunteers.map((m, i) => (
              <div key={m.id} className={`team-card reveal${i > 0 ? ` reveal-delay-${i}` : ''}`}>
                {m.photoUrl ? (
                  <div className="team-card-img" style={{ position: 'relative' }}>
                    <Image src={m.photoUrl} alt={m.photoAlt || m.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" unoptimized={m.photoUrl.startsWith('http')} />
                  </div>
                ) : (
                  <div className={`team-card-img img-${((i + 3) % 6) + 1}`} />
                )}
                <div className="team-card-body">
                  <div className="team-card-role">{m.role}</div>
                  <div className="team-card-name">{m.name}</div>
                  <div className="team-card-region">📍 {m.region}</div>
                  <p className="team-card-bio">{m.bio}</p>
                  <div className="team-card-links">
                    <a className="team-card-link-btn li" href={m.linkedInUrl || '#'}>in LinkedIn</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* JOIN CTA */}
      <section className="join-section">
        <div className="join-inner reveal">
          <div className="eyebrow" style={{ justifyContent: 'center' }}>{s.joinEyebrow}</div>
          <h2 className="join-title">
            {s.joinTitle} <span className="accent">{s.joinTitleHighlight}</span>
          </h2>
          <p className="join-sub">{s.joinSubtitle}</p>
          <div className="join-btns">
            <a className="join-btn-primary" href={whatsappUrl} target="_blank" rel="noopener noreferrer">{s.joinPrimaryLabel}</a>
            <a className="join-btn-secondary" href={whatsappUrl} target="_blank" rel="noopener noreferrer">{s.joinSecondaryLabel}</a>
          </div>
        </div>
      </section>
    </main>
  );
}
