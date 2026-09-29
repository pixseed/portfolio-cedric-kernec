import { useState, useRef } from "react";
import type { MouseEvent, UIEvent } from "react";
import { CaretLeftIcon, CaretRightIcon } from "@phosphor-icons/react";

import Card from "../../components/Cards/Cards";
import TechnologyBadge from "./TechnologyBadge/TechnologyBadge";
import { skillDomains } from "./skillsData";
import type { SkillDomainId } from "../../types/skills";

import styles from "./skills.module.scss";

export default function Skills() {
  // ===============================================================
  // State
  // ===============================================================

  const [activeDomain, setActiveDomain] = useState<SkillDomainId>("frontend");
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // ===============================================================
  // Refs
  // ===============================================================

  const domainNavRef = useRef<HTMLElement>(null);

  // ===============================================================
  // Derived data
  // ===============================================================

  // Récupère les données correspondant au domaine actuellement sélectionné.
  const selectedDomain = skillDomains.find(
    (domain) => domain.id === activeDomain,
  );

  // ===============================================================
  // Navigation helpers
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
   * Met à jour l'état des contrôles de navigation selon
   * la position actuelle du défilement horizontal.
   */
  const handleNavigationScroll = (event: UIEvent<HTMLElement>) => {
    const nav = event.currentTarget;

    // Tolérance d'un pixel pour éviter les imprécisions liées au calcul du scroll.
    const scrollThreshold = 1;

    setCanScrollLeft(nav.scrollLeft > scrollThreshold);
    setCanScrollRight(
      nav.scrollLeft < nav.scrollWidth - nav.clientWidth - scrollThreshold,
    );
  };

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
              onScroll={handleNavigationScroll}
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
