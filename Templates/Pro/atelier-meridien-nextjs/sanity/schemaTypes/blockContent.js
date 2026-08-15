/**
 * Type de contenu riche réutilisable (texte enrichi + images) — utilisé par
 * le corps des articles d'actualités. Sépare paragraphes, titres, listes,
 * liens et images sans jamais toucher au code.
 */
export default {
  name: 'blockContent',
  title: 'Contenu riche',
  type: 'array',
  of: [
    {
      type: 'block',
      styles: [
        { title: 'Paragraphe', value: 'normal' },
        { title: 'Titre', value: 'h2' },
        { title: 'Sous-titre', value: 'h3' },
        { title: 'Citation', value: 'blockquote' },
      ],
      lists: [
        { title: 'Puces', value: 'bullet' },
        { title: 'Numérotée', value: 'number' },
      ],
      marks: {
        decorators: [
          { title: 'Gras', value: 'strong' },
          { title: 'Italique', value: 'em' },
        ],
        annotations: [
          {
            name: 'link',
            title: 'Lien',
            type: 'object',
            fields: [{ name: 'href', title: 'URL', type: 'url' }],
          },
        ],
      },
    },
    { type: 'image', options: { hotspot: true }, fields: [{ name: 'alt', title: 'Texte alternatif', type: 'string' }] },
  ],
};
