'use client';

import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, GripVertical } from 'lucide-react';
import {
  getHeroSlides,
  createHeroSlide,
  updateHeroSlide,
  deleteHeroSlide,
  getApiErrorMessage,
} from '@/lib/api';
import Link from 'next/link';
import type { HeroSlide } from '@/lib/api';
import { ImageUpload } from '@/components/admin/ImageUpload';
import { HERO_FALLBACK_SLIDES } from '@/lib/fallbacks';
import { revalidatePublicSite } from '@/lib/revalidate';

export default function AdminHeroPage() {
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<HeroSlide | null>(null);
  const [creating, setCreating] = useState(false);
  const [message, setMessage] = useState<{ type: 'ok' | 'err'; text: string } | null>(null);

  const load = () => {
    setLoading(true);
    getHeroSlides()
      .then(setSlides)
      .catch(() => setMessage({ type: 'err', text: 'Failed to load slides.' }))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const openEdit = (s: HeroSlide) => {
    setEditing(s);
    setCreating(false);
  };
  const openCreate = () => {
    setEditing(null);
    setCreating(true);
  };
  const closeForm = () => {
    setEditing(null);
    setCreating(false);
  };

  const handleSaveSlide = async (payload: { imageUrl: string; alt: string; title: string; subtitle: string }) => {
    setMessage(null);
    try {
      if (editing) {
        await updateHeroSlide(editing.id, payload);
        setSlides((prev) => prev.map((s) => (s.id === editing.id ? { ...s, ...payload } : s)));
        setMessage({ type: 'ok', text: 'Slide updated.' });
      } else {
        const created = await createHeroSlide({
          ...payload,
          order: slides.length + 1,
          isActive: true,
        });
        setSlides((prev) => [...prev, created]);
        setMessage({ type: 'ok', text: 'Slide added.' });
      }
      await revalidatePublicSite();
      closeForm();
    } catch (err) {
      setMessage({ type: 'err', text: getApiErrorMessage(err) });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this slide?')) return;
    try {
      await deleteHeroSlide(id);
      setSlides((prev) => prev.filter((s) => s.id !== id));
      setMessage({ type: 'ok', text: 'Slide deleted.' });
      await revalidatePublicSite();
    } catch (err) {
      setMessage({ type: 'err', text: getApiErrorMessage(err) });
    }
  };

  const formTarget = editing ?? (creating ? { id: '', imageUrl: '', alt: '', title: '', subtitle: '', order: 0, isActive: true } : null);

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-800 text-[var(--blue)]">Hero</h1>
          <p className="mt-1 text-sm text-[var(--g600)]">
            Each slide has an <strong>image</strong>, a <strong>headline</strong>, and a <strong>tagline</strong> — click the pencil icon on a slide to edit them.
          </p>
          <p className="mt-1 text-sm text-[var(--g600)]">
            The three stat numbers shown on the hero (5000+ parents, etc.) come from{' '}
            <Link href="/admin/impact" className="font-600 text-[var(--rose)] underline">
              Impact Bar
            </Link>
            {' '}— edit them there.
          </p>
        </div>
        {!creating && !editing && (
          <button
            type="button"
            onClick={openCreate}
            className="inline-flex items-center gap-2 rounded-lg bg-[var(--rose)] px-4 py-2 text-sm font-600 text-white hover:opacity-90"
          >
            <Plus className="h-4 w-4" />
            Add slide
          </button>
        )}
      </div>

      {message && (
        <div
          className={`mb-4 rounded-lg px-4 py-2 text-sm font-600 ${
            message.type === 'ok' ? 'bg-[var(--blue-30)] text-[var(--blue)]' : 'bg-[var(--orange-30)] text-[var(--orange)]'
          }`}
        >
          {message.text}
        </div>
      )}

      {loading ? (
        <p className="text-[var(--g600)]">Loading…</p>
      ) : (
        <div className="space-y-6">
          {formTarget && (
            <SlideForm
              initial={formTarget}
              onSave={handleSaveSlide}
              onCancel={closeForm}
              isEdit={!!editing}
            />
          )}
          {/* Fallback slides: shown on public site when API has no data; preview here so you can remove from project */}
          <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-4">
            <h3 className="mb-2 text-sm font-700 uppercase tracking-wider text-amber-800">Fallback slides (code-only)</h3>
            <p className="mb-3 text-xs text-amber-800/90">
              These are used on the public site only when the API returns no data. They live in the codebase (not the database). Preview below to remove the files from your project when you no longer need them.
            </p>
            <div className="flex flex-wrap gap-3">
              {HERO_FALLBACK_SLIDES.map((s) => (
                <div key={s.id} className="w-36 overflow-hidden rounded-lg border border-amber-200 bg-white shadow-sm">
                  <div className="aspect-video bg-[var(--g100)]">
                    <img src={s.imageUrl} alt={s.alt} className="h-full w-full object-cover" />
                  </div>
                  <div className="p-2 text-xs">
                    <p className="font-600 text-[var(--g800)] truncate" title={s.title}>{s.title}</p>
                    <p className="mt-0.5 truncate text-[var(--g500)]" title={s.imageUrl}>{s.imageUrl}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Why new slides might not show on public site */}
          <div className="rounded-xl border border-[var(--blue)]/20 bg-[var(--blue-30)]/30 p-4">
            <h3 className="mb-1 text-sm font-700 text-[var(--blue)]">Slides not showing on the public site?</h3>
            <p className="text-sm text-[var(--g700)]">
              The public site fetches slides without login. It tries <code className="rounded bg-white/60 px-1">/api/hero/slides</code> first, then <code className="rounded bg-white/60 px-1">/api/hero/slides/admin</code>. If both require auth, the request fails and the site shows the fallback slides above. Allow unauthenticated GET on one of these routes so new slides appear. When you save or delete a slide, the public site is revalidated so the next visit shows the update (no need to wait or refresh repeatedly).
            </p>
            <Link href="/#hero" target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-sm font-600 text-[var(--blue)] hover:underline">
              Open public site → Hero
            </Link>
          </div>

          <div className="rounded-xl border border-[var(--blue)]/10 bg-white shadow-sm overflow-hidden">
            <h3 className="border-b border-[var(--blue)]/10 bg-[var(--off)] px-4 py-2 text-sm font-700 text-[var(--blue)]">Slides from API (saved in database)</h3>
            <ul className="divide-y divide-[var(--blue)]/10">
              {slides.map((s) => (
                <li key={s.id} className="flex items-center gap-4 p-4">
                  <span className="text-[var(--g400)]" aria-hidden><GripVertical className="h-5 w-5" /></span>
                  <div className="h-12 w-24 shrink-0 overflow-hidden rounded bg-[var(--g100)]">
                    {s.imageUrl ? (
                      <img src={s.imageUrl} alt="" className="h-full w-full object-cover" />
                    ) : (
                      <span className="flex h-full items-center justify-center text-xs text-[var(--g400)]">No image</span>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-600 text-[var(--blue)]">{s.title}</p>
                    <p className="text-sm text-[var(--g600)]">{s.subtitle}</p>
                  </div>
                  <div className="flex shrink-0 gap-2">
                    <button
                      type="button"
                      onClick={() => openEdit(s)}
                      className="rounded p-2 text-[var(--g600)] hover:bg-[var(--rose-15)] hover:text-[var(--rose)]"
                      aria-label="Edit slide"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(s.id)}
                      className="rounded p-2 text-[var(--g600)] hover:bg-[var(--orange-30)] hover:text-[var(--orange)]"
                      aria-label="Delete slide"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            {slides.length === 0 && !formTarget && (
              <p className="p-8 text-center text-[var(--g600)]">No slides yet. Add one above.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function SlideForm({
  initial,
  onSave,
  onCancel,
  isEdit,
}: {
  initial: HeroSlide | { id: string; imageUrl: string; alt: string; title: string; subtitle: string; order: number; isActive?: boolean };
  onSave: (v: { imageUrl: string; alt: string; title: string; subtitle: string }) => void;
  onCancel: () => void;
  isEdit: boolean;
}) {
  const [imageUrl, setImageUrl] = useState(initial.imageUrl);
  const [alt, setAlt] = useState(initial.alt);
  const [title, setTitle] = useState(initial.title);
  const [subtitle, setSubtitle] = useState(initial.subtitle);

  return (
    <div className="rounded-xl border border-[var(--blue)]/10 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-lg font-700 text-[var(--blue)]">{isEdit ? 'Edit slide' : 'New slide'}</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <ImageUpload
            label="Hero image"
            value={imageUrl}
            onChange={setImageUrl}
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-600 text-[var(--g800)]">Alt text</label>
          <input
            type="text"
            value={alt}
            onChange={(e) => setAlt(e.target.value)}
            className="w-full rounded-lg border border-[var(--g400)]/40 px-3 py-2 focus:border-[var(--rose)] focus:outline-none focus:ring-1 focus:ring-[var(--rose)]"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-600 text-[var(--g800)]">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-lg border border-[var(--g400)]/40 px-3 py-2 focus:border-[var(--rose)] focus:outline-none focus:ring-1 focus:ring-[var(--rose)]"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-600 text-[var(--g800)]">Subtitle</label>
          <input
            type="text"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            className="w-full rounded-lg border border-[var(--g400)]/40 px-3 py-2 focus:border-[var(--rose)] focus:outline-none focus:ring-1 focus:ring-[var(--rose)]"
          />
        </div>
      </div>
      <div className="mt-4 flex gap-3">
        <button
          type="button"
          onClick={() => onSave({ imageUrl, alt, title, subtitle })}
          className="rounded-lg bg-[var(--rose)] px-4 py-2 text-sm font-600 text-white hover:opacity-90"
        >
          Save
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg border border-[var(--g400)]/40 px-4 py-2 text-sm font-600 text-[var(--g800)] hover:bg-[var(--g100)]"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
