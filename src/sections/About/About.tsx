import Card from "../../components/Cards/Cards";
import styles from "./about.module.scss";

import { axisItems } from "./aboutData";

export default function About() {
  return (
    <section id="about" className={`${styles.section} page-section`}>
      <div className="container section-content">
        <h2 className="section-title">À propos</h2>
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
              <Card
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
