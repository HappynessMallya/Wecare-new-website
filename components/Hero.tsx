'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { HeroSlide, Settings, Program } from '@/lib/api';
import { HERO_FALLBACK_SLIDES } from '@/lib/fallbacks';

const AUTOPLAY_MS = 5500;

const DEFAULT_HEADLINE = "Enriching Children Life";

const HERO_BUTTONS = [
  { tagType: 't1', label: 'Early Childhood Development' },
  { tagType: 't2', label: 'Quality Early Childhood Education' },
  { tagType: 't3', label: 'Child Care in Public Spaces' },
  { tagType: 't4', label: 'Early Life Skills Training' },
] as const;

export function Hero({
  slides: slidesProp,
  settings,
  programs,
}: {
  slides?: HeroSlide[] | null;
  settings?: Settings | null;
  programs?: Program[] | null;
} = {}) {
  const slides = useMemo(() => {
    if (slidesProp?.length) return slidesProp;
    return HERO_FALLBACK_SLIDES;
  }, [slidesProp]);
  const [index, setIndex] = useState(0);
  /** Bump to reset autoplay interval after manual navigation */
  const [autoplayEpoch, setAutoplayEpoch] = useState(0);

  const normalizeIndex = useCallback(
    (i: number) => {
      let n = i;
      if (n < 0) n = slides.length - 1;
      if (n >= slides.length) n = 0;
      return n;
    },
    [slides.length],
  );

  const goToSlide = useCallback(
    (i: number) => {
      setIndex(normalizeIndex(i));
      setAutoplayEpoch((e) => e + 1);
    },
    [normalizeIndex],
  );

  const goPrev = useCallback(() => {
    setIndex((prev) => normalizeIndex(prev - 1));
    setAutoplayEpoch((e) => e + 1);
  }, [normalizeIndex]);

  const goNext = useCallback(() => {
    setIndex((prev) => normalizeIndex(prev + 1));
    setAutoplayEpoch((e) => e + 1);
  }, [normalizeIndex]);

  useEffect(() => {
    if (slides.length <= 1) return;
    const id = window.setInterval(() => {
      setIndex((prev) => {
        const next = prev + 1;
        return next >= slides.length ? 0 : next;
      });
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [slides.length, autoplayEpoch]);

  const currentSlide = slides[index];
  const headline = settings?.heroHeadline?.trim() || DEFAULT_HEADLINE;
  const tagline = currentSlide?.subtitle?.trim() || '';
  const showControls = slides.length > 1;

  const renderHeadline = () => {
    const raw = headline ?? '';
    const lower = raw.toLowerCase();
    const i = lower.indexOf('life');
    if (i === -1) return raw;

    const before = raw.slice(0, i);
    const word = raw.slice(i, i + 4);
    const after = raw.slice(i + 4);
    return (
      <>
        {before}
        <span className="accent">{word}</span>
        {after}
      </>
    );
  };

  return (
    <section id="hero" aria-roledescription="carousel" aria-label="Featured programs">
      <div className="hero-bg-slider">
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
      {showControls && (
        <>
          <div className="hero-slider-nav">
            <button
              type="button"
              className="hero-slider-nav-btn"
              onClick={goPrev}
              aria-label="Previous slide"
            >
              <ChevronLeft size={28} strokeWidth={2} aria-hidden />
            </button>
            <button
              type="button"
              className="hero-slider-nav-btn"
              onClick={goNext}
              aria-label="Next slide"
            >
              <ChevronRight size={28} strokeWidth={2} aria-hidden />
            </button>
          </div>
          <div className="hero-slider-dots" role="navigation" aria-label="Hero slides">
            {slides.map((slide, i) => (
              <button
                key={slide.id ?? i}
                type="button"
                className={`hero-slider-dot ${i === index ? 'active' : ''}`}
                onClick={() => goToSlide(i)}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === index ? 'true' : undefined}
              />
            ))}
          </div>
        </>
      )}
      <div className="hero-content">
        <div className="hero-content-inner">
          <h1 id="hero-headline">{renderHeadline()}</h1>
          {tagline && <p className="htag">{tagline}</p>}
          <div className="hctas">
            {HERO_BUTTONS.map((b) => {
              const program = (programs ?? []).find((p) => p.tagType === b.tagType);
              const href = program ? `/programs/${program.id}` : '/programs/ecd';
              return (
                <a key={b.tagType} href={href} className="btn b-ghost hero-glass-btn">
                  {b.label} <span className="arr">→</span>
                </a>
              );
            })}
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
