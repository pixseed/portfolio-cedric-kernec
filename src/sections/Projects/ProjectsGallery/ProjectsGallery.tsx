import { useLayoutEffect, useRef } from "react";
import type { Project, ProjectCategory } from "../../../types/projects";
import ProjectCard from "../ProjectCard/ProjectCard";
import { projectCategories } from "../../../data/projectCategoriesData";
import Dropdown from "../../../components/Dropdown/Dropdown";

import styles from "./projectsGallery.module.scss";
import { SquaresFourIcon } from "@phosphor-icons/react";

type ProjectsGalleryProps = {
  projects: Project[];
  onOpenProject: (project: Project) => void;
  selectedCategory: ProjectCategory | null;
  onCategoryChange: (category: ProjectCategory | null) => void;
  focusProjectId: string | null;
};

export default function ProjectsGallery({
  projects,
  onOpenProject,
  selectedCategory,
  onCategoryChange,
  focusProjectId,
}: ProjectsGalleryProps) {
  // ===============================================================
  // Ref
  // ===============================================================

  const galleryGridRef = useRef<HTMLDivElement>(null);

  // ===============================================================
  // Derived data
  // ===============================================================

  /**
   * Filtre les projets selon la catégorie sélectionnée.
   * Retourne tous les projets si aucune catégorie n'est sélectionnée.
   */
  const filteredProjects = projects.filter((project) => {
    return selectedCategory === null || selectedCategory === project.category;
  });

  /**
   * Calcule le nombre de projets par catégorie en un seul parcours.
   * Chaque catégorie est initialisée à zéro avant le comptage.
   */
  const categoryCounts = projects.reduce(
    (counts, project) => {
      counts[project.category]++;
      return counts;
    },
    {
      conception: 0,
      frontend: 0,
      backend: 0,
      fullstack: 0,
    } satisfies Record<ProjectCategory, number>,
  );

  /**
   * Transforme les catégories en options pour le dropdown.
   * Ajoute le nombre de projets correspondant à chaque catégorie.
   */
  const dropdownOptions = projectCategories.map((category) => {
    return {
      value: category.id,
      label: `${category.label} (${categoryCounts[category.id]})`,
      icon: category.icon,
      color: category.color,
    };
  });

  /**
   * Ajoute l'option permettant d'afficher tous les projets
   * aux options de catégories précédemment construites.
   */
  const allDropdownOptions = [
    {
      value: "all",
      label: `Tous les projets (${projects.length})`,
      icon: SquaresFourIcon,
    },
    ...dropdownOptions,
  ];

  // ===============================================================
  // Handlers
  // ===============================================================

  /**
   * Met à jour la catégorie sélectionnée depuis le menu déroulant.
   * La valeur "all" réinitialise le filtre pour afficher tous les projets.
   */
  function handleCategoryChange(value: string) {
    onCategoryChange(value === "all" ? null : (value as ProjectCategory));
  }

  // ===============================================================
  // Effects
  // ===============================================================

  /**
   * Restaure le focus sur le bouton du dernier projet consulté
   * lorsque l'utilisateur revient dans la galerie.
   */
  useLayoutEffect(() => {
    if (!focusProjectId) return;

    const grid = galleryGridRef.current;
    if (!grid) return;

    const projectCard = Array.from(
      grid.querySelectorAll<HTMLElement>("[data-project-id]"),
    ).find((card) => card.dataset.projectId === focusProjectId);

    const button = projectCard?.querySelector<HTMLButtonElement>("button");

    button?.focus({ preventScroll: true });
  }, [focusProjectId]);

  // ===============================================================
  // Return
  // ===============================================================

  return (
    <div className={styles.gallery}>
      {/* En-tête */}
      <div className={styles.galleryHeader}>
        <h2>Tous mes projets</h2>
      </div>

      {/* Filtre de la galerie */}
      <div className={styles.galleryFilter}>
        {/* Filtre du mode mobile */}
        <div className={styles.mobileFilter}>
          <Dropdown
            options={allDropdownOptions}
            value={selectedCategory ?? "all"}
            onChange={handleCategoryChange}
            label="Filtrer par catégorie"
          />
        </div>

        {/* Filtre du mode desktop */}
        <div className={styles.desktopFilter}>
          <button
            type="button"
            onClick={() => onCategoryChange(null)}
            aria-pressed={selectedCategory === null}
            className={styles.filterButton}
          >
            Tous ({projects.length})
          </button>
          {projectCategories.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => onCategoryChange(category.id)}
              aria-pressed={selectedCategory === category.id}
              className={styles.filterButton}
            >
              {category.label} ({categoryCounts[category.id]})
            </button>
          ))}
        </div>
      </div>

      {/* Galerie : Grille de projets */}
      <div ref={galleryGridRef} className={styles.galleryGrid}>
        {filteredProjects.map((project) => (
          <ProjectCard
            key={project.id}
            variant="gallery"
            project={project}
            onOpen={() => onOpenProject(project)}
          />
        ))}
      </div>
    </div>
  );
}
