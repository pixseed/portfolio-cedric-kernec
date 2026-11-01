import { useEffect, useRef, useState, type CSSProperties } from "react";

import TechnologyBadge from "../../../../components/TechnologyBadge/TechnologyBadge";
import type { Project } from "../../../../types/projects";

import styles from "./projectTechnologies.module.scss";

type ProjectTechnologiesProps = {
  projectId: Project["id"];
  featuredTechnologies: Project["featuredTechnologies"];
  technologies: Project["technologies"];
};

const SAFETY_MARGIN = 2;

/**
 * Affiche les technologies principales d'un projet sur une seule ligne.
 *
 * Le nombre de badges visibles s'adapte automatiquement à la largeur
 * disponible. Les technologies masquées restent accessibles via un
 * popover natif.
 *
 * Le composant utilise ResizeObserver pour recalculer l'affichage
 * lorsque la largeur du conteneur change.
 */
export default function ProjectTechnologies({
  projectId,
  featuredTechnologies,
  technologies,
}: ProjectTechnologiesProps) {
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

    // Recalcule l'affichage lorsque les dimensions du conteneur changent.
    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];

      if (!entry) return;

      updateVisibleCount(entry.contentRect.width);
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

  // ===============================================================
  // Derived data
  // ===============================================================

  // Technologie principales actuellement visibles dans la card.
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
  // Return
  // ===============================================================

  return (
    <div
      ref={technologiesContainerRef}
      className={styles.projectTechnologies}
      style={{ anchorName: `--technologies-${projectId}` }}
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
            popoverTarget={`technologies-${projectId}`}
            className={styles.technologiesTrigger}
          >
            +{additionalTechnologiesCount}
          </button>

          {/* Popover natif contenant toutes les technologies du projet. */}
          <div
            id={`technologies-${projectId}`}
            popover="auto"
            className={styles.technologiesPopover}
            style={
              {
                "--card-anchor": `--card-${projectId}`,
                "--technologies-anchor": `--technologies-${projectId}`,
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
