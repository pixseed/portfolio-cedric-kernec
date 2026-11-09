import { useId } from "react";

import styles from "./toggle.module.scss";

type ToggleProps = {
  label: string;
  description?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  variant?: "default" | "outlined";
};

export default function Toggle({
  label,
  description,
  checked,
  onChange,
  variant = "default",
}: ToggleProps) {
  const id = useId();
  const labelId = `${id}-label`;
  const descriptionId = `${id}-description`;

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-labelledby={labelId}
      aria-describedby={description ? descriptionId : undefined}
      onClick={() => onChange(!checked)}
      className={`${styles.toggle} ${variant === "outlined" ? styles.outlined : ""}`}
    >
      <span className={styles.content}>
        <span id={labelId} className={styles.label}>{label}</span>

        {description && (
          <span id={descriptionId} className={styles.description}>{description}</span>
        )}
      </span>

      <span className={styles.track} aria-hidden="true">
        <span className={styles.thumb} />
      </span>
    </button>
  );
}
