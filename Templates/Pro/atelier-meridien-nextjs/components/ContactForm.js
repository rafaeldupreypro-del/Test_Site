'use client';

import { useState } from 'react';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const initialValues = { name: '', email: '', phone: '', subject: '', budget: '', message: '', company: '' };

export default function ContactForm() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [globalError, setGlobalError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  function update(field) {
    return (e) => setValues((v) => ({ ...v, [field]: e.target.value }));
  }

  function validate() {
    const next = {};
    if (!values.name.trim()) next.name = "Merci d'indiquer votre nom.";
    if (!EMAIL_RE.test(values.email.trim())) next.email = 'Adresse e-mail invalide.';
    if (!values.subject) next.subject = 'Merci de choisir un sujet.';
    if (values.message.trim().length < 20) next.message = 'Un message un peu plus détaillé nous aide à mieux répondre (20 caractères min.).';
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setGlobalError('');
    if (values.company) return; // honeypot
    if (!validate()) return;

    setSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (data && data.ok) {
        setSuccess(true);
      } else if (data && data.errors) {
        setErrors(data.errors);
      } else {
        setGlobalError((data && data.error) || 'Une erreur est survenue. Merci de réessayer, ou appelez-nous directement.');
      }
    } catch {
      setGlobalError('Impossible de contacter le serveur. Vérifiez votre connexion, ou appelez-nous directement.');
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <div className="form-success is-visible" role="status">
        <strong>Message envoyé.</strong>
        Merci — nous revenons vers vous sous 48 heures ouvrées pour convenir d&rsquo;un premier échange.
      </div>
    );
  }

  return (
    <form noValidate onSubmit={handleSubmit}>
      {globalError && <p className="form-global-error" role="alert" style={{ display: 'block' }}>{globalError}</p>}
      <input
        type="text" id="company" name="company" autoComplete="off" tabIndex={-1} aria-hidden="true"
        value={values.company} onChange={update('company')}
        style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', opacity: 0 }}
      />
      <div className="field-row">
        <div className={`field${errors.name ? ' has-error' : ''}`}>
          <label htmlFor="name">Nom complet</label>
          <input type="text" id="name" name="name" autoComplete="name" required value={values.name} onChange={update('name')} />
          <p className="field-error" role="alert">{errors.name}</p>
        </div>
        <div className={`field${errors.email ? ' has-error' : ''}`}>
          <label htmlFor="email">E-mail</label>
          <input type="email" id="email" name="email" autoComplete="email" required value={values.email} onChange={update('email')} />
          <p className="field-error" role="alert">{errors.email}</p>
        </div>
      </div>

      <div className="field-row">
        <div className="field">
          <label htmlFor="phone">Téléphone <span className="coord">(optionnel)</span></label>
          <input type="tel" id="phone" name="phone" autoComplete="tel" value={values.phone} onChange={update('phone')} />
        </div>
        <div className={`field${errors.subject ? ' has-error' : ''}`}>
          <label htmlFor="subject">Nature du projet</label>
          <select id="subject" name="subject" required value={values.subject} onChange={update('subject')}>
            <option value="">Sélectionner…</option>
            <option value="residentiel">Maison individuelle</option>
            <option value="collectif">Logement collectif</option>
            <option value="tertiaire">Bureaux / tertiaire</option>
            <option value="culturel">Équipement public / culturel</option>
            <option value="urbanisme">Étude urbaine</option>
            <option value="autre">Autre</option>
          </select>
          <p className="field-error" role="alert">{errors.subject}</p>
        </div>
      </div>

      <div className="field">
        <label htmlFor="budget">Budget prévisionnel <span className="coord">(optionnel)</span></label>
        <select id="budget" name="budget" value={values.budget} onChange={update('budget')}>
          <option value="">Sélectionner…</option>
          <option value="lt150">Moins de 150 000 €</option>
          <option value="150-500">150 000 € — 500 000 €</option>
          <option value="500-2m">500 000 € — 2 M€</option>
          <option value="gt2m">Plus de 2 M€</option>
        </select>
      </div>

      <div className={`field${errors.message ? ' has-error' : ''}`}>
        <label htmlFor="message">Votre message</label>
        <textarea id="message" name="message" rows={6} required placeholder="Décrivez votre terrain, votre programme et votre calendrier…" value={values.message} onChange={update('message')} />
        <p className="field-error" role="alert">{errors.message}</p>
      </div>

      <button type="submit" className="btn btn-primary" style={{ marginTop: '.5rem' }} disabled={submitting}>
        {submitting ? 'Envoi en cours…' : 'Envoyer le message'}
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
      </button>
    </form>
  );
}
