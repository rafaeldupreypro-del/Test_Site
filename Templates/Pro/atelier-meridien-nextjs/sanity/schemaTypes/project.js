/**
 * Un document "project" = une page /projets/[slug] générée automatiquement.
 * Ajouter un nouveau projet ne demande plus de créer un fichier HTML :
 * juste une nouvelle entrée ici.
 */
export default {
  name: 'project',
  title: 'Projet',
  type: 'document',
  groups: [
    { name: 'carte', title: 'Carte / listing' },
    { name: 'contenu', title: 'Contenu de la page' },
    { name: 'fiche', title: 'Fiche technique' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    { name: 'title', title: 'Titre du projet', type: 'string', group: 'carte', validation: (Rule) => Rule.required() },
    { name: 'slug', title: 'Slug (URL)', type: 'slug', group: 'carte',
      options: { source: 'title', maxLength: 96 }, validation: (Rule) => Rule.required() },
    { name: 'category', title: 'Catégorie', type: 'string', group: 'carte',
      options: {
        list: [
          { title: 'Résidentiel', value: 'residentiel' },
          { title: 'Résidentiel collectif', value: 'residentiel-collectif' },
          { title: 'Équipement culturel', value: 'culturel' },
          { title: 'Bureaux', value: 'bureaux' },
          { title: 'Urbanisme', value: 'urbanisme' },
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    { name: 'tag', title: 'Étiquette affichée sur la carte (ex: "Résidentiel")', type: 'string', group: 'carte' },
    { name: 'location', title: 'Lieu', type: 'string', group: 'carte' },
    { name: 'year', title: 'Année', type: 'number', group: 'carte' },
    { name: 'plateNumber', title: 'Numéro de plan (ex: "PLAN N° 47")', type: 'string', group: 'carte' },
    { name: 'coverImage', title: 'Image de couverture', type: 'image', options: { hotspot: true }, group: 'carte' },
    { name: 'featured', title: 'Mettre en avant sur l\'accueil', type: 'boolean', group: 'carte', initialValue: false },
    { name: 'order', title: 'Ordre d\'affichage', type: 'number', group: 'carte', description: 'Plus petit = affiché en premier dans la liste des projets.' },

    { name: 'eyebrowMeta', title: 'Sous-titre bandeau (ex: "Résidentiel — Plan N° 47")', type: 'string', group: 'contenu' },
    { name: 'bannerMeta', title: 'Puces d\'info sous le titre (ex: "Étretat, France")', type: 'array', of: [{ type: 'string' }], group: 'contenu' },
    { name: 'sections', title: 'Sections de texte', type: 'array', group: 'contenu',
      of: [{
        type: 'object',
        name: 'section',
        title: 'Section',
        fields: [
          { name: 'eyebrow', title: 'Sur-titre (ex: "Le contexte")', type: 'string' },
          { name: 'heading', title: 'Titre', type: 'string' },
          { name: 'body', title: 'Texte', type: 'text', rows: 5 },
        ],
        preview: { select: { title: 'heading', subtitle: 'eyebrow' } },
      }],
    },
    { name: 'pullQuote', title: 'Citation mise en avant', type: 'text', rows: 2, group: 'contenu' },
    { name: 'gallery', title: 'Galerie d\'images', type: 'array', group: 'contenu',
      of: [{ type: 'image', options: { hotspot: true } }] },

    { name: 'client', title: 'Maîtrise d\'ouvrage', type: 'string', group: 'fiche' },
    { name: 'specLocation', title: 'Lieu (fiche technique)', type: 'string', group: 'fiche' },
    { name: 'surface', title: 'Surface', type: 'string', group: 'fiche' },
    { name: 'budget', title: 'Budget', type: 'string', group: 'fiche' },
    { name: 'delivery', title: 'Livraison', type: 'string', group: 'fiche' },
    { name: 'team', title: 'Équipe', type: 'string', group: 'fiche' },
    { name: 'distinction', title: 'Distinction (optionnel)', type: 'string', group: 'fiche' },

    { name: 'seoDescription', title: 'Meta description', type: 'text', rows: 2, group: 'seo' },
  ],
  orderings: [
    { title: 'Ordre manuel', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
    { title: 'Année, plus récent d\'abord', name: 'yearDesc', by: [{ field: 'year', direction: 'desc' }] },
  ],
  preview: {
    select: { title: 'title', subtitle: 'location', media: 'coverImage' },
  },
};
