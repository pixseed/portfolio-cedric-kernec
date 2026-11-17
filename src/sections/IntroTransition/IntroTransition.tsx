import type { FocusEvent } from "react";

import Hero from "../Hero/Hero";
import About from "../About/About";

import styles from "./introTransition.module.scss";

/** Regroupe les sections coordonnées par la transition d'introduction */
export default function IntroTransition() {
  /**
   * Ramène la scène d'Accueil à son début lorsqu'un de ses liens
   * reçoit un focus visible pendant la présentation sticky.
   */
  function handleFocusCapture(event: FocusEvent<HTMLDivElement>) {
    const target = event.target;

    if (!(target instanceof HTMLElement)) return;

    // Évite de déplacer la page lors d'un simple clic à la souris.
    if (!target.matches(":focus-visible")) return;

    const heroContent = target.closest<HTMLElement>(
      '[data-intro-layer="hero-content"]',
    );

    if (!heroContent) return;

    // Sans sticky, le navigateur conserve son défilement de focus habituel.
    const heroSection = heroContent.closest("section");

    if (!heroSection || getComputedStyle(heroSection).position !== "sticky") {
      return;
    }

    event.currentTarget.scrollIntoView({
      block: "start",
      behavior: "instant",
    });
  }
  return (
    <div
      id="home"
      className={styles.scrollTrack}
      onFocusCapture={handleFocusCapture}
    >
      {/* Scène commune à Accueil et À propos */}
      <div className={styles.scene}>
        <Hero />
        <About />
      </div>
    </div>
  );
}
