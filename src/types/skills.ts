import type { Icon } from "@phosphor-icons/react";
import type { Technology } from "./technology";

export type SkillCard = {
  icon: Icon;
  title: string;
  description: string;
  accent: "primary" | "secondary" | "accent";
};

export type SkillDomainId =
  | "frontend"
  | "backend"
  | "database"
  | "design"
  | "tools"
  | "deployment";

export type SkillDomain = {
  id: SkillDomainId;
  illustration: string;
  icon: Icon;
  title: string;

  /** Libellé introductif affiché au-dessus du titre du domaine. */
  label: string;

  description: string;
  technologies: Array<Technology>;
  cards: Array<SkillCard>;
};