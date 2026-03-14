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
  const prev = useCallback(() => goTo(index - 1), [index, goTo]);

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
          <h1>
            <span className="ar">Enriching</span>
            <br />
            Every Child&apos;s
            <br />
            <span className="aa">Life &amp; Future</span>
          </h1>
          <p className="htag">Quality ECD, learning &amp; health for underserved families.</p>
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
      <div className="hero-caption">
        <strong>{HERO_SLIDES[index].title}</strong>
        <small>{HERO_SLIDES[index].subtitle}</small>
      </div>
      <div className="hero-controls">
        <button
          type="button"
          className="hero-arrow"
          onClick={prev}
          aria-label="Previous slide"
        >
          ‹
        </button>
        <div className="hero-dots" role="tablist" aria-label="Hero slides">
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Slide ${i + 1}`}
              className={`hero-dot ${i === index ? 'active' : ''}`}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
        <button
          type="button"
          className="hero-arrow"
          onClick={next}
          aria-label="Next slide"
        >
          ›
        </button>
      </div>
    </section>
  );
}
