'use client';

import type { Newsletter as NewsletterData } from '@/lib/api';

export function NewsletterSection({ data }: { data?: NewsletterData | null } = {}) {
  const eyebrow = data?.eyebrow?.trim() || 'Stay Connected';
  const title = data?.title?.trim() || 'Stay Updated With Our Work';
  const description = data?.description?.trim() || 'Receive program updates, impact stories, and ECD insights from WeCare Foundation in Tanzania — straight to your inbox.';
  const placeholder = data?.inputPlaceholder?.trim() || 'Your email address';
  const buttonLabel = data?.buttonLabel?.trim() || 'Subscribe →';
  const disclaimer = data?.disclaimer?.trim() || 'No spam. Unsubscribe anytime. We respect your privacy.';

  const handleSubscribe = () => {
    const input = document.getElementById('nlemail') as HTMLInputElement | null;
    const v = input?.value?.trim() ?? '';
    if (!v || !v.includes('@')) {
      alert('Please enter a valid email.');
      return;
    }
    alert('Thank you for subscribing to WeCare Foundation updates!');
    if (input) input.value = '';
  };

  return (
    <section id="nl">
      <div className="container">
        <div className="nli">
          <p className="ey wh ct">{eyebrow}</p>
          <h2>{title}</h2>
          <p>{description}</p>
          <div className="nlf">
            <input type="email" placeholder={placeholder} id="nlemail" />
            <button type="button" onClick={handleSubscribe}>{buttonLabel}</button>
          </div>
          <p className="note">{disclaimer}</p>
        </div>
      </div>
    </section>
  );
}
