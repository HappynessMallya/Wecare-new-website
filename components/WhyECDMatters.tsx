'use client';

import { motion } from 'framer-motion';
import { Brain, BookOpen, Heart } from 'lucide-react';

const points = [
  {
    icon: Brain,
    title: 'Brain development in the early years',
    description:
      'The first five years of life shape brain architecture and lay the foundation for learning, behavior, and health. Quality early experiences lead to better outcomes in school and later life.',
  },
  {
    icon: BookOpen,
    title: 'Early learning sets the trajectory',
    description:
      'Children who receive quality early childhood education are more likely to stay in school, earn more, and contribute to their communities. Investment in ECD yields high social and economic returns.',
  },
  {
    icon: Heart,
    title: 'Long-term social impact',
    description:
      'Strong early childhood development reduces inequality, improves health and nutrition, and builds more resilient families and communities. It is one of the most effective levers for sustainable development.',
  },
];

export function WhyECDMatters() {
  return (
    <section
      id="why-ecd"
      className="scroll-mt-24 bg-neutral-50 py-20 md:py-28"
      aria-labelledby="why-ecd-heading"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <motion.h2
          id="why-ecd-heading"
          className="font-display text-3xl font-semibold text-primary md:text-4xl"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Why Early Childhood Development Matters
        </motion.h2>
        <motion.p
          className="mt-4 max-w-2xl text-lg text-neutral-700"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.05 }}
        >
          Funders and partners often ask why the earliest years deserve
          investment. Here is the evidence.
        </motion.p>

        <div className="mt-16 grid gap-10 md:grid-cols-3">
          {points.map((item, i) => (
            <motion.article
              key={item.title}
              className="rounded-card border border-neutral-200 bg-white p-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-button bg-primary/10 text-primary">
                <item.icon className="h-6 w-6" aria-hidden />
              </div>
              <h3 className="mt-6 font-display text-xl font-semibold text-primary">
                {item.title}
              </h3>
              <p className="mt-3 text-neutral-600 leading-relaxed">
                {item.description}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
