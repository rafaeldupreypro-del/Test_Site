import Link from 'next/link';
import { getSiteSettings } from '@/lib/sanity/queries';

export const revalidate = 60;

export const metadata = {
  title: 'Mentions légales',
  robots: { index: false, follow: true },
  alternates: { canonical: '/mentions-legales' },
};

function val(v) {
  return v && String(v).trim() ? v : 'à compléter';
}

export default async function MentionsLegalesPage() {
  const settings = await getSiteSettings().catch(() => null);
  const agencyName = settings?.agencyName || 'Atelier Méridien';
  const email = settings?.email || 'contact@atelier-meridien.fr';
  const addressLine1 = settings?.addressLine1 || '';
  const addressLine2 = settings?.addressLine2 || '';

  return (
    <>
      <section className="page-banner">
        <div className="blueprint-grid fade-bottom" aria-hidden="true"></div>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <nav className="breadcrumb" aria-label="Fil d'Ariane">
            <Link href="/">Accueil</Link>
            <span className="sep">/</span>
            <span aria-current="page">Mentions légales</span>
          </nav>
          <p className="eyebrow no-rule">Informations légales</p>
          <h1 className="h-1" style={{ marginTop: '1rem' }}>Mentions légales</h1>
        </div>
      </section>

      <section className="section" style={{ paddingTop: '1rem' }}>
        <div className="container" style={{ maxWidth: '760px' }}>
          <div className="legal-text">
            <h2 className="h-3">Éditeur du site</h2>
            <p>
              Le présent site est édité par <strong>{val(settings?.legalCompanyName) === 'à compléter' ? agencyName : settings.legalCompanyName}</strong>
              {settings?.legalLegalForm ? `, ${settings.legalLegalForm}` : ''}
              {settings?.legalCapital ? ` au capital social de ${settings.legalCapital}` : ''}.
            </p>
            <ul>
              <li>Siège social : {val(addressLine1 || addressLine2 ? `${addressLine1} ${addressLine2}`.trim() : null)}</li>
              <li>SIRET : {val(settings?.legalSiret)}</li>
              <li>RCS : {val(settings?.legalRcs)}</li>
              <li>N° TVA intracommunautaire : {val(settings?.legalVatNumber)}</li>
              <li>E-mail : {email}</li>
              <li>Directeur de la publication : {val(settings?.legalDirector)}</li>
            </ul>

            <h2 className="h-3">Hébergement</h2>
            <p>
              Le site est hébergé par <strong>{settings?.legalHostName || 'Vercel Inc.'}</strong>, {settings?.legalHostAddress || '340 S Lemon Ave #4133, Walnut, CA 91789, USA'}.
            </p>

            <h2 className="h-3">Propriété intellectuelle</h2>
            <p>
              L&rsquo;ensemble des contenus présents sur ce site (textes, images, logos, illustrations) est protégé par le droit d&rsquo;auteur et reste la propriété de {settings?.legalCompanyName || agencyName} ou de ses partenaires, sauf mention contraire. Toute reproduction, représentation ou diffusion, totale ou partielle, sans autorisation préalable est interdite.
            </p>

            <h2 className="h-3">Responsabilité</h2>
            <p>
              {settings?.legalCompanyName || agencyName} s&rsquo;efforce d&rsquo;assurer l&rsquo;exactitude des informations diffusées sur ce site, sans garantie d&rsquo;exhaustivité. La responsabilité de l&rsquo;éditeur ne saurait être engagée en cas d&rsquo;erreur, d&rsquo;omission, ou de résultat obtenu par un mauvais usage de ces informations.
            </p>

            <h2 className="h-3">Contact</h2>
            <p>
              Pour toute question relative au site, vous pouvez nous écrire à <a href={`mailto:${email}`}>{email}</a> ou consulter notre <Link href="/contact">page de contact</Link>.
            </p>

            <p style={{ marginTop: '2rem' }}>
              Voir également notre <Link href="/confidentialite">politique de confidentialité</Link> et notre <Link href="/cookies">politique de cookies</Link>.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
