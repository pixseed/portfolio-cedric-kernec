import {
  LightningIcon,
  CaretRightIcon,
  CaretLeftIcon,
} from "@phosphor-icons/react";
import useEmblaCarousel from "embla-carousel-react";

import TechnologyBadge from "../../../components/TechnologyBadge/TechnologyBadge";
import type { Technology } from "../../../types/technology";

import { useEffect, useState } from "react";
import styles from "./projectTechnologies.module.scss";

type ProjectTechnologiesProps = {
  technologies: Array<Technology>;
};

export default function ProjectTechnologies({
  technologies,
}: ProjectTechnologiesProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
    containScroll: "trimSnaps",
  });

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  useEffect(() => {
    if (!emblaApi) return;

    const updateScrollButtons = () => {
      setCanScrollPrev(emblaApi.canScrollPrev());
      setCanScrollNext(emblaApi.canScrollNext());
    };

    updateScrollButtons();

    emblaApi.on("select", updateScrollButtons);
    emblaApi.on("reInit", updateScrollButtons);

    return () => {
      emblaApi.off("select", updateScrollButtons);
      emblaApi.off("reInit", updateScrollButtons);
    };
  }, [emblaApi]);

  function handlePrevious() {
    emblaApi?.scrollPrev();
  }

  function handleNext() {
    emblaApi?.scrollNext();
  }

  return (
    <div className={styles.projectTechnologies}>
      <h3 className={styles.title}>
        <LightningIcon />
        Technologies utilisées dans le projet
      </h3>

      <div className={styles.carousel}>
        {canScrollPrev && (
          <div className={`${styles.overlay} ${styles.overlayLeft}`}>
            <button
              type="button"
              className={`${styles.button} ${styles.previousButton}`}
              onClick={handlePrevious}
              aria-label="Voir les technologies précédentes"
            >
              <CaretLeftIcon />
            </button>
          </div>
        )}

        <div className={styles.technologiesViewport} ref={emblaRef}>
          <div className={styles.technologies}>
            {technologies.map((technology) => (
              <div className={styles.technologySlide} key={technology.name}>
                <TechnologyBadge technology={technology} />
              </div>
            ))}
          </div>
        </div>

        {canScrollNext && (
          <div className={`${styles.overlay} ${styles.overlayRight}`}>
            <button
              type="button"
              className={`${styles.button} ${styles.nextButton}`}
              onClick={handleNext}
              aria-label="Voir les technologies suivantes"
            >
              <CaretRightIcon />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
