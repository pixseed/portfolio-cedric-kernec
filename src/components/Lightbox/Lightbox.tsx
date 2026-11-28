import { useState, useCallback, useEffect, useRef, type MouseEvent } from "react";
import { CaretLeftIcon, CaretRightIcon, XIcon } from "@phosphor-icons/react";
import { getCircularIndex } from "../../utils/getCircularIndex";

import type { ProjectImage } from "../../types/projects";

import useSwipeNavigation from "../../hooks/useSwipeNavigation";

import imageUnavailable from "../../assets/images/fallbacks/image-unavailable.webp";
import ImageWithFallback from "../ImageWithFallback/ImageWithFallback";

import styles from "./lightbox.module.scss";

type LightboxProps = {
  images: ProjectImage[];
  activeIndex: number;
  isOpen: boolean;
  title: string;
  onClose: () => void;
  onNavigate: (index: number) => void;
};

export default function Lightbox({
  images,
  activeIndex,
  isOpen,
  title,
  onClose,
  onNavigate,
}: LightboxProps) {
  // ===============================================================
  // State
  // ===============================================================

  // Conserve le sens du dernier changement pour orienter l'animation.
  const [navigationDirection, setNavigationDirection] = useState<-1 | 1>(1);

  // ===============================================================
  // Refs
  // ===============================================================

  const dialogRef = useRef<HTMLDialogElement>(null);
  const previousImageButtonRef = useRef<HTMLButtonElement>(null);
  const nextImageButtonRef = useRef<HTMLButtonElement>(null);

  // ===============================================================
  // Derived data
  // ===============================================================

  const activeImage = images[activeIndex];

  // ===============================================================
  // Handlers
  // ===============================================================

  const handleNavigate = useCallback(
    (direction: -1 | 1) => {
      const nextIndex = getCircularIndex(activeIndex, direction, images.length);

      setNavigationDirection(direction);
      onNavigate(nextIndex);
    },
    [activeIndex, images.length, onNavigate],
  );

  // Active le balyage entre images lorsque la visionneuse ouverte
  // contient une image active et plusieurs visuels.
  const swipeHandlers = useSwipeNavigation({
    onPrevious: () => handleNavigate(-1),
    onNext: () => handleNavigate(1),
    enabled: isOpen && Boolean(activeImage) && images.length > 1,
  });

  function handleBackdropClick(event: MouseEvent<HTMLDialogElement>) {
    if (event.target === event.currentTarget) {
      onClose();
    }
  }

  // ===============================================================
  // Effects
  // ===============================================================

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && !dialog.open) {
      dialog.showModal();
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || !activeImage || images.length <= 1) return;

    const dialog = dialogRef.current;
    if (!dialog) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) {
        return;
      }

      const target = event.target;

      if (
        target instanceof HTMLElement &&
        (target.isContentEditable || target.matches("input, textarea,select"))
      ) {
        return;
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        previousImageButtonRef.current?.focus({ preventScroll: true });
        handleNavigate(-1);
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        nextImageButtonRef.current?.focus({ preventScroll: true });
        handleNavigate(1);
      }
    }

    dialog.addEventListener("keydown", handleKeyDown);

    return () => {
      dialog.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, activeImage, handleNavigate, images.length]);

  // ===============================================================
  // Return
  // ===============================================================

  return (
    <dialog
      ref={dialogRef}
      className={styles.lightbox}
      data-lightbox
      aria-label={title}
      onClose={(event) => {
        event.stopPropagation();
        onClose();
      }}
      onClick={(event) => {
        event.stopPropagation();
        handleBackdropClick(event);
      }}
    >
      <button
        type="button"
        className={styles.closeButton}
        onClick={onClose}
        aria-label="Fermer la visionneuse"
      >
        <XIcon aria-hidden="true" />
      </button>

      <div className={styles.lightboxContent}>
        {activeImage ? (
          <ImageWithFallback
            key={`${activeIndex}-${activeImage.src}`}
            src={activeImage.src}
            alt={activeImage.alt}
            draggable={false}
            data-direction={navigationDirection}
            className={styles.swipeImage}
            {...swipeHandlers}
          />
        ) : (
          <>
            <div className={styles.unavailableMessage} role="status">
              <p>Image indisponible.</p>
            </div>
            <img src={imageUnavailable} alt="" draggable="false" />
          </>
        )}

        {activeImage && images.length > 1 && (
          <div className={styles.lightboxNavigation}>
            <button
              ref={previousImageButtonRef}
              type="button"
              className={`${styles.navigationButton} ${styles.previousButton}`}
              onClick={() => handleNavigate(-1)}
              aria-label="Image précédente"
            >
              <CaretLeftIcon aria-hidden="true" />
            </button>

            <span className={styles.imageCounter} aria-live="polite">
              {activeIndex + 1} / {images.length}
            </span>

            <button
              ref={nextImageButtonRef}
              type="button"
              className={`${styles.navigationButton} ${styles.nextButton}`}
              onClick={() => handleNavigate(1)}
              aria-label="Image suivante"
            >
              <CaretRightIcon aria-hidden="true" />
            </button>
          </div>
        )}
      </div>
    </dialog>
  );
}
