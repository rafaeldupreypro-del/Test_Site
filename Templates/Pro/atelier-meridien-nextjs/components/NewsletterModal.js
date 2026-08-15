'use client';

import { useEffect, useState } from 'react';
import NewsletterForm from './NewsletterForm';

/**
 * Bandeau discret en bas à droite, affiché une fois par visite (page
 * d'accueil uniquement, comme dans la version statique).
 */
export default function NewsletterModal() {
  const [open, setOpen] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem('nlBannerShown')) return;
    const t = setTimeout(() => {
      setOpen(true);
      sessionStorage.setItem('nlBannerShown', '1');
    }, 1000);
    return () => clearTimeout(t);
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
