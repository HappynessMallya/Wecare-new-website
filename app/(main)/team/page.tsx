import { getLeadershipPublic } from '@/lib/public-api';

export default async function TeamPage() {
  const leadership = await getLeadershipPublic();
  const directorName =
    [leadership?.name?.trim(), leadership?.nameHighlight?.trim()].filter(Boolean).join(' ') ||
    'Director Name';
  const directorRole = leadership?.eyebrow?.trim() || 'Director and Co founder';

  const otherFounders = [
    { name: 'Founder Name 2', linkedin: 'https://www.linkedin.com/' },
    { name: 'Founder Name 3', linkedin: 'https://www.linkedin.com/' },
  ];

  const programLeaders = [
    { area: 'Mbeya', name: 'School / Program Leader - Mbeya', linkedin: 'https://www.linkedin.com/' },
    { area: 'Tarime', name: 'School / Program Leader - Tarime', linkedin: 'https://www.linkedin.com/' },
  ];

  return (
    <main id="main-content">
      <section id="team">
        <div className="container">
          <div className="sh">
            <p className="ey ct">Leadership</p>
            <h2>
              Our <span>Team</span>
            </h2>
          </div>

          <div className="mvcards" style={{ marginTop: 0 }}>
            <div className="mvc">
              <h4>Director and Co founder</h4>
              <p>
                <strong>{directorName}</strong>
                <br />
                {directorRole}
                <br />
                <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">
                  LinkedIn profile
                </a>
              </p>
            </div>

            <div className="mvc v">
              <h4>Other founders</h4>
              <p>
                {otherFounders.map((f) => (
                  <span key={f.name} style={{ display: 'block', marginBottom: 8 }}>
                    <strong>{f.name}</strong> -{' '}
                    <a href={f.linkedin} target="_blank" rel="noopener noreferrer">
                      LinkedIn profile
                    </a>
                  </span>
                ))}
              </p>
            </div>
          </div>

          <div className="mvcards" style={{ marginTop: 8 }}>
            {programLeaders.map((leader) => (
              <div key={leader.area} className="mvc">
                <h4>School leaders / Program leaders ({leader.area})</h4>
                <p>
                  <strong>{leader.name}</strong>
                  <br />
                  <a href={leader.linkedin} target="_blank" rel="noopener noreferrer">
                    LinkedIn profile
                  </a>
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
