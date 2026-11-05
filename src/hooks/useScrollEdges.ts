import { useEffect, useRef, useState } from "react";

type ScrollDirection = "horizontal" | "vertical";
type ScrollEdgesOptions = {
  enabled?: boolean;
};

/**
 * Détecte si un élément peut encore défiler
 * au début ou à la fin de son axe de défilement.
 *
 * La détection peut être désactivée pour éviter
 * l'installation inutile d'écouteurs et d'observateurs.
 *
 * @param direction - Axe de défilement à observer.
 * @param options - Options de configuration du hook.
 * @param options.enabled - Active ou désactive la détection (true par défaut).
 */
export default function useScrollEdges<T extends HTMLElement>(
  direction: ScrollDirection,
  { enabled = true }: ScrollEdgesOptions = {},
) {
  // ===============================================================
  // State
  // ===============================================================

  const [canScrollStart, setCanScrollStart] = useState(false);
  const [canScrollEnd, setCanScrollEnd] = useState(false);

  // ===============================================================
  // Refs
  // ===============================================================

  const scrollRef = useRef<T>(null);

  // ===============================================================
  // Effects
  // ===============================================================

  useEffect(() => {
    if (!enabled) return;

    const element = scrollRef.current;
    if (!element) return;

    /**
     * Met à jour les possibilités de défilement selon la position
     * actuelle et la direction de l'élément observé.
     */
    const updateScrollState = () => {
      // Récupère les propriétés correspondant à l'axe de défilement.
      const position =
        direction === "horizontal" ? element.scrollLeft : element.scrollTop;
      const scrollSize =
        direction === "horizontal" ? element.scrollWidth : element.scrollHeight;
      const clientSize =
        direction === "horizontal" ? element.clientWidth : element.clientHeight;

      // Tolérance pour éviter les imprécisions de calcul.
      const scrollThreshold = 1;

      // Détermine si du contenu reste accessible dans chaque direction.
      setCanScrollStart(position > scrollThreshold);
      setCanScrollEnd(position < scrollSize - clientSize - scrollThreshold);
    };

    // Calcule les possibilité de défilement au montage.
    updateScrollState();

    // Écoute les événements de défilement.
    element.addEventListener("scroll", updateScrollState);

    // Actualise les possibilités de défilement
    // lorsque les dimensions de l'élément changent.
    const resizeObserver = new ResizeObserver(updateScrollState);
    resizeObserver.observe(element);

    // Nettoie les événements de défilement et l'observateur.
    return () => {
      resizeObserver.disconnect();
      element.removeEventListener("scroll", updateScrollState);
    };
  }, [direction, enabled]);

  // ===============================================================
  // Return
  // ===============================================================

  return {
    scrollRef,
    canScrollStart: enabled && canScrollStart,
    canScrollEnd: enabled && canScrollEnd,
  };
}
