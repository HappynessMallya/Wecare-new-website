'use client';

import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, GripVertical } from 'lucide-react';
import {
  getTeamMembers,
  getTeamSection,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
  updateTeamSection,
  getApiErrorMessage,
} from '@/lib/api';
import type { TeamMember, TeamPageSection } from '@/lib/api';
import { ImageUpload } from '@/components/admin/ImageUpload';
import { revalidatePublicSite } from '@/lib/revalidate';

const INPUT = 'w-full rounded-lg border border-[var(--g400)]/40 px-3 py-2 focus:border-[var(--rose)] focus:outline-none focus:ring-1 focus:ring-[var(--rose)]';
const LABEL = 'mb-1 block text-sm font-600 text-[var(--g800)]';

const CATEGORY_LABELS: Record<TeamMember['category'], string> = {
  founder: 'Founder / Co-founder',
  programme_leader: 'Programme Leader',
  staff: 'Staff',
  volunteer: 'Volunteer',
};

const DEFAULT_SECTION: Partial<TeamPageSection> = {
  heroEyebrow: 'The People Behind the Mission',
  heroTitle: 'Meet Our',
  heroTitleHighlight: 'Team',
  heroSubtitle: "Dedicated leaders, educators, and community builders working together to give Tanzania's youngest children the foundation they deserve.",
  foundersEyebrow: 'Leadership',
  foundersTitle: 'Founder & Director',
  leadersEyebrow: 'On the Ground',
  leadersTitle: 'Programme Leaders',
  leadersSubtitle: "Our regional leaders work directly with communities, schools, and families to bring WeCare's programmes to life every day.",
  staffEyebrow: 'Our People',
  staffTitle: 'Staff & Volunteers',
  joinEyebrow: 'Join Us',
  joinTitle: 'Passionate about',
  joinTitleHighlight: "children's futures?",
  joinSubtitle: "We're always looking for dedicated people to join WeCare as staff, volunteers, or partners.",
  joinPrimaryLabel: 'View Open Roles',
  joinPrimaryHref: '/#contact',
  joinSecondaryLabel: 'Volunteer With Us',
  joinSecondaryHref: '/#contact',
};

export default function AdminTeamPage() {
  const [section, setSection] = useState<Partial<TeamPageSection>>(DEFAULT_SECTION);
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<TeamMember | null>(null);
  const [creating, setCreating] = useState(false);
  const [message, setMessage] = useState<{ type: 'ok' | 'err'; text: string } | null>(null);

  useEffect(() => {
    Promise.all([getTeamSection(), getTeamMembers()])
      .then(([sec, list]) => {
        if (sec) setSection(sec);
        setMembers(list);
      })
      .catch(() => setMessage({ type: 'err', text: 'Failed to load team data. The team API endpoints may not be available yet.' }))
      .finally(() => setLoading(false));
  }, []);

  const closeForm = () => { setEditing(null); setCreating(false); };

  const handleSaveMember = async (payload: Omit<TeamMember, 'id' | 'createdAt' | 'updatedAt'>) => {
    setMessage(null);
    try {
      if (editing) {
        const updated = await updateTeamMember(editing.id, payload);
        setMembers((prev) => prev.map((m) => (m.id === editing.id ? { ...updated } : m)));
        setMessage({ type: 'ok', text: 'Team member updated.' });
      } else {
        const created = await createTeamMember(payload);
        setMembers((prev) => [...prev, created]);
        setMessage({ type: 'ok', text: 'Team member added.' });
      }
      await revalidatePublicSite();
      closeForm();
    } catch (err) {
      setMessage({ type: 'err', text: getApiErrorMessage(err) });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this team member?')) return;
    try {
      await deleteTeamMember(id);
      setMembers((prev) => prev.filter((m) => m.id !== id));
      setMessage({ type: 'ok', text: 'Team member deleted.' });
      await revalidatePublicSite();
    } catch (err) {
      setMessage({ type: 'err', text: getApiErrorMessage(err) });
    }
  };

  const handleSaveSection = async () => {
    setMessage(null);
    try {
      await updateTeamSection(section);
      setMessage({ type: 'ok', text: 'Team page section saved.' });
      await revalidatePublicSite();
    } catch (err) {
      setMessage({ type: 'err', text: getApiErrorMessage(err) });
    }
  };

  const formTarget = editing ?? (creating ? {
    id: '', name: '', role: '', region: '', bio: '', photoUrl: '', photoAlt: '',
    email: '', linkedInUrl: '', category: 'staff' as const, order: members.length, isActive: true,
  } : null);

  if (loading) {
    return (
      <div>
        <h1 className="text-2xl font-800 text-[var(--blue)]">Team</h1>
        <p className="mt-4 text-[var(--g600)]">Loading…</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-800 text-[var(--blue)]">Team</h1>
        <p className="mt-1 text-sm text-[var(--g600)]">
          Manage team page content and team members. API: /api/team/section, /api/team/members (CRUD).
        </p>
      </div>

      {message && (
        <div className={`mb-4 rounded-lg px-4 py-2 text-sm font-600 ${message.type === 'ok' ? 'bg-[var(--blue-30)] text-[var(--blue)]' : 'bg-[var(--orange-30)] text-[var(--orange)]'}`}>
          {message.text}
        </div>
      )}

      {/* Section copy */}
      <div className="mb-8 rounded-xl border border-[var(--blue)]/10 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-sm font-700 uppercase tracking-wider text-[var(--blue)]">Page section copy</h2>
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className={LABEL}>Hero eyebrow</label>
              <input type="text" value={section.heroEyebrow ?? ''} onChange={(e) => setSection((s) => ({ ...s, heroEyebrow: e.target.value }))} className={INPUT} />
            </div>
            <div>
              <label className={LABEL}>Hero title</label>
              <input type="text" value={section.heroTitle ?? ''} onChange={(e) => setSection((s) => ({ ...s, heroTitle: e.target.value }))} className={INPUT} />
            </div>
            <div>
              <label className={LABEL}>Hero title highlight</label>
              <input type="text" value={section.heroTitleHighlight ?? ''} onChange={(e) => setSection((s) => ({ ...s, heroTitleHighlight: e.target.value }))} className={INPUT} />
            </div>
          </div>
          <div>
            <label className={LABEL}>Hero subtitle</label>
            <textarea rows={2} value={section.heroSubtitle ?? ''} onChange={(e) => setSection((s) => ({ ...s, heroSubtitle: e.target.value }))} className={INPUT} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={LABEL}>Founders eyebrow</label>
              <input type="text" value={section.foundersEyebrow ?? ''} onChange={(e) => setSection((s) => ({ ...s, foundersEyebrow: e.target.value }))} className={INPUT} />
            </div>
            <div>
              <label className={LABEL}>Founders title</label>
              <input type="text" value={section.foundersTitle ?? ''} onChange={(e) => setSection((s) => ({ ...s, foundersTitle: e.target.value }))} className={INPUT} />
            </div>
            <div>
              <label className={LABEL}>Leaders eyebrow</label>
              <input type="text" value={section.leadersEyebrow ?? ''} onChange={(e) => setSection((s) => ({ ...s, leadersEyebrow: e.target.value }))} className={INPUT} />
            </div>
            <div>
              <label className={LABEL}>Leaders title</label>
              <input type="text" value={section.leadersTitle ?? ''} onChange={(e) => setSection((s) => ({ ...s, leadersTitle: e.target.value }))} className={INPUT} />
            </div>
          </div>
          <div>
            <label className={LABEL}>Leaders subtitle</label>
            <textarea rows={2} value={section.leadersSubtitle ?? ''} onChange={(e) => setSection((s) => ({ ...s, leadersSubtitle: e.target.value }))} className={INPUT} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={LABEL}>Join eyebrow</label>
              <input type="text" value={section.joinEyebrow ?? ''} onChange={(e) => setSection((s) => ({ ...s, joinEyebrow: e.target.value }))} className={INPUT} />
            </div>
            <div>
              <label className={LABEL}>Join title</label>
              <input type="text" value={section.joinTitle ?? ''} onChange={(e) => setSection((s) => ({ ...s, joinTitle: e.target.value }))} className={INPUT} />
            </div>
            <div>
              <label className={LABEL}>Join title highlight</label>
              <input type="text" value={section.joinTitleHighlight ?? ''} onChange={(e) => setSection((s) => ({ ...s, joinTitleHighlight: e.target.value }))} className={INPUT} />
            </div>
            <div>
              <label className={LABEL}>Join subtitle</label>
              <input type="text" value={section.joinSubtitle ?? ''} onChange={(e) => setSection((s) => ({ ...s, joinSubtitle: e.target.value }))} className={INPUT} />
            </div>
            <div>
              <label className={LABEL}>Join primary button label</label>
              <input type="text" value={section.joinPrimaryLabel ?? ''} onChange={(e) => setSection((s) => ({ ...s, joinPrimaryLabel: e.target.value }))} className={INPUT} />
            </div>
            <div>
              <label className={LABEL}>Join primary button href</label>
              <input type="text" value={section.joinPrimaryHref ?? ''} onChange={(e) => setSection((s) => ({ ...s, joinPrimaryHref: e.target.value }))} className={INPUT} />
            </div>
          </div>
          <button type="button" onClick={handleSaveSection} className="rounded-lg bg-[var(--blue)] px-4 py-2 text-sm font-600 text-white hover:opacity-90">
            Save section copy
          </button>
        </div>
      </div>

      {/* Team members list */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-700 text-[var(--blue)]">Team members</h2>
        {!creating && !editing && (
          <button type="button" onClick={() => setCreating(true)} className="inline-flex items-center gap-2 rounded-lg bg-[var(--rose)] px-4 py-2 text-sm font-600 text-white hover:opacity-90">
            <Plus className="h-4 w-4" /> Add member
          </button>
        )}
      </div>

      {formTarget && (
        <MemberForm initial={formTarget} onSave={handleSaveMember} onCancel={closeForm} isEdit={!!editing} />
      )}

      <div className="rounded-xl border border-[var(--blue)]/10 bg-white shadow-sm overflow-hidden">
        <ul className="divide-y divide-[var(--blue)]/10">
          {members.map((m) => (
            <li key={m.id} className="flex items-center gap-4 p-4">
              <span className="text-[var(--g400)]" aria-hidden><GripVertical className="h-5 w-5" /></span>
              <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full bg-[var(--g100)]">
                {m.photoUrl ? <img src={m.photoUrl} alt="" className="h-full w-full object-cover" /> : <span className="flex h-full items-center justify-center text-xs text-[var(--g400)]">—</span>}
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-700 text-[var(--blue)]">{m.name}</p>
                <p className="text-sm text-[var(--g600)]">{m.role} · {CATEGORY_LABELS[m.category]} · {m.region || 'No region'}</p>
              </div>
              <div className="flex shrink-0 gap-2">
                <button type="button" onClick={() => setEditing(m)} className="rounded p-2 text-[var(--g600)] hover:bg-[var(--rose-15)] hover:text-[var(--rose)]" aria-label="Edit"><Pencil className="h-4 w-4" /></button>
                <button type="button" onClick={() => handleDelete(m.id)} className="rounded p-2 text-[var(--g600)] hover:bg-[var(--orange-30)] hover:text-[var(--orange)]" aria-label="Delete"><Trash2 className="h-4 w-4" /></button>
              </div>
            </li>
          ))}
        </ul>
        {members.length === 0 && !formTarget && <p className="p-8 text-center text-[var(--g600)]">No team members. Add one above.</p>}
      </div>
    </div>
  );
}

/* ── Member form ── */
function MemberForm({
  initial,
  onSave,
  onCancel,
  isEdit,
}: {
  initial: TeamMember;
  onSave: (v: Omit<TeamMember, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onCancel: () => void;
  isEdit: boolean;
}) {
  const [name, setName] = useState(initial.name);
  const [role, setRole] = useState(initial.role);
  const [region, setRegion] = useState(initial.region);
  const [bio, setBio] = useState(initial.bio);
  const [photoUrl, setPhotoUrl] = useState(initial.photoUrl);
  const [photoAlt, setPhotoAlt] = useState(initial.photoAlt);
  const [email, setEmail] = useState(initial.email);
  const [linkedInUrl, setLinkedInUrl] = useState(initial.linkedInUrl);
  const [category, setCategory] = useState(initial.category);
  const [isActive, setIsActive] = useState(initial.isActive !== false);

  return (
    <div className="mb-6 rounded-xl border border-[var(--blue)]/10 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-lg font-700 text-[var(--blue)]">{isEdit ? 'Edit member' : 'New member'}</h2>
      <div className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <ImageUpload label="Photo" value={photoUrl} onChange={setPhotoUrl} />
          </div>
          <div>
            <label className={LABEL}>Photo alt</label>
            <input type="text" value={photoAlt} onChange={(e) => setPhotoAlt(e.target.value)} className={INPUT} />
          </div>
          <div>
            <label className={LABEL}>Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className={INPUT} />
          </div>
          <div>
            <label className={LABEL}>Role / title</label>
            <input type="text" value={role} onChange={(e) => setRole(e.target.value)} className={INPUT} placeholder="e.g. Programme Officer" />
          </div>
          <div>
            <label className={LABEL}>Category</label>
            <select value={category} onChange={(e) => setCategory(e.target.value as TeamMember['category'])} className={INPUT}>
              <option value="founder">Founder / Co-founder</option>
              <option value="programme_leader">Programme Leader</option>
              <option value="staff">Staff</option>
              <option value="volunteer">Volunteer</option>
            </select>
          </div>
          <div>
            <label className={LABEL}>Region</label>
            <input type="text" value={region} onChange={(e) => setRegion(e.target.value)} className={INPUT} placeholder="e.g. Mbeya Region" />
          </div>
          <div>
            <label className={LABEL}>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={INPUT} />
          </div>
          <div>
            <label className={LABEL}>LinkedIn URL</label>
            <input type="url" value={linkedInUrl} onChange={(e) => setLinkedInUrl(e.target.value)} className={INPUT} />
          </div>
        </div>
        <div>
          <label className={LABEL}>Bio</label>
          <textarea rows={3} value={bio} onChange={(e) => setBio(e.target.value)} className={INPUT} />
        </div>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} className="rounded border-[var(--g400)]" />
          <span className="text-sm font-600 text-[var(--g800)]">Active (visible on public site)</span>
        </label>
      </div>
      <div className="mt-4 flex gap-3">
        <button
          type="button"
          onClick={() => onSave({ name, role, region, bio, photoUrl, photoAlt, email, linkedInUrl, category, order: initial.order, isActive })}
          className="rounded-lg bg-[var(--rose)] px-4 py-2 text-sm font-600 text-white hover:opacity-90"
        >
          Save
        </button>
        <button type="button" onClick={onCancel} className="rounded-lg border border-[var(--g400)]/40 px-4 py-2 text-sm font-600 text-[var(--g800)] hover:bg-[var(--g100)]">
          Cancel
        </button>
      </div>
    </div>
  );
}
