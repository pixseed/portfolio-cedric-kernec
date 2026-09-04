import type { Icon } from "@phosphor-icons/react";
import styles from "./actionLink.module.scss";

type ActionLinkProps = {
  label: string;
  href: string;
  variant?: "primary" | "secondary";
  icon?: Icon;
  iconPosition?: "left" | "right";
  download?: string;
};

export default function ActionLink({
  label,
  href,
  variant = "primary",
  icon: Icon,
  iconPosition = "left",
  download,
}: ActionLinkProps) {
  return (
    <a
      href={href}
      download={download}
      className={`${styles.actionLink} ${styles[variant]}`}
    >
      {iconPosition === "left" && Icon && <Icon />}
      {label}
      {iconPosition === "right" && Icon && <Icon />}
    </a>
  );
}
