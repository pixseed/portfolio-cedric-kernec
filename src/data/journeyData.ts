import type { JourneyEntry } from "../types/journey";
import { technologies } from "./technologiesData";

export const journeyEntries: JourneyEntry[] = [
  {
    id: "cef-dwwm",
    type: "education",
    title: "Formation Développeur web et web mobile",
    organization: {
      name: "Centre Européen de Formation",
      url: "https://www.centre-europeen-formation.fr/formations/informatique/developpeur-web/",
    },
    startDate: "2025-07",
    description:
      "Formation au développement front-end et back-end, en préparation du titre professionnel DWWM de niveau 5 (bac+2).",
    featured: true,
    technologies: [
      technologies.html,
      technologies.css,
      technologies.javascript,
      technologies.react,
      technologies.php,
      technologies.mySql,
      technologies.postman,
      technologies.figma,
      technologies.github,
      technologies.mongoDb,
      technologies.swagger,
    ],
  },
  {
    id: "ctteb-2024",
    type: "experience",
    title: "Communication et aide à la gestion",
    organization: {
      name: "Club de Tennis de Table Erdeven-Belz",
      url: "https://ctterdevenbelz.wixsite.com/ctteb",
    },
    startDate: "2024-08",
    description:
      "Communication visuelle et digitale, gestion du site via CMS et création d'outils de suivi sur Google Sheets pour accompagner la gestion financière, les adhérents et les équipes.",
    featured: true,
    links: [
      {
        label: "Instagram du CTTEB",
        href: "https://www.instagram.com/c.t.t.e.b/",
      },
      {
        label: "Facebook du CTTEB",
        href: "https://www.facebook.com/ctterdevenbelz",
      },
    ],
    technologies: [technologies.googleSheets, technologies.canva],
    employmentType: "volunteer",
  },
  {
    id: "le-bon-tempo-2022",
    type: "experience",
    title: "Responsable de gestion, administratif et financier",
    organization: {
      name: "Le Bon Tempo Productions",
    },
    startDate: "2022-08",
    endDate: "2024-12",
    description:
      "Création d'outils de gestion sur Google Sheets : devis, factures, contrats, trésorerie et tableaux prévisionnels. Organisation interne, communication visuelle et gestion du site via CMS.",
    featured: true,
    technologies: [
      technologies.googleSheets,
      technologies.notion,
      technologies.photoshop,
      technologies.illustrator,
      technologies.inDesign,
    ],
    employmentNote: "Intermittence du spectacle",
  },
  {
    id: "krill-surgeles-2019-cdd-part-time",
    type: "experience",
    title: "Préparateur de commandes — secteur surgelé",
    organization: {
      name: "Réseau Krill",
      url: "https://www.krill.fr/trouver-votre-distributeur/so-breizh/",
    },
    startDate: "2019-07",
    endDate: "2020-02",
    description:
      "Préparation des commandes, suivi des stocks et des dates limites de consommation, participation aux inventaires et respect des délais d'expédition.",
    featured: false,
    employmentType: "fixed-term",
    workTime: "part-time",
  },
  {
    id: "krill-surgeles-2019-cdd",
    type: "experience",
    title: "Préparateur de commandes — secteur surgelé",
    organization: {
      name: "Réseau Krill",
      url: "https://www.krill.fr/trouver-votre-distributeur/so-breizh/",
    },
    startDate: "2019-04",
    endDate: "2019-06",
    description:
      "Préparation des commandes destinées aux livraisons, contrôle des produits et participation au suivi des stocks.",
    featured: false,
    employmentType: "fixed-term",
    workTime: "full-time",
  },
  {
    id: "zephyre-studio-2019-self-employment",
    type: "experience",
    title: "Designer graphique indépendant",
    organization: {
      name: "Zephyre Studio",
      url: "https://www.instagram.com/zephyre.std",
    },
    startDate: "2019-03",
    endDate: "2023-11",
    description:
      "Conception d'identités visuelles, de supports imprimés et de contenus numériques. Création de sites via CMS et d'outils de gestion commerciale sur Google Sheets.",
    featured: true,
    technologies: [
      technologies.photoshop,
      technologies.illustrator,
      technologies.inDesign,
      technologies.premierePro,
      technologies.googleSheets,
    ],
    employmentType: "self-employed",
  },
  {
    id: "sup-de-com",
    type: "education",
    title: "Bachelor Responsable de communication",
    organization: {
      name: "Brest Open Campus — SUP' DE COM",
      url: "https://info.ecoles-supdecom.com/bachelor-communication/",
    },
    startDate: "2018-09",
    endDate: "2019-06",
    description:
      "Formation en communication, spécialité créativité et identité de marque.",
    featured: true,
    technologies: [
      technologies.photoshop,
      technologies.illustrator,
      technologies.inDesign,
      technologies.premierePro,
    ],
  },
  {
    id: "departement-morbihan-2017-internship",
    type: "experience",
    title: "Stagiaire graphiste",
    organization: {
      name: "Conseil départemental du Morbihan",
      url: "https://www.morbihan.fr/",
    },
    startDate: "2017-03",
    endDate: "2017-04",
    description:
      "Création et mise en page de supports de communication : brochures, affiches et flyers. Retouche d'images avec Photoshop, Illustrator et InDesign.",
    featured: false,
    technologies: [
      technologies.photoshop,
      technologies.illustrator,
      technologies.inDesign,
    ],
    employmentType: "internship",
  },
  {
    id: "greta-maquettiste-graphiste",
    type: "education",
    title: "Titre professionnel Maquettiste-Graphiste",
    organization: {
      name: "GRETA Bretagne Sud — Vannes",
      url: "https://orientation.bretagne.bzh/formations/titre-professionnel-concepteur-designer-ui",
    },
    startDate: "2016-10",
    endDate: "2017-05",
    description:
      "Titre professionnel obtenu. Formation à la conception graphique et à la mise en page avec les outils de la suite Adobe Creative Cloud.",
    featured: true,
    technologies: [
      technologies.photoshop,
      technologies.illustrator,
      technologies.inDesign,
    ],
  },
  {
    id: "entraineur-tennis-de-table-2015-self-employment",
    type: "experience",
    title: "Entraîneur de tennis de table indépendant",
    organization: {
      name: "Kervignac Tennis de Table",
      url: "https://www.facebook.com/Kervignactennisdetable/",
    },
    startDate: "2015-09",
    endDate: "2016-06",
    description:
      "Préparation et animation de séances pour des enfants et adolescents, avec une approche ludique adaptée à leur niveau.",
    featured: false,
    employmentType: "self-employed",
  },
  {
    id: "krill-frais-2015-cdi",
    type: "experience",
    title: "Préparateur de commandes — secteur frais",
    organization: {
      name: "Réseau Krill",
      url: "https://www.krill.fr/trouver-votre-distributeur/so-breizh/",
    },
    startDate: "2015-09",
    endDate: "2016-09",
    description:
      "Préparation des commandes, contrôle des dates limites de consommation, suivi des stocks et participation aux inventaires.",
    featured: false,
    employmentType: "permanent",
    workTime: "full-time",
  },
  {
    id: "krill-frais-2015-cdd",
    type: "experience",
    title: "Préparateur de commandes — secteur frais",
    organization: {
      name: "Réseau Krill",
      url: "https://www.krill.fr/trouver-votre-distributeur/so-breizh/",
    },
    startDate: "2015-06",
    endDate: "2015-08",
    description:
      "Préparation des commandes, contrôle des dates limites de consommation, suivi des stocks et participation aux inventaires.",
    featured: false,
    employmentType: "fixed-term",
    workTime: "full-time",
  },
  {
    id: "animateur-federal-2014",
    type: "education",
    title: "Diplôme d'Animateur fédéral de tennis de table",
    organization: {
      name: "Fédération Française de Tennis de Table",
      url: "https://www.fftt.com/",
    },
    startDate: "2014-07",
    endDate: "2014-07",
    description:
      "Formation à l'animation et à l'encadrement de séances de tennis de table.",
    featured: false,
  },
  {
    id: "armor-auto-distribution-2013-internship",
    type: "experience",
    title: "Stagiaire comptable et secrétaire",
    organization: {
      name: "Armor Auto Distribution 56",
      url: "https://www.autodistribution.fr/",
    },
    startDate: "2013-01",
    endDate: "2013-02",
    description: "Stage de cinq semaines en comptabilité et secrétariat.",
    featured: false,
    employmentType: "internship",
  },
  {
    id: "but-2012-student",
    type: "experience",
    title: "Magasinier — service après-vente",
    organization: {
      name: "BUT",
      url: "https://www.but.fr/",
    },
    startDate: "2012-12",
    endDate: "2013-01",
    description:
      "Contrat étudiant de trois semaines au service après-vente, avec remise des commandes aux clients.",
    featured: false,
    employmentType: "student",
  },
  {
    id: "kerlys-2012-internship",
    type: "experience",
    title: "Stagiaire en comptabilité et gestion des stocks",
    organization: {
      name: "Kerlys",
      url: "https://recrutement.agromousquetaires.com/unite-production/kerlys/",
    },
    startDate: "2012-05",
    endDate: "2012-06",
    description:
      "Stage de quatre semaines associant comptabilité, magasinage et gestion des stocks.",
    featured: false,
    employmentType: "internship",
  },
  {
    id: "francois-meunier-2011-seasonal",
    type: "experience",
    title: "Magasinier saisonnier",
    organization: {
      name: "Établissements François Meunier",
      url: "https://www.npindustrie.fr/entreprise/",
    },
    startDate: "2011-06",
    endDate: "2014-08",
    periodLabel: "Étés 2011 à 2014 · juin à août · 4 saisons",
    description:
      "Emplois saisonniers durant quatre étés : réception et contrôle des produits, gestion des stocks, préparation et livraison de pièces pour la maintenance industrielle et navale.",
    featured: false,
    employmentType: "seasonal",
  },
  {
    id: "geant-casino-2011-internship",
    type: "experience",
    title: "Stagiaire comptable",
    organization: {
      name: "Géant Casino",
      url: "https://www.casino.fr/",
    },
    startDate: "2011-05",
    endDate: "2011-05",
    description:
      "Stage de découverte professionnelle de deux semaines en comptabilité.",
    featured: false,
    employmentType: "internship",
  },
  {
    id: "bricomarche-2011-internship",
    type: "experience",
    title: "Stagiaire comptable",
    organization: {
      name: "Bricomarché",
      url: "https://www.bricomarche.com/",
    },
    startDate: "2011-02",
    endDate: "2011-03",
    description: "Stage de quatre semaines en comptabilité.",
    featured: false,
    employmentType: "internship",
  },
  {
    id: "bac-pro-comptabilite",
    type: "education",
    title: "Bac professionnel Comptabilité et service administratif",
    organization: {
      name: "Lycée professionnel Émile Zola — Hennebont",
      url: "https://www.lpzola56.com/",
    },
    startDate: "2010-09",
    endDate: "2013-06",
    description:
      "Baccalauréat professionnel obtenu, consacré à la comptabilité et aux activités administratives.",
    featured: false,
    technologies: [technologies.sage, technologies.access],
  },
  {
    id: "color-marquage-2010-internship",
    type: "experience",
    title: "Stagiaire sérigraphe",
    organization: {
      name: "Color Marquage",
      url: "https://www.colormarquage.fr/",
    },
    startDate: "2010-03",
    endDate: "2010-04",
    description: "Stage de six semaines consacré à l'impression sur textile.",
    featured: false,
    employmentType: "internship",
  },
  {
    id: "arthur-et-marie-2009-internship",
    type: "experience",
    title: "Stagiaire sérigraphe",
    organization: {
      name: "Arthur et Marie",
      url: "https://www.facebook.com/arthuretmarie/",
    },
    startDate: "2009-03",
    endDate: "2009-03",
    description:
      "Stage de quatre semaines consacré à l'impression sur des jouets en bois.",
    featured: false,
    employmentType: "internship",
  },
  {
    id: "cap-serigraphie",
    type: "education",
    title: "CAP Sérigraphie industrielle",
    organization: {
      name: "Lycée professionnel Émile Zola — Hennebont",
      url: "https://www.lpzola56.com/",
    },
    startDate: "2008-09",
    endDate: "2010-06",
    description:
      "CAP obtenu, consacré aux techniques d'impression en sérigraphie.",
    featured: false,
    technologies: [technologies.photoshop, technologies.illustrator],
  },
];
