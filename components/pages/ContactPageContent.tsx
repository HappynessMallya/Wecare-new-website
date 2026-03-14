'use client';

import { Mail, MapPin, Phone, Facebook, Linkedin, Instagram } from 'lucide-react';
import { ContactForm } from '@/components/ContactForm';
import { NewsletterSection } from '@/components/NewsletterSection';

export function ContactPageContent() {
  return (
    <div className="pt-20">
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-20 lg:px-8">
        <h1 className="font-display text-3xl font-semibold text-primary md:text-4xl">
          Contact
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-neutral-700">
          Get in touch for partnerships, funding, volunteering, or general
          inquiries. We respond as quickly as we can.
        </p>

        <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="font-display text-xl font-semibold text-primary">
              Office & contact details
            </h2>
            <dl className="mt-6 space-y-6">
              <div>
                <dt className="flex items-center gap-2 text-sm font-medium text-neutral-600">
                  <Mail className="h-4 w-4" aria-hidden />
                  Email
                </dt>
                <dd className="mt-1">
                  <a
                    href="mailto:Wecarefoundation025@gmail.com"
                    className="text-primary underline hover:text-cta"
                  >
                    Wecarefoundation025@gmail.com
                  </a>
                </dd>
              </div>
              <div>
                <dt className="flex items-center gap-2 text-sm font-medium text-neutral-600">
                  <MapPin className="h-4 w-4" aria-hidden />
                  Location
                </dt>
                <dd className="mt-1 text-neutral-800">
                  Tanzania — Mbeya, Mara, Mwanjelwa Market and surrounding areas
                </dd>
              </div>
              <div>
                <dt className="flex items-center gap-2 text-sm font-medium text-neutral-600">
                  <Phone className="h-4 w-4" aria-hidden />
                  Phone
                </dt>
                <dd className="mt-1 text-neutral-800">
                  Available on request — contact via email
                </dd>
              </div>
            </dl>
            <div className="mt-8 flex gap-4" aria-label="Social media">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-cta transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-cta transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-cta transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div className="rounded-card border border-neutral-200 bg-neutral-50 p-8">
            <h2 id="contact-form-heading" className="font-display text-xl font-semibold text-primary">
              Send a message
            </h2>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>

      <section id="newsletter" className="border-t border-neutral-200">
        <NewsletterSection />
      </section>
    </div>
  );
}
