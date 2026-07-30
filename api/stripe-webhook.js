import Stripe from 'stripe';

// Initialise Stripe avec ta clé secrète (récupérée depuis tes variables d'environnement Vercel)
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Vercel a besoin de cette configuration pour lire le corps brut de la requête Stripe
export const config = {
  api: {
    bodyParser: false,
  },
};

// Fonction utilitaire pour lire le flux brut de la requête
async function buffer(readable) {
  const chunks = [];
  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  const buf = await buffer(req);
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    // Vérifie que l'événement vient bien de Stripe grâce au secret du webhook
    event = stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error(`Erreur de signature Webhook : ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Si le paiement est validé
  // Si le paiement est validé
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    try {
      // Récupère les articles de la commande depuis Stripe
      const lineItems = await stripe.checkout.sessions.listLineItems(session.id);

      for (const item of lineItems.data) {
        // Récupère l'ID du produit de façon sécurisée (qu'il soit string ou objet)
        const productObj = item.price.product;
        const productId = typeof productObj === 'string' ? productObj : productObj.id;
        const quantity = item.quantity;

        console.log("ID du produit envoyé à Google :", productId); // S'affichera dans les logs Vercel

        // Envoie l'ordre de décrémentation à ton Google Apps Script
        const googleResponse = await fetch('https://script.google.com/macros/s/AKfycbyvUxeTyPtPn5jQAyJ_tF3528YV8JvcWsVhc2bYjiL2zi7etgwJu_dOSpjTD1qbJ4R5og/exec', {
          method: 'POST',
          redirect: 'follow',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            productId: productId,
            quantity: quantity
          })
        });

        const googleResult = await googleResponse.text();
        console.log("Réponse de Google Apps Script :", googleResult);
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour Google Sheets :", error);
    }
  }

  res.status(200).json({ received: true });
}