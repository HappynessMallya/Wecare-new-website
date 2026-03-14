'use client';

import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, GripVertical } from 'lucide-react';
import { getImpactBar, updateImpactBar, getApiErrorMessage } from '@/lib/api';
import type { ImpactItem } from '@/lib/api';

export default function AdminImpactPage() {
  const [items, setItems] = useState<ImpactItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<ImpactItem | null>(null);
  const [creating, setCreating] = useState(false);
  const [message, setMessage] = useState<{ type: 'ok' | 'err'; text: string } | null>(null);

  const load = () => {
    setLoading(true);
    getImpactBar()
      .then(setItems)
      .catch(() => setMessage({ type: 'err', text: 'Failed to load impact bar.' }))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const openEdit = (item: ImpactItem) => {
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

  const persist = async (nextItems: ImpactItem[]) => {
    setMessage(null);
    try {
      const updated = await updateImpactBar(nextItems);
      setItems(Array.isArray(updated) ? updated : nextItems);
      setMessage({ type: 'ok', text: 'Saved.' });
    } catch (err) {
      setMessage({ type: 'err', text: getApiErrorMessage(err) });
    }
  };

  const handleSave = async (payload: Omit<ImpactItem, 'id' | 'order'>) => {
    if (editing) {
      const next = items.map((i) => (i.id === editing.id ? { ...i, ...payload } : i));
      setItems(next);
      closeForm();
      await persist(next);
    } else {
      const newItem: ImpactItem = {
        id: `new-${Date.now()}`,
        ...payload,
        order: items.length + 1,
      };
      const next = [...items, newItem];
      setItems(next);
      closeForm();
      await persist(next);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Remove this stat?')) return;
    const next = items.filter((i) => i.id !== id);
    setItems(next);
    await persist(next);
  };

  const formTarget = editing ?? (creating ? { id: '', iconEmoji: '•', number: '', suffix: '', label: '', subtitle: '', order: 0 } : null);

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-800 text-[var(--blue)]">Impact Bar</h1>
          <p className="mt-1 text-sm text-[var(--g600)]">
            Stats strip below hero. Changes are saved as a full list.
          </p>
        </div>
        {!creating && !editing && (
          <button type="button" onClick={openCreate} className="inline-flex items-center gap-2 rounded-lg bg-[var(--rose)] px-4 py-2 text-sm font-600 text-white hover:opacity-90">
            <Plus className="h-4 w-4" /> Add stat
          </button>
        )}
      </div>

      {message && (
        <div className={`mb-4 rounded-lg px-4 py-2 text-sm font-600 ${message.type === 'ok' ? 'bg-[var(--blue-30)] text-[var(--blue)]' : 'bg-[var(--orange-30)] text-[var(--orange)]'}`}>
          {message.text}
        </div>
      )}

      {formTarget && (
        <ImpactItemForm initial={formTarget} onSave={handleSave} onCancel={closeForm} isEdit={!!editing} />
      )}

      {loading ? (
        <p className="text-[var(--g600)]">Loading…</p>
      ) : (
        <div className="mt-6 rounded-xl border border-[var(--blue)]/10 bg-white shadow-sm overflow-hidden">
          <ul className="divide-y divide-[var(--blue)]/10">
            {items.map((i) => (
              <li key={i.id} className="flex items-center gap-4 p-4">
                <span className="text-[var(--g400)]" aria-hidden><GripVertical className="h-5 w-5" /></span>
                <span className="text-2xl" role="img" aria-hidden>{i.iconEmoji}</span>
                <div className="min-w-0 flex-1">
                  <p className="font-700 text-[var(--blue)]">{i.number}{i.suffix} {i.label}</p>
                  <p className="text-sm text-[var(--g600)]">{i.subtitle}</p>
                </div>
                <div className="flex shrink-0 gap-2">
                  <button type="button" onClick={() => openEdit(i)} className="rounded p-2 text-[var(--g600)] hover:bg-[var(--rose-15)] hover:text-[var(--rose)]" aria-label="Edit"><Pencil className="h-4 w-4" /></button>
                  <button type="button" onClick={() => handleDelete(i.id)} className="rounded p-2 text-[var(--g600)] hover:bg-[var(--orange-30)] hover:text-[var(--orange)]" aria-label="Delete"><Trash2 className="h-4 w-4" /></button>
                </div>
              </li>
            ))}
          </ul>
          {items.length === 0 && !formTarget && <p className="p-8 text-center text-[var(--g600)]">No items. Add one above.</p>}
        </div>
      )}
    </div>
  );
}

function ImpactItemForm({
  initial,
  onSave,
  onCancel,
  isEdit,
}: {
  initial: ImpactItem;
  onSave: (v: Omit<ImpactItem, 'id' | 'order'>) => void;
  onCancel: () => void;
  isEdit: boolean;
}) {
  const [iconEmoji, setIconEmoji] = useState(initial.iconEmoji);
  const [number, setNumber] = useState(initial.number);
  const [suffix, setSuffix] = useState(initial.suffix);
  const [label, setLabel] = useState(initial.label);
  const [subtitle, setSubtitle] = useState(initial.subtitle);
  return (
    <div className="rounded-xl border border-[var(--blue)]/10 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-lg font-700 text-[var(--blue)]">{isEdit ? 'Edit stat' : 'New stat'}</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-600 text-[var(--g800)]">Icon (emoji)</label>
          <input type="text" value={iconEmoji} onChange={(e) => setIconEmoji(e.target.value)} className="w-20 rounded-lg border border-[var(--g400)]/40 px-3 py-2 text-xl focus:border-[var(--rose)] focus:outline-none focus:ring-1 focus:ring-[var(--rose)]" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-600 text-[var(--g800)]">Number</label>
          <input type="text" value={number} onChange={(e) => setNumber(e.target.value)} placeholder="5000" className="w-full rounded-lg border border-[var(--g400)]/40 px-3 py-2 focus:border-[var(--rose)] focus:outline-none focus:ring-1 focus:ring-[var(--rose)]" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-600 text-[var(--g800)]">Suffix (e.g. +)</label>
          <input type="text" value={suffix} onChange={(e) => setSuffix(e.target.value)} placeholder="+" className="w-full rounded-lg border border-[var(--g400)]/40 px-3 py-2 focus:border-[var(--rose)] focus:outline-none focus:ring-1 focus:ring-[var(--rose)]" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-600 text-[var(--g800)]">Label</label>
          <input type="text" value={label} onChange={(e) => setLabel(e.target.value)} className="w-full rounded-lg border border-[var(--g400)]/40 px-3 py-2 focus:border-[var(--rose)] focus:outline-none focus:ring-1 focus:ring-[var(--rose)]" />
        </div>
        <div className="sm:col-span-2">
          <label className="mb-1 block text-sm font-600 text-[var(--g800)]">Subtitle</label>
          <input type="text" value={subtitle} onChange={(e) => setSubtitle(e.target.value)} className="w-full rounded-lg border border-[var(--g400)]/40 px-3 py-2 focus:border-[var(--rose)] focus:outline-none focus:ring-1 focus:ring-[var(--rose)]" />
        </div>
      </div>
      <div className="mt-4 flex gap-3">
        <button type="button" onClick={() => onSave({ iconEmoji, number, suffix, label, subtitle })} className="rounded-lg bg-[var(--rose)] px-4 py-2 text-sm font-600 text-white hover:opacity-90">Save</button>
        <button type="button" onClick={onCancel} className="rounded-lg border border-[var(--g400)]/40 px-4 py-2 text-sm font-600 text-[var(--g800)] hover:bg-[var(--g100)]">Cancel</button>
      </div>
    </div>
  );
}
