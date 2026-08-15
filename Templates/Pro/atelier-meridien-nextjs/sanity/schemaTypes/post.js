/**
 * Un document "post" = un article dans la section Actualités
 * (page /actualites/[slug] générée automatiquement). Contenu frais utile au
 * référencement : nouveaux projets livrés, distinctions, participations à
 * des concours, actualités de l'agence.
 */
export default {
  name: 'post',
  title: 'Article',
  type: 'document',
  groups: [
    { name: 'contenu', title: 'Contenu' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    { name: 'title', title: 'Titre', type: 'string', group: 'contenu', validation: (Rule) => Rule.required() },
    { name: 'slug', title: 'Slug (URL)', type: 'slug', group: 'contenu',
      options: { source: 'title', maxLength: 96 }, validation: (Rule) => Rule.required() },
    { name: 'publishedAt', title: 'Date de publication', type: 'datetime', group: 'contenu',
      initialValue: () => new Date().toISOString(), validation: (Rule) => Rule.required() },
    { name: 'excerpt', title: 'Résumé (affiché dans la liste)', type: 'text', rows: 3, group: 'contenu',
      validation: (Rule) => Rule.max(220) },
    { name: 'coverImage', title: 'Image de couverture', type: 'image', options: { hotspot: true }, group: 'contenu' },
    { name: 'body', title: 'Contenu de l\'article', type: 'blockContent', group: 'contenu' },

    { name: 'seoDescription', title: 'Meta description (sinon le résumé est utilisé)', type: 'text', rows: 2, group: 'seo' },
  ],
  orderings: [
    { title: 'Plus récent d\'abord', name: 'publishedAtDesc', by: [{ field: 'publishedAt', direction: 'desc' }] },
  ],
  preview: {
    select: { title: 'title', subtitle: 'publishedAt', media: 'coverImage' },
    prepare({ title, subtitle, media }) {
      return { title, subtitle: subtitle ? new Date(subtitle).toLocaleDateString('fr-FR') : '', media };
    },
  },
};
