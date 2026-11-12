import styles from "./actionButton.module.scss";
import type { Icon } from "@phosphor-icons/react";

type ActionButtonProps = {
  label: string;
  leftIcon?: Icon;
  rightIcon?: Icon;
  variant?: "filled" | "outlined" | "muted";
  onClick?: () => void;
  ariaLabel?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
};

export default function ActionButton({
  label,
  variant = "filled",
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  onClick,
  ariaLabel,
  type = "button",
  disabled = false,
}: ActionButtonProps) {
  return (
    <button
      type={type}
      aria-label={ariaLabel}
      className={`${styles.button} ${styles[variant]}`}
      onClick={onClick}
      disabled={disabled}
    >
      {LeftIcon && <LeftIcon className={styles.icon} aria-hidden="true" />}
      {label}
      {RightIcon && <RightIcon className={styles.icon} aria-hidden="true" />}
    </button>
  );
}
