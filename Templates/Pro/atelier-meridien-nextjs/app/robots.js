// Génère automatiquement /robots.txt. Bloque l'indexation du Studio et des
// routes techniques, pointe vers le sitemap généré dynamiquement.
export default function robots() {
  const base = (process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com').replace(/\/$/, '');

  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: ['/studio', '/api'] },
    ],
    sitemap: `${base}/sitemap.xml`,
  };
}
