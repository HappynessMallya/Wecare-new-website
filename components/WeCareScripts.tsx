'use client';

import { useEffect } from 'react';

export function WeCareScripts() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isCoarsePointer = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
    const nav = document.getElementById('nav');

    const onScroll = () => nav?.classList.toggle('sc', window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });

    // Reveal observer — handles .rv and .reveal elements
    const ro = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add('on');
        e.target.classList.add('visible');
      }),
      { threshold: 0.08 }
    );

    // Counter observer
    const co = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target as HTMLElement;
        const target = parseInt((el.dataset.target ?? '0').replace(/[^\d]/g, ''), 10);
        if (prefersReducedMotion) { el.textContent = target.toLocaleString(); co.unobserve(el); return; }
        const dur = 2000; const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min((now - start) / dur, 1);
          el.textContent = Math.floor((1 - Math.pow(1 - t, 4)) * target).toLocaleString();
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        co.unobserve(el);
      }),
      { threshold: 0.4 }
    );

    const observed = new WeakSet<Element>();

    function observeNewElements(root: Element | Document = document) {
      root.querySelectorAll('.rv, .reveal').forEach((el) => {
        if (observed.has(el)) return;
        observed.add(el);
        ro.observe(el);
      });
      root.querySelectorAll('.counter').forEach((el) => {
        if (observed.has(el)) return;
        observed.add(el);
        co.observe(el);
      });
    }

    // Initial scan
    observeNewElements();

    // Watch for dynamically added elements (client components hydrating)
    const mo = new MutationObserver((mutations) => {
      mutations.forEach((m) => {
        Array.from(m.addedNodes).forEach((node) => {
          if (node instanceof Element) observeNewElements(node);
        });
      });
    });
    mo.observe(document.body, { childList: true, subtree: true });

    // Ripple
    const handleButtonPress = (e: Event) => {
      if (isCoarsePointer) return;
      const btn = e.currentTarget as HTMLElement;
      const rect = btn.getBoundingClientRect();
      const pointer = e as PointerEvent;
      btn.style.setProperty('--ripple-x', `${pointer.clientX - rect.left}px`);
      btn.style.setProperty('--ripple-y', `${pointer.clientY - rect.top}px`);
      btn.classList.remove('ripple');
      requestAnimationFrame(() => btn.classList.add('ripple'));
    };
    const microButtons = Array.from(document.querySelectorAll('.btn'));
    microButtons.forEach((btn) => btn.addEventListener('pointerdown', handleButtonPress));

    // Smooth scroll
    const smoothScroll = (e: Event) => {
      const a = e.target as HTMLAnchorElement;
      const href = a.getAttribute('href');
      if (!href || !href.startsWith('#')) return;
      const el = document.getElementById(href.slice(1));
      if (el) {
        e.preventDefault();
        window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 90, behavior: 'smooth' });
      }
    };
    document.querySelectorAll('a[href^="#"]').forEach((a) => a.addEventListener('click', smoothScroll));

    return () => {
      window.removeEventListener('scroll', onScroll);
      ro.disconnect();
      co.disconnect();
      mo.disconnect();
      microButtons.forEach((btn) => btn.removeEventListener('pointerdown', handleButtonPress));
      document.querySelectorAll('a[href^="#"]').forEach((a) => a.removeEventListener('click', smoothScroll));
    };
  }, []);

  return null;
}
