'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const aboutImage = 'https://placehold.co/800x600/80BFEC/0A3487.png';

export function About() {
  return (
    <section
      id="about"
      className="scroll-mt-24 bg-white py-20 md:py-28"
      aria-labelledby="about-heading"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            className="relative aspect-[4/3] overflow-hidden rounded-card"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            <Image
              src={aboutImage}
              alt="WeCARE team and community members in Tanzania"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              loading="lazy"
            />
          </motion.div>

          <div>
            <motion.h2
              id="about-heading"
              className="font-display text-3xl font-semibold text-primary md:text-4xl"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              About WeCARE
            </motion.h2>
            <motion.div
              className="mt-6 space-y-6 text-neutral-700"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <p className="text-lg leading-relaxed">
                WeCARE Foundation implements community-led early childhood
                development programs in Tanzania, focused on nutrition,
                learning, health, and safety. We work with parents, caregivers,
                and communities to create environments where every child can
                thrive in their earliest years.
              </p>
              <p className="text-lg leading-relaxed">
                Too many children lack access to quality early learning and
                care—especially in public markets and informal settings. We
                address this through evidence-based, community-driven programs
                that combine early education, childcare solutions, and parent
                support.
              </p>
              <p className="text-lg leading-relaxed">
                Our approach is rooted in local leadership and partnership. We
                work with government, NGOs, and the private sector to scale what
                works and to put children and families at the center of every
                decision.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
