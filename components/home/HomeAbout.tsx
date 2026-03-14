'use client';

export function HomeAbout() {
  return (
    <section id="about">
      <div className="container">
        <div className="ag">
          <div className="aphotos rv">
            <div className="apm">
              <img
                src="/parentclinic.jpg"
                alt="WeCare Foundation parent clinic Tanzania"
                loading="lazy"
              />
            </div>
            <div className="apt">
              <img
                src="/kids-at-work.jpg"
                alt="Child at WeCare program"
                loading="lazy"
              />
            </div>
            <div className="apb">
              <span className="n">2</span>
              <span className="s">
                Regions
                <br />
                Mbeya &amp; Mara
              </span>
            </div>
          </div>
          <div className="ac rv d1">
            <p className="ey">Who We Are</p>
            <h2>
              Tanzania&apos;s Community-Led <span>ECD Foundation</span>
            </h2>
            <span className="acit">Enriching Children&apos;s Lives — One Family at a Time</span>
            <p>
              WeCare Foundation (WeF) is a Non-Governmental Organization founded in{' '}
              <strong>2022 in Tanzania</strong>. WeCare partners with the Government of Tanzania and
              national ECD stakeholders to implement programs for quality early childhood development
              and learning.
            </p>
            <p>
              Our focus areas: Child good health, Adequate nutrition, Responsive caregiving, Child
              security and safety, and Opportunities for quality early learning. We are
              community-led, delivering impact through community and stakeholder engagement. WeCare
              also provides sustainable child care solutions that support working parents.
            </p>
            <div className="mvcards">
              <div className="mvc">
                <h4>Our Mission</h4>
                <p>
                  To contribute towards attainment of quality early childhood development, learning,
                  and health outcomes through innovative solutions, community and family engagement.
                </p>
              </div>
              <div className="mvc v">
                <h4>Our Vision</h4>
                <p>
                  To provide access to the best start of life for all children in early development,
                  learning, and health across Tanzania.
                </p>
              </div>
            </div>
            <div className="pillars">
              <div className="pill">
                <div className="pill-ico r">🤝</div>
                <div className="pill-txt">
                  <strong>Collaborative Approach</strong>
                  <small>
                    We engage community and stakeholders, governments, policy makers, and civil society
                    for sustainable impact.
                  </small>
                </div>
              </div>
              <div className="pill">
                <div className="pill-ico b">🏘️</div>
                <div className="pill-txt">
                  <strong>Community-Led</strong>
                  <small>
                    Programs are designed with communities — ensuring solutions are contextual,
                    trusted, and lasting.
                  </small>
                </div>
              </div>
              <div className="pill">
                <div className="pill-ico a">👨‍👩‍👧</div>
                <div className="pill-txt">
                  <strong>Parent-Centered</strong>
                  <small>
                    Working parents and caregivers are at the heart of everything — we provide
                    sustainable child care solutions.
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
