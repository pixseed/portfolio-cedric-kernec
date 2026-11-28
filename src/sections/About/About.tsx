import { useState } from "react";
import { CaretLeftIcon, CaretRightIcon } from "@phosphor-icons/react";

import useSwipeNavigation from "../../hooks/useSwipeNavigation";

import ActionButton from "../../components/ActionButton/ActionButton";
import Card from "../../components/Cards/Cards";

import { axisItems } from "../../data/aboutData";

import styles from "./about.module.scss";

export default function About() {
  // ===============================================================
  // States
  // ===============================================================

  const [activeIndex, setActiveIndex] = useState(0);

  // ===============================================================
  // Derived data
  // ===============================================================

  // Retrouve la carte précédente, y compris lorsque la première est active.
  const previousIndex = (activeIndex - 1 + axisItems.length) % axisItems.length;

  // ===============================================================
  // Handlers
  // ===============================================================

  function handlePrevious() {
    setActiveIndex(
      (index) => (index - 1 + axisItems.length) % axisItems.length,
    );
  }

  function handleNext() {
    setActiveIndex((index) => (index + 1) % axisItems.length);
  }

  // Associe les balayages aux mêmes actions que les boutons du carrousel.
  const swipeHandlers = useSwipeNavigation({
    onPrevious: handlePrevious,
    onNext: handleNext,
  });

  // ===============================================================
  // Return
  // ===============================================================

  return (
    <section id="about" className={styles.section}>
      <div className="container section-content">
        <h2 className="visually-hidden">À propos</h2>
        <div className={styles.content}>
          {/* Introduction */}
          <div className={styles.introduction} data-intro-layer="about-content">
            <div className={styles.introContent}>
              <h3 className={styles.subtitle}>
                Mon approche en <span className="gradient-text">3 axes</span>
              </h3>
              <div className={styles.description}>
                <p>
                  Je m'oriente vers un profil full-stack, attiré par la
                  diversité du développement et la possibilité de concevoir un
                  projet dans son ensemble.
                </p>
                <p>
                  J'accorde également une attention particulière au front-end et
                  à l'UX/UI, où la technique rencontre directement l'expérience
                  utilisateur.
                </p>
              </div>
            </div>
          </div>

          {/* Axes */}
          <div
            className={styles.axes}
            data-intro-layer="about-axes"
            role="region"
            aria-roledescription="carrousel"
            aria-label="Les trois axes de mon approche"
          >
            <div className={styles.carouselViewport} {...swipeHandlers}>
              <div className={styles.carouselTrack}>
                {axisItems.map((item, index) => (
                  <div
                    key={item.id}
                    className={styles.carouselSlide}
                    aria-hidden={index !== activeIndex}
                    data-position={
                      index === activeIndex
                        ? "active"
                        : index === previousIndex
                          ? "previous"
                          : "next"
                    }
                  >
                    <Card
                      icon={item.icon}
                      number={item.number}
                      title={item.title}
                      description={item.description}
                      accent={item.accent}
                      headingLevel={3}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.carouselControls}>
              <ActionButton
                label=""
                ariaLabel="Afficher l'axe précédent"
                leftIcon={CaretLeftIcon}
                variant="outlined"
                onClick={handlePrevious}
              />

              <p role="status">
                <span className="visually-hidden">Axe </span>
                {activeIndex + 1} / {axisItems.length}
              </p>

              <ActionButton
                label=""
                ariaLabel="Afficher l'axe suivant"
                rightIcon={CaretRightIcon}
                variant="outlined"
                onClick={handleNext}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
