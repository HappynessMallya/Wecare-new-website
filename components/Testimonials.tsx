'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const testimonials = [
  {
    quote:
      'Before joining the WeCARE program, I had no childcare support while working in the market. Now my daughter learns and plays safely.',
    author: 'Parent from Mwanjelwa Market',
    role: 'Market vendor',
  },
  {
    quote:
      'The childcare at the market changed everything. I can work knowing my child is safe and learning. WeCARE gave us hope.',
    author: 'Mama Rehema',
    role: 'Market vendor, Dar es Salaam',
  },
  {
    quote:
      'As a community leader, I have seen how early childhood programs bring families together. WeCARE listens to us and works with us.',
    author: 'Mwinyi Hassan',
    role: 'Community leader',
  },
  {
    quote:
      'I learned how to support my children at home. The training from WeCARE helped me understand that every moment can be a learning moment.',
    author: 'Teacher Grace',
    role: 'Early childhood educator',
  },
];

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const next = () => setIndex((i) => (i + 1) % testimonials.length);
  const prev = () =>
    setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);

  return (
    <section
      id="stories"
      className="scroll-mt-24 bg-white py-20 md:py-28"
      aria-labelledby="stories-heading"
    >
      <div className="mx-auto max-w-4xl px-4 md:px-6 lg:px-8">
        <motion.h2
          id="stories-heading"
          className="font-display text-3xl font-semibold text-primary md:text-4xl"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Stories From the Field
        </motion.h2>
        <motion.p
          className="mt-4 text-lg text-neutral-700"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.05 }}
        >
          Human stories from parents, community leaders, and educators—making impact tangible.
        </motion.p>

        <div className="relative mt-12 rounded-card border border-neutral-200 bg-neutral-50 p-8 md:p-12">
          <Quote
            className="absolute left-6 top-6 h-10 w-10 text-maya-blue/40"
            aria-hidden
          />
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={index}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              <p className="font-display text-xl italic text-neutral-800 md:text-2xl">
                &ldquo;{testimonials[index].quote}&rdquo;
              </p>
              <footer className="mt-6">
                <p className="font-semibold text-primary">
                  {testimonials[index].author}
                </p>
                <p className="text-sm text-neutral-600">
                  {testimonials[index].role}
                </p>
              </footer>
            </motion.blockquote>
          </AnimatePresence>

          <div className="mt-8 flex items-center justify-between">
            <button
              type="button"
              onClick={prev}
              className="flex h-10 w-10 items-center justify-center rounded-button border border-neutral-300 text-primary transition-colors hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex gap-2" role="tablist" aria-label="Testimonials">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setIndex(i)}
                  className={index === i ? 'opacity-100' : 'opacity-40'}
                  aria-label={`Go to testimonial ${i + 1}`}
                  aria-selected={index === i}
                  role="tab"
                >
                  <span className="block h-2 w-2 rounded-full bg-primary" />
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={next}
              className="flex h-10 w-10 items-center justify-center rounded-button border border-neutral-300 text-primary transition-colors hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
