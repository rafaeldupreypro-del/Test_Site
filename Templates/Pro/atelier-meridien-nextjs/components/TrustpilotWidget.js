'use client';

import { useEffect, useRef } from 'react';

const SCRIPT_SRC = 'https://widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js';
// TrustBox "Carousel" — identifiant de template officiel Trustpilot (fixe,
// commun à toutes les intégrations, ne dépend pas de l'entreprise).
const TEMPLATE_ID = '53aa8912dec7e10d38f59f36';

function loadScriptOnce() {
  return new Promise((resolve) => {
    const existing = document.querySelector(`script[src="${SCRIPT_SRC}"]`);
    if (existing) {
      if (window.Trustpilot) resolve();
      else existing.addEventListener('load', () => resolve());
      return;
    }
    const script = document.createElement('script');
    script.src = SCRIPT_SRC;
    script.async = true;
    script.onload = () => resolve();
    document.body.appendChild(script);
  });
}

/**
 * Bloc de preuve sociale alternatif aux avis Google — pratique si le client
 * n'a pas de fiche Google Business Profile. N'affiche rien tant que
 * trustpilotBusinessUnitId n'est pas renseigné dans les Réglages du site.
 *
 * Le widget officiel Trustpilot (TrustBox) est chargé côté client et scanne
 * le DOM lui-même au chargement du script — sur une page rendue par React,
 * il faut donc déclencher manuellement window.Trustpilot.loadFromElement().
 */
export default function TrustpilotWidget({ businessUnitId, reviewUrl }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!businessUnitId) return;
    let cancelled = false;
    loadScriptOnce().then(() => {
      if (!cancelled && window.Trustpilot && ref.current) {
        window.Trustpilot.loadFromElement(ref.current, true);
      }
    });
    return () => { cancelled = true; };
  }, [businessUnitId]);

  if (!businessUnitId) return null;

  return (
    <section className="section on-alt">
      <div className="container">
        <div className="cluster" style={{ justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem' }} data-reveal>
          <div>
            <p className="eyebrow">Avis clients</p>
            <h2 className="h-2" style={{ marginTop: '.75rem' }}>Avis Trustpilot</h2>
          </div>
          {reviewUrl && (
            <a href={reviewUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ flexShrink: 0 }}>
              Laisser un avis
            </a>
          )}
        </div>

        <div
          ref={ref}
          className="trustpilot-widget"
          data-locale="fr-FR"
          data-template-id={TEMPLATE_ID}
          data-businessunit-id={businessUnitId}
          data-style-height="150px"
          data-style-width="100%"
          data-theme="light"
          data-stars="1,2,3,4,5"
        >
          {reviewUrl && (
            <a href={reviewUrl} target="_blank" rel="noopener noreferrer">Trustpilot</a>
          )}
        </div>
      </div>
    </section>
  );
}
