import Link from 'next/link';
import { getAllProjects } from '@/lib/sanity/queries';
import ProjectFilterGrid from '@/components/ProjectFilterGrid';

export const revalidate = 60;

export const metadata = {
  title: 'Projets',
  description: "Retrouvez l'ensemble des réalisations de l'agence : logements, équipements culturels, bureaux et projets urbains.",
  alternates: { canonical: '/projets' },
};

export default async function ProjetsPage() {
  const projects = await getAllProjects().catch(() => []);

  return (
    <>
      <section className="page-banner">
        <div className="blueprint-grid fade-bottom" aria-hidden="true"></div>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <nav className="breadcrumb" aria-label="Fil d'Ariane">
            <Link href="/">Accueil</Link>
            <span className="sep">/</span>
            <span aria-current="page">Projets</span>
          </nav>
          <p className="eyebrow no-rule">Portfolio</p>
          <h1 className="h-1" style={{ marginTop: '1rem', maxWidth: '18ch' }}>{projects.length} projets, un même carnet de site.</h1>
          <p className="lede" style={{ marginTop: '1.5rem' }}>Logements, équipements publics, bureaux et études urbaines — un aperçu de nos réalisations livrées ou en cours.</p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: '1rem' }}>
        <div className="container">
          <ProjectFilterGrid projects={projects} />
        </div>
      </section>

      <section className="section text-center on-alt">
        <div className="container" data-reveal>
          <p className="eyebrow center">Votre projet</p>
          <h2 className="h-2" style={{ marginTop: '1rem' }}>Il n&rsquo;attend qu&rsquo;un premier trait.</h2>
          <Link href="/contact" className="btn btn-primary" style={{ marginTop: '2rem' }}>Démarrer un échange
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </Link>
        </div>
      </section>
    </>
  );
}
