import type { Technology } from "./technology";

type JourneyType = "experience" | "education";

type JourneyOrganization = {
  name: string;
  url?: string;
};

type Month =
  | "01"
  | "02"
  | "03"
  | "04"
  | "05"
  | "06"
  | "07"
  | "08"
  | "09"
  | "10"
  | "11"
  | "12";

/** Date au format année-mois. le type limite les mois, sans valider complètement l'année. */
type JourneyDate = `${number}-${Month}`;

type JourneyLink = {
  label: string;
  href: string;
};

type EmploymentType =
  | "internship"
  | "fixed-term"
  | "permanent"
  | "self-employed"
  | "seasonal"
  | "volunteer"
  | "student";

export type JourneyEntry = {
  id: string;
  type: JourneyType;
  title: string;
  organization: JourneyOrganization;
  startDate: JourneyDate;
  /** Absente lorsque l'expérience ou la formation est encore en cours. */
  endDate?: JourneyDate;
  /** Remplace la période affichée. Les dates restent utilisées pour la chronologie. */
  periodLabel?: string;
  description: string;
  /** Inclut l'étape dans le parcours ciblé, visible lorsque le toggle est désactivé. */
  featured: boolean;
  technologies?: Technology[];
  links?: JourneyLink[];
  employmentType?: EmploymentType;
  employmentNote?: string;
  /** Absence de valeur : temps de travail non renseigné, sans supposer un temps plein. */
  workTime?: "full-time" | "part-time";
};
