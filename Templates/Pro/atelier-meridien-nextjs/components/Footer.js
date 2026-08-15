import Link from 'next/link';
import NewsletterForm from './NewsletterForm';

export default function Footer({ settings }) {
  const agencyName = settings?.agencyName || 'Atelier Méridien';
  const logoText = settings?.logoText || 'Atelier|Méridien';
  const [logoStart, logoEnd] = logoText.split('|');
  const phone = settings?.phone || '02 35 12 00 34';
  const phoneHref = settings?.phoneHref || '+33235120034';
  const email = settings?.email || 'contact@atelier-meridien.fr';
  const addressLine1 = settings?.addressLine1 || '12 Quai de Southampton';
  const addressLine2 = settings?.addressLine2 || '76600 Le Havre';
  const social = settings?.socialLinks?.length
    ? settings.socialLinks
    : [{ label: 'Instagram', url: '#' }, { label: 'LinkedIn', url: '#' }, { label: 'Pinterest', url: '#' }];

  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <Link href="/" className="brand" style={{ color: 'var(--dark-ink)' }}>{logoStart} <span>{logoEnd}</span></Link>
          <p style={{ marginTop: '1.25rem', maxWidth: '32ch' }}>Agence d&rsquo;architecture et d&rsquo;urbanisme basée au Havre, active en Normandie et en Île-de-France.</p>
        </div>
        <div>
          <h5>Navigation</h5>
          <ul>
            <li><Link href="/">Accueil</Link></li>
            <li><Link href="/agence">Agence</Link></li>
            <li><Link href="/projets">Projets</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h5>Contact</h5>
          <ul>
            <li><a href={`tel:${phoneHref}`}>{phone}</a></li>
            <li><a href={`mailto:${email}`}>{email}</a></li>
            <li>{addressLine1}<br />{addressLine2}</li>
          </ul>
        </div>
        <div>
          <h5>Suivre</h5>
          <ul>
            {social.map((s) => (
              <li key={s.label}><a href={s.url || '#'}>{s.label}</a></li>
            ))}
          </ul>
        </div>
      </div>
      <div className="footer-newsletter">
        <div className="container footer-newsletter__inner">
          <div className="footer-newsletter__copy">
            <p>Recevoir nos actualités</p>
            <p>Un e-mail occasionnel : nouveaux projets livrés, distinctions, participations à des concours.</p>
          </div>
          <NewsletterForm variant="footer" />
        </div>
      </div>

      <div className="container footer-bottom">
        <span>© <span data-year></span> {agencyName} — Tous droits réservés</span>
        <nav className="footer-legal" aria-label="Informations légales">
          <Link href="/mentions-legales">Mentions légales</Link>
          <Link href="/confidentialite">Confidentialité</Link>
          <Link href="/cookies">Cookies</Link>
        </nav>
        <span>49.4938° N, 0.1077° E · Le Havre</span>
      </div>

      <button className="to-top" aria-label="Retourner en haut de page">
        <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5"><path d="M12 19V5M5 12l7-7 7 7" /></svg>
      </button>
    </footer>
  );
}
