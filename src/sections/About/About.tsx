import styles from "./about.module.scss";

import type { Icon } from "@phosphor-icons/react";
import { CodeIcon, BrainIcon, RocketLaunchIcon } from "@phosphor-icons/react";

import AboutAxis from "./AboutAxis/AboutAxis";

/*
 * Décrit les données nécessaires à l'affichage d'un axe
 * de la section À propos.
 */
type AxisItem = {
  id: string;
  number: string;
  icon: Icon;
  title: string;
  description: string;
};

/*
 * Source unique des axes présentés dans la section.
 *
 * Chaque entrée est transmise au composant `AboutAxis`
 * afin de générer les cartes sans dupliquer leur structure.
 */
const axisItems: AxisItem[] = [
  {
    id: "quality",
    number: "01",
    icon: CodeIcon,
    title: "Rigueur & qualité",
    description:
      "Attentif aux détails, j'accorde de l'importance à un code clair, structuré et maintenable, ainsi qu'à une organisation rigoureuse du projet.",
  },
  {
    id: "learning",
    number: "02",
    icon: BrainIcon,
    title: "Comprendre & apprendre",
    description:
      "Curieux et toujours en quête d'apprentissage, j'aime comprendre le fonctionnement des outils que j'utilise plutôt que simplement appliquer une solution.",
  },
  {
    id: "building",
    number: "03",
    icon: RocketLaunchIcon,
    title: "Construire de A à Z",
    description:
      "J'apprécie suivre un projet dans son ensemble, de sa conception jusqu'à sa réalisation et son évolution.",
  },
];

export default function About() {
  return (
    <section id="about" className={`${styles.section} page-section`}>
      <div className="container section-content">
        <h2 className={styles.title}>À propos</h2>
        <div className={styles.content}>
          {/* Introduction */}
          <div className={styles.introduction}>
            <div className={styles.introContent}>
              <h3 className={styles.subtitle}>
                Mon approche en <span className="gradient-text">3 axes</span>
              </h3>
              <div className={styles.description}>
                <p>
                  Je m'oriente vers un profil full-stack, attiré par la
                  diversité du développement et la possibilité de concevoir un
                  projet dans son ensemble.
                </p>
                <p>
                  J'accorde également une attention particulière au front-end et
                  à l'UX/UI, où la technique rencontre directement l'expérience
                  utilisateur.
                </p>
              </div>
            </div>
          </div>

          {/* Axes */}
          <div className={styles.axes}>
            {axisItems.map((item) => (
              <AboutAxis
                key={item.id}
                icon={item.icon}
                number={item.number}
                title={item.title}
                description={item.description}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
