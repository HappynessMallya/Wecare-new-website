'use client';

import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, GripVertical } from 'lucide-react';
import {
  getTickerItems,
  createTickerItem,
  updateTickerItem,
  deleteTickerItem,
  getApiErrorMessage,
} from '@/lib/api';
import type { TickerItem } from '@/lib/api';

export default function AdminTickerPage() {
  const [items, setItems] = useState<TickerItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<TickerItem | null>(null);
  const [creating, setCreating] = useState(false);
  const [message, setMessage] = useState<{ type: 'ok' | 'err'; text: string } | null>(null);

  const load = () => {
    setLoading(true);
    getTickerItems()
      .then(setItems)
      .catch(() => setMessage({ type: 'err', text: 'Failed to load ticker items.' }))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const openEdit = (item: TickerItem) => {
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

  const handleSave = async (payload: { label: string; colorKey: TickerItem['colorKey'] }) => {
    setMessage(null);
    try {
      if (editing) {
        await updateTickerItem(editing.id, payload);
        setItems((prev) => prev.map((i) => (i.id === editing.id ? { ...i, ...payload } : i)));
        setMessage({ type: 'ok', text: 'Item updated.' });
      } else {
        const created = await createTickerItem({ ...payload, order: items.length + 1 });
        setItems((prev) => [...prev, created]);
        setMessage({ type: 'ok', text: 'Item added.' });
      }
      closeForm();
    } catch (err) {
      setMessage({ type: 'err', text: getApiErrorMessage(err) });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Remove this ticker item?')) return;
    try {
      await deleteTickerItem(id);
      setItems((prev) => prev.filter((i) => i.id !== id));
      setMessage({ type: 'ok', text: 'Item removed.' });
    } catch (err) {
      setMessage({ type: 'err', text: getApiErrorMessage(err) });
    }
  };

  const formTarget = editing ?? (creating ? { id: '', label: '', colorKey: 'blue' as const, order: 0 } : null);

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-800 text-[var(--blue)]">SDG Ticker</h1>
          <p className="mt-1 text-sm text-[var(--g600)]">
            Horizontal ticker items below hero.
          </p>
        </div>
        {!creating && !editing && (
          <button
            type="button"
            onClick={openCreate}
            className="inline-flex items-center gap-2 rounded-lg bg-[var(--rose)] px-4 py-2 text-sm font-600 text-white hover:opacity-90"
          >
            <Plus className="h-4 w-4" /> Add item
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

      {formTarget && (
        <TickerItemForm
          initial={formTarget}
          onSave={handleSave}
          onCancel={closeForm}
          isEdit={!!editing}
        />
      )}

      {loading ? (
        <p className="text-[var(--g600)]">Loading…</p>
      ) : (
        <div className="mt-6 rounded-xl border border-[var(--blue)]/10 bg-white shadow-sm overflow-hidden">
          <ul className="divide-y divide-[var(--blue)]/10">
            {items.map((i) => (
              <li key={i.id} className="flex items-center gap-4 p-4">
                <span className="text-[var(--g400)]" aria-hidden><GripVertical className="h-5 w-5" /></span>
                <span className="rounded px-2 py-0.5 text-xs font-600 capitalize" style={{ background: i.colorKey === 'rose' ? 'var(--rose-15)' : i.colorKey === 'blue' ? 'var(--blue-30)' : i.colorKey === 'orange' ? 'var(--orange-30)' : 'var(--azure-25)', color: i.colorKey === 'rose' ? 'var(--rose)' : i.colorKey === 'blue' ? 'var(--blue)' : i.colorKey === 'orange' ? 'var(--orange)' : 'var(--azure)' }}>{i.colorKey}</span>
                <span className="min-w-0 flex-1 text-[var(--g800)]">{i.label}</span>
                <div className="flex shrink-0 gap-2">
                  <button type="button" onClick={() => openEdit(i)} className="rounded p-2 text-[var(--g600)] hover:bg-[var(--rose-15)] hover:text-[var(--rose)]" aria-label="Edit"><Pencil className="h-4 w-4" /></button>
                  <button type="button" onClick={() => handleDelete(i.id)} className="rounded p-2 text-[var(--g600)] hover:bg-[var(--orange-30)] hover:text-[var(--orange)]" aria-label="Delete"><Trash2 className="h-4 w-4" /></button>
                </div>
              </li>
            ))}
          </ul>
          {items.length === 0 && !formTarget && (
            <p className="p-8 text-center text-[var(--g600)]">No ticker items. Add one above.</p>
          )}
        </div>
      )}
    </div>
  );
}

function TickerItemForm({
  initial,
  onSave,
  onCancel,
  isEdit,
}: {
  initial: TickerItem;
  onSave: (v: { label: string; colorKey: TickerItem['colorKey'] }) => void;
  onCancel: () => void;
  isEdit: boolean;
}) {
  const [label, setLabel] = useState(initial.label);
  const [colorKey, setColorKey] = useState<TickerItem['colorKey']>(initial.colorKey);
  return (
    <div className="rounded-xl border border-[var(--blue)]/10 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-lg font-700 text-[var(--blue)]">{isEdit ? 'Edit ticker item' : 'New ticker item'}</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="mb-1 block text-sm font-600 text-[var(--g800)]">Label</label>
          <input type="text" value={label} onChange={(e) => setLabel(e.target.value)} className="w-full rounded-lg border border-[var(--g400)]/40 px-3 py-2 focus:border-[var(--rose)] focus:outline-none focus:ring-1 focus:ring-[var(--rose)]" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-600 text-[var(--g800)]">Color</label>
          <select value={colorKey} onChange={(e) => setColorKey(e.target.value as TickerItem['colorKey'])} className="w-full rounded-lg border border-[var(--g400)]/40 px-3 py-2 focus:border-[var(--rose)] focus:outline-none focus:ring-1 focus:ring-[var(--rose)]">
            <option value="blue">Blue</option>
            <option value="rose">Rose</option>
            <option value="orange">Orange</option>
            <option value="azure">Azure</option>
          </select>
        </div>
      </div>
      <div className="mt-4 flex gap-3">
        <button type="button" onClick={() => onSave({ label, colorKey })} className="rounded-lg bg-[var(--rose)] px-4 py-2 text-sm font-600 text-white hover:opacity-90">Save</button>
        <button type="button" onClick={onCancel} className="rounded-lg border border-[var(--g400)]/40 px-4 py-2 text-sm font-600 text-[var(--g800)] hover:bg-[var(--g100)]">Cancel</button>
      </div>
    </div>
  );
}
