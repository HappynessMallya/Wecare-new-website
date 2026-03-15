'use client';

import { useState, useEffect } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { getAbout, updateAbout, getApiErrorMessage } from '@/lib/api';
import type { About, AboutPillar } from '@/lib/api';
import { ImageUpload } from '@/components/admin/ImageUpload';
import { ABOUT_FALLBACK_IMAGES } from '@/lib/fallbacks';
import { revalidatePublicSite } from '@/lib/revalidate';

const defaultAbout: Partial<About> = {
  eyebrow: 'Who We Are',
  title: "Tanzania's Community-Led ECD Foundation",
  titleHighlight: 'ECD Foundation',
  tagline: "Enriching Children's Lives — One Family at a Time",
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

type SectionKey = 'header' | 'intro' | 'mission' | 'images' | 'pillars';

export default function AdminAboutPage() {
  const [form, setForm] = useState<Partial<About>>(defaultAbout);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<SectionKey | null>(null);
  const [msgs, setMsgs] = useState<Partial<Record<SectionKey, { type: 'ok' | 'err'; text: string }>>>({});

  // Split regionsBadgeLabel into two line inputs
  const badgeLabelLines = (form.regionsBadgeLabel ?? '').split('\n');
  const badgeLine1 = badgeLabelLines[0] ?? '';
  const badgeLine2 = badgeLabelLines[1] ?? '';
  const setBadgeLine = (line: 1 | 2, val: string) => {
    const l1 = line === 1 ? val : badgeLine1;
    const l2 = line === 2 ? val : badgeLine2;
    setForm((p) => ({ ...p, regionsBadgeLabel: l2 ? `${l1}\n${l2}` : l1 }));
  };

  useEffect(() => {
    getAbout()
      .then((data) => setForm(data ?? defaultAbout))
      .catch(() => setMsg('header', 'err', 'Failed to load about section.'))
      .finally(() => setLoading(false));
  }, []);

  const setMsg = (key: SectionKey, type: 'ok' | 'err', text: string) =>
    setMsgs((m) => ({ ...m, [key]: { type, text } }));

  const save = async (key: SectionKey) => {
    setSaving(key);
    setMsgs((m) => ({ ...m, [key]: undefined }));
    try {
      await updateAbout(form);
      await revalidatePublicSite();
      setMsg(key, 'ok', 'Saved successfully.');
    } catch (err) {
      setMsg(key, 'err', getApiErrorMessage(err));
    } finally {
      setSaving(null);
    }
  };

  const updatePillar = (id: string, patch: Partial<AboutPillar>) =>
    setForm((prev) => ({
      ...prev,
      pillars: (prev.pillars ?? []).map((p) => (p.id === id ? { ...p, ...patch } : p)),
    }));

  const addPillar = () =>
    setForm((prev) => ({
      ...prev,
      pillars: [
        ...(prev.pillars ?? []),
        { id: `new-${Date.now()}`, title: '', description: '', iconEmoji: '•', colorKey: 'r' },
      ],
    }));

  const removePillar = (id: string) =>
    setForm((prev) => ({ ...prev, pillars: (prev.pillars ?? []).filter((p) => p.id !== id) }));

  if (loading) {
    return (
      <div>
        <h1 className="text-2xl font-800 text-[var(--blue)]">About</h1>
        <p className="mt-4 text-[var(--g600)]">Loading…</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl">
      <div className="mb-8">
        <h1 className="text-2xl font-800 text-[var(--blue)]">About</h1>
        <p className="mt-1 text-sm text-[var(--g600)]">
          Who We Are section — edit each card independently and save it on its own.
        </p>
      </div>

      <div className="space-y-6">

        {/* ── 1. Section header ── */}
        <Card
          title="Section header"
          hint="Labels and title shown at the top of the Who We Are block."
          msg={msgs.header}
          saving={saving === 'header'}
          onSave={() => save('header')}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Eyebrow (small label above title)">
              <input
                type="text"
                value={form.eyebrow ?? ''}
                onChange={(e) => setForm((p) => ({ ...p, eyebrow: e.target.value }))}
                className={inputCls}
              />
            </Field>
            <Field label="Tagline (italic line below title)">
              <input
                type="text"
                value={form.tagline ?? ''}
                onChange={(e) => setForm((p) => ({ ...p, tagline: e.target.value }))}
                className={inputCls}
              />
            </Field>
            <Field label="Full title" className="sm:col-span-2">
              <input
                type="text"
                value={form.title ?? ''}
                onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
                className={inputCls}
              />
            </Field>
            <Field label="Word to highlight in the title">
              <input
                type="text"
                value={form.titleHighlight ?? ''}
                onChange={(e) => setForm((p) => ({ ...p, titleHighlight: e.target.value }))}
                className={inputCls}
                placeholder="e.g. ECD Foundation"
              />
            </Field>
          </div>
        </Card>

        {/* ── 2. Intro paragraphs ── */}
        <Card
          title="Intro paragraphs"
          hint="Two opening paragraphs of the Who We Are section."
          msg={msgs.intro}
          saving={saving === 'intro'}
          onSave={() => save('intro')}
        >
          <div className="space-y-4">
            <Field label="Paragraph 1">
              <textarea
                rows={3}
                value={form.introParagraph1 ?? ''}
                onChange={(e) => setForm((p) => ({ ...p, introParagraph1: e.target.value }))}
                className={inputCls}
              />
            </Field>
            <Field label="Paragraph 2">
              <textarea
                rows={2}
                value={form.introParagraph2 ?? ''}
                onChange={(e) => setForm((p) => ({ ...p, introParagraph2: e.target.value }))}
                className={inputCls}
              />
            </Field>
          </div>
        </Card>

        {/* ── 3. Mission & Vision ── */}
        <Card
          title="Mission & Vision"
          hint="Displayed as two highlighted boxes beside the intro text."
          msg={msgs.mission}
          saving={saving === 'mission'}
          onSave={() => save('mission')}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Mission title">
              <input
                type="text"
                value={form.missionTitle ?? ''}
                onChange={(e) => setForm((p) => ({ ...p, missionTitle: e.target.value }))}
                className={inputCls}
              />
            </Field>
            <Field label="Vision title">
              <input
                type="text"
                value={form.visionTitle ?? ''}
                onChange={(e) => setForm((p) => ({ ...p, visionTitle: e.target.value }))}
                className={inputCls}
              />
            </Field>
            <Field label="Mission body">
              <textarea
                rows={3}
                value={form.missionBody ?? ''}
                onChange={(e) => setForm((p) => ({ ...p, missionBody: e.target.value }))}
                className={inputCls}
              />
            </Field>
            <Field label="Vision body">
              <textarea
                rows={3}
                value={form.visionBody ?? ''}
                onChange={(e) => setForm((p) => ({ ...p, visionBody: e.target.value }))}
                className={inputCls}
              />
            </Field>
          </div>
        </Card>

        {/* ── 4. Images & badge ── */}
        <Card
          title="Photos & regions badge"
          hint="The two photos shown in the image collage and the badge overlay."
          msg={msgs.images}
          saving={saving === 'images'}
          onSave={() => save('images')}
        >
          <div className="grid gap-6 sm:grid-cols-2">
            <ImageUpload
              label="Main photo"
              value={form.mainImageUrl ?? ''}
              onChange={(url) => setForm((p) => ({ ...p, mainImageUrl: url }))}
            />
            <ImageUpload
              label="Secondary photo"
              value={form.secondaryImageUrl ?? ''}
              onChange={(url) => setForm((p) => ({ ...p, secondaryImageUrl: url }))}
            />
          </div>
          <div className="mt-4 rounded-lg border border-[var(--blue)]/10 bg-[var(--g50,#f9fafb)] p-4">
            <p className="mb-3 text-xs font-600 uppercase tracking-wider text-[var(--g600)]">Regions badge (overlay on photo)</p>
            <div className="grid gap-3 sm:grid-cols-3">
              <Field label="Number">
                <input
                  type="text"
                  value={form.regionsBadgeNumber ?? ''}
                  onChange={(e) => setForm((p) => ({ ...p, regionsBadgeNumber: e.target.value }))}
                  className={inputCls}
                  placeholder="2"
                />
              </Field>
              <Field label="Label line 1">
                <input
                  type="text"
                  value={badgeLine1}
                  onChange={(e) => setBadgeLine(1, e.target.value)}
                  className={inputCls}
                  placeholder="Regions"
                />
              </Field>
              <Field label="Label line 2">
                <input
                  type="text"
                  value={badgeLine2}
                  onChange={(e) => setBadgeLine(2, e.target.value)}
                  className={inputCls}
                  placeholder="Mbeya & Mara"
                />
              </Field>
            </div>
          </div>

          {/* Fallback images reference */}
          <details className="mt-4">
            <summary className="cursor-pointer text-xs font-600 text-amber-700 hover:underline">
              Fallback images (used when no API data)
            </summary>
            <div className="mt-3 flex flex-wrap gap-3">
              {ABOUT_FALLBACK_IMAGES.map(({ label, path }) => (
                <div key={path} className="w-28 overflow-hidden rounded-lg border border-amber-200 bg-white shadow-sm">
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
          </details>
        </Card>

        {/* ── 5. Pillars ── */}
        <Card
          title="Value pillars"
          hint="The coloured cards displayed below the intro text."
          msg={msgs.pillars}
          saving={saving === 'pillars'}
          onSave={() => save('pillars')}
          headerAction={
            <button
              type="button"
              onClick={addPillar}
              className="inline-flex items-center gap-1 rounded-lg bg-[var(--rose-15)] px-3 py-1.5 text-sm font-600 text-[var(--rose)] hover:bg-[var(--rose)] hover:text-white"
            >
              <Plus className="h-4 w-4" /> Add pillar
            </button>
          }
        >
          <div className="space-y-3">
            {(form.pillars ?? []).map((p) => (
              <div key={p.id} className="flex gap-3 rounded-lg border border-[var(--blue)]/10 bg-[var(--g50,#f9fafb)] p-4">
                <div className="grid min-w-0 flex-1 gap-3 sm:grid-cols-2">
                  <input
                    type="text"
                    placeholder="Title"
                    value={p.title}
                    onChange={(e) => updatePillar(p.id, { title: e.target.value })}
                    className={inputCls}
                  />
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Emoji"
                      value={p.iconEmoji}
                      onChange={(e) => updatePillar(p.id, { iconEmoji: e.target.value })}
                      className={`w-16 flex-shrink-0 text-center text-xl ${inputCls}`}
                    />
                    <select
                      value={p.colorKey}
                      onChange={(e) => updatePillar(p.id, { colorKey: e.target.value as AboutPillar['colorKey'] })}
                      className={`flex-1 ${inputCls}`}
                    >
                      <option value="r">Rose</option>
                      <option value="b">Blue</option>
                      <option value="a">Azure</option>
                      <option value="o">Orange</option>
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <textarea
                      rows={2}
                      placeholder="Description"
                      value={p.description}
                      onChange={(e) => updatePillar(p.id, { description: e.target.value })}
                      className={`w-full ${inputCls}`}
                    />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => removePillar(p.id)}
                  className="shrink-0 self-start rounded p-2 text-[var(--g400)] hover:bg-[var(--orange-30)] hover:text-[var(--orange)]"
                  aria-label="Remove pillar"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
            {(form.pillars ?? []).length === 0 && (
              <p className="py-4 text-center text-sm text-[var(--g600)]">No pillars yet. Click &ldquo;Add pillar&rdquo; to create one.</p>
            )}
          </div>
        </Card>

      </div>
    </div>
  );
}

/* ── Shared helpers ── */

const inputCls =
  'w-full rounded-lg border border-[var(--g400)]/40 px-3 py-2 text-sm focus:border-[var(--rose)] focus:outline-none focus:ring-1 focus:ring-[var(--rose)]';

function Field({ label, children, className }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={className}>
      <label className="mb-1 block text-sm font-600 text-[var(--g800)]">{label}</label>
      {children}
    </div>
  );
}

function Card({
  title,
  hint,
  msg,
  saving,
  onSave,
  headerAction,
  children,
}: {
  title: string;
  hint?: string;
  msg?: { type: 'ok' | 'err'; text: string };
  saving: boolean;
  onSave: () => void;
  headerAction?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-[var(--blue)]/10 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-[var(--blue)]/10 px-6 py-4">
        <div>
          <h2 className="text-sm font-700 uppercase tracking-wider text-[var(--blue)]">{title}</h2>
          {hint && <p className="mt-0.5 text-xs text-[var(--g500)]">{hint}</p>}
        </div>
        {headerAction}
      </div>
      <div className="p-6">
        {children}
        <div className="mt-5 flex items-center gap-3">
          <button
            type="button"
            onClick={onSave}
            disabled={saving}
            className="rounded-lg bg-[var(--rose)] px-4 py-2 text-sm font-700 text-white hover:opacity-90 disabled:opacity-60"
          >
            {saving ? 'Saving…' : 'Save'}
          </button>
          {msg && (
            <span
              className={`text-sm font-600 ${msg.type === 'ok' ? 'text-[var(--blue)]' : 'text-[var(--orange)]'}`}
            >
              {msg.type === 'ok' ? '✓' : '✕'} {msg.text}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
