import Link from 'next/link';
import { getSiteSettings } from '@/lib/sanity/queries';

export const revalidate = 60;

export const metadata = {
  title: 'Politique de cookies',
  robots: { index: false, follow: true },
  alternates: { canonical: '/cookies' },
};

export default async function CookiesPage() {
  const settings = await getSiteSettings().catch(() => null);
  const hasAnalytics = Boolean(process.env.NEXT_PUBLIC_GA_ID);

  return (
    <>
      <section className="page-banner">
        <div className="blueprint-grid fade-bottom" aria-hidden="true"></div>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <nav className="breadcrumb" aria-label="Fil d'Ariane">
            <Link href="/">Accueil</Link>
            <span className="sep">/</span>
            <span aria-current="page">Cookies</span>
          </nav>
          <p className="eyebrow no-rule">Informations légales</p>
          <h1 className="h-1" style={{ marginTop: '1rem' }}>Politique de cookies</h1>
        </div>
      </section>

      <section className="section" style={{ paddingTop: '1rem' }}>
        <div className="container" style={{ maxWidth: '760px' }}>
          <div className="legal-text">
            <p>
              Ce site utilise un nombre volontairement limité de cookies et technologies similaires. Voici le détail de ce qui est déposé sur votre navigateur et pourquoi.
            </p>

            <h2 className="h-3">Cookies strictement nécessaires</h2>
            <p>
              Aucun compte utilisateur ni panier n&rsquo;étant proposé sur ce site, seul un cookie technique mémorise votre choix concernant les cookies de mesure d&rsquo;audience (accepté / refusé), afin de ne pas vous redemander à chaque visite. Ce cookie ne peut pas être désactivé et ne collecte aucune donnée personnelle.
            </p>

            <h2 className="h-3">Cookies de mesure d&rsquo;audience</h2>
            {hasAnalytics ? (
              <p>
                Avec votre accord, ce site utilise <strong>Google Analytics</strong> pour comprendre comment les pages sont consultées (nombre de visites, pages populaires, provenance du trafic). Ces données sont agrégées et ne permettent pas de vous identifier personnellement. Vous pouvez à tout moment refuser ces cookies en effaçant les données de navigation de votre navigateur pour ce site, ce qui réaffichera le bandeau de consentement.
              </p>
            ) : (
              <p>
                Ce site n&rsquo;utilise pas actuellement de cookies de mesure d&rsquo;audience nécessitant votre consentement. Cette section sera mise à jour si un outil de statistiques est activé.
              </p>
            )}

            <h2 className="h-3">Vercel Analytics</h2>
            <p>
              Ce site utilise également Vercel Analytics et Vercel Speed Insights, des outils de mesure d&rsquo;audience et de performance qui ne déposent pas de cookies et ne suivent pas les visiteurs individuellement ; à ce titre, ils ne sont pas soumis à consentement préalable.
            </p>

            <h2 className="h-3">Gérer vos préférences</h2>
            <p>
              Vous pouvez à tout moment modifier votre choix concernant les cookies de mesure d&rsquo;audience en supprimant les cookies de ce site depuis les réglages de votre navigateur : le bandeau de consentement s&rsquo;affichera à nouveau lors de votre prochaine visite.
            </p>

            <p style={{ marginTop: '2rem' }}>
              Voir également nos <Link href="/mentions-legales">mentions légales</Link> et notre <Link href="/confidentialite">politique de confidentialité</Link>.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
