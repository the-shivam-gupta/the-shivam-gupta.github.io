"use client";

import { site } from "@/data/site";
import { scrollToTarget } from "@/lib/lenis-instance";
import { BackToTop } from "./BackToTop";
import styles from "./styles.module.scss";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div className={styles.brand}>
          <button
            type="button"
            className={styles.logo}
            onClick={() => scrollToTarget("#top")}
            aria-label="Back to top"
          >
            {site.shortName}
            <span className={styles.logoDot} aria-hidden="true">
              .
            </span>
          </button>
          <p className={styles.tagline}>{site.tagline}</p>
        </div>

        <nav className={styles.nav} aria-label="Footer">
          {site.nav.map((item) => (
            <button
              key={item.href}
              type="button"
              className={styles.navLink}
              onClick={() => scrollToTarget(item.href)}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      <div className={styles.bottom}>
        <p className={styles.copyright}>
          © {year} {site.name}. All rights reserved.
        </p>
        <BackToTop />
      </div>
    </footer>
  );
}