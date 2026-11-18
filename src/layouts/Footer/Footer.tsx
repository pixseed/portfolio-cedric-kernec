import {
  ArrowUpIcon,
  DownloadSimpleIcon,
  GithubLogoIcon,
  LinkedinLogoIcon,
} from "@phosphor-icons/react";

import ActionLink from "../../components/ActionLink/ActionLink";
import SocialLink from "../../components/SocialLink/SocialLink";
import { requestSectionNavigation } from "../../utils/requestSectionNavigation";

import styles from "./footer.module.scss";

/**
 * Synchronise la Navbar avec la destination du lien « Retour en haut ».
 * Le lien #home assure ensuite le retour à l'accueil.
 */
function handleBackToTopClick() {
  requestSectionNavigation("home");
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`${styles.content} container`}>
        {/* Identité et actions principales */}
        <div className={styles.main}>
          <div className={styles.identity}>
            <p className={styles.name}>Cédric Kernec</p>
            <p className={styles.profession}>Développeur web & web mobile</p>
          </div>
          <div className={styles.actions}>
            <ActionLink
              label="Télécharger mon CV"
              href="/documents/cv-cedric-kernec.pdf"
              download="CV-Cedric-Kernec"
              icon={DownloadSimpleIcon}
              appearance="text"
            />

            <ActionLink
              label="Retour en haut"
              href="#home"
              icon={ArrowUpIcon}
              appearance="text"
              onClick={handleBackToTopClick}
            />
          </div>
        </div>
        {/* Copyright et réseaux sociaux */}
        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © {currentYear} Cédric Kernec · PixSeed
          </p>

          <div className={styles.socialMedia}>
            <SocialLink
              href="https://www.linkedin.com/in/cedric-kernec"
              ariaLabel="LinkedIn"
              icon={LinkedinLogoIcon}
            />

            <SocialLink
              href="https://github.com/pixseed"
              ariaLabel="GitHub"
              icon={GithubLogoIcon}
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
