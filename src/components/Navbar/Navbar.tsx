import styles from "./navbar.module.scss";

import pixelsLogo from "../../assets/images/logos/pixseed-logo-pixels.png";
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
  const [activeSection, setActiveSection] = useState("home");
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

  useEffect(() => {
    const sections = document.querySelectorAll("section");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: 0.5,
      },
    );

    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

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

      <ul className={styles.desktopMenu}>
        <li>
          <a href="#home" className={activeSection === "home" ? styles.active : ""}>
            {activeSection === "home" && <img src={pixelsLogo} alt="" />}
            Accueil
          </a>
        </li>
        <li>
          <a href="#about" className={activeSection === "about" ? styles.active : ""}>
            {activeSection === "about" && <img src={pixelsLogo} alt="" />}
            À propos
          </a>
        </li>
        <li>
          <a href="#journey" className={activeSection === "journey" ? styles.active : ""}>
            {activeSection === "journey" && <img src={pixelsLogo} alt="" />}
            Parcours
          </a>
        </li>
        <li>
          <a href="#projects" className={activeSection === "projects" ? styles.active : ""}>
            {activeSection === "projects" && <img src={pixelsLogo} alt="" />}
            Projets
          </a>
        </li>
        <li>
          <a href="#skills" className={activeSection === "skills" ? styles.active : ""}>
            {activeSection === "skills" && <img src={pixelsLogo} alt="" />}
            Compétences
          </a>
        </li>
        <li>
          <a href="#contact" className={activeSection === "contact" ? styles.active : ""}>
            {activeSection === "contact" && <img src={pixelsLogo} alt="" />}
            Contact
          </a>
        </li>
      </ul>
    </nav>
  );
}
