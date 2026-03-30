'use client';

/**
 * Thin blue stats bar shown directly below the hero.
 * Matches the .stats-bar section from index.html reference.
 */
export function StatsBar() {
  return (
    <div className="stats-bar">
      <div className="stats-inner">
        <div className="stat-item rv">
          <div className="stat-num">5,000<em>+</em></div>
          <div className="stat-label">Parents Reached</div>
        </div>
        <div className="stat-item rv d1">
          <div className="stat-num">800<em>+</em></div>
          <div className="stat-label">Children Enrolled</div>
        </div>
        <div className="stat-item rv d2">
          <div className="stat-num">210<em>+</em></div>
          <div className="stat-label">Life-Skilled Children</div>
        </div>
        <div className="stat-item rv d3">
          <div className="stat-num">2</div>
          <div className="stat-label">ECD Schools</div>
        </div>
        <div className="stat-item rv">
          <div className="stat-num">2 <em>Regions</em></div>
          <div className="stat-label">Mbeya &amp; Mara</div>
        </div>
      </div>
    </div>
  );
}
