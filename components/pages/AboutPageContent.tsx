'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

const aboutImage = 'https://placehold.co/800x600/80BFEC/0A3487.png';
const leaderImage = 'https://placehold.co/400x400/80BFEC/0A3487.png';

const locations = [
  { name: 'Mbeya', description: 'Regional programs and parent training' },
  { name: 'Mara', description: 'Early learning and community childcare' },
  { name: 'Mwanjelwa Market', description: 'Public market childcare program' },
];

export function AboutPageContent() {
  return (
    <div className="pt-20">
      {/* Our Story */}
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-20 lg:px-8">
        <h1 className="font-display text-3xl font-semibold text-primary md:text-4xl">
          Our Story
        </h1>
        <div className="mt-8 grid gap-12 lg:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-card">
            <Image
              src={aboutImage}
              alt="WeCARE team and community in Tanzania"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div className="prose prose-neutral max-w-none">
            <p className="text-lg leading-relaxed">
              WeCARE Foundation was created to address the gap in quality early
              childhood development and learning for underserved communities in
              Tanzania. Too many children lack access to safe, stimulating
              environments and trained caregivers—especially in public markets
              and informal settlements.
            </p>
            <p className="mt-4 text-lg leading-relaxed">
              We work with parents, community leaders, government, and partners
              to design and implement programs that are evidence-based and
              community-led. Our focus is on nutrition, learning, health, and
              safety in the critical early years.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-neutral-50 py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-semibold text-primary md:text-3xl">
            Mission & Vision
          </h2>
          <div className="mt-8 grid gap-8 md:grid-cols-2">
            <div className="rounded-card border border-neutral-200 bg-white p-8">
              <h3 className="font-display text-xl font-semibold text-primary">
                Mission
              </h3>
              <p className="mt-4 text-neutral-700">
                To improve early childhood development and learning for
                underserved communities in Tanzania through community-led
                programs that support children, parents, and caregivers.
              </p>
            </div>
            <div className="rounded-card border border-neutral-200 bg-white p-8">
              <h3 className="font-display text-xl font-semibold text-primary">
                Vision
              </h3>
              <p className="mt-4 text-neutral-700">
                Every child in Tanzania has access to quality early childhood
                experiences that lay a strong foundation for lifelong learning
                and well-being.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-20 lg:px-8">
        <h2 className="font-display text-2xl font-semibold text-primary md:text-3xl">
          Our Approach
        </h2>
        <p className="mt-4 max-w-3xl text-lg text-neutral-700">
          We work with communities, not just in them. Our approach includes:
        </p>
        <ul className="mt-8 space-y-4 text-neutral-700">
          <li className="flex gap-3">
            <span className="text-cta">•</span>
            <span><strong>Community-led design</strong> — Programs are shaped by local needs and feedback.</span>
          </li>
          <li className="flex gap-3">
            <span className="text-cta">•</span>
            <span><strong>Partnership</strong> — We collaborate with government, NGOs, and the private sector.</span>
          </li>
          <li className="flex gap-3">
            <span className="text-cta">•</span>
            <span><strong>Evidence-based practice</strong> — We use data and research to improve outcomes.</span>
          </li>
          <li className="flex gap-3">
            <span className="text-cta">•</span>
            <span><strong>Focus on the whole child</strong> — Nutrition, learning, health, and safety together.</span>
          </li>
        </ul>
      </section>

      {/* Team / Leadership */}
      <section className="bg-neutral-50 py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-semibold text-primary md:text-3xl">
            Team
          </h2>
          <p className="mt-2 text-neutral-700">
            Leadership and staff driving our programs.
          </p>
          <div className="mt-10 flex flex-col gap-10 sm:flex-row sm:items-start">
            <div className="relative h-64 w-64 shrink-0 overflow-hidden rounded-card">
              <Image
                src={leaderImage}
                alt="Elizabeth Maginga Thobias"
                fill
                className="object-cover"
                sizes="256px"
              />
            </div>
            <div>
              <p className="font-display text-xl font-semibold text-primary">
                Elizabeth Maginga Thobias
              </p>
              <p className="text-neutral-600">CEO — WeCARE Foundation</p>
              <blockquote className="mt-6 border-l-4 border-cta pl-6 font-display text-lg italic text-neutral-800">
                &ldquo;Every child deserves the opportunity to grow, learn, and thrive. Through community-driven solutions, WeCARE works with parents and partners to build strong foundations for Tanzania&apos;s future.&rdquo;
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* Governance */}
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-20 lg:px-8">
        <h2 className="font-display text-2xl font-semibold text-primary md:text-3xl">
          Governance
        </h2>
        <p className="mt-4 max-w-3xl text-neutral-700">
          WeCARE Foundation is governed by a board that provides strategic direction and oversight. Our programs are implemented with accountability and transparency. For reports and governance documents, please{' '}
          <Link href="/contact" className="font-medium text-cta hover:underline">
            contact us
          </Link>
          .
        </p>
      </section>

      {/* Where we work */}
      <section className="bg-neutral-50 py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <h2 id="where-we-work" className="font-display text-2xl font-semibold text-primary md:text-3xl">
            Where We Work
          </h2>
          <p className="mt-2 text-neutral-700">
            We operate across Tanzania with a focus on underserved communities.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {locations.map((loc) => (
              <div
                key={loc.name}
                className="flex gap-4 rounded-card border border-neutral-200 bg-white p-6"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-button bg-maya-blue/20 text-primary">
                  <MapPin className="h-6 w-6" aria-hidden />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-primary">
                    {loc.name}
                  </h3>
                  <p className="mt-1 text-neutral-600">{loc.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
