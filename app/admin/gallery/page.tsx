'use client';

import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, GripVertical } from 'lucide-react';
import {
  getGalleryAdmin,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
  getApiErrorMessage,
} from '@/lib/api';
import type { GalleryItem } from '@/lib/api';
import { ImageUpload } from '@/components/admin/ImageUpload';

export default function AdminGalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<GalleryItem | null>(null);
  const [creating, setCreating] = useState(false);
  const [message, setMessage] = useState<{ type: 'ok' | 'err'; text: string } | null>(null);

  const load = () => {
    setLoading(true);
    getGalleryAdmin()
      .then(setItems)
      .catch(() => setMessage({ type: 'err', text: 'Failed to load gallery.' }))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const openEdit = (item: GalleryItem) => {
    setEditing(item);
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

  const handleSave = async (payload: { imageUrl: string; alt: string; label: string }) => {
    setMessage(null);
    try {
      if (editing) {
        await updateGalleryItem(editing.id, payload);
        setItems((prev) => prev.map((i) => (i.id === editing.id ? { ...i, ...payload } : i)));
        setMessage({ type: 'ok', text: 'Updated.' });
      } else {
        const created = await createGalleryItem({ ...payload, order: items.length + 1 });
        setItems((prev) => [...prev, created]);
        setMessage({ type: 'ok', text: 'Added.' });
      }
      closeForm();
    } catch (err) {
      setMessage({ type: 'err', text: getApiErrorMessage(err) });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Remove this gallery item?')) return;
    try {
      await deleteGalleryItem(id);
      setItems((prev) => prev.filter((i) => i.id !== id));
      setMessage({ type: 'ok', text: 'Removed.' });
    } catch (err) {
      setMessage({ type: 'err', text: getApiErrorMessage(err) });
    }
  };

  const formTarget = editing ?? (creating ? { id: '', imageUrl: '', alt: '', label: '', order: 0 } : null);

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-800 text-[var(--blue)]">Gallery</h1>
          <p className="mt-1 text-sm text-[var(--g600)]">
            Photo gallery strip. API: GET/POST/PUT/DELETE /api/gallery, PATCH reorder.
          </p>
        </div>
        {!creating && !editing && (
          <button type="button" onClick={openCreate} className="inline-flex items-center gap-2 rounded-lg bg-[var(--rose)] px-4 py-2 text-sm font-600 text-white hover:opacity-90">
            <Plus className="h-4 w-4" /> Add image
          </button>
        )}
      </div>

      {message && (
        <div className={`mb-4 rounded-lg px-4 py-2 text-sm font-600 ${message.type === 'ok' ? 'bg-[var(--blue-30)] text-[var(--blue)]' : 'bg-[var(--orange-30)] text-[var(--orange)]'}`}>
          {message.text}
        </div>
      )}

      {formTarget && (
        <GalleryItemForm initial={formTarget} onSave={handleSave} onCancel={closeForm} isEdit={!!editing} />
      )}

      {loading ? (
        <p className="text-[var(--g600)]">Loading…</p>
      ) : (
      <div className="mt-6 rounded-xl border border-[var(--blue)]/10 bg-white shadow-sm overflow-hidden">
        <ul className="divide-y divide-[var(--blue)]/10">
          {items.map((i) => (
            <li key={i.id} className="flex items-center gap-4 p-4">
              <span className="text-[var(--g400)]" aria-hidden><GripVertical className="h-5 w-5" /></span>
              <div className="h-14 w-24 shrink-0 overflow-hidden rounded bg-[var(--g100)]">
                {i.imageUrl ? <img src={i.imageUrl} alt="" className="h-full w-full object-cover" /> : <span className="flex h-full items-center justify-center text-xs text-[var(--g400)]">No image</span>}
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-600 text-[var(--blue)]">{i.label}</p>
                <p className="text-sm text-[var(--g600)]">{i.alt}</p>
              </div>
              <div className="flex shrink-0 gap-2">
                <button type="button" onClick={() => openEdit(i)} className="rounded p-2 text-[var(--g600)] hover:bg-[var(--rose-15)] hover:text-[var(--rose)]" aria-label="Edit"><Pencil className="h-4 w-4" /></button>
                <button type="button" onClick={() => handleDelete(i.id)} className="rounded p-2 text-[var(--g600)] hover:bg-[var(--orange-30)] hover:text-[var(--orange)]" aria-label="Delete"><Trash2 className="h-4 w-4" /></button>
              </div>
            </li>
          ))}
        </ul>
        {items.length === 0 && !formTarget && <p className="p-8 text-center text-[var(--g600)]">No gallery items. Add one above.</p>}
      </div>
      )}
    </div>
  );
}

function GalleryItemForm({
  initial,
  onSave,
  onCancel,
  isEdit,
}: {
  initial: GalleryItem | { id: string; imageUrl: string; alt: string; label: string; order: number };
  onSave: (v: { imageUrl: string; alt: string; label: string }) => void;
  onCancel: () => void;
  isEdit: boolean;
}) {
  const [imageUrl, setImageUrl] = useState(initial.imageUrl);
  const [alt, setAlt] = useState(initial.alt);
  const [label, setLabel] = useState(initial.label);
  return (
    <div className="rounded-xl border border-[var(--blue)]/10 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-lg font-700 text-[var(--blue)]">{isEdit ? 'Edit gallery item' : 'New gallery item'}</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <ImageUpload label="Image" value={imageUrl} onChange={setImageUrl} />
        </div>
        <div>
          <label className="mb-1 block text-sm font-600 text-[var(--g800)]">Alt text</label>
          <input type="text" value={alt} onChange={(e) => setAlt(e.target.value)} className="w-full rounded-lg border border-[var(--g400)]/40 px-3 py-2 focus:border-[var(--rose)] focus:outline-none focus:ring-1 focus:ring-[var(--rose)]" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-600 text-[var(--g800)]">Label</label>
          <input type="text" value={label} onChange={(e) => setLabel(e.target.value)} className="w-full rounded-lg border border-[var(--g400)]/40 px-3 py-2 focus:border-[var(--rose)] focus:outline-none focus:ring-1 focus:ring-[var(--rose)]" />
        </div>
      </div>
      <div className="mt-4 flex gap-3">
        <button type="button" onClick={() => onSave({ imageUrl, alt, label })} className="rounded-lg bg-[var(--rose)] px-4 py-2 text-sm font-600 text-white hover:opacity-90">Save</button>
        <button type="button" onClick={onCancel} className="rounded-lg border border-[var(--g400)]/40 px-4 py-2 text-sm font-600 text-[var(--g800)] hover:bg-[var(--g100)]">Cancel</button>
      </div>
    </div>
  );
}
