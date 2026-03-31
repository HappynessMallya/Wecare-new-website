'use client';

import { motion } from 'framer-motion';
import { Mail, User } from 'lucide-react';
import { ContactForm } from '@/components/ContactForm';

export function Contact() {
  return (
    <section
      id="contact"
      className="scroll-mt-24 bg-white py-20 md:py-28"
      aria-labelledby="contact-heading"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <motion.h2
          id="contact-heading"
          className="font-display text-3xl font-semibold text-primary md:text-4xl"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Contact
        </motion.h2>

        <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h3 className="font-display text-xl font-semibold text-primary">
              Contact Information
            </h3>
            <dl className="mt-6 space-y-6">
              <div>
                <dt className="flex items-center gap-2 text-sm font-medium text-neutral-600">
                  <User className="h-4 w-4" aria-hidden />
                  CEO
                </dt>
                <dd className="mt-1 text-lg text-neutral-900">
                  Elizabeth Maginga Thobias
                </dd>
              </div>
              <div>
                <dt className="flex items-center gap-2 text-sm font-medium text-neutral-600">
                  <Mail className="h-4 w-4" aria-hidden />
                  Email
                </dt>
                <dd className="mt-1">
                  <a
                    href="mailto:info@wecare.or.tz"
                    className="text-lg text-primary underline hover:text-cta"
                  >
                    info@wecare.or.tz
                  </a>
                </dd>
              </div>
            </dl>
          </div>

          <div className="rounded-card border border-neutral-200 bg-neutral-50 p-8">
            <h3 className="font-display text-xl font-semibold text-primary">
              Send a message
            </h3>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
