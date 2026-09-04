import type { Icon } from "@phosphor-icons/react";
import styles from './socialLink.module.scss';

type SocialLinkBaseProps = {
  href: string;
  icon: Icon;
};

type SocialLinkProps = SocialLinkBaseProps &
  (
    | {
        label: string;
        ariaLabel?: string;
      }
    | {
        label?: never;
        ariaLabel: string;
      }
  );

export default function SocialLink({
  label,
  ariaLabel,
  href,
  icon: Icon,
}: SocialLinkProps) {
  return (
    <a
      href={href}
      aria-label={ariaLabel ?? label}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.socialLink}
    >
      <Icon />
      {label}
    </a>
  );
}
