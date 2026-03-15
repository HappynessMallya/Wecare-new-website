'use client';

import { useState, useEffect } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { getAbout, updateAbout, getApiErrorMessage } from '@/lib/api';
import type { About, AboutPillar } from '@/lib/api';
import { ImageUpload } from '@/components/admin/ImageUpload';
import { ABOUT_FALLBACK_IMAGES } from '@/lib/fallbacks';

const defaultAbout: Partial<About> = {
  eyebrow: 'Who We Are',
  title: "Tanzania's Community-Led ECD Foundation",
  titleHighlight: 'ECD Foundation',
  tagline: 'Enriching Children\'s Lives — One Family at a Time',
  introParagraph1: '',
  introParagraph2: '',
  missionTitle: 'Our Mission',
  missionBody: '',
  visionTitle: 'Our Vision',
  visionBody: '',
  mainImageUrl: '/parentclinic.jpg',
  secondaryImageUrl: '/kids-at-work.jpg',
  regionsBadgeNumber: '2',
  regionsBadgeLabel: 'Regions\nMbeya & Mara',
  pillars: [],
};

export default function AdminAboutPage() {
  const [form, setForm] = useState<Partial<About>>(defaultAbout);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'ok' | 'err'; text: string } | null>(null);

  useEffect(() => {
    getAbout()
      .then(setForm)
      .catch(() => setMessage({ type: 'err', text: 'Failed to load about.' }))
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    try {
      await updateAbout(form);
      setMessage({ type: 'ok', text: 'About saved.' });
    } catch (err) {
      setMessage({ type: 'err', text: getApiErrorMessage(err) });
    } finally {
      setSaving(false);
    }
  };

  const updatePillar = (id: string, patch: Partial<AboutPillar>) => {
    setForm((prev) => ({
      ...prev,
      pillars: (prev.pillars ?? []).map((p) => (p.id === id ? { ...p, ...patch } : p)),
    }));
  };
  const addPillar = () => {
    setForm((prev) => ({
      ...prev,
      pillars: [
        ...(prev.pillars ?? []),
        { id: `new-${Date.now()}`, title: '', description: '', iconEmoji: '•', colorKey: 'r' },
      ],
    }));
  };
  const removePillar = (id: string) => {
    setForm((prev) => ({ ...prev, pillars: (prev.pillars ?? []).filter((p) => p.id !== id) }));
  };

  if (loading) {
    return (
      <div>
        <h1 className="text-2xl font-800 text-[var(--blue)]">About</h1>
        <p className="mt-4 text-[var(--g600)]">Loading…</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-800 text-[var(--blue)]">About</h1>
        <p className="mt-1 text-sm text-[var(--g600)]">
          Who We Are: intro, mission, vision, images, and value pillars.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
        {message && (
          <div
            className={`rounded-lg px-4 py-2 text-sm font-600 ${
              message.type === 'ok' ? 'bg-[var(--blue-30)] text-[var(--blue)]' : 'bg-[var(--orange-30)] text-[var(--orange)]'
            }`}
          >
            {message.text}
          </div>
        )}
        <div className="rounded-xl border border-[var(--blue)]/10 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-sm font-700 uppercase tracking-wider text-[var(--blue)]">Section header</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-600 text-[var(--g800)]">Eyebrow</label>
              <input
                type="text"
                value={form.eyebrow ?? ''}
                onChange={(e) => setForm((p) => ({ ...p, eyebrow: e.target.value }))}
                className="w-full rounded-lg border border-[var(--g400)]/40 px-3 py-2 focus:border-[var(--rose)] focus:outline-none focus:ring-1 focus:ring-[var(--rose)]"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-600 text-[var(--g800)]">Tagline</label>
              <input
                type="text"
                value={form.tagline ?? ''}
                onChange={(e) => setForm((p) => ({ ...p, tagline: e.target.value }))}
                className="w-full rounded-lg border border-[var(--g400)]/40 px-3 py-2 focus:border-[var(--rose)] focus:outline-none focus:ring-1 focus:ring-[var(--rose)]"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1 block text-sm font-600 text-[var(--g800)]">Title (full)</label>
                              <input
                type="text"
                value={form.title ?? ''}
                onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
                className="w-full rounded-lg border border-[var(--g400)]/40 px-3 py-2 focus:border-[var(--rose)] focus:outline-none focus:ring-1 focus:ring-[var(--rose)]"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-600 text-[var(--g800)]">Title highlight (word to style)</label>
              <input
                type="text"
                value={form.titleHighlight ?? ''}
                onChange={(e) => setForm((p) => ({ ...p, titleHighlight: e.target.value }))}
                className="w-full rounded-lg border border-[var(--g400)]/40 px-3 py-2 focus:border-[var(--rose)] focus:outline-none focus:ring-1 focus:ring-[var(--rose)]"
              />
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-[var(--blue)]/10 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-sm font-700 uppercase tracking-wider text-[var(--blue)]">Intro & Mission / Vision</h2>
          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-600 text-[var(--g800)]">Intro paragraph 1</label>
              <textarea
                rows={3}
                value={form.introParagraph1 ?? ''}
                onChange={(e) => setForm((p) => ({ ...p, introParagraph1: e.target.value }))}
                className="w-full rounded-lg border border-[var(--g400)]/40 px-3 py-2 focus:border-[var(--rose)] focus:outline-none focus:ring-1 focus:ring-[var(--rose)]"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-600 text-[var(--g800)]">Intro paragraph 2</label>
              <textarea
                rows={2}
                value={form.introParagraph2 ?? ''}
                onChange={(e) => setForm((p) => ({ ...p, introParagraph2: e.target.value }))}
                className="w-full rounded-lg border border-[var(--g400)]/40 px-3 py-2 focus:border-[var(--rose)] focus:outline-none focus:ring-1 focus:ring-[var(--rose)]"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-600 text-[var(--g800)]">Mission title</label>
              <input
                type="text"
                value={form.missionTitle ?? ''}
                onChange={(e) => setForm((p) => ({ ...p, missionTitle: e.target.value }))}
                className="w-full rounded-lg border border-[var(--g400)]/40 px-3 py-2 focus:border-[var(--rose)] focus:outline-none focus:ring-1 focus:ring-[var(--rose)]"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-600 text-[var(--g800)]">Mission body</label>
              <textarea
                rows={2}
                value={form.missionBody ?? ''}
                onChange={(e) => setForm((p) => ({ ...p, missionBody: e.target.value }))}
                className="w-full rounded-lg border border-[var(--g400)]/40 px-3 py-2 focus:border-[var(--rose)] focus:outline-none focus:ring-1 focus:ring-[var(--rose)]"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-600 text-[var(--g800)]">Vision title</label>
              <input
                type="text"
                value={form.visionTitle ?? ''}
                onChange={(e) => setForm((p) => ({ ...p, visionTitle: e.target.value }))}
                className="w-full rounded-lg border border-[var(--g400)]/40 px-3 py-2 focus:border-[var(--rose)] focus:outline-none focus:ring-1 focus:ring-[var(--rose)]"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-600 text-[var(--g800)]">Vision body</label>
              <textarea
                rows={2}
                value={form.visionBody ?? ''}
                onChange={(e) => setForm((p) => ({ ...p, visionBody: e.target.value }))}
                className="w-full rounded-lg border border-[var(--g400)]/40 px-3 py-2 focus:border-[var(--rose)] focus:outline-none focus:ring-1 focus:ring-[var(--rose)]"
              />
            </div>
          </div>
        </div>
        {/* Fallback images: shown on public site when API has no data; preview so you can remove from project */}
        <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50/50 p-4">
          <h3 className="mb-2 text-sm font-700 uppercase tracking-wider text-amber-800">Fallback images (code-only)</h3>
          <p className="mb-3 text-xs text-amber-800/90">
            Used on the public About section when the API returns no data. Remove these files from the project when no longer needed.
          </p>
          <div className="flex flex-wrap gap-4">
            {ABOUT_FALLBACK_IMAGES.map(({ label, path }) => (
              <div key={path} className="w-32 overflow-hidden rounded-lg border border-amber-200 bg-white shadow-sm">
                <div className="aspect-[4/3] bg-[var(--g100)]">
                  <img src={path} alt={label} className="h-full w-full object-cover" />
                </div>
                <div className="p-2 text-xs">
                  <p className="font-600 text-[var(--g800)]">{label}</p>
                  <p className="truncate text-[var(--g500)]" title={path}>{path}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-[var(--blue)]/10 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-sm font-700 uppercase tracking-wider text-[var(--blue)]">Images & badge</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <ImageUpload
                label="Main image"
                value={form.mainImageUrl ?? ''}
                onChange={(url) => setForm((p) => ({ ...p, mainImageUrl: url }))}
              />
            </div>
            <div>
              <ImageUpload
                label="Secondary image"
                value={form.secondaryImageUrl ?? ''}
                onChange={(url) => setForm((p) => ({ ...p, secondaryImageUrl: url }))}
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-600 text-[var(--g800)]">Regions badge number</label>
              <input
                type="text"
                value={form.regionsBadgeNumber ?? ''}
                onChange={(e) => setForm((p) => ({ ...p, regionsBadgeNumber: e.target.value }))}
                className="w-full rounded-lg border border-[var(--g400)]/40 px-3 py-2 focus:border-[var(--rose)] focus:outline-none focus:ring-1 focus:ring-[var(--rose)]"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-600 text-[var(--g800)]">Regions badge label (\n for newline)</label>
              <input
                type="text"
                value={(form.regionsBadgeLabel ?? '').replace(/\n/g, '\\n')}
                onChange={(e) => setForm((p) => ({ ...p, regionsBadgeLabel: e.target.value.replace(/\\n/g, '\n') }))}
                className="w-full rounded-lg border border-[var(--g400)]/40 px-3 py-2 focus:border-[var(--rose)] focus:outline-none focus:ring-1 focus:ring-[var(--rose)]"
              />
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-[var(--blue)]/10 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-700 uppercase tracking-wider text-[var(--blue)]">Pillars (value cards)</h2>
            <button
              type="button"
              onClick={addPillar}
              className="inline-flex items-center gap-1 rounded-lg bg-[var(--rose-15)] px-3 py-1.5 text-sm font-600 text-[var(--rose)] hover:bg-[var(--rose)] hover:text-white"
            >
              <Plus className="h-4 w-4" /> Add
            </button>
          </div>
          <div className="space-y-4">
            {(form.pillars ?? []).map((p) => (
              <div key={p.id} className="flex gap-4 rounded-lg border border-[var(--blue)]/10 p-4">
                <div className="grid min-w-0 flex-1 grid-cols-1 gap-3 sm:grid-cols-2">
                  <input
                    type="text"
                    placeholder="Title"
                    value={p.title}
                    onChange={(e) => updatePillar(p.id, { title: e.target.value })}
                    className="rounded-lg border border-[var(--g400)]/40 px-3 py-2 text-sm focus:border-[var(--rose)] focus:outline-none focus:ring-1 focus:ring-[var(--rose)]"
                  />
                  <input
                    type="text"
                    placeholder="Emoji"
                    value={p.iconEmoji}
                    onChange={(e) => updatePillar(p.id, { iconEmoji: e.target.value })}
                    className="w-16 rounded-lg border border-[var(--g400)]/40 px-3 py-2 text-sm focus:border-[var(--rose)] focus:outline-none focus:ring-1 focus:ring-[var(--rose)]"
                  />
                  <div className="sm:col-span-2">
                    <textarea
                      rows={2}
                      placeholder="Description"
                      value={p.description}
                      onChange={(e) => updatePillar(p.id, { description: e.target.value })}
                      className="w-full rounded-lg border border-[var(--g400)]/40 px-3 py-2 text-sm focus:border-[var(--rose)] focus:outline-none focus:ring-1 focus:ring-[var(--rose)]"
                    />
                  </div>
                  <div>
                    <label className="mb-0.5 block text-xs font-600 text-[var(--g600)]">Color</label>
                    <select
                      value={p.colorKey}
                      onChange={(e) => updatePillar(p.id, { colorKey: e.target.value as AboutPillar['colorKey'] })}
                      className="w-full rounded-lg border border-[var(--g400)]/40 px-3 py-2 text-sm focus:border-[var(--rose)] focus:outline-none focus:ring-1 focus:ring-[var(--rose)]"
                    >
                      <option value="r">Rose</option>
                      <option value="b">Blue</option>
                      <option value="a">Azure</option>
                      <option value="o">Orange</option>
                    </select>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => removePillar(p.id)}
                  className="shrink-0 rounded p-2 text-[var(--g400)] hover:bg-[var(--orange-30)] hover:text-[var(--orange)]"
                  aria-label="Remove pillar"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={saving}
            className="rounded-lg bg-[var(--rose)] px-5 py-2.5 text-sm font-700 text-white hover:opacity-90 disabled:opacity-60"
          >
            {saving ? 'Saving…' : 'Save About'}
          </button>
        </div>
      </form>
    </div>
  );
}
