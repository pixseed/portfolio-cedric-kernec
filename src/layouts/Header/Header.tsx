import Navbar from '../../components/Navbar/Navbar';
import { requestSectionNavigation } from '../../utils/requestSectionNavigation';

import logo from '../../assets/images/logos/pixseed-logo-full.webp';

import styles from './header.module.scss';

/**
 * Synchronise la Navbar avec la destination du logo.
 * Le lien #home assure ensuite le retour à l'accueil.
 */
function handleLogoClick() {
  requestSectionNavigation("home");
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
