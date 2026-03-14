'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FileText, BookOpen, Briefcase, BarChart3, ArrowRight } from 'lucide-react';

const resources = [
  {
    icon: FileText,
    title: 'Early childhood research',
    description: 'Evidence and studies on ECD in Tanzania and the region.',
    href: '#contact',
  },
  {
    icon: BookOpen,
    title: 'Parenting guides',
    description: 'Practical resources for caregivers and parents.',
    href: '#contact',
  },
  {
    icon: Briefcase,
    title: 'Policy briefs',
    description: 'Recommendations for policy and practice.',
    href: '#contact',
  },
  {
    icon: BarChart3,
    title: 'Reports',
    description: 'Program and impact reports for partners and funders.',
    href: '#transparency',
  },
];

export function Resources() {
  return (
    <section
      id="resources"
      className="scroll-mt-24 bg-white py-20 md:py-28"
      aria-labelledby="resources-heading"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <motion.h2
          id="resources-heading"
          className="font-display text-3xl font-semibold text-primary md:text-4xl"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Resources
        </motion.h2>
        <motion.p
          className="mt-4 max-w-2xl text-lg text-neutral-700"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.05 }}
        >
          Early childhood research, parenting guides, policy briefs, and reports. We share knowledge to advance ECD practice and policy.
        </motion.p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {resources.map((item, i) => (
            <motion.article
              key={item.title}
              className="group flex gap-6 rounded-card border border-neutral-200 bg-neutral-50 p-6 transition-shadow hover:shadow-md"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-button bg-primary/10 text-primary">
                <item.icon className="h-6 w-6" aria-hidden />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-display text-lg font-semibold text-primary">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-neutral-600">
                  {item.description}
                </p>
                <span className="mt-4 inline-flex items-center gap-2 text-xs font-medium text-neutral-500">
                  Resource available on request from WeCare.
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
