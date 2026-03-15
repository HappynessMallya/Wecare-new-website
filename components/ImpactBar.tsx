'use client';

import { useMemo } from 'react';
import type { ImpactItem } from '@/lib/api';

const FALLBACK_ITEMS: ImpactItem[] = [
  { id: '1', iconEmoji: '👨‍👩‍👧', number: '5000', suffix: '+', label: 'Parents & Caregivers', subtitle: 'Reached with ECD info', order: 0 },
  { id: '2', iconEmoji: '👶', number: '800', suffix: '+', label: 'Children Enrolled', subtitle: 'Daycare & Pre-School', order: 1 },
  { id: '3', iconEmoji: '🛒', number: '1', suffix: '', label: 'Market Centre', subtitle: 'Mwanjelwa Market, Mbeya', order: 2 },
  { id: '4', iconEmoji: '🎯', number: '210', suffix: '+', label: 'Children Life-Skilled', subtitle: 'Ages 3–5, 6–9, 10–12, 15+', order: 3 },
];

const DELAY_CLASS = ['', 'd1', 'd2', 'd3'];

export function ImpactBar({ items: itemsProp }: { items?: ImpactItem[] | null } = {}) {
  const items = useMemo(() => itemsProp?.length ? itemsProp : FALLBACK_ITEMS, [itemsProp]);
  return (
    <section id="ibar">
      <div className="container">
        <div className="igrid">
          {items.map((item, i) => (
            <div key={item.id} className={`ic rv ${DELAY_CLASS[i] ?? ''}`}>
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

