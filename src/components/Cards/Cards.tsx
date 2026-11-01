import type { Icon } from "@phosphor-icons/react";
import styles from "./cards.module.scss";

type CardProps = {
  number?: string;
  icon: Icon;
  title: string;
  description: string;
  variant?: "default" | "compact";
  iconPosition?: "top" | "inline";
  accent?: "primary" | "secondary" | "accent";
};

export default function Card({
  number,
  icon,
  title,
  description,
  variant = "default",
  iconPosition = "top",
  accent = "primary",
}: CardProps) {
  const Icon = icon;

  return (
    <article className={`${styles.card} ${styles[variant]} ${styles[accent]}`}>
      {number && <span className={styles.cardNumber}>{number}</span>}

      {iconPosition === "top" && <Icon aria-hidden="true" />}

      <div className={styles.cardContent}>
        {iconPosition === "inline" ? (
          <div className={styles.cardHeading}>
            <Icon aria-hidden="true" />
            <h4 className={styles.cardTitle}>{title}</h4>
          </div>
        ) : (
          <h4 className={styles.cardTitle}>{title}</h4>
        )}

        <p className={styles.cardDescription}>{description}</p>
      </div>
    </article>
  );
}
