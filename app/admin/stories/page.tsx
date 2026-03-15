'use client';

import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, GripVertical } from 'lucide-react';
import {
  getStoriesAdmin,
  getStoriesSection,
  createStory,
  updateStory,
  deleteStory,
  updateStoriesSection,
  getApiErrorMessage,
} from '@/lib/api';
import type { Story, StoriesSection } from '@/lib/api';
import { ImageUpload } from '@/components/admin/ImageUpload';
import { revalidatePublicSite } from '@/lib/revalidate';

export default function AdminStoriesPage() {
  const [section, setSection] = useState<Partial<StoriesSection>>({});
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Story | null>(null);
  const [creating, setCreating] = useState(false);
  const [message, setMessage] = useState<{ type: 'ok' | 'err'; text: string } | null>(null);

  useEffect(() => {
    Promise.all([getStoriesSection(), getStoriesAdmin()])
      .then(([sec, list]) => {
        setSection(sec);
        setStories(list);
      })
      .catch(() => setMessage({ type: 'err', text: 'Failed to load stories.' }))
      .finally(() => setLoading(false));
  }, []);

  const closeForm = () => {
    setEditing(null);
    setCreating(false);
  };

  const handleSaveTestimonial = async (payload: Omit<Story, 'id' | 'order'>) => {
    setMessage(null);
    try {
      if (editing) {
        await updateStory(editing.id, payload);
        setStories((prev) => prev.map((s) => (s.id === editing.id ? { ...s, ...payload } : s)));
        await revalidatePublicSite();
        setMessage({ type: 'ok', text: 'Story updated.' });
      } else {
        const created = await createStory({ ...payload, order: stories.length + 1 });
        setStories((prev) => [...prev, created]);
        await revalidatePublicSite();
        setMessage({ type: 'ok', text: 'Story added.' });
      }
      closeForm();
    } catch (err) {
      setMessage({ type: 'err', text: getApiErrorMessage(err) });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this story?')) return;
    try {
      await deleteStory(id);
      setStories((prev) => prev.filter((s) => s.id !== id));
      await revalidatePublicSite();
      setMessage({ type: 'ok', text: 'Story deleted.' });
    } catch (err) {
      setMessage({ type: 'err', text: getApiErrorMessage(err) });
    }
  };

  const handleSaveSection = async () => {
    setMessage(null);
    try {
      await updateStoriesSection(section);
      await revalidatePublicSite();
      setMessage({ type: 'ok', text: 'Section saved.' });
    } catch (err) {
      setMessage({ type: 'err', text: getApiErrorMessage(err) });
    }
  };

  const formTarget = editing ?? (creating ? { id: '', name: '', role: '', quote: '', imageUrl: '', imageAlt: '', order: 0 } : null);

  if (loading) {
    return (
      <div>
        <h1 className="text-2xl font-800 text-[var(--blue)]">Impact Stories</h1>
        <p className="mt-4 text-[var(--g600)]">Loading…</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-800 text-[var(--blue)]">Impact Stories</h1>
        <p className="mt-1 text-sm text-[var(--g600)]">Section header and testimonial cards. API: /api/stories/section, /api/stories (CRUD + reorder).</p>
      </div>

      {message && (
        <div className={`mb-4 rounded-lg px-4 py-2 text-sm font-600 ${message.type === 'ok' ? 'bg-[var(--blue-30)] text-[var(--blue)]' : 'bg-[var(--orange-30)] text-[var(--orange)]'}`}>{message.text}</div>
      )}

      {/* Section header */}
      <div className="mb-8 rounded-xl border border-[var(--blue)]/10 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-sm font-700 uppercase tracking-wider text-[var(--blue)]">Section header</h2>
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-600 text-[var(--g800)]">Eyebrow</label>
              <input type="text" value={section.eyebrow ?? ''} onChange={(e) => setSection((s) => ({ ...s, eyebrow: e.target.value }))} className="w-full rounded-lg border border-[var(--g400)]/40 px-3 py-2 focus:border-[var(--rose)] focus:outline-none focus:ring-1 focus:ring-[var(--rose)]" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-600 text-[var(--g800)]">Title highlight</label>
              <input type="text" value={section.titleHighlight ?? ''} onChange={(e) => setSection((s) => ({ ...s, titleHighlight: e.target.value }))} className="w-full rounded-lg border border-[var(--g400)]/40 px-3 py-2 focus:border-[var(--rose)] focus:outline-none focus:ring-1 focus:ring-[var(--rose)]" />
            </div>
          </div>
          <div>
            <label className="mb-1 block text-sm font-600 text-[var(--g800)]">Title (full)</label>
            <input type="text" value={section.title ?? ''} onChange={(e) => setSection((s) => ({ ...s, title: e.target.value }))} className="w-full rounded-lg border border-[var(--g400)]/40 px-3 py-2 focus:border-[var(--rose)] focus:outline-none focus:ring-1 focus:ring-[var(--rose)]" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-600 text-[var(--g800)]">Intro italic</label>
            <input type="text" value={section.introItalic ?? ''} onChange={(e) => setSection((s) => ({ ...s, introItalic: e.target.value }))} className="w-full rounded-lg border border-[var(--g400)]/40 px-3 py-2 focus:border-[var(--rose)] focus:outline-none focus:ring-1 focus:ring-[var(--rose)]" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-600 text-[var(--g800)]">Intro paragraph</label>
            <textarea rows={2} value={section.introParagraph ?? ''} onChange={(e) => setSection((s) => ({ ...s, introParagraph: e.target.value }))} className="w-full rounded-lg border border-[var(--g400)]/40 px-3 py-2 focus:border-[var(--rose)] focus:outline-none focus:ring-1 focus:ring-[var(--rose)]" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-600 text-[var(--g800)]">Approach title</label>
            <input type="text" value={section.approachTitle ?? ''} onChange={(e) => setSection((s) => ({ ...s, approachTitle: e.target.value }))} className="w-full rounded-lg border border-[var(--g400)]/40 px-3 py-2 focus:border-[var(--rose)] focus:outline-none focus:ring-1 focus:ring-[var(--rose)]" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-600 text-[var(--g800)]">Approach body</label>
            <textarea rows={2} value={section.approachBody ?? ''} onChange={(e) => setSection((s) => ({ ...s, approachBody: e.target.value }))} className="w-full rounded-lg border border-[var(--g400)]/40 px-3 py-2 focus:border-[var(--rose)] focus:outline-none focus:ring-1 focus:ring-[var(--rose)]" />
          </div>
          <button type="button" onClick={handleSaveSection} className="rounded-lg bg-[var(--blue)] px-4 py-2 text-sm font-600 text-white hover:opacity-90">Save section header</button>
        </div>
      </div>

      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-700 text-[var(--blue)]">Testimonials</h2>
        {!creating && !editing && (
          <button type="button" onClick={() => setCreating(true)} className="inline-flex items-center gap-2 rounded-lg bg-[var(--rose)] px-4 py-2 text-sm font-600 text-white hover:opacity-90"><Plus className="h-4 w-4" /> Add story</button>
        )}
      </div>

      {formTarget && (
        <TestimonialForm initial={formTarget} onSave={handleSaveTestimonial} onCancel={closeForm} isEdit={!!editing} />
      )}

      <div className="rounded-xl border border-[var(--blue)]/10 bg-white shadow-sm overflow-hidden">
        <ul className="divide-y divide-[var(--blue)]/10">
          {stories.map((s) => (
            <li key={s.id} className="flex items-center gap-4 p-4">
              <span className="text-[var(--g400)]" aria-hidden><GripVertical className="h-5 w-5" /></span>
              <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full bg-[var(--g100)]">
                {s.imageUrl ? <img src={s.imageUrl} alt="" className="h-full w-full object-cover" /> : <span className="flex h-full items-center justify-center text-xs text-[var(--g400)]">—</span>}
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-700 text-[var(--blue)]">{s.name}</p>
                <p className="text-sm text-[var(--g600)]">{s.role}</p>
              </div>
              <div className="flex shrink-0 gap-2">
                <button type="button" onClick={() => setEditing(s)} className="rounded p-2 text-[var(--g600)] hover:bg-[var(--rose-15)] hover:text-[var(--rose)]" aria-label="Edit"><Pencil className="h-4 w-4" /></button>
                <button type="button" onClick={() => handleDelete(s.id)} className="rounded p-2 text-[var(--g600)] hover:bg-[var(--orange-30)] hover:text-[var(--orange)]" aria-label="Delete"><Trash2 className="h-4 w-4" /></button>
              </div>
            </li>
          ))}
        </ul>
        {stories.length === 0 && !formTarget && <p className="p-8 text-center text-[var(--g600)]">No stories. Add one above.</p>}
      </div>
    </div>
  );
}

function TestimonialForm({
  initial,
  onSave,
  onCancel,
  isEdit,
}: {
  initial: Story;
  onSave: (v: Omit<Story, 'id' | 'order'>) => void;
  onCancel: () => void;
  isEdit: boolean;
}) {
  const [name, setName] = useState(initial.name);
  const [role, setRole] = useState(initial.role);
  const [quote, setQuote] = useState(initial.quote);
  const [imageUrl, setImageUrl] = useState(initial.imageUrl);
  const [imageAlt, setImageAlt] = useState(initial.imageAlt);
  return (
    <div className="mb-6 rounded-xl border border-[var(--blue)]/10 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-lg font-700 text-[var(--blue)]">{isEdit ? 'Edit testimonial' : 'New testimonial'}</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-600 text-[var(--g800)]">Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-lg border border-[var(--g400)]/40 px-3 py-2 focus:border-[var(--rose)] focus:outline-none focus:ring-1 focus:ring-[var(--rose)]" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-600 text-[var(--g800)]">Role</label>
          <input type="text" value={role} onChange={(e) => setRole(e.target.value)} className="w-full rounded-lg border border-[var(--g400)]/40 px-3 py-2 focus:border-[var(--rose)] focus:outline-none focus:ring-1 focus:ring-[var(--rose)]" />
        </div>
        <div className="sm:col-span-2">
          <label className="mb-1 block text-sm font-600 text-[var(--g800)]">Quote</label>
          <textarea rows={3} value={quote} onChange={(e) => setQuote(e.target.value)} className="w-full rounded-lg border border-[var(--g400)]/40 px-3 py-2 focus:border-[var(--rose)] focus:outline-none focus:ring-1 focus:ring-[var(--rose)]" />
        </div>
        <div>
          <ImageUpload label="Image" value={imageUrl} onChange={setImageUrl} />
        </div>
        <div>
          <label className="mb-1 block text-sm font-600 text-[var(--g800)]">Image alt</label>
          <input type="text" value={imageAlt} onChange={(e) => setImageAlt(e.target.value)} className="w-full rounded-lg border border-[var(--g400)]/40 px-3 py-2 focus:border-[var(--rose)] focus:outline-none focus:ring-1 focus:ring-[var(--rose)]" />
        </div>
      </div>
      <div className="mt-4 flex gap-3">
        <button type="button" onClick={() => onSave({ name, role, quote, imageUrl, imageAlt })} className="rounded-lg bg-[var(--rose)] px-4 py-2 text-sm font-600 text-white hover:opacity-90">Save</button>
        <button type="button" onClick={onCancel} className="rounded-lg border border-[var(--g400)]/40 px-4 py-2 text-sm font-600 text-[var(--g800)] hover:bg-[var(--g100)]">Cancel</button>
      </div>
    </div>
  );
}
