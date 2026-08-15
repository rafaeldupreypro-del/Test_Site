'use client';

import { useState } from 'react';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function NewsletterForm({ variant = 'footer' }) {
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState(''); // honeypot
  const [status, setStatus] = useState({ msg: '', error: false });
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (company) return; // bot

    if (!EMAIL_RE.test(email.trim())) {
      setStatus({ msg: 'Adresse e-mail invalide.', error: true });
      return;
    }

    setLoading(true);
    setStatus({ msg: '', error: false });

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), company }),
      });
      const data = await res.json();
      if (data && data.ok) {
        setStatus({ msg: data.alreadySubscribed ? 'Cette adresse est déjà inscrite.' : 'Merci, votre inscription est confirmée.', error: false });
        setEmail('');
      } else {
        setStatus({ msg: (data && data.error) || 'Une erreur est survenue.', error: true });
      }
    } catch {
      setStatus({ msg: 'Impossible de contacter le serveur pour le moment.', error: true });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="newsletter-form" noValidate onSubmit={handleSubmit} data-variant={variant}>
      <input
        type="text" name="company" autoComplete="off" tabIndex={-1} aria-hidden="true"
        value={company} onChange={(e) => setCompany(e.target.value)}
        style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', opacity: 0 }}
      />
      <div className="newsletter-form__row">
        <input
          type="email" placeholder="Votre e-mail" autoComplete="email" required aria-label="Adresse e-mail"
          value={email} onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <button type="submit" disabled={loading}>{loading ? '…' : "S'inscrire"}</button>
      {status.msg && (
        <p className={`newsletter-msg is-visible${status.error ? ' is-error' : ''}`} role="status">{status.msg}</p>
      )}
    </form>
  );
}
