import {
  ArrowLeftIcon,
  CaretLeftIcon,
  CaretRightIcon,
  SquaresFourIcon,
} from "@phosphor-icons/react";
import useEmblaCarousel from "embla-carousel-react";

import { useState, useEffect, useRef, useCallback } from "react";

import type { Project, ProjectCategory } from "../../types/projects";
import { projects } from "../../data/projectsData";
import ProjectCard from "./ProjectCard/ProjectCard";
import ActionButton from "../../components/ActionButton/ActionButton";

import styles from "./projects.module.scss";
import Modal from "../../components/Modal/Modal";
import ProjectDetails from "./ProjectDetails/ProjectDetails";
import ProjectsGallery from "./ProjectsGallery/ProjectsGallery";
import { getCircularIndex } from "../../utils/getCircularIndex";
import { useEmblaSelectedIndex } from "../../hooks/useEmblaSelectedIndex";

export default function Projects() {
  // ===============================================================
  // States
  // ===============================================================

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [galleryCategory, setGalleryCategory] =
    useState<ProjectCategory | null>(null);
  const [lastGalleryProjectId, setLastGalleryProjectId] = useState<
    string | null
  >(null);

  // ===============================================================
  // Refs
  // ===============================================================

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    containScroll: false,
  });

  const activeIndex = useEmblaSelectedIndex(emblaApi);

  const previousProjectButtonRef = useRef<HTMLButtonElement>(null);
  const nextProjectButtonRef = useRef<HTMLButtonElement>(null);

  // ===============================================================
  // Derived Data
  // ===============================================================

  const selectedProjectIndex = selectedProject
    ? projects.findIndex((project) => project.id === selectedProject.id)
    : -1;

  // ===============================================================
  // Handlers
  // ===============================================================

  function handleNext() {
    emblaApi?.scrollNext();
  }

  function handlePrevious() {
    emblaApi?.scrollPrev();
  }

  function goToProject(index: number) {
    emblaApi?.scrollTo(index);
  }

  /**
   * Ouvre les détails du projet sélectionné.
   * Mémorise son identifiant lorsque l'ouverture
   * provient de la galerie.
   */
  function handleOpenProject(project: Project) {
    if (isGalleryOpen) {
      setLastGalleryProjectId(project.id);
    }

    setSelectedProject(project);
  }

  function handleShowGallery() {
    setSelectedProject(null);
    setIsGalleryOpen(true);
  }

  function handleOpenGallery() {
    setGalleryCategory(null);
    setLastGalleryProjectId(null);
    setIsGalleryOpen(true);
  }

  function handleCloseModal() {
    setSelectedProject(null);
    setIsGalleryOpen(false);
    setGalleryCategory(null);
    setLastGalleryProjectId(null);
  }

  /**
   * Navigue entre les projets avec une boucle circulaire.
   *
   * @param direction
   * @returns
   */
  const handleNavigateProject = useCallback(
    (direction: -1 | 1) => {
      if (!selectedProject || projects.length === 0) return;

      const currentIndex = projects.findIndex(
        (project) => project.id === selectedProject.id,
      );

      if (currentIndex === -1) return;

      const nextIndex = getCircularIndex(
        currentIndex,
        direction,
        projects.length,
      );

      setSelectedProject(projects[nextIndex]);
    },
    [selectedProject],
  );

  // ===============================================================
  // Effects
  // ===============================================================

  /**
   * Permet de naviguer entre les projets
   * avec les flèches gauche et droite du clavier.
   */
  useEffect(() => {
    if (!selectedProject) return;

    function handleKeyDown(event: KeyboardEvent) {
      // La lightbox est prioritaire sur la navigation entre projets.
      if (document.querySelector("dialog[data-lightbox]:modal")) {
        return;
      }

      // Ne pas intercepter les raccourcis avec modificateurs.
      if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) {
        return;
      }

      // Ne pas intercepter la saisie dans un champ.
      const target = event.target;

      if (
        target instanceof HTMLElement &&
        (target.isContentEditable || target.matches("input, textarea, select"))
      ) {
        return;
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        previousProjectButtonRef.current?.focus({ preventScroll: true });
        handleNavigateProject(-1);
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        nextProjectButtonRef.current?.focus({ preventScroll: true });
        handleNavigateProject(1);
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedProject, handleNavigateProject]);

  // ===============================================================
  // Return
  // ===============================================================

  return (
    <section id="projects" className={`${styles.section} page-section`}>
      <div className="container section-content">
        <h2 className="section-title">Projets</h2>

        {/* En-tête */}
        <header className={styles.projectsHeader}>
          <h3 className={styles.projectsHeading}>Mes projets</h3>
          <p className={styles.projectsDescription}>
            Voici une sélection de projets que j'ai réalisés dans le cadre de ma
            formation. Chaque projet m'a permis de développer de nouvelles
            compétences et de relever des défis techniques et créatifs.
          </p>
          <ActionButton
            label="Voir tous les projets"
            variant="outlined"
            leftIcon={SquaresFourIcon}
            onClick={handleOpenGallery}
          />
        </header>

        {/* Bouton d'accès au projet précédent */}
        <div className={styles.carousel}>
          <div className={styles.carouselContent}>
            <button
              type="button"
              className={`${styles.carouselButton} ${styles.previousButton}`}
              aria-label="Projet précédent"
              onClick={handlePrevious}
            >
              <CaretLeftIcon />
            </button>

            {/* Carrousel des projets */}
            <div className={styles.carouselViewport} ref={emblaRef}>
              <div className={styles.projects}>
                {projects.map((project, index) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    isActive={index === activeIndex}
                    onSelect={() => goToProject(index)}
                    onOpen={() => handleOpenProject(project)}
                  />
                ))}
              </div>
            </div>

            {/* Bouton d'accès au projet suivant */}
            <button
              type="button"
              className={`${styles.carouselButton} ${styles.nextButton}`}
              aria-label="Projet suivant"
              onClick={handleNext}
            >
              <CaretRightIcon />
            </button>
          </div>

          {/* Indicateur de projet actif */}
          <div className={styles.carouselIndicators}>
            {projects.map((project, index) => (
              <button
                key={project.id}
                type="button"
                aria-label={`Afficher le projet ${index + 1}`}
                aria-current={index === activeIndex ? "true" : undefined}
                onClick={() => goToProject(index)}
                className={`${styles.indicator} ${index === activeIndex ? styles.active : ""}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Modale affichant les détails du projet sélectionné ou la galerie des projets */}
      <Modal
        isOpen={isGalleryOpen || selectedProject !== null}
        onClose={handleCloseModal}
        size="large"
        header={
          selectedProject ? (
            <div className={styles.modalNavigation}>
              <button
                type="button"
                className={styles.modalBackButton}
                onClick={handleShowGallery}
              >
                {isGalleryOpen ? (
                  <ArrowLeftIcon aria-hidden="true" />
                ) : (
                  <SquaresFourIcon aria-hidden="true" />
                )}

                <span
                  className={styles.modalBackLabel}
                  aria-label={
                    isGalleryOpen
                      ? "Retour aux projets"
                      : "Voir tous les projets"
                  }
                >
                  <span
                    className={styles.modalBackLabelMobile}
                    aria-hidden="true"
                  >
                    Retour
                  </span>
                  <span
                    className={styles.modalBackLabelDesktop}
                    aria-hidden="true"
                  >
                    {isGalleryOpen
                      ? "Retour aux projets"
                      : "Voir tous les projets"}
                  </span>
                </span>
              </button>

              <div className={styles.modalProjectNavigation}>
                <button
                  ref={previousProjectButtonRef}
                  type="button"
                  onClick={() => handleNavigateProject(-1)}
                  aria-label="Projet précédent"
                  className={styles.modalNavigationButton}
                >
                  <CaretLeftIcon aria-hidden="true" />
                  <span className={styles.modalProjectLabel} aria-hidden="true">
                    Projet précédent
                  </span>
                </button>

                <span className={styles.modalProjectCounter} aria-live="polite">
                  {selectedProjectIndex + 1} / {projects.length}
                </span>

                <button
                  ref={nextProjectButtonRef}
                  type="button"
                  onClick={() => handleNavigateProject(1)}
                  aria-label="Projet suivant"
                  className={styles.modalNavigationButton}
                >
                  <span className={styles.modalProjectLabel} aria-hidden="true">
                    Projet suivant
                  </span>
                  <CaretRightIcon aria-hidden="true" />
                </button>
              </div>
            </div>
          ) : null
        }
        scrollKey={selectedProject?.id ?? "gallery"}
        preserveScrollKey="gallery"
      >
        {selectedProject ? (
          <ProjectDetails project={selectedProject} />
        ) : (
          <ProjectsGallery
            projects={projects}
            onOpenProject={handleOpenProject}
            selectedCategory={galleryCategory}
            onCategoryChange={setGalleryCategory}
            focusProjectId={lastGalleryProjectId}
          />
        )}
      </Modal>
    </section>
  );
}
