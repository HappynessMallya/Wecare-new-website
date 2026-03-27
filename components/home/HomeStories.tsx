'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { StoriesSection, Story } from '@/lib/api';

const AUTOPLAY_MS = 7000;

const STORY_FALLBACKS: Story[] = [
  {
    id: '1',
    name: 'Mama Zawadi',
    role: 'Market vendor & parent · Mbeya',
    quote:
      'Since WeCare opened its daycare near Mwanjelwa market, I can work with peace of mind. My child is learning and being cared for while I run my business.',
    imageUrl: '/parentclinic.jpg',
    imageAlt: 'Parent testimonial',
    order: 0,
  },
  {
    id: '2',
    name: 'James Mwamba',
    role: 'Father of two · Mara',
    quote:
      'The parent clinic sessions taught me about responsive caregiving and nutrition. I understand how to support my children’s development in ways I never knew before WeCare.',
    imageUrl: '/person-back.jpg',
    imageAlt: 'Parent at clinic session',
    order: 1,
  },
  {
    id: '3',
    name: 'Teacher Neema Shayo',
    role: 'Primary school teacher · Mbeya',
    quote:
      'WeCare children arrive at primary school prepared — curious, confident, and ready to learn. The difference is visible from the first week.',
    imageUrl: '/kids-at-work.jpg',
    imageAlt: 'Teacher testimonial',
    order: 2,
  },
];

function sortStories(list: Story[]) {
  return [...list].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

export function HomeStories({
  section,
  stories: storiesProp,
}: { section?: StoriesSection | null; stories?: Story[] | null } = {}) {
  const items = useMemo(() => {
    if (storiesProp?.length) return sortStories(storiesProp);
    return STORY_FALLBACKS;
  }, [storiesProp]);

  const [index, setIndex] = useState(0);
  const [autoplayEpoch, setAutoplayEpoch] = useState(0);

  const n = items.length;
  const normalize = useCallback(
    (i: number) => {
      let x = i;
      if (x < 0) x = n - 1;
      if (x >= n) x = 0;
      return x;
    },
    [n],
  );

  const go = useCallback(
    (i: number) => {
      setIndex(normalize(i));
      setAutoplayEpoch((e) => e + 1);
    },
    [normalize],
  );

  const prev = useCallback(() => go(index - 1), [go, index]);
  const next = useCallback(() => go(index + 1), [go, index]);

  useEffect(() => {
    if (n <= 1) return;
    const id = window.setInterval(() => {
      setIndex((prevI) => normalize(prevI + 1));
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [n, autoplayEpoch, normalize]);

  const eyebrow = section?.eyebrow?.trim() || 'Voices from the community';
  const title = section?.title?.trim() || 'What people say';
  const titleHighlight = section?.titleHighlight?.trim() || 'about WeCare';

  const s = items[index];
  const showNav = n > 1;

  if (!s) return null;

  return (
    <section id="stories" className="impact-stories" aria-roledescription="carousel" aria-label="Impact stories">
      <div className="container">
        <header className="is-head">
          <p className="ey is-head-ey">{eyebrow}</p>
          <h2 className="is-title">
            {title} <span>{titleHighlight}</span>
          </h2>
        </header>
      </div>

      <div className="is-panel">
        <div className="container is-panel-inner">
          {showNav && (
            <div className="is-nav">
              <button type="button" className="is-nav-btn" onClick={prev} aria-label="Previous story">
                <ChevronLeft size={24} strokeWidth={2} aria-hidden />
              </button>
              <button type="button" className="is-nav-btn" onClick={next} aria-label="Next story">
                <ChevronRight size={24} strokeWidth={2} aria-hidden />
              </button>
            </div>
          )}

          <article className="is-slide" aria-live="polite">
            <div className="is-photo">
              <Image
                src={s.imageUrl}
                alt={s.imageAlt || `${s.name} — community voice`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 280px"
                unoptimized={s.imageUrl.startsWith('http')}
              />
            </div>
            <div className="is-quote-wrap">
              <blockquote className="is-quote">
                <p>&ldquo;{s.quote}&rdquo;</p>
              </blockquote>
              <footer className="is-attrib">
                <strong className="is-name">{s.name}</strong>
                <span className="is-role">{s.role}</span>
              </footer>
            </div>
          </article>

          {showNav && (
            <div className="is-dots" role="navigation" aria-label="Stories">
              {items.map((item, i) => (
                <button
                  key={item.id}
                  type="button"
                  className={`is-dot ${i === index ? 'active' : ''}`}
                  onClick={() => go(i)}
                  aria-label={`Show story ${i + 1}`}
                  aria-current={i === index ? 'true' : undefined}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
