'use client';

import { motion } from 'framer-motion';

const partners = [
  { name: 'Government of Tanzania', placeholder: 'Gov' },
  { name: 'TECDEN', placeholder: 'TECDEN' },
  { name: 'Helvetas Tanzania', placeholder: 'Helvetas' },
  { name: 'Global School Forum', placeholder: 'GSF' },
  { name: 'Pediatric Association of Tanzania', placeholder: 'PAT' },
];

export function PartnersGrid() {
  return (
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
  );
}
