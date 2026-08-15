import Link from 'next/link';
import { getSiteSettings } from '@/lib/sanity/queries';

export const revalidate = 60;

export const metadata = {
  title: 'Politique de confidentialité',
  robots: { index: false, follow: true },
  alternates: { canonical: '/confidentialite' },
};

export default async function ConfidentialitePage() {
  const settings = await getSiteSettings().catch(() => null);
  const agencyName = settings?.agencyName || 'Atelier Méridien';
  const email = settings?.email || 'contact@atelier-meridien.fr';

  return (
    <>
      <section className="page-banner">
        <div className="blueprint-grid fade-bottom" aria-hidden="true"></div>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <nav className="breadcrumb" aria-label="Fil d'Ariane">
            <Link href="/">Accueil</Link>
            <span className="sep">/</span>
            <span aria-current="page">Confidentialité</span>
          </nav>
          <p className="eyebrow no-rule">Informations légales</p>
          <h1 className="h-1" style={{ marginTop: '1rem' }}>Politique de confidentialité</h1>
        </div>
      </section>

      <section className="section" style={{ paddingTop: '1rem' }}>
        <div className="container" style={{ maxWidth: '760px' }}>
          <div className="legal-text">
            <p>
              {settings?.legalCompanyName || agencyName} accorde une grande importance à la protection de vos données personnelles. Cette page explique quelles données sont collectées via ce site, pourquoi, et comment vous pouvez exercer vos droits.
            </p>

            <h2 className="h-3">Données collectées</h2>
            <p>Selon votre usage du site, nous pouvons collecter :</p>
            <ul>
              <li>Les informations que vous renseignez volontairement dans le formulaire de contact (nom, e-mail, téléphone si fourni, message) ;</li>
              <li>Votre adresse e-mail si vous vous inscrivez à notre newsletter ;</li>
              <li>Des données de navigation anonymisées (pages consultées, provenance) si vous acceptez les cookies de mesure d&rsquo;audience.</li>
            </ul>

            <h2 className="h-3">Finalités</h2>
            <p>
              Ces données sont utilisées uniquement pour répondre à vos demandes de contact, vous envoyer notre newsletter si vous y avez consenti, et mesurer la fréquentation du site afin de l&rsquo;améliorer. Elles ne sont ni vendues, ni cédées à des tiers à des fins commerciales.
            </p>

            <h2 className="h-3">Durée de conservation</h2>
            <p>
              Les données issues du formulaire de contact sont conservées le temps nécessaire au traitement de votre demande, puis archivées ou supprimées. Vous pouvez vous désinscrire de la newsletter à tout moment via le lien présent dans chaque e-mail.
            </p>

            <h2 className="h-3">Vos droits</h2>
            <p>
              Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez d&rsquo;un droit d&rsquo;accès, de rectification, d&rsquo;effacement et d&rsquo;opposition concernant vos données personnelles. Pour exercer ces droits, contactez-nous à <a href={`mailto:${email}`}>{email}</a>.
            </p>

            <h2 className="h-3">Cookies</h2>
            <p>
              Le détail des cookies utilisés sur ce site est disponible sur notre <Link href="/cookies">politique de cookies</Link>.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
