import { experience } from "@/data/experience";
import { formatNumber } from "@/lib/utils";
import styles from "./styles.module.scss";

export function Experience() {
  return (
    <section id="experience" className={styles.experience}>
      <div className={styles.head}>
        <span className={styles.label}>Experience</span>
        <h2 className={styles.title} data-reveal-lines>
          <span className="line-mask">
            <span className="line-mask-inner">THE</span>
          </span>
          <span className="line-mask">
            <span className="line-mask-inner">PATH.</span>
          </span>
        </h2>
      </div>

      <ul className={styles.list}>
        {experience.map((item, i) => (
          <li key={item.period} className={styles.item} data-reveal>
            <div className={styles.period}>
              <span className={styles.periodText}>{item.period}</span>
              <span className={styles.itemIndex}>
                {formatNumber(i + 1)}
              </span>
            </div>

            <div className={styles.main}>
              <div className={styles.roleRow}>
                <h3 className={styles.role}>{item.role}</h3>
                <p className={styles.company}>
                  {item.company} <span className={styles.dash}>-</span>{" "}
                  {item.location}
                </p>
              </div>

              <p className={styles.desc}>{item.description}</p>

              <ul className={styles.achievements}>
                {item.achievements.map((a) => (
                  <li key={a} className={styles.achievement}>
                    {a}
                  </li>
                ))}
              </ul>

              <ul className={styles.tech}>
                {item.tech.map((t) => (
                  <li key={t} className={styles.techItem}>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}