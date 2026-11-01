import {
  ArrowSquareOutIcon,
  BookOpenIcon,
  FigmaLogoIcon,
  GithubLogoIcon,
  KanbanIcon,
} from "@phosphor-icons/react";

import { technologies } from "./technologiesData";
import type { Project } from "../types/projects";

import laSocketterieIllustration from "../assets/images/projects/la-socketterie/la-socketterie-main.png";
import laSocketterieGantt from "../assets/images/projects/la-socketterie/la-socketterie-gantt.png";
import trouveTonArtisanIllustration from "../assets/images/projects/trouve-ton-artisan/trouve-ton-artisan-main.png";
import apiRussellIllustration from "../assets/images/projects/russell/russell-main.png";
import tifosiIllustration from "../assets/images/projects/tifosi/tifosi-main.png";
import porfolioReactIllustration from "../assets/images/projects/portfolio-react/porfolio-react-main.png";
import touchePasAuKlaxonIllustration from "../assets/images/projects/touche-pas-au-klaxon/touche-pas-au-klaxon-main.png";

export const projects: Array<Project> = [
  {
    id: "project1",
    category: "conception",
    categoryLabel: "Planification & architecture",
    title: "La Socketterie",
    illustration: laSocketterieIllustration,
    images: [
      laSocketterieGantt,
    ],
    introduction:
      "Préparation du développement d'une plateforme e-commerce, de l'analyse des besoins à l'organisation des différentes étapes du projet.",
    description:
      "La Socketterie est un projet de création d'une boutique en ligne pour une entreprise souhaitant développer son activité commerciale. Mon travail a consisté à préparer sa réalisation en définissant un cadre fonctionnel, technique et organisationnel, tout en tenant compte des ressources disponibles et des échéances imposées.",
    problematic:
      "Comment organiser le développement d'une plateforme e-commerce dans un calendrier contraint, avec une première version fonctionnelle attendue avant la livraison complète du projet ?",
    solution:
      "Élaboration d'une stratégie de développement progressive, avec une priorisation des fonctionnalités essentielles, une organisation du travail en tâches et une planification adaptée aux différentes échéances.",
    technicalPoints: [
      {
        title: "Architecture applicative",
        description:
          "Définition d'une architecture séparant l'interface React, l'API Express et la base de données MySQL.",
      },
      {
        title: "Backlog & User Stories",
        description:
          "Décomposition des besoins en fonctionnalités et critères d'acceptation pour structurer le travail de développement.",
      },
      {
        title: "Planification & dépendances",
        description:
          "Construction d'un diagramme de Gantt intégrant les étapes du projet, leurs dépendances et les jalons de livraison.",
      },
      {
        title: "Estimation budgétaire",
        description:
          "Évaluation des charges de travail et des coûts nécessaires à la réalisation du projet.",
      },
    ],
    featuredTechnologies: [
      technologies.html,
      technologies.css,
      technologies.github,
      technologies.markdown,
    ],
    technologies: [
      technologies.html,
      technologies.css,
      technologies.github,
      technologies.markdown,
    ],
    links: [
      {
        label: "Voir le dépôt",
        icon: GithubLogoIcon,
        link: "https://github.com/pixseed/kernec-cedric-devoir-9-planifier-le-developpement-d-un-site-de-vente",
      },
      {
        label: "Voir la planification",
        icon: KanbanIcon,
        link: "https://github.com/users/pixseed/projects/3/views/1",
      },
    ],
  },
  {
    id: "project2",
    category: "fullstack",
    categoryLabel: "Full-stack",
    title: "Trouve ton artisan",
    introduction:
      "Une plateforme web permettant aux particuliers de rechercher des artisans en Auvergne-Rhône-Alpes et de trouver un professionnel adapté à leurs besoins.",
    description:
      "Réalisée dans le cadre de ma formation, cette application full-stack couvre l'ensemble du processus de développement, de la conception des maquettes à la mise en production. Elle propose une interface responsive permettant de découvrir les artisans les mieux notés, d'effectuer des recherches par spécialité ou localisation, de consulter leurs profils et de les contacter.",
    problematic:
      "Comment faciliter la mise en relation entre particuliers et artisans locaux, tout en proposant une expérience de recherche intuitive, accessible et adaptée à tous les écrans ?",
    solution:
      "Conception d'une application reposant sur une interface React, une API REST Express et une base de données MySQL. Cette architecture permet de centraliser les informations des artisans et de proposer une recherche dynamique, des fiches détaillées et un formulaire de contact.",
    technicalPoints: [
      {
        title: "Architecture en couches",
        description:
          "Séparation des responsabilités côté serveur entre routes, contrôleurs, services, repositories et modèles.",
      },
      {
        title: "Modélisation relationnelle",
        description:
          "Conception d'une base MySQL reliant catégories, spécialités et artisans, avec gestion des associations via Sequelize.",
      },
      {
        title: "Sécurisation de l'API",
        description:
          "Validation des entrées, gestion centralisée des erreurs, limitation des requêtes et configuration des accès CORS.",
      },
      {
        title: "Qualité & déploiement",
        description:
          "Tests des endpoints avec Postman, vérifications de conformité et déploiement indépendant du front-end, de l'API et de la base de données.",
      },
    ],
    featuredTechnologies: [
      technologies.react,
      technologies.nodeJs,
      technologies.express,
      technologies.mySql,
    ],
    technologies: [
      technologies.react,
      technologies.sass,
      technologies.nodeJs,
      technologies.express,
      technologies.sequelize,
      technologies.mySql,
    ],
    illustration: trouveTonArtisanIllustration,
    links: [
      {
        label: "Voir le dépôt",
        icon: GithubLogoIcon,
        link: "https://github.com/pixseed/devoir-bilan-trouve-ton-artisan",
      },
      {
        label: "Voir le projet",
        icon: ArrowSquareOutIcon,
        link: "https://auvergnerhonealpes-trouve-ton-artisan.netlify.app/",
      },
      {
        label: "Voir la maquette",
        icon: FigmaLogoIcon,
        link: "https://www.figma.com/design/C0moU99nW9cfFlHHRzYXxc/Kernec_Cedric_Devoir_Bilan_Trouve_Ton_Artisan?node-id=38-3103&t=fcY6xDrTEQbigvnm-1",
      },
    ],
  },
  {
    id: "project3",
    category: "backend",
    categoryLabel: "Back-end / API",
    title: "Port de plaisance Russell",
    introduction:
      "Une API REST sécurisée accompagnée d'une interface d'administration pour gérer les emplacements, les réservations et les utilisateurs d'un port de plaisance.",
    description:
      "Développée dans le cadre de ma formation, cette application centralise la gestion quotidienne d'un port de plaisance. Elle permet aux administrateurs de consulter et modifier les données des catways, de gérer les réservations et les comptes utilisateurs, ainsi que de vérifier la disponibilité des emplacements. L'ensemble repose sur une API documentée et accessible depuis une interface web interne.",
    problematic:
      "Comment centraliser la gestion d'un port de plaisance tout en garantissant la cohérence des réservations, la protection des données et la fiabilité des opérations administratives ?",
    solution:
      "Développement d'une architecture modulaire associant une API Express, une base MongoDB et une interface d'administration. Les opérations sensibles sont protégées par un système d'authentification, tandis que des contrôles métier encadrent la gestion des emplacements et des réservations.",
    technicalPoints: [
      {
        title: "Authentification JWT avancée",
        description:
          "Gestion des Access Tokens et Refresh Tokens, avec renouvellement des sessions et protection des routes sensibles.",
      },
      {
        title: "Contrôle des disponibilités",
        description:
          "Vérification des emplacements et des périodes de réservation pour encadrer leur attribution.",
      },
      {
        title: "Opérations sensibles sécurisées",
        description:
          "Vérifications préalables aux suppressions multiples de catways et de réservations.",
      },
      {
        title: "Documentation & tests API",
        description:
          "Documentation OpenAPI 3 avec Swagger et collection Postman configurée pour les environnements de développement et de production.",
      },
    ],
    featuredTechnologies: [
      technologies.nodeJs,
      technologies.express,
      technologies.mongoDb,
      technologies.jwt,
    ],
    technologies: [
      technologies.nodeJs,
      technologies.express,
      technologies.mongoDb,
      technologies.mongoose,
      technologies.jwt,
      technologies.javascript,
      technologies.css,
      technologies.esLint,
      technologies.postman,
      technologies.render,
    ],
    illustration: apiRussellIllustration,
    links: [
      {
        label: "Voir le dépôt",
        icon: GithubLogoIcon,
        link: "https://github.com/pixseed/devoir-6-api-russell",
      },
      {
        label: "Voir la documentation",
        icon: BookOpenIcon,
        link: "https://kernec-cedric-devoir-6-api-russell.onrender.com/api-docs",
      },
    ],
  },
  {
    id: "project4",
    category: "backend",
    categoryLabel: "Base de données",
    title: "Tifosi",
    introduction:
      "Conception d'une base de données relationnelle MySQL pour organiser et exploiter les informations d'un restaurant spécialisé dans les focaccias.",
    description:
      "Réalisé dans le cadre de ma formation, ce projet consiste à concevoir la structure de données d'un restaurant fictif. Il couvre la gestion des produits, de leur composition, des menus et des achats clients. Des scripts SQL permettent de créer la base, d'y intégrer les données fournies et d'effectuer différentes recherches et analyses.",
    problematic:
      "Comment structurer des données interdépendantes afin de garantir leur cohérence et de permettre leur consultation sans duplication inutile des informations ?",
    solution:
      "Création d'un schéma relationnel MySQL organisé autour de tables principales et de tables de liaison. L'utilisation de contraintes d'intégrité et de scripts SQL permet de fiabiliser les relations, d'initialiser les données et de répondre aux besoins d'interrogation.",
    technicalPoints: [
      {
        title: "Modélisation des relations",
        description:
          "Création de 9 tables, dont 3 tables de liaison pour représenter les associations plusieurs-à-plusieurs.",
      },
      {
        title: "Intégrité référentielle",
        description:
          "Mise en place de clés primaires simples ou composites, de clés étrangères et de contraintes d'unicité.",
      },
      {
        title: "Requêtes SQL avancées",
        description:
          "Exploitation des données avec des jointures, agrégations, sous-requêtes et filtres conditionnels.",
      },
      {
        title: "Validation des résultats",
        description:
          "Documentation de 10 requêtes avec comparaison des résultats attendus et obtenus pour vérifier leur exactitude.",
      },
    ],
    featuredTechnologies: [technologies.sql, technologies.mySql],
    technologies: [technologies.sql, technologies.mySql],
    illustration: tifosiIllustration,
    links: [
      {
        label: "Voir le dépôt",
        icon: GithubLogoIcon,
        link: "https://github.com/pixseed/devoir-7-tifosi",
      },
    ],
  },
  {
    id: "project5",
    category: "frontend",
    categoryLabel: "Front-end",
    title: "Portfolio React",
    introduction:
      "Un portfolio professionnel multi-pages développé avec React, associant navigation dynamique, composants réutilisables et design responsive.",
    description:
      "Réalisé dans le cadre de ma formation, ce projet consiste à développer un site vitrine destiné à présenter le profil, les compétences, les services et les réalisations d'un développeur web. Il comprend cinq pages, un formulaire de contact et une modale interactive affichant des informations issues de GitHub. Une attention particulière a été portée à l'expérience utilisateur sur les différents formats d'écran.",
    problematic:
      "Comment concevoir un portfolio professionnel offrant une navigation fluide et une présentation claire des informations, tout en garantissant une expérience accessible sur mobile, tablette et ordinateur ?",
    solution:
      "Développement d'une application React structurée autour de composants modulaires et d'une navigation multi-pages avec React Router. L'utilisation de Bootstrap facilite l'adaptation responsive, tandis qu'un travail sur la structure HTML, les interactions et les métadonnées contribue à améliorer l'accessibilité et le référencement.",
    technicalPoints: [
      {
        title: "Architecture de composants",
        description:
          "Organisation de l'interface en composants réutilisables, avec centralisation des données pour faciliter la maintenance.",
      },
      {
        title: "Intégration de l'API GitHub",
        description:
          "Récupération et affichage dynamique des informations d'un profil GitHub dans une modale interactive.",
      },
      {
        title: "Accessibilité & référencement",
        description:
          "Utilisation d'une structure HTML sémantique, d'attributs ARIA et de métadonnées adaptées aux moteurs de recherche.",
      },
      {
        title: "Audits & conformité",
        description:
          "Validation W3C et audits Lighthouse, avec des scores de 100/100 sur les quatre critères en version desktop.",
      },
    ],
    featuredTechnologies: [
      technologies.react,
      technologies.reactRouter,
      technologies.vite,
      technologies.bootstrap,
    ],
    technologies: [
      technologies.react,
      technologies.reactRouter,
      technologies.vite,
      technologies.bootstrap,
      technologies.esLint,
      technologies.prettier,
      technologies.git,
      technologies.github,
      technologies.githubApi,
    ],
    illustration: porfolioReactIllustration,
    links: [
      {
        label: "Voir le dépôt",
        icon: GithubLogoIcon,
        link: "https://github.com/pixseed/devoir-5-portfolio-react",
      },
    ],
  },
  {
    id: "project6",
    category: "fullstack",
    categoryLabel: "Full-stack / PHP",
    title: "Touche pas au klaxon",
    introduction:
      "Une application de covoiturage interne développée en PHP pour faciliter l'organisation des déplacements professionnels entre plusieurs agences.",
    description:
      "Réalisée dans le cadre de ma formation, cette application permet aux collaborateurs d'une entreprise de consulter les trajets disponibles et de proposer leurs propres déplacements. Elle intègre différents espaces selon le rôle de l'utilisateur, ainsi qu'un tableau de bord administratif pour superviser les trajets, les agences et les comptes utilisateurs.",
    problematic:
      "Comment faciliter le partage des trajets professionnels entre plusieurs agences, tout en assurant une gestion adaptée aux différents profils d'utilisateurs ?",
    solution:
      "Développement d'une application PHP orientée objet suivant le modèle MVC, avec une base de données MySQL et un système d'authentification. La séparation des responsabilités et la gestion des droits d'accès permettent d'organiser les fonctionnalités selon les rôles des utilisateurs.",
    technicalPoints: [
      {
        title: "Architecture MVC & POO",
        description:
          "Séparation des modèles, vues et contrôleurs, avec des classes abstraites et un chargement automatique PSR-4.",
      },
      {
        title: "Gestion des rôles & permissions",
        description:
          "Contrôle des accès selon le profil utilisateur et restriction des modifications aux trajets autorisés.",
      },
      {
        title: "Tests automatisés & analyse statique",
        description:
          "Tests des modèles avec PHPUnit sur une base dédiée et vérification du code avec PHPStan.",
      },
      {
        title: "Initialisation & documentation",
        description:
          "Automatisation de la création des données de démonstration et génération de la documentation technique avec PHPDocumentor.",
      },
    ],
    featuredTechnologies: [
      technologies.php,
      technologies.mySql,
      technologies.bootstrap,
      technologies.phpUnit,
    ],
    technologies: [
      technologies.php,
      technologies.mySql,
      technologies.bootstrap,
      technologies.sass,
      technologies.composer,
      technologies.bukiRouter,
      technologies.dotenv,
      technologies.phpStan,
      technologies.phpUnit,
      technologies.phpDocumentor,
      technologies.npm,
    ],
    illustration: touchePasAuKlaxonIllustration,
    links: [
      {
        label: "Voir le dépôt",
        icon: GithubLogoIcon,
        link: "https://github.com/pixseed/kernec-cedric-devoir-10-mise-en-place-d-une-application-mvc-en-php",
      },
    ],
  },
];
