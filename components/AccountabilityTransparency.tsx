'use client';

import { motion } from 'framer-motion';
import { FileText, BarChart3, ClipboardCheck, BookOpen } from 'lucide-react';
import Link from 'next/link';

const transparencyItems = [
  {
    icon: FileText,
    title: 'Program reports',
    description: 'Annual and quarterly reports on program delivery, reach, and lessons learned.',
  },
  {
    icon: BarChart3,
    title: 'Impact reports',
    description: 'Data on outcomes for children, parents, and communities, with clear indicators.',
  },
  {
    icon: ClipboardCheck,
    title: 'Monitoring methods',
    description: 'Community surveys, program tracking, and child development milestones.',
  },
  {
    icon: BookOpen,
    title: 'Research & evidence',
    description: 'Partnerships with researchers and use of evidence to improve our programs.',
  },
];

export function AccountabilityTransparency() {
  return (
    <section
      id="transparency"
      className="scroll-mt-24 bg-neutral-50 py-20 md:py-28"
      aria-labelledby="transparency-heading"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <motion.h2
          id="transparency-heading"
          className="font-display text-3xl font-semibold text-primary md:text-4xl"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Accountability & Transparency
        </motion.h2>
        <motion.p
          className="mt-4 max-w-2xl text-lg text-neutral-700"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.05 }}
        >
          We are committed to clear reporting and evidence-based practice. Funders and partners can access program and impact documentation.
        </motion.p>

        <motion.div
          className="mt-12 rounded-card border border-neutral-200 bg-white p-8 md:p-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h3 className="font-display text-xl font-semibold text-primary">
            How We Measure Impact
          </h3>
          <ul className="mt-6 space-y-4 text-neutral-700">
            <li className="flex gap-3">
              <span className="text-cta" aria-hidden>•</span>
              <span><strong>Community surveys</strong> — Regular feedback from parents, caregivers, and community leaders on program quality and relevance.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-cta" aria-hidden>•</span>
              <span><strong>Program tracking</strong> — Enrollment, attendance, and participation data across all sites.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-cta" aria-hidden>•</span>
              <span><strong>Child development milestones</strong> — Age-appropriate indicators for early learning, health, and well-being.</span>
            </li>
          </ul>
        </motion.div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {transparencyItems.map((item, i) => (
            <motion.article
              key={item.title}
              className="rounded-card border border-neutral-200 bg-white p-6"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.06 }}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-button bg-primary/10 text-primary">
                <item.icon className="h-5 w-5" aria-hidden />
              </div>
              <h4 className="mt-4 font-display font-semibold text-primary">
                {item.title}
              </h4>
              <p className="mt-2 text-sm text-neutral-600">{item.description}</p>
              <Link
                href="#contact"
                className="mt-4 inline-block text-sm font-medium text-cta hover:underline"
              >
                Request reports →
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
