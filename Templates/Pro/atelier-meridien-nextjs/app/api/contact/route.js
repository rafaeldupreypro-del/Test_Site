/* =========================================================================
   POST /api/contact — Route Handler Next.js
   Portage direct de l'ancien api/contact.js.
   ========================================================================= */
import nodemailer from 'nodemailer';
import { cleanString, isValidEmail, corsHeaders, isRateLimited } from '@/lib/server/apiUtils';

let transporter = null;
function getTransporter() {
  if (transporter) return transporter;
  if (!process.env.SMTP_HOST) return null;
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === 'true',
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });
  return transporter;
}

const SUBJECT_LABELS = {
  residentiel: 'Maison individuelle',
  collectif: 'Logement collectif',
  tertiaire: 'Bureaux / tertiaire',
  culturel: 'Équipement public / culturel',
  urbanisme: 'Étude urbaine',
  autre: 'Autre',
};
const BUDGET_LABELS = {
  lt150: 'Moins de 150 000 €',
  '150-500': '150 000 € — 500 000 €',
  '500-2m': '500 000 € — 2 M€',
  gt2m: 'Plus de 2 M€',
};

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: corsHeaders() });
}

export async function POST(request) {
  const headers = corsHeaders();

  if (isRateLimited(request)) {
    return Response.json({ ok: false, error: 'Trop de tentatives. Merci de réessayer dans quelques minutes.' }, { status: 429, headers });
  }

  const body = await request.json().catch(() => ({}));

  const name = cleanString(body.name, 200);
  const email = cleanString(body.email, 200);
  const phone = cleanString(body.phone, 40);
  const subject = cleanString(body.subject, 60);
  const budget = cleanString(body.budget, 40);
  const message = cleanString(body.message, 5000);

  if (cleanString(body.company, 100)) {
    return Response.json({ ok: true }, { headers }); // honeypot
  }

  const errors = {};
  if (!name) errors.name = "Merci d'indiquer votre nom.";
  if (!isValidEmail(email)) errors.email = 'Adresse e-mail invalide.';
  if (!subject) errors.subject = 'Merci de choisir un sujet.';
  if (message.length < 20) errors.message = 'Message trop court (20 caractères minimum).';

  if (Object.keys(errors).length) {
    return Response.json({ ok: false, errors }, { status: 400, headers });
  }

  const mail = getTransporter();
  if (!mail) {
    console.warn('[contact] SMTP non configuré — message reçu mais non envoyé par e-mail:', { name, email, subject });
    return Response.json({ ok: true, warning: 'Message reçu (SMTP non configuré côté serveur).' }, { headers });
  }

  try {
    await mail.sendMail({
      from: process.env.MAIL_FROM || `"Site" <${process.env.SMTP_USER}>`,
      to: process.env.MAIL_TO || 'contact@atelier-meridien.fr',
      replyTo: email,
      subject: `[Contact site] ${SUBJECT_LABELS[subject] || subject} — ${name}`,
      text: [
        `Nom : ${name}`,
        `E-mail : ${email}`,
        phone ? `Téléphone : ${phone}` : null,
        `Nature du projet : ${SUBJECT_LABELS[subject] || subject}`,
        budget ? `Budget prévisionnel : ${BUDGET_LABELS[budget] || budget}` : null,
        '',
        'Message :',
        message,
      ].filter(Boolean).join('\n'),
    });
    return Response.json({ ok: true }, { headers });
  } catch (err) {
    console.error('[contact] Échec d\'envoi e-mail:', err.message);
    return Response.json({ ok: false, error: "Échec de l'envoi. Merci de réessayer ou de nous appeler directement." }, { status: 502, headers });
  }
}
