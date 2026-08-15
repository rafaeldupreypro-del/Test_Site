/**
 * Bandeau événement / offre spéciale, affiché sur l'accueil (et potentiellement
 * ailleurs). Piloté par des dates : le bandeau n'apparaît automatiquement que
 * si la date du jour est comprise entre startDate et endDate (bornes optionnelles).
 */
export default {
  name: 'event',
  title: 'Événement / Offre spéciale',
  type: 'document',
  fields: [
    { name: 'title', title: 'Titre', type: 'string', validation: (Rule) => Rule.required() },
    { name: 'badge', title: 'Étiquette (ex: "Offre limitée", "Actualité")', type: 'string' },
    { name: 'message', title: 'Message', type: 'text', rows: 3 },
    { name: 'ctaLabel', title: 'Texte du bouton', type: 'string' },
    { name: 'ctaUrl', title: 'Lien du bouton', type: 'string' },
    { name: 'active', title: 'Actif', type: 'boolean', initialValue: true,
      description: 'Interrupteur manuel — coupe le bandeau immédiatement, même si les dates sont valides.' },
    { name: 'startDate', title: 'Début d\'affichage', type: 'datetime' },
    { name: 'endDate', title: 'Fin d\'affichage', type: 'datetime' },
  ],
  preview: {
    select: { title: 'title', subtitle: 'badge', active: 'active' },
    prepare({ title, subtitle, active }) {
      return { title, subtitle: `${active ? '● actif' : '○ inactif'}${subtitle ? ' — ' + subtitle : ''}` };
    },
  },
};
