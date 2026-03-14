'use client';

import { useState } from 'react';
import { MapPin, Mail, Globe, Phone, Instagram, Facebook, Linkedin, MessageCircle } from 'lucide-react';
import { WHATSAPP_URL, CONTACT_PHONE, SOCIAL_INSTAGRAM, SOCIAL_FACEBOOK, SOCIAL_LINKEDIN } from '@/lib/constants';

export function HomeContact() {
  const [messageSent, setMessageSent] = useState(false);

  const handleSendMessage = () => {
    setMessageSent(true);
  };

  return (
    <section id="contact">
      <div className="container">
        <div className="cg">
          <div className="cl rv">
            <p className="ey">Get In Touch</p>
            <h2>
              Let&apos;s Start a <span>Conversation</span>
            </h2>
            <p>
              Whether you&apos;re a potential funder, partner, researcher, community member, or
              journalist — Elizabeth and the WeCare team would love to hear from you.
            </p>
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
            <h3>Send Us a Message</h3>
            <div className="frow">
              <div className="ff">
                <label>Full Name *</label>
                <input type="text" placeholder="Your full name" />
              </div>
              <div className="ff">
                <label>Organization</label>
                <input type="text" placeholder="Your organization" />
              </div>
            </div>
            <div className="ff">
              <label>Email Address *</label>
              <input type="email" placeholder="your@email.com" />
            </div>
            <div className="ff">
              <label>Inquiry Type</label>
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
              <label>Message *</label>
              <textarea placeholder="Tell us how you'd like to connect or support WeCare Foundation in Tanzania..." />
            </div>
            <button type="button" className="fsub" onClick={handleSendMessage}>
              Send Message →
            </button>
            {messageSent && (
              <div className="cfbox-ack" role="status">
                <p className="cfbox-ack-text">Your message will be delivered. For a quick response, please click the button below to reach us on WhatsApp instantly.</p>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="cfbox-wabtn">
                  <MessageCircle className="cfbox-wabtn-ico" size={20} aria-hidden />
                  Chat on WhatsApp — {CONTACT_PHONE}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

