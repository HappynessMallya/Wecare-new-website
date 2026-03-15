'use client';

import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, GripVertical, Download } from 'lucide-react';
import {
  getPartnersAdmin,
  getPartnersSection,
  createPartner,
  updatePartner,
  deletePartner,
  updatePartnersSection,
  getApiErrorMessage,
} from '@/lib/api';
import type { Partner, PartnersSection } from '@/lib/api';
import { ImageUpload } from '@/components/admin/ImageUpload';
import { revalidatePublicSite } from '@/lib/revalidate';

const STARTER_PARTNERS: Omit<Partner, 'id'>[] = [
  { name: 'Government of Tanzania', logoUrl: '/GOVERNMENT.svg', logoAlt: 'Government of Tanzania', textOnly: false, order: 1 },
  { name: 'TECDEN', logoUrl: '/TECDEN.png', logoAlt: 'TECDEN', textOnly: false, order: 2 },
  { name: 'Helvetas Tanzania', logoUrl: '/HELVETAS.png', logoAlt: 'Helvetas Tanzania', textOnly: false, order: 3 },
  { name: 'Global School Forum', logoUrl: '/GSF.svg', logoAlt: 'Global School Forum', textOnly: false, order: 4 },
  { name: 'Pediatric Association of Tanzania', logoUrl: '/PEDITRICIAN.png', logoAlt: 'Pediatric Association of Tanzania', textOnly: false, order: 5 },
  { name: 'Parents', logoUrl: null, logoAlt: null, textOnly: true, order: 6 },
];

export default function AdminPartnersPage() {
  const [section, setSection] = useState<Partial<PartnersSection>>({});
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [seeding, setSeeding] = useState(false);
  const [editing, setEditing] = useState<Partner | null>(null);
  const [creating, setCreating] = useState(false);
  const [message, setMessage] = useState<{ type: 'ok' | 'err'; text: string } | null>(null);

  useEffect(() => {
    Promise.all([getPartnersSection(), getPartnersAdmin()])
      .then(([sec, list]) => {
        setSection(sec);
        setPartners(list);
      })
      .catch(() => setMessage({ type: 'err', text: 'Failed to load partners.' }))
      .finally(() => setLoading(false));
  }, []);

  const closeForm = () => {
    setEditing(null);
    setCreating(false);
  };

  const handleSave = async (payload: Omit<Partner, 'id' | 'order'>) => {
    setMessage(null);
    try {
      if (editing) {
        await updatePartner(editing.id, payload);
        setPartners((prev) => prev.map((p) => (p.id === editing.id ? { ...p, ...payload } : p)));
        await revalidatePublicSite();
        setMessage({ type: 'ok', text: 'Partner updated.' });
      } else {
        const created = await createPartner({ ...payload, order: partners.length + 1 });
        setPartners((prev) => [...prev, created]);
        await revalidatePublicSite();
        setMessage({ type: 'ok', text: 'Partner added.' });
      }
      closeForm();
    } catch (err) {
      setMessage({ type: 'err', text: getApiErrorMessage(err) });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Remove this partner?')) return;
    try {
      await deletePartner(id);
      setPartners((prev) => prev.filter((p) => p.id !== id));
      await revalidatePublicSite();
      setMessage({ type: 'ok', text: 'Partner removed.' });
    } catch (err) {
      setMessage({ type: 'err', text: getApiErrorMessage(err) });
    }
  };

  const handleSeedDefaults = async () => {
    if (!confirm('This will add the 6 default partners to your database so you can edit or delete them. Continue?')) return;
    setSeeding(true);
    setMessage(null);
    try {
      const created: Partner[] = [];
      for (const p of STARTER_PARTNERS) {
        const result = await createPartner(p);
        created.push(result);
      }
      setPartners((prev) => [...prev, ...created]);
      await revalidatePublicSite();
      setMessage({ type: 'ok', text: 'Default partners added. You can now edit or delete each one.' });
    } catch (err) {
      setMessage({ type: 'err', text: getApiErrorMessage(err) });
    } finally {
      setSeeding(false);
    }
  };

  const formTarget = editing ?? (creating ? { id: '', name: '', logoUrl: null as string | null, logoAlt: null as string | null, textOnly: false, order: 0 } : null);

  if (loading) {
    return (
      <div>
        <h1 className="text-2xl font-800 text-[var(--blue)]">Partners</h1>
        <p className="mt-4 text-[var(--g600)]">Loading…</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-800 text-[var(--blue)]">Partners</h1>
        <p className="mt-1 text-sm text-[var(--g600)]">Section header and partners list. API: /api/partners/section, /api/partners (CRUD + reorder).</p>
      </div>

      {message && (
        <div className={`mb-4 rounded-lg px-4 py-2 text-sm font-600 ${message.type === 'ok' ? 'bg-[var(--blue-30)] text-[var(--blue)]' : 'bg-[var(--orange-30)] text-[var(--orange)]'}`}>{message.text}</div>
      )}

      <div className="mb-8 rounded-xl border border-[var(--blue)]/10 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-sm font-700 uppercase tracking-wider text-[var(--blue)]">Section header</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-600 text-[var(--g800)]">Eyebrow</label>
            <input type="text" value={section.eyebrow ?? ''} onChange={(e) => setSection((s) => ({ ...s, eyebrow: e.target.value }))} className="w-full rounded-lg border border-[var(--g400)]/40 px-3 py-2 focus:border-[var(--rose)] focus:outline-none focus:ring-1 focus:ring-[var(--rose)]" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-600 text-[var(--g800)]">Title</label>
            <input type="text" value={section.title ?? ''} onChange={(e) => setSection((s) => ({ ...s, title: e.target.value }))} className="w-full rounded-lg border border-[var(--g400)]/40 px-3 py-2 focus:border-[var(--rose)] focus:outline-none focus:ring-1 focus:ring-[var(--rose)]" />
          </div>
          <div className="sm:col-span-2">
            <label className="mb-1 block text-sm font-600 text-[var(--g800)]">Subtitle</label>
            <input type="text" value={section.subtitle ?? ''} onChange={(e) => setSection((s) => ({ ...s, subtitle: e.target.value }))} className="w-full rounded-lg border border-[var(--g400)]/40 px-3 py-2 focus:border-[var(--rose)] focus:outline-none focus:ring-1 focus:ring-[var(--rose)]" />
          </div>
        </div>
        <button type="button" onClick={async () => { setMessage(null); try { await updatePartnersSection(section); await revalidatePublicSite(); setMessage({ type: 'ok', text: 'Section saved.' }); } catch (err) { setMessage({ type: 'err', text: getApiErrorMessage(err) }); } }} className="mt-4 rounded-lg bg-[var(--blue)] px-4 py-2 text-sm font-600 text-white hover:opacity-90">Save section header</button>
      </div>

      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-700 text-[var(--blue)]">Partners</h2>
        {!creating && !editing && (
          <button type="button" onClick={() => setCreating(true)} className="inline-flex items-center gap-2 rounded-lg bg-[var(--rose)] px-4 py-2 text-sm font-600 text-white hover:opacity-90"><Plus className="h-4 w-4" /> Add partner</button>
        )}
      </div>

      {formTarget && (
        <PartnerForm initial={formTarget} onSave={handleSave} onCancel={closeForm} isEdit={!!editing} />
      )}

      <div className="rounded-xl border border-[var(--blue)]/10 bg-white shadow-sm overflow-hidden">
        <ul className="divide-y divide-[var(--blue)]/10">
          {partners.map((p) => (
            <li key={p.id} className="flex items-center gap-4 p-4">
              <span className="text-[var(--g400)]" aria-hidden><GripVertical className="h-5 w-5" /></span>
              {p.logoUrl ? (
                <div className="h-10 w-20 shrink-0 overflow-hidden rounded bg-[var(--g100)] flex items-center justify-center">
                  <img src={p.logoUrl} alt={p.logoAlt || ''} className="max-h-8 max-w-full object-contain" />
                </div>
              ) : (
                <span className="text-sm text-[var(--g400)]">Text only</span>
              )}
              <span className="min-w-0 flex-1 font-600 text-[var(--blue)]">{p.name}</span>
              <div className="flex shrink-0 gap-2">
                <button type="button" onClick={() => setEditing(p)} className="rounded p-2 text-[var(--g600)] hover:bg-[var(--rose-15)] hover:text-[var(--rose)]" aria-label="Edit"><Pencil className="h-4 w-4" /></button>
                <button type="button" onClick={() => handleDelete(p.id)} className="rounded p-2 text-[var(--g600)] hover:bg-[var(--orange-30)] hover:text-[var(--orange)]" aria-label="Delete"><Trash2 className="h-4 w-4" /></button>
              </div>
            </li>
          ))}
        </ul>
        {partners.length === 0 && !formTarget && (
          <div className="p-8 text-center">
            <p className="mb-1 font-600 text-[var(--g800)]">No partners in database yet.</p>
            <p className="mb-5 text-sm text-[var(--g600)]">
              The public website is currently showing 6 built-in default partners (Government of Tanzania, TECDEN, Helvetas, etc.).
              Load them here to manage, edit, or delete them.
            </p>
            <button
              type="button"
              onClick={handleSeedDefaults}
              disabled={seeding}
              className="inline-flex items-center gap-2 rounded-lg bg-[var(--blue)] px-5 py-2.5 text-sm font-700 text-white hover:opacity-90 disabled:opacity-60"
            >
              <Download className="h-4 w-4" />
              {seeding ? 'Loading partners…' : 'Load default partners into database'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function PartnerForm({
  initial,
  onSave,
  onCancel,
  isEdit,
}: {
  initial: Partner | { id: string; name: string; logoUrl: string | null; logoAlt: string | null; textOnly: boolean; order: number };
  onSave: (v: Omit<Partner, 'id' | 'order'>) => void;
  onCancel: () => void;
  isEdit: boolean;
}) {
  const [name, setName] = useState(initial.name);
  const [textOnly, setTextOnly] = useState(initial.textOnly);
  const [logoUrl, setLogoUrl] = useState(initial.logoUrl ?? '');
  const [logoAlt, setLogoAlt] = useState(initial.logoAlt ?? '');
  return (
    <div className="mb-6 rounded-xl border border-[var(--blue)]/10 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-lg font-700 text-[var(--blue)]">{isEdit ? 'Edit partner' : 'New partner'}</h2>
      <div className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-600 text-[var(--g800)]">Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-lg border border-[var(--g400)]/40 px-3 py-2 focus:border-[var(--rose)] focus:outline-none focus:ring-1 focus:ring-[var(--rose)]" />
        </div>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={textOnly} onChange={(e) => setTextOnly(e.target.checked)} className="rounded border-[var(--g400)]" />
          <span className="text-sm font-600 text-[var(--g800)]">Text only (no logo)</span>
        </label>
        {!textOnly && (
          <>
            <div>
              <ImageUpload label="Logo" value={logoUrl} onChange={setLogoUrl} />
            </div>
            <div>
              <label className="mb-1 block text-sm font-600 text-[var(--g800)]">Logo alt</label>
              <input type="text" value={logoAlt} onChange={(e) => setLogoAlt(e.target.value)} className="w-full rounded-lg border border-[var(--g400)]/40 px-3 py-2 focus:border-[var(--rose)] focus:outline-none focus:ring-1 focus:ring-[var(--rose)]" />
            </div>
          </>
        )}
      </div>
      <div className="mt-4 flex gap-3">
        <button type="button" onClick={() => onSave({ name, textOnly, logoUrl: textOnly ? null : logoUrl || null, logoAlt: textOnly ? null : logoAlt || null })} className="rounded-lg bg-[var(--rose)] px-4 py-2 text-sm font-600 text-white hover:opacity-90">Save</button>
        <button type="button" onClick={onCancel} className="rounded-lg border border-[var(--g400)]/40 px-4 py-2 text-sm font-600 text-[var(--g800)] hover:bg-[var(--g100)]">Cancel</button>
      </div>
    </div>
  );
}
