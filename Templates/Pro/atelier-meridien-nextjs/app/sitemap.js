import { getProjectSlugs, getPostSlugs } from '@/lib/sanity/queries';

// Génère automatiquement /sitemap.xml à partir des pages statiques et des
// projets publiés dans Sanity. NEXT_PUBLIC_SITE_URL doit pointer vers le
// domaine final (ex: https://www.atelier-meridien.fr) une fois le site en
// production, sinon les URLs du sitemap seront incorrectes.
export default async function sitemap() {
  const base = (process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com').replace(/\/$/, '');
  const now = new Date();

  const staticRoutes = ['', '/agence', '/projets', '/actualites', '/contact', '/mentions-legales', '/confidentialite', '/cookies'].map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: path === '' ? 'weekly' : 'monthly',
    priority: path === '' ? 1 : 0.6,
  }));

  const [projectSlugs, postSlugs] = await Promise.all([
    getProjectSlugs().catch(() => []),
    getPostSlugs().catch(() => []),
  ]);
  const projectRoutes = projectSlugs.map(({ slug }) => ({
    url: `${base}/projets/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));
  const postRoutes = postSlugs.map(({ slug }) => ({
    url: `${base}/actualites/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.5,
  }));

  return [...staticRoutes, ...projectRoutes, ...postRoutes];
}
