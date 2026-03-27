'use client';

import { useState, useEffect } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { getLeadership, updateLeadership, getApiErrorMessage } from '@/lib/api';
import type { Leadership } from '@/lib/api';
import { ImageUpload } from '@/components/admin/ImageUpload';
import { revalidatePublicSite } from '@/lib/revalidate';

const defaultLeadership: Partial<Leadership> = {
  sectionEyebrow: 'Our Leadership',
  sectionTitle: 'Message from the',
  sectionTitleHighlight: 'CEO',
  photoUrl: '/ceo.png',
  photoAlt: 'Elizabeth Maginga Thobias – CEO WeCare Foundation',
  badgeTitle: 'WeCare\nFoundation',
  badgeSubtitle: 'CEO & Founder',
  eyebrow: 'Founder & Chief Executive Officer',
  name: 'Elizabeth',
  nameHighlight: 'Maginga Thobias',
  paragraphs: [
    'Elizabeth Maginga Thobias is the visionary founder and CEO...',
    'Under her leadership, WeCare has grown from a community initiative...',
    'Elizabeth leads WeCare\'s four core programs...',
  ],
  email: 'Wecarefoundation025@gmail.com',
};

export default function AdminLeadershipPage() {
  const [form, setForm] = useState<Partial<Leadership>>(defaultLeadership);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'ok' | 'err'; text: string } | null>(null);

  useEffect(() => {
    getLeadership()
      .then(setForm)
      .catch(() => setMessage({ type: 'err', text: 'Failed to load leadership.' }))
      .finally(() => setLoading(false));
  }, []);

  const addParagraph = () => setForm((p) => ({ ...p, paragraphs: [...(p.paragraphs ?? []), ''] }));
  const removeParagraph = (i: number) => setForm((p) => ({ ...p, paragraphs: (p.paragraphs ?? []).filter((_, idx) => idx !== i) }));
  const setParagraph = (i: number, v: string) => setForm((p) => ({ ...p, paragraphs: (p.paragraphs ?? []).map((x, idx) => (idx === i ? v : x)) }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    try {
      await updateLeadership(form);
      await revalidatePublicSite();
      setMessage({ type: 'ok', text: 'Leadership saved.' });
    } catch (err) {
      setMessage({ type: 'err', text: getApiErrorMessage(err) });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div>
        <h1 className="text-2xl font-800 text-[var(--blue)]">Leadership</h1>
        <p className="mt-4 text-[var(--g600)]">Loading…</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-800 text-[var(--blue)]">Leadership</h1>
        <p className="mt-1 text-sm text-[var(--g600)]">CEO / founder block. API: GET/PUT /api/leadership.</p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
        {message && (
          <div className={`rounded-lg px-4 py-2 text-sm font-600 ${message.type === 'ok' ? 'bg-[var(--blue-30)] text-[var(--blue)]' : 'bg-[var(--orange-30)] text-[var(--orange)]'}`}>{message.text}</div>
        )}

        <div className="rounded-xl border border-[var(--blue)]/10 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-sm font-700 uppercase tracking-wider text-[var(--blue)]">Section header</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-600 text-[var(--g800)]">Section eyebrow</label>
              <input type="text" value={form.sectionEyebrow} onChange={(e) => setForm((p) => ({ ...p, sectionEyebrow: e.target.value }))} className="w-full rounded-lg border border-[var(--g400)]/40 px-3 py-2 focus:border-[var(--rose)] focus:outline-none focus:ring-1 focus:ring-[var(--rose)]" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-600 text-[var(--g800)]">Section title highlight</label>
              <input type="text" value={form.sectionTitleHighlight} onChange={(e) => setForm((p) => ({ ...p, sectionTitleHighlight: e.target.value }))} className="w-full rounded-lg border border-[var(--g400)]/40 px-3 py-2 focus:border-[var(--rose)] focus:outline-none focus:ring-1 focus:ring-[var(--rose)]" />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1 block text-sm font-600 text-[var(--g800)]">Section title</label>
              <input type="text" value={form.sectionTitle} onChange={(e) => setForm((p) => ({ ...p, sectionTitle: e.target.value }))} className="w-full rounded-lg border border-[var(--g400)]/40 px-3 py-2 focus:border-[var(--rose)] focus:outline-none focus:ring-1 focus:ring-[var(--rose)]" />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-[var(--blue)]/10 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-sm font-700 uppercase tracking-wider text-[var(--blue)]">Photo & badge</h2>
          <div className="space-y-4">
            <ImageUpload
              label="CEO / Founder photo"
              value={form.photoUrl ?? ''}
              onChange={(url) => setForm((p) => ({ ...p, photoUrl: url }))}
            />
            <div>
              <label className="mb-1 block text-sm font-600 text-[var(--g800)]">Photo alt text</label>
              <input type="text" value={form.photoAlt ?? ''} onChange={(e) => setForm((p) => ({ ...p, photoAlt: e.target.value }))} className="w-full rounded-lg border border-[var(--g400)]/40 px-3 py-2 focus:border-[var(--rose)] focus:outline-none focus:ring-1 focus:ring-[var(--rose)]" />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-[var(--blue)]/10 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-sm font-700 uppercase tracking-wider text-[var(--blue)]">Name & bio</h2>
          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-600 text-[var(--g800)]">Eyebrow</label>
              <input type="text" value={form.eyebrow} onChange={(e) => setForm((p) => ({ ...p, eyebrow: e.target.value }))} className="w-full rounded-lg border border-[var(--g400)]/40 px-3 py-2 focus:border-[var(--rose)] focus:outline-none focus:ring-1 focus:ring-[var(--rose)]" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-600 text-[var(--g800)]">Full name</label>
                <input type="text" value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} className="w-full rounded-lg border border-[var(--g400)]/40 px-3 py-2 focus:border-[var(--rose)] focus:outline-none focus:ring-1 focus:ring-[var(--rose)]" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-600 text-[var(--g800)]">Name highlight (word to style)</label>
                <input type="text" value={form.nameHighlight} onChange={(e) => setForm((p) => ({ ...p, nameHighlight: e.target.value }))} className="w-full rounded-lg border border-[var(--g400)]/40 px-3 py-2 focus:border-[var(--rose)] focus:outline-none focus:ring-1 focus:ring-[var(--rose)]" />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-sm font-600 text-[var(--g800)]">Email</label>
              <input type="email" value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} className="w-full rounded-lg border border-[var(--g400)]/40 px-3 py-2 focus:border-[var(--rose)] focus:outline-none focus:ring-1 focus:ring-[var(--rose)]" />
            </div>
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label className="block text-sm font-600 text-[var(--g800)]">Bio paragraphs</label>
                <button type="button" onClick={addParagraph} className="text-sm font-600 text-[var(--rose)] hover:underline">+ Add</button>
              </div>
              {(form.paragraphs ?? []).map((para, i) => (
                <div key={i} className="mb-2 flex gap-2">
                  <textarea rows={2} value={para} onChange={(e) => setParagraph(i, e.target.value)} className="flex-1 rounded-lg border border-[var(--g400)]/40 px-3 py-2 text-sm focus:border-[var(--rose)] focus:outline-none focus:ring-1 focus:ring-[var(--rose)]" />
                  <button type="button" onClick={() => removeParagraph(i)} className="shrink-0 rounded border border-[var(--g400)]/40 px-2 text-[var(--g600)] hover:bg-[var(--orange-30)]">Remove</button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <button type="submit" disabled={saving} className="rounded-lg bg-[var(--rose)] px-5 py-2.5 text-sm font-700 text-white hover:opacity-90 disabled:opacity-60">{saving ? 'Saving…' : 'Save leadership'}</button>
      </form>
    </div>
  );
}
