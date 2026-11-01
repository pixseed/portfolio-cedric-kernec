import type { Project } from "../../../types/projects";
import TechnologyBadge from "../../../components/TechnologyBadge/TechnologyBadge";
import ActionLink from "../../../components/ActionLink/ActionLink";
import Card from "../../../components/Cards/Cards";
import ProjectImageGallery from "./ProjectImageGallery/ProjectImageGallery";

import {
  WarningCircleIcon,
  LightbulbIcon,
  CheckCircleIcon,
  SealCheckIcon,
  CodeIcon,
} from "@phosphor-icons/react";

import styles from "./projectDetails.module.scss";

type ProjectDetailsProps = {
  project: Project;
};

export default function ProjectDetails({ project }: ProjectDetailsProps) {
  return (
    <article className={styles.projectDetails}>
      <div className={styles.projectLayout}>
        {/* Colonne de présentation */}
        <div className={styles.projectOverview}>
          {/* Galerie d'images du projet */}
          <ProjectImageGallery key={project.id} project={project} />

          {/* Présentation du projet */}
          <div className={styles.projectInformations}>
            <span className={styles.projectCategory}>{project.category}</span>
            <h3 className={styles.projectTitle}>{project.title}</h3>
            <p className={styles.projectDescription}>{project.description}</p>
          </div>

          {/* Liens du projet */}
          <div className={styles.projectLinks}>
            {project.links.map((link) => (
              <ActionLink
                key={link.link}
                label={link.label}
                icon={link.icon}
                href={link.link}
                variant="neutral"
                external
                showExternalIcon
              />
            ))}
          </div>

          {/* Technologies utilisées dans le projet */}
          <div className={styles.projectTechnologies}>
            <div className={styles.cardHeader}>
              <h4 className={styles.sectionTitle}>
                <CodeIcon />
                Technologies utilisées
              </h4>
            </div>
            <div className={`${styles.technologyList} ${styles.cardBody}`}>
              {project.technologies.map((technology) => (
                <TechnologyBadge
                  key={technology.name}
                  technology={technology}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Colonne technique */}
        <div className={styles.projectTechnical}>
          {/* Challenge : Problématique → Solution */}
          <div className={styles.projectChallenge}>
            <Card
              icon={WarningCircleIcon}
              title="Problématique"
              description={project.problematic}
              variant="compact"
              iconPosition="inline"
              accent="primary"
            />

            <Card
              icon={LightbulbIcon}
              title="Solution"
              description={project.solution}
              variant="compact"
              iconPosition="inline"
              accent="accent"
            />
          </div>

          {/* Points techniques clés du projet */}
          <div className={styles.projectTechnicalPoints}>
            <div className={styles.cardHeader}>
              <h4 className={styles.sectionTitle}>
                <SealCheckIcon />
                Points techniques clés
              </h4>
            </div>
            <div className={styles.cardBody}>
              {project.technicalPoints.map((point) => (
                <div className={styles.technicalPoint} key={point.title}>
                  <CheckCircleIcon weight="fill" aria-hidden="true" />
                  <div className={styles.technicalPointContent}>
                    <h5 className={styles.technicalPointTitle}>
                      {point.title}
                    </h5>
                    <p className={styles.technicalPointDescription}>
                      {point.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
