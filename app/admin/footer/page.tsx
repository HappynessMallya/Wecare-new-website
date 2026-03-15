'use client';

import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { getFooter, getFooterLinks, updateFooter, updateFooterLinks, getApiErrorMessage } from '@/lib/api';
import type { FooterCopy, FooterLinkItem } from '@/lib/api';
import { revalidatePublicSite } from '@/lib/revalidate';

type FooterState = FooterCopy & { orgLinks: FooterLinkItem[]; programLinks: FooterLinkItem[]; involvedLinks: FooterLinkItem[] };

export default function AdminFooterPage() {
  const [footer, setFooter] = useState<FooterState>({ blurb: '', copyright: '', orgLinks: [], programLinks: [], involvedLinks: [] });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<{ type: 'ok' | 'err'; text: string } | null>(null);

  useEffect(() => {
    Promise.all([getFooter(), getFooterLinks()])
      .then(([copy, links]) => setFooter({ ...copy, ...links }))
      .catch(() => setMessage({ type: 'err', text: 'Failed to load footer.' }))
      .finally(() => setLoading(false));
  }, []);

  const updateBlurb = (v: string) => setFooter((p) => ({ ...p, blurb: v }));
  const updateCopyright = (v: string) => setFooter((p) => ({ ...p, copyright: v }));
  const updateOrgLinks = (links: FooterLinkItem[]) => setFooter((p) => ({ ...p, orgLinks: links }));
  const updateProgramLinks = (links: FooterLinkItem[]) => setFooter((p) => ({ ...p, programLinks: links }));
  const updateInvolvedLinks = (links: FooterLinkItem[]) => setFooter((p) => ({ ...p, involvedLinks: links }));

  const handleSaveCopy = async () => {
    setMessage(null);
    try {
      await updateFooter({ blurb: footer.blurb, copyright: footer.copyright });
      await revalidatePublicSite();
      setMessage({ type: 'ok', text: 'Blurb & copyright saved.' });
    } catch (err) {
      setMessage({ type: 'err', text: getApiErrorMessage(err) });
    }
  };

  const handleSaveLinks = async () => {
    setMessage(null);
    try {
      await updateFooterLinks({ orgLinks: footer.orgLinks, programLinks: footer.programLinks, involvedLinks: footer.involvedLinks });
      await revalidatePublicSite();
      setMessage({ type: 'ok', text: 'Footer links saved.' });
    } catch (err) {
      setMessage({ type: 'err', text: getApiErrorMessage(err) });
    }
  };

  if (loading) {
    return (
      <div>
        <h1 className="text-2xl font-800 text-[var(--blue)]">Footer</h1>
        <p className="mt-4 text-[var(--g600)]">Loading…</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-800 text-[var(--blue)]">Footer</h1>
        <p className="mt-1 text-sm text-[var(--g600)]">Footer link groups and blurb/copyright. API: GET/PUT /api/footer, GET/PUT /api/footer/links.</p>
      </div>

      {message && (
        <div className={`mb-4 rounded-lg px-4 py-2 text-sm font-600 ${message.type === 'ok' ? 'bg-[var(--blue-30)] text-[var(--blue)]' : 'bg-[var(--orange-30)] text-[var(--orange)]'}`}>{message.text}</div>
      )}

      <div className="mb-8 rounded-xl border border-[var(--blue)]/10 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-sm font-700 uppercase tracking-wider text-[var(--blue)]">Blurb & copyright</h2>
        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-600 text-[var(--g800)]">Blurb</label>
            <textarea rows={2} value={footer.blurb} onChange={(e) => updateBlurb(e.target.value)} className="w-full rounded-lg border border-[var(--g400)]/40 px-3 py-2 focus:border-[var(--rose)] focus:outline-none focus:ring-1 focus:ring-[var(--rose)]" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-600 text-[var(--g800)]">Copyright</label>
            <input type="text" value={footer.copyright} onChange={(e) => updateCopyright(e.target.value)} className="w-full rounded-lg border border-[var(--g400)]/40 px-3 py-2 focus:border-[var(--rose)] focus:outline-none focus:ring-1 focus:ring-[var(--rose)]" />
          </div>
          <button type="button" onClick={handleSaveCopy} className="rounded-lg bg-[var(--blue)] px-4 py-2 text-sm font-600 text-white hover:opacity-90">Save blurb & copyright</button>
        </div>
      </div>

      <LinkGroupEditor title="Organization links" links={footer.orgLinks} onChange={updateOrgLinks} />
      <LinkGroupEditor title="Program links" links={footer.programLinks} onChange={updateProgramLinks} />
      <LinkGroupEditor title="Get involved links" links={footer.involvedLinks} onChange={updateInvolvedLinks} showExternal />
      <button type="button" onClick={handleSaveLinks} className="rounded-lg bg-[var(--rose)] px-4 py-2 text-sm font-600 text-white hover:opacity-90">Save footer links</button>
    </div>
  );
}

function LinkGroupEditor({
  title,
  links,
  onChange,
  showExternal,
}: {
  title: string;
  links: FooterLinkItem[];
  onChange: (links: FooterLinkItem[]) => void;
  showExternal?: boolean;
}) {
  const [adding, setAdding] = useState(false);
  const [newLabel, setNewLabel] = useState('');
  const [newHref, setNewHref] = useState('');
  const [newExternal, setNewExternal] = useState(false);

  const add = () => {
    if (!newLabel.trim()) return;
    onChange([...links, { label: newLabel.trim(), href: newHref.trim() || '#', ...(showExternal ? { external: newExternal } : {}) } as FooterLinkItem]);
    setNewLabel('');
    setNewHref('');
    setNewExternal(false);
    setAdding(false);
  };

  const remove = (i: number) => onChange(links.filter((_, idx) => idx !== i));
  const update = (i: number, patch: Partial<FooterLinkItem>) => onChange(links.map((l, idx) => (idx === i ? { ...l, ...patch } : l)));

  return (
    <div className="mb-8 rounded-xl border border-[var(--blue)]/10 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-sm font-700 uppercase tracking-wider text-[var(--blue)]">{title}</h2>
      <ul className="space-y-2">
        {links.map((l, i) => (
          <li key={i} className="flex flex-wrap items-center gap-2 rounded-lg border border-[var(--blue)]/10 p-2">
            <input type="text" value={l.label} onChange={(e) => update(i, { label: e.target.value })} className="min-w-0 flex-1 rounded border border-[var(--g400)]/40 px-2 py-1 text-sm focus:border-[var(--rose)] focus:outline-none focus:ring-1 focus:ring-[var(--rose)]" placeholder="Label" />
            <input type="text" value={l.href} onChange={(e) => update(i, { href: e.target.value })} className="min-w-0 flex-1 rounded border border-[var(--g400)]/40 px-2 py-1 text-sm focus:border-[var(--rose)] focus:outline-none focus:ring-1 focus:ring-[var(--rose)]" placeholder="href" />
            {showExternal && (
              <label className="flex items-center gap-1 text-sm">
                <input type="checkbox" checked={l.external ?? false} onChange={(e) => update(i, { external: e.target.checked })} className="rounded border-[var(--g400)]" />
                External
              </label>
            )}
            <button type="button" onClick={() => remove(i)} className="rounded p-1 text-[var(--g500)] hover:bg-[var(--orange-30)] hover:text-[var(--orange)]" aria-label="Remove">×</button>
          </li>
        ))}
      </ul>
      {adding ? (
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <input type="text" value={newLabel} onChange={(e) => setNewLabel(e.target.value)} placeholder="Label" className="rounded border border-[var(--g400)]/40 px-2 py-1 text-sm focus:border-[var(--rose)] focus:outline-none focus:ring-1 focus:ring-[var(--rose)]" />
          <input type="text" value={newHref} onChange={(e) => setNewHref(e.target.value)} placeholder="href" className="rounded border border-[var(--g400)]/40 px-2 py-1 text-sm focus:border-[var(--rose)] focus:outline-none focus:ring-1 focus:ring-[var(--rose)]" />
          {showExternal && (
            <label className="flex items-center gap-1 text-sm">
              <input type="checkbox" checked={newExternal} onChange={(e) => setNewExternal(e.target.checked)} className="rounded border-[var(--g400)]" />
              External
            </label>
          )}
          <button type="button" onClick={add} className="rounded bg-[var(--rose)] px-3 py-1 text-sm font-600 text-white hover:opacity-90">Add</button>
          <button type="button" onClick={() => setAdding(false)} className="rounded border border-[var(--g400)]/40 px-3 py-1 text-sm hover:bg-[var(--g100)]">Cancel</button>
        </div>
      ) : (
        <button type="button" onClick={() => setAdding(true)} className="mt-4 inline-flex items-center gap-1 text-sm font-600 text-[var(--rose)] hover:underline"><Plus className="h-4 w-4" /> Add link</button>
      )}
    </div>
  );
}
