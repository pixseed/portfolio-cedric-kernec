import {
  DownloadSimpleIcon,
  ArrowRightIcon,
  LinkedinLogoIcon,
  GithubLogoIcon,
} from "@phosphor-icons/react";

import ActionLink from "../../components/ActionLink/ActionLink";
import SocialLink from "../../components/SocialLink/SocialLink";

import avatar from "../../assets/images/hero/hero-mascot.png";

import styles from "./hero.module.scss";

export default function Hero() {
  return (
    <section className={styles.section}>
      <div className={`${styles.hero} container`}>
        <div className={styles.content} data-intro-layer="hero-content">
          <div className={styles.presentation}>
            <h1 className={styles.identity}>
              <span className={styles.firstname}>Cédric</span>
              <span className={styles.lastname}>Kernec</span>
            </h1>
            <h2 className={styles.title}>Développeur Web & Web Mobile</h2>
            <p className={styles.description}>
              Je conçois des applications modernes et fonctionnelles, avec une
              attention particulière portée à l'expérience utilisateur et à la
              qualité du code.
            </p>
          </div>
          <div className={styles.cta}>
            <ActionLink
              label="Télécharger mon CV"
              href="/documents/cv-cedric-kernec.pdf"
              download="CV-Cedric-Kernec"
              icon={DownloadSimpleIcon}
            />
            <ActionLink
              label="Me contacter"
              href="#contact"
              variant="secondary"
              icon={ArrowRightIcon}
              iconPosition="right"
            />
          </div>
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

        <div className={styles.avatar} data-intro-layer="hero-avatar">
          <img src={avatar} alt="" />

          <figure className={styles.codePanel}>
            <figcaption className={styles.codePanelTitle}>
              developer.ts
            </figcaption>
            <pre className={styles.codePanelContent}>
              <code>
                <span className={styles.codeKeyword}>const</span>
                {" developer = {\n"}
                {"  name: "}
                <span className={styles.codeString}>"Cédric Kernec"</span>
                {",\n  focus: ["}
                <span className={styles.codeString}>"Front-end"</span>
                {", "}
                <span className={styles.codeString}>"Back-end"</span>
                {"],\n  approach: "}
                <span className={styles.codeString}>
                  "Comprendre, concevoir, développer"
                </span>
                {",\n  openToWork: "}
                <span className={styles.codeBoolean}>true</span>
                {",\n};"}
              </code>
            </pre>
          </figure>
        </div>
      </div>
    </section>
  );
}
