'use client';

import { useState } from 'react';
import { MapPin, Mail, Globe, Phone, Instagram, Facebook, Linkedin, MessageCircle } from 'lucide-react';
import { WHATSAPP_URL, CONTACT_PHONE, SOCIAL_INSTAGRAM, SOCIAL_FACEBOOK, SOCIAL_LINKEDIN } from '@/lib/constants';
import type { ContactSection } from '@/lib/api';

export function HomeContact({ data }: { data?: ContactSection | null } = {}) {
  const [messageSent, setMessageSent] = useState(false);
  const eyebrow = data?.eyebrow?.trim() || 'Get In Touch';
  const title = data?.title?.trim() || "Let's Start a";
  const titleHighlight = data?.titleHighlight?.trim() || 'Conversation';
  const intro = data?.intro?.trim() || "Whether you're a potential funder, partner, researcher, community member, or journalist — Elizabeth and the WeCare team would love to hear from you.";
  const formTitle = data?.formTitle?.trim() || 'Send Us a Message';
  const fullNameLabel = data?.fullNameLabel?.trim() || 'Full Name *';
  const organizationLabel = data?.organizationLabel?.trim() || 'Organization';
  const emailLabel = data?.emailLabel?.trim() || 'Email Address *';
  const inquiryTypeLabel = data?.inquiryTypeLabel?.trim() || 'Inquiry Type';
  const messageLabel = data?.messageLabel?.trim() || 'Message *';
  const submitLabel = data?.submitLabel?.trim() || 'Send Message →';
  const successMessage = data?.successMessage?.trim() || "Your message will be delivered. For a quick response, please click the button below to reach us on WhatsApp instantly.";
  const whatsappButtonLabel = data?.whatsappButtonLabel?.trim() || `Chat on WhatsApp — ${CONTACT_PHONE}`;

  const handleSendMessage = () => {
    setMessageSent(true);
  };

  return (
    <section id="contact">
      <div className="container">
        <div className="cg">
          <div className="cl rv">
            <p className="ey">{eyebrow}</p>
            <h2>{title} <span>{titleHighlight}</span></h2>
            <p>{intro}</p>
            <div className="cdet">
              <div className="crow">
                <div className="cico ci-r"><MapPin className="cico-svg" size={20} aria-hidden /></div>
                <div className="crt">
                  <strong>Office Location</strong>
                  <span>Mbeya, Tanzania</span>
                </div>
              </div>
              <div className="crow">
                <div className="cico ci-b"><Mail className="cico-svg" size={20} aria-hidden /></div>
                <div className="crt">
                  <strong>Email — CEO Elizabeth Maginga</strong>
                  <a href="mailto:Wecarefoundation025@gmail.com">Wecarefoundation025@gmail.com</a>
                </div>
              </div>
              <div className="crow">
                <div className="cico ci-a"><Globe className="cico-svg" size={20} aria-hidden /></div>
                <div className="crt">
                  <strong>Regions Active</strong>
                  <span>Mbeya Region &amp; Mara Region, Tanzania</span>
                </div>
              </div>
              <div className="crow">
                <div className="cico ci-o"><Phone className="cico-svg" size={20} aria-hidden /></div>
                <div className="crt">
                  <strong>Phone — Call or WhatsApp</strong>
                  <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">{CONTACT_PHONE}</a>
                </div>
              </div>
            </div>
            <div className="socs">
              <a className="socb" href={SOCIAL_INSTAGRAM} target="_blank" rel="noopener noreferrer" title="Instagram" aria-label="Instagram">
                <Instagram className="socb-ico" size={20} />
              </a>
              <a className="socb" href={SOCIAL_FACEBOOK} target="_blank" rel="noopener noreferrer" title="Facebook" aria-label="Facebook">
                <Facebook className="socb-ico" size={20} />
              </a>
              <a className="socb" href={SOCIAL_LINKEDIN} target="_blank" rel="noopener noreferrer" title="LinkedIn" aria-label="LinkedIn">
                <Linkedin className="socb-ico" size={20} />
              </a>
            </div>
          </div>
          <div className="cfbox rv d1">
            <h3>{formTitle}</h3>
            <div className="frow">
              <div className="ff">
                <label>{fullNameLabel}</label>
                <input type="text" placeholder="Your full name" />
              </div>
              <div className="ff">
                <label>{organizationLabel}</label>
                <input type="text" placeholder="Your organization" />
              </div>
            </div>
            <div className="ff">
              <label>{emailLabel}</label>
              <input type="email" placeholder="your@email.com" />
            </div>
            <div className="ff">
              <label>{inquiryTypeLabel}</label>
              <select defaultValue="">
                <option value="">Select inquiry type...</option>
                <option>Partnership Opportunity</option>
                <option>Funding / Donation</option>
                <option>Volunteering</option>
                <option>Program Information</option>
                <option>Research &amp; Collaboration</option>
                <option>Media &amp; Press</option>
                <option>General Inquiry</option>
              </select>
            </div>
            <div className="ff">
              <label>{messageLabel}</label>
              <textarea placeholder="Tell us how you'd like to connect or support WeCare Foundation in Tanzania..." />
            </div>
            <button type="button" className="fsub" onClick={handleSendMessage}>
              {submitLabel}
            </button>
            {messageSent && (
              <div className="cfbox-ack" role="status">
                <p className="cfbox-ack-text">{successMessage}</p>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="cfbox-wabtn">
                  <MessageCircle className="cfbox-wabtn-ico" size={20} aria-hidden />
                  {whatsappButtonLabel}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

