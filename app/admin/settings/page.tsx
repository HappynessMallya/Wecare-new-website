'use client';

import { useState, useEffect } from 'react';
import { getSettings, updateSettings, getApiErrorMessage } from '@/lib/api';
import type { Settings } from '@/lib/api';
import { ImageUpload } from '@/components/admin/ImageUpload';
import { revalidatePublicSite } from '@/lib/revalidate';

const defaultSettings: Partial<Settings> = {
  siteName: 'WeCare Foundation',
  tagline: "Enriching Children's Lives",
  heroHeadline: "Enriching Every Child's Life & Future",
  logoUrl: '/logo.png',
  contactPhone: '+255 768 257 970',
  whatsappUrl: 'https://wa.me/255768257970',
  contactEmail: 'Wecarefoundation025@gmail.com',
  officeLocation: 'Mbeya, Tanzania',
  regionsActive: 'Mbeya Region & Mara Region, Tanzania',
  socialInstagram: '',
  socialFacebook: '',
  socialLinkedIn: '',
};

export default function AdminSettingsPage() {
  const [form, setForm] = useState<Partial<Settings>>(defaultSettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'ok' | 'err'; text: string } | null>(null);

  useEffect(() => {
    getSettings()
      .then((data) => setForm(data))
      .catch(() => setMessage({ type: 'err', text: 'Failed to load settings.' }))
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    try {
      await updateSettings(form);
      await revalidatePublicSite();
      setMessage({ type: 'ok', text: 'Settings saved.' });
    } catch (err) {
      setMessage({ type: 'err', text: getApiErrorMessage(err) });
    } finally {
      setSaving(false);
    }
  };

  const update = (key: keyof Settings, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  if (loading) {
    return (
      <div>
        <h1 className="text-2xl font-800 text-[var(--blue)]">Settings</h1>
        <p className="mt-4 text-[var(--g600)]">Loading…</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-800 text-[var(--blue)]">Settings</h1>
        <p className="mt-1 text-sm text-[var(--g600)]">
          Site-wide settings: name, logo, contact, social links. Used by navbar, footer, and contact.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="max-w-2xl space-y-6 rounded-xl border border-[var(--blue)]/10 bg-white p-6 shadow-sm">
        {message && (
          <div
            className={`rounded-lg px-4 py-2 text-sm font-600 ${
              message.type === 'ok' ? 'bg-[var(--blue-30)] text-[var(--blue)]' : 'bg-[var(--orange-30)] text-[var(--orange)]'
            }`}
          >
            {message.text}
          </div>
        )}
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-600 text-[var(--blue)]">Site name</label>
            <input
              type="text"
              value={form.siteName ?? ''}
              onChange={(e) => update('siteName', e.target.value)}
              className="w-full rounded-lg border border-[var(--g400)]/40 px-3 py-2 text-[var(--g800)] focus:border-[var(--rose)] focus:outline-none focus:ring-1 focus:ring-[var(--rose)]"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-600 text-[var(--blue)]">Tagline <span className="font-400 text-[var(--g500)]">(footer & navbar)</span></label>
            <input
              type="text"
              value={form.tagline ?? ''}
              onChange={(e) => update('tagline', e.target.value)}
              className="w-full rounded-lg border border-[var(--g400)]/40 px-3 py-2 text-[var(--g800)] focus:border-[var(--rose)] focus:outline-none focus:ring-1 focus:ring-[var(--rose)]"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="mb-1 block text-sm font-600 text-[var(--blue)]">Hero headline <span className="font-400 text-[var(--g500)]">(big title on the home page banner)</span></label>
            <input
              type="text"
              value={form.heroHeadline ?? ''}
              onChange={(e) => update('heroHeadline', e.target.value)}
              className="w-full rounded-lg border border-[var(--g400)]/40 px-3 py-2 text-[var(--g800)] focus:border-[var(--rose)] focus:outline-none focus:ring-1 focus:ring-[var(--rose)]"
              placeholder="Enriching Every Child's Life & Future"
            />
          </div>
        </div>
        <div>
          <ImageUpload
            label="Site logo"
            value={form.logoUrl ?? ''}
            onChange={(url) => update('logoUrl', url)}
          />
        </div>
        <div className="border-t border-[var(--blue)]/10 pt-4">
          <h2 className="mb-3 text-sm font-700 uppercase tracking-wider text-[var(--blue)]">Contact</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-600 text-[var(--g800)]">Phone</label>
              <input
                type="text"
                value={form.contactPhone ?? ''}
                onChange={(e) => update('contactPhone', e.target.value)}
                className="w-full rounded-lg border border-[var(--g400)]/40 px-3 py-2 focus:border-[var(--rose)] focus:outline-none focus:ring-1 focus:ring-[var(--rose)]"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-600 text-[var(--g800)]">WhatsApp URL</label>
              <input
                type="url"
                value={form.whatsappUrl ?? ''}
                onChange={(e) => update('whatsappUrl', e.target.value)}
                className="w-full rounded-lg border border-[var(--g400)]/40 px-3 py-2 focus:border-[var(--rose)] focus:outline-none focus:ring-1 focus:ring-[var(--rose)]"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-600 text-[var(--g800)]">Email</label>
              <input
                type="email"
                value={form.contactEmail ?? ''}
                onChange={(e) => update('contactEmail', e.target.value)}
                className="w-full rounded-lg border border-[var(--g400)]/40 px-3 py-2 focus:border-[var(--rose)] focus:outline-none focus:ring-1 focus:ring-[var(--rose)]"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-600 text-[var(--g800)]">Office location</label>
              <input
                type="text"
                value={form.officeLocation ?? ''}
                onChange={(e) => update('officeLocation', e.target.value)}
                className="w-full rounded-lg border border-[var(--g400)]/40 px-3 py-2 focus:border-[var(--rose)] focus:outline-none focus:ring-1 focus:ring-[var(--rose)]"
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="mb-1 block text-sm font-600 text-[var(--g800)]">Regions active</label>
            <input
              type="text"
              value={form.regionsActive ?? ''}
              onChange={(e) => update('regionsActive', e.target.value)}
              className="w-full rounded-lg border border-[var(--g400)]/40 px-3 py-2 focus:border-[var(--rose)] focus:outline-none focus:ring-1 focus:ring-[var(--rose)]"
            />
          </div>
        </div>
        <div className="border-t border-[var(--blue)]/10 pt-4">
          <h2 className="mb-3 text-sm font-700 uppercase tracking-wider text-[var(--blue)]">Social links</h2>
          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-600 text-[var(--g800)]">Instagram URL</label>
              <input
                type="url"
                value={form.socialInstagram ?? ''}
                onChange={(e) => update('socialInstagram', e.target.value)}
                className="w-full rounded-lg border border-[var(--g400)]/40 px-3 py-2 focus:border-[var(--rose)] focus:outline-none focus:ring-1 focus:ring-[var(--rose)]"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-600 text-[var(--g800)]">Facebook URL</label>
              <input
                type="url"
                value={form.socialFacebook ?? ''}
                onChange={(e) => update('socialFacebook', e.target.value)}
                className="w-full rounded-lg border border-[var(--g400)]/40 px-3 py-2 focus:border-[var(--rose)] focus:outline-none focus:ring-1 focus:ring-[var(--rose)]"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-600 text-[var(--g800)]">LinkedIn URL</label>
              <input
                type="url"
                value={form.socialLinkedIn ?? ''}
                onChange={(e) => update('socialLinkedIn', e.target.value)}
                className="w-full rounded-lg border border-[var(--g400)]/40 px-3 py-2 focus:border-[var(--rose)] focus:outline-none focus:ring-1 focus:ring-[var(--rose)]"
              />
            </div>
          </div>
        </div>
        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={saving}
            className="rounded-lg bg-[var(--rose)] px-5 py-2.5 text-sm font-700 text-white transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {saving ? 'Saving…' : 'Save settings'}
          </button>
        </div>
      </form>
    </div>
  );
}
