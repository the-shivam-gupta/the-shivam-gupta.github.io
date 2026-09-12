"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/animations/register";
import { prefersReducedMotion } from "@/animations/reducedMotion";
import { projects } from "@/data/projects";
import { ProjectRow } from "./ProjectRow";
import styles from "./styles.module.scss";

export function Projects() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const mediaWraps = root.querySelectorAll<HTMLElement>(
        `.${styles.media}`,
      );

      mediaWraps.forEach((media) => {
        gsap.fromTo(
          media,
          { scale: 0.92, yPercent: 6 },
          {
            scale: 1.03,
            yPercent: -1,
            ease: "none",
            scrollTrigger: {
              trigger: media.parentElement,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} id="work" className={styles.projects}>
      <div className={styles.head}>
        <span className={styles.label}>Selected Work</span>
        <h2 className={styles.title} data-reveal-lines>
          <span className="line-mask">
            <span className="line-mask-inner">SELECTED</span>
          </span>
          <span className="line-mask">
            <span className="line-mask-inner">PROJECTS</span>
          </span>
        </h2>
      </div>

      <div className={styles.list}>
        {projects.map((project, i) => (
          <ProjectRow key={project.index} project={project} priority={i === 0} />
        ))}
      </div>
    </section>
  );
}