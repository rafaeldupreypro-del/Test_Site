/* =========================================================================
   Script de seed — importe le contenu de l'ancien site statique dans Sanity.
   À lancer une seule fois après avoir créé le projet Sanity et rempli
   .env.local (NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET,
   SANITY_API_TOKEN avec droits d'écriture) :

     npm run seed

   Le script est idempotent au niveau des projets (utilise un _id déterministe
   "project-<slug>" avec createOrReplace), donc on peut le relancer sans
   créer de doublons.
   ========================================================================= */
import { createClient } from '@sanity/client';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const token = process.env.SANITY_API_TOKEN;

if (!projectId || !token) {
  console.error('\n✖ NEXT_PUBLIC_SANITY_PROJECT_ID et SANITY_API_TOKEN sont requis dans .env.local pour lancer le seed.\n');
  process.exit(1);
}

const client = createClient({ projectId, dataset, apiVersion: '2024-01-01', token, useCdn: false });

const siteSettings = {
  _id: 'siteSettings',
  _type: 'siteSettings',
  agencyName: 'Atelier Méridien',
  tagline: "Agence d'architecture & d'urbanisme",
  logoText: 'Atelier|Méridien',
  phone: '02 35 12 00 34',
  phoneHref: '+33235120034',
  email: 'contact@atelier-meridien.fr',
  addressLine1: '12 Quai de Southampton',
  addressLine2: '76600 Le Havre',
  openingHours: 'Lun–Ven 9h–18h30',
  mapEmbedUrl: 'https://www.google.com/maps?q=12+Quai+de+Southampton,+76600+Le+Havre&output=embed',
  socialLinks: [
    { _key: 'instagram', label: 'Instagram', url: '#' },
    { _key: 'linkedin', label: 'LinkedIn', url: '#' },
    { _key: 'pinterest', label: 'Pinterest', url: '#' },
  ],
  statYears: 14,
  statFoundedYear: 2011,
  statProjects: 62,
  statSurface: 48000,
  statAwards: 5,
  statTeamSize: 14,
  heroTitle: "Agence d'<em>architecture</em> &amp; d'<em>urbanisme</em>, au Havre.",
  heroLede: "Depuis 2011, Atelier Méridien dessine des logements, des équipements publics et des bureaux qui prennent le temps de comprendre leur site avant de le transformer.",
  quoteText: "Ils ont su transformer une contrainte de site en véritable parti pris architectural. Le résultat dépasse largement ce que nous avions imaginé.",
  quoteAuthor: "Le Havre Seine Métropole, maîtrise d'ouvrage Médiathèque des Docks",
  defaultSeoDescription: "Atelier Méridien conçoit des architectures ancrées dans leur territoire : logements, équipements culturels, bureaux et projets urbains, depuis Le Havre.",
};

function section(eyebrow, heading, body) {
  return { _key: eyebrow.toLowerCase().replace(/[^a-z0-9]+/g, '-'), eyebrow, heading, body };
}

const projects = [
  {
    slug: 'projet-maison-falaise', title: 'Maison sur la Falaise', category: 'residentiel', tag: 'Résidentiel',
    location: 'Étretat', year: 2024, plateNumber: 'PLAN N° 47', featured: true, order: 1,
    eyebrowMeta: 'Résidentiel — Plan N° 47',
    bannerMeta: ['Étretat, France', 'Livré en 2024', '210 m²', 'Maison individuelle'],
    sections: [
      section('Le contexte', 'Un terrain en surplomb, une vue à ne pas gâcher', "Implanté sur une parcelle en léger surplomb du village, ce terrain offrait une vue dégagée sur la Manche que les précédentes esquisses du client cherchaient à capter frontalement, au prix d'un volume imposant sur la rue. Nous avons proposé l'inverse : effacer la maison depuis la route et ne révéler le paysage qu'une fois le seuil franchi."),
      section('Le geste architectural', 'Un plan en L, replié sur un jardin clos de vent', "Le bâtiment se déploie en L autour d'une cour intérieure protégée des vents dominants, qui rythme la vie de la maison à l'abri des embruns. Côté falaise, un long bandeau vitré ouvre le séjour sur l'horizon marin ; côté route, la façade reste presque aveugle, ponctuée d'une seule ouverture cadrée sur le clocher du village."),
      section('La matérialité', 'Bardage bois grisé et bardage zinc', "Le bardage en mélèze non traité, laissé au grisaillement naturel, reprend la teinte des galets de la plage en contrebas. Les toitures et le retour de façade nord sont couverts d'un bac acier zinc, choisi pour sa tenue face aux embruns et sa discrétion dans le paysage normand."),
    ],
    pullQuote: "La maison ne s'impose pas sur la falaise, elle s'y love. On l'oublie depuis la route, on la découvre depuis le jardin.",
    client: 'Commande privée', specLocation: 'Étretat, Normandie', surface: '210 m² SHAB', budget: '620 000 € HT',
    delivery: 'Mars 2024', team: 'Atelier Méridien (mandataire), BET Fluides Cardinal',
  },
  {
    slug: 'projet-mediatheque-docks', title: 'Médiathèque des Docks', category: 'culturel', tag: 'Équipement culturel',
    location: 'Le Havre', year: 2023, plateNumber: 'PLAN N° 52', featured: true, order: 2,
    eyebrowMeta: 'Équipement culturel — Plan N° 52',
    bannerMeta: ['Le Havre, France', 'Livré en 2023', '2 400 m²', "Prix Européen d'Architecture 2023"],
    sections: [
      section('Le contexte', "Un ancien hangar portuaire, une nouvelle porte d'entrée sur la lecture publique", "Implantée sur le môle central du bassin Vauban, la Médiathèque des Docks occupe l'emprise d'un ancien hangar de stockage. La commande initiale demandait une reconstruction complète ; nous avons proposé de conserver l'ossature métallique existante et de la révéler plutôt que de l'effacer."),
      section('Le geste architectural', 'Une nef de lecture sous charpente métallique', "La charpente d'origine, sablée et traitée, devient la cinquième façade du projet. Sous elle, un plancher suspendu organise trois niveaux de consultation autour d'un vide central baigné de lumière zénithale — un dispositif qui réduit de 40 % les besoins en éclairage artificiel en journée."),
      section('La matérialité', 'Bois, acier réemployé, brique havraise', "Les planchers et mobiliers intégrés sont en chêne local. 60 % de l'acier de charpente est issu du bâtiment existant. Les façades neuves reprennent l'appareillage de brique caractéristique de la reconstruction havraise, en écho au patrimoine Perret voisin."),
    ],
    pullQuote: "Le bâtiment raconte encore ce qu'il a été — un lieu de flux et de marchandises — avant de devenir un lieu de savoir.",
    client: 'Le Havre Seine Métropole', specLocation: 'Bassin Vauban, Le Havre', surface: '2 400 m² SDP', budget: '7,8 M€ HT',
    delivery: 'Septembre 2023', team: 'Atelier Méridien (mandataire), BET Structure Argos, Paysage YK Studio',
    distinction: "Prix Européen d'Architecture Contemporaine, 2023",
  },
  {
    slug: 'projet-siege-armateur', title: 'Siège Armateur & Cie', category: 'bureaux', tag: 'Bureaux',
    location: 'Le Havre', year: 2022, plateNumber: 'PLAN N° 55', featured: true, order: 3,
    eyebrowMeta: 'Bureaux — Plan N° 55',
    bannerMeta: ['Le Havre, France', 'Livré en 2022', '3 100 m²', 'Bureaux'],
    sections: [
      section('Le contexte', 'Un siège social face au chenal, entre héritage maritime et travail contemporain', "Armateur & Cie souhaitait regrouper sur un site unique des équipes jusque-là dispersées sur trois adresses. Le terrain, en front de chenal, imposait une réponse capable de dialoguer avec les grues et silos voisins sans reproduire leur échelle industrielle."),
      section('Le geste architectural', 'Un socle massif, un attique de verre', "Le projet superpose un socle en béton matricé, abritant accueil et espaces partagés, à trois niveaux de plateaux de bureaux enveloppés d'une résille métallique brise-soleil. Le dernier niveau, entièrement vitré, s'efface pour laisser le regard filer jusqu'aux bassins."),
      section('La matérialité', 'Béton matricé, aluminium anodisé, chêne clair', "La résille de brise-soleil en aluminium anodisé ton champagne reprend le rythme des portiques à conteneurs visibles depuis les étages. À l'intérieur, sols et menuiseries en chêne clair contrastent avec la minéralité des façades."),
    ],
    pullQuote: "Un bâtiment qui regarde le port sans lui tourner le dos, ni chercher à l'imiter.",
    client: 'Armateur & Cie', specLocation: 'Quai de Southampton, Le Havre', surface: '3 100 m² SDP', budget: '9,4 M€ HT',
    delivery: 'Janvier 2022', team: 'Atelier Méridien (mandataire), BET Structure Argos, Économie Romane Duval',
  },
  {
    slug: 'projet-residence-terrasses', title: 'Résidence Les Terrasses', category: 'residentiel-collectif', tag: 'Résidentiel collectif',
    location: 'Sainte-Adresse', year: 2021, plateNumber: 'PLAN N° 41', featured: false, order: 4,
    eyebrowMeta: 'Résidentiel collectif — Plan N° 41',
    bannerMeta: ['Sainte-Adresse, France', 'Livré en 2021', '1 850 m²', '24 logements'],
    sections: [
      section('Le contexte', 'Une pente forte, un programme de logements sociaux et intermédiaires', "Le terrain, en pente marquée vers la mer, rendait délicat tout plan-masse traditionnel en barres. Le bailleur social souhaitait par ailleurs que chaque logement bénéficie d'un espace extérieur généreux, exigence rare sur ce type de programme."),
      section('Le geste architectural', 'Un bâtiment en gradins, épousant la pente', "Les 24 logements se répartissent en cinq niveaux décalés qui suivent la déclivité du terrain, chacun en retrait du précédent. Ce dispositif libère, pour chaque appartement, une terrasse en toiture du logement inférieur — traitée comme un vrai jardin suspendu plutôt qu'un balcon technique."),
      section('La matérialité', 'Enduit clair, garde-corps en bois, végétalisation', "Un enduit à la chaux clair unifie les volumes en gradins. Les garde-corps en lames de bois filtrent les vues entre voisins sans fermer le paysage, et les terrasses sont livrées avec bacs de plantation intégrés pour favoriser une appropriation rapide par les habitants."),
    ],
    pullQuote: "Chaque appartement a sa propre terrasse, sa propre vue — comme une maison superposée à une autre.",
    client: 'Habitat Estuaire, bailleur social', specLocation: 'Sainte-Adresse, Normandie', surface: '1 850 m² SHAB, 24 logements',
    budget: '4,1 M€ HT', delivery: 'Juin 2021', team: 'Atelier Méridien (mandataire), Paysage YK Studio',
  },
  {
    slug: 'projet-friche-bellot', title: 'Requalification Friche Bellot', category: 'urbanisme', tag: 'Urbanisme',
    location: 'Le Havre', year: 2024, plateNumber: 'PLAN N° 58', featured: false, order: 5,
    eyebrowMeta: 'Urbanisme — Plan N° 58',
    bannerMeta: ['Le Havre, France', 'Étude livrée en 2024', '3,2 ha', 'Étude urbaine'],
    sections: [
      section('Le contexte', "3,2 hectares d'anciens entrepôts, au contact direct des quartiers habités", "La friche Bellot, ancienne emprise logistique fermée en 2016, jouxte directement plusieurs quartiers résidentiels du Havre. La collectivité souhaitait une étude de faisabilité capable d'articuler mixité de programmes, désimperméabilisation des sols et continuité avec le tissu urbain existant."),
      section('Le geste architectural', 'Un plan-guide en îlots ouverts, autour d\'un parc central', "Le schéma directeur organise le site en îlots ouverts de logements, d'activités et d'équipements, structurés autour d'un parc central issu de la désimperméabilisation de 40 % des sols. Deux halles industrielles sont conservées et repositionnées comme équipements de quartier."),
      section('La matérialité', 'Sols désimperméabilisés, réemploi des structures existantes', "L'étude priorise le réemploi des deux halles à ossature métallique les mieux conservées, et prévoit la déconstruction sélective du reste du site pour réemploi des matériaux sur les futurs chantiers du secteur."),
    ],
    pullQuote: "Une friche n'est jamais un terrain vide : elle porte déjà une mémoire de sols, de circulations, de bâtis à réemployer.",
    client: 'Le Havre Seine Métropole', specLocation: 'Quartier Bellot, Le Havre', surface: '3,2 ha, environ 45 000 m² de programmes',
    budget: '180 000 € HT (étude)', delivery: 'Étude remise en 2024', team: 'Atelier Méridien (mandataire), Paysage YK Studio, BET VRD Cardinal',
  },
  {
    slug: 'projet-conservatoire-musique', title: 'Conservatoire de Musique', category: 'culturel', tag: 'Équipement culturel',
    location: 'Montivilliers', year: 2020, plateNumber: 'PLAN N° 38', featured: false, order: 6,
    eyebrowMeta: 'Équipement culturel — Plan N° 38',
    bannerMeta: ['Montivilliers, France', 'Livré en 2020', '1 600 m²', 'Trophée Bois 2020'],
    sections: [
      section('Le contexte', 'Un conservatoire municipal exigu, à reconstruire sur un terrain contraint', "L'ancien conservatoire de Montivilliers, installé dans une maison bourgeoise inadaptée, ne permettait plus l'accueil simultané des classes instrumentales. Le nouveau bâtiment devait se glisser sur une parcelle étroite en cœur de ville, entre une école et un jardin public classé."),
      section('Le geste architectural', 'Des volumes en boîtes acoustiques, reliés par une rue intérieure', "Le programme se répartit en volumes indépendants — salles individuelles, salle d'orchestre, auditorium — chacun désolidarisé structurellement pour garantir son isolement acoustique, reliés par une rue intérieure vitrée qui sert aussi de foyer et de salle d'exposition informelle."),
      section('La matérialité', 'Ossature bois, façades en bardeaux de mélèze', "L'ensemble est construit en ossature bois, avec une façade en bardeaux de mélèze qui évolue avec les saisons. À l'intérieur, les parois de l'auditorium combinent panneaux de bois massif et laine de bois pour un traitement acoustique entièrement biosourcé."),
    ],
    pullQuote: "Isoler chaque salle du bruit de sa voisine, sans jamais isoler les musiciens les uns des autres.",
    client: 'Ville de Montivilliers', specLocation: 'Centre-ville, Montivilliers', surface: '1 600 m² SDP', budget: '4,6 M€ HT',
    delivery: 'Octobre 2020', team: 'Atelier Méridien (mandataire), Acousticien Décibel Ingénierie',
    distinction: 'Le Moniteur — Trophée Bois, 2020',
  },
  {
    slug: 'projet-pepiniere-numerique', title: 'Pépinière Numérique', category: 'bureaux', tag: 'Bureaux',
    location: 'Le Havre', year: 2019, plateNumber: 'PLAN N° 33', featured: false, order: 7,
    eyebrowMeta: 'Bureaux — Plan N° 33',
    bannerMeta: ['Le Havre, France', 'Livré en 2019', '2 200 m²', 'Tertiaire mutualisé'],
    sections: [
      section('Le contexte', 'Un incubateur pour trente jeunes entreprises, sur un ancien site logistique', "La collectivité souhaitait doter Le Havre d'un lieu d'accueil pour ses jeunes entreprises du numérique, sur le site d'un ancien entrepôt de messagerie proche de la gare. Le programme mêlait bureaux à louer, espaces de coworking et salles d'événements mutualisées."),
      section('Le geste architectural', 'Un plan libre modulable, structuré par un noyau central', "La structure poteaux-dalles, dégagée de tout mur porteur en façade, permet un cloisonnement entièrement modulable selon la taille des entreprises accueillies. Un noyau central regroupe circulations verticales, sanitaires et réseaux techniques, laissant les plateaux totalement libres."),
      section('La matérialité', 'Structure béton apparente, cloisons amovibles', "Le béton de structure reste brut et apparent en plafond, limitant les finitions superflues. Les cloisons de séparation entre lots sont montées à sec, entièrement démontables et réemployables lors des réaménagements successifs."),
    ],
    pullQuote: "Un immeuble capable d'accueillir une entreprise de deux personnes comme une équipe de trente, sans jamais paraître à moitié vide.",
    client: 'Le Havre Seine Métropole', specLocation: 'Quartier de la Gare, Le Havre', surface: '2 200 m² SDP', budget: '5,3 M€ HT',
    delivery: 'Mai 2019', team: 'Atelier Méridien (mandataire), BET Structure Argos',
  },
  {
    slug: 'projet-maison-atelier-peintre', title: 'Maison Atelier du Peintre', category: 'residentiel', tag: 'Résidentiel',
    location: 'Honfleur', year: 2018, plateNumber: 'PLAN N° 29', featured: false, order: 8,
    eyebrowMeta: 'Résidentiel — Plan N° 29',
    bannerMeta: ['Honfleur, France', 'Livré en 2018', '140 m²', "Maison et atelier d'artiste"],
    sections: [
      section('Le contexte', "Une commande d'artiste, entre lieu de vie et outil de travail", "Une peintre installée à Honfleur cherchait à réunir sur une même parcelle son logement et son atelier, jusque-là séparés en ville. Le programme demandait avant tout une lumière nord constante et stable, condition de travail non négociable pour l'artiste."),
      section('Le geste architectural', 'Un atelier en sheds, une maison en retrait', "L'atelier occupe le volume principal, couvert de sheds orientés au nord qui garantissent une lumière diffuse et constante toute la journée. La partie habitation, plus modeste, se love en retrait derrière l'atelier, organisée autour d'un patio qui la protège des regards de la rue."),
      section('La matérialité', "Bardage bois brûlé, verrières d'atelier en acier", "Le bardage extérieur en bois brûlé selon la technique du yakisugi confère à l'ensemble une teinte sombre et durable, sans entretien. Les verrières d'atelier, en profilés d'acier fin, reprennent le vocabulaire des ateliers d'artistes du XIXe siècle."),
    ],
    pullQuote: "Toute la maison s'organise autour d'une seule exigence : la qualité de la lumière dans l'atelier.",
    client: 'Commande privée', specLocation: 'Honfleur, Normandie', surface: "140 m² SHAB, dont 55 m² d'atelier",
    budget: '410 000 € HT', delivery: 'Septembre 2018', team: 'Atelier Méridien (mandataire)',
  },
  {
    slug: 'projet-schema-directeur-vauban', title: 'Schéma Directeur Bassin Vauban', category: 'urbanisme', tag: 'Urbanisme',
    location: 'Le Havre', year: 2025, plateNumber: 'PLAN N° 61', featured: false, order: 9,
    eyebrowMeta: 'Urbanisme — Plan N° 61',
    bannerMeta: ['Le Havre, France', 'Étude livrée en 2025', '18 ha', 'Schéma directeur'],
    sections: [
      section('Le contexte', 'Un quartier en mutation depuis vingt ans, à projeter sur les vingt prochaines', "Le bassin Vauban, reconverti par étapes depuis les années 2000, restait dépourvu d'une vision d'ensemble à long terme intégrant montée du niveau marin, densification mesurée et préservation du patrimoine portuaire. La collectivité a confié à l'agence l'élaboration de ce schéma directeur à l'échelle du quartier."),
      section('Le geste architectural', "Une armature d'espaces publics avant toute règle de constructibilité", "Plutôt que de fixer d'emblée hauteurs et gabarits, l'étude commence par dessiner l'armature des espaces publics — quais, places, continuités piétonnes — et n'en déduit qu'ensuite les règles de constructibilité des îlots, îlot par îlot."),
      section('La matérialité', 'Sols perméables, cote de sécurité rehaussée', "L'ensemble des espaces publics projetés intègre des revêtements perméables et une cote de premier plancher rehaussée de 40 cm par rapport aux constructions existantes, anticipant les scénarios de montée du niveau marin à l'horizon 2070."),
    ],
    pullQuote: "Un schéma directeur n'est pas un plan figé : c'est une règle du jeu capable d'absorber vingt ans d'imprévus.",
    client: 'Le Havre Seine Métropole', specLocation: 'Bassin Vauban, Le Havre', surface: '18 ha', budget: '310 000 € HT (étude)',
    delivery: 'Étude remise en 2025', team: 'Atelier Méridien (mandataire), Paysage YK Studio, BET VRD Cardinal',
  },
];

const sampleEvent = {
  _id: 'event-exemple',
  _type: 'event',
  title: 'Portes ouvertes agence — sur rendez-vous',
  badge: 'Actualité',
  message: "Le mois prochain, l'agence ouvre ses portes pour présenter ses derniers projets livrés. Places limitées.",
  ctaLabel: 'Réserver un créneau',
  ctaUrl: '/contact',
  active: false,
  startDate: null,
  endDate: null,
};

async function run() {
  console.log(`→ Seed vers le dataset "${dataset}" du projet "${projectId}"...`);

  await client.createOrReplace(siteSettings);
  console.log('✓ Réglages du site créés/à jour.');

  for (const p of projects) {
    const doc = {
      _id: `project-${p.slug}`,
      _type: 'project',
      title: p.title,
      slug: { _type: 'slug', current: p.slug },
      category: p.category,
      tag: p.tag,
      location: p.location,
      year: p.year,
      plateNumber: p.plateNumber,
      featured: p.featured,
      order: p.order,
      eyebrowMeta: p.eyebrowMeta,
      bannerMeta: p.bannerMeta,
      sections: p.sections,
      pullQuote: p.pullQuote,
      client: p.client,
      specLocation: p.specLocation,
      surface: p.surface,
      budget: p.budget,
      delivery: p.delivery,
      team: p.team,
      distinction: p.distinction,
    };
    await client.createOrReplace(doc);
    console.log(`✓ Projet importé : ${p.title}`);
  }

  await client.createIfNotExists(sampleEvent);
  console.log('✓ Exemple de bandeau événement créé (inactif par défaut — à activer dans le Studio).');

  console.log('\nTerminé. Lancez `npm run dev` puis ouvrez /studio pour éditer le contenu.');
}

run().catch((err) => {
  console.error('\n✖ Échec du seed :', err.message);
  process.exit(1);
});
