import styles from "./actionButton.module.scss";
import type { Icon } from "@phosphor-icons/react";

type ActionButtonProps = {
label?: string;
leftIcon?: Icon;
rightIcon?: Icon;
variant?: "filled" | "outlined" | "muted";
onClick?: () => void;
};

export default function ActionButton({
  label = "Bouton",
  variant = "filled",
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  onClick,
}: ActionButtonProps) {

  return (
    <button type="button" className={`${styles.button} ${styles[variant]}`} onClick={onClick}>
      {LeftIcon && <LeftIcon className={styles.icon}/>}
      {label}
      {RightIcon && <RightIcon className={styles.icon}/>}
    </button>
  );
}