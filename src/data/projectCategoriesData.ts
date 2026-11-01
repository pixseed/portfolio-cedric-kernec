import { CodeIcon, DatabaseIcon, PenNibIcon, StackIcon, type Icon } from "@phosphor-icons/react";
import type { ProjectCategory } from "../types/projects";

export const projectCategories = [
  { id: "conception", label: "Conception", icon: PenNibIcon, color: "#EC4899" },
  { id: "frontend", label: "Front-end", icon: CodeIcon, color: "#22D3EE" },
  { id: "backend", label: "Back-end & données", icon: DatabaseIcon, color: "#F59E0B" },
  { id: "fullstack", label: "Full-stack", icon: StackIcon, color: "#22C55E" },
] satisfies Array<{
  id: ProjectCategory;
  label: string;
  icon: Icon;
  color: string;
}>;
