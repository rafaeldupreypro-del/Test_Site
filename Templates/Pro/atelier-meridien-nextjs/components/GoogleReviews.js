import { getGoogleReviews, googleWriteReviewUrl } from '@/lib/google/reviews';

function Stars({ rating }) {
  const full = Math.round(rating || 0);
  return (
    <span className="google-reviews__stars" aria-label={`${rating} sur 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" fill={i < full ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.2" width="14" height="14">
          <path d="M10 1.5l2.6 5.27 5.82.85-4.21 4.1 1 5.8L10 14.9l-5.21 2.62 1-5.8-4.21-4.1 5.82-.85z" />
        </svg>
      ))}
    </span>
  );
}

/**
 * Bloc de preuve sociale : avis Google récupérés en direct via l'API Places.
 * N'affiche rien tant qu'aucun Place ID n'est renseigné dans les Réglages du
 * site (bloc Conversion), ou si l'API ne renvoie aucun avis.
 */
export default async function GoogleReviews({ placeId }) {
  if (!placeId) return null;

  const data = await getGoogleReviews(placeId);
  if (!data?.reviews?.length) return null;

  const reviews = data.reviews.slice(0, 3);
  const writeUrl = googleWriteReviewUrl(placeId);

  return (
    <section className="section on-alt">
      <div className="container">
        <div className="cluster" style={{ justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem' }} data-reveal>
          <div>
            <p className="eyebrow">Avis clients</p>
            <h2 className="h-2" style={{ marginTop: '.75rem' }}>
              Avis Google
              {data.rating != null && (
                <span className="google-reviews__score">
                  {' '}— {data.rating.toFixed(1)}/5{data.userRatingCount ? ` (${data.userRatingCount} avis)` : ''}
                </span>
              )}
            </h2>
          </div>
          {data.googleMapsUri && (
            <a href={data.googleMapsUri} target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ flexShrink: 0 }}>
              Voir tous les avis
            </a>
          )}
        </div>

        <div className="grid grid-3">
          {reviews.map((r, i) => (
            <div className="google-review-card" key={r.name || i}>
              <Stars rating={r.rating} />
              <p className="google-review-card__text">{r.text?.text || r.originalText?.text || ''}</p>
              <p className="google-review-card__author">{r.authorAttribution?.displayName || 'Client Google'}</p>
            </div>
          ))}
        </div>

        {writeUrl && (
          <p className="text-center" style={{ marginTop: '2.5rem' }} data-reveal>
            <a href={writeUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">Laisser un avis Google</a>
          </p>
        )}
      </div>
    </section>
  );
}
