/**
 * Calcule l'index suivant ou précédent dans une liste circulaire.
 *
 * @param currentIndex - Index actuel.
 * @param direction - Sens de navigation (-1 ou 1).
 * @param total - Nombre total d'éléments.
 * @returns L'index de destination.
 */
export function getCircularIndex(
  currentIndex: number,
  direction: -1 | 1,
  total: number,
): number {
  return (currentIndex + direction + total) % total;
}
