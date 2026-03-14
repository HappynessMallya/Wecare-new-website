'use client';

import { Mail } from 'lucide-react';

export function Leadership() {
  return (
    <section id="leadership">
      <div className="container">
        <div className="sh rv" style={{ marginBottom: 56 }}>
          <p className="ey ct">Our Leadership</p>
          <h2>
            Meet the <span>Founder &amp; CEO</span>
          </h2>
        </div>
        <div className="ldr rv d1">
          <div className="ldr-photo">
            <img
              src="/ceo.png"
              alt="Elizabeth Maginga Thobias – CEO WeCare Foundation"
            />
            <div className="ldr-badge">
              <strong>
                WeCare
                <br />
                Foundation
              </strong>
              <small>CEO &amp; Founder</small>
            </div>
          </div>
          <div className="ldr-content">
            <p className="ey">Founder &amp; Chief Executive Officer</p>
            <h2>
              Elizabeth <span>Maginga Thobias</span>
            </h2>
            <span className="ldr-title">
              Chief Executive Officer (CEO) — WeCare Foundation
            </span>
            <p>
              Elizabeth Maginga Thobias is the visionary founder and CEO of WeCare Foundation. She
              established WeCare in 2022 with a singular mission: to ensure every child in Tanzania
              — regardless of their family&apos;s economic circumstances — has access to quality
              early childhood development, care, and learning.
            </p>
            <p>
              Under her leadership, WeCare has grown from a community initiative in Mbeya into a
              nationally recognised ECD organisation operating across Mbeya and Mara regions,
              partnering with the Government of Tanzania, international organisations, and local
              communities to deliver sustainable impact for children and families.
            </p>
            <p>
              Elizabeth leads WeCare&apos;s four core programs: Early Childhood Development, Quality
              Early Learning, Child Care in Public Spaces, and Early Life Skills Training — reaching
              over 5,000 parents and 800+ children across Tanzania.
            </p>
            <a href="mailto:Wecarefoundation025@gmail.com" className="ldr-email">
              <Mail className="ldr-email-ico" size={16} aria-hidden />
              Wecarefoundation025@gmail.com
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
