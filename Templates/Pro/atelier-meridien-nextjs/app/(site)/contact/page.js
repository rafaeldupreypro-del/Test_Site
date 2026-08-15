import Link from 'next/link';
import { getSiteSettings } from '@/lib/sanity/queries';
import ContactForm from '@/components/ContactForm';

export const revalidate = 60;

export const metadata = {
  title: 'Contact',
  description: 'Contactez notre agence pour échanger sur votre projet architectural.',
  alternates: { canonical: '/contact' },
};

const FAQ = [
  { q: 'Intervenez-vous en dehors de la région ?', a: "Oui, une partie de nos projets se situent aujourd'hui hors de notre région d'origine. Nous restons toutefois attachés à une présence de chantier régulière, ce qui nous conduit à privilégier un rayon raisonnable autour de l'agence.", open: true },
  { q: 'Quel est le budget minimum pour un projet de maison individuelle ?', a: 'Nous intervenons généralement à partir de 250 000 € de travaux pour une construction neuve, et dès 80 000 € pour une extension ou une rénovation lourde. Chaque situation reste étudiée au cas par cas lors du premier échange.' },
  { q: 'Proposez-vous une mission complète, du permis à la réception des travaux ?', a: "Oui, notre mission standard couvre l'esquisse, le permis de construire, les études d'exécution et le suivi de chantier jusqu'à la livraison. Des missions partielles restent possibles selon votre besoin." },
  { q: "Combien de temps dure une étude de faisabilité ?", a: 'Comptez en moyenne trois à quatre semaines entre la visite de site et la remise d’une esquisse accompagnée d’une première estimation budgétaire.' },
  { q: 'Travaillez-vous avec des artisans partenaires ?', a: 'Nous accompagnons la consultation d’entreprises mais restons indépendants de tout artisan : le choix final revient toujours au maître d’ouvrage, sur la base d’un dossier de consultation neutre.' },
];

export default async function ContactPage() {
  const settings = await getSiteSettings().catch(() => null);
  const phone = settings?.phone || '02 35 12 00 34';
  const phoneHref = settings?.phoneHref || '+33235120034';
  const email = settings?.email || 'contact@atelier-meridien.fr';
  const addressLine1 = settings?.addressLine1 || '12 Quai de Southampton';
  const addressLine2 = settings?.addressLine2 || '76600 Le Havre';
  const hours = settings?.openingHours || 'Lun–Ven : 9h–13h / 14h–18h30';
  const mapUrl = settings?.mapEmbedUrl || 'https://www.google.com/maps?q=12+Quai+de+Southampton,+76600+Le+Havre&output=embed';
  const social = settings?.socialLinks?.length
    ? settings.socialLinks
    : [{ label: 'Instagram', url: '#' }, { label: 'LinkedIn', url: '#' }, { label: 'Pinterest', url: '#' }];

  return (
    <>
      <section className="page-banner">
        <div className="blueprint-grid fade-bottom" aria-hidden="true"></div>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <nav className="breadcrumb" aria-label="Fil d'Ariane">
            <Link href="/">Accueil</Link>
            <span className="sep">/</span>
            <span aria-current="page">Contact</span>
          </nav>
          <p className="eyebrow no-rule">Contact</p>
          <h1 className="h-1" style={{ marginTop: '1rem', maxWidth: '18ch' }}>Parlons de votre projet.</h1>
          <p className="lede" style={{ marginTop: '1.5rem' }}>Un premier échange, sans engagement, pour comprendre votre programme et évaluer sa faisabilité.</p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: '1rem' }}>
        <div className="container">
          <div className="grid" style={{ gridTemplateColumns: '1.3fr 1fr', gap: '4rem', alignItems: 'start' }}>
            <div data-reveal>
              <ContactForm />
            </div>

            <div data-reveal data-reveal-delay="1">
              <div className="info-card">
                <p className="eyebrow no-rule" style={{ marginBottom: '.5rem' }}>Coordonnées</p>
                <dl>
                  <dt>Adresse</dt>
                  <dd>{addressLine1}<br />{addressLine2}</dd>
                  <dt>Téléphone</dt>
                  <dd><a href={`tel:${phoneHref}`}>{phone}</a></dd>
                  <dt>E-mail</dt>
                  <dd><a href={`mailto:${email}`}>{email}</a></dd>
                  <dt>Horaires</dt>
                  <dd>{hours}</dd>
                </dl>
                <div className="social-row">
                  {social.map((s) => <a key={s.label} href={s.url || '#'}>{s.label}</a>)}
                </div>
                <div className="social-row" style={{ borderTop: 'none', paddingTop: 0, marginTop: '1rem' }}>
                  <a href="/assets/atelier-meridien-plaquette.pdf" download>Plaquette PDF ↓</a>
                </div>
              </div>

              <div className="frame mt-2" style={{ aspectRatio: '4 / 3', overflow: 'hidden' }}>
                <span className="tick-a" aria-hidden="true"></span><span className="tick-b" aria-hidden="true"></span>
                <iframe
                  title="Localisation de l'agence"
                  style={{ width: '100%', height: '100%', border: 0, filter: 'grayscale(.4) contrast(1.05)' }}
                  loading="lazy"
                  allowFullScreen
                  src={mapUrl}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section on-alt">
        <div className="container-narrow">
          <p className="eyebrow center" data-reveal>Questions fréquentes</p>
          <h2 className="h-2 text-center" style={{ marginTop: '1rem' }} data-reveal>Avant de nous écrire</h2>

          <div className="mt-3" data-reveal>
            {FAQ.map((item) => (
              <details className="faq-item" key={item.q} open={item.open}>
                <summary>{item.q}<span className="plus"></span></summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
