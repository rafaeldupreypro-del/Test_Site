'use client';

import { useEffect, useState } from 'react';
import NewsletterForm from './NewsletterForm';

/**
 * Bandeau discret en bas à droite, affiché une fois par visite (page
 * d'accueil uniquement).
 *
 * CRO : déclenché sur l'intention de sortie (la souris quitte la fenêtre
 * par le haut) plutôt qu'après 1 seconde — on laisse le visiteur juger le
 * site avant de lui proposer autre chose. Sur mobile/tactile, où il n'y a
 * pas de curseur à surveiller, on retombe sur un délai de 20 secondes.
 */
export default function NewsletterModal() {
  const [open, setOpen] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem('nlBannerShown')) return;

    function trigger() {
      setOpen(true);
      sessionStorage.setItem('nlBannerShown', '1');
      cleanup();
    }

    function onMouseOut(e) {
      if (e.clientY <= 0) trigger();
    }

    const isTouch = window.matchMedia('(hover: none), (pointer: coarse)').matches;
    const fallback = setTimeout(trigger, isTouch ? 20000 : 45000);

    function cleanup() {
      clearTimeout(fallback);
      document.removeEventListener('mouseout', onMouseOut);
    }

    if (!isTouch) document.addEventListener('mouseout', onMouseOut);
    return cleanup;
  }, []);

  useEffect(() => {
    function onKeydown(e) {
      if (e.key === 'Escape' && open) setOpen(false);
    }
    document.addEventListener('keydown', onKeydown);
    return () => document.removeEventListener('keydown', onKeydown);
  }, [open]);

  return (
    <div
      id="newsletter-modal"
      className={`nl-modal-overlay${open ? ' is-open' : ''}${dismissed ? ' has-success' : ''}`}
      role="dialog" aria-modal="false" aria-labelledby="nl-modal-title"
    >
      <div className="nl-modal">
        <button type="button" className="nl-modal__close" aria-label="Fermer" onClick={() => setOpen(false)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 6L6 18M6 6l12 12" /></svg>
        </button>
        <p className="eyebrow no-rule">Newsletter</p>
        <h3 id="nl-modal-title">Recevoir nos actualités</h3>
        <p className="nl-modal__lede">Un e-mail occasionnel : nouveaux projets livrés, distinctions et participations à des concours. Rien d&rsquo;autre.</p>
        <NewsletterForm variant="modal" />
        <p className="nl-modal__fine">En vous inscrivant, vous acceptez de recevoir nos e-mails. Désinscription possible à tout moment.</p>
      </div>
    </div>
  );
}
