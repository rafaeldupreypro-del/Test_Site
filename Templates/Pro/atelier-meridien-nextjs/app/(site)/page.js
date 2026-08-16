import Image from 'next/image';
import Link from 'next/link';
import { getSiteSettings, getFeaturedProjects, getActiveEvent, getClientNames } from '@/lib/sanity/queries';
import { urlFor } from '@/lib/sanity/image';
import ProjectCard from '@/components/ProjectCard';
import EventBanner from '@/components/EventBanner';
import NewsletterModal from '@/components/NewsletterModal';
import TrustedByStrip from '@/components/TrustedByStrip';
import GoogleReviews from '@/components/GoogleReviews';
import TrustpilotWidget from '@/components/TrustpilotWidget';

export const revalidate = 60;

export default async function HomePage() {
  const [settings, featured, event, clientNames] = await Promise.all([
    getSiteSettings().catch(() => null),
    getFeaturedProjects().catch(() => []),
    getActiveEvent().catch(() => null),
    getClientNames().catch(() => []),
  ]);

  const heroTitle = settings?.heroTitle || "Agence d'architecture & d'urbanisme, au Havre.";
  const heroLede = settings?.heroLede
    || "Depuis 2011, Atelier Méridien dessine des logements, des équipements publics et des bureaux qui prennent le temps de comprendre leur site avant de le transformer.";
  const heroImage = settings?.heroImage ? urlFor(settings.heroImage).width(900).height(1125).fit('crop').url() : '/assets/Maison.jpeg';
  const years = settings?.statYears ?? 14;
  const projectsCount = settings?.statProjects ?? 62;
  const surface = settings?.statSurface ?? 48000;
  const awards = settings?.statAwards ?? 5;
  const quoteText = settings?.quoteText || "Ils ont su transformer une contrainte de site en véritable parti pris architectural. Le résultat dépasse largement ce que nous avions imaginé.";
  const quoteAuthor = settings?.quoteAuthor || 'Le Havre Seine Métropole, maîtrise d’ouvrage Médiathèque des Docks';
  // CRO : plusieurs témoignages renforcent la preuve sociale davantage qu'une
  // citation unique. On retombe sur l'ancien champ simple si la liste est vide,
  // pour ne rien casser sur les sites clients pas encore mis à jour.
  const testimonials = settings?.testimonials?.length > 0
    ? settings.testimonials
    : [{ quote: quoteText, author: quoteAuthor }];

  return (
    <>
      <NewsletterModal />

      <section className="hero">
        <div className="blueprint-grid fade-bottom" aria-hidden="true"></div>
        <div className="container hero__grid">
          <div style={{ position: 'relative', zIndex: 1 }}>
            <h1 className="h-display" dangerouslySetInnerHTML={{ __html: heroTitle }} />
            <p className="lede" style={{ marginTop: '1.75rem' }}>{heroLede}</p>
            <div className="cluster" style={{ gap: '1rem', marginTop: '2.5rem' }}>
              <Link href="/projets" className="btn btn-primary">Voir nos projets
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </Link>
              <Link href="/contact" className="btn btn-outline">Je prends contact</Link>
            </div>
          </div>

          <div className="hero-photo">
            <div className="hero-photo__frame">
              <Image src={heroImage} alt="Réalisation de l'agence" fill sizes="(max-width: 780px) 100vw, 45vw" style={{ objectFit: 'cover' }} priority />
            </div>
            <div className="hero-photo__badge hero-photo__badge--year">
              Des projets <strong>récompensés</strong>, du Trophée Bois au Prix Européen d&rsquo;Architecture
            </div>
            <div className="hero-photo__badge hero-photo__badge--projects">
              <strong>{projectsCount} projets</strong> livrés jusqu&rsquo;à leur inauguration
            </div>
            <div className="hero-photo__badge hero-photo__badge--team">
              Une équipe de <strong>{settings?.statTeamSize ?? 14} personnes</strong> réunie autour de chaque projet
            </div>
          </div>
        </div>
      </section>

      {event && <EventBanner event={event} />}

      <TrustedByStrip clients={clientNames} />

      <section className="on-dark">
        <div className="stats container" style={{ paddingInline: 0 }}>
          <div><p className="stat-num">{years}<span>ans</span></p><p className="stat-label">D&rsquo;exercice</p></div>
          <div><p className="stat-num">{projectsCount}</p><p className="stat-label">Projets livrés</p></div>
          <div><p className="stat-num">{Math.round(surface / 1000)}<span>&nbsp;000</span></p><p className="stat-label">m² conçus</p></div>
          <div><p className="stat-num">{String(awards).padStart(2, '0')}</p><p className="stat-label">Prix &amp; distinctions</p></div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid grid-3">
            <div data-reveal>
              <p className="plate-num">§ 01</p>
              <h3 className="h-3">Contexte</h3>
              <p className="mt-1" style={{ color: 'var(--ink-70)', fontSize: '.94rem' }}>Chaque projet part d&rsquo;une lecture précise du site : lumière, topographie, matériaux locaux, usages existants. L&rsquo;architecture s&rsquo;écrit après, jamais avant.</p>
            </div>
            <div data-reveal data-reveal-delay="1">
              <p className="plate-num">§ 02</p>
              <h3 className="h-3">Matière</h3>
              <p className="mt-1" style={{ color: 'var(--ink-70)', fontSize: '.94rem' }}>Nous privilégions des matériaux durables et sincères — bois, béton brut, brique, verre — assumés dans leur texture plutôt que masqués.</p>
            </div>
            <div data-reveal data-reveal-delay="2">
              <p className="plate-num">§ 03</p>
              <h3 className="h-3">Usage</h3>
              <p className="mt-1" style={{ color: 'var(--ink-70)', fontSize: '.94rem' }}>Un bâtiment se juge à l&rsquo;usage qu&rsquo;on en fait dix ans après sa livraison. Nous dessinons pour cette durée-là, pas pour l&rsquo;image du jour de l&rsquo;inauguration.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section on-alt">
        <div className="container">
          <div className="cluster" style={{ justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem' }} data-reveal>
            <div>
              <p className="eyebrow">Sélection</p>
              <h2 className="h-2" style={{ marginTop: '.75rem' }}>Projets récents</h2>
            </div>
            <Link href="/projets" className="btn btn-outline" style={{ flexShrink: 0 }}>Tous les projets
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </Link>
          </div>

          <div className="grid grid-3">
            {featured.length > 0
              ? featured.map((project, i) => <ProjectCard key={project.slug} project={project} index={i} delay={i} />)
              : (
                <p style={{ color: 'var(--ink-55)' }}>
                  Aucun projet mis en avant pour le moment — marquez des projets comme « Mettre en avant sur l&rsquo;accueil » dans le Studio.
                </p>
              )}
          </div>
        </div>
      </section>

      <section className="section on-dark">
        <div className="container" data-reveal>
          <div className={testimonials.length > 1 ? 'grid grid-3 quote-grid' : undefined}>
            {testimonials.map((t, i) => (
              <div className={`quote${testimonials.length > 1 ? ' quote--card' : ''}`} key={t.author || i}>
                <blockquote>«&nbsp;{t.quote}&nbsp;»</blockquote>
                <cite>— {t.author}</cite>
              </div>
            ))}
          </div>
        </div>
      </section>

      <GoogleReviews placeId={settings?.googlePlaceId} />

      <TrustpilotWidget businessUnitId={settings?.trustpilotBusinessUnitId} reviewUrl={settings?.trustpilotUrl} />

      <section className="section">
        <div className="container text-center" data-reveal>
          <p className="eyebrow center">Contact</p>
          <h2 className="h-2" style={{ marginTop: '1rem' }}>Un projet en tête ?</h2>
          <p className="lede" style={{ marginInline: 'auto', marginTop: '1rem' }}>Parlons-en autour d&rsquo;un premier échange, sans engagement.</p>
          <Link href="/contact" className="btn btn-primary" style={{ marginTop: '2rem' }}>Prendre rendez-vous
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </Link>
        </div>
      </section>
    </>
  );
}
