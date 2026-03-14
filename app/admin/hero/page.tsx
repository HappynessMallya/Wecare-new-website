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
import type { HeroSlide } from '@/lib/api';
import { ImageUpload } from '@/components/admin/ImageUpload';

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
            Manage hero carousel slides. Order is used for display order.
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
          <div className="rounded-xl border border-[var(--blue)]/10 bg-white shadow-sm overflow-hidden">
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
