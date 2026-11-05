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
  headingLevel?: 2 | 3 | 4 | 5 | 6;
};

export default function Card({
  number,
  icon,
  title,
  description,
  variant = "default",
  iconPosition = "top",
  accent = "primary",
  headingLevel = 4,
}: CardProps) {
  const Icon = icon;
  const Heading = `h${headingLevel}` as "h2" | "h3" | "h4" | "h5" | "h6";

  return (
    <article
      className={`${styles.card} ${styles[variant]} ${styles[accent]} ${iconPosition === "inline" ? styles.inline : ""} ${number ? styles.withNumber : ""}`}
    >
      {number && <span className={styles.cardNumber}>{number}</span>}

      {iconPosition === "top" && <Icon aria-hidden="true" />}

      <div className={styles.cardContent}>
        {iconPosition === "inline" ? (
          <div className={styles.cardHeading}>
            <Icon aria-hidden="true" />
            <Heading className={styles.cardTitle}>{title}</Heading>
          </div>
        ) : (
          <Heading className={styles.cardTitle}>{title}</Heading>
        )}

        <p className={styles.cardDescription}>{description}</p>
      </div>
    </article>
  );
}
