import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getPostBySlug, getPostSlugs } from '@/lib/sanity/queries';
import { urlFor } from '@/lib/sanity/image';
import ArticleBody from '@/components/ArticleBody';

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getPostSlugs().catch(() => []);
  return slugs.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const post = await getPostBySlug(params.slug).catch(() => null);
  if (!post) return {};

  const description = post.seoDescription || post.excerpt || post.title;

  return {
    title: post.title,
    description,
    alternates: { canonical: `/actualites/${post.slug.current}` },
    openGraph: { type: 'article', title: post.title, description },
    twitter: { card: 'summary_large_image' },
  };
}

function formatDate(iso) {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default async function PostPage({ params }) {
  const post = await getPostBySlug(params.slug).catch(() => null);
  if (!post) notFound();

  const coverImage = post.coverImage ? urlFor(post.coverImage).width(1600).height(800).fit('crop').url() : null;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    datePublished: post.publishedAt,
    description: post.seoDescription || post.excerpt || undefined,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="page-banner" style={{ paddingBottom: '2.5rem' }}>
        <div className="container">
          <nav className="breadcrumb" aria-label="Fil d'Ariane">
            <Link href="/">Accueil</Link>
            <span className="sep">/</span>
            <Link href="/actualites">Actualités</Link>
            <span className="sep">/</span>
            <span aria-current="page">{post.title}</span>
          </nav>
          <p className="eyebrow no-rule" style={{ marginTop: '2rem' }}>{formatDate(post.publishedAt)}</p>
          <h1 className="h-1" style={{ marginTop: '.75rem', maxWidth: '24ch' }}>{post.title}</h1>
        </div>
      </section>

      {coverImage && (
        <section className="container">
          <div className="detail-hero__art frame" data-reveal style={{ position: 'relative', overflow: 'hidden' }}>
            <span className="tick-a" aria-hidden="true"></span><span className="tick-b" aria-hidden="true"></span>
            <Image src={coverImage} alt={post.title} fill sizes="100vw" style={{ objectFit: 'cover' }} priority />
          </div>
        </section>
      )}

      <section className="section">
        <div className="container" style={{ maxWidth: '760px' }}>
          <ArticleBody value={post.body} />
        </div>
      </section>

      <section className="section text-center on-dark">
        <div className="container" data-reveal>
          <p className="eyebrow on-dark center">Votre projet</p>
          <h2 className="h-2" style={{ marginTop: '1rem' }}>Un site, un programme, une histoire à écrire.</h2>
          <Link href="/contact" className="btn btn-outline on-dark-btn" style={{ marginTop: '2rem' }}>Nous en parler
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </Link>
        </div>
      </section>
    </>
  );
}
