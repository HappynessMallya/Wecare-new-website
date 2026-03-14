'use client';

import { useState, useEffect, useCallback } from 'react';
import { WHATSAPP_URL } from '@/lib/constants';

const HERO_SLIDES = [
  {
    src: '/parent-clinic.jpg',
    alt: 'Parent clinic sessions Tanzania',
    title: 'Parent Clinic Sessions',
    subtitle: 'Responsive caregiving & nutrition',
  },
  {
    src: '/sports.jpg',
    alt: 'WeCare sports and life skills Tanzania',
    title: 'Sports & Life Skills',
    subtitle: 'Ages 3–15+ · Academy Clubs',
  },
  {
    src: '/life-skills.jpg',
    alt: 'Early life skills program Tanzania',
    title: 'Early Life Skills',
    subtitle: 'Quality early learning',
  },
  {
    src: '/airport.jpg',
    alt: 'WeCare Foundation community and travel',
    title: 'Community & Outreach',
    subtitle: 'Reaching families where they are',
  },
];

const AUTOPLAY_MS = 5500;

export function Hero() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const goTo = useCallback((i: number) => {
    setIndex((prev) => {
      let next = i;
      if (next < 0) next = HERO_SLIDES.length - 1;
      if (next >= HERO_SLIDES.length) next = 0;
      return next;
    });
  }, []);

  const next = useCallback(() => goTo(index + 1), [index, goTo]);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(next, AUTOPLAY_MS);
    return () => clearInterval(t);
  }, [paused, index, next]);

  return (
    <section id="hero">
      {/* Full-bleed background: program images show what the NGO does */}
      <div
        className="hero-bg-slider"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        {HERO_SLIDES.map((slide, i) => (
          <div
            key={i}
            className={`hero-bg-slide ${i === index ? 'active' : ''}`}
            aria-hidden={i !== index}
          >
            <img src={slide.src} alt="" loading={i === 0 ? 'eager' : 'lazy'} />
          </div>
        ))}
      </div>
      <div className="hero-overlay" aria-hidden />
      <div className="hero-content">
        <div className="hero-content-inner">
          <h1 id="hero-headline">
            <span style={{ display: 'block', whiteSpace: 'nowrap' }}>Enriching Every Child&apos;s</span>
            <span style={{ display: 'block', whiteSpace: 'nowrap' }}>Life &amp; <span style={{ color: '#E6399A' }}>Future</span></span>
          </h1>
          <p className="htag">
            Providing early childhood development, health education, and support for underserved families.
          </p>
          <div className="hctas">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn b-rose">
              ❤ Support Our Work <span className="arr">→</span>
            </a>
            <a href="#programs" className="btn b-ghost">
              Our Programs <span className="arr">→</span>
            </a>
          </div>
          <div className="hstats">
            <div className="hs">
              <span className="n">
                <span className="counter" data-target="5000">0</span>
                <sup>+</sup>
              </span>
              <span className="l">Parents Reached</span>
            </div>
            <div className="hs">
              <span className="n">
                <span className="counter" data-target="800">0</span>
                <sup>+</sup>
              </span>
              <span className="l">Children in Programs</span>
            </div>
            <div className="hs">
              <span className="n">
                <span className="counter" data-target="210">0</span>
                <sup>+</sup>
              </span>
              <span className="l">Life Skills Trained</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
