'use client';

import { useMemo } from 'react';
import type { Program, ProgramSection } from '@/lib/api';

const DELAY = ['', 'd1', 'd2', 'd3'];
const TAG_CLASS: Record<string, string> = { t1: 't1', t2: 't2', t3: 't3', t4: 't4' };

export function HomePrograms({
  section,
  programs: programsProp,
  linkToDetail = false,
}: {
  section?: ProgramSection | null;
  programs?: Program[] | null;
  linkToDetail?: boolean;
} = {}) {
  const programs = useMemo(() => programsProp?.length ? programsProp : null, [programsProp]);
  const eyebrow = section?.eyebrow?.trim() || 'Our Program Focus Areas';
  const title = section?.title?.trim() || 'Programs';
  const titleHighlight = section?.titleHighlight?.trim() || 'You Can Support';
  const intro =
    section?.introParagraph?.trim() ||
    'Clear pathways from challenge to measurable outcomes across Tanzania.';

  if (programs?.length) {
    return (
      <section id="programs">
        <div className="container">
          <div className="sh rv">
            <p className="ey ct">{eyebrow}</p>
            <h2>{title} <span>{titleHighlight}</span></h2>
            <p>{intro}</p>
          </div>
          <div className="pgrid pgrid-preview">
            {programs.map((prog, i) => (
              <article key={prog.id} className={`prog prog-preview rv ${DELAY[i] ?? ''}`}>
                <div className="pimg pimg-preview">
                  <img src={prog.imageUrl} alt={prog.imageAlt || prog.title} loading="lazy" />
                  <div className="pov pov-preview" />
                  {prog.tagLabel && <span className={`ptag ${TAG_CLASS[prog.tagType] ?? 't1'}`}>{prog.tagLabel}</span>}
                </div>
                <div className="pb pb-preview">
                  {prog.regionBadge && <span className="rg-badge">📍 {prog.regionBadge}</span>}
                  <h3>{prog.title}</h3>
                  <p className="program-preview-line">
                    {prog.subtitle || (prog.body || '').replace(/<[^>]*>/g, '').split('. ')[0]}
                  </p>
                </div>
                <div className="pfoot pfoot-preview">
                  <a
                    href={linkToDetail ? `/programs/${prog.id}` : (prog.ctaHref || '#contact')}
                    className="plink"
                  >
                    Learn More →
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="programs">
      <div className="container">
        <div className="sh rv">
          <p className="ey ct">{eyebrow}</p>
          <h2>{title} <span>{titleHighlight}</span></h2>
          <p>{intro}</p>
        </div>
        <div className="pgrid">
          {/* Program 1 */}
          <div className="prog rv">
            <div className="pimg">
              <img
                src="/parentclinic.jpg"
                alt="Early childhood development program Tanzania"
                loading="lazy"
              />
              <div className="pov" />
              <span className="ptag t1">Ages 0 – 5</span>
            </div>
            <div className="pb">
              <span className="rg-badge">📍 Mbeya &amp; Mara Regions</span>
              <h3>Early Childhood Development</h3>
              <span className="psub">Investing in achieving child optimal development</span>
              <p>
                WeCare implements programs that address the five components of quality early
                childhood development — Child good health, Adequate nutrition, Responsive
                caregiving, Child security &amp; safety, and Opportunities for quality early
                learning. We support the critical period of child development aged{' '}
                <strong>zero to five years</strong>.
              </p>
              <ul className="pout">
                <li>ECD health promotion during pregnancy and after birth</li>
                <li>Parent Clinic Sessions with caregivers</li>
                <li>Digital health promotion via social networks</li>
                <li>Education on nurturing care — food types &amp; cooking demos</li>
              </ul>
            </div>
            <div className="pfoot">
              <div>
                <strong>5,000+</strong>
                <small>Parents &amp; caregivers reached</small>
              </div>
              <a href="#contact" className="plink">Learn more →</a>
            </div>
          </div>

          {/* Program 2 */}
          <div className="prog rv d1">
            <div className="pimg">
              <img
                src="/kids.jpg"
                alt="WeCare daycare and pre-school school readiness program"
                loading="lazy"
              />
              <div className="pov" />
              <span className="ptag t2">Ages 1 – 5</span>
            </div>
            <div className="pb">
              <span className="rg-badge">📍 Mbeya &amp; Mara Regions</span>
              <h3>Quality Early Childhood Education</h3>
              <span className="psub">Investing in school readiness for primary school</span>
              <p>
                WeCare has established <strong>daycare centres</strong> that provide child care and
                school readiness activities for children aged 1–5. Our centres integrate early
                learning and ECD activities to support children in achieving full developmental
                milestones and academic skills that prepare them for primary school.
              </p>
              <ul className="pout">
                <li>Daycare &amp; pre-school services</li>
                <li>School readiness curriculum</li>
                <li>Developmental milestone tracking</li>
                <li>Academic foundation skills training</li>
              </ul>
            </div>
            <div className="pfoot">
              <div>
                <strong>800+</strong>
                <small>Children served</small>
              </div>
              <a href="#contact" className="plink">Learn more →</a>
            </div>
          </div>

          {/* Program 3 */}
          <div className="prog rv d2">
            <div className="pimg">
              <img
                src="/kids-at-work.jpg"
                alt="Child care centre in Tanzania public market Mwanjelwa"
                loading="lazy"
              />
              <div className="pov" />
              <span className="ptag t3">New · 2025</span>
            </div>
            <div className="pb">
              <span className="rg-badge">📍 Mwanjelwa Market, Mbeya City</span>
              <h3>Child Care in Public Spaces</h3>
              <span className="psub">Establishing child care in Tanzania public markets</span>
              <p>
                WeCare collaborates with the Government and communities to establish child care
                centres in public markets. Many Tanzanian markets attract parents — especially women
                — who bring their children but lack safe child care. Our first centre is at{' '}
                <strong>Mwanjelwa Market, Mbeya City</strong> — secured in 2025 and community-owned.
              </p>
              <ul className="pout">
                <li>Community mobilization &amp; stakeholder engagement</li>
                <li>Establishment secured at Mwanjelwa Market</li>
                <li>Community-owned &amp; managed model</li>
                <li>Supports working mothers &amp; market vendors</li>
              </ul>
            </div>
            <div className="pfoot">
              <div>
                <strong>1</strong>
                <small>Market secured — 2025</small>
              </div>
              <a href="#contact" className="plink">Learn more →</a>
            </div>
          </div>

          {/* Program 4 */}
          <div className="prog rv d3">
            <div className="pimg">
              <img
                src="/life-skills.jpg"
                alt="Children early life skills training academy clubs Tanzania"
                loading="lazy"
              />
              <div className="pov" />
              <span className="ptag t4">Ages 3 – 15+</span>
            </div>
            <div className="pb">
              <span className="rg-badge">📍 School &amp; Holiday Programs</span>
              <h3>Early Life Skills Training</h3>
              <span className="psub">
                Age-appropriate skills based on developmental milestones
              </span>
              <p>
                WeCare collaborates with parents to conduct developmental milestone assessments and
                design activities that build early life skills. We operate three{' '}
                <strong>Academy Clubs</strong> — Social Emotional Learning, Arts, and Science —
                integrated into school programs and holiday programs each year.
              </p>
              <ul className="pout">
                <li>Social Emotional Learning Club</li>
                <li>Arts Club</li>
                <li>Science Club</li>
                <li>Holiday programs: ages 3–5, 6–9, 10–12, 15+</li>
              </ul>
            </div>
            <div className="pfoot">
              <div>
                <strong>210+</strong>
                <small>Children trained</small>
              </div>
              <a href="#contact" className="plink">Learn more →</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
