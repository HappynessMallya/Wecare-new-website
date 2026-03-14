'use client';

import { useEffect } from 'react';

export function WeCareScripts() {
  useEffect(() => {
    const nav = document.getElementById('nav');
    if (!nav) return;

    const onScroll = () => nav.classList.toggle('sc', window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });

    const ro = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('on')),
      { threshold: 0.12 }
    );
    document.querySelectorAll('.rv').forEach((el) => ro.observe(el));

    const co = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          const target = parseInt(el.dataset.target ?? '0', 10);
          const dur = 2000;
          const start = performance.now();
          const tick = (now: number) => {
            const t = Math.min((now - start) / dur, 1);
            const ease = 1 - Math.pow(1 - t, 4);
            el.textContent = Math.floor(ease * target).toLocaleString();
            if (t < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          co.unobserve(el);
        });
      },
      { threshold: 0.4 }
    );
    document.querySelectorAll('.counter').forEach((el) => co.observe(el));

    const smoothScroll = (e: Event) => {
      const a = e.target as HTMLAnchorElement;
      const href = a.getAttribute('href');
      if (!href || !href.startsWith('#')) return;
      const id = href.slice(1);
      const el = document.getElementById(id);
      if (el) {
        e.preventDefault();
        const y = el.getBoundingClientRect().top + window.scrollY - 90;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    };
    document.querySelectorAll('a[href^="#"]').forEach((a) => a.addEventListener('click', smoothScroll));

    return () => {
      window.removeEventListener('scroll', onScroll);
      document.querySelectorAll('a[href^="#"]').forEach((a) => a.removeEventListener('click', smoothScroll));
    };
  }, []);

  return null;
}
