import type { CSSProperties } from "react";
import { ArrowSquareOutIcon } from "@phosphor-icons/react";

import type { Technology } from "../../types/technology";

import styles from "./technologyBadge.module.scss";

type TechnologyBadgeProps = {
  technology: Technology;
  variant?: "default" | "compact";
};

// ===============================================================
// Color utilities
// ===============================================================

/**
 * Calcule la luminance approximative d'une couleur hexadécimale.
 * Elle permet ensuite d'adapter le contraste des éléments du badge.
 */
function getLuminance(hex: string) {
  const red = parseInt(hex.slice(0, 2), 16);
  const green = parseInt(hex.slice(2, 4), 16);
  const blue = parseInt(hex.slice(4, 6), 16);

  return 0.299 * red + 0.587 * green + 0.114 * blue;
}

/**
 * Détermine la couleur du contenu affiché sur la couleur
 * de la technologie afin de conserver un contraste suffisant.
 */
function getContrastColor(hex: string) {
  const luminance = getLuminance(hex);

  if (luminance > 140) {
    return "var(--color-text-dark)";
  }

  return "var(--color-text-light)";
}

/**
 * Adapte la couleur d'une technologie afin qu'elle reste visible
 * sur le fond sombre du portfolio.
 *
 * Les couleurs suffisamment lumineuses sont conservées, tandis que
 * les couleurs trop sombres sont remplacées par une couleur claire.
 */
function getVisibleTechnologyColor(hex: string) {
  const luminance = getLuminance(hex);

  if (luminance < 40) {
    return "var(--color-text-light)";
  }

  return `#${hex}`;
}

export default function TechnologyBadge({ technology, variant = "default" }: TechnologyBadgeProps) {
  // Utilise la couleur de Simple Icons ou la couleur personnalisée de la technologie.
  const technologyColor =
    technology.icon?.hex ??
    technology.color;
  
  // Transmet les couleurs calculées au module SCSS via des propriétés CSS personnalisées.
  const badgeStyle = {
    ...(technologyColor && {
      "--technology-color": `#${technologyColor}`,
      "--technology-icon-color": getContrastColor(technologyColor),
      "--technology-visible-color": getVisibleTechnologyColor(
          technology.displayColor ?? technologyColor
      ),
    }),
  } as CSSProperties;

  return (
    <a
      href={technology.link}
      target="_blank"
      rel="noopener noreferrer"
      className={`${styles.badge} ${styles[variant]}`}
      style={badgeStyle}
    >
      {(technology.icon || technology.iconLabel) && (
        <span className={styles.icon}>
          {technology.icon ? (
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d={technology.icon.path} />
            </svg>
          ) : (
            <span>{technology.iconLabel}</span>
          )}
        </span>
      )}
      <span className={styles.label}>{technology.name}</span>
      <span className={styles.externalLinkIcon}>
        <ArrowSquareOutIcon aria-hidden="true" />
      </span>
      <span className="visually-hidden">(ouvre dans un nouvel onglet)</span>
    </a>
  );
}
