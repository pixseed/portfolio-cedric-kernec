import styles from './header.module.scss';

import Navbar from '../../components/Navbar/Navbar';

import logo from '../../assets/images/logos/pixseed-logo-full.png';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={`${styles.headerContent} container`}>
        <a href='#home' className={styles.logo}>
          <img src={logo} alt='PixSeed' />
        </a>
        <Navbar />
      </div>
    </header>
  );
}
