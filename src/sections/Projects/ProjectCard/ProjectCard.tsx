import { ArrowsOutSimpleIcon } from "@phosphor-icons/react";

import ActionButton from "../../../components/ActionButton/ActionButton";
import type { Project } from "../../../types/projects";
import useScrollEdges from "../../../hooks/useScrollEdges";

import styles from "./projectCard.module.scss";
import ProjectTechnologies from "./ProjectTechnologies/ProjectTechnologies";

type BaseProjectCardProps = {
  project: Project;
  onOpen: () => void;
};

type ProjectCardProps = BaseProjectCardProps &
  (
    | {
        variant?: "carousel";
        isActive: boolean;
        onSelect: () => void;
      }
    | {
        variant: "gallery";
        isActive?: never;
        onSelect?: never;
      }
  );

export default function ProjectCard(props: ProjectCardProps) {
  // ===============================================================
  // Derived data
  // ===============================================================
  const { project, onOpen } = props;
  const isCarousel = props.variant !== "gallery";
  const isActive = isCarousel ? props.isActive : false;

  const {
    scrollRef: introductionRef,
    canScrollStart: canScrollTop,
    canScrollEnd: canScrollBottom,
  } = useScrollEdges<HTMLParagraphElement>("vertical", {
    enabled: isCarousel,
  });

  // ===============================================================
  // Handles
  // ===============================================================

  function handleCardClick() {
    if (props.variant !== "gallery" && !props.isActive) {
      props.onSelect();
    }
  }

  // ===============================================================
  // Return
  // ===============================================================

  return (
    <article
      data-project-id={props.variant === "gallery" ? project.id : undefined}
      className={`${styles.projectCard} ${isCarousel ? styles.carousel : styles.gallery}`}
      onClick={handleCardClick}
    >
      <div
        className={`${styles.projectCardInner} ${isActive ? styles.active : ""}`}
        style={isCarousel ? { anchorName: `--card-${project.id}` } : undefined}
      >
        <div className={styles.projectIllustration}>
          <img
            src={project.illustration.src}
            alt={project.illustration.alt}
          />
        </div>

        <div className={styles.projectContent}>
          <span className={styles.projectCategory}>
            {project.categoryLabel}
          </span>
          <h3 className={styles.projectTitle}>{project.title}</h3>
          <div
            className={`
            ${styles.projectIntroductionWrapper}
            ${isCarousel && canScrollTop ? styles.showTopFade : ""}
            ${isCarousel && canScrollBottom ? styles.showBottomFade : ""}
          `}
          >
            <p ref={introductionRef} className={styles.projectIntroduction}>
              {project.introduction}
            </p>
          </div>

          {isCarousel && (
            <ProjectTechnologies
              projectId={project.id}
              technologies={project.technologies}
              featuredTechnologies={project.featuredTechnologies}
              isActive={isActive}
            />
          )}

          <div className={styles.projectAction} data-project-action>
            <ActionButton
              label="En savoir plus"
              ariaLabel={`En savoir plus sur ${project.title}`}
              rightIcon={ArrowsOutSimpleIcon}
              variant={!isCarousel || isActive ? "filled" : "muted"}
              onClick={onOpen}
            />
          </div>
        </div>
      </div>
    </article>
  );
}
