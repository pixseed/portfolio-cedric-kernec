import { XIcon } from "@phosphor-icons/react";
import {
  useRef,
  type ReactNode,
  type MouseEvent,
  type UIEvent,
  useEffect,
  useLayoutEffect,
} from "react";
import styles from "./modal.module.scss";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  size?: "default" | "large";
  ariaLabel: string;
  header?: ReactNode;
  scrollKey?: string;
  preserveScrollKey?: string;
  focusHeaderOnViewChange?: boolean;
};

/**
 * Affiche une fenêtre modale native et réutilisable.
 *
 * Fonctionnalités :
 * - Ouverture et fermeture via l'API native HTMLDialogElement.
 * - Fermeture avec Escape, bouton dédié ou clic extérieur.
 * - Blocage du défilement de la page pendant l'ouverture.
 * - Gestion du défilement lors des changements de vue.
 * - Conservation facultative du scroll d'une vue identifiée.
 *
 * Le contenu de la modale possède sa propre zone de défilement.
 *
 * @param props - Propriétés du composant.
 * @returns Le composant Modal.
 */
export default function Modal({
  isOpen,
  onClose,
  children,
  size = "default",
  ariaLabel,
  header,
  scrollKey,
  preserveScrollKey,
  focusHeaderOnViewChange = true,
}: ModalProps) {
  // ===============================================================
  // Refs
  // ===============================================================

  const dialogRef = useRef<HTMLDialogElement>(null);
  const dialogContentRef = useRef<HTMLDivElement>(null);
  const preservedScrollRef = useRef(0);
  const headerContentRef = useRef<HTMLDivElement>(null);

  // ===============================================================
  // Handlers
  // ===============================================================

  /**
   * Ferme la modale lorsque le clic se produit
   * en dehors des limites visibles du dialogue.
   *
   * @param event - Événement de clic sur le dialogue.
   */
  function handleDialogClick(event: MouseEvent<HTMLDialogElement>) {
    /**
     * Protège contre un évènement activé au clavier.
     * - event.detail === 0 : clic généré par une activation clavier
     * - event.detail === 1 : génération lors d'un clic.
     */
    if (event.detail === 0) return;

    const dialog = event.currentTarget;
    const rect = dialog.getBoundingClientRect();

    // Vérifie si les coordonnées du clic sont hors du dialogue.
    const isOutside =
      event.clientX < rect.left ||
      event.clientX > rect.right ||
      event.clientY < rect.top ||
      event.clientY > rect.bottom;

    if (isOutside) {
      dialog.close();
    }
  }

  /**
   * Mémorise la position de défilement de la galerie.
   * Les fiches projets ne conservent jamais leur position.
   *
   * @param event - Événement de défilement du contenu.
   */
  function handleContentScroll(event: UIEvent<HTMLDivElement>) {
    if (!scrollKey || scrollKey !== preserveScrollKey) return;

    preservedScrollRef.current = event.currentTarget.scrollTop;
  }

  // ===============================================================
  // Effects
  // ===============================================================

  /**
   * Synchronise l'ouverture native du dialogue
   * avec la propriété isOpen.
   *
   * L'ouverture est effectuée avant la synchronisation
   * du défilement pour éviter un positionnement incorrect.
   */
  useLayoutEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && !dialog.open) {
      dialog.showModal();
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  /**
   * Bloque le défilement de la page pendant l'ouverture
   * de la modale et restaure sa valeur initiale à la fermeture.
   */
  useEffect(() => {
    if (!isOpen) return;

    const html = document.documentElement;
    const previousOverflow = html.style.overflow;

    html.style.overflow = "hidden";

    return () => {
      html.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  /**
   * Synchronise le défilement lors d'un changement de vue.
   *
   * - Galerie : restaure sa dernière position.
   * - Projet : commence systématiquement en haut.
   */
  useLayoutEffect(() => {
    if (!isOpen) return;

    const content = dialogContentRef.current;
    if (!content) return;

    content.scrollTop =
      scrollKey === preserveScrollKey ? preservedScrollRef.current : 0;
  }, [scrollKey, preserveScrollKey, isOpen]);

  /**
   * Réinitialise la position mémorisée à la fermeture.
   * Une nouvelle ouverture repartira ainsi du début.
   */
  useEffect(() => {
    if (!isOpen) {
      preservedScrollRef.current = 0;
    }
  }, [isOpen]);

  /**
   * Place le focus sur le premier bouton du header
   * lorsqu'une fiche est ouverte.
   *
   * Conserve le focus lorsqu'il se trouve déjà
   * sur un bouton du header.
   */
  useLayoutEffect(() => {
    if (!isOpen || !focusHeaderOnViewChange) return;

    const header = headerContentRef.current;
    if (!header) return;

    // Ne déplace pas le focus s'il est déjà dans le header.
    if (header.contains(document.activeElement)) return;

    const button = header.querySelector<HTMLButtonElement>("button");

    button?.focus({ preventScroll: true });
  }, [isOpen, scrollKey, focusHeaderOnViewChange]);

  // ===============================================================
  // Return
  // ===============================================================

  return (
    <dialog
      ref={dialogRef}
      className={`${styles.dialog} ${size === "large" ? styles.large : ""}`}
      onClose={onClose}
      onClick={handleDialogClick}
      aria-label={ariaLabel}
    >
      <div className={styles.dialogHeader}>
        <div ref={headerContentRef} className={styles.headerContent}>
          {header}
        </div>

        <button
          type="button"
          className={styles.closeButton}
          onClick={() => dialogRef.current?.close()}
          aria-label="Fermer la fenêtre"
        >
          <XIcon aria-hidden="true" />
        </button>
      </div>

      <div
        ref={dialogContentRef}
        className={styles.dialogContent}
        onScroll={handleContentScroll}
      >
        {children}
      </div>
    </dialog>
  );
}
