'use client';

import { useMemo } from 'react';
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
  return (
    <section id="ibar">
      <div className="container">
        <div className="ibar-head rv">
          <p className="ey ct">Impact Evidence</p>
          <h2>
            Evidence of <span>Change</span>
          </h2>
          <p>
            We measure progress through participation, access, and practical outcomes across families, children, and
            communities in Mbeya and Mara.
          </p>
        </div>
        <div className="igrid">
          {items.map((item, i) => (
            <div key={item.id} className={`ic rv ${i % 3 === 1 ? 'd1' : i % 3 === 2 ? 'd2' : ''}`}>
              <span className="ico">{item.iconEmoji}</span>
              <span className="n">
                {item.suffix ? (
                  <>
                    <span className="counter" data-target={item.number}>0</span>
                    <sup>{item.suffix}</sup>
                  </>
                ) : (
                  item.number
                )}
              </span>
              <span className="l">{item.label}</span>
              <span className="s">{item.subtitle}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

