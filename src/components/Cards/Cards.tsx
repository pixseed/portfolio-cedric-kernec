import type { Icon } from "@phosphor-icons/react";
import styles from "./cards.module.scss";

type CardProps = {
  number?: string;
  icon: Icon;
  title: string;
  description: string;
  variant?: "default" | "compact";
};

export default function Card({
  number,
  icon,
  title,
  description,
  variant = "default",
}: CardProps) {
  const Icon = icon;

  return (
    <article
      className={`${styles.card} ${variant === "compact" ? styles.compact : ""}`}
    >
      <Icon aria-hidden="true"/>
      <div className={styles.cardContent}>
        <h4 className={styles.cardTitle}>{title}</h4>
        <p className={styles.cardDescription}>{description}</p>
      </div>
      {number && <div className={styles.cardNumber}>{number}</div>}
    </article>
  );
}
