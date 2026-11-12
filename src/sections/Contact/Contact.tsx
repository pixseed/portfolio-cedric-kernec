import { EnvelopeIcon, GithubLogoIcon, LinkedinLogoIcon } from "@phosphor-icons/react";

import ActionLink from "../../components/ActionLink/ActionLink";
import ContactForm from "./ContactForm/ContactForm";

import styles from "./contact.module.scss";

export default function Contact() {
  return (
    <section id="contact" className={`${styles.section} page-section`}>
      <div className="container section-content">
        <h2 className="section-title">Contact</h2>
        <div className={styles.content}>
          <div className={styles.introduction}>
            <h3>
              Échangeons sur une{" "}
              <span className="gradient-text">opportunité</span>
            </h3>

            <p>
              Vous recrutez dans le développement web ? Je serais ravi
              d'échanger sur mon parcours, mes compétences et les besoins de
              votre équipe.
            </p>

            <ul className={styles.contactLinks}>
              <li>
                <ActionLink
                  label="Par e-mail"
                  href="mailto:cedrickernec.ck@gmail.com"
                  icon={EnvelopeIcon}
                  appearance="text"
                  variant="neutral"
                />
              </li>
              <li>
                <ActionLink
                  label="LinkedIn"
                  href="https://www.linkedin.com/in/cedric-kernec"
                  icon={LinkedinLogoIcon}
                  appearance="text"
                  variant="neutral"
                  external
                />
              </li>
              <li>
                <ActionLink
                  label="GitHub"
                  href="https://www.github.com/pixseed"
                  icon={GithubLogoIcon}
                  appearance="text"
                  variant="neutral"
                  external
                />
              </li>
            </ul>
          </div>

          <ContactForm />
        </div>
      </div>
    </section>
  );
}
