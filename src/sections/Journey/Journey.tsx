import { useState, useEffect, useRef } from "react";

import Toggle from "../../components/Toggle/Toggle";
import { journeyEntries } from "../../data/journeyData";
import JourneyItem from "./JourneyItem/JourneyItem";

import styles from "./journey.module.scss";

export default function Journey() {
  // ===============================================================
  // States
  // ===============================================================

  const [showFullJourney, setShowFullJourney] = useState(false);
  const [activeEntryId, setActiveEntryId] = useState<string | null>(null);

  // ===============================================================
  // Refs
  // ===============================================================

  const overviewRef = useRef<HTMLDivElement>(null);

  // ===============================================================
  // Derived Data
  // ===============================================================

  const visibleEntries = showFullJourney
    ? journeyEntries
    : journeyEntries.filter((entry) => entry.featured);

  // Set conserve une seule occurrence de chaque année, dans l'ordre des données.
  // Les données doivent rester triées par date de début décroissante : aucun tri n'est effectué ici.
  const years = [
    ...new Set(visibleEntries.map((entry) => entry.startDate.slice(0, 4))),
  ];
  const yearGroups = years.map((year) => ({
    year,
    entries: visibleEntries.filter((entry) =>
      entry.startDate.startsWith(`${year}-`),
    ),
  }));

  // Position de l'étape consultée dans la liste actuellement affichée.
  const activeEntryIndex = visibleEntries.findIndex(
    (entry) => entry.id === activeEntryId,
  );

  // ===============================================================
  // Effects
  // ===============================================================

  /**
   * Suit l'étape ayant franchi la ligne de lecture à 40 % de la fenêtre.
   * Actualise les éléments suivis lorsque le mode du parcours change.
   */
  useEffect(() => {
    const section = document.getElementById("journey");

    if (!section) return;

    // Sélectionne uniquement les étapes réellement affichées dans le parcours.
    const entries = Array.from(
      section.querySelectorAll<HTMLLIElement>('li[id^="journey-"]'),
    );

    let frameId: number | null = null;

    function updateActiveEntry() {
      if (!section || entries.length === 0) return;

      const activationLine = window.innerHeight * 0.4;
      const sectionBounds = section.getBoundingClientRect();

      // Aucun repère actif lorsque la ligne de lecture est hors de Parcours.
      if (
        sectionBounds.top > activationLine ||
        sectionBounds.bottom <= activationLine
      ) {
        setActiveEntryId(null);
        return;
      }

      let currentEntry = entries[0];

      // Retient la dernière étape dont le haut a franchi la ligne de lecture.
      for (const entry of entries) {
        if (entry.getBoundingClientRect().top <= activationLine) {
          currentEntry = entry;
        }
      }

      // Retire le préfixe HTML pour retrouver l'identifiant des données.
      setActiveEntryId(currentEntry.id.slice("journey-".length));
    }

    function scheduleUpdate() {
      // Regroupe les événements rapprochés dans une seule mise à jour par image.
      if (frameId !== null) return;

      frameId = window.requestAnimationFrame(() => {
        frameId = null;
        updateActiveEntry();
      });
    }

    updateActiveEntry();

    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);

      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, [showFullJourney]);

  /**
   * Maintient le repère actif dans la zone visible de l'aperçu,
   * sans faire défiler la page.
   */
  useEffect(() => {
    const overview = overviewRef.current;

    if (!overview || activeEntryId === null) return;

    function updateOverviewVisibility() {
      if (!overview) return;

      const activeLink = overview.querySelector<HTMLAnchorElement>(
        '[aria-current="step"]',
      );

      if (!activeLink || overview.clientHeight === 0) return;

      // Pour la première étape, réinitialise le défilement de l'aperçu.
      if (activeLink === overview.querySelector("a")) {
        overview.scrollTo({
          top: 0,
          behavior: "instant",
        });
        return;
      }

      const overviewBounds = overview.getBoundingClientRect();
      const linkBounds = activeLink.getBoundingClientRect();

      // Ramène le repère visible s'il dépasse au-dessus de l'aperçu.
      if (linkBounds.top < overviewBounds.top) {
        overview.scrollBy({
          top: linkBounds.top - overviewBounds.top,
          behavior: "instant",
        });
      } else if (linkBounds.bottom > overviewBounds.bottom) {
        // Même correction lorsqu'il dépasse en dessous.
        overview.scrollBy({
          top: linkBounds.bottom - overviewBounds.bottom,
          behavior: "instant",
        });
      }
    }

    updateOverviewVisibility();

    // Recalcule aussi lorsque la zone visible change de dimensions.
    window.addEventListener("resize", updateOverviewVisibility);

    return () => {
      window.removeEventListener("resize", updateOverviewVisibility);
    };
  }, [activeEntryId, showFullJourney]);

  // ===============================================================
  // Return
  // ===============================================================

  return (
    <section id="journey">
      <div className="container section-content">
        <h2 className="visually-hidden">Parcours</h2>
        <div className={styles.header}>
          <div className={styles.introduction}>
            <h3>
              Mon <span className="gradient-text">expérience</span>{" "}
              professionnelle
            </h3>
            <p>
              Du design graphique au développement web, découvrez mes formations
              et mes expériences.
            </p>
          </div>

          <div className={styles.viewControl}>
            <Toggle
              label="Afficher le parcours complet"
              description="Inclure les expériences complémentaires"
              checked={showFullJourney}
              onChange={setShowFullJourney}
              variant="outlined"
            />

            <p className={styles.entryCount} role="status">
              {visibleEntries.length} étapes affichées sur{" "}
              {journeyEntries.length}
            </p>
          </div>
        </div>

        <div className={styles.layout}>
          <ol className={styles.timeline}>
            {yearGroups.map(({ year, entries }) => (
              <li key={year}>
                <h4 className={styles.year}>{year}</h4>
                <ol className={styles.yearEntries}>
                  {entries.map((entry) => (
                    <li
                      key={entry.id}
                      id={`journey-${entry.id}`}
                      className={`${styles.timelineItem} ${entry.type === "education" ? styles.education : styles.experience}`}
                    >
                      <JourneyItem entry={entry} headingLevel={5} />
                    </li>
                  ))}
                </ol>
              </li>
            ))}
          </ol>

          {/* Navigation vers les étapes actuellement affichées. */}
          <nav
            className={styles.overview}
            aria-label="Repères du parcours"
            data-full={showFullJourney}
          >
            <h3 className={styles.overviewTitle}>Repères</h3>
            <div className={styles.overviewViewport} ref={overviewRef}>
              <ol>
                {visibleEntries.map((entry, index) => {
                  const year = entry.startDate.slice(0, 4);
                  const previousYear = visibleEntries[
                    index - 1
                  ]?.startDate.slice(0, 4);

                  return (
                    <li key={entry.id}>
                      <a
                        className={styles.overviewLink}
                        href={`#journey-${entry.id}`}
                        data-type={entry.type}
                        aria-current={
                          activeEntryId === entry.id ? "step" : undefined
                        }
                      >
                        {/* Réserve la colonne de l'année, même lorsqu'elle n'est pas répétée. */}
                        <span
                          className={styles.overviewYear}
                          aria-hidden="true"
                        >
                          {year !== previousYear ? year : ""}
                        </span>
                        <span
                          className={styles.overviewCard}
                          aria-hidden="true"
                        />
                        <span className="visually-hidden">
                          {year} ─ {entry.title}
                        </span>
                      </a>
                    </li>
                  );
                })}
              </ol>
            </div>

            <p className={styles.overviewCount}>
              <strong>
                {activeEntryIndex >= 0
                  ? String(activeEntryIndex + 1).padStart(2, "0")
                  : "—"}
              </strong>
              {" / "}
              {String(visibleEntries.length).padStart(2, "0")} étapes
            </p>
          </nav>
        </div>
      </div>
    </section>
  );
}
