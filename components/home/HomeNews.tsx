'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const articles = [
  {
    title: 'Program Updates',
    excerpt: 'Latest progress from our ECD and market childcare programs.',
    image: 'https://placehold.co/600x400/80BFEC/0A3487.png',
  },
  {
    title: 'Community Stories',
    excerpt: 'How parents use early life skills training at home.',
    image: 'https://placehold.co/600x400/80BFEC/0A3487.png',
  },
  {
    title: 'Research Insights',
    excerpt: 'Evidence and learnings from our work in Tanzania.',
    image: 'https://placehold.co/600x400/80BFEC/0A3487.png',
  },
];

export function HomeNews() {
  return (
    <section
      id="news"
      className="bg-white py-16 md:py-20 scroll-mt-24"
      aria-labelledby="home-news-heading"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <motion.h2
          id="home-news-heading"
          className="font-display text-2xl font-semibold text-primary md:text-3xl"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Latest News
        </motion.h2>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {articles.map((article, i) => (
            <motion.article
              key={article.title}
              className="group overflow-hidden rounded-card border border-neutral-200 bg-neutral-50 shadow-sm transition-shadow hover:shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={article.image}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform group-hover:scale-[1.02]"
                  loading="lazy"
                />
              </div>
              <div className="p-5">
                <h3 className="font-display font-semibold text-primary">
                  {article.title}
                </h3>
                <p className="mt-2 text-sm text-neutral-600">
                  {article.excerpt}
                </p>
                <span className="mt-4 inline-flex items-center gap-2 text-xs font-medium text-neutral-500">
                  News from WeCare Foundation
                </span>
              </div>
            </motion.article>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-neutral-600">
          Stories and updates from WeCare Foundation.
        </p>
      </div>
    </section>
  );
}
