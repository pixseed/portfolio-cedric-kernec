import { useEffect, useState } from "react";
import type { EmblaCarouselType } from "embla-carousel";

/**
 * Synchronise l'index actif avec la position du carrousel Embla.
 *
 * @param emblaApi - Instance de l'API Embla.
 * @returns L'index de la diapositive sélectionnée.
 */
export function useEmblaSelectedIndex(
  emblaApi: EmblaCarouselType | undefined,
): number {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setActiveIndex(emblaApi.selectedScrollSnap());
    };

    onSelect();

    emblaApi.on("select", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  return activeIndex;
}
