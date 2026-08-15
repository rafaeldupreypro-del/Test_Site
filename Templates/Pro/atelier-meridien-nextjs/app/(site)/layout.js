import '../globals.css';
import { Fraunces, Inter, IBM_Plex_Mono } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SiteChrome from '@/components/SiteChrome';
import { getSiteSettings } from '@/lib/sanity/queries';

/* -------------------------------------------------------------------------
   Polices — auto-hébergées via next/font (aucune requête externe au
   chargement, pas de décalage visuel). Le CSS (globals.css) référence
   Fraunces / Inter / IBM Plex Mono par leur nom sans jamais les charger :
   ces variables les rendent réellement disponibles au navigateur.
   ------------------------------------------------------------------------- */
const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-fraunces',
  display: 'swap',
});
const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});
const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-plex-mono',
  display: 'swap',
});

export async function generateMetadata() {
  const settings = await getSiteSettings().catch(() => null);
  const agencyName = settings?.agencyName || 'Atelier Méridien';
  const description = settings?.defaultSeoDescription
    || "Agence d'architecture et d'urbanisme au Havre : logements, équipements culturels, bureaux et projets urbains.";

  return {
    title: { default: `${agencyName} | Agence d'architecture & urbanisme`, template: `%s | ${agencyName}` },
    description,
    icons: {
      icon: [
        { url: '/favicon.ico' },
        { url: '/assets/icons/favicon-32.png', sizes: '32x32', type: 'image/png' },
        { url: '/assets/icons/favicon-16.png', sizes: '16x16', type: 'image/png' },
      ],
      apple: '/assets/icons/apple-touch-icon.png',
    },
    manifest: '/site.webmanifest',
    openGraph: {
      type: 'website',
      siteName: agencyName,
      locale: 'fr_FR',
      title: agencyName,
      description,
    },
    twitter: { card: 'summary_large_image' },
  };
}

export default async function RootLayout({ children }) {
  const settings = await getSiteSettings().catch(() => null);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ArchitectureFirm',
    name: settings?.agencyName || 'Atelier Méridien',
    description: settings?.defaultSeoDescription || undefined,
    telephone: settings?.phoneHref || undefined,
    address: settings?.addressLine1 ? {
      '@type': 'PostalAddress',
      streetAddress: settings.addressLine1,
      addressLocality: settings.addressLine2,
      addressCountry: 'FR',
    } : undefined,
  };

  return (
    <html lang="fr" className={`${fraunces.variable} ${inter.variable} ${plexMono.variable}`}>
      <head>
        <meta name="theme-color" content="#ece6da" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        <a className="skip-link" href="#main">Aller au contenu</a>
        <div className="progress-rule" aria-hidden="true"></div>

        <Header settings={settings} />

        <main id="main">{children}</main>

        <Footer settings={settings} />

        <SiteChrome />
      </body>
    </html>
  );
}
