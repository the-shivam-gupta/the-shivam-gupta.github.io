"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/animations/register";
import { prefersReducedMotion } from "@/animations/reducedMotion";
import { services } from "@/data/services";
import { cx, formatNumber } from "@/lib/utils";
import styles from "./styles.module.scss";

// Horizontal editorial gallery on desktop (pinned + scrubbed), plain
// stacked list on mobile or under reduced motion.
export function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<Array<HTMLLIElement | null>>([]);
  const descRefs = useRef<Array<HTMLParagraphElement | null>>([]);

  const [activeIndex, setActiveIndex] = useState(0);

  // Reserves the same description height across every panel so the tech
  // tags below it line up, regardless of how many lines each wraps to.
  useEffect(() => {
    const measure = () => {
      const els = descRefs.current.filter((el): el is HTMLParagraphElement => Boolean(el));
      if (els.length === 0) return;
      els.forEach((el) => {
        el.style.minHeight = "";
      });
      const max = Math.max(...els.map((el) => el.scrollHeight));
      els.forEach((el) => {
        el.style.minHeight = `${max}px`;
      });
    };

    measure();
    document.fonts?.ready?.then(measure).catch(() => {});
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Panel-by-panel fade/rise entrance, staggered by index.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      panelRefs.current.forEach((panel, i) => {
        if (!panel) return;
        gsap.from(panel, {
          opacity: 0,
          y: 28,
          duration: 0.9,
          delay: i * 0.06,
          ease: "power3.out",
          scrollTrigger: {
            trigger: panel,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  // Pin + horizontal scrub, gated to >=768px via matchMedia.
  useEffect(() => {
    const stage = stageRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;
    const progressFill = progressFillRef.current;
    if (!stage || !viewport || !track) return;
    if (prefersReducedMotion()) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const getDistance = () => Math.max(0, track.scrollWidth - viewport.clientWidth);

      gsap.to(track, {
        x: () => -getDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: stage,
          start: "top top",
          end: () => `+=${getDistance()}`,
          pin: true,
          anticipatePin: 1,
          // Small smoothing so momentum doesn't jump/snap at the pin's end.
          scrub: 0.4,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            // Direct style write, not React state - runs every scrub frame.
            if (progressFill) {
              progressFill.style.transform = `scaleX(${self.progress})`;
            }

            // Evenly spread across progress, not panel-centre distance -
            // that formula can never mark the first/last panel active.
            const idx = Math.round(self.progress * (services.length - 1));
            setActiveIndex(idx);
          },
        },
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} id="services" className={styles.services}>
      <div ref={stageRef} className={styles.stage}>
        <div className={styles.head}>
          <span className={styles.label} data-reveal="fade">
            {`Services / ${formatNumber(services.length)}`}
          </span>
        </div>

        <div ref={viewportRef} className={styles.viewport}>
          <ul ref={trackRef} className={styles.track} role="list">
            {services.map((service, i) => (
              <li
                key={service.index}
                ref={(el) => {
                  panelRefs.current[i] = el;
                }}
                className={cx(styles.panel, i === activeIndex && styles.panelActive)}
              >
                <span className={styles.panelNumber} aria-hidden="true">
                  {service.index}
                </span>

                <h3 className={styles.panelTitle}>
                  {service.title.map((line) => (
                    <span key={line} className={styles.titleLine}>
                      {line}
                    </span>
                  ))}
                </h3>

                <span className={styles.accentLine} aria-hidden="true" />

                <p
                  ref={(el) => {
                    descRefs.current[i] = el;
                  }}
                  className={styles.panelDesc}
                >
                  {service.description}
                </p>

                <ul
                  className={styles.tech}
                  aria-label={`${service.title.join(" ")} - technologies`}
                >
                  {service.technologies.map((t) => (
                    <li key={t} className={styles.techItem}>
                      {t}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.progress} aria-hidden="true">
          <span className={styles.progressIndex}>{formatNumber(activeIndex + 1)}</span>
          <div className={styles.progressTrack}>
            <div ref={progressFillRef} className={styles.progressFill} />
          </div>
          <span className={styles.progressTotal}>{formatNumber(services.length)}</span>
        </div>
      </div>
    </section>
  );
}
