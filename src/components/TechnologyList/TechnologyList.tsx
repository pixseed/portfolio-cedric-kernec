import { useEffect, useRef, useState, type CSSProperties } from "react";

import TechnologyBadge from "../TechnologyBadge/TechnologyBadge";

import type { Technology } from "../../types/technology";

import styles from "./technologyList.module.scss";

type TechnologyListProps = {
  instanceId: string;
  featuredTechnologies: Technology[];
  technologies: Technology[];
  isActive: boolean;
  popoverAnchor?: string;
};

const SAFETY_MARGIN = 2;

/**
 * Affiche une sélection de technologies sur une seule ligne.
 *
 * Le nombre de badges visibles s'adapte automatiquement à la largeur
 * disponible. Les technologies masquées restent accessibles via un
 * popover natif.
 *
 * Le composant utilise ResizeObserver pour recalculer l'affichage
 * lorsque la largeur du conteneur change.
 */
export default function TechnologyList({
  instanceId,
  featuredTechnologies,
  technologies,
  isActive,
  popoverAnchor,
}: TechnologyListProps) {
  // ===============================================================
  // State
  // ===============================================================

  // Nombre de technologies principales actuellement affichées.
  const [visibleCount, setVisibleCount] = useState(featuredTechnologies.length);

  // ===============================================================
  // Refs
  // ===============================================================

  // Références vers les éléments HTML nécessaires aux mesures.
  const technologiesContainerRef = useRef<HTMLDivElement>(null);
  const measurementRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const popoverRef = useRef<HTMLDivElement>(null);

  // ===============================================================
  // Derived data
  // ===============================================================

  // Technologies principales actuellement visibles dans la card.
  const visibleTechnologies = featuredTechnologies.slice(0, visibleCount);

  // Technologies absentes de la card à afficher dans le popover.
  const hiddenTechnologies = technologies.filter(
    (technology) =>
      !visibleTechnologies.some(
        (visibleTechnology) => visibleTechnology.name === technology.name,
      ),
  );

  // Nombre de technologies accessibles via le popover.
  const additionalTechnologiesCount = hiddenTechnologies.length;

  // ===============================================================
  // Effects
  // ===============================================================

  useEffect(() => {
    const container = technologiesContainerRef.current;
    const measurement = measurementRef.current;
    const trigger = triggerRef.current;

    if (!container || !measurement || !trigger) return;

    // Empêche les recalculs asynchrones après le nettoyage de l'effet.
    let isActive = true;

    /**
     * Calcule le nombre maximal de badges pouvant tenir sur une ligne,
     * en réservant la place du trigger lorsque des technologies
     * supplémentaires doivent être masquées.
     */
    const updateVisibleCount = (availableWidth: number) => {
      /**
       * Récupère les badges présents dans la zone de mesure.
       *
       * - Array.from() convertit la collection HTML en tableau.
       * - filter() exclut le trigger utilisé pour mesurer le bouton "+N".
       * - "element is HTMLElement" indique à TypeScript que les éléments
       *   conservés sont des HTMLElement, afin de pouvoir utiliser offsetWidth.
       * - instanceof vérifie que chaque élément est un HTMLElement.
       */
      const badges = Array.from(measurement.children).filter(
        (element): element is HTMLElement =>
          element instanceof HTMLElement && element !== trigger,
      );

      // Mesure la largeur réelle de chaque badge.
      const badgesWidths = badges.map((badge) => badge.offsetWidth);

      // Mesure le trigger et récupère l'espacement défini en CSS.
      const triggerWidth = trigger.offsetWidth;
      const gap = parseFloat(getComputedStyle(container).columnGap) || 0;

      let count = 0;
      let occupiedWidth = 0;

      // Teste successivement chaque technologie principale.
      for (const badgeWidth of badgesWidths) {
        const nextCount = count + 1;

        // Nombre de technologies qui resteraient masquées.
        const remainingCount = technologies.length - nextCount;

        // Largeur des badges, espacements compris.
        const badgesTotalWidth =
          occupiedWidth + badgeWidth + (count > 0 ? gap : 0);

        // Réserve la place du trigger s'il reste des technologies masquées.
        const requiredWidth =
          badgesTotalWidth + (remainingCount > 0 ? gap + triggerWidth : 0);

        // Arrête le calcul dès que le prochain badge ne tient plus.
        if (requiredWidth + SAFETY_MARGIN > availableWidth) {
          break;
        }

        // Le badge tient : on valide son ajout.
        occupiedWidth = badgesTotalWidth;
        count = nextCount;
      }

      // Met à jour l'affichage uniquement si le nombre a changé.
      setVisibleCount((previousCount) =>
        previousCount === count ? previousCount : count,
      );
    };

    // Conserve la dernière largeur mesurée pour distinguer un redimensionnement
    // de la première notification envoyée par l'observateur.
    let previousWidth: number | undefined;

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];

      if (!entry) return;

      const availableWidth = entry.contentRect.width;

      // Ferme le popover si sa zone de référence change de largeur.
      // Une nouvelle ouverture permettra de recalculer son placement.
      if (
        previousWidth !== undefined &&
        Math.abs(availableWidth - previousWidth) > 0.5
      ) {
        const popover = popoverRef.current;

        if (popover?.matches(":popover-open")) {
          popover.hidePopover();
        }
      }

      previousWidth = availableWidth;
      updateVisibleCount(availableWidth);
    });

    observer.observe(container);

    // Recalcule après le chargement initial des polices : leurs métriques
    // peuvent modifier la largeur des badges sans redimensionner le conteneur.
    document.fonts.ready.then(() => {
      if (!isActive) return;

      updateVisibleCount(container.clientWidth);
    });

    // Désactive les recalculs asynchrones et libère l'observateur.
    return () => {
      isActive = false;
      observer.disconnect();
    };
  }, [featuredTechnologies, technologies]);

  /**
   * Ferme le popover lorsque le contexte  qui contient la liste devient inactif.
   */
  useEffect(() => {
    const popover = popoverRef.current;

    if (!isActive && popover?.matches(":popover-open")) {
      popover.hidePopover();
    }
  }, [isActive]);

  // ===============================================================
  // Return
  // ===============================================================

  return (
    <div
      ref={technologiesContainerRef}
      className={styles.technologyList}
      style={{ anchorName: `--technologies-${instanceId}` }}
    >
      {/* Zone invisible permettant de mesurer les badges et le trigger. */}
      <div
        ref={measurementRef}
        className={styles.technologiesMeasurement}
        aria-hidden="true"
        inert
      >
        {featuredTechnologies.map((technology) => (
          <div key={technology.name}>
            <TechnologyBadge technology={technology} variant="compact" />
          </div>
        ))}

        {/* Trigger de mesure avec le compteur maximal. */}
        <button
          ref={triggerRef}
          type="button"
          className={styles.technologiesTrigger}
          tabIndex={-1}
        >
          +{technologies.length}
        </button>
      </div>

      {/* Affiche uniquement les technologies qui tiennent sur une ligne. */}
      {visibleTechnologies.map((technology) => (
        <TechnologyBadge
          key={technology.name}
          technology={technology}
          variant="compact"
        />
      ))}

      {/* Affiche le trigger uniquement si des technologies sont masquées. */}
      {additionalTechnologiesCount > 0 && (
        <div className={styles.technologiesTriggerWrapper}>
          <button
            type="button"
            aria-label={`Afficher les ${additionalTechnologiesCount} technologies supplémentaires`}
            popoverTarget={`technologies-${instanceId}`}
            className={styles.technologiesTrigger}
          >
            +{additionalTechnologiesCount}
          </button>

          {/* Popover natif contenant les technologies non affichées sur la carte. */}
          <div
            ref={popoverRef}
            id={`technologies-${instanceId}`}
            popover="auto"
            className={styles.technologiesPopover}
            style={
              {
                "--card-anchor": popoverAnchor ?? `--technologies-${instanceId}`,
                "--technologies-anchor": `--technologies-${instanceId}`,
              } as CSSProperties
            }
          >
            {hiddenTechnologies.map((technology) => (
              <TechnologyBadge
                key={technology.name}
                technology={technology}
                variant="compact"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
