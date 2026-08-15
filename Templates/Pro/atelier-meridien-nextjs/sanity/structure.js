/**
 * Desk structure personnalisée : épingle "Réglages du site" comme document
 * unique (singleton) en haut de la liste, plutôt que de le laisser se
 * dupliquer comme un type de document classique.
 */
export const structure = (S) =>
  S.list()
    .title('Contenu')
    .items([
      S.listItem()
        .title('Réglages du site')
        .id('siteSettings')
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
        ),
      S.divider(),
      S.listItem()
        .title('Projets')
        .schemaType('project')
        .child(S.documentTypeList('project').title('Projets')),
      S.listItem()
        .title('Événements & offres')
        .schemaType('event')
        .child(S.documentTypeList('event').title('Événements & offres')),
      S.listItem()
        .title('Actualités')
        .schemaType('post')
        .child(
          S.documentTypeList('post')
            .title('Actualités')
            .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
        ),
    ]);
