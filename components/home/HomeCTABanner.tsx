'use client';

import { WHATSAPP_URL } from '@/lib/constants';

export function HomeCTABanner() {
  return (
    <section id="ctab">
      <img
        src="/kids.jpg"
        alt="WeCare Foundation children Tanzania – every child deserves a strong start"
        loading="lazy"
      />
      <div className="ov" />
      <div className="container">
        <div className="ctac">
          <h2>
            Every Child Deserves a <span>Strong Start</span> in Life
          </h2>
          <p>
            Join WeCare Foundation in building Tanzania&apos;s next generation — in Mbeya, Mara, and
            beyond. Your support transforms the lives of children and families across Tanzania.
          </p>
          <div className="ctabtns">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn b-rose">
              ❤ Donate Today <span className="arr">→</span>
            </a>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn b-ghost">
              Partner With Us <span className="arr">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
