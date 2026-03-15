'use client';

import { useState, useEffect } from 'react';
import { getContactSection, updateContactSection, getApiErrorMessage } from '@/lib/api';
import type { ContactSection } from '@/lib/api';
import { revalidatePublicSite } from '@/lib/revalidate';

export default function AdminContactPage() {
  const [form, setForm] = useState<Partial<ContactSection>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'ok' | 'err'; text: string } | null>(null);

  useEffect(() => {
    getContactSection()
      .then(setForm)
      .catch(() => setMessage({ type: 'err', text: 'Failed to load contact section.' }))
      .finally(() => setLoading(false));
  }, []);

  const update = (key: keyof ContactSection, value: string) => setForm((p) => ({ ...p, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    try {
      await updateContactSection(form);
      await revalidatePublicSite();
      setMessage({ type: 'ok', text: 'Contact section saved.' });
    } catch (err) {
      setMessage({ type: 'err', text: getApiErrorMessage(err) });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div>
        <h1 className="text-2xl font-800 text-[var(--blue)]">Contact section</h1>
        <p className="mt-4 text-[var(--g600)]">Loading…</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-800 text-[var(--blue)]">Contact section</h1>
        <p className="mt-1 text-sm text-[var(--g600)]">Labels and copy for the contact block. Phone and WhatsApp URL come from Settings.</p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl">
        {message && (
          <div className={`mb-4 rounded-lg px-4 py-2 text-sm font-600 ${message.type === 'ok' ? 'bg-[var(--blue-30)] text-[var(--blue)]' : 'bg-[var(--orange-30)] text-[var(--orange)]'}`}>{message.text}</div>
        )}

        <div className="rounded-xl border border-[var(--blue)]/10 bg-white p-6 shadow-sm space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-600 text-[var(--blue)]">Eyebrow</label>
              <input type="text" value={form.eyebrow ?? ''} onChange={(e) => update('eyebrow', e.target.value)} className="w-full rounded-lg border border-[var(--g400)]/40 px-3 py-2 focus:border-[var(--rose)] focus:outline-none focus:ring-1 focus:ring-[var(--rose)]" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-600 text-[var(--blue)]">Title highlight</label>
              <input type="text" value={form.titleHighlight ?? ''} onChange={(e) => update('titleHighlight', e.target.value)} className="w-full rounded-lg border border-[var(--g400)]/40 px-3 py-2 focus:border-[var(--rose)] focus:outline-none focus:ring-1 focus:ring-[var(--rose)]" />
            </div>
          </div>
          <div>
            <label className="mb-1 block text-sm font-600 text-[var(--blue)]">Title</label>
            <input type="text" value={form.title ?? ''} onChange={(e) => update('title', e.target.value)} className="w-full rounded-lg border border-[var(--g400)]/40 px-3 py-2 focus:border-[var(--rose)] focus:outline-none focus:ring-1 focus:ring-[var(--rose)]" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-600 text-[var(--g800)]">Intro</label>
            <textarea rows={3} value={form.intro ?? ''} onChange={(e) => update('intro', e.target.value)} className="w-full rounded-lg border border-[var(--g400)]/40 px-3 py-2 focus:border-[var(--rose)] focus:outline-none focus:ring-1 focus:ring-[var(--rose)]" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-600 text-[var(--g800)]">Form title</label>
            <input type="text" value={form.formTitle ?? ''} onChange={(e) => update('formTitle', e.target.value)} className="w-full rounded-lg border border-[var(--g400)]/40 px-3 py-2 focus:border-[var(--rose)] focus:outline-none focus:ring-1 focus:ring-[var(--rose)]" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-600 text-[var(--g800)]">Full name label</label>
              <input type="text" value={form.fullNameLabel ?? ''} onChange={(e) => update('fullNameLabel', e.target.value)} className="w-full rounded-lg border border-[var(--g400)]/40 px-3 py-2 focus:border-[var(--rose)] focus:outline-none focus:ring-1 focus:ring-[var(--rose)]" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-600 text-[var(--g800)]">Organization label</label>
              <input type="text" value={form.organizationLabel ?? ''} onChange={(e) => update('organizationLabel', e.target.value)} className="w-full rounded-lg border border-[var(--g400)]/40 px-3 py-2 focus:border-[var(--rose)] focus:outline-none focus:ring-1 focus:ring-[var(--rose)]" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-600 text-[var(--g800)]">Email label</label>
              <input type="text" value={form.emailLabel ?? ''} onChange={(e) => update('emailLabel', e.target.value)} className="w-full rounded-lg border border-[var(--g400)]/40 px-3 py-2 focus:border-[var(--rose)] focus:outline-none focus:ring-1 focus:ring-[var(--rose)]" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-600 text-[var(--g800)]">Inquiry type label</label>
              <input type="text" value={form.inquiryTypeLabel ?? ''} onChange={(e) => update('inquiryTypeLabel', e.target.value)} className="w-full rounded-lg border border-[var(--g400)]/40 px-3 py-2 focus:border-[var(--rose)] focus:outline-none focus:ring-1 focus:ring-[var(--rose)]" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-600 text-[var(--g800)]">Message label</label>
              <input type="text" value={form.messageLabel ?? ''} onChange={(e) => update('messageLabel', e.target.value)} className="w-full rounded-lg border border-[var(--g400)]/40 px-3 py-2 focus:border-[var(--rose)] focus:outline-none focus:ring-1 focus:ring-[var(--rose)]" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-600 text-[var(--g800)]">Submit button label</label>
              <input type="text" value={form.submitLabel ?? ''} onChange={(e) => update('submitLabel', e.target.value)} className="w-full rounded-lg border border-[var(--g400)]/40 px-3 py-2 focus:border-[var(--rose)] focus:outline-none focus:ring-1 focus:ring-[var(--rose)]" />
            </div>
          </div>
          <div>
            <label className="mb-1 block text-sm font-600 text-[var(--g800)]">Success message</label>
            <textarea rows={2} value={form.successMessage ?? ''} onChange={(e) => update('successMessage', e.target.value)} className="w-full rounded-lg border border-[var(--g400)]/40 px-3 py-2 focus:border-[var(--rose)] focus:outline-none focus:ring-1 focus:ring-[var(--rose)]" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-600 text-[var(--g800)]">WhatsApp button label (prefix before phone)</label>
            <input type="text" value={form.whatsappButtonLabel ?? ''} onChange={(e) => update('whatsappButtonLabel', e.target.value)} className="w-full rounded-lg border border-[var(--g400)]/40 px-3 py-2 focus:border-[var(--rose)] focus:outline-none focus:ring-1 focus:ring-[var(--rose)]" />
          </div>
          <button type="submit" disabled={saving} className="rounded-lg bg-[var(--rose)] px-5 py-2.5 text-sm font-700 text-white hover:opacity-90 disabled:opacity-60">{saving ? 'Saving…' : 'Save contact section'}</button>
        </div>
      </form>
    </div>
  );
}
