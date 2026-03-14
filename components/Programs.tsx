'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Baby,
  BookOpen,
  Store,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const programs = [
  {
    title: 'Early Childhood Development',
    description:
      'Holistic support for children from birth through early years, including health, nutrition, and cognitive development.',
    icon: Baby,
    href: '#programs',
  },
  {
    title: 'Quality Early Childhood Education',
    description:
      'Structured early learning programs that prepare children for primary school and lifelong learning.',
    icon: BookOpen,
    href: '#programs',
  },
  {
    title: 'Child Care Solutions in Public Markets',
    description:
      'Safe, affordable childcare for market vendors so parents can work while their children learn and play.',
    icon: Store,
    href: '#programs',
  },
  {
    title: 'Early Life Skills Training',
    description:
      'Training for parents, caregivers, and teachers on responsive caregiving and early stimulation.',
    icon: Sparkles,
    href: '#programs',
  },
];

export function Programs() {
  return (
    <section
      id="programs"
      className="scroll-mt-24 bg-neutral-50 py-20 md:py-28"
      aria-labelledby="programs-heading"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <motion.h2
          id="programs-heading"
          className="font-display text-3xl font-semibold text-primary md:text-4xl"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Our Programs
        </motion.h2>
        <motion.p
          className="mt-4 max-w-2xl text-lg text-neutral-700"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.05 }}
        >
          We deliver evidence-based programs that support children, families,
          and communities.
        </motion.p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {programs.map((program, i) => (
            <motion.article
              key={program.title}
              className={cn(
                'group flex flex-col rounded-card border border-neutral-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md'
              )}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-button bg-maya-blue/20 text-primary">
                <program.icon className="h-6 w-6" aria-hidden />
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold text-primary">
                {program.title}
              </h3>
              <p className="mt-2 flex-1 text-sm text-neutral-600">
                {program.description}
              </p>
              <span className="mt-4 inline-flex items-center gap-2 text-xs font-medium text-neutral-500">
                Program delivered through WeCare Foundation.
              </span>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
