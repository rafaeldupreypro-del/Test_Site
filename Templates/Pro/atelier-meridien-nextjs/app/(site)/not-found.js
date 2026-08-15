import Link from 'next/link';

export const metadata = {
  title: 'Page introuvable',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="page-banner" style={{ paddingBottom: '5rem' }}>
      <div className="blueprint-grid fade-bottom" aria-hidden="true"></div>
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <p className="eyebrow no-rule">Erreur 404</p>
        <h1 className="h-1" style={{ marginTop: '1rem', maxWidth: '20ch' }}>Ce plan n&rsquo;a pas été retrouvé dans nos archives.</h1>
        <p className="lede" style={{ marginTop: '1.5rem' }}>La page que vous cherchez a peut-être changé d&rsquo;adresse ou n&rsquo;existe plus. Voici quelques pistes pour repartir du bon plan.</p>

        <div className="cluster" style={{ gap: '1rem', marginTop: '2.5rem' }}>
          <Link href="/" className="btn btn-primary">Retour à l&rsquo;accueil
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </Link>
          <Link href="/projets" className="btn btn-outline">Voir nos projets</Link>
          <Link href="/contact" className="btn btn-outline">Nous contacter</Link>
        </div>
      </div>
    </section>
  );
}
