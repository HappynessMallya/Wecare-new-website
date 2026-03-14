'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
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
  const [progress, setProgress] = useState(0);
  const startTimeRef = useRef(Date.now());
  const rafRef = useRef<number>(0);

  const goTo = useCallback((i: number) => {
    setIndex((prev) => {
      let next = i;
      if (next < 0) next = HERO_SLIDES.length - 1;
      if (next >= HERO_SLIDES.length) next = 0;
      return next;
    });
    startTimeRef.current = Date.now();
    setProgress(0);
  }, []);

  const next = useCallback(() => goTo(index + 1), [index, goTo]);

  useEffect(() => {
    if (paused) return;
    const tick = () => {
      const elapsed = Date.now() - startTimeRef.current;
      const p = Math.min(elapsed / AUTOPLAY_MS, 1);
      setProgress(p);
      if (p >= 1) next();
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [paused, index, next]);

  const handleMouseEnter = useCallback(() => {
    setPaused(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    startTimeRef.current = Date.now() - progress * AUTOPLAY_MS;
    setPaused(false);
  }, [progress]);

  return (
    <section id="hero">
      {/* Full-bleed background: program images show what the NGO does */}
      <div
        className="hero-bg-slider"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleMouseEnter}
        onBlur={handleMouseLeave}
      >
        {HERO_SLIDES.map((slide, i) => (
          <div
            key={i}
            className={`hero-bg-slide ${i === index ? 'active' : ''}`}
            aria-hidden={i !== index}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              sizes="100vw"
              priority={i === 0}
              className="object-cover object-[center_40%] brightness-[0.85]"
            />
          </div>
        ))}
      </div>
      <div className="hero-overlay" aria-hidden />
      {/* Progress bar: driven by same timer as slide, instant pause/resume */}
      <div className="hero-slider-progress" role="presentation" aria-hidden>
        <div
          className="hero-slider-progress-bar"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
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
      <a href="#main-content" className="hero-scroll-indicator" aria-label="Scroll to content">
        <span className="hero-scroll-text">Scroll</span>
        <span className="hero-scroll-arrow" aria-hidden>↓</span>
      </a>
    </section>
  );
}
