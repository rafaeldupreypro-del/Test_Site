# Atelier Méridien — Next.js + Sanity (template pro)

Portage du site statique (`Pro/`) vers **Next.js 14 (App Router) + Sanity**,
pensé comme **template réutilisable** pour vos futurs clients d'agence :
chaque client = un nouveau dataset Sanity (ou projet Sanity), le code ne
change pas.

## Ce qui est piloté par Sanity

- **Réglages du site** (singleton) : nom, coordonnées, réseaux sociaux,
  chiffres clés (années, projets, m², prix), textes du hero et de la
  citation d'accueil.
- **Projets** (portfolio) : chaque projet est un document Sanity — plus
  besoin de créer un fichier HTML par réalisation. Les 9 projets du site de
  démo sont prêts à être importés (voir *Seed* ci-dessous).
- **Événements / offres spéciales** : un bandeau sur l'accueil, activable
  par dates ou manuellement — pour vos annonces, offres limitées, etc.

Les pages "Agence" et une partie de "Contact" restent volontairement en
contenu statique dans le code (équipe, historique, FAQ) : à adapter par
client directement dans les composants/pages, ou à sortir vers Sanity plus
tard si besoin.

## ⚠️ Important — installation en local

Ce projet a été généré dans un environnement sans accès internet (pas
d'accès à npm, GitHub ou l'API Sanity). **Il n'a donc pas pu être installé
ni testé avec `npm install` / `npm run build` avant livraison.** Le code a
été relu attentivement (syntaxe JS validée, structure vérifiée), mais un
premier `npm install && npm run dev` en local reste nécessaire pour
confirmer que tout compile chez vous, avant mise en production.

## Démarrage

```bash
cd atelier-meridien-nextjs
npm install
cp .env.local.example .env.local
```

### 1. Créer le projet Sanity

Deux options :

- **Le plus simple** : `npx sanity init` depuis ce dossier (choisir "Create
  new project", dataset `production`). La CLI remplit `NEXT_PUBLIC_SANITY_PROJECT_ID`
  pour vous.
- **Manuel** : créer un projet sur [sanity.io/manage](https://www.sanity.io/manage),
  copier le Project ID dans `.env.local`.

Puis, sur sanity.io/manage → API → Tokens, créer un token avec droits
**Editor**, et le mettre dans `SANITY_API_TOKEN` (nécessaire pour le Studio
et le script de seed).

### 2. Importer le contenu de démo

```bash
npm run seed
```

Importe les réglages du site + les 9 projets du site de démo (textes
d'origine repris à l'identique). Sans images (le design d'origine utilise
des motifs décoratifs `art-1` à `art-6` en l'absence de vraie photo — ajoutez
vos images dans le Studio, elles remplaceront automatiquement les motifs).

### 3. Lancer le site

```bash
npm run dev
```

- Site : http://localhost:3000
- Studio Sanity (édition de contenu) : http://localhost:3000/studio

## Déploiement (Vercel)

1. Pousser ce dossier sur un repo Git.
2. Dans Vercel, créer un projet pointant sur ce dossier (si le repo contient
   aussi l'ancien site statique, définir le **Root Directory** sur
   `atelier-meridien-nextjs`).
3. Renseigner les variables d'environnement du `.env.local` dans Vercel
   (Project Settings → Environment Variables) : Sanity, Brevo, SMTP.
4. Déployer.

## Dupliquer pour un nouveau client

1. Créer un nouveau dataset Sanity (ou un nouveau projet Sanity), avec les
   mêmes schémas.
2. Cloner ce dossier, changer `NEXT_PUBLIC_SANITY_PROJECT_ID` /
   `NEXT_PUBLIC_SANITY_DATASET`.
3. Remplir "Réglages du site" et les projets dans le Studio (ou adapter
   `scripts/seed.mjs` pour préremplir automatiquement).
4. Adapter les textes statiques d'`app/agence/page.js` (équipe, historique)
   au nouveau client.
5. Déployer sur un nouveau projet Vercel.

## Ce qui a été conservé de l'ancien site

- Design intégral (CSS quasi inchangé, copié depuis `assets/style.css`).
- Toutes les interactions (menu mobile, barre de progression, révélation au
  scroll, retour en haut) — portées en composant client React.
- Formulaire de contact et newsletter, avec la même logique Brevo/SMTP que
  les anciennes fonctions `/api`.
- SEO : meta description, Open Graph, JSON-LD (ArchitectureFirm,
  CreativeWork, BreadcrumbList), sitemap à régénérer (voir
  `next-sitemap` si besoin, non inclus par défaut).

## Ce qui change par rapport à l'ancien site statique

- Les 8 pages `projet-*.html` sont remplacées par **une seule page
  dynamique** `app/projets/[slug]/page.js`, générée pour chaque projet
  présent dans Sanity (`generateStaticParams`).
- Le contenu se met à jour sans redéploiement (revalidation toutes les
  60 secondes ; possibilité de brancher un webhook Sanity → Vercel pour une
  mise à jour instantanée).
