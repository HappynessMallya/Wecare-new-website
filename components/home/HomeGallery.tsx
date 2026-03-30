'use client';

import { useMemo } from 'react';
import Image from 'next/image';
import type { GalleryItem } from '@/lib/api';

const FALLBACK: GalleryItem[] = [
  { id: '1', imageUrl: '/parent-clinic.jpg', alt: 'WeCare parent clinic', label: 'Parent Clinic', order: 0 },
  { id: '2', imageUrl: '/kids.jpg', alt: 'WeCare daycare and children', label: 'Daycare & Children', order: 1 },
  { id: '3', imageUrl: '/parentclinic.jpg', alt: 'Parent engagement', label: 'Parent Engagement', order: 2 },
  { id: '4', imageUrl: '/kids-at-work.jpg', alt: 'Child at WeCare program', label: 'Child at WeCare', order: 3 },
  { id: '5', imageUrl: '/kids-planting.jpg', alt: 'WeCare life skills and environment', label: 'Life Skills & Environment', order: 4 },
];

export function HomeGallery({ items: itemsProp }: { items?: GalleryItem[] | null } = {}) {
  const items = useMemo(() => itemsProp?.length ? itemsProp : FALLBACK, [itemsProp]);
  const duplicated = useMemo(() => [...items, ...items], [items]);
  return (
    <section id="gallery">
      <div className="container gallery-head">
        <p className="ey ct">Gallery</p>
        <h2>Life at WeCare</h2>
        {/* <a href="#contact" className="btn b-blue">
          View All Photos <span className="arr">→</span>
        </a> */}
      </div>
      <div className="gallery-scroll-wrap">
        <div className="gstrip" aria-hidden>
          {duplicated.map((item, i) => (
            <div key={`${item.id}-${i}`} className="gi">
              <Image
                src={item.imageUrl}
                alt={item.alt}
                fill
                sizes="(max-width: 768px) 50vw, 260px"
                className="object-cover"
                unoptimized={item.imageUrl.startsWith('http')}
              />
              <div className="giov">
                <div>
                  <strong>{item.label}</strong>
                  <span>Community impact story</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
