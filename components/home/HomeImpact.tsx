'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

const stats = [
  { value: 3000, suffix: '+', label: 'Children reached' },
  { value: 1200, suffix: '+', label: 'Parents trained' },
  { value: 25, suffix: '', label: 'Community programs implemented' },
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

export function HomeImpact() {
  return (
    <section
      id="impact"
      className="bg-primary py-16 text-white md:py-20 scroll-mt-24"
      aria-labelledby="home-impact-heading"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <motion.h2
          id="home-impact-heading"
          className="font-display text-2xl font-semibold md:text-3xl"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Impact Highlights
        </motion.h2>

        <div className="mt-12 grid gap-8 sm:grid-cols-3">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="rounded-card bg-white/10 p-6 backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="font-display text-4xl font-semibold md:text-5xl">
                <AnimatedNumber value={stat.value} suffix={stat.suffix} />
              </div>
              <p className="mt-2 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <p className="mt-8 text-sm text-white/80">
          Snapshot of our current reach with children, parents, and communities.
        </p>
      </div>
    </section>
  );
}
