'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, Handshake, Users, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const actions = [
  {
    title: 'Partner With Us',
    description:
      'Organizations and institutions: join us to scale impact and share resources. Large funders often partner rather than donate.',
    icon: Handshake,
    href: '#contact',
    cta: 'Partner With Us',
  },
  {
    title: 'Fund a Program',
    description:
      'Support a specific program—early learning, market childcare, or parent training—with measurable outcomes.',
    icon: GraduationCap,
    href: '#contact',
    cta: 'Fund a Program',
  },
  {
    title: 'Support Early Learning',
    description:
      'Your gift helps us reach more children and families with quality early childhood programs.',
    icon: Heart,
    href: '#contact',
    cta: 'Donate',
  },
  {
    title: 'Volunteer',
    description:
      'Contribute your time and skills to support early childhood development in Tanzania.',
    icon: Users,
    href: '#contact',
    cta: 'Volunteer',
  },
];

export function GetInvolved() {
  return (
    <section
      id="get-involved"
      className="scroll-mt-24 bg-white py-20 md:py-28"
      aria-labelledby="get-involved-heading"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <motion.h2
          id="get-involved-heading"
          className="font-display text-3xl font-semibold text-primary md:text-4xl"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Get Involved
        </motion.h2>
        <motion.p
          className="mt-4 max-w-2xl text-lg text-neutral-700"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.05 }}
        >
          Partner, fund a program, donate, or volunteer. We work with institutional funders and individual supporters.
        </motion.p>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {actions.map((action, i) => (
            <motion.article
              key={action.title}
              className="flex flex-col rounded-card border border-neutral-200 bg-neutral-50 p-8 transition-shadow hover:shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-button bg-cta/10 text-cta">
                <action.icon className="h-7 w-7" aria-hidden />
              </div>
              <h3 className="mt-6 font-display text-xl font-semibold text-primary">
                {action.title}
              </h3>
              <p className="mt-3 flex-1 text-neutral-600">
                {action.description}
              </p>
              <Button asChild className="mt-6 w-fit">
                <Link href={action.href}>{action.cta}</Link>
              </Button>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
