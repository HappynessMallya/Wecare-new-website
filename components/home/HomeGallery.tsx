'use client';

export function HomeGallery() {
  return (
    <section id="gallery">
      <div className="gstrip">
        <div className="gi">
          <img src="/parent-clinic.jpg" alt="WeCare parent clinic" loading="lazy" />
          <div className="giov">
            <span>Parent Clinic</span>
          </div>
        </div>
        <div className="gi">
          <img src="/kids.jpg" alt="WeCare daycare and children" loading="lazy" />
          <div className="giov">
            <span>Daycare &amp; Children</span>
          </div>
        </div>
        <div className="gi">
          <img src="/parentclinic.jpg" alt="Parent engagement" loading="lazy" />
          <div className="giov">
            <span>Parent Engagement</span>
          </div>
        </div>
        <div className="gi">
          <img src="/kids-at-work.jpg" alt="Child at WeCare program" loading="lazy" />
          <div className="giov">
            <span>Child at WeCare</span>
          </div>
        </div>
        <div className="gi">
          <img src="/kids-planting.jpg" alt="WeCare life skills and environment" loading="lazy" />
          <div className="giov">
            <span>Life Skills &amp; Environment</span>
          </div>
        </div>
      </div>
    </section>
  );
}
