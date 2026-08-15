// Reçoit les données du formulaire de devis et envoie automatiquement
// un e-mail via l'API transactionnelle de Brevo (ex-Sendinblue).
//
// Variable d'environnement requise (à configurer sur Vercel) :
//   BREVO_API_KEY  -> ta clé API Brevo (Paramètres > Clés API dans Brevo)
//
// Optionnel :
//   NOTIFY_EMAIL       -> adresse qui reçoit la notification (par défaut ci-dessous)
//   NOTIFY_SENDER_EMAIL -> adresse expéditrice validée dans Brevo (par défaut ci-dessous)

const BREVO_API_URL = 'https://api.brevo.com/v3/smtp/email';

const NOTIFY_EMAIL = process.env.NOTIFY_EMAIL || 'rafaeldupreypro@gmail.com';
const SENDER_EMAIL = process.env.NOTIFY_SENDER_EMAIL || 'no-reply@votre-site.fr';
const SENDER_NAME = 'NovaWeb - Site web';

function escapeHtml(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    console.error('BREVO_API_KEY manquante dans les variables d\'environnement.');
    return res.status(500).json({ error: 'Configuration serveur manquante.' });
  }

  try {
    const { name, email, phone, message, offer } = req.body || {};

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Merci de renseigner votre nom, votre e-mail et un message.' });
    }

    // 1. Notification envoyée au propriétaire du site
    const notifyPayload = {
      sender: { name: SENDER_NAME, email: SENDER_EMAIL },
      to: [{ email: NOTIFY_EMAIL }],
      replyTo: { email, name },
      subject: `Nouvelle demande de devis - ${name}`,
      htmlContent: `
        <h2>Nouvelle demande de devis (${escapeHtml(offer || 'Site sur mesure')})</h2>
        <p><strong>Nom / Entreprise :</strong> ${escapeHtml(name)}</p>
        <p><strong>E-mail :</strong> ${escapeHtml(email)}</p>
        <p><strong>Téléphone :</strong> ${escapeHtml(phone || 'Non renseigné')}</p>
        <p><strong>Message :</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>
      `,
    };

    const notifyResponse = await fetch(BREVO_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': apiKey,
      },
      body: JSON.stringify(notifyPayload),
    });

    if (!notifyResponse.ok) {
      const errText = await notifyResponse.text();
      console.error('Erreur Brevo (notification) :', errText);
      return res.status(502).json({ error: 'Impossible d\'envoyer la demande pour le moment.' });
    }

    // 2. E-mail de confirmation automatique envoyé au client
    const confirmPayload = {
      sender: { name: SENDER_NAME, email: SENDER_EMAIL },
      to: [{ email, name }],
      subject: 'Votre demande de devis a bien été reçue - NovaWeb',
      htmlContent: `
        <p>Bonjour ${escapeHtml(name)},</p>
        <p>Nous avons bien reçu votre demande de devis pour un site vitrine sur mesure. Notre équipe revient vers vous sous 24h pour convenir d'un rendez-vous (appel ou visio).</p>
        <p>Récapitulatif de votre message :</p>
        <blockquote style="border-left:3px solid #6366f1;padding-left:12px;color:#555;">
          ${escapeHtml(message).replace(/\n/g, '<br>')}
        </blockquote>
        <p>À très vite,<br>L'équipe NovaWeb</p>
      `,
    };

    const confirmResponse = await fetch(BREVO_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': apiKey,
      },
      body: JSON.stringify(confirmPayload),
    });

    if (!confirmResponse.ok) {
      // La notification principale est déjà partie : on ne bloque pas la réponse
      // pour l'utilisateur, mais on log l'erreur pour investigation.
      const errText = await confirmResponse.text();
      console.error('Erreur Brevo (confirmation client) :', errText);
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Erreur send-devis :', err);
    return res.status(500).json({ error: 'Une erreur interne est survenue.' });
  }
};
