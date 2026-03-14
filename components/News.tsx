'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const articles = [
  {
    title: 'Program Updates',
    excerpt:
      'Latest progress from our early childhood development and market childcare programs across Tanzania.',
    image: 'https://placehold.co/600x400/80BFEC/0A3487.png',
    href: '#news',
  },
  {
    title: 'Community Stories',
    excerpt:
      'How parents and caregivers are using early life skills training to support their children at home.',
    image: 'https://placehold.co/600x400/80BFEC/0A3487.png',
    href: '#news',
  },
  {
    title: 'Research Insights',
    excerpt:
      'Evidence and learnings from our work to improve early childhood outcomes in Tanzania.',
    image: 'https://placehold.co/600x400/80BFEC/0A3487.png',
    href: '#news',
  },
];

export function News() {
  return (
    <section
      id="news"
      className="scroll-mt-24 bg-neutral-50 py-20 md:py-28"
      aria-labelledby="news-heading"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <motion.h2
          id="news-heading"
          className="font-display text-3xl font-semibold text-primary md:text-4xl"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          News & Updates
        </motion.h2>
        <motion.p
          className="mt-4 max-w-2xl text-lg text-neutral-700"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.05 }}
        >
          Program updates, community stories, and research insights.
        </motion.p>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {articles.map((article, i) => (
            <motion.article
              key={article.title}
              className="group overflow-hidden rounded-card border border-neutral-200 bg-white shadow-sm transition-shadow hover:shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={article.image}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform group-hover:scale-[1.02]"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <h3 className="font-display text-lg font-semibold text-primary">
                  {article.title}
                </h3>
                <p className="mt-2 text-sm text-neutral-600">
                  {article.excerpt}
                </p>
                <span className="mt-4 inline-flex items-center gap-2 text-xs font-medium text-neutral-500">
                  Story from WeCare Foundation
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
