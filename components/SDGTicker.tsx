'use client';

/** Real WeCare data: impact stats, partners, and program focus (single source for ticker). */
const TICKER_ITEMS = [
  { varColor: 'var(--blue)', label: '5,000+ Parents & caregivers reached' },
  { varColor: 'var(--rose)', label: '800+ Children in daycare & pre-school' },
  { varColor: 'var(--orange)', label: '210+ Children in life skills training' },
  { varColor: 'var(--azure)', label: 'Government of Tanzania · Partner' },
  { varColor: 'var(--blue)', label: 'TECDEN · Helvetas · GSF · Pediatric Association' },
  { varColor: 'var(--rose)', label: 'Early Childhood Development · Ages 0–5' },
  { varColor: 'var(--orange)', label: 'School readiness · Parent clinics · Mwanjelwa Market' },
  { varColor: 'var(--azure)', label: 'Mbeya & Mara regions' },
];

export function SDGTicker() {
  const duplicated = [...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div className="sdgbar">
      <div className="sdgtrack">
        {duplicated.map((item, i) => (
          <div key={i} className="sdgi">
            <span className="sdgd" style={{ background: item.varColor }} />
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
}
