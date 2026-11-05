import type { SimpleIcon } from "simple-icons";

export type Technology = {
  name: string;
  icon?: SimpleIcon;
  iconLabel?: string;

  /** Couleur de référence sans icône Simple Icons : six caractères hexadécimaux, sans "#". */
  color?: string;

  /** Couleur alternative du variant compact : six caractères hexadécimaux, sans "#". */
  displayColor?: string;
  
  link: string;
};
