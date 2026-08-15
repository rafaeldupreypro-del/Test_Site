// Récupère les avis Google d'un établissement via l'API Places (New).
// Nécessite une clé API Google Cloud avec l'API "Places API (New)" activée
// (variable d'environnement GOOGLE_PLACES_API_KEY — jamais préfixée par
// NEXT_PUBLIC_, elle ne doit être utilisée que côté serveur).
//
// Mise en cache d'une heure : Google ne renvoie de toute façon que 5 avis
// maximum, sélectionnés par son propre algorithme — inutile d'appeler l'API
// à chaque visite du site.
const FIELD_MASK = 'rating,userRatingCount,googleMapsUri,reviews';

export async function getGoogleReviews(placeId) {
  if (!placeId || !process.env.GOOGLE_PLACES_API_KEY) return null;

  try {
    const res = await fetch(`https://places.googleapis.com/v1/places/${placeId}`, {
      headers: {
        'X-Goog-Api-Key': process.env.GOOGLE_PLACES_API_KEY,
        'X-Goog-FieldMask': FIELD_MASK,
      },
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

// Lien direct vers le formulaire d'avis Google, pré-rempli avec
// l'établissement — ne nécessite aucune clé API, juste le Place ID.
export function googleWriteReviewUrl(placeId) {
  return placeId ? `https://search.google.com/local/writereview?placeid=${placeId}` : null;
}
