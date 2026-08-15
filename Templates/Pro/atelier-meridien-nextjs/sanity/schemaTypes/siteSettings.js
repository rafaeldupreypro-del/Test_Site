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
    { name: 'legal', title: 'Informations légales' },
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
    { name: 'calendlyUrl', title: 'Lien de prise de rendez-vous (Calendly ou autre)', type: 'url', group: 'cro',
      description: 'Laisser vide pour ne pas afficher le bloc de prise de rendez-vous sur la page Contact.' },
    { name: 'googlePlaceId', title: 'Google Place ID (avis Google)', type: 'string', group: 'cro',
      description: "Identifiant du fiche établissement Google (Google Business Profile), utilisé pour afficher les avis. Laisser vide pour masquer le bloc." },
    { name: 'instagramFeedUrl', title: 'Compte Instagram (lien complet)', type: 'url', group: 'cro',
      description: 'Ex : https://www.instagram.com/nom-du-compte. Laisser vide pour masquer le bloc Instagram sur l\'accueil.' },

    // Informations légales — utilisées sur les pages Mentions légales,
    // Confidentialité et Cookies. Champs à compléter par chaque client :
    // aucune valeur par défaut n'est pré-remplie (données propres à
    // l'entreprise), les pages affichent une mention "à compléter" tant
    // que ces champs sont vides.
    { name: 'legalCompanyName', title: 'Raison sociale', type: 'string', group: 'legal' },
    { name: 'legalLegalForm', title: 'Forme juridique (ex: SARL, SASU...)', type: 'string', group: 'legal' },
    { name: 'legalCapital', title: 'Capital social', type: 'string', group: 'legal' },
    { name: 'legalSiret', title: 'Numéro SIRET', type: 'string', group: 'legal' },
    { name: 'legalRcs', title: 'RCS (ville d\'immatriculation)', type: 'string', group: 'legal' },
    { name: 'legalVatNumber', title: 'Numéro de TVA intracommunautaire', type: 'string', group: 'legal' },
    { name: 'legalDirector', title: 'Nom du directeur de la publication', type: 'string', group: 'legal' },
    { name: 'legalHostName', title: 'Nom de l\'hébergeur', type: 'string', group: 'legal', initialValue: 'Vercel Inc.' },
    { name: 'legalHostAddress', title: 'Adresse de l\'hébergeur', type: 'string', group: 'legal', initialValue: '340 S Lemon Ave #4133, Walnut, CA 91789, USA' },
  ],
  preview: {
    prepare() {
      return { title: 'Réglages du site' };
    },
  },
};
