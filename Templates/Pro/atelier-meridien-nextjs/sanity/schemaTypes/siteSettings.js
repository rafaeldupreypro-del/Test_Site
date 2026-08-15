/**
 * Singleton — réglages globaux du site.
 * Un seul document de ce type doit exister (voir sanity/structure.js).
 * C'est ici que chaque nouveau client "template" personnalise son identité
 * sans toucher au code : nom, coordonnées, réseaux, stats, textes clés.
 */
export default {
  name: 'siteSettings',
  title: 'Réglages du site',
  type: 'document',
  groups: [
    { name: 'identite', title: 'Identité' },
    { name: 'coordonnees', title: 'Coordonnées' },
    { name: 'chiffres', title: 'Chiffres clés' },
    { name: 'accueil', title: 'Page d\'accueil' },
    { name: 'seo', title: 'SEO par défaut' },
    { name: 'cro', title: 'Conversion' },
  ],
  fields: [
    { name: 'agencyName', title: 'Nom de l\'agence', type: 'string', group: 'identite', initialValue: 'Atelier Méridien' },
    { name: 'tagline', title: 'Accroche (sous le nom)', type: 'string', group: 'identite' },
    { name: 'logoText', title: 'Texte du logo (ex: "Atelier|Méridien" — la partie après le | est mise en avant)', type: 'string', group: 'identite' },

    { name: 'phone', title: 'Téléphone (affiché)', type: 'string', group: 'coordonnees' },
    { name: 'phoneHref', title: 'Téléphone (lien tel:, format +33...)', type: 'string', group: 'coordonnees' },
    { name: 'email', title: 'E-mail de contact', type: 'string', group: 'coordonnees' },
    { name: 'addressLine1', title: 'Adresse — ligne 1', type: 'string', group: 'coordonnees' },
    { name: 'addressLine2', title: 'Adresse — ligne 2 (CP + ville)', type: 'string', group: 'coordonnees' },
    { name: 'openingHours', title: 'Horaires', type: 'string', group: 'coordonnees' },
    { name: 'mapEmbedUrl', title: 'URL Google Maps (embed)', type: 'url', group: 'coordonnees' },
    { name: 'socialLinks', title: 'Réseaux sociaux', type: 'array', group: 'coordonnees',
      of: [{
        type: 'object',
        fields: [
          { name: 'label', title: 'Nom (ex: Instagram)', type: 'string' },
          { name: 'url', title: 'URL', type: 'url' },
        ],
      }],
    },

    { name: 'statYears', title: 'Années d\'exercice', type: 'number', group: 'chiffres' },
    { name: 'statFoundedYear', title: 'Année de fondation', type: 'number', group: 'chiffres' },
    { name: 'statProjects', title: 'Projets livrés', type: 'number', group: 'chiffres' },
    { name: 'statSurface', title: 'm² conçus', type: 'number', group: 'chiffres' },
    { name: 'statAwards', title: 'Prix & distinctions', type: 'number', group: 'chiffres' },
    { name: 'statTeamSize', title: 'Taille de l\'équipe', type: 'number', group: 'chiffres' },

    { name: 'heroTitle', title: 'Titre du hero (accueil)', type: 'string', group: 'accueil' },
    { name: 'heroLede', title: 'Chapô du hero', type: 'text', rows: 3, group: 'accueil' },
    { name: 'heroImage', title: 'Photo du hero', type: 'image', options: { hotspot: true }, group: 'accueil' },
    { name: 'quoteText', title: 'Citation (ancien champ, conservé pour compatibilité)', type: 'text', rows: 3, group: 'accueil' },
    { name: 'quoteAuthor', title: 'Auteur de la citation (ancien champ)', type: 'string', group: 'accueil' },
    { name: 'testimonials', title: 'Témoignages clients', type: 'array', group: 'accueil',
      description: 'Affichés sur l\'accueil. Plusieurs témoignages renforcent la preuve sociale — vise 2 à 4.',
      of: [{
        type: 'object',
        name: 'testimonial',
        fields: [
          { name: 'quote', title: 'Citation', type: 'text', rows: 3, validation: (Rule) => Rule.required() },
          { name: 'author', title: 'Auteur (nom, fonction ou organisme)', type: 'string', validation: (Rule) => Rule.required() },
        ],
        preview: { select: { title: 'author', subtitle: 'quote' } },
      }],
    },

    { name: 'defaultSeoDescription', title: 'Meta description par défaut', type: 'text', rows: 2, group: 'seo' },
    { name: 'ogImage', title: 'Image de partage par défaut (OG)', type: 'image', group: 'seo' },

    { name: 'whatsappNumber', title: 'Numéro WhatsApp (optionnel)', type: 'string', group: 'cro',
      description: 'Format international sans espaces, ex: +33612345678. Laisser vide pour masquer le bouton de contact rapide.' },
  ],
  preview: {
    prepare() {
      return { title: 'Réglages du site' };
    },
  },
};
