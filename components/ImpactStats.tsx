'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

const stats = [
  {
    value: 5000,
    suffix: '+',
    label: 'Parents Reached',
    description: 'Trained in early childhood care and early life skills.',
  },
  {
    value: 800,
    suffix: '+',
    label: 'Children Enrolled',
    description: 'In quality early learning programs.',
  },
  {
    value: 210,
    suffix: '+',
    label: 'Kids Trained',
    description: 'In early life skills and school readiness.',
  },
  {
    value: 3,
    suffix: '',
    label: 'Regions Served',
    description: 'Across Tanzania, including Mbeya, Mara, and more.',
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
  const count = useCountUp(value, 2000, inView);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export function ImpactStats() {
  return (
    <section
      id="impact"
      className="scroll-mt-24 bg-primary py-20 text-white md:py-28"
      aria-labelledby="impact-heading"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <motion.h2
          id="impact-heading"
          className="font-display text-3xl font-semibold md:text-4xl"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Our Impact
        </motion.h2>
        <motion.p
          className="mt-4 max-w-2xl text-lg text-white/90"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.05 }}
        >
          Measurable results for our donors and partners.
        </motion.p>

        <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
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
              <p className="mt-1 text-sm text-white/80">{stat.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
