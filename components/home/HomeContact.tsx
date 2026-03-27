'use client';

import { motion } from 'framer-motion';
import { ContactForm } from '@/components/ContactForm';

export function HomeContact() {
  return (
    <section
      id="contact"
      className="bg-white section-padding scroll-mt-24"
      aria-labelledby="home-contact-heading"
    >
      <div className="mx-auto max-w-[1380px] px-7 grid gap-10 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1.2fr)]">
        <div>
          <motion.p
            className="eyebrow"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Get In Touch
          </motion.p>
          <motion.h2
            id="home-contact-heading"
            className="font-display text-primary text-[clamp(26px,3vw,40px)] font-extrabold mb-3"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Let&apos;s Start a Conversation
          </motion.h2>
          <motion.p
            className="text-[15px] text-neutral-600 leading-relaxed mb-4"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05 }}
          >
            Whether you are a potential funder, partner, volunteer, or community member,
            Elizabeth and the WeCare team would love to hear from you.
          </motion.p>
          <p className="text-[14px] text-neutral-700">
            Email:{' '}
            <a
              href="mailto:Wecarefoundation025@gmail.com"
              className="font-semibold text-primary hover:text-rose"
            >
              Wecarefoundation025@gmail.com
            </a>
          </p>
        </div>
        <div className="rounded-[20px] border border-neutral-200 bg-white shadow-sm p-6 md:p-8">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}

