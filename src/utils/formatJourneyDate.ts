/**
 * Formate une date "YYYY-MM" en mois et année en français.
 * Exemple : "2025-07" devient "juillet 2025".
 * La valeur reçue est supposée valide, cette fonction ne la valide pas.
 */
export function formatJourneyDate(value: string): string {
  // Sépare l'année et le mois, les convertit en nombres, puis les affecte
  // aux deux variables grâce à la déstructuration du tableau.
  const [year, month] = value.split("-").map(Number);

  // Configure l'affichage français du mois en toutes lettres et de l'année.
  // Le fuseau UTC correspond à celui utilisé pour construire la date ci-dessous.
  return new Intl.DateTimeFormat("fr-FR", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(
    // Les mois JavaScript vont de 0 à 11, d'où "month - 1".
    // Le premier jour sert uniquement à construire une date : il n'est pas affiché.
    new Date(Date.UTC(year, month - 1, 1)),
  );
}
