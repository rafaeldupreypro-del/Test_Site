import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getProjectBySlug, getProjectSlugs, getProjectNeighbours } from '@/lib/sanity/queries';
import { urlFor } from '@/lib/sanity/image';
import { artClassFor } from '@/components/ProjectCard';

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getProjectSlugs().catch(() => []);
  return slugs.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const project = await getProjectBySlug(params.slug).catch(() => null);
  if (!project) return {};

  const description = project.seoDescription
    || `${project.title}, ${project.location} — projet ${project.category} par notre agence, ${project.year || ''}.`;

  return {
    title: project.title,
    description,
    alternates: { canonical: `/projets/${project.slug.current}` },
    openGraph: { type: 'article', title: project.title, description },
    twitter: { card: 'summary_large_image' },
  };
}

export default async function ProjectPage({ params }) {
  const project = await getProjectBySlug(params.slug).catch(() => null);
  if (!project) notFound();

  const { prev, next } = await getProjectNeighbours(params.slug).catch(() => ({ prev: null, next: null }));
  const artClass = artClassFor(project.plateNumber || project.title);
  const coverImage = project.coverImage ? urlFor(project.coverImage).width(1600).height(800).fit('crop').url() : null;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    about: project.tag || project.category,
    locationCreated: project.location ? { '@type': 'Place', name: project.location } : undefined,
    dateCreated: project.year ? String(project.year) : undefined,
  };
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: '/' },
      { '@type': 'ListItem', position: 2, name: 'Projets', item: '/projets' },
      { '@type': 'ListItem', position: 3, name: project.title, item: `/projets/${project.slug.current}` },
    ],
  };

  const specs = [
    ['Maîtrise d’ouvrage', project.client],
    ['Lieu', project.specLocation || project.location],
    ['Surface', project.surface],
    ['Budget', project.budget],
    ['Livraison', project.delivery],
    ['Équipe', project.team],
    ['Distinction', project.distinction],
  ].filter(([, value]) => Boolean(value));

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <section className="page-banner" style={{ paddingBottom: '2.5rem' }}>
        <div className="container">
          <nav className="breadcrumb" aria-label="Fil d'Ariane">
            <Link href="/">Accueil</Link>
            <span className="sep">/</span>
            <Link href="/projets">Projets</Link>
            <span className="sep">/</span>
            <span aria-current="page">{project.title}</span>
          </nav>
          <p className="eyebrow no-rule" style={{ marginTop: '2rem' }}>{project.eyebrowMeta}</p>
          <h1 className="h-1" style={{ marginTop: '.75rem', maxWidth: '20ch' }}>{project.title}</h1>
          <div className="page-banner__meta">
            {(project.bannerMeta || []).map((line) => <span key={line}>{line}</span>)}
          </div>
        </div>
      </section>

      <section className="container">
        <div className={`detail-hero__art ${artClass} frame`} data-reveal style={coverImage ? { position: 'relative', overflow: 'hidden' } : undefined}>
          <span className="tick-a" aria-hidden="true"></span><span className="tick-b" aria-hidden="true"></span>
          {coverImage && <Image src={coverImage} alt={project.title} fill sizes="100vw" style={{ objectFit: 'cover' }} priority />}
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid" style={{ gridTemplateColumns: '2fr 1fr', gap: '4rem' }}>
            <div>
              {(project.sections || []).map((section, i) => (
                <div key={i}>
                  <p className="eyebrow" data-reveal>{section.eyebrow}</p>
                  <h2 className="h-2" style={{ marginTop: '1rem' }} data-reveal>{section.heading}</h2>
                  <p className="mt-2" style={{ color: 'var(--ink-70)' }} data-reveal>{section.body}</p>
                  {i === 0 && project.pullQuote && (
                    <p className="pull-quote" data-reveal>«&nbsp;{project.pullQuote}&nbsp;»</p>
                  )}
                </div>
              ))}

              {project.gallery?.length > 0 && (
                <div className="mini-gallery mt-3" data-reveal>
                  {project.gallery.map((img, i) => (
                    <div key={i} className="frame" style={{ position: 'relative', overflow: 'hidden' }}>
                      <span className="tick-a"></span><span className="tick-b"></span>
                      <Image src={urlFor(img).width(500).height(375).fit('crop').url()} alt="" fill style={{ objectFit: 'cover' }} />
                    </div>
                  ))}
                </div>
              )}
            </div>

            <aside data-reveal>
              <div className="info-card" style={{ position: 'sticky', top: '100px' }}>
                <p className="eyebrow no-rule" style={{ marginBottom: '.5rem' }}>Fiche technique</p>
                <dl className="spec-list">
                  {specs.map(([label, value]) => (
                    <div key={label}>
                      <dt>{label}</dt>
                      <dd>{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {(prev || next) && (
        <nav className="project-nav" aria-label="Navigation entre projets">
          {prev && (
            <Link href={`/projets/${prev.slug}`} className="prev">
              <p className="coord" style={{ marginBottom: '.5rem' }}>← Projet précédent</p>
              <p className="h-3">{prev.title}</p>
            </Link>
          )}
          {next && (
            <Link href={`/projets/${next.slug}`} className="next">
              <p className="coord" style={{ marginBottom: '.5rem' }}>Projet suivant →</p>
              <p className="h-3">{next.title}</p>
            </Link>
          )}
        </nav>
      )}

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
