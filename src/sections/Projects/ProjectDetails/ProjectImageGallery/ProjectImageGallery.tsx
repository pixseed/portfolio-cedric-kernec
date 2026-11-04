import { useState, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { CaretLeftIcon, CaretRightIcon } from "@phosphor-icons/react";
import Lightbox from "../../../../components/Lightbox/Lightbox";
import { useEmblaSelectedIndex } from "../../../../hooks/useEmblaSelectedIndex";

import type { Project } from "../../../../types/projects";

import styles from "./projectImageGallery.module.scss";

type ProjectImageGalleryProps = {
  project: Project;
};

export default function ProjectImageGallery({
  project,
}: ProjectImageGalleryProps) {
  // ===============================================================
  // States
  // ===============================================================

  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // ===============================================================
  // Refs
  // ===============================================================

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
  });

  const activeIndex = useEmblaSelectedIndex(emblaApi);
  const activeImageButtonRef = useRef<HTMLButtonElement>(null);

  // ===============================================================
  // Derived Data
  // ===============================================================

  const images = [project.illustration, ...(project.images ?? [])];

  function handleCloseLightbox() {
    setIsLightboxOpen(false);

    requestAnimationFrame(() => {
      activeImageButtonRef.current?.focus({ preventScroll: true });
    });
  }

  // ===============================================================
  // Return
  // ===============================================================

  return (
    <>
      <div className={`${styles.imageGallery} ${images.length > 1 ? styles.withThumbnails : ""}`} >
        <div className={styles.carouselMain}>
          {/* Image principale */}
          <div className={styles.carouselViewport} ref={emblaRef}>
            <div className={styles.carouselContainer}>
              {images.map((image, index) => (
                <div className={styles.carouselSlide} key={`${image.src}-${index}`}>
                  <button
                    ref={index === activeIndex ? activeImageButtonRef : null}
                    type="button"
                    className={styles.imageButton}
                    tabIndex={index === activeIndex ? 0 : -1}
                    onClick={() => setIsLightboxOpen(true)}
                    aria-label={`Agrandir l'image ${index + 1} du projet ${project.title}`}
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      draggable={false}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          {images.length > 1 && (
            <div className={styles.carouselNavigation}>
              <button
                type="button"
                onClick={() => emblaApi?.scrollPrev()}
                aria-label="Image précédente"
              >
                <CaretLeftIcon aria-hidden="true" />
              </button>

              <span aria-live="polite" aria-atomic="true">
                {activeIndex + 1} / {images.length}
              </span>

              <button
                type="button"
                onClick={() => emblaApi?.scrollNext()}
                aria-label="Image suivante"
              >
                <CaretRightIcon aria-hidden="true" />
              </button>
            </div>
          )}
        </div>

        {/* Vignettes */}
        {images.length > 1 && (
          <div className={styles.thumbnails}>
            {images.map((image, index) => (
              <button
                key={`${image.src}-${index}`}
                type="button"
                className={`${styles.thumbnail} ${
                  index === activeIndex ? styles.active : ""
                }`}
                onClick={() => emblaApi?.scrollTo(index)}
                aria-label={`Afficher l'image ${index + 1} sur ${images.length}`}
                aria-pressed={index === activeIndex}
              >
                <img src={image.src} alt="" draggable="false" />
              </button>
            ))}
          </div>
        )}
      </div>
      <Lightbox
        images={images}
        activeIndex={activeIndex}
        isOpen={isLightboxOpen}
        title={`Galerie d'images du projet ${project.title}`}
        onClose={handleCloseLightbox}
        onNavigate={(index) => emblaApi?.scrollTo(index, true)}
      />
    </>
  );
}
