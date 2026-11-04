import { type Icon, ArrowSquareOutIcon } from "@phosphor-icons/react";
import styles from "./actionLink.module.scss";

type ActionLinkProps = {
  label: string;
  href: string;
  variant?: "primary" | "secondary" | "neutral";
  icon?: Icon;
  iconPosition?: "left" | "right";
  download?: string;
  external?: boolean;
  showExternalIcon?: boolean;
};

export default function ActionLink({
  label,
  href,
  variant = "primary",
  icon: Icon,
  iconPosition = "left",
  download,
  external = false,
  showExternalIcon = false,
}: ActionLinkProps) {

  return (
    <a
      href={href}
      download={download}
      className={`${styles.actionLink} ${styles[variant]}`}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
    >
      {iconPosition === "left" && Icon && <Icon aria-hidden="true" />}
      {label}
      {iconPosition === "right" && Icon && <Icon aria-hidden="true" />}
      {showExternalIcon && external && (
        <ArrowSquareOutIcon
          className={styles.externalIcon}
          aria-hidden="true"
        />
      )}
      {external && (
        <span className="visually-hidden">
        (ouvre dans un nouvel onglet)
        </span>
      )}
    </a>
  );
}
