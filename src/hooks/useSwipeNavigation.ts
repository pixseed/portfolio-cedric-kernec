import { useRef, type PointerEvent } from "react";

type UseSwipeNavigationOptions = {
  onPrevious: () => void;
  onNext: () => void;
  enabled?: boolean;
  ignoreSelector?: string;
};

/**
 * Détecte les balayages horizontaux tactiles ou au stylet
 * et délègue la navigation aux fonctions reçues.
 */
export default function useSwipeNavigation({
  onPrevious,
  onNext,
  enabled = true,
  ignoreSelector,
}: UseSwipeNavigationOptions) {
  // ===============================================================
  // Refs
  // ===============================================================

  // Conserve le contact suivi et son point de départ entre deux événements.
  const swipeStartRef = useRef<{
    pointerId: number;
    x: number;
    y: number;
  } | null>(null);

  // ===============================================================
  // Handlers
  // ===============================================================

  /**
   * Mémorise le départ d'un geste tactile ou au stylet.
   * Ignore la souris et les contacts secondaires.
   */
  function handlePointerDown(event: PointerEvent<HTMLElement>) {
    if (!enabled || event.pointerType === "mouse" || !event.isPrimary) {
      return;
    }

    const target = event.target;

    // Ignore aussi les enfants d'une zone exclue.
    if (
      ignoreSelector &&
      target instanceof Element &&
      target.closest(ignoreSelector)
    ) {
      swipeStartRef.current = null;
      return;
    }

    swipeStartRef.current = {
      pointerId: event.pointerId,
      x: event.clientX,
      y: event.clientY,
    };
  }

  /**
   * Déclenche la navigation si le geste est suffisamment long
   * et principalement horizontal.
   */
  function handlePointerUp(event: PointerEvent<HTMLElement>) {
    const start = swipeStartRef.current;

    // Ignore un événement qui ne correspond pas au contact suivi.
    if (!start || start.pointerId !== event.pointerId) return;

    // Termine le suivi même si le déplacement ne sera pas retenu.
    swipeStartRef.current = null;

    if (!enabled) return;

    const distanceX = event.clientX - start.x;
    const distanceY = event.clientY - start.y;

    // Écarte les petits gestes et ceux principalement verticaux.
    if (
      Math.abs(distanceX) < 48 ||
      Math.abs(distanceX) <= Math.abs(distanceY) * 1.5
    ) {
      return;
    }

    if (distanceX < 0) {
      onNext();
    } else {
      onPrevious();
    }
  }

  /**
   * Abandonne le suivi lorsque le navigateur annule le geste,
   * notamment pour prendre en charge le défilement ou le zoom.
   */
  function handlePointerCancel() {
    swipeStartRef.current = null;
  }

  // ===============================================================
  // Return
  // ===============================================================

  return {
    onPointerDown: handlePointerDown,
    onPointerUp: handlePointerUp,
    onPointerCancel: handlePointerCancel,
  };
}
