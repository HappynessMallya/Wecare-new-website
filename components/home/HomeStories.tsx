'use client';

export function HomeStories() {
  return (
    <section id="stories">
      <div className="container">
        <div className="stg">
          <div className="stl rv">
            <p className="ey">Impact Stories</p>
            <h2>
              Real Change in <span>Real Communities</span>
            </h2>
            <span className="stlit">
              Our school readiness program is a success story — WeCare kids are doing very well in
              primary school activities, attracting many parents to return for their children.
            </span>
            <p>
              WeCare&apos;s impact goes beyond statistics. Families in Mbeya and Mara regions are
              experiencing real transformation — in health literacy, child development, and school
              readiness.
            </p>
            <div className="sdgtags">
              <span className="sdgtag st1">🎯 SDG 4: Education</span>
              <span className="sdgtag st2">💗 SDG 3: Health</span>
              <span className="sdgtag st3">⚡ SDG 1: No Poverty</span>
              <span className="sdgtag st4">🌊 SDG 17: Partnerships</span>
            </div>
            <div className="mebox">
              <h4>📊 Our Approach to Impact</h4>
              <p>
                WeCare uses a collaborative approach engaging communities and stakeholders. We
                partner with governments, policy makers, and civil society to ensure our programs
                are evidence-based, community-owned, and sustainable across Tanzania.
              </p>
            </div>
          </div>
          <div className="scards">
            <div className="scard rv">
              <div className="scp">
                <img src="/parentclinic.jpg" alt="Parent testimonial" loading="lazy" />
              </div>
              <div className="sct">
                <span className="sqm">"</span>
                <div className="snm">Mama Zawadi</div>
                <span className="srl">Market Vendor &amp; Parent · Mbeya</span>
                <p className="stxt">
                  Since WeCare opened its daycare near Mwanjelwa market, I can work with peace of
                  mind. My child is learning and being cared for while I run my business. This is
                  the solution we needed as working mothers.
                </p>
              </div>
            </div>
            <div className="scard rv d1">
              <div className="scp">
                <img src="/person-back.jpg" alt="Parent clinic session participant" loading="lazy" />
              </div>
              <div className="sct">
                <span className="sqm">"</span>
                <div className="snm">James Mwamba</div>
                <span className="srl">Father of 2 · Mara Region</span>
                <p className="stxt">
                  The parent clinic sessions taught me so much about responsive caregiving and
                  nutrition. I now understand how to support my children&apos;s development from the
                  earliest days — things I never knew before WeCare came to our community.
                </p>
              </div>
            </div>
            <div className="scard rv d2">
              <div className="scp">
                <img src="/kids-at-work.jpg" alt="Primary school teacher testimony" loading="lazy" />
              </div>
              <div className="sct">
                <span className="sqm">"</span>
                <div className="snm">Teacher Neema Shayo</div>
                <span className="srl">Primary School Teacher · Mbeya</span>
                <p className="stxt">
                  WeCare children arrive at primary school already prepared. They are curious,
                  socially confident, and ready to learn. The school readiness program has made a
                  visible difference — these children outperform their peers from the very first
                  week.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
