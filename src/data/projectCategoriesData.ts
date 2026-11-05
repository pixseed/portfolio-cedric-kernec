import {
  CodeIcon,
  DatabaseIcon,
  PenNibIcon,
  StackIcon,
  type Icon,
} from "@phosphor-icons/react";

import type { ProjectCategory } from "../types/projects";

type ProjectCategoryData = {
  label: string;
  icon: Icon;
  color: string;
};

/**
 * Configuration visuelle des catégories de projets.
 *
 * Record garantit que chaque catégorie définie dans ProjectCategory
 * possède une configuration, sans autoriser de catégorie inconnue.
 */
export const projectCategories = {
  conception: {
    label: "Conception",
    icon: PenNibIcon,
    color: "#EC4899",
  },
  frontend: {
    label: "Front-end",
    icon: CodeIcon,
    color: "#22D3EE",
  },
  backend: {
    label: "Back-end & données",
    icon: DatabaseIcon,
    color: "#F59E0B",
  },
  fullstack: {
    label: "Full-stack",
    icon: StackIcon,
    color: "#22C55E",
  },
} satisfies Record<ProjectCategory, ProjectCategoryData>;
