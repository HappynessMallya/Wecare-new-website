'use client';

import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

const locations = [
  { name: 'Mbeya', description: 'Regional programs and parent training' },
  { name: 'Mara', description: 'Early learning and community childcare' },
  { name: 'Mwanjelwa Market', description: 'Public market childcare program' },
];

export function WhereWeWork() {
  return (
    <section
      id="where-we-work"
      className="scroll-mt-24 bg-white py-20 md:py-28"
      aria-labelledby="where-heading"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <motion.h2
          id="where-heading"
          className="font-display text-3xl font-semibold text-primary md:text-4xl"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Where We Work
        </motion.h2>
        <motion.p
          className="mt-4 max-w-2xl text-lg text-neutral-700"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.05 }}
        >
          We operate across Tanzania with a focus on regions and settings where early childhood services are most needed.
        </motion.p>

        <div className="mt-12 flex flex-col gap-8 lg:flex-row lg:items-stretch lg:gap-12">
          <motion.div
            className="relative flex min-h-[320px] flex-1 items-center justify-center rounded-card border border-neutral-200 bg-neutral-50"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            aria-hidden
          >
            {/* Simplified Tanzania outline - stylized shape */}
            <svg
              viewBox="0 0 200 320"
              className="h-full max-h-[320px] w-full max-w-[280px] text-primary/20"
              fill="currentColor"
              aria-hidden
            >
              <path
                d="M100 20 L180 60 L170 120 L160 180 L140 240 L100 300 L60 260 L50 200 L40 140 L60 80 Z"
                fill="currentColor"
                className="text-primary/10"
              />
              {/* Location markers */}
              <circle cx="90" cy="140" r="8" className="fill-cta" />
              <circle cx="110" cy="200" r="8" className="fill-cta" />
              <circle cx="100" cy="260" r="8" className="fill-cta" />
            </svg>
            <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm font-medium text-primary">
              Tanzania
            </p>
          </motion.div>

          <ul className="flex flex-1 flex-col justify-center gap-6">
            {locations.map((loc, i) => (
              <motion.li
                key={loc.name}
                className="flex gap-4 rounded-card border border-neutral-200 bg-white p-6"
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-button bg-maya-blue/20 text-primary">
                  <MapPin className="h-6 w-6" aria-hidden />
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold text-primary">
                    {loc.name}
                  </h3>
                  <p className="mt-1 text-neutral-600">{loc.description}</p>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
