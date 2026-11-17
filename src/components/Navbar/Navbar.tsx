import { useEffect, useState, useRef } from "react";

import pixelsLogo from "../../assets/images/logos/pixseed-logo-pixels.png";

import { PlusIcon, ListIcon, XIcon } from "@phosphor-icons/react";
import type { NavigationItem } from "./navigationData";
import { navigationItems } from "./navigationData";

import styles from "./navbar.module.scss";

// ===============================================================
// Navigation types and data
// ===============================================================

/*
 * Représente la disposition responsive actuelle de la navigation.
 *
 * Cette valeur permet à la logique React de rester synchronisée
 * avec les changements de disposition définis dans les styles.
 */
type NavigationLayout = "tablet" | "tablet-large" | "desktop";

/*
 * Recherche un élément de navigation à partir de son identifiant.
 *
 * Une erreur explicite est levée si l'identifiant demandé n'existe pas,
 * afin d'éviter de manipuler une valeur `undefined`.
 */
function getNavigationItem(id: string): NavigationItem {
  const item = navigationItems.find((item) => item.id === id);

  if (!item) {
    throw new Error(`Navigation item "${id}" not found.`);
  }

  return item;
}

/*
 * Accueil et Contact possèdent une position spécifique dans la navbar mobile,
 * mais leurs données restent issues de la source commune.
 */
const homeItem = getNavigationItem("home");
const contactItem = getNavigationItem("contact");
const HomeIcon = homeItem.icon;
const ContactIcon = contactItem.icon;

/*
 * Crée une media query à partir d'un breakpoint exposé par les styles.
 *
 * La valeur est récupérée depuis une custom property CSS afin de conserver
 * une source de vérité commune entre Sass et la logique React.
 */
function getMediaQuery(breakpoint: string): MediaQueryList {
  const breakpointValue = getComputedStyle(document.documentElement)
    .getPropertyValue(breakpoint)
    .trim();

  return window.matchMedia(`(min-width: ${breakpointValue})`);
}

/*
 * Détermine la disposition actuelle de la navigation à partir
 * des breakpoints responsive, du plus large au plus petit.
 */
function getNavigationLayout(): NavigationLayout {
  if (getMediaQuery("--breakpoint-desktop").matches) {
    return "desktop";
  }

  if (getMediaQuery("--breakpoint-tablet-lg").matches) {
    return "tablet-large";
  }

  return "tablet";
}

export default function Navbar() {
  // ===============================================================
  // State
  // ===============================================================

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isTabletDropdownOpen, setIsTabletDropdownOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [navigationLayout, setNavigationLayout] =
    useState<NavigationLayout>(getNavigationLayout);

  /*
   * Position et dimensions des indicateurs visuels de section active.
   * Ces valeurs sont calculées dynamiquement à partir des éléments du DOM.
   */
  const [activeIndicatorStyle, setActiveIndicatorStyle] = useState({
    left: 0,
    width: 0,
  });

  const [dropdownIndicatorStyle, setDropdownIndicatorStyle] = useState({
    top: 0,
  });

  const [isDropdownIndicatorVisible, setIsDropdownIndicatorVisible] =
    useState(false);

  // ===============================================================
  // Refs
  // ===============================================================

  /*
   * Référence vers les éléments du DOM nécessaires aux calculs
   * de position et à la détection des clics extérieurs.
   */
  const navbarRef = useRef<HTMLElement>(null);
  const primaryMenuRef = useRef<HTMLUListElement>(null);
  const tabletDropdownRef = useRef<HTMLUListElement>(null);

  /**
   * Mémorise la destination d'une navigation par clic.
   *
   * Pendant le défilement automatique, le suivi conserve cette destination
   * pour éviter d'activer successivement les sections intermédiaires.
   * `null` indique qu'aucune destination n'est en attente.
   */
  const navigationTargetRef = useRef<string | null>(null);

  // ===============================================================
  // Derived data
  // ===============================================================

  /*
   * Détermine si la section active appartient actuellement
   * au dropdown de navigation tablette.
   *
   * En mode `tablet-large`, les éléments `tabletOptional` rejoignent
   * le menu principal. En mode `desktop`, le dropdown disparaît entièrement.
   *
   * Cette information permet notamment de déterminer si l'indicateur
   * du menu principal doit cibler le bouton "+" ou le lien actif.
   */
  const isDropdownSectionActive = navigationItems.some(
    (item) =>
      item.tabletDropdown &&
      item.id === activeSection &&
      navigationLayout !== "desktop" &&
      (navigationLayout === "tablet" || !item.tabletOptional),
  );

  // ===============================================================
  // Handlers
  // ===============================================================

  function handleMobileMenuToggle() {
    setIsMobileMenuOpen((prev) => !prev);
  }

  function handleMobileLinkClick() {
    setIsMobileMenuOpen(false);
  }

  function handleTabletDropdownToggle() {
    setIsTabletDropdownOpen((prev) => !prev);
  }

  function handleTabletDropdownLinkClick(id: string) {
    setIsTabletDropdownOpen(false);
    handleNavigationClick(id);
  }

  /*
   * Lors d'un clic sur un lien, active immédiatement la destination
   * et la mémorise jusqu'à ce que le scroll automatique l'atteigne.
   */
  function handleNavigationClick(id: string) {
    navigationTargetRef.current = id;
    setActiveSection(id);
  }

  // ===============================================================
  // Effects
  // ===============================================================

  /*
   * Ferme les menus de navigation ouverts lors d'un clic extérieur
   * ou lorsque l'utilisateur appuie sur Escape.
   *
   * Les écouteurs ne sont actifs que lorsqu'au moins un menu est ouvert
   * et sont supprimés dès qu'ils ne sont plus nécessaires.
   */
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        navbarRef.current &&
        !navbarRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
        setIsTabletDropdownOpen(false);
      }
    }

    function handleEscapeKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsMobileMenuOpen(false);
        setIsTabletDropdownOpen(false);
      }
    }

    if (isMobileMenuOpen || isTabletDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscapeKey);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isMobileMenuOpen, isTabletDropdownOpen]);

  /**
   * Synchronise la navbar avec les ancres, indépendamment des animations visuelles.
   *
   * La section active est la dernière dont le début a franchi le repère situé
   * à 40 % de la hauteur de la fenêtre. Les ancres doivent être ordonnées
   * dans navigationItems comme elles apparaissent dans la page.
   *
   * Pendant une navigation par clic, l'indicateur reste sur la destination
   * jusqu'à ce qu'elle soit atteinte.
   *
   * Les calculs sont regroupés avec requestAnimationFrame lors du scroll
   * et du redimensionnement. Les écouteurs et le calcul en attente sont nettoyés
   * au démontage.
   */
  useEffect(() => {
    const sections = navigationItems
      .map((item) => document.getElementById(item.id))
      // Retire les ancres absentes et précise à TypeScript que les éléments restants sont des HTMLElement.
      .filter((section): section is HTMLElement => section !== null);

    // Mémorise le calcul planifié pour éviter d'en programmer plusieurs à la fois.
    let frameId: number | null = null;

    function updateActiveSection() {
      frameId = null;

      const activationLine = window.innerHeight * 0.4;
      let currentSection = sections[0];

      // Retient la dernière section dont le début a franchi le repère.
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= activationLine) {
          currentSection = section;
        }
      }

      if (!currentSection) return;

      const navigationTarget = navigationTargetRef.current;

      // Pendant une navigation par clic, attend d'atteindre la destination.
      if (navigationTarget) {
        if (currentSection.id !== navigationTarget) return;

        navigationTargetRef.current = null;
      }

      setActiveSection(currentSection.id);
    }

    function scheduleUpdate() {
      // Regroupe les événements rapprochés dans une seule mise à jour.
      if (frameId !== null) return;

      frameId = window.requestAnimationFrame(updateActiveSection);
    }

    // Initialise l'indicateur, notamment si la page est déjà défilée à l'ouverture.
    updateActiveSection();

    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);

      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, []);

  /**
   * Libère la destination mémorisée lorsque l'utilisateur reprend
   * manuellement le défilement.
   */
  useEffect(() => {
    function cancelNavigationTarget() {
      navigationTargetRef.current = null;
    }

    function handleScrollKey(event: KeyboardEvent) {
      const scrollKeys = [
        "ArrowUp",
        "ArrowDown",
        "PageUp",
        "PageDown",
        "Home",
        "End",
        " ",
      ];

      if (scrollKeys.includes(event.key)) {
        cancelNavigationTarget();
      }
    }

    window.addEventListener("wheel", cancelNavigationTarget, { passive: true });
    window.addEventListener("touchstart", cancelNavigationTarget, {
      passive: true,
    });
    window.addEventListener("keydown", handleScrollKey);

    return () => {
      window.removeEventListener("wheel", cancelNavigationTarget);
      window.removeEventListener("touchstart", cancelNavigationTarget);
      window.removeEventListener("keydown", handleScrollKey);
    };
  }, []);

  /*
   * Positionne l'indicateur sous l'élément actif du menu principal.
   *
   * Si la section active appartient au dropdown tablette, l'indicateur
   * cible le bouton "+" plutôt que le lien correspondant masqué.
   *
   * Le ResizeObserver recalcule sa position lorsque la largeur de l'élément
   * actif évolue, notamment lors de l'apparition du logo et du changement
   * de taille appliqués à l'état actif.
   */
  useEffect(() => {
    const menu = primaryMenuRef.current;

    if (!menu) return;

    const activeElement = isDropdownSectionActive
      ? menu.querySelector(`.${styles.tabletMoreButton}`)
      : menu.querySelector(`a[href="#${activeSection}"]`);

    if (!activeElement) return;

    function updateIndicator(
      menuElement: HTMLUListElement,
      activeElement: Element,
    ) {
      const activeElementRect = activeElement.getBoundingClientRect();
      const menuRect = menuElement.getBoundingClientRect();

      setActiveIndicatorStyle({
        left: activeElementRect.left - menuRect.left,
        width: activeElementRect.width,
      });
    }

    updateIndicator(menu, activeElement);

    const resizeObserver = new ResizeObserver(() => {
      updateIndicator(menu, activeElement);
    });

    resizeObserver.observe(activeElement);

    return () => {
      resizeObserver.disconnect();
    };
  }, [activeSection, isDropdownSectionActive]);

  /*
   * Positionne verticalement l'indicateur sur le lien actif
   * à l'intérieur du dropdown tablette.
   *
   * L'indicateur reste masqué lorsque le dropdown est fermé
   * ou lorsque la section active n'en fait pas partie.
   */
  useEffect(() => {
    const dropdown = tabletDropdownRef.current;

    if (!dropdown || !isTabletDropdownOpen || !isDropdownSectionActive) {
      setIsDropdownIndicatorVisible(false);
      return;
    }

    const activeLink = dropdown.querySelector(`a[href="#${activeSection}"]`);

    if (!activeLink) {
      setIsDropdownIndicatorVisible(false);
      return;
    }

    const activeLinkRect = activeLink.getBoundingClientRect();
    const dropdownRect = dropdown.getBoundingClientRect();

    setDropdownIndicatorStyle({
      top: activeLinkRect.top - dropdownRect.top,
    });

    setIsDropdownIndicatorVisible(true);
  }, [activeSection, isTabletDropdownOpen, isDropdownSectionActive]);

  /*
   * Synchronise la disposition de la navigation avec les breakpoints
   * `tablet-lg` et `desktop`.
   *
   * Lorsqu'un breakpoint est franchi, la disposition active est recalculée
   * afin que la logique React reste cohérente avec l'affichage défini en CSS.
   *
   * Les écouteurs sont supprimés au démontage du composant.
   */
  useEffect(() => {
    const mediaQueryTabletLarge = getMediaQuery("--breakpoint-tablet-lg");
    const mediaQueryDesktop = getMediaQuery("--breakpoint-desktop");

    function handleMediaQueryChange() {
      setNavigationLayout(getNavigationLayout());
    }

    mediaQueryTabletLarge.addEventListener("change", handleMediaQueryChange);
    mediaQueryDesktop.addEventListener("change", handleMediaQueryChange);

    return () => {
      mediaQueryTabletLarge.removeEventListener(
        "change",
        handleMediaQueryChange,
      );
      mediaQueryDesktop.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  /**
   * Active et mémorise la destination demandée depuis l'extérieur
   * de la Navbar, notamment lors d'un clic sur le logo du Header.
   */
  useEffect(() => {
    function handleNavigationRequest(event: Event) {
      const customEvent = event as CustomEvent<string>;
      const id = customEvent.detail;

      navigationTargetRef.current = id;
      setActiveSection(id);
    }

    window.addEventListener("navigation-request", handleNavigationRequest);

    return () => {
      window.removeEventListener("navigation-request", handleNavigationRequest);
    };
  }, []);

  // ===============================================================
  // Helpers
  // ===============================================================

  /*
   * Retourne la classe responsive nécessaire à chaque lien du menu principal.
   *
   * Les éléments `tabletOptional` apparaissent dans le menu principal
   * à partir du layout `tablet-large`, tandis que les autres éléments
   * `tabletDropdown` n'y apparaissent qu'en desktop.
   *
   * Les liens masqués restent accessibles via le dropdown tablette.
   */
  function getPrimaryMenuItemClass(item: NavigationItem) {
    if (item.tabletOptional) {
      return styles.tabletOptional;
    }

    if (item.tabletDropdown) {
      return styles.desktopOnly;
    }

    return "";
  }

  // ===============================================================
  // Return
  // ===============================================================
  return (
    <nav
      ref={navbarRef}
      className={styles.navbar}
      aria-label="Navigation principale"
    >
      {/* Navigation principale mobile */}
      <a
        href={`#${homeItem.id}`}
        onClick={handleMobileLinkClick}
        className={styles.mainLink}
        aria-label={homeItem.label}
        aria-current={activeSection === homeItem.id ? "location" : undefined}
      >
        <HomeIcon />
        <span>{homeItem.label}</span>
      </a>

      <button
        type="button"
        className={styles.mobileMenuToggle}
        onClick={handleMobileMenuToggle}
        aria-label={
          isMobileMenuOpen
            ? "Fermer le menu de navigation"
            : "Ouvrir le menu de navigation"
        }
        aria-expanded={isMobileMenuOpen}
        aria-controls="mobile-navigation"
      >
        {isMobileMenuOpen ? <XIcon /> : <ListIcon />}
        <span>Menu</span>
      </button>

      <a
        href={`#${contactItem.id}`}
        onClick={handleMobileLinkClick}
        className={styles.mainLink}
        aria-current={activeSection === contactItem.id ? "location" : undefined}
      >
        <ContactIcon />
        <span>{contactItem.label}</span>
      </a>

      {/* Menu secondaire mobile */}
      <ul
        id="mobile-navigation"
        className={`
          ${styles.mobileDropdown}
          ${isMobileMenuOpen ? styles.open : ""}
        `}
      >
        {navigationItems
          .filter((item) => item.mobileDropdown)
          .map((item) => {
            const Icon = item.icon;

            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={handleMobileLinkClick}
                  aria-current={
                    activeSection === item.id ? "location" : undefined
                  }
                >
                  <Icon />
                  <span>{item.label}</span>
                </a>
              </li>
            );
          })}
      </ul>

      {/* Navigation principale tablette et desktop */}
      <ul ref={primaryMenuRef} className={styles.primaryMenu}>
        <li
          className={styles.activeIndicator}
          aria-hidden="true"
          style={{
            left: activeIndicatorStyle.left,
            width: activeIndicatorStyle.width,
          }}
        />

        {navigationItems.map((item) => (
          <li key={item.id} className={getPrimaryMenuItemClass(item)}>
            <a
              href={`#${item.id}`}
              onClick={() => handleNavigationClick(item.id)}
              className={activeSection === item.id ? styles.active : ""}
              aria-current={activeSection === item.id ? "location" : undefined}
            >
              <img src={pixelsLogo} alt="" className={styles.pixelsLogo} />
              <span>{item.label}</span>
            </a>
          </li>
        ))}

        <li className={styles.tabletMore}>
          <button
            type="button"
            onClick={handleTabletDropdownToggle}
            aria-expanded={isTabletDropdownOpen}
            aria-controls="tablet-dropdown"
            aria-label={
              isTabletDropdownOpen
                ? "Fermer les liens de navigation supplémentaires"
                : "Afficher les liens de navigation supplémentaires"
            }
            className={`
              ${styles.tabletMoreButton}
              ${isDropdownSectionActive ? styles.active : ""}
            `}
          >
            <PlusIcon />
          </button>
        </li>
      </ul>

      {/* Dropdown de navigation tablette */}
      <ul
        ref={tabletDropdownRef}
        id="tablet-dropdown"
        className={`
          ${styles.tabletDropdown} 
          ${isTabletDropdownOpen ? styles.open : ""}
        `}
      >
        <li
          className={`
            ${styles.dropdownActiveIndicator}
            ${isDropdownIndicatorVisible ? styles.visible : ""}
          `}
          aria-hidden="true"
          style={{
            top: dropdownIndicatorStyle.top,
          }}
        />
        {navigationItems
          .filter((item) => item.tabletDropdown)
          .map((item) => (
            <li
              key={item.id}
              className={
                item.tabletOptional ? styles.tabletDropdownOptional : ""
              }
            >
              <a
                href={`#${item.id}`}
                onClick={() => handleTabletDropdownLinkClick(item.id)}
                className={activeSection === item.id ? styles.active : ""}
                aria-current={
                  activeSection === item.id ? "location" : undefined
                }
              >
                <img src={pixelsLogo} alt="" className={styles.pixelsLogo} />
                <span>{item.label}</span>
              </a>
            </li>
          ))}
      </ul>
    </nav>
  );
}
