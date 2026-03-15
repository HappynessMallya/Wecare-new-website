'use client';

import Image from 'next/image';

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
        <Image
          src={image}
          alt={imageAlt}
          width={96}
          height={96}
          className="object-cover w-full h-full"
          unoptimized={image.startsWith('http')}
        />
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

export function HomeStories({ section, stories: storiesProp }: { section?: import('@/lib/api').StoriesSection | null; stories?: import('@/lib/api').Story[] | null } = {}) {
  const stories: Array<{ id: string; name: string; role: string; quote: string; imageUrl: string; imageAlt: string }> = storiesProp?.length
    ? storiesProp
    : testimonials.map((t, i) => ({ id: t.id, name: t.name, role: t.role, quote: t.quote, imageUrl: t.image, imageAlt: t.imageAlt, order: i }));
  const eyebrow = section?.eyebrow?.trim() || 'Impact Stories';
  const title = section?.title?.trim() || 'Real Change in';
  const titleHighlight = section?.titleHighlight?.trim() || 'Real Communities';
  const introItalic = section?.introItalic?.trim() || "Our school readiness program is a success story — WeCare kids are doing very well in primary school activities, attracting many parents to return for their children.";
  const introParagraph = section?.introParagraph?.trim() || "WeCare's impact goes beyond statistics. Families in Mbeya and Mara regions are experiencing real transformation — in health literacy, child development, and school readiness.";
  const approachTitle = section?.approachTitle?.trim() || '📊 Our Approach to Impact';
  const approachBody = section?.approachBody?.trim() || "WeCare uses a collaborative approach engaging communities and stakeholders. We partner with governments, policy makers, and civil society to ensure our programs are evidence-based, community-owned, and sustainable across Tanzania.";

  return (
    <section id="stories">
      <div className="container">
        <div className="stg">
          <div className="stl rv">
            <p className="ey">{eyebrow}</p>
            <h2>{title} <span>{titleHighlight}</span></h2>
            <span className="stlit">{introItalic}</span>
            <p>{introParagraph}</p>
            {section?.sdgTags?.length ? (
              <div className="sdgtags">
                {section.sdgTags.map((tag, i) => (
                  <span key={i} className={`sdgtag st${(i % 4) + 1}`}>{tag.icon} {tag.label}</span>
                ))}
              </div>
            ) : (
              <div className="sdgtags">
                <span className="sdgtag st1">🎯 SDG 4: Education</span>
                <span className="sdgtag st2">💗 SDG 3: Health</span>
                <span className="sdgtag st3">⚡ SDG 1: No Poverty</span>
                <span className="sdgtag st4">🌊 SDG 17: Partnerships</span>
              </div>
            )}
            <div className="mebox">
              <h4>{approachTitle}</h4>
              <p>{approachBody}</p>
            </div>
          </div>
          <div className="scards-ticker-wrap" aria-hidden>
            <div className="scards-ticker">
              <div className="scards-ticker-inner">
                {stories.map((t) => (
                  <TestimonialCard key={t.id} image={t.imageUrl} imageAlt={t.imageAlt} name={t.name} role={t.role} quote={t.quote} />
                ))}
              </div>
              <div className="scards-ticker-inner">
                {stories.map((t) => (
                  <TestimonialCard key={`dup-${t.id}`} image={t.imageUrl} imageAlt={t.imageAlt} name={t.name} role={t.role} quote={t.quote} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
