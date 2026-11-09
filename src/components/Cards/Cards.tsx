import type { Icon } from "@phosphor-icons/react";
import type { ReactNode } from "react";

import styles from "./cards.module.scss";

type CardProps = {
  number?: string;
  icon: Icon;
  title: string;
  description: string;
  variant?: "default" | "compact";
  iconPosition?: "top" | "inline" | "header";
  accent?: "primary" | "secondary" | "accent";
  headingLevel?: 2 | 3 | 4 | 5 | 6;

  children?: ReactNode;
  eyebrow?: ReactNode;
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
  children,
  eyebrow,
}: CardProps) {
  const Icon = icon;
  const Heading = `h${headingLevel}` as "h2" | "h3" | "h4" | "h5" | "h6";

  return (
    <article
      className={`${styles.card} ${styles[variant]} ${styles[accent]} ${iconPosition === "inline" ? styles.inline : ""} ${iconPosition === "header" ? styles.header : ""} ${number ? styles.withNumber : ""}`}
    >
      {number && <span className={styles.cardNumber}>{number}</span>}

      {iconPosition === "top" && <Icon className={styles.cardIcon} aria-hidden="true" />}

      <div className={styles.cardContent}>
        {/* Le mode header réunit l’icône et le surtitre au-dessus du titre. */}
        {iconPosition === "header" ? (
          <div className={styles.cardHeader}>
            <Icon className={styles.cardIcon} aria-hidden="true" />
            {eyebrow && <div className={styles.cardEyebrow}>{eyebrow}</div>}
          </div>
        ) : (
          eyebrow
        )}
        {iconPosition === "inline" ? (
          <div className={styles.cardHeading}>
            <Icon className={styles.cardIcon} aria-hidden="true" />
            <Heading className={styles.cardTitle}>{title}</Heading>
          </div>
        ) : (
          <Heading className={styles.cardTitle}>{title}</Heading>
        )}

        <p className={styles.cardDescription}>{description}</p>
        {children}
      </div>
    </article>
  );
}
