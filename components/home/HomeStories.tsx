'use client';

// CMS-friendly: map your feedback/stories from the CMS into this shape
const testimonials = [
  {
    id: '1',
    image: '/parentclinic.jpg',
    imageAlt: 'Parent testimonial',
    name: 'Mama Zawadi',
    role: 'Market Vendor & Parent · Mbeya',
    quote:
      "Since WeCare opened its daycare near Mwanjelwa market, I can work with peace of mind. My child is learning and being cared for while I run my business. This is the solution we needed as working mothers.",
  },
  {
    id: '2',
    image: '/person-back.jpg',
    imageAlt: 'Parent clinic session participant',
    name: 'James Mwamba',
    role: 'Father of 2 · Mara Region',
    quote:
      "The parent clinic sessions taught me so much about responsive caregiving and nutrition. I now understand how to support my children's development from the earliest days — things I never knew before WeCare came to our community.",
  },
  {
    id: '3',
    image: '/kids-at-work.jpg',
    imageAlt: 'Primary school teacher testimony',
    name: 'Teacher Neema Shayo',
    role: 'Primary School Teacher · Mbeya',
    quote:
      "WeCare children arrive at primary school already prepared. They are curious, socially confident, and ready to learn. The school readiness program has made a visible difference — these children outperform their peers from the very first week.",
  },
];

function TestimonialCard({
  image,
  imageAlt,
  name,
  role,
  quote,
}: {
  image: string;
  imageAlt: string;
  name: string;
  role: string;
  quote: string;
}) {
  return (
    <div className="scard">
      <div className="scp">
        <img src={image} alt={imageAlt} loading="lazy" />
      </div>
      <div className="sct">
        <span className="sqm">&quot;</span>
        <div className="snm">{name}</div>
        <span className="srl">{role}</span>
        <p className="stxt">{quote}</p>
      </div>
    </div>
  );
}

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
          <div className="scards-ticker-wrap" aria-hidden>
            <div className="scards-ticker">
              <div className="scards-ticker-inner">
                {testimonials.map((t) => (
                  <TestimonialCard key={t.id} {...t} />
                ))}
              </div>
              <div className="scards-ticker-inner">
                {testimonials.map((t) => (
                  <TestimonialCard key={`dup-${t.id}`} {...t} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
