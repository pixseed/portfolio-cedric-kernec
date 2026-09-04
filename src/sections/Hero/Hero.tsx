import styles from './hero.module.scss';

import avatar from '../../assets/images/hero-avatar.png';

import ActionLink from '../../components/ActionLink/ActionLink';
import SocialLink from '../../components/SocialLink/SocialLink';

import {
  DownloadSimpleIcon,
  ArrowRightIcon,
  LinkedinLogoIcon,
  GithubLogoIcon,
} from '@phosphor-icons/react';

export default function Hero() {
  return (
    <section id="home" className={`${styles.section} page-section`}>
      <div className={`${styles.hero} container`}>
        <div className={styles.content}>
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
          <div className={styles.cta}>
            <ActionLink
              label="Télécharger mon CV"
              href="/documents/cv-cedric-kernec.pdf"
              download='CV-Cedric-Kernec'
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

        <div className={styles.avatar}>
          <img src={avatar} alt="" />
        </div>
      </div>
    </section>
  );
}
