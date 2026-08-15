/* =========================================================================
   POST /api/newsletter — Route Handler Next.js
   Portage direct de l'ancien api/newsletter.js (fonction serverless Vercel).
   Deux stratégies, inchangées :
   1. BREVO_API_KEY configurée → contact ajouté à une liste Brevo (persistant,
      recommandé — gère la désinscription automatiquement).
   2. Sinon → e-mail de notification envoyé à MAIL_TO via SMTP (repli, non
      persistant).
   ========================================================================= */
import nodemailer from 'nodemailer';
import { cleanString, isValidEmail, corsHeaders, isRateLimited } from '@/lib/server/apiUtils';

const BREVO_API = 'https://api.brevo.com/v3/contacts';

async function addToBrevo(email) {
  const listId = process.env.BREVO_LIST_ID ? Number(process.env.BREVO_LIST_ID) : undefined;

  const existing = await fetch(`${BREVO_API}/${encodeURIComponent(email)}`, {
    method: 'GET',
    headers: { 'api-key': process.env.BREVO_API_KEY },
  });

  if (existing.status === 200) {
    return { ok: true, alreadySubscribed: true };
  }

  const res = await fetch(BREVO_API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'api-key': process.env.BREVO_API_KEY },
    body: JSON.stringify({ email, listIds: listId ? [listId] : undefined, updateEnabled: true }),
  });

  if (!res.ok && res.status !== 204) {
    const detail = await res.text().catch(() => '');
    throw new Error(`Brevo a répondu ${res.status} : ${detail}`);
  }

  return { ok: true, alreadySubscribed: false };
}

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

async function notifyByEmail(email) {
  const mail = getTransporter();
  if (!mail) {
    console.warn('[newsletter] Ni Brevo ni SMTP configurés — inscription non conservée:', email);
    return;
  }
  await mail.sendMail({
    from: process.env.MAIL_FROM || `"Site" <${process.env.SMTP_USER}>`,
    to: process.env.MAIL_TO || 'contact@atelier-meridien.fr',
    subject: '[Newsletter] Nouvelle inscription',
    text: `Nouvelle inscription à la newsletter : ${email}\n\n(Repli e-mail : configurez BREVO_API_KEY pour un stockage persistant.)`,
  });
}

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: corsHeaders() });
}

export async function POST(request) {
  const headers = corsHeaders();

  if (isRateLimited(request)) {
    return Response.json({ ok: false, error: 'Trop de tentatives. Merci de réessayer dans quelques minutes.' }, { status: 429, headers });
  }

  const body = await request.json().catch(() => ({}));
  const email = cleanString(body.email, 200);

  if (cleanString(body.company, 100)) {
    return Response.json({ ok: true }, { headers }); // honeypot
  }

  if (!isValidEmail(email)) {
    return Response.json({ ok: false, error: 'Adresse e-mail invalide.' }, { status: 400, headers });
  }

  try {
    if (process.env.BREVO_API_KEY) {
      const result = await addToBrevo(email.trim());
      return Response.json(result, { headers });
    }

    await notifyByEmail(email.trim());
    return Response.json({
      ok: true,
      warning: 'Inscription notifiée par e-mail (stockage persistant non configuré).',
    }, { headers });
  } catch (err) {
    console.error('[newsletter] Échec:', err.message);
    return Response.json({ ok: false, error: 'Une erreur est survenue. Merci de réessayer.' }, { status: 502, headers });
  }
}
