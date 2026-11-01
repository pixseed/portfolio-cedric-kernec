import type { Icon } from "@phosphor-icons/react"
import type { Technology } from "./technology"

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

type ProjectLink = {
  label: string;
  icon?: Icon;
  link: string;
}

export type ProjectTechnicalPoint = {
  title: string;
  description: string;
}

export type Project = {
  id: ProjectId;
  category: ProjectCategory;
  categoryLabel: string;
  title: string;
  introduction: string;
  description: string;
  problematic: string;
  solution: string;
  technicalPoints: Array<ProjectTechnicalPoint>;
  featuredTechnologies: Array<Technology>;
  technologies: Array<Technology>;
  illustration: string;
  images?: string[];
  links: Array<ProjectLink>;
}