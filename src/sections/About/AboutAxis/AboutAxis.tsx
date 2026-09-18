import styles from "./about-axis.module.scss";
import type { Icon } from "@phosphor-icons/react";

/*
 * Propriétés nécessaires à l'affichage d'un axe de la section À propos.
 */
type AboutAxisProps = {
  number: string;
  icon: Icon;
  title: string;
  description: string;
};

export default function AboutAxis({
  icon,
  number,
  title,
  description,
}: AboutAxisProps) {
  const Icon = icon;

  return (
    <div className={styles.axis}>
      <Icon />
      <div className={styles.axisContent}>
        <h3 className={styles.axisTitle}>{title}</h3>
        <p className={styles.axisDescription}>{description}</p>
      </div>
      <div className={styles.axisNumber}>{number}</div>
    </div>
  );
}
