/**
 * Bandeau événement / offre spéciale piloté depuis Sanity (document "event").
 * N'affiche rien si aucun événement actif (dates + interrupteur "active").
 */
export default function EventBanner({ event }) {
  if (!event) return null;

  return (
    <section className="event-banner on-dark" data-reveal>
      <div className="container event-banner__inner">
        {event.badge && <span className="event-banner__badge">{event.badge}</span>}
        <div className="event-banner__body">
          <p className="event-banner__title">{event.title}</p>
          {event.message && <p className="event-banner__message">{event.message}</p>}
        </div>
        {event.ctaLabel && event.ctaUrl && (
          <a href={event.ctaUrl} className="btn btn-outline on-dark-btn event-banner__cta">
            {event.ctaLabel}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </a>
        )}
      </div>
    </section>
  );
}
