import { useState } from "react";
import type { MouseEvent } from "react";
import { CaretLeftIcon, CaretRightIcon } from "@phosphor-icons/react";

import Card from "../../components/Cards/Cards";
import TechnologyBadge from "../../components/TechnologyBadge/TechnologyBadge";
import { skillDomains } from "../../data/skillsData";
import type { SkillDomainId } from "../../types/skills";
import useScrollEdges from "../../hooks/useScrollEdges";

import styles from "./skills.module.scss";

export default function Skills() {
  // ===============================================================
  // State
  // ===============================================================

  const [activeDomain, setActiveDomain] = useState<SkillDomainId>("frontend");
  const {
    scrollRef: domainNavRef,
    canScrollStart: canScrollLeft,
    canScrollEnd: canScrollRight,
  } = useScrollEdges<HTMLElement>("horizontal");

  // ===============================================================
  // Derived data
  // ===============================================================

  // Récupère les données correspondant au domaine actuellement sélectionné.
  const selectedDomain = skillDomains.find(
    (domain) => domain.id === activeDomain,
  );

  // ===============================================================
  // Helpers
  // ===============================================================

  /**
   * Fait défiler horizontalement la navigation des domaines.
   * La distance parcourue correspond à 60 % de sa largeur visible.
   */
  const scrollNavigation = (direction: "left" | "right") => {
    const nav = domainNavRef.current;

    if (!nav) return;

    const scrollDistance = nav.clientWidth * 0.6;

    nav.scrollBy({
      left: direction === "left" ? -scrollDistance : scrollDistance,
      behavior: "smooth",
    });
  };

  // ===============================================================
  // Handlers
  // ===============================================================

  /**
   * Active le domaine sélectionné et recentre son bouton
   * dans la navigation horizontale.
   */
  const handleDomainChange = (
    event: MouseEvent<HTMLButtonElement>,
    domainId: SkillDomainId,
  ) => {
    setActiveDomain(domainId);

    event.currentTarget.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  };

  // ===============================================================
  // Return
  // ===============================================================
  return (
    <section id="skills" className="page-section">
      <div className="container section-content">
        <h2 className="section-title">Compétences</h2>
        <div className={styles.skillsInterface}>
          {/* Navigation des domaines */}
          <div
            className={`
              ${styles.domainNavigationWrapper}
              ${canScrollLeft ? styles.showLeftFade : ""}
              ${canScrollRight ? styles.showRightFade : ""}
            `}
          >
            {canScrollLeft && (
              <button
                type="button"
                className={styles.scrollLeftButton}
                aria-label="Afficher les domaines précédents"
                onClick={() => scrollNavigation("left")}
              >
                <CaretLeftIcon />
              </button>
            )}
            <nav
              ref={domainNavRef}
              aria-label="Domaines de compétences"
              className={styles.domainNavigation}
            >
              {skillDomains.map((domain) => {
                const DomainIcon = domain.icon;

                return (
                  <button
                    key={domain.id}
                    type="button"
                    onClick={(event) => handleDomainChange(event, domain.id)}
                    className={activeDomain === domain.id ? styles.active : ""}
                    aria-pressed={activeDomain === domain.id}
                  >
                    <DomainIcon className={styles.domainIcon} />
                    <span>{domain.title}</span>
                  </button>
                );
              })}
            </nav>
            {canScrollRight && (
              <button
                type="button"
                className={styles.scrollRightButton}
                aria-label="Afficher les domaines suivants"
                onClick={() => scrollNavigation("right")}
              >
                <CaretRightIcon />
              </button>
            )}
          </div>

          {/* Contenu du domaine */}
          {selectedDomain && (
            <div
              className={`${styles.domainContent} ${styles[selectedDomain.id]}`}
            >
              <div className={styles.domainHeader}>
                <p className={styles.domainLabel}>{selectedDomain.label}</p>
                <h3>{selectedDomain.title}</h3>
                <p>{selectedDomain.description}</p>
              </div>

              <div className={styles.technologies}>
                {selectedDomain.technologies.map((technology) => (
                  <TechnologyBadge
                    key={technology.name}
                    technology={technology}
                  />
                ))}
              </div>

              <img
                src={selectedDomain.illustration}
                alt=""
                aria-hidden="true"
                className={styles.domainIllustration}
              />

              <div className={styles.cards}>
                {selectedDomain.cards.map((item) => (
                  <Card
                    key={item.title}
                    icon={item.icon}
                    title={item.title}
                    description={item.description}
                    variant="compact"
                    accent={item.accent}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
