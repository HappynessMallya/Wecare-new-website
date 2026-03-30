'use client';

import { useMemo, useState, useEffect } from 'react';
import Image from 'next/image';
import { Sprout, BookOpen, Store, Target } from 'lucide-react';
import type { HeroSlide, Settings, Program } from '@/lib/api';
import { HERO_FALLBACK_SLIDES } from '@/lib/fallbacks';

const DEFAULT_SUBTEXT =
  'Providing quality early childhood development, care, and learning across Mbeya and Mara — for every child\'s best start in life.';

const HERO_BUTTONS = [
  { tagType: 't1', label: 'Early Childhood Development', fallbackHref: '/programs/ecd', icon: Sprout, bg: 'rgba(230,57,154,0.25)' },
  { tagType: 't2', label: 'Quality Education', fallbackHref: '/programs/quality-early-childhood-education', icon: BookOpen, bg: 'rgba(37,171,236,0.25)' },
  { tagType: 't3', label: 'Child Care Spaces', fallbackHref: '/programs/child-care-in-public-spaces', icon: Store, bg: 'rgba(223,73,23,0.25)' },
  { tagType: 't4', label: 'Life Skills', fallbackHref: '/programs/early-life-skills-training', icon: Target, bg: 'rgba(37,171,236,0.18)' },
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
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentSlide = slides[currentIndex];
  const subtext = currentSlide?.subtitle?.trim() || DEFAULT_SUBTEXT;

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = window.setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [slides.length]);

  const goSlide = (index: number) => {
    setCurrentIndex((index + slides.length) % slides.length);
  };

  return (
    <section id="hero" aria-label="Featured programs">
      <div className="hero-bg-single">
        {slides.map((slide, idx) => (
          <div key={slide.id ?? idx} className={`hero-bg-slide ${idx === currentIndex ? 'active' : ''}`}>
            <Image
              src={slide.imageUrl}
              alt={slide.alt}
              fill
              sizes="100vw"
              priority={idx === 0}
              className="object-cover object-[center_40%]"
              unoptimized={slide.imageUrl.startsWith('http')}
            />
          </div>
        ))}
      </div>
      <div className="hero-overlay" aria-hidden />
      <div className="hero-blobs" aria-hidden />
      <div className="hero-content">
        <div className="hero-left">
          <h1 id="hero-headline" className="hero-title">
            Enriching
            <br />
            <span className="accent">Children&apos;s</span>
            <br />
            <span className="accent-azure">Lives</span>
          </h1>
          <p className="hero-sub">{subtext}</p>
          <div className="hero-arrows">
            <button type="button" className="hero-arrow-btn" onClick={() => goSlide(currentIndex - 1)} aria-label="Previous slide">←</button>
            <button type="button" className="hero-arrow-btn" onClick={() => goSlide(currentIndex + 1)} aria-label="Next slide">→</button>
          </div>
          <div className="hero-dots">
            {slides.map((slide, idx) => (
              <button
                key={slide.id ?? idx}
                type="button"
                className={`hero-dot ${idx === currentIndex ? 'active' : ''}`}
                onClick={() => goSlide(idx)}
                aria-label={`Go to hero slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
        <div className="hero-programs-panel">
          <div className="hero-programs-label">Explore our programs</div>
          {HERO_BUTTONS.map((chip) => {
            const program = (programs ?? []).find((p) => p.tagType === chip.tagType);
            const href = program ? `/programs/${program.id}` : chip.fallbackHref;
            const Icon = chip.icon;
            return (
              <a key={chip.tagType} href={href} className="hero-program-btn">
                <span className="hero-prog-icon" style={{ background: chip.bg }} aria-hidden>
                  <Icon size={16} strokeWidth={2.2} />
                </span>
                <span className="prog-title">{chip.label}</span>
                <span className="prog-arrow">→</span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
