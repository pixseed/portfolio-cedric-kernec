import { BriefcaseIcon, GraduationCapIcon } from "@phosphor-icons/react";

import ActionLink from "../../../components/ActionLink/ActionLink";
import Card from "../../../components/Cards/Cards";
import TechnologyBadge from "../../../components/TechnologyBadge/TechnologyBadge";
import type { JourneyEntry } from "../../../types/journey";
import { formatJourneyDate } from "../../../utils/formatJourneyDate";

import styles from "./journeyItem.module.scss";

type JourneyItemProps = {
  entry: JourneyEntry;
  headingLevel?: 3 | 4 | 5 | 6;
};

// Associe chaque type d'activité à son libellé français.
// satisfies vérifie que toutes les valeurs du modèle sont couvertes.
const employmentLabels = {
  internship: "Stage",
  "fixed-term": "CDD",
  permanent: "CDI",
  "self-employed": "Indépendant",
  seasonal: "Saisonnier",
  volunteer: "Bénévolat",
  student: "Contrat étudiant",
} satisfies Record<NonNullable<JourneyEntry["employmentType"]>, string>;

export default function JourneyItem({
  entry,
  headingLevel = 3,
}: JourneyItemProps) {
  // ===============================================================
  // Derived Data
  // ===============================================================

  // Détermine l'icône, la couleur et le libellé de catégorie selon le type d'étape.
  const isEducation = entry.type === "education";

  // Regroupe les informations d'emploi renseignées : statut, précision et temps de travail.
  // Les valeurs absentes sont retirées avant de réunir les libellés dans l'affichage.
  const employmentDetails = [
    entry.employmentType ? employmentLabels[entry.employmentType] : undefined,
    entry.employmentNote,
    entry.workTime === "part-time"
      ? "Temps partiel"
      : entry.workTime === "full-time"
        ? "Temps plein"
        : undefined,
  ].filter(Boolean);

  // ===============================================================
  // Return
  // ===============================================================

  // Card gère la présentation commune (icône, surtitre, titre et description).
  // JourneyItem compose les informations propres au parcours dans ses children.
  // Le regroupement par année et le placement sur l'axe restent à la charge de Journey.
  return (
    <Card
      icon={isEducation ? GraduationCapIcon : BriefcaseIcon}
      title={entry.title}
      description={entry.description}
      accent={isEducation ? "secondary" : "primary"}
      variant="compact"
      iconPosition="header"
      headingLevel={headingLevel}
      eyebrow={
        // Le surtitre précise la catégorie, en complément de l'icône et de la couleur.
        <p className={styles.category}>
          {isEducation
            ? "Formation"
            : entry.employmentType === "volunteer"
              ? "Expérience bénévole"
              : "Expérience professionnelle"}
        </p>
      }
    >
      {/* Informations de contexte : organisme, nature de l'activité et période. */}
      <div className={styles.organizationGroup}>
        {/* Le nom devient un lien uniquement lorsqu'une destination est renseignée. */}
        {entry.organization.url ? (
          <ActionLink
            label={entry.organization.name}
            href={entry.organization.url}
            variant="secondary"
            external
            showExternalIcon
            appearance="text"
          />
        ) : (
          <p className={styles.organizationName}>{entry.organization.name}</p>
        )}
        {/* Les informations d'emploi sont facultatives, notamment pour les formations. */}
        {employmentDetails.length > 0 && (
          <p className={styles.employmentDetails}>
            {employmentDetails.join(" │ ")}
          </p>
        )}
        {/* Un libellé spécifique remplace les dates, par exemple pour plusieurs saisons.
            Sinon, les dates sont formatées, sans répéter un mois identique ni exiger une fin. */}
        <p className={styles.period}>
          {entry.periodLabel ? (
            entry.periodLabel
          ) : (
            <>
              <time dateTime={entry.startDate}>
                {formatJourneyDate(entry.startDate)}
              </time>
              {entry.endDate !== entry.startDate && (
                <>
                  {" ─ "}
                  {entry.endDate ? (
                    <time dateTime={entry.endDate}>
                      {formatJourneyDate(entry.endDate)}
                    </time>
                  ) : (
                    "aujourd'hui"
                  )}
                </>
              )}
            </>
          )}
        </p>
      </div>
      {/* Outils associés : réutilisation des badges du référentiel partagé. */}
      {entry.technologies && entry.technologies.length > 0 && (
        <ul className={styles.technologies}>
          {entry.technologies.map((technology) => (
            <li key={technology.name}>
              <TechnologyBadge technology={technology} variant="compact" />
            </li>
          ))}
        </ul>
      )}
      {/* Liens complémentaires distincts de celui de l'organisme, par exemple ses réseaux sociaux. */}
      {entry.links && entry.links.length > 0 && (
        <ul className={styles.links}>
          {entry.links.map((link) => (
            <li key={link.href}>
              <ActionLink
                label={link.label}
                href={link.href}
                variant="secondary"
                external
                showExternalIcon
              />
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
