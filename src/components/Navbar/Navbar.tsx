import styles from "./navbar.module.scss";

import logo from "../../assets/images/logos/pixseed-logo-icon.png";
import {
  ListIcon,
  XIcon,
  EnvelopeIcon,
  UserIcon,
  PathIcon,
  FolderOpenIcon,
  CodeIcon,
} from "@phosphor-icons/react";

import { useEffect, useState, useRef } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navbarRef = useRef<HTMLElement>(null);

  function handleMenuToggle() {
    setIsOpen((prev) => !prev);
  }

  function handleLinkClick() {
    setIsOpen(false);
  }

  /*
   * Lorsque le menu est ouvert :
   * - ferme la navigation lors d'un clic extérieur ;
   * - ferme la navigation avec la touche Escape ;
   * - nettoie les écouteurs à la fermeture ou au démontage.
   */
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        navbarRef.current &&
        !navbarRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    function handleEscapeKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscapeKey);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isOpen]);

  return (
    <nav
      ref={navbarRef}
      className={styles.navbar}
      aria-label="Navigation principale"
    >
      <a href="#home" onClick={handleLinkClick} className={styles.mainLink}>
        <img src={logo} alt="Accueil" />
      </a>

      <button
        type="button"
        className={styles.menuToggle}
        onClick={handleMenuToggle}
        aria-label={
          isOpen
            ? "Fermer le menu de navigation"
            : "Ouvrir le menu de navigation"
        }
        aria-expanded={isOpen}
        aria-controls="secondary-navigation"
      >
        {isOpen ? <XIcon /> : <ListIcon />}
        <span>Menu</span>
      </button>

      <a href="#contact" onClick={handleLinkClick} className={styles.mainLink}>
        <EnvelopeIcon />
        <span>Contact</span>
      </a>

      <ul
        id="secondary-navigation"
        className={`${styles.menu} ${isOpen ? styles.open : ""}`}
      >
        <li>
          <a href="#about" onClick={handleLinkClick}>
            <UserIcon />
            <span>À propos</span>
          </a>
        </li>
        <li>
          <a href="#journey" onClick={handleLinkClick}>
            <PathIcon />
            <span>Parcours</span>
          </a>
        </li>
        <li>
          <a href="#projects" onClick={handleLinkClick}>
            <FolderOpenIcon />
            <span>Projets</span>
          </a>
        </li>
        <li>
          <a href="#skills" onClick={handleLinkClick}>
            <CodeIcon />
            <span>Compétences</span>
          </a>
        </li>
      </ul>
    </nav>
  );
}
