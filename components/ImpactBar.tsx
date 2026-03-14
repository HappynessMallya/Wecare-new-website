'use client';

export function ImpactBar() {
  return (
    <section id="ibar">
      <div className="container">
        <div className="igrid">
          <div className="ic rv">
            <span className="ico">👨‍👩‍👧</span>
            <span className="n">
              <span className="counter" data-target="5000">
                0
              </span>
              <sup>+</sup>
            </span>
            <span className="l">Parents &amp; Caregivers</span>
            <span className="s">Reached with ECD info</span>
          </div>
          <div className="ic rv d1">
            <span className="ico">👶</span>
            <span className="n">
              <span className="counter" data-target="800">
                0
              </span>
              <sup>+</sup>
            </span>
            <span className="l">Children Enrolled</span>
            <span className="s">Daycare &amp; Pre-School</span>
          </div>
          <div className="ic rv d2">
            <span className="ico">🛒</span>
            <span className="n">1</span>
            <span className="l">Market Centre</span>
            <span className="s">Mwanjelwa Market, Mbeya</span>
          </div>
          <div className="ic rv d3">
            <span className="ico">🎯</span>
            <span className="n">
              <span className="counter" data-target="210">
                0
              </span>
              <sup>+</sup>
            </span>
            <span className="l">Children Life-Skilled</span>
            <span className="s">Ages 3–5, 6–9, 10–12, 15+</span>
          </div>
        </div>
      </div>
    </section>
  );
}

