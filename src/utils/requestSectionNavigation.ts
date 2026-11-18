/**
 * Signale à la Navbar la destination d'un lien extérieur à son menu.
 *
 * La Navbar active immédiatement cette destination et la conserve pendant
 * le défilement, sans activer successivement les sections traversées.
 * Cette fonction ne déclenche pas le défilement : le lien natif s'en charge.
 */
export function requestSectionNavigation(sectionId: string): void {
  window.dispatchEvent(
    new CustomEvent("navigation-request", {
      detail: sectionId,
    }),
  );
}
