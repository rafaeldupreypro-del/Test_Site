'use client';

/**
 * Portage des interactions globales de assets/main.js en composant client
 * React : barre de progression, révélation au scroll, menu mobile, bouton
 * "retour en haut". Monté une fois dans app/layout.js.
 */
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function SiteChrome() {
  const pathname = usePathname();

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Année courante dans le footer
    document.querySelectorAll('[data-year]').forEach((el) => {
      el.textContent = new Date().getFullYear();
    });

    // Menu mobile
    const toggle = document.querySelector('.nav-toggle');
    const panel = document.querySelector('.mobile-panel');
    function closeMobile() {
      if (!toggle || !panel) return;
      toggle.setAttribute('aria-expanded', 'false');
      panel.classList.remove('is-open');
      document.body.style.overflow = '';
    }
    function onToggleClick() {
      const open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      panel.classList.toggle('is-open', !open);
      document.body.style.overflow = !open ? 'hidden' : '';
    }
    function onKeydown(e) {
      if (e.key === 'Escape' && panel && panel.classList.contains('is-open')) {
        closeMobile();
        toggle.focus();
      }
    }
    if (toggle && panel) {
      toggle.addEventListener('click', onToggleClick);
      panel.querySelectorAll('a').forEach((a) => a.addEventListener('click', closeMobile));
      document.addEventListener('keydown', onKeydown);
    }

    // Barre de progression de lecture
    const progress = document.querySelector('.progress-rule');
    let ticking = false;
    function updateProgress() {
      const h = document.documentElement;
      const scrolled = h.scrollTop;
      const height = h.scrollHeight - h.clientHeight;
      const pct = height > 0 ? (scrolled / height) * 100 : 0;
      if (progress) progress.style.width = pct + '%';
      ticking = false;
    }
    function onScrollProgress() {
      if (!ticking) { window.requestAnimationFrame(updateProgress); ticking = true; }
    }
    if (progress) {
      window.addEventListener('scroll', onScrollProgress, { passive: true });
      updateProgress();
    }

    // Bouton retour en haut
    const toTop = document.querySelector('.to-top');
    function onScrollToTop() {
      toTop.classList.toggle('is-visible', window.scrollY > 700);
    }
    function onClickToTop() {
      window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    }
    if (toTop) {
      window.addEventListener('scroll', onScrollToTop, { passive: true });
      toTop.addEventListener('click', onClickToTop);
    }

    // Révélation au défilement
    const revealEls = document.querySelectorAll('[data-reveal]');
    let io;
    if (revealEls.length) {
      if ('IntersectionObserver' in window && !reduceMotion) {
        io = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              io.unobserve(entry.target);
            }
          });
        }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
        revealEls.forEach((el) => io.observe(el));
      } else {
        revealEls.forEach((el) => el.classList.add('is-visible'));
      }
    }

    return () => {
      if (toggle) toggle.removeEventListener('click', onToggleClick);
      document.removeEventListener('keydown', onKeydown);
      if (progress) window.removeEventListener('scroll', onScrollProgress);
      if (toTop) {
        window.removeEventListener('scroll', onScrollToTop);
        toTop.removeEventListener('click', onClickToTop);
      }
      if (io) io.disconnect();
    };
    // Le layout racine n'est pas remonté entre deux navigations App Router :
    // on relie donc cet effet à `pathname` pour ré-observer les nouveaux
    // éléments [data-reveal] et rebrancher les écouteurs à chaque page.
  }, [pathname]);

  return null;
}
