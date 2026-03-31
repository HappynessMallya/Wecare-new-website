'use client';

import { useState } from 'react';
import { MapPin, Mail, Globe2, Phone, MessageCircle } from 'lucide-react';
import { WHATSAPP_URL, CONTACT_PHONE } from '@/lib/constants';
import type { ContactSection, Settings } from '@/lib/api';

export function HomeContact({ data, settings }: { data?: ContactSection | null; settings?: Settings | null } = {}) {
  const [messageSent, setMessageSent] = useState(false);
  const eyebrow = data?.eyebrow?.trim() || 'Get In Touch';
  const title = data?.title?.trim() || "Let's Start a";
  const titleHighlight = data?.titleHighlight?.trim() || 'Conversation';
  const intro = data?.intro?.trim() || "Whether you're a potential funder, partner, researcher, community member, or journalist — Elizabeth and the WeCare team would love to hear from you.";
  const formTitle = data?.formTitle?.trim() || 'Send us a message';
  const fullNameLabel = data?.fullNameLabel?.trim() || 'Full Name *';
  const organizationLabel = data?.organizationLabel?.trim() || 'Organization';
  const emailLabel = data?.emailLabel?.trim() || 'Email Address *';
  const inquiryTypeLabel = data?.inquiryTypeLabel?.trim() || 'Inquiry Type';
  const messageLabel = data?.messageLabel?.trim() || 'Message *';
  const submitLabel = data?.submitLabel?.trim() || 'Send Message →';
  const successMessage = data?.successMessage?.trim() || "Your message will be delivered. For a quick response, please click the button below to reach us on WhatsApp instantly.";

  const whatsappUrl = settings?.whatsappUrl || WHATSAPP_URL;
  const contactPhone = settings?.contactPhone || CONTACT_PHONE;
  const contactEmail = settings?.contactEmail || 'info@wecare.or.tz';
  const officeLocation = settings?.officeLocation || 'Mbeya, Tanzania';
  const regionsActive = settings?.regionsActive || 'Mbeya & Mara, Tanzania';

  const whatsappButtonLabel = data?.whatsappButtonLabel?.trim() || `Chat on WhatsApp — ${contactPhone}`;

  return (
    <section id="contact" className="contact">
      <div className="contact-inner">
        <div className="contact-info rv">
          <div className="eyebrow">{eyebrow}</div>
          <h2 className="section-title">{title} <span className="accent">{titleHighlight}</span></h2>
          <p className="section-sub">{intro}</p>
          <div style={{ marginTop: 40 }}>
            <div className="contact-row">
              <div className="contact-icon"><MapPin size={18} aria-hidden /></div>
              <div>
                <div className="contact-row-label">Office Location</div>
                <div className="contact-row-val">{officeLocation}</div>
              </div>
            </div>
            <div className="contact-row">
              <div className="contact-icon"><Mail size={18} aria-hidden /></div>
              <div>
                <div className="contact-row-label">CEO Email</div>
                <div className="contact-row-val">{contactEmail}</div>
              </div>
            </div>
            <div className="contact-row">
              <div className="contact-icon"><Globe2 size={18} aria-hidden /></div>
              <div>
                <div className="contact-row-label">Active Regions</div>
                <div className="contact-row-val">{regionsActive}</div>
              </div>
            </div>
            <div className="contact-row">
              <div className="contact-icon"><Phone size={18} aria-hidden /></div>
              <div>
                <div className="contact-row-label">Phone / WhatsApp</div>
                <div className="contact-row-val">{contactPhone}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="contact-form-card rv d1">
          <div className="form-title">{formTitle}</div>
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">{fullNameLabel}</label>
              <input className="form-input" type="text" placeholder="Your full name" />
            </div>
            <div className="form-group">
              <label className="form-label">{organizationLabel}</label>
              <input className="form-input" type="text" placeholder="Your organization" />
            </div>
            <div className="form-group">
              <label className="form-label">{emailLabel}</label>
              <input className="form-input" type="email" placeholder="your@email.com" />
            </div>
            <div className="form-group">
              <label className="form-label">{inquiryTypeLabel}</label>
              <select className="form-select" defaultValue="">
                <option value="">Partnership</option>
                <option>Funding / Donation</option>
                <option>Research</option>
                <option>Media / Press</option>
                <option>Community</option>
                <option>Other</option>
              </select>
            </div>
            <div className="form-group full">
              <label className="form-label">{messageLabel}</label>
              <textarea className="form-textarea" placeholder="Tell us about your inquiry..." />
            </div>
          </div>
          <button type="button" className="form-submit" onClick={() => setMessageSent(true)}>
            {submitLabel}
          </button>
          {messageSent && (
            <div className="cfbox-ack" role="status">
              <p className="cfbox-ack-text">{successMessage}</p>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="cfbox-wabtn">
                <MessageCircle className="cfbox-wabtn-ico" size={20} aria-hidden />
                {whatsappButtonLabel}
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
