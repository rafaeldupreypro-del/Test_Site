// Reçoit une adresse e-mail et l'ajoute à une liste de contacts Brevo
// (newsletter). Utilise l'API Contacts de Brevo.
//
// Variables d'environnement requises (à configurer sur Vercel) :
//   BREVO_API_KEY  -> ta clé API Brevo (Paramètres > Clés API dans Brevo)
//   BREVO_LIST_ID  -> l'identifiant numérique de la liste (Contacts > Listes > ouvrir la liste)

const BREVO_CONTACTS_URL = 'https://api.brevo.com/v3/contacts';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  const apiKey = process.env.BREVO_API_KEY;
  const listId = process.env.BREVO_LIST_ID;

  if (!apiKey || !listId) {
    console.error('BREVO_API_KEY ou BREVO_LIST_ID manquant dans les variables d\'environnement.');
    return res.status(500).json({ error: 'Configuration serveur manquante.' });
  }

  try {
    const { email, company } = req.body || {};

    // Piège à robots : ce champ doit rester vide.
    if (company) {
      return res.status(200).json({ success: true });
    }

    if (!email || !EMAIL_RE.test(String(email).trim())) {
      return res.status(400).json({ error: 'Merci de renseigner une adresse e-mail valide.' });
    }

    const response = await fetch(BREVO_CONTACTS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': apiKey,
      },
      body: JSON.stringify({
        email: String(email).trim(),
        listIds: [Number(listId)],
        updateEnabled: true,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('Erreur Brevo (newsletter) :', errText);
      return res.status(502).json({ error: 'Impossible de vous inscrire pour le moment.' });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Erreur newsletter :', err);
    return res.status(500).json({ error: 'Une erreur interne est survenue.' });
  }
};
