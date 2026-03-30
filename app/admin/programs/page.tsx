'use client';

import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, GripVertical, FileText } from 'lucide-react';
import {
  getProgramsAdmin,
  getProgramSection,
  createProgram,
  updateProgram,
  deleteProgram,
  updateProgramSection,
  getProgramDetail,
  updateProgramDetail,
  getApiErrorMessage,
} from '@/lib/api';
import type { Program, ProgramSection, ProgramDetail } from '@/lib/api';
import { ImageUpload } from '@/components/admin/ImageUpload';
import { revalidatePublicSite } from '@/lib/revalidate';

export default function AdminProgramsPage() {
  const [section, setSection] = useState<Partial<ProgramSection>>({});
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProgram, setEditingProgram] = useState<Program | null>(null);
  const [creating, setCreating] = useState(false);
  const [editingDetail, setEditingDetail] = useState<{ programId: string; detail: Partial<ProgramDetail> } | null>(null);
  const [message, setMessage] = useState<{ type: 'ok' | 'err'; text: string } | null>(null);

  useEffect(() => {
    Promise.all([getProgramSection(), getProgramsAdmin()])
      .then(([sec, list]) => {
        setSection(sec);
        setPrograms(list);
      })
      .catch(() => setMessage({ type: 'err', text: 'Failed to load programs.' }))
      .finally(() => setLoading(false));
  }, []);

  const closeForm = () => {
    setEditingProgram(null);
    setCreating(false);
    setEditingDetail(null);
  };

  const handleOpenDetail = async (programId: string) => {
    setMessage(null);
    try {
      const detail = await getProgramDetail(programId);
      setEditingDetail({ programId, detail });
    } catch {
      setEditingDetail({ programId, detail: { programId } });
    }
  };

  const handleSaveDetail = async (data: Partial<ProgramDetail>) => {
    if (!editingDetail) return;
    setMessage(null);
    try {
      await updateProgramDetail(editingDetail.programId, data);
      await revalidatePublicSite();
      setMessage({ type: 'ok', text: 'Program detail page content saved.' });
      setEditingDetail(null);
    } catch (err) {
      setMessage({ type: 'err', text: getApiErrorMessage(err) });
    }
  };

  const handleSaveProgram = async (payload: Omit<Program, 'id' | 'order' | 'createdAt' | 'updatedAt'>) => {
    setMessage(null);
    try {
      if (editingProgram) {
        const updated = await updateProgram(editingProgram.id, payload);
        setPrograms((prev) => prev.map((p) => (p.id === editingProgram.id ? { ...updated } : p)));
        setMessage({ type: 'ok', text: 'Program updated.' });
      } else {
        const created = await createProgram({ ...payload, order: programs.length + 1 });
        setPrograms((prev) => [...prev, created]);
        setMessage({ type: 'ok', text: 'Program added.' });
      }
      await revalidatePublicSite();
      closeForm();
    } catch (err) {
      setMessage({ type: 'err', text: getApiErrorMessage(err) });
    }
  };

  const handleDeleteProgram = async (id: string) => {
    if (!confirm('Delete this program?')) return;
    try {
      await deleteProgram(id);
      setPrograms((prev) => prev.filter((p) => p.id !== id));
      setMessage({ type: 'ok', text: 'Program deleted.' });
      await revalidatePublicSite();
    } catch (err) {
      setMessage({ type: 'err', text: getApiErrorMessage(err) });
    }
  };

  const handleSaveSection = async () => {
    setMessage(null);
    try {
      await updateProgramSection(section);
      setMessage({ type: 'ok', text: 'Section header saved.' });
      await revalidatePublicSite();
    } catch (err) {
      setMessage({ type: 'err', text: getApiErrorMessage(err) });
    }
  };

  const formTarget = editingProgram ?? (creating ? { id: '', imageUrl: '', imageAlt: '', tagLabel: '', tagType: 't1', regionBadge: '', title: '', subtitle: '', body: '', outcomes: [''], footerStat: '', footerStatLabel: '', ctaLabel: 'Learn more', ctaHref: '#contact', order: 0, isActive: true } : null);

  if (loading) {
    return (
      <div>
        <h1 className="text-2xl font-800 text-[var(--blue)]">Programs</h1>
        <p className="mt-4 text-[var(--g600)]">Loading…</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-800 text-[var(--blue)]">Programs</h1>
        <p className="mt-1 text-sm text-[var(--g600)]">
          Section header and program cards. API: /api/programs/section, /api/programs (CRUD + reorder).
        </p>
      </div>

      {message && (
        <div className={`mb-4 rounded-lg px-4 py-2 text-sm font-600 ${message.type === 'ok' ? 'bg-[var(--blue-30)] text-[var(--blue)]' : 'bg-[var(--orange-30)] text-[var(--orange)]'}`}>
          {message.text}
        </div>
      )}

      {/* Section header */}
      <div className="mb-8 rounded-xl border border-[var(--blue)]/10 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-sm font-700 uppercase tracking-wider text-[var(--blue)]">Section header</h2>
        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-600 text-[var(--g800)]">Eyebrow</label>
            <input type="text" value={section.eyebrow ?? ''} onChange={(e) => setSection((s) => ({ ...s, eyebrow: e.target.value }))} className="w-full rounded-lg border border-[var(--g400)]/40 px-3 py-2 focus:border-[var(--rose)] focus:outline-none focus:ring-1 focus:ring-[var(--rose)]" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-600 text-[var(--g800)]">Title</label>
              <input type="text" value={section.title ?? ''} onChange={(e) => setSection((s) => ({ ...s, title: e.target.value }))} className="w-full rounded-lg border border-[var(--g400)]/40 px-3 py-2 focus:border-[var(--rose)] focus:outline-none focus:ring-1 focus:ring-[var(--rose)]" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-600 text-[var(--g800)]">Title highlight (word to style)</label>
              <input type="text" value={section.titleHighlight ?? ''} onChange={(e) => setSection((s) => ({ ...s, titleHighlight: e.target.value }))} className="w-full rounded-lg border border-[var(--g400)]/40 px-3 py-2 focus:border-[var(--rose)] focus:outline-none focus:ring-1 focus:ring-[var(--rose)]" />
            </div>
          </div>
          <div>
            <label className="mb-1 block text-sm font-600 text-[var(--g800)]">Intro paragraph</label>
            <textarea rows={3} value={section.introParagraph ?? ''} onChange={(e) => setSection((s) => ({ ...s, introParagraph: e.target.value }))} className="w-full rounded-lg border border-[var(--g400)]/40 px-3 py-2 focus:border-[var(--rose)] focus:outline-none focus:ring-1 focus:ring-[var(--rose)]" />
          </div>
          <button type="button" onClick={handleSaveSection} className="rounded-lg bg-[var(--blue)] px-4 py-2 text-sm font-600 text-white hover:opacity-90">Save section header</button>
        </div>
      </div>

      {/* Programs list */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-700 text-[var(--blue)]">Program cards</h2>
        {!creating && !editingProgram && (
          <button type="button" onClick={() => setCreating(true)} className="inline-flex items-center gap-2 rounded-lg bg-[var(--rose)] px-4 py-2 text-sm font-600 text-white hover:opacity-90">
            <Plus className="h-4 w-4" /> Add program
          </button>
        )}
      </div>

      {formTarget && (
        <ProgramForm initial={formTarget} onSave={handleSaveProgram} onCancel={closeForm} isEdit={!!editingProgram} />
      )}

      {editingDetail && (
        <ProgramDetailForm
          programId={editingDetail.programId}
          initial={editingDetail.detail}
          onSave={handleSaveDetail}
          onCancel={() => setEditingDetail(null)}
        />
      )}

      <div className="rounded-xl border border-[var(--blue)]/10 bg-white shadow-sm overflow-hidden">
        <ul className="divide-y divide-[var(--blue)]/10">
          {programs.map((p) => (
            <li key={p.id} className="flex items-center gap-4 p-4">
              <span className="text-[var(--g400)]" aria-hidden><GripVertical className="h-5 w-5" /></span>
              <div className="h-12 w-20 shrink-0 overflow-hidden rounded bg-[var(--g100)]">
                {p.imageUrl ? <img src={p.imageUrl} alt="" className="h-full w-full object-cover" /> : <span className="flex h-full items-center justify-center text-xs text-[var(--g400)]">—</span>}
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-700 text-[var(--blue)]">{p.title}</p>
                <p className="text-sm text-[var(--g600)]">{p.subtitle}</p>
              </div>
              <div className="flex shrink-0 gap-2">
                <button type="button" onClick={() => handleOpenDetail(p.id)} className="rounded p-2 text-[var(--g600)] hover:bg-[var(--blue-30)] hover:text-[var(--blue)]" aria-label="Edit detail page" title="Edit detail page"><FileText className="h-4 w-4" /></button>
                <button type="button" onClick={() => setEditingProgram(p)} className="rounded p-2 text-[var(--g600)] hover:bg-[var(--rose-15)] hover:text-[var(--rose)]" aria-label="Edit"><Pencil className="h-4 w-4" /></button>
                <button type="button" onClick={() => handleDeleteProgram(p.id)} className="rounded p-2 text-[var(--g600)] hover:bg-[var(--orange-30)] hover:text-[var(--orange)]" aria-label="Delete"><Trash2 className="h-4 w-4" /></button>
              </div>
            </li>
          ))}
        </ul>
        {programs.length === 0 && !formTarget && <p className="p-8 text-center text-[var(--g600)]">No programs. Add one above.</p>}
      </div>
    </div>
  );
}

function ProgramForm({
  initial,
  onSave,
  onCancel,
  isEdit,
}: {
  initial: Program;
  onSave: (v: Omit<Program, 'id' | 'order'>) => void;
  onCancel: () => void;
  isEdit: boolean;
}) {
  const [imageUrl, setImageUrl] = useState(initial.imageUrl);
  const [imageAlt, setImageAlt] = useState(initial.imageAlt);
  const [tagLabel, setTagLabel] = useState(initial.tagLabel);
  const [tagType, setTagType] = useState(initial.tagType);
  const [regionBadge, setRegionBadge] = useState(initial.regionBadge);
  const [title, setTitle] = useState(initial.title);
  const [subtitle, setSubtitle] = useState(initial.subtitle);
  const [body, setBody] = useState(initial.body);
  const [outcomes, setOutcomes] = useState(initial.outcomes.length ? initial.outcomes : ['']);
  const [footerStat, setFooterStat] = useState(initial.footerStat);
  const [footerStatLabel, setFooterStatLabel] = useState(initial.footerStatLabel);
  const [ctaLabel, setCtaLabel] = useState(initial.ctaLabel);
  const [ctaHref, setCtaHref] = useState(initial.ctaHref);
  const [isActive, setIsActive] = useState(initial.isActive !== false);

  const addOutcome = () => setOutcomes((o) => [...o, '']);
  const removeOutcome = (i: number) => setOutcomes((o) => o.filter((_, idx) => idx !== i));
  const setOutcome = (i: number, v: string) => setOutcomes((o) => o.map((x, idx) => (idx === i ? v : x)));
  const outcomesFiltered = outcomes.filter((x) => x.trim());

  return (
    <div className="mb-6 rounded-xl border border-[var(--blue)]/10 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-lg font-700 text-[var(--blue)]">{isEdit ? 'Edit program' : 'New program'}</h2>
      <div className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <ImageUpload label="Program image" value={imageUrl} onChange={setImageUrl} />
          </div>
          <div>
            <label className="mb-1 block text-sm font-600 text-[var(--g800)]">Image alt</label>
            <input type="text" value={imageAlt} onChange={(e) => setImageAlt(e.target.value)} className="w-full rounded-lg border border-[var(--g400)]/40 px-3 py-2 focus:border-[var(--rose)] focus:outline-none focus:ring-1 focus:ring-[var(--rose)]" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-600 text-[var(--g800)]">Tag label</label>
            <input type="text" value={tagLabel} onChange={(e) => setTagLabel(e.target.value)} placeholder="Ages 0 – 5" className="w-full rounded-lg border border-[var(--g400)]/40 px-3 py-2 focus:border-[var(--rose)] focus:outline-none focus:ring-1 focus:ring-[var(--rose)]" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-600 text-[var(--g800)]">Tag type (style)</label>
            <select value={tagType} onChange={(e) => setTagType(e.target.value as Program['tagType'])} className="w-full rounded-lg border border-[var(--g400)]/40 px-3 py-2 focus:border-[var(--rose)] focus:outline-none focus:ring-1 focus:ring-[var(--rose)]">
              <option value="t1">t1</option>
              <option value="t2">t2</option>
              <option value="t3">t3</option>
              <option value="t4">t4</option>
            </select>
          </div>
          <div className="sm:col-span-2">
            <label className="mb-1 block text-sm font-600 text-[var(--g800)]">Region badge</label>
            <input type="text" value={regionBadge} onChange={(e) => setRegionBadge(e.target.value)} placeholder="📍 Mbeya & Mara Regions" className="w-full rounded-lg border border-[var(--g400)]/40 px-3 py-2 focus:border-[var(--rose)] focus:outline-none focus:ring-1 focus:ring-[var(--rose)]" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-600 text-[var(--g800)]">Title</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full rounded-lg border border-[var(--g400)]/40 px-3 py-2 focus:border-[var(--rose)] focus:outline-none focus:ring-1 focus:ring-[var(--rose)]" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-600 text-[var(--g800)]">Subtitle</label>
            <input type="text" value={subtitle} onChange={(e) => setSubtitle(e.target.value)} className="w-full rounded-lg border border-[var(--g400)]/40 px-3 py-2 focus:border-[var(--rose)] focus:outline-none focus:ring-1 focus:ring-[var(--rose)]" />
          </div>
        </div>
        <div>
          <label className="mb-1 block text-sm font-600 text-[var(--g800)]">Body</label>
          <textarea rows={4} value={body} onChange={(e) => setBody(e.target.value)} className="w-full rounded-lg border border-[var(--g400)]/40 px-3 py-2 focus:border-[var(--rose)] focus:outline-none focus:ring-1 focus:ring-[var(--rose)]" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-600 text-[var(--g800)]">Outcomes (one per line / item)</label>
          {outcomes.map((o, i) => (
            <div key={i} className="mb-2 flex gap-2">
              <input type="text" value={o} onChange={(e) => setOutcome(i, e.target.value)} className="flex-1 rounded-lg border border-[var(--g400)]/40 px-3 py-2 text-sm focus:border-[var(--rose)] focus:outline-none focus:ring-1 focus:ring-[var(--rose)]" placeholder="Outcome item" />
              <button type="button" onClick={() => removeOutcome(i)} className="shrink-0 rounded border border-[var(--g400)]/40 px-2 text-[var(--g600)] hover:bg-[var(--orange-30)]">Remove</button>
            </div>
          ))}
          <button type="button" onClick={addOutcome} className="mt-1 text-sm font-600 text-[var(--rose)] hover:underline">+ Add outcome</button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-600 text-[var(--g800)]">Footer stat</label>
            <input type="text" value={footerStat} onChange={(e) => setFooterStat(e.target.value)} placeholder="5,000+" className="w-full rounded-lg border border-[var(--g400)]/40 px-3 py-2 focus:border-[var(--rose)] focus:outline-none focus:ring-1 focus:ring-[var(--rose)]" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-600 text-[var(--g800)]">Footer stat label</label>
            <input type="text" value={footerStatLabel} onChange={(e) => setFooterStatLabel(e.target.value)} placeholder="Parents & caregivers reached" className="w-full rounded-lg border border-[var(--g400)]/40 px-3 py-2 focus:border-[var(--rose)] focus:outline-none focus:ring-1 focus:ring-[var(--rose)]" />
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
        <div>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} className="rounded border-[var(--g400)]" />
            <span className="text-sm font-600 text-[var(--g800)]">Show on public site (active)</span>
          </label>
          <p className="mt-0.5 text-xs text-[var(--g600)]">Uncheck to hide this program from the public site without deleting it.</p>
        </div>
      </div>
      <div className="mt-4 flex gap-3">
        <button type="button" onClick={() => onSave({ imageUrl, imageAlt, tagLabel, tagType, regionBadge, title, subtitle, body, outcomes: outcomesFiltered.length ? outcomesFiltered : [''], footerStat, footerStatLabel, ctaLabel, ctaHref, isActive })} className="rounded-lg bg-[var(--rose)] px-4 py-2 text-sm font-600 text-white hover:opacity-90">Save</button>
        <button type="button" onClick={onCancel} className="rounded-lg border border-[var(--g400)]/40 px-4 py-2 text-sm font-600 text-[var(--g800)] hover:bg-[var(--g100)]">Cancel</button>
      </div>
    </div>
  );
}

/* ── Program detail page form ── */
const INPUT_CLS = 'w-full rounded-lg border border-[var(--g400)]/40 px-3 py-2 focus:border-[var(--rose)] focus:outline-none focus:ring-1 focus:ring-[var(--rose)]';
const LABEL_CLS = 'mb-1 block text-sm font-600 text-[var(--g800)]';

function ProgramDetailForm({
  programId,
  initial,
  onSave,
  onCancel,
}: {
  programId: string;
  initial: Partial<ProgramDetail>;
  onSave: (data: Partial<ProgramDetail>) => void;
  onCancel: () => void;
}) {
  const [heroTitle, setHeroTitle] = useState(initial.heroTitle ?? '');
  const [heroSubtitle, setHeroSubtitle] = useState(initial.heroSubtitle ?? '');
  const [chips, setChips] = useState<string[]>(initial.chips?.length ? initial.chips : ['']);
  const [challengeParagraphs, setChallengeParagraphs] = useState<string[]>(initial.challengeParagraphs?.length ? initial.challengeParagraphs : ['']);
  const [activitiesTitle, setActivitiesTitle] = useState(initial.activitiesTitle ?? 'Program Activities');
  const [targetCommunities, setTargetCommunities] = useState<string[]>(initial.targetCommunities?.length ? initial.targetCommunities : ['']);
  const [impactNumbers, setImpactNumbers] = useState(initial.impactNumbers?.length ? initial.impactNumbers : [{ value: '', label: '' }]);
  const [testimonials, setTestimonials] = useState(initial.testimonials?.length ? initial.testimonials : [{ quote: '', name: '', role: '' }]);
  const [partners, setPartners] = useState<string[]>(initial.partners?.length ? initial.partners : ['']);

  const addChip = () => setChips((c) => [...c, '']);
  const addChallenge = () => setChallengeParagraphs((c) => [...c, '']);
  const addCommunity = () => setTargetCommunities((c) => [...c, '']);
  const addImpact = () => setImpactNumbers((n) => [...n, { value: '', label: '' }]);
  const addTestimonial = () => setTestimonials((t) => [...t, { quote: '', name: '', role: '' }]);
  const addPartner = () => setPartners((p) => [...p, '']);

  return (
    <div className="mb-6 rounded-xl border-2 border-[var(--blue)]/20 bg-white p-6 shadow-sm">
      <h2 className="mb-1 text-lg font-700 text-[var(--blue)]">Program detail page content</h2>
      <p className="mb-4 text-sm text-[var(--g600)]">
        Content for the /programs/{programId} detail page (hero, challenge, activities, impact, testimonials).
      </p>
      <div className="space-y-5">
        {/* Hero */}
        <div className="rounded-lg border border-[var(--blue)]/10 p-4">
          <h3 className="mb-3 text-sm font-700 uppercase tracking-wider text-[var(--blue)]">Hero</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={LABEL_CLS}>Hero title</label>
              <input type="text" value={heroTitle} onChange={(e) => setHeroTitle(e.target.value)} className={INPUT_CLS} />
            </div>
            <div className="sm:col-span-2">
              <label className={LABEL_CLS}>Hero subtitle</label>
              <textarea rows={2} value={heroSubtitle} onChange={(e) => setHeroSubtitle(e.target.value)} className={INPUT_CLS} />
            </div>
          </div>
          <div className="mt-3">
            <label className={LABEL_CLS}>Meta chips (e.g. &quot;Mbeya &amp; Mara&quot;, &quot;Ages 0-8&quot;)</label>
            {chips.map((c, i) => (
              <div key={i} className="mb-2 flex gap-2">
                <input type="text" value={c} onChange={(e) => setChips((prev) => prev.map((x, idx) => idx === i ? e.target.value : x))} className={`flex-1 text-sm ${INPUT_CLS}`} />
                <button type="button" onClick={() => setChips((prev) => prev.filter((_, idx) => idx !== i))} className="shrink-0 rounded border border-[var(--g400)]/40 px-2 text-[var(--g600)] hover:bg-[var(--orange-30)]">Remove</button>
              </div>
            ))}
            <button type="button" onClick={addChip} className="text-sm font-600 text-[var(--rose)] hover:underline">+ Add chip</button>
          </div>
        </div>

        {/* Challenge */}
        <div className="rounded-lg border border-[var(--blue)]/10 p-4">
          <h3 className="mb-3 text-sm font-700 uppercase tracking-wider text-[var(--blue)]">Challenge section</h3>
          <label className={LABEL_CLS}>Challenge paragraphs</label>
          {challengeParagraphs.map((p, i) => (
            <div key={i} className="mb-2 flex gap-2">
              <textarea rows={2} value={p} onChange={(e) => setChallengeParagraphs((prev) => prev.map((x, idx) => idx === i ? e.target.value : x))} className={`flex-1 text-sm ${INPUT_CLS}`} />
              <button type="button" onClick={() => setChallengeParagraphs((prev) => prev.filter((_, idx) => idx !== i))} className="shrink-0 rounded border border-[var(--g400)]/40 px-2 text-[var(--g600)] hover:bg-[var(--orange-30)]">Remove</button>
            </div>
          ))}
          <button type="button" onClick={addChallenge} className="text-sm font-600 text-[var(--rose)] hover:underline">+ Add paragraph</button>
        </div>

        {/* Activities */}
        <div className="rounded-lg border border-[var(--blue)]/10 p-4">
          <h3 className="mb-3 text-sm font-700 uppercase tracking-wider text-[var(--blue)]">Activities</h3>
          <div className="mb-3">
            <label className={LABEL_CLS}>Activities section title</label>
            <input type="text" value={activitiesTitle} onChange={(e) => setActivitiesTitle(e.target.value)} className={INPUT_CLS} />
          </div>
          <label className={LABEL_CLS}>Target communities</label>
          {targetCommunities.map((c, i) => (
            <div key={i} className="mb-2 flex gap-2">
              <input type="text" value={c} onChange={(e) => setTargetCommunities((prev) => prev.map((x, idx) => idx === i ? e.target.value : x))} className={`flex-1 text-sm ${INPUT_CLS}`} />
              <button type="button" onClick={() => setTargetCommunities((prev) => prev.filter((_, idx) => idx !== i))} className="shrink-0 rounded border border-[var(--g400)]/40 px-2 text-[var(--g600)] hover:bg-[var(--orange-30)]">Remove</button>
            </div>
          ))}
          <button type="button" onClick={addCommunity} className="text-sm font-600 text-[var(--rose)] hover:underline">+ Add community</button>
        </div>

        {/* Partners */}
        <div className="rounded-lg border border-[var(--blue)]/10 p-4">
          <h3 className="mb-3 text-sm font-700 uppercase tracking-wider text-[var(--blue)]">Program partners</h3>
          {partners.map((p, i) => (
            <div key={i} className="mb-2 flex gap-2">
              <input type="text" value={p} onChange={(e) => setPartners((prev) => prev.map((x, idx) => idx === i ? e.target.value : x))} className={`flex-1 text-sm ${INPUT_CLS}`} />
              <button type="button" onClick={() => setPartners((prev) => prev.filter((_, idx) => idx !== i))} className="shrink-0 rounded border border-[var(--g400)]/40 px-2 text-[var(--g600)] hover:bg-[var(--orange-30)]">Remove</button>
            </div>
          ))}
          <button type="button" onClick={addPartner} className="text-sm font-600 text-[var(--rose)] hover:underline">+ Add partner</button>
        </div>

        {/* Impact numbers */}
        <div className="rounded-lg border border-[var(--blue)]/10 p-4">
          <h3 className="mb-3 text-sm font-700 uppercase tracking-wider text-[var(--blue)]">Impact numbers</h3>
          {impactNumbers.map((n, i) => (
            <div key={i} className="mb-2 flex gap-2">
              <input type="text" value={n.value} onChange={(e) => setImpactNumbers((prev) => prev.map((x, idx) => idx === i ? { ...x, value: e.target.value } : x))} placeholder="Value (e.g. 5,000+)" className={`flex-1 text-sm ${INPUT_CLS}`} />
              <input type="text" value={n.label} onChange={(e) => setImpactNumbers((prev) => prev.map((x, idx) => idx === i ? { ...x, label: e.target.value } : x))} placeholder="Label" className={`flex-1 text-sm ${INPUT_CLS}`} />
              <button type="button" onClick={() => setImpactNumbers((prev) => prev.filter((_, idx) => idx !== i))} className="shrink-0 rounded border border-[var(--g400)]/40 px-2 text-[var(--g600)] hover:bg-[var(--orange-30)]">Remove</button>
            </div>
          ))}
          <button type="button" onClick={addImpact} className="text-sm font-600 text-[var(--rose)] hover:underline">+ Add impact number</button>
        </div>

        {/* Testimonials */}
        <div className="rounded-lg border border-[var(--blue)]/10 p-4">
          <h3 className="mb-3 text-sm font-700 uppercase tracking-wider text-[var(--blue)]">Testimonials</h3>
          {testimonials.map((t, i) => (
            <div key={i} className="mb-3 rounded border border-[var(--g400)]/20 p-3">
              <textarea rows={2} value={t.quote} onChange={(e) => setTestimonials((prev) => prev.map((x, idx) => idx === i ? { ...x, quote: e.target.value } : x))} placeholder="Quote" className={`mb-2 text-sm ${INPUT_CLS}`} />
              <div className="grid gap-2 sm:grid-cols-2">
                <input type="text" value={t.name} onChange={(e) => setTestimonials((prev) => prev.map((x, idx) => idx === i ? { ...x, name: e.target.value } : x))} placeholder="Name" className={`text-sm ${INPUT_CLS}`} />
                <input type="text" value={t.role} onChange={(e) => setTestimonials((prev) => prev.map((x, idx) => idx === i ? { ...x, role: e.target.value } : x))} placeholder="Role / Location" className={`text-sm ${INPUT_CLS}`} />
              </div>
              <button type="button" onClick={() => setTestimonials((prev) => prev.filter((_, idx) => idx !== i))} className="mt-2 text-sm text-[var(--g600)] hover:text-[var(--orange)]">Remove testimonial</button>
            </div>
          ))}
          <button type="button" onClick={addTestimonial} className="text-sm font-600 text-[var(--rose)] hover:underline">+ Add testimonial</button>
        </div>
      </div>

      <div className="mt-5 flex gap-3">
        <button
          type="button"
          onClick={() => onSave({
            programId,
            heroTitle: heroTitle.trim() || undefined,
            heroSubtitle: heroSubtitle.trim() || undefined,
            chips: chips.filter(Boolean),
            challengeParagraphs: challengeParagraphs.filter(Boolean),
            activitiesTitle: activitiesTitle.trim() || undefined,
            targetCommunities: targetCommunities.filter(Boolean),
            impactNumbers: impactNumbers.filter((n) => n.value.trim() || n.label.trim()),
            testimonials: testimonials.filter((t) => t.quote.trim()),
            partners: partners.filter(Boolean),
          })}
          className="rounded-lg bg-[var(--rose)] px-5 py-2.5 text-sm font-600 text-white hover:opacity-90"
        >
          Save detail page
        </button>
        <button type="button" onClick={onCancel} className="rounded-lg border border-[var(--g400)]/40 px-4 py-2.5 text-sm font-600 text-[var(--g800)] hover:bg-[var(--g100)]">
          Cancel
        </button>
      </div>
    </div>
  );
}
