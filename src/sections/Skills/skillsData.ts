import {
  siHtml5,
  siCss,
  siJavascript,
  siTypescript,
  siSass,
  siReact,
  siReactrouter,
  siBootstrap,
  siVite,
  siNodedotjs,
  siExpress,
  siPhp,
  siSequelize,
  siMysql,
  siMongodb,
  siFigma,
  siGit,
  siGithub,
  siNpm,
  siPostman,
  siEslint,
  siPrettier,
  siNetlify,
  siRender,
  siRailway,
} from "simple-icons";

import {
  ArrowsLeftRightIcon,
  BoundingBoxIcon,
  BracketsCurlyIcon,
  BugIcon,
  CodeIcon,
  DatabaseIcon,
  GitBranchIcon,
  LayoutIcon,
  MonitorIcon,
  PaletteIcon,
  PenNibIcon,
  RocketLaunchIcon,
  SealCheckIcon,
  ShareNetworkIcon,
  ShieldCheckIcon,
  SlidersHorizontalIcon,
  TreeStructureIcon,
  UserFocusIcon,
  WrenchIcon,
} from "@phosphor-icons/react";

import type { SkillDomain } from "../../types/skills";

import frontendIllustration from "../../assets/images/skills/frontend-illustration.png";
import backendIllustration from "../../assets/images/skills/backend-illustration.png";
import databaseIllustration from "../../assets/images/skills/database-illustration.png";
import designIllustration from "../../assets/images/skills/design-illustration.png";
import toolsIllustration from "../../assets/images/skills/tools-illustration.png";
import deploymentIllustration from "../../assets/images/skills/deployment-illustration.png";

export const skillDomains: Array<SkillDomain> = [
  // Front-end
  {
    id: "frontend",
    icon: CodeIcon,
    title: "Front-end",
    label: "Développement front-end",
    description:
      "Je conçois des interfaces responsives et interactives, centrées sur l'expérience utilisateur, en portant une attention particulière au balisage sémantique et à l'accessibilité. Je privilégie une approche organisée et structurée afin de produire un code lisible, compréhensible et maintenable.",
    illustration: frontendIllustration,
    technologies: [
      {
        name: "HTML",
        icon: siHtml5,
        link: "https://developer.mozilla.org/fr/docs/Web/HTML",
      },
      {
        name: "CSS",
        icon: siCss,
        link: "https://developer.mozilla.org/fr/docs/Web/CSS",
      },
      {
        name: "JavaScript",
        icon: siJavascript,
        link: "https://developer.mozilla.org/fr/docs/Web/JavaScript",
      },
      {
        name: "TypeScript",
        icon: siTypescript,
        link: "https://www.typescriptlang.org/",
      },
      {
        name: "Sass",
        icon: siSass,
        link: "https://sass-lang.com/",
      },
      {
        name: "React",
        icon: siReact,
        link: "https://react.dev/",
      },
      {
        name: "React Router",
        icon: siReactrouter,
        link: "https://reactrouter.com/",
      },
      {
        name: "Bootstrap",
        icon: siBootstrap,
        link: "https://getbootstrap.com/",
      },
      {
        name: "Vite",
        icon: siVite,
        link: "https://vite.dev/",
      },
    ],
    cards: [
      {
        icon: MonitorIcon,
        title: "Interfaces modernes",
        description: "Développement d'interfaces réactives et accessibles.",
      },
      {
        icon: BoundingBoxIcon,
        title: "Intégration responsive",
        description: "Adaptation sur tous les écrans.",
      },
      {
        icon: LayoutIcon,
        title: "Expérience utilisateur",
        description: "Une attention particulière au design et à l'ergonomie.",
      },
    ],
  },

  // Back-end
  {
    id: "backend",
    icon: BracketsCurlyIcon,
    title: "Back-end",
    label: "Développement back-end",
    description:
      "Je développe la logique côté serveur et des API permettant de traiter, valider et échanger les données entre l'application et la base de données. J'accorde également une attention particulière à la gestion des erreurs et à la sécurisation des échanges et des accès.",
    illustration: backendIllustration,
    technologies: [
      {
        name: "Node.js",
        icon: siNodedotjs,
        link: "https://nodejs.org/",
      },
      {
        name: "Express",
        icon: siExpress,
        link: "https://expressjs.com/",
      },
      {
        name: "PHP",
        icon: siPhp,
        link: "https://www.php.net/",
      },
      {
        name: "Sequelize",
        icon: siSequelize,
        link: "https://sequelize.org/",
      },
    ],
    cards: [
      {
        icon: BracketsCurlyIcon,
        title: "API & logique serveur",
        description:
          "Création de routes, traitements métier et échanges de données.",
      },
      {
        icon: ShieldCheckIcon,
        title: "Sécurité & authentification",
        description:
          "Validation des données, protection des API et authentification JWT.",
      },
      {
        icon: DatabaseIcon,
        title: "Accès aux données",
        description:
          "Connexion, manipulation et persistance des données côté serveur.",
      },
    ],
  },

  // Base de données
  {
    id: "database",
    icon: DatabaseIcon,
    title: "Bases de données",
    label: "Gestion des données",
    description:
      "Je conçois et structure des bases de données relationnelles et non relationnelles, de la modélisation des données jusqu'à leur intégration avec le back-end. Je réalise des requêtes SQL et manipule les données en veillant à organiser de manière cohérente leurs relations et leur structure.",
    illustration: databaseIllustration,
    technologies: [
      {
        name: "SQL",
        link: "https://developer.mozilla.org/fr/docs/Glossary/SQL",
      },
      {
        name: "MySQL",
        icon: siMysql,
        link: "https://www.mysql.com/",
      },
      {
        name: "MongoDB",
        icon: siMongodb,
        link: "https://www.mongodb.com/",
      },
    ],
    cards: [
      {
        icon: TreeStructureIcon,
        title: "Modélisation des données",
        description:
          "Organisation et structuration des données selon les besoins de l'application.",
      },
      {
        icon: ArrowsLeftRightIcon,
        title: "Requêtes & manipulation",
        description: "Lecture, ajout, modification et suppression des données.",
      },
      {
        icon: DatabaseIcon,
        title: "SQL & NoSQL",
        description:
          "Utilisation de bases relationnelles et documentaires (NoSQL) selon le projet.",
      },
    ],
  },

  // Design & UI/UX
  {
    id: "design",
    icon: PenNibIcon,
    title: "Design & UI/UX",
    label: "Conception & design",
    description:
      "J'analyse les besoins et les contraintes d'un cahier des charges afin de concevoir des interfaces adaptées, du wireframe jusqu'à la maquette graphique et au prototype interactif. Mon expérience en design graphique me permet également de travailler sur l'identité visuelle, la colorimétrie, la typographie et la création de supports destinés au web comme au print.",
    illustration: designIllustration,
    technologies: [
      {
        name: "Figma",
        icon: siFigma,
        link: "https://www.figma.com/",
      },
      {
        name: "Adobe Photoshop",
        iconLabel: "Ps",
        color: "31A8FF",
        link: "https://www.adobe.com/fr/products/photoshop",
      },
      {
        name: "Adobe Illustrator",
        iconLabel: "Ai",
        color: "FF9A00",
        link: "https://www.adobe.com/fr/products/illustrator",
      },
      {
        name: "Adobe InDesign",
        iconLabel: "Id",
        color: "FF3366",
        link: "https://www.adobe.com/fr/products/indesign",
      },
      {
        name: "Canva",
        link: "https://www.canva.com/",
      },
    ],
    cards: [
      {
        icon: PenNibIcon,
        title: "Conception d'interfaces",
        description:
          "Création de maquettes et d'interfaces cohérentes adaptées aux besoins du projet.",
      },
      {
        icon: UserFocusIcon,
        title: "Expérience utilisateur",
        description:
          "Attention portée à la lisibilité, à l'ergonomie et au parcours utilisateur.",
      },
      {
        icon: PaletteIcon,
        title: "Identité visuelle",
        description:
          "Création et déclinaison d'univers graphiques cohérents sur différents supports.",
      },
    ],
  },

  // Outils & qualité
  {
    id: "tools",
    icon: WrenchIcon,
    title: "Outils & qualité",
    label: "Qualité & environnement",
    description:
      "J'utilise le versionnement et différents outils de contrôle pour travailler de manière structurée et maintenir un code lisible et cohérent. Je teste et analyse mes réalisations afin d'identifier les erreurs, vérifier leur conformité et améliorer leur qualité.",
    illustration: toolsIllustration,
    technologies: [
      {
        name: "Git",
        icon: siGit,
        link: "https://git-scm.com/",
      },
      {
        name: "GitHub",
        icon: siGithub,
        link: "https://github.com/",
      },
      {
        name: "npm",
        icon: siNpm,
        link: "https://www.npmjs.com/",
      },
      {
        name: "Postman",
        icon: siPostman,
        link: "https://www.postman.com/",
      },
      {
        name: "ESLint",
        icon: siEslint,
        link: "https://eslint.org/",
      },
      {
        name: "Prettier",
        icon: siPrettier,
        link: "https://prettier.io/",
      },
    ],
    cards: [
      {
        icon: GitBranchIcon,
        title: "Versioning & collaboration",
        description:
          "Organisation du développement avec Git, branches, commits et pull requests.",
      },
      {
        icon: SealCheckIcon,
        title: "Qualité du code",
        description:
          "Utilisation d'outils d'analyse, de formatage et de tests pour fiabiliser le code.",
      },
      {
        icon: BugIcon,
        title: "Tests & débogage",
        description:
          "Vérification du comportement des applications et identification des erreurs.",
      },
    ],
  },

  // Déploiement
  {
    id: "deployment",
    icon: RocketLaunchIcon,
    title: "Déploiement",
    label: "Mise en production",
    description:
      "Je déploie des applications web en configurant les différents services nécessaires à leur mise en ligne. Je sais déployer séparément le front-end, le back-end et la base de données, puis configurer leur communication afin de rendre l'application fonctionnelle en production.",
    illustration: deploymentIllustration,
    technologies: [
      {
        name: "Netlify",
        icon: siNetlify,
        link: "https://www.netlify.com/",
      },
      {
        name: "Render",
        icon: siRender,
        link: "https://render.com/",
      },
      {
        name: "Railway",
        icon: siRailway,
        link: "https://railway.com/",
      },
    ],
    cards: [
      {
        icon: RocketLaunchIcon,
        title: "Mise en production",
        description:
          "Déploiement d'applications web et configuration des services d'hébergement.",
      },
      {
        icon: SlidersHorizontalIcon,
        title: "Configuration & environnement",
        description:
          "Gestion des variables d'environnement et configuration des services déployés.",
      },
      {
        icon: ShareNetworkIcon,
        title: "Services connectés",
        description:
          "Déploiement séparé du front-end, de l'API et de la base de données.",
      },
    ],
  },
];
