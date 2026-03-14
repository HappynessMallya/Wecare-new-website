'use client';

import { MessageCircle } from 'lucide-react';
import { WHATSAPP_URL } from '@/lib/constants';

export function WhatsAppFloat() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float"
      aria-label="Contact us on WhatsApp"
      title="Contact us on WhatsApp"
    >
      <MessageCircle className="whatsapp-float-ico" size={28} aria-hidden />
      <span className="whatsapp-float-label">WhatsApp</span>
    </a>
  );
}
