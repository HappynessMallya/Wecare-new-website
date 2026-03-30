'use client';

import { MessageCircle } from 'lucide-react';
import { WHATSAPP_URL } from '@/lib/constants';

export function WhatsAppFloat({ whatsappUrl }: { whatsappUrl?: string | null } = {}) {
  const href = whatsappUrl?.trim() || WHATSAPP_URL;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="wa-float"
      aria-label="Chat on WhatsApp"
      title="Chat on WhatsApp"
    >
      <MessageCircle className="wa-float-ico" size={24} aria-hidden />
      <span className="wa-float-text">Chat</span>
    </a>
  );
}
