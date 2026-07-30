import Stripe from 'stripe';

// Initialisation de Stripe avec la clé secrète du client
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Méthode non autorisée' }); 
    }

    try {
        // 1. Récupérer tous les produits actifs depuis Stripe
        const products = await stripe.products.list({ active: true });

        // 2. Pour chaque produit, récupérer son prix associé
        const productsWithPrices = await Promise.all(
            products.data.map(async (product) => {
                const prices = await stripe.prices.list({ product: product.id, active: true });
                const price = prices.data[0]; // On prend le premier prix actif

                return {
                    id: product.id,
                    name: product.name,
                    desc: product.description,
                    image: product.images && product.images.length > 0 ? product.images[0] : null,
                    price: price ? price.unit_amount / 100 : 0, // Stripe renvoie les prix en centimes, on convertit en euros
                    priceId: price ? price.id : null
                };
            })
        );

        // 3. Renvoyer le tout au site web au format JSON propre
        return res.status(200).json(productsWithPrices);

    } catch (error) {
        console.error("Erreur Stripe:", error);
        return res.status(500).json({ error: "Impossible de récupérer le catalogue." });
    }
}