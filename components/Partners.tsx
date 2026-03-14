'use client';

import { motion } from 'framer-motion';

const partners = [
  { name: 'Government of Tanzania', placeholder: 'Gov' },
  { name: 'TECDEN', placeholder: 'TECDEN' },
  { name: 'Helvetas Tanzania', placeholder: 'Helvetas' },
  { name: 'Global School Forum', placeholder: 'GSF' },
  { name: 'Pediatric Association of Tanzania', placeholder: 'PAT' },
];

export function Partners() {
  return (
    <section
      id="partners"
      className="scroll-mt-24 bg-neutral-50 py-20 md:py-28"
      aria-labelledby="partners-heading"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <motion.h2
          id="partners-heading"
          className="font-display text-3xl font-semibold text-primary md:text-4xl"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Trusted By
        </motion.h2>
        <motion.p
          className="mt-4 max-w-2xl text-lg text-neutral-700"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.05 }}
        >
          We work with government, NGOs, and institutions to scale impact.
        </motion.p>

        <div className="mt-12 grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5">
          {partners.map((partner, i) => (
            <motion.div
              key={partner.name}
              className="group flex min-h-[120px] items-center justify-center rounded-card border border-neutral-200 bg-white p-6 grayscale transition-all hover:grayscale-0 hover:shadow-md"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
            >
              <span className="text-center font-display text-lg font-semibold text-primary">
                {partner.placeholder}
              </span>
              <span className="sr-only">{partner.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
