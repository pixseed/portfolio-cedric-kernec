import { useState } from "react";

import Toggle from "../../components/Toggle/Toggle";
import { journeyEntries } from "../../data/journeyData";
import JourneyItem from "./JourneyItem/JourneyItem";

import styles from "./journey.module.scss";

export default function Journey() {
  // ===============================================================
  // States
  // ===============================================================

  const [showFullJourney, setShowFullJourney] = useState(false);

  // ===============================================================
  // Derived Data
  // ===============================================================

  const visibleEntries = showFullJourney
    ? journeyEntries
    : journeyEntries.filter((entry) => entry.featured);

  // Set conserve une seule occurrence de chaque année, dans l’ordre des données.
  // Les données doivent rester triées par date de début décroissante : aucun tri n’est effectué ici.
  const years = [
    ...new Set(visibleEntries.map((entry) => entry.startDate.slice(0, 4))),
  ];
  const yearGroups = years.map((year) => ({
    year,
    entries: visibleEntries.filter((entry) =>
      entry.startDate.startsWith(`${year}-`),
    ),
  }));

  // ===============================================================
  // Return
  // ===============================================================

  return (
    <section id="journey" className="page-section">
      <div className="container section-content">
        <h2 className="section-title">Parcours</h2>
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
          </div>
        </div>

        <ol className={styles.timeline}>
          {yearGroups.map(({ year, entries }) => (
            <li key={year}>
              <h4 className={styles.year}>{year}</h4>
              <ol className={styles.yearEntries}>
                {entries.map((entry) => (
                  <li
                    key={entry.id}
                    className={`${styles.timelineItem} ${entry.type === "education" ? styles.education : styles.experience}`}
                  >
                    <JourneyItem entry={entry} headingLevel={5} />
                  </li>
                ))}
              </ol>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
