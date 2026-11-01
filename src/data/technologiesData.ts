import {
  siBootstrap,
  siComposer,
  siCss,
  siDotenv,
  siEslint,
  siExpress,
  siFigma,
  siGit,
  siGithub,
  siHtml5,
  siJavascript,
  siJsonwebtokens,
  siMarkdown,
  siMongodb,
  siMongoose,
  siMysql,
  siNetlify,
  siNodedotjs,
  siNpm,
  siOpenapiinitiative,
  siPhp,
  siPostman,
  siPrettier,
  siRailway,
  siReact,
  siReactrouter,
  siRender,
  siSass,
  siSequelize,
  siSwagger,
  siTypescript,
  siVite,
} from "simple-icons";

import type { Technology } from "../types/technology";

// Vérifie le type des technologies tout en conservant les clés précises de l'objet
export const technologies = {
  bootstrap: {
    name: "Bootstrap",
    icon: siBootstrap,
    link: "https://getbootstrap.com/",
  },

  bukiRouter: {
    name: "Buki Router",
    iconLabel: "BR",
    link: "https://github.com/izniburak/php-router",
  },

  canva: {
    name: "Canva",
    link: "https://www.canva.com/",
  },

  composer: {
    name: "Composer",
    icon: siComposer,
    link: "https://getcomposer.org/",
  },

  css: {
    name: "CSS",
    icon: siCss,
    link: "https://developer.mozilla.org/fr/docs/Web/CSS",
  },

  dotenv: {
    name: "Dotenv",
    icon: siDotenv,
    link: "https://github.com/vlucas/phpdotenv",
  },

  esLint: {
    name: "ESLint",
    icon: siEslint,
    link: "https://eslint.org/",
  },

  express: {
    name: "Express",
    icon: siExpress,
    link: "https://expressjs.com/",
  },

  figma: {
    name: "Figma",
    icon: siFigma,
    link: "https://www.figma.com/",
  },

  git: {
    name: "Git",
    icon: siGit,
    link: "https://git-scm.com/",
  },

  github: {
    name: "GitHub",
    icon: siGithub,
    link: "https://github.com/",
  },

  githubApi: {
    name: "GitHub API",
    icon: siGithub,
    link: "https://docs.github.com/en/rest",
  },

  html: {
    name: "HTML",
    icon: siHtml5,
    link: "https://developer.mozilla.org/fr/docs/Web/HTML",
  },

  illustrator: {
    name: "Adobe Illustrator",
    iconLabel: "Ai",
    color: "FF9A00",
    link: "https://www.adobe.com/fr/products/illustrator",
  },

  inDesign: {
    name: "Adobe InDesign",
    iconLabel: "Id",
    color: "FF3366",
    link: "https://www.adobe.com/fr/products/indesign",
  },

  javascript: {
    name: "JavaScript",
    icon: siJavascript,
    link: "https://developer.mozilla.org/fr/docs/Web/JavaScript",
  },

  jwt: {
    name: "JWT",
    icon: siJsonwebtokens,
    link: "https://www.jwt.io/",
  },

  markdown: {
    name: "Markdown",
    icon: siMarkdown,
    link: "https://markdown.org/",
  },

  mongoDb: {
    name: "MongoDB",
    icon: siMongodb,
    link: "https://www.mongodb.com/",
  },

  mongoose: {
    name: "Mongoose",
    icon: siMongoose,
    link: "https://mongoosejs.com/",
  },

  mySql: {
    name: "MySQL",
    icon: siMysql,
    displayColor: "66ADE7",
    link: "https://www.mysql.com/",
  },

  netlify: {
    name: "Netlify",
    icon: siNetlify,
    link: "https://www.netlify.com/",
  },

  nodeJs: {
    name: "Node.js",
    icon: siNodedotjs,
    link: "https://nodejs.org/",
  },

  npm: {
    name: "npm",
    icon: siNpm,
    link: "https://www.npmjs.com/",
  },

  openApi: {
    name: "OpenAPI",
    icon: siOpenapiinitiative,
    link: "https://www.openapis.org/",
  },

  photoshop: {
    name: "Adobe Photoshop",
    iconLabel: "Ps",
    color: "31A8FF",
    link: "https://www.adobe.com/fr/products/photoshop",
  },

  php: {
    name: "PHP",
    icon: siPhp,
    link: "https://www.php.net/",
  },

  phpDocumentor: {
    name: "phpDocumentor",
    iconLabel: "PD",
    link: "https://www.phpdoc.org/",
  },

  phpStan: {
    name: "PHPStan",
    iconLabel: "STAN",
    link: "https://phpstan.org/",
  },

  phpUnit: {
    name: "PHPUnit",
    iconLabel: "UNIT",
    link: "https://phpunit.de/",
  },

  postman: {
    name: "Postman",
    icon: siPostman,
    link: "https://www.postman.com/",
  },

  prettier: {
    name: "Prettier",
    icon: siPrettier,
    link: "https://prettier.io/",
  },

  railway: {
    name: "Railway",
    icon: siRailway,
    link: "https://railway.com/",
  },

  react: {
    name: "React",
    icon: siReact,
    link: "https://react.dev/",
  },

  reactRouter: {
    name: "React Router",
    icon: siReactrouter,
    link: "https://reactrouter.com/",
  },

  render: {
    name: "Render",
    icon: siRender,
    link: "https://render.com/",
  },

  sass: {
    name: "Sass",
    icon: siSass,
    link: "https://sass-lang.com/",
  },

  sequelize: {
    name: "Sequelize",
    icon: siSequelize,
    link: "https://sequelize.org/",
  },

  sql: {
    name: "SQL",
    link: "https://developer.mozilla.org/fr/docs/Glossary/SQL",
  },

  swagger: {
    name: "Swagger",
    icon: siSwagger,
    link: "https://swagger.io/",
  },

  typescript: {
    name: "TypeScript",
    icon: siTypescript,
    link: "https://www.typescriptlang.org/",
  },

  vite: {
    name: "Vite",
    icon: siVite,
    link: "https://vite.dev/",
  },
} satisfies Record<string, Technology>;