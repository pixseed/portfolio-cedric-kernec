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
 * Estime la luminosité d'une couleur hexadécimale sur six caractères, sans "#".
 * Cette approximation sert aux choix visuels du badge normal ; elle ne calcule
 * pas un ratio de contraste et ne garantit pas la conformité WCAG.
 */
function getApproximateBrightness(hex: string) {
  const red = parseInt(hex.slice(0, 2), 16);
  const green = parseInt(hex.slice(2, 4), 16);
  const blue = parseInt(hex.slice(4, 6), 16);

  return 0.299 * red + 0.587 * green + 0.114 * blue;
}

export default function TechnologyBadge({
  technology,
  variant = "default",
}: TechnologyBadgeProps) {
  /**
   * Couleur d’origine : Simple Icons en priorité, sinon couleur personnalisée.
   * Elle fournit notamment le fond du bloc d’icône du badge normal.
   */
  const technologyColor = technology.icon?.hex ?? technology.color;

  // Le compact utilise displayColor si renseignée, sinon la couleur d’origine.
  const compactColor = technology.displayColor ?? technologyColor;

  /**
   * Objet transmis à l’attribut style de React, puis utilisé par le SCSS.
   * CSSProperties décrit les styles standards. L’intersection (&) avec Record
   * autorise aussi des propriétés nommées "--...", avec des valeurs de type string.
   */
  const badgeStyle: CSSProperties & Record<`--${string}`, string> = {};

  if (technologyColor) {
    const brightness = getApproximateBrightness(technologyColor);

    badgeStyle["--technology-color"] = `#${technologyColor}`;

    // Icône sombre sur une couleur lumineuse, claire dans les autres cas.
    badgeStyle["--technology-icon-color"] =
      brightness > 140 ? "var(--color-text-dark)" : "var(--color-text-light)";

    // La bordure suit la couleur d’origine, sauf si elle est très sombre.
    badgeStyle["--technology-border-color"] =
      brightness < 40 ? "var(--color-text-light)" : `#${technologyColor}`;
  }

  // Le compact ne reçoit aucune correction automatique de luminosité.
  if (compactColor) {
    badgeStyle["--technology-compact-color"] = `#${compactColor}`;
  }

  // ===============================================================
  // Return
  // ===============================================================
  return (
    <a
      href={technology.link}
      target="_blank"
      rel="noopener noreferrer"
      className={`${styles.badge} ${styles[variant]}`}
      style={badgeStyle}
    >
      {(technology.icon || technology.iconLabel) && (
        <span className={styles.icon} aria-hidden="true">
          {technology.icon ? (
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
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
