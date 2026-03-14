'use client';

import Link from 'next/link';
import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

const dashboardStats = [
  { label: 'Children supported', value: 3000, suffix: '+' },
  { label: 'Parents trained', value: 1200, suffix: '+' },
  { label: 'Communities reached', value: 15, suffix: '' },
];

const stories = [
  {
    quote:
      'Before joining the WeCARE program, I had no childcare support while working in the market. Now my daughter learns and plays safely.',
    author: 'Parent from Mwanjelwa Market',
  },
  {
    quote:
      'The training helped me understand how to support my child at home. Every moment can be a learning moment.',
    author: 'Teacher Grace, early childhood educator',
  },
];

function useCountUp(end: number, duration: number, start: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [end, duration, start]);
  return count;
}

function AnimatedNumber({
  value,
  suffix,
}: {
  value: number;
  suffix: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const count = useCountUp(value, 1800, inView);
  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export function ImpactPageContent() {
  return (
    <div className="pt-20">
      {/* Impact Dashboard */}
      <section
        id="dashboard"
        className="bg-primary py-16 text-white md:py-20"
      >
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <h1 className="font-display text-3xl font-semibold md:text-4xl">
            Impact Dashboard
          </h1>
          <p className="mt-2 text-white/90">
            Key statistics from our programs.
          </p>
          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {dashboardStats.map((stat, i) => (
              <div
                key={stat.label}
                className="rounded-card bg-white/10 p-8 backdrop-blur-sm"
              >
                <div className="font-display text-4xl font-semibold md:text-5xl">
                  <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                </div>
                <p className="mt-2 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stories of Change */}
      <section id="stories" className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-20 lg:px-8">
        <h2 className="font-display text-2xl font-semibold text-primary md:text-3xl">
          Stories of Change
        </h2>
        <p className="mt-2 text-neutral-700">
          Community success stories from the field.
        </p>
        <div className="mt-10 space-y-8">
          {stories.map((s, i) => (
            <blockquote
              key={i}
              className="border-l-4 border-cta bg-neutral-50 py-6 pl-8 pr-6 font-display text-lg italic text-neutral-800"
            >
              &ldquo;{s.quote}&rdquo;
              <footer className="mt-4 text-base font-sans not-italic text-neutral-600">
                — {s.author}
              </footer>
            </blockquote>
          ))}
        </div>
      </section>

      {/* Case Studies */}
      <section className="bg-neutral-50 py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-semibold text-primary md:text-3xl">
            Case Studies
          </h2>
          <p className="mt-2 text-neutral-700">
            Detailed program examples and outcomes.
          </p>
          <div className="mt-10 rounded-card border border-neutral-200 bg-white p-8">
            <h3 className="font-display text-xl font-semibold text-primary">
              Mwanjelwa Market Childcare Program
            </h3>
            <p className="mt-4 text-neutral-700">
              We partnered with market vendors and local government to establish
              a safe, stimulating childcare space in Mwanjelwa Market. Parents
              can work while their children learn and play. The program includes
              early learning activities, nutrition support, and parent training
              sessions. Results include increased vendor productivity and
              improved child development indicators among participating
              families.
            </p>
            <p className="mt-4 text-sm text-neutral-600">
              For more case studies and reports, please{' '}
              <Link href="/contact" className="font-medium text-cta hover:underline">
                contact us
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      {/* Monitoring & Evaluation */}
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-20 lg:px-8">
        <h2 className="font-display text-2xl font-semibold text-primary md:text-3xl">
          Monitoring & Evaluation
        </h2>
        <p className="mt-4 max-w-3xl text-neutral-700">
          We measure program success through:
        </p>
        <ul className="mt-6 space-y-3 text-neutral-700">
          <li className="flex gap-3">
            <span className="text-cta">•</span>
            <span><strong>Community surveys</strong> — Feedback from parents and caregivers.</span>
          </li>
          <li className="flex gap-3">
            <span className="text-cta">•</span>
            <span><strong>Program tracking</strong> — Enrollment, attendance, and participation.</span>
          </li>
          <li className="flex gap-3">
            <span className="text-cta">•</span>
            <span><strong>Child development milestones</strong> — Age-appropriate indicators.</span>
          </li>
        </ul>
      </section>
    </div>
  );
}
