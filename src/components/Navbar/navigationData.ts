import type { Icon } from "@phosphor-icons/react";

import {
  HouseIcon,
  EnvelopeIcon,
  UserIcon,
  PathIcon,
  FolderOpenIcon,
  CodeIcon,
} from "@phosphor-icons/react";

/*
 * Décrit la structure commune d'un lien de navigation.
 *
 * Les propriétés `tabletDropdown`, `tabletOptional` et `mobileDropdown`
 * déterminent où afficher chaque lien selon la taille de l'écran,
 * sans dupliquer les données de navigation dans le JSX.
 */
export type NavigationItem = {
  id: string;
  label: string;
  tabletDropdown: boolean;
  tabletOptional: boolean;
  mobileDropdown: boolean;
  icon: Icon;
};

/*
 * Source unique des données de navigation.
 *
 * Chaque entrée correspond à une section de la page dont l'attribut `id`
 * doit correspondre à la propriété `id` définie ici.
 */
export const navigationItems: NavigationItem[] = [
  {
    id: "home",
    label: "Accueil",
    tabletDropdown: false,
    tabletOptional: false,
    mobileDropdown: false,
    icon: HouseIcon,
  },
  {
    id: "about",
    label: "À propos",
    tabletDropdown: true,
    tabletOptional: true,
    mobileDropdown: true,
    icon: UserIcon,
  },
  {
    id: "journey",
    label: "Parcours",
    tabletDropdown: true,
    tabletOptional: false,
    mobileDropdown: true,
    icon: PathIcon,
  },
  {
    id: "projects",
    label: "Projets",
    tabletDropdown: false,
    tabletOptional: false,
    mobileDropdown: true,
    icon: FolderOpenIcon,
  },
  {
    id: "skills",
    label: "Compétences",
    tabletDropdown: true,
    tabletOptional: false,
    mobileDropdown: true,
    icon: CodeIcon,
  },
  {
    id: "contact",
    label: "Contact",
    tabletDropdown: false,
    tabletOptional: false,
    mobileDropdown: false,
    icon: EnvelopeIcon,
  },
];