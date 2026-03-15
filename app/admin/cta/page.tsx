'use client';

import { useState, useEffect } from 'react';
import { Pencil } from 'lucide-react';
import { getCTAInvolved, getCTABanner, updateCTAInvolved, updateCTABanner, getApiErrorMessage } from '@/lib/api';
import type { CTAInvolved, CTABanner, CTACard } from '@/lib/api';
import { ImageUpload } from '@/components/admin/ImageUpload';
import { revalidatePublicSite } from '@/lib/revalidate';

export default function AdminCTAPage() {
  const [involved, setInvolved] = useState<CTAInvolved | null>(null);
  const [banner, setBanner] = useState<Partial<CTABanner>>({});
  const [loading, setLoading] = useState(true);
  const [editingCard, setEditingCard] = useState<CTACard | null>(null);
  const [activeTab, setActiveTab] = useState<'involved' | 'banner'>('involved');
  const [message, setMessage] = useState<{ type: 'ok' | 'err'; text: string } | null>(null);

  useEffect(() => {
    Promise.all([getCTAInvolved(), getCTABanner()])
      .then(([inv, ban]) => {
        setInvolved(inv);
        setBanner(ban);
      })
      .catch(() => setMessage({ type: 'err', text: 'Failed to load CTA.' }))
      .finally(() => setLoading(false));
  }, []);

  const handleSaveCard = async (payload: Omit<CTACard, 'id' | 'order'>) => {
    if (!involved || !editingCard) return;
    setMessage(null);
    try {
      const nextCards = involved.cards.map((c) => (c.id === editingCard.id ? { ...c, ...payload } : c));
      await updateCTAInvolved({ ...involved, cards: nextCards });
      setInvolved((p) => (p ? { ...p, cards: nextCards } : null));
      setEditingCard(null);
      await revalidatePublicSite();
      setMessage({ type: 'ok', text: 'Card saved.' });
    } catch (err) {
      setMessage({ type: 'err', text: getApiErrorMessage(err) });
    }
  };

  const handleSaveInvolvedSection = async () => {
    if (!involved) return;
    setMessage(null);
    try {
      await updateCTAInvolved(involved);
      await revalidatePublicSite();
      setMessage({ type: 'ok', text: 'Section saved.' });
    } catch (err) {
      setMessage({ type: 'err', text: getApiErrorMessage(err) });
    }
  };

  const handleSaveBanner = async () => {
    setMessage(null);
    try {
      await updateCTABanner(banner);
      await revalidatePublicSite();
      setMessage({ type: 'ok', text: 'Banner saved.' });
    } catch (err) {
      setMessage({ type: 'err', text: getApiErrorMessage(err) });
    }
  };

  if (loading) {
    return (
      <div>
        <h1 className="text-2xl font-800 text-[var(--blue)]">Get Involved & CTA</h1>
        <p className="mt-4 text-[var(--g600)]">Loading…</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-800 text-[var(--blue)]">Get Involved & CTA</h1>
        <p className="mt-1 text-sm text-[var(--g600)]">CTA cards (Donate, Partner, Volunteer) and full-width banner.</p>
      </div>

      {message && (
        <div className={`mb-4 rounded-lg px-4 py-2 text-sm font-600 ${message.type === 'ok' ? 'bg-[var(--blue-30)] text-[var(--blue)]' : 'bg-[var(--orange-30)] text-[var(--orange)]'}`}>{message.text}</div>
      )}

      <div className="mb-6 flex gap-2 border-b border-[var(--blue)]/10">
        <button type="button" onClick={() => setActiveTab('involved')} className={`border-b-2 px-4 py-2 text-sm font-600 ${activeTab === 'involved' ? 'border-[var(--rose)] text-[var(--rose)]' : 'border-transparent text-[var(--g600)] hover:text-[var(--blue)]'}`}>Get Involved cards</button>
        <button type="button" onClick={() => setActiveTab('banner')} className={`border-b-2 px-4 py-2 text-sm font-600 ${activeTab === 'banner' ? 'border-[var(--rose)] text-[var(--rose)]' : 'border-transparent text-[var(--g600)] hover:text-[var(--blue)]'}`}>CTA Banner</button>
      </div>

      {activeTab === 'involved' && involved && (
        <div className="space-y-6">
          <div className="rounded-xl border border-[var(--blue)]/10 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-sm font-700 uppercase tracking-wider text-[var(--blue)]">Section header</h2>
            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-600 text-[var(--g800)]">Eyebrow</label>
                  <input type="text" value={involved.eyebrow ?? ''} onChange={(e) => setInvolved((p) => (p ? { ...p, eyebrow: e.target.value } : null))} className="w-full rounded-lg border border-[var(--g400)]/40 px-3 py-2 focus:border-[var(--rose)] focus:outline-none focus:ring-1 focus:ring-[var(--rose)]" />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-600 text-[var(--g800)]">Title highlight</label>
                  <input type="text" value={involved.titleHighlight ?? ''} onChange={(e) => setInvolved((p) => (p ? { ...p, titleHighlight: e.target.value } : null))} className="w-full rounded-lg border border-[var(--g400)]/40 px-3 py-2 focus:border-[var(--rose)] focus:outline-none focus:ring-1 focus:ring-[var(--rose)]" />
                </div>
              </div>
              <div>
                <label className="mb-1 block text-sm font-600 text-[var(--g800)]">Title</label>
                <input type="text" value={involved.title ?? ''} onChange={(e) => setInvolved((p) => (p ? { ...p, title: e.target.value } : null))} className="w-full rounded-lg border border-[var(--g400)]/40 px-3 py-2 focus:border-[var(--rose)] focus:outline-none focus:ring-1 focus:ring-[var(--rose)]" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-600 text-[var(--g800)]">Intro</label>
                <textarea rows={2} value={involved.intro ?? ''} onChange={(e) => setInvolved((p) => (p ? { ...p, intro: e.target.value } : null))} className="w-full rounded-lg border border-[var(--g400)]/40 px-3 py-2 focus:border-[var(--rose)] focus:outline-none focus:ring-1 focus:ring-[var(--rose)]" />
              </div>
              <button type="button" onClick={handleSaveInvolvedSection} className="rounded-lg bg-[var(--blue)] px-4 py-2 text-sm font-600 text-white hover:opacity-90">Save section</button>
            </div>
          </div>

          {editingCard ? (
            <CTACardForm card={editingCard} onSave={handleSaveCard} onCancel={() => setEditingCard(null)} />
          ) : (
            <div className="rounded-xl border border-[var(--blue)]/10 bg-white shadow-sm overflow-hidden">
              <h2 className="border-b border-[var(--blue)]/10 px-4 py-3 text-sm font-700 text-[var(--blue)]">Cards</h2>
              <ul className="divide-y divide-[var(--blue)]/10">
                {(involved.cards ?? []).map((c) => (
                  <li key={c.id} className="flex items-center gap-4 p-4">
                    <span className="text-2xl" role="img" aria-hidden>{c.iconEmoji}</span>
                    <div className="min-w-0 flex-1">
                      <p className="font-700 text-[var(--blue)]">{c.title}</p>
                      <p className="text-sm text-[var(--g600)] line-clamp-1">{c.body}</p>
                    </div>
                    <button type="button" onClick={() => setEditingCard(c)} className="rounded p-2 text-[var(--g600)] hover:bg-[var(--rose-15)] hover:text-[var(--rose)]" aria-label="Edit"><Pencil className="h-4 w-4" /></button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {activeTab === 'banner' && (
        <div className="rounded-xl border border-[var(--blue)]/10 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-sm font-700 uppercase tracking-wider text-[var(--blue)]">CTA Banner</h2>
          <div className="space-y-4">
            <div>
              <ImageUpload
                label="Background image"
                value={banner.imageUrl ?? ''}
                onChange={(url) => setBanner((p) => ({ ...p, imageUrl: url }))}
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-600 text-[var(--g800)]">Image alt</label>
              <input type="text" value={banner.imageAlt ?? ''} onChange={(e) => setBanner((p) => ({ ...p, imageAlt: e.target.value }))} className="w-full rounded-lg border border-[var(--g400)]/40 px-3 py-2 focus:border-[var(--rose)] focus:outline-none focus:ring-1 focus:ring-[var(--rose)]" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-600 text-[var(--g800)]">Title</label>
                <input type="text" value={banner.title ?? ''} onChange={(e) => setBanner((p) => ({ ...p, title: e.target.value }))} className="w-full rounded-lg border border-[var(--g400)]/40 px-3 py-2 focus:border-[var(--rose)] focus:outline-none focus:ring-1 focus:ring-[var(--rose)]" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-600 text-[var(--g800)]">Title highlight</label>
                <input type="text" value={banner.titleHighlight ?? ''} onChange={(e) => setBanner((p) => ({ ...p, titleHighlight: e.target.value }))} className="w-full rounded-lg border border-[var(--g400)]/40 px-3 py-2 focus:border-[var(--rose)] focus:outline-none focus:ring-1 focus:ring-[var(--rose)]" />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-sm font-600 text-[var(--g800)]">Body</label>
              <textarea rows={2} value={banner.body ?? ''} onChange={(e) => setBanner((p) => ({ ...p, body: e.target.value }))} className="w-full rounded-lg border border-[var(--g400)]/40 px-3 py-2 focus:border-[var(--rose)] focus:outline-none focus:ring-1 focus:ring-[var(--rose)]" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-600 text-[var(--g800)]">Primary button label</label>
                <input type="text" value={banner.primaryButtonLabel ?? ''} onChange={(e) => setBanner((p) => ({ ...p, primaryButtonLabel: e.target.value }))} className="w-full rounded-lg border border-[var(--g400)]/40 px-3 py-2 focus:border-[var(--rose)] focus:outline-none focus:ring-1 focus:ring-[var(--rose)]" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-600 text-[var(--g800)]">Primary button href</label>
                <input type="text" value={banner.primaryButtonHref ?? ''} onChange={(e) => setBanner((p) => ({ ...p, primaryButtonHref: e.target.value }))} className="w-full rounded-lg border border-[var(--g400)]/40 px-3 py-2 focus:border-[var(--rose)] focus:outline-none focus:ring-1 focus:ring-[var(--rose)]" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-600 text-[var(--g800)]">Secondary button label</label>
                <input type="text" value={banner.secondaryButtonLabel ?? ''} onChange={(e) => setBanner((p) => ({ ...p, secondaryButtonLabel: e.target.value }))} className="w-full rounded-lg border border-[var(--g400)]/40 px-3 py-2 focus:border-[var(--rose)] focus:outline-none focus:ring-1 focus:ring-[var(--rose)]" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-600 text-[var(--g800)]">Secondary button href</label>
                <input type="text" value={banner.secondaryButtonHref ?? ''} onChange={(e) => setBanner((p) => ({ ...p, secondaryButtonHref: e.target.value }))} className="w-full rounded-lg border border-[var(--g400)]/40 px-3 py-2 focus:border-[var(--rose)] focus:outline-none focus:ring-1 focus:ring-[var(--rose)]" />
              </div>
            </div>
            <button type="button" onClick={handleSaveBanner} className="rounded-lg bg-[var(--rose)] px-4 py-2 text-sm font-600 text-white hover:opacity-90">Save banner</button>
          </div>
        </div>
      )}
    </div>
  );
}

function CTACardForm({ card, onSave, onCancel }: { card: CTACard; onSave: (v: Omit<CTACard, 'id' | 'order'>) => void; onCancel: () => void }) {
  const [iconEmoji, setIconEmoji] = useState(card.iconEmoji);
  const [title, setTitle] = useState(card.title);
  const [body, setBody] = useState(card.body);
  const [ctaLabel, setCtaLabel] = useState(card.ctaLabel);
  const [ctaHref, setCtaHref] = useState(card.ctaHref);
  const [styleClass, setStyleClass] = useState(card.styleClass);
  return (
    <div className="rounded-xl border border-[var(--blue)]/10 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-lg font-700 text-[var(--blue)]">Edit card: {card.title}</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-600 text-[var(--g800)]">Icon (emoji)</label>
          <input type="text" value={iconEmoji} onChange={(e) => setIconEmoji(e.target.value)} className="w-20 rounded-lg border border-[var(--g400)]/40 px-3 py-2 text-xl focus:border-[var(--rose)] focus:outline-none focus:ring-1 focus:ring-[var(--rose)]" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-600 text-[var(--g800)]">Style class</label>
          <select value={styleClass} onChange={(e) => setStyleClass(e.target.value as CTACard['styleClass'])} className="w-full rounded-lg border border-[var(--g400)]/40 px-3 py-2 focus:border-[var(--rose)] focus:outline-none focus:ring-1 focus:ring-[var(--rose)]">
            <option value="c1">c1 (rose)</option>
            <option value="c2">c2 (blue)</option>
            <option value="c3">c3 (orange)</option>
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className="mb-1 block text-sm font-600 text-[var(--g800)]">Title</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full rounded-lg border border-[var(--g400)]/40 px-3 py-2 focus:border-[var(--rose)] focus:outline-none focus:ring-1 focus:ring-[var(--rose)]" />
        </div>
        <div className="sm:col-span-2">
          <label className="mb-1 block text-sm font-600 text-[var(--g800)]">Body</label>
          <textarea rows={2} value={body} onChange={(e) => setBody(e.target.value)} className="w-full rounded-lg border border-[var(--g400)]/40 px-3 py-2 focus:border-[var(--rose)] focus:outline-none focus:ring-1 focus:ring-[var(--rose)]" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-600 text-[var(--g800)]">CTA label</label>
          <input type="text" value={ctaLabel} onChange={(e) => setCtaLabel(e.target.value)} className="w-full rounded-lg border border-[var(--g400)]/40 px-3 py-2 focus:border-[var(--rose)] focus:outline-none focus:ring-1 focus:ring-[var(--rose)]" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-600 text-[var(--g800)]">CTA href</label>
          <input type="text" value={ctaHref} onChange={(e) => setCtaHref(e.target.value)} className="w-full rounded-lg border border-[var(--g400)]/40 px-3 py-2 focus:border-[var(--rose)] focus:outline-none focus:ring-1 focus:ring-[var(--rose)]" />
        </div>
      </div>
      <div className="mt-4 flex gap-3">
        <button type="button" onClick={() => onSave({ iconEmoji, title, body, ctaLabel, ctaHref, styleClass })} className="rounded-lg bg-[var(--rose)] px-4 py-2 text-sm font-600 text-white hover:opacity-90">Save</button>
        <button type="button" onClick={onCancel} className="rounded-lg border border-[var(--g400)]/40 px-4 py-2 text-sm font-600 text-[var(--g800)] hover:bg-[var(--g100)]">Cancel</button>
      </div>
    </div>
  );
}
