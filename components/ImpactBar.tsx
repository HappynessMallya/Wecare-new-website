'use client';

import { useMemo } from 'react';
import { Users, Baby, Store, Target, School } from 'lucide-react';
import type { ImpactItem } from '@/lib/api';

const FALLBACK_ITEMS: ImpactItem[] = [
  { id: '1', iconEmoji: '👨‍👩‍👧', number: '5000', suffix: '+', label: 'Parents & Caregivers', subtitle: 'Reached with ECD info', order: 0 },
  { id: '2', iconEmoji: '👶', number: '800', suffix: '+', label: 'Children Enrolled', subtitle: 'Daycare & Pre-School', order: 1 },
  { id: '3', iconEmoji: '🛒', number: '1', suffix: '', label: 'Market Centre', subtitle: 'Mwanjelwa Market, Mbeya', order: 2 },
  { id: '4', iconEmoji: '🎯', number: '210', suffix: '+', label: 'Children Life-Skilled', subtitle: 'Ages 3–5, 6–9, 10–12, 15+', order: 3 },
  { id: '5', iconEmoji: '🏫', number: '2', suffix: '', label: 'Schools for ECD Education', subtitle: 'Mara & Mbeya', order: 4 },
];

function ensureSchoolsMetric(items: ImpactItem[]): ImpactItem[] {
  const hasSchools = items.some((item) =>
    `${item.label} ${item.subtitle}`.toLowerCase().includes('school'),
  );
  if (hasSchools) return items;
  return [
    ...items,
    {
      id: 'schools-ecd',
      iconEmoji: '🏫',
      number: '2',
      suffix: '',
      label: 'Schools for ECD Education',
      subtitle: 'Mara & Mbeya',
      order: items.length,
    },
  ];
}

export function ImpactBar({ items: itemsProp }: { items?: ImpactItem[] | null } = {}) {
  const items = useMemo(() => {
    const base = itemsProp?.length ? itemsProp : FALLBACK_ITEMS;
    return ensureSchoolsMetric(base);
  }, [itemsProp]);
  const ICONS = [Users, Baby, Store, Target, School];
  return (
    <section id="ibar" className="impact">
      <div className="impact-bg-art" />
      <div className="impact-inner">
        <div className="impact-header rv">
          <p className="eyebrow center">Impact Evidence</p>
          <h2 className="section-title white">Evidence of Change</h2>
          <p className="section-sub white" style={{ margin: '0 auto', textAlign: 'center' }}>
            We measure progress through participation, access, and practical outcomes across families, children, and communities in Mbeya and Mara.
          </p>
        </div>
        <div className="impact-grid">
          {items.map((item, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
            <div key={item.id} className={`impact-card rv ${i % 3 === 1 ? 'd1' : i % 3 === 2 ? 'd2' : ''}`}>
              <div className="impact-icon-wrap"><Icon size={22} strokeWidth={2.2} /></div>
              <div className="impact-num">
                <span className="counter" data-target={item.number}>0</span>
                {item.suffix ? <em>{item.suffix}</em> : null}
              </div>
              <div className="impact-label">{item.label}</div>
              {item.subtitle && <div className="impact-sub">{item.subtitle}</div>}
            </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

