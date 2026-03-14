'use client';

import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, GripVertical } from 'lucide-react';
import { getNav, updateNav, getApiErrorMessage } from '@/lib/api';
import type { NavItem } from '@/lib/api';

export default function AdminNavigationPage() {
  const [items, setItems] = useState<NavItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<NavItem | null>(null);
  const [creating, setCreating] = useState(false);
  const [message, setMessage] = useState<{ type: 'ok' | 'err'; text: string } | null>(null);

  useEffect(() => {
    getNav()
      .then(setItems)
      .catch(() => setMessage({ type: 'err', text: 'Failed to load navigation.' }))
      .finally(() => setLoading(false));
  }, []);

  const closeForm = () => {
    setEditing(null);
    setCreating(false);
  };

  const handleSave = async (payload: { label: string; href: string }) => {
    setMessage(null);
    try {
      if (editing) {
        const next = items.map((i) => (i.id === editing.id ? { ...i, ...payload } : i));
        await updateNav(next);
        setItems(next);
        setMessage({ type: 'ok', text: 'Saved.' });
      } else {
        const newItem: NavItem = { id: `new-${Date.now()}`, ...payload, order: items.length + 1 };
        const next = [...items, newItem];
        await updateNav(next);
        setItems(next);
        setMessage({ type: 'ok', text: 'Added.' });
      }
      closeForm();
    } catch (err) {
      setMessage({ type: 'err', text: getApiErrorMessage(err) });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Remove this nav item?')) return;
    try {
      const next = items.filter((i) => i.id !== id);
      await updateNav(next);
      setItems(next);
      setMessage({ type: 'ok', text: 'Removed.' });
    } catch (err) {
      setMessage({ type: 'err', text: getApiErrorMessage(err) });
    }
  };

  const formTarget = editing ?? (creating ? { id: '', label: '', href: '', order: 0 } : null);

  if (loading) {
    return (
      <div>
        <h1 className="text-2xl font-800 text-[var(--blue)]">Navigation</h1>
        <p className="mt-4 text-[var(--g600)]">Loading…</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-800 text-[var(--blue)]">Navigation</h1>
        <p className="mt-1 text-sm text-[var(--g600)]">Main nav links. API: GET/PUT /api/nav.</p>
      </div>

      {message && (
        <div className={`mb-4 rounded-lg px-4 py-2 text-sm font-600 ${message.type === 'ok' ? 'bg-[var(--blue-30)] text-[var(--blue)]' : 'bg-[var(--orange-30)] text-[var(--orange)]'}`}>{message.text}</div>
      )}

      {formTarget && (
        <NavItemForm initial={formTarget} onSave={handleSave} onCancel={closeForm} isEdit={!!editing} />
      )}

      <div className="mb-4 flex justify-end">
        {!creating && !editing && (
          <button type="button" onClick={() => setCreating(true)} className="inline-flex items-center gap-2 rounded-lg bg-[var(--rose)] px-4 py-2 text-sm font-600 text-white hover:opacity-90">
            <Plus className="h-4 w-4" /> Add link
          </button>
        )}
      </div>

      <div className="rounded-xl border border-[var(--blue)]/10 bg-white shadow-sm overflow-hidden">
        <ul className="divide-y divide-[var(--blue)]/10">
          {items.map((i) => (
            <li key={i.id} className="flex items-center gap-4 p-4">
              <span className="text-[var(--g400)]" aria-hidden><GripVertical className="h-5 w-5" /></span>
              <span className="min-w-0 flex-1 font-600 text-[var(--blue)]">{i.label}</span>
              <span className="text-sm text-[var(--g600)] truncate">{i.href}</span>
              <div className="flex shrink-0 gap-2">
                <button type="button" onClick={() => setEditing(i)} className="rounded p-2 text-[var(--g600)] hover:bg-[var(--rose-15)] hover:text-[var(--rose)]" aria-label="Edit"><Pencil className="h-4 w-4" /></button>
                <button type="button" onClick={() => handleDelete(i.id)} className="rounded p-2 text-[var(--g600)] hover:bg-[var(--orange-30)] hover:text-[var(--orange)]" aria-label="Delete"><Trash2 className="h-4 w-4" /></button>
              </div>
            </li>
          ))}
        </ul>
        {items.length === 0 && !formTarget && <p className="p-8 text-center text-[var(--g600)]">No nav items. Add one above.</p>}
      </div>
    </div>
  );
}

function NavItemForm({
  initial,
  onSave,
  onCancel,
  isEdit,
}: {
  initial: NavItem;
  onSave: (v: { label: string; href: string }) => void;
  onCancel: () => void;
  isEdit: boolean;
}) {
  const [label, setLabel] = useState(initial.label);
  const [href, setHref] = useState(initial.href);
  return (
    <div className="mb-6 rounded-xl border border-[var(--blue)]/10 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-lg font-700 text-[var(--blue)]">{isEdit ? 'Edit nav item' : 'New nav item'}</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-600 text-[var(--g800)]">Label</label>
          <input type="text" value={label} onChange={(e) => setLabel(e.target.value)} className="w-full rounded-lg border border-[var(--g400)]/40 px-3 py-2 focus:border-[var(--rose)] focus:outline-none focus:ring-1 focus:ring-[var(--rose)]" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-600 text-[var(--g800)]">Href</label>
          <input type="text" value={href} onChange={(e) => setHref(e.target.value)} placeholder="#about" className="w-full rounded-lg border border-[var(--g400)]/40 px-3 py-2 focus:border-[var(--rose)] focus:outline-none focus:ring-1 focus:ring-[var(--rose)]" />
        </div>
      </div>
      <div className="mt-4 flex gap-3">
        <button type="button" onClick={() => onSave({ label, href })} className="rounded-lg bg-[var(--rose)] px-4 py-2 text-sm font-600 text-white hover:opacity-90">Save</button>
        <button type="button" onClick={onCancel} className="rounded-lg border border-[var(--g400)]/40 px-4 py-2 text-sm font-600 text-[var(--g800)] hover:bg-[var(--g100)]">Cancel</button>
      </div>
    </div>
  );
}
