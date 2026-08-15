import Link from 'next/link';

const NAV = [
  { href: '/', label: 'Accueil' },
  { href: '/agence', label: 'Agence' },
  { href: '/projets', label: 'Projets' },
  { href: '/contact', label: 'Contact' },
];

export default function Header({ settings }) {
  const phone = settings?.phone || '02 35 12 00 34';
  const phoneHref = settings?.phoneHref || '+33235120034';
  const logoText = settings?.logoText || 'Atelier|Méridien';
  const [logoStart, logoEnd] = logoText.split('|');
  const years = settings?.statYears ?? 14;
  const projects = settings?.statProjects ?? 62;
  const foundedYear = settings?.statFoundedYear ?? 2011;
  const hours = settings?.openingHours || 'Lun–Ven 9h–18h30';

  return (
    <>
      <div className="trust-bar">
        <div className="trust-bar__inner">
          <div className="trust-bar__points">
            <span>{years} architectes &amp; urbanistes</span>
            <span>{projects} projets livrés</span>
            <span>Depuis {foundedYear} — Le Havre</span>
          </div>
          <span className="trust-bar__call">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
            {hours}
          </span>
        </div>
      </div>

      <header className="site-header">
        <div className="site-header__bar">
          <Link href="/" className="brand">{logoStart} <span>{logoEnd}</span></Link>
          <nav className="nav-links" aria-label="Navigation principale">
            {NAV.map((item) => (
              <Link key={item.href} href={item.href}>{item.label}</Link>
            ))}
          </nav>
          <div className="site-header__actions">
            <a href={`tel:${phoneHref}`} className="header-call" aria-label="Appeler l'agence">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.362 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0122 16.92z" /></svg>
              <span className="header-call__num">{phone}</span>
            </a>
            <Link href="/contact" className="nav-cta desktop-only">Je prends contact</Link>
            <button className="nav-toggle" aria-label="Ouvrir le menu" aria-expanded="false" aria-controls="mobile-menu">
              <span></span><span></span><span></span>
            </button>
          </div>
        </div>
        <nav id="mobile-menu" className="mobile-panel" aria-label="Navigation mobile">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href}>{item.label}</Link>
          ))}
        </nav>
      </header>
    </>
  );
}
