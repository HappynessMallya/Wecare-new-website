'use client';

import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import Image from 'next/image';
import { WHATSAPP_URL } from '@/lib/constants';
import type { HeroSlide, Settings, ImpactItem } from '@/lib/api';
import { HERO_FALLBACK_SLIDES } from '@/lib/fallbacks';

const AUTOPLAY_MS = 5500;

const DEFAULT_HEADLINE = "Enriching Every Child's Life & Future";

const FALLBACK_STATS = [
  { number: '5000', suffix: '+', label: 'Parents Reached' },
  { number: '800', suffix: '+', label: 'Children in Programs' },
  { number: '210', suffix: '+', label: 'Life Skills Trained' },
];

export function Hero({
  slides: slidesProp,
  settings,
  impactItems,
}: {
  slides?: HeroSlide[] | null;
  settings?: Settings | null;
  impactItems?: ImpactItem[] | null;
} = {}) {
  const slides = useMemo(() => {
    if (slidesProp?.length) return slidesProp;
    return HERO_FALLBACK_SLIDES;
  }, [slidesProp]);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const startTimeRef = useRef(Date.now());
  const rafRef = useRef<number>(0);

  const goTo = useCallback((i: number) => {
    setIndex((prev) => {
      let next = i;
      if (next < 0) next = slides.length - 1;
      if (next >= slides.length) next = 0;
      return next;
    });
    startTimeRef.current = Date.now();
    setProgress(0);
  }, [slides.length]);

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

  const currentSlide = slides[index];
  const headline = settings?.heroHeadline?.trim() || DEFAULT_HEADLINE;
  const tagline = currentSlide?.subtitle?.trim() || '';
  const donateHref = settings?.whatsappUrl || WHATSAPP_URL;

  // Use first 3 impact bar items that have a suffix (numeric stats), falling back to hardcoded values
  const heroStats = useMemo(() => {
    const live = (impactItems ?? []).slice(0, 3);
    if (live.length >= 1) {
      return live.map((item) => ({
        number: item.number,
        suffix: item.suffix,
        label: item.label,
      }));
    }
    return FALLBACK_STATS;
  }, [impactItems]);

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
        {slides.map((slide, i) => (
          <div
            key={slide.id ?? i}
            className={`hero-bg-slide ${i === index ? 'active' : ''}`}
            aria-hidden={i !== index}
          >
            <Image
              src={slide.imageUrl}
              alt={slide.alt}
              fill
              sizes="100vw"
              priority={i === 0}
              className="object-cover object-[center_40%] brightness-[0.85]"
              unoptimized={slide.imageUrl.startsWith('http')}
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
          <h1 id="hero-headline">{headline}</h1>
          {tagline && <p className="htag">{tagline}</p>}
          <div className="hctas">
            <a href={donateHref} target="_blank" rel="noopener noreferrer" className="btn b-rose">
              ❤ Support Our Work <span className="arr">→</span>
            </a>
            <a href="#programs" className="btn b-ghost">
              Our Programs <span className="arr">→</span>
            </a>
          </div>
          <div className="hstats">
            {heroStats.map((stat, i) => (
              <div key={i} className="hs">
                <span className="n">
                  {stat.suffix ? (
                    <>
                      <span className="counter" data-target={stat.number}>0</span>
                      <sup>{stat.suffix}</sup>
                    </>
                  ) : (
                    stat.number
                  )}
                </span>
                <span className="l">{stat.label}</span>
              </div>
            ))}
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
