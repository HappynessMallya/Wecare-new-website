'use client';

const GALLERY_ITEMS = [
  { src: '/parent-clinic.jpg', alt: 'WeCare parent clinic', label: 'Parent Clinic' },
  { src: '/kids.jpg', alt: 'WeCare daycare and children', label: 'Daycare & Children' },
  { src: '/parentclinic.jpg', alt: 'Parent engagement', label: 'Parent Engagement' },
  { src: '/kids-at-work.jpg', alt: 'Child at WeCare program', label: 'Child at WeCare' },
  { src: '/kids-planting.jpg', alt: 'WeCare life skills and environment', label: 'Life Skills & Environment' },
];

export function HomeGallery() {
  return (
    <section id="gallery">
      <div className="gallery-scroll-wrap">
        <div className="gstrip" aria-hidden>
          {[...GALLERY_ITEMS, ...GALLERY_ITEMS].map((item, i) => (
            <div key={i} className="gi">
              <img src={item.src} alt={item.alt} loading="lazy" />
              <div className="giov">
                <span>{item.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
