'use client';

import { useMemo } from 'react';
import type { TickerItem } from '@/lib/api';

const COLOR_MAP: Record<TickerItem['colorKey'], string> = {
  blue: 'var(--blue)',
  rose: 'var(--rose)',
  orange: 'var(--orange)',
  azure: 'var(--azure)',
};

const FALLBACK_ITEMS: TickerItem[] = [
  { id: '1', label: '5,000+ Parents & caregivers reached', colorKey: 'blue', order: 0 },
  { id: '2', label: '800+ Children in daycare & pre-school', colorKey: 'rose', order: 1 },
  { id: '3', label: '210+ Children in life skills training', colorKey: 'orange', order: 2 },
  { id: '4', label: 'Government of Tanzania · Partner', colorKey: 'azure', order: 3 },
  { id: '5', label: 'TECDEN · Helvetas · GSF · Pediatric Association', colorKey: 'blue', order: 4 },
  { id: '6', label: 'Early Childhood Development · Ages 0–5', colorKey: 'rose', order: 5 },
  { id: '7', label: 'School readiness · Parent clinics · Mwanjelwa Market', colorKey: 'orange', order: 6 },
  { id: '8', label: 'Mbeya & Mara regions', colorKey: 'azure', order: 7 },
];

export function SDGTicker({ items: itemsProp }: { items?: TickerItem[] | null } = {}) {
  const items = useMemo(() => itemsProp?.length ? itemsProp : FALLBACK_ITEMS, [itemsProp]);
  const duplicated = useMemo(() => [...items, ...items], [items]);
  return (
    <div className="sdgbar">
      <div className="sdgtrack">
        {duplicated.map((item, i) => (
          <div key={`${item.id}-${i}`} className="sdgi">
            <span className="sdgd" style={{ background: COLOR_MAP[item.colorKey] }} />
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
}
