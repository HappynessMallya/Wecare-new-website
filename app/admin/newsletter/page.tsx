'use client';

import { useState, useEffect } from 'react';
import { getNewsletter, updateNewsletter, getApiErrorMessage } from '@/lib/api';
import type { Newsletter } from '@/lib/api';

export default function AdminNewsletterPage() {
  const [form, setForm] = useState<Partial<Newsletter>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'ok' | 'err'; text: string } | null>(null);

  useEffect(() => {
    getNewsletter()
      .then(setForm)
      .catch(() => setMessage({ type: 'err', text: 'Failed to load newsletter.' }))
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    try {
      await updateNewsletter(form);
      setMessage({ type: 'ok', text: 'Newsletter saved.' });
    } catch (err) {
      setMessage({ type: 'err', text: getApiErrorMessage(err) });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div>
        <h1 className="text-2xl font-800 text-[var(--blue)]">Newsletter</h1>
        <p className="mt-4 text-[var(--g600)]">Loading…</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-800 text-[var(--blue)]">Newsletter</h1>
        <p className="mt-1 text-sm text-[var(--g600)]">Newsletter section. API: GET/PUT /api/newsletter.</p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl">
        {message && (
          <div className={`mb-4 rounded-lg px-4 py-2 text-sm font-600 ${message.type === 'ok' ? 'bg-[var(--blue-30)] text-[var(--blue)]' : 'bg-[var(--orange-30)] text-[var(--orange)]'}`}>{message.text}</div>
        )}

        <div className="rounded-xl border border-[var(--blue)]/10 bg-white p-6 shadow-sm space-y-4">
          <div>
            <label className="mb-1 block text-sm font-600 text-[var(--blue)]">Eyebrow</label>
            <input type="text" value={form.eyebrow ?? ''} onChange={(e) => setForm((p) => ({ ...p, eyebrow: e.target.value }))} className="w-full rounded-lg border border-[var(--g400)]/40 px-3 py-2 focus:border-[var(--rose)] focus:outline-none focus:ring-1 focus:ring-[var(--rose)]" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-600 text-[var(--blue)]">Title</label>
            <input type="text" value={form.title ?? ''} onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))} className="w-full rounded-lg border border-[var(--g400)]/40 px-3 py-2 focus:border-[var(--rose)] focus:outline-none focus:ring-1 focus:ring-[var(--rose)]" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-600 text-[var(--g800)]">Description</label>
            <textarea rows={2} value={form.description ?? ''} onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))} className="w-full rounded-lg border border-[var(--g400)]/40 px-3 py-2 focus:border-[var(--rose)] focus:outline-none focus:ring-1 focus:ring-[var(--rose)]" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-600 text-[var(--g800)]">Input placeholder</label>
            <input type="text" value={form.inputPlaceholder ?? ''} onChange={(e) => setForm((p) => ({ ...p, inputPlaceholder: e.target.value }))} className="w-full rounded-lg border border-[var(--g400)]/40 px-3 py-2 focus:border-[var(--rose)] focus:outline-none focus:ring-1 focus:ring-[var(--rose)]" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-600 text-[var(--g800)]">Button label</label>
            <input type="text" value={form.buttonLabel ?? ''} onChange={(e) => setForm((p) => ({ ...p, buttonLabel: e.target.value }))} className="w-full rounded-lg border border-[var(--g400)]/40 px-3 py-2 focus:border-[var(--rose)] focus:outline-none focus:ring-1 focus:ring-[var(--rose)]" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-600 text-[var(--g800)]">Disclaimer</label>
            <input type="text" value={form.disclaimer ?? ''} onChange={(e) => setForm((p) => ({ ...p, disclaimer: e.target.value }))} className="w-full rounded-lg border border-[var(--g400)]/40 px-3 py-2 focus:border-[var(--rose)] focus:outline-none focus:ring-1 focus:ring-[var(--rose)]" />
          </div>
          <button type="submit" disabled={saving} className="rounded-lg bg-[var(--rose)] px-5 py-2.5 text-sm font-700 text-white hover:opacity-90 disabled:opacity-60">{saving ? 'Saving…' : 'Save newsletter'}</button>
        </div>
      </form>
    </div>
  );
}
