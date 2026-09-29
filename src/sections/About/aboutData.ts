import type { Icon } from "@phosphor-icons/react";

import { CodeIcon, BrainIcon, RocketLaunchIcon } from "@phosphor-icons/react";

/*
 * Décrit les données nécessaires à l'affichage d'un axe
 * de la section À propos.
 */
type AxisItem = {
  id: string;
  number: string;
  icon: Icon;
  title: string;
  description: string;
};

/*
 * Source unique des axes présentés dans la section.
 *
 * Chaque entrée est transmise au composant `AboutAxis`
 * afin de générer les cartes sans dupliquer leur structure.
 */
export const axisItems: AxisItem[] = [
  {
    id: "quality",
    number: "01",
    icon: CodeIcon,
    title: "Rigueur & qualité",
    description:
      "Attentif aux détails, j'accorde de l'importance à un code clair, structuré et maintenable, ainsi qu'à une organisation rigoureuse du projet.",
  },
  {
    id: "learning",
    number: "02",
    icon: BrainIcon,
    title: "Comprendre & apprendre",
    description:
      "Curieux et toujours en quête d'apprentissage, j'aime comprendre le fonctionnement des outils que j'utilise plutôt que simplement appliquer une solution.",
  },
  {
    id: "building",
    number: "03",
    icon: RocketLaunchIcon,
    title: "Construire de A à Z",
    description:
      "J'apprécie suivre un projet dans son ensemble, de sa conception jusqu'à sa réalisation et son évolution.",
  },
];