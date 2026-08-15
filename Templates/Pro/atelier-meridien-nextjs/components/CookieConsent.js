'use client';

import { useEffect, useState } from 'react';
import { GoogleAnalytics } from '@next/third-parties/google';

const STORAGE_KEY = 'cookie-consent';

/**
 * Bandeau de consentement cookies (RGPD). N'apparaît que si un identifiant
 * Google Analytics est configuré (variable NEXT_PUBLIC_GA_ID) — sans mesure
 * d'audience, il n'y a rien à faire accepter au visiteur. Le script GA4 n'est
 * chargé qu'après acceptation ; le choix est mémorisé dans le navigateur.
 */
export default function CookieConsent({ gaId }) {
  const [consent, setConsent] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setConsent(localStorage.getItem(STORAGE_KEY));
    setReady(true);
  }, []);

  function choose(value) {
    localStorage.setItem(STORAGE_KEY, value);
    setConsent(value);
  }

  if (!gaId) return null;

  return (
    <>
      {ready && consent === 'accepted' && <GoogleAnalytics gaId={gaId} />}

      {ready && !consent && (
        <div className="cookie-banner" role="dialog" aria-live="polite" aria-label="Préférences cookies">
          <p>
            Ce site utilise Google Analytics pour mesurer l&rsquo;audience. Ces cookies ne sont déposés qu&rsquo;avec votre accord.
          </p>
          <div className="cookie-banner__actions">
            <button type="button" className="btn btn-outline" onClick={() => choose('refused')}>Refuser</button>
            <button type="button" className="btn btn-primary" onClick={() => choose('accepted')}>Accepter</button>
          </div>
        </div>
      )}
    </>
  );
}
