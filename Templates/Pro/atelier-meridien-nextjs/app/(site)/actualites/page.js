import Link from 'next/link';
import { getAllPosts } from '@/lib/sanity/queries';
import PostCard from '@/components/PostCard';

export const revalidate = 60;

export const metadata = {
  title: 'Actualités',
  description: "Nouveaux projets livrés, distinctions et participations à des concours — les actualités de l'agence.",
  alternates: { canonical: '/actualites' },
};

export default async function ActualitesPage() {
  const posts = await getAllPosts().catch(() => []);

  return (
    <>
      <section className="page-banner">
        <div className="blueprint-grid fade-bottom" aria-hidden="true"></div>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <nav className="breadcrumb" aria-label="Fil d'Ariane">
            <Link href="/">Accueil</Link>
            <span className="sep">/</span>
            <span aria-current="page">Actualités</span>
          </nav>
          <p className="eyebrow no-rule">Journal</p>
          <h1 className="h-1" style={{ marginTop: '1rem', maxWidth: '18ch' }}>Actualités de l&rsquo;agence.</h1>
          <p className="lede" style={{ marginTop: '1.5rem' }}>Projets livrés, distinctions, participations à des concours et regards sur notre pratique.</p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: '1rem' }}>
        <div className="container">
          {posts.length > 0 ? (
            <div className="grid grid-3">
              {posts.map((post, i) => <PostCard key={post.slug} post={post} delay={i % 3} />)}
            </div>
          ) : (
            <p style={{ color: 'var(--ink-55)' }}>
              Aucun article publié pour le moment — revenez bientôt.
            </p>
          )}
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
