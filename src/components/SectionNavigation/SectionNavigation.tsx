import { navigationItems } from "../Navbar/navigationData";

import styles from "./sectionNavigation.module.scss";

type SectionNavigationProps = {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
};

export default function SectionNavigation({
  activeSection,
  onNavigate,
}: SectionNavigationProps) {
  return (
    <nav className={styles.navigation} aria-label="Navigation rapide entre les sections">
      <ul className={styles.list}>
        {navigationItems.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={styles.link}
              onClick={() => onNavigate(item.id)}
              aria-current={activeSection === item.id ? "location" : undefined}
            >
              <span className={styles.dot} aria-hidden="true" />
              <span className={styles.label}>{item.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
