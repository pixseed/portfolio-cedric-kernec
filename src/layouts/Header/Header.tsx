import styles from './header.module.scss';

import Navbar from '../../components/Navbar/Navbar';

import logo from '../../assets/images/logos/pixseed-logo-full.png';

/*
 * Informe la Navbar qu'une navigation vers l'accueil est déclenchée
 * depuis le logo du Header.
 *
 * L'événement personnalisé permet à la Navbar de mettre immédiatement
 * à jour son état actif avant le défilement vers la section `home`.
 */
function handleLogoClick() {
  window.dispatchEvent(
    new CustomEvent("navigation-request", {
      detail: "home",
    }),
  );
}

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={`${styles.headerContent} container`}>
        <a href='#home' onClick={handleLogoClick} className={styles.logo}>
          <img src={logo} alt='PixSeed' />
        </a>
        <Navbar />
      </div>
    </header>
  );
}
