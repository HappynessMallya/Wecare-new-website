'use client';

import { WHATSAPP_URL } from '@/lib/constants';

export function HomeCTA() {
  return (
    <section id="involved">
      <div className="container">
        <div className="sh rv">
          <p className="ey ct">Get Involved</p>
          <h2>
            Be Part of the <span>Change</span>
          </h2>
          <p>
            There are meaningful ways to join WeCare&apos;s mission — whether you&apos;re a funder,
            partner organisation, or individual who believes every Tanzanian child deserves the best
            start in life.
          </p>
        </div>
        <div className="invg">
          <div className="invc c1 rv">
            <div className="ico">❤️</div>
            <h3>Donate</h3>
            <p>
              Your contribution directly funds daycare centres, parent clinic sessions, school
              readiness programs, and the Mwanjelwa community child care centre in Mbeya. Every
              shilling creates real, measurable change.
            </p>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="ibtn">
              Make a Donation →
            </a>
          </div>
          <div className="invc c2 rv d1">
            <div className="ico">🤝</div>
            <h3>Partner With Us</h3>
            <p>
              We welcome partnerships with NGOs, corporations, foundations, and government bodies.
              Co-create programs, fund initiatives, or share expertise to multiply impact across
              Tanzania&apos;s ECD landscape.
            </p>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="ibtn">
              Explore Partnership →
            </a>
          </div>
          <div className="invc c3 rv d2">
            <div className="ico">🙋</div>
            <h3>Volunteer</h3>
            <p>
              Bring your skills to Mbeya or Mara and make a direct difference. We welcome early
              childhood educators, health professionals, social workers, researchers, and
              communications specialists.
            </p>
            <a href="#contact" className="ibtn">
              Join as Volunteer →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
