import { useCallback, useEffect, useRef, type MouseEvent } from "react";

import styles from "./lightbox.module.scss";
import { CaretLeftIcon, CaretRightIcon, XIcon } from "@phosphor-icons/react";
import { getCircularIndex } from "../../utils/getCircularIndex";

type LightboxProps = {
  images: string[];
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
  // Refs
  // ===============================================================

  const dialogRef = useRef<HTMLDialogElement>(null);
  const previousImageButtonRef = useRef<HTMLButtonElement>(null);
  const nextImageButtonRef = useRef<HTMLButtonElement>(null);

  // ===============================================================
  // Handlers
  // ===============================================================

  const handleNavigate = useCallback(
    (direction: -1 | 1) => {
      const nextIndex = getCircularIndex(activeIndex, direction, images.length);

      onNavigate(nextIndex);
    },
    [activeIndex, images.length, onNavigate],
  );

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
    if (!isOpen || images.length <= 1) return;

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
  }, [isOpen, handleNavigate, images.length]);

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
        <img
          src={images[activeIndex]}
          alt={`${title} - Image ${activeIndex + 1} sur ${images.length}`}
          draggable={false}
        />

        {images.length > 1 && (
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
