import type { Icon } from "@phosphor-icons/react";
import type { Technology } from "./technology";

export type ProjectId =
  | "project1"
  | "project2"
  | "project3"
  | "project4"
  | "project5"
  | "project6";

export type ProjectCategory =
  | "conception"
  | "frontend"
  | "backend"
  | "fullstack";

export type ProjectImage = {
  src: string;
  alt: string;
};

type ProjectLink = {
  label: string;
  icon?: Icon;
  link: string;
};

export type ProjectTechnicalPoint = {
  title: string;
  description: string;
};

export type Project = {
  id: ProjectId;
  category: ProjectCategory;
  categoryLabel: string;
  title: string;

  /** Présentation courte utilisée dans les cartes de projet. */
  introduction: string;

  /** Présentation complète affichée dans la fiche détaillée. */
  description: string;

  problematic: string;
  solution: string;
  technicalPoints: Array<ProjectTechnicalPoint>;

  /** Technologies mises en avant dans les cartes de projet. */
  featuredTechnologies: Array<Technology>;

  /** Liste complète des technologies présentées dans la fiche détaillée. */
  technologies: Array<Technology>;

  /** Illustration principale. */
  illustration: ProjectImage;

  /** Illustrations complémentaires de la galerie. */
  images?: ProjectImage[];

  links: Array<ProjectLink>;
};
