import Link from 'next/link';
import { getSiteSettings } from '@/lib/sanity/queries';

export const revalidate = 60;

export const metadata = {
  title: "L'agence",
  description: "Une équipe d'architectes et urbanistes : découvrez notre histoire, nos valeurs et notre équipe.",
  alternates: { canonical: '/agence' },
};

const TIMELINE = [
  { year: '2011', title: 'Fondation', body: "Les fondateurs créent l'agence, avec un premier chantier de 18 logements." },
  { year: '2015', title: 'Premier équipement public', body: 'Livraison de la crèche des Hauts de Bléville, remarquée pour son travail sur la lumière naturelle.' },
  { year: '2019', title: "Ouverture à l'urbanisme", body: 'Constitution d’un pôle urbanisme dédié aux études de requalification de friches portuaires.' },
  { year: '2023', title: "Prix Européen d'Architecture", body: 'La Médiathèque des Docks reçoit le Prix Européen d’Architecture Contemporaine, catégorie équipements culturels.' },
  { year: '2026', title: "Aujourd'hui", body: 'Une équipe pluridisciplinaire, une trentaine de projets en cours entre Normandie et Île-de-France.' },
];

const VALUES = [
  { title: 'Sur-mesure', body: 'Aucun projet type : chaque réponse est dessinée pour un site et un programme uniques.' },
  { title: 'Sobriété', body: "Réemploi, matériaux biosourcés et conception bioclimatique dès l'esquisse." },
  { title: 'Dialogue', body: 'Un interlocuteur unique et disponible du permis de construire à la livraison.' },
  { title: 'Rigueur', body: 'Un suivi de chantier précis, garant du respect du budget et des délais.' },
];

const TEAM = [
  { initials: 'CA', name: 'Camille Assouline', role: 'Architecte associée', art: 'art-1' },
  { initials: 'NH', name: 'Nils Herrera', role: 'Architecte associé', art: 'art-5' },
  { initials: 'LF', name: 'Léa Fontenay', role: 'Urbaniste', art: 'art-2' },
  { initials: 'TM', name: 'Tarek Mahfoud', role: 'Chef de projet', art: 'art-4' },
  { initials: 'SB', name: 'Solène Bricard', role: 'Architecte DE', art: 'art-6' },
  { initials: 'YK', name: 'Yann Kervadec', role: 'Paysagiste', art: 'art-3' },
  { initials: 'RD', name: 'Romane Duval', role: 'Économiste de la construction', art: 'art-1' },
  { initials: 'PG', name: 'Paul Guénec', role: 'Directeur de travaux', art: 'art-5' },
];

const DISTINCTIONS = [
  { title: "Prix Européen d'Architecture", year: '2023' },
  { title: 'AMC — Palmarès des Jeunes Agences', year: '2021' },
  { title: 'Le Moniteur — Trophée Bois', year: '2020' },
  { title: 'Label BDM Normandie', year: '2024' },
];

export default async function AgencePage() {
  const settings = await getSiteSettings().catch(() => null);
  const foundedYear = settings?.statFoundedYear ?? 2011;
  const teamSize = settings?.statTeamSize ?? 14;

  return (
    <>
      <section className="page-banner">
        <div className="blueprint-grid fade-bottom" aria-hidden="true"></div>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <nav className="breadcrumb" aria-label="Fil d'Ariane">
            <Link href="/">Accueil</Link>
            <span className="sep">/</span>
            <span aria-current="page">Agence</span>
          </nav>
          <p className="eyebrow no-rule">L&rsquo;agence</p>
          <h1 className="h-1" style={{ marginTop: '1rem', maxWidth: '16ch' }}>{teamSize} personnes, un même souci du lieu.</h1>
          <p className="lede" style={{ marginTop: '1.5rem' }}>
            Fondée en {foundedYear}, l&rsquo;agence réunit aujourd&rsquo;hui architectes, urbanistes et paysagistes autour d&rsquo;une conviction commune&nbsp;: bien construire commence par bien regarder.
          </p>
          <div className="page-banner__meta">
            <span>Fondée en {foundedYear}</span>
            <span>Le Havre — Normandie</span>
            <span>Inscrite à l&rsquo;Ordre des Architectes</span>
          </div>
          <a href="/assets/atelier-meridien-plaquette.pdf" className="btn btn-outline" style={{ marginTop: '2rem' }} download>
            Télécharger la plaquette (PDF)
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 3v13m0 0l-4-4m4 4l4-4M5 21h14" /></svg>
          </a>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid grid-2" style={{ gap: '4rem' }}>
            <div data-reveal>
              <p className="eyebrow">Notre histoire</p>
              <h2 className="h-2" style={{ marginTop: '1rem' }}>Une trajectoire ancrée en Normandie</h2>
              <p className="mt-2" style={{ color: 'var(--ink-70)', maxWidth: '52ch' }}>
                Nées d&rsquo;une commande de logements sociaux, nos premières années ont posé les bases d&rsquo;une méthode&nbsp;: temps long d&rsquo;analyse, dialogue continu avec la maîtrise d&rsquo;ouvrage, exigence sur la mise en œuvre.
              </p>
            </div>

            <div className="timeline" data-reveal data-reveal-delay="1">
              {TIMELINE.map((item) => (
                <div className="timeline-item" key={item.year}>
                  <p className="timeline-year">{item.year}</p>
                  <h4 className="h-3" style={{ fontSize: '1.1rem' }}>{item.title}</h4>
                  <p className="mt-1" style={{ color: 'var(--ink-70)', fontSize: '.92rem' }}>{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section on-alt">
        <div className="container">
          <p className="eyebrow center" data-reveal>Nos valeurs</p>
          <h2 className="h-2 text-center" style={{ marginTop: '1rem', marginInline: 'auto', maxWidth: '24ch' }} data-reveal>Ce qui guide chacun de nos projets</h2>

          <div className="grid grid-4" style={{ marginTop: '3.5rem' }}>
            {VALUES.map((v, i) => (
              <div data-reveal data-reveal-delay={i} key={v.title}>
                <h4 className="h-3" style={{ fontSize: '1.05rem', marginTop: '1.25rem' }}>{v.title}</h4>
                <p className="mt-1" style={{ color: 'var(--ink-70)', fontSize: '.9rem' }}>{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <p className="eyebrow" data-reveal>L&rsquo;équipe</p>
          <h2 className="h-2" style={{ marginTop: '1rem' }} data-reveal>Les personnes derrière les plans</h2>

          <div className="grid grid-4" style={{ marginTop: '3rem' }}>
            {TEAM.map((member, i) => (
              <div data-reveal data-reveal-delay={i % 4} key={member.name}>
                <div className={`team-card__avatar ${member.art}`}>{member.initials}</div>
                <p className="team-card__name">{member.name}</p>
                <p className="team-card__role">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-tight on-dark">
        <div className="container">
          <p className="eyebrow on-dark center" data-reveal>Reconnaissance</p>
          <div className="grid grid-4" style={{ marginTop: '2.5rem', textAlign: 'center' }} data-reveal>
            {DISTINCTIONS.map((d) => (
              <div key={d.title}>
                <p style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: '1.05rem' }}>{d.title}</p>
                <p className="coord" style={{ color: 'var(--dark-ink-45)', marginTop: '.4rem' }}>{d.year}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section text-center">
        <div className="container" data-reveal>
          <h2 className="h-2">Envie de nous rencontrer ?</h2>
          <Link href="/contact" className="btn btn-primary" style={{ marginTop: '2rem' }}>Je prends contact
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </Link>
        </div>
      </section>
    </>
  );
}
