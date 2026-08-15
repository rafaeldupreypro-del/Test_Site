import { client } from './client';

const SITE_SETTINGS_QUERY = `*[_type == "siteSettings"][0]`;

const PROJECTS_QUERY = `*[_type == "project"] | order(coalesce(order, 999) asc, year desc){
  title, "slug": slug.current, category, tag, location, year, plateNumber, coverImage, featured
}`;

const FEATURED_PROJECTS_QUERY = `*[_type == "project" && featured == true] | order(coalesce(order, 999) asc)[0...3]{
  title, "slug": slug.current, category, tag, location, year, plateNumber, coverImage
}`;

const PROJECT_SLUGS_QUERY = `*[_type == "project" && defined(slug.current)]{ "slug": slug.current }`;

const PROJECT_BY_SLUG_QUERY = `*[_type == "project" && slug.current == $slug][0]`;

// Renvoie le projet précédent / suivant selon le même ordre que la liste
// (pour la navigation "Projet précédent / suivant" en bas de fiche projet).
const PROJECT_NEIGHBOURS_QUERY = `{
  "all": *[_type == "project"] | order(coalesce(order, 999) asc, year desc){ title, "slug": slug.current }
}`;

const ACTIVE_EVENT_QUERY = `*[_type == "event" && active == true
  && (!defined(startDate) || startDate <= now())
  && (!defined(endDate) || endDate >= now())
] | order(_createdAt desc)[0]`;

// Preuve sociale : noms de maîtrise d'ouvrage distincts issus des projets déjà
// renseignés — pas de contenu à saisir en double.
const CLIENT_NAMES_QUERY = `array::unique(*[_type == "project" && defined(client)].client)`;

export async function getSiteSettings() {
  return client.fetch(SITE_SETTINGS_QUERY, {}, { next: { revalidate: 60 } });
}

export async function getAllProjects() {
  return client.fetch(PROJECTS_QUERY, {}, { next: { revalidate: 60 } });
}

export async function getFeaturedProjects() {
  return client.fetch(FEATURED_PROJECTS_QUERY, {}, { next: { revalidate: 60 } });
}

export async function getProjectSlugs() {
  return client.fetch(PROJECT_SLUGS_QUERY, {}, { next: { revalidate: 60 } });
}

export async function getProjectBySlug(slug) {
  return client.fetch(PROJECT_BY_SLUG_QUERY, { slug }, { next: { revalidate: 60 } });
}

export async function getProjectNeighbours(slug) {
  const { all } = await client.fetch(PROJECT_NEIGHBOURS_QUERY, {}, { next: { revalidate: 60 } });
  const idx = all.findIndex((p) => p.slug === slug);
  if (idx === -1) return { prev: null, next: null };
  const prev = all[(idx - 1 + all.length) % all.length];
  const next = all[(idx + 1) % all.length];
  return { prev, next };
}

export async function getActiveEvent() {
  return client.fetch(ACTIVE_EVENT_QUERY, {}, { next: { revalidate: 30 } });
}

export async function getClientNames() {
  return client.fetch(CLIENT_NAMES_QUERY, {}, { next: { revalidate: 60 } });
}
