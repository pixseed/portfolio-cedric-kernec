import type { Icon } from "@phosphor-icons/react";
import type { SimpleIcon } from "simple-icons";

export type Technology = {
  name: string;
  icon?: SimpleIcon;
  iconLabel?: string;
  color?: string;
  link: string;
};

export type SkillCard = {
  icon: Icon;
  title: string;
  description: string;
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
  label: string;
  description: string;

  technologies: Array<Technology>;
  cards: Array<SkillCard>;
};