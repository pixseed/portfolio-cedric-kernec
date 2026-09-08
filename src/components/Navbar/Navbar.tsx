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
  const [activeIndicatorStyle, setActiveIndicatorStyle] = useState({
    left: 0,
    width: 0,
  });
  const navbarRef = useRef<HTMLElement>(null);
  const desktopMenuRef = useRef<HTMLUListElement>(null);

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

  /*
   * Observe les sections de la page afin de :
   * - identifier la section actuellement visible ;
   * - mettre à jour le lien actif dans la navigation ;
   * - arrêter l'observation au démontage du composant.
   */
  useEffect(() => {
    const sections = document.querySelectorAll("section");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.intersectionRatio >= 0.5) {
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

  /*
   * Positionne l'indicateur visuel sur le lien actif :
   * - récupère les dimensions du lien actif ;
   * - calcule sa position par rapport au menu ;
   * - adapte la position et la largeur de l'indicateur.
   */
  useEffect(() => {
    const menu = desktopMenuRef.current;

    if (!menu) return;

    const activeLink = menu.querySelector(`a[href="#${activeSection}"]`);

    if (!activeLink) return;

    function updateIndicator(
      menuElement: HTMLUListElement,
      activeLinkElement: Element,
    ) {
      const activeLinkRect = activeLinkElement.getBoundingClientRect();
      const menuRect = menuElement.getBoundingClientRect();

      setActiveIndicatorStyle({
        left: activeLinkRect.left - menuRect.left,
        width: activeLinkRect.width,
      });
    }

    updateIndicator(menu, activeLink);

    const resizeObserver = new ResizeObserver(() => {
      updateIndicator(menu, activeLink);
    });

    resizeObserver.observe(activeLink);

    return () => {
      resizeObserver.disconnect();
    };
  }, [activeSection]);

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

      <ul ref={desktopMenuRef} className={styles.desktopMenu}>
        <li
          className={styles.activeIndicator}
          aria-hidden="true"
          style={{
            left: activeIndicatorStyle.left,
            width: activeIndicatorStyle.width,
          }}
        />
        <li>
          <a
            href="#home"
            className={activeSection === "home" ? styles.active : ""}
          >
            <img src={pixelsLogo} alt="" className={styles.pixelsLogo} />
            <span>Accueil</span>
          </a>
        </li>
        <li>
          <a
            href="#about"
            className={activeSection === "about" ? styles.active : ""}
          >
            <img src={pixelsLogo} alt="" className={styles.pixelsLogo} />
            <span>À propos</span>
          </a>
        </li>
        <li>
          <a
            href="#journey"
            className={activeSection === "journey" ? styles.active : ""}
          >
            <img src={pixelsLogo} alt="" className={styles.pixelsLogo} />
            <span>Parcours</span>
          </a>
        </li>
        <li>
          <a
            href="#projects"
            className={activeSection === "projects" ? styles.active : ""}
          >
            <img src={pixelsLogo} alt="" className={styles.pixelsLogo} />
            <span>Projets</span>
          </a>
        </li>
        <li>
          <a
            href="#skills"
            className={activeSection === "skills" ? styles.active : ""}
          >
            <img src={pixelsLogo} alt="" className={styles.pixelsLogo} />
            <span>Compétences</span>
          </a>
        </li>
        <li>
          <a
            href="#contact"
            className={activeSection === "contact" ? styles.active : ""}
          >
            <img src={pixelsLogo} alt="" className={styles.pixelsLogo} />
            <span>Contact</span>
          </a>
        </li>
      </ul>
    </nav>
  );
}
