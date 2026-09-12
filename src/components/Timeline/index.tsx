"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/animations/register";
import { prefersReducedMotion } from "@/animations/reducedMotion";
import { timeline } from "@/data/timeline";
import { formatNumber } from "@/lib/utils";
import styles from "./styles.module.scss";

export function Timeline() {
  const rootRef = useRef<HTMLElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const list = root.querySelector<HTMLElement>(`.${styles.list}`);
      if (!list) return;

      gsap.fromTo(
        fillRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: list,
            start: "top 75%",
            end: "bottom 60%",
            scrub: 0.4,
            onUpdate: (self) => {
              if (counterRef.current) {
                counterRef.current.textContent = formatNumber(
                  Math.round(self.progress * 100),
                );
              }
            },
          },
        },
      );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} id="about" className={styles.timeline}>
      <div className={styles.grid}>
        <div className={styles.head}>
          <span className={styles.label}>About - The Journey</span>
          <h2 className={styles.title} data-reveal-lines>
            <span className="line-mask">
              <span className="line-mask-inner">FROM</span>
            </span>
            <span className="line-mask">
              <span className="line-mask-inner">CURIOSITY</span>
            </span>
            <span className="line-mask">
              <span className="line-mask-inner">TO CRAFT.</span>
            </span>
          </h2>
          <p className={styles.note} data-reveal="fade" data-delay="0.1">
            From Computer Science fundamentals to full-stack production -
            education, open source and shipped client work.
          </p>
          <p className={styles.counter} aria-hidden="true">
            <span ref={counterRef}>00</span>
            <span className={styles.counterSuffix}>%</span>
          </p>
        </div>

        <div className={styles.railWrap}>
          <div className={styles.rail} aria-hidden="true">
            <div ref={fillRef} className={styles.railFill} />
          </div>

          <ol className={styles.list}>
            {timeline.map((item, i) => (
              <li key={item.year} className={styles.item} data-reveal>
                <span className={styles.year}>{item.year}</span>
                <div className={styles.body}>
                  <h3 className={styles.itemTitle}>{item.title}</h3>
                  <p className={styles.itemText}>{item.description}</p>
                </div>
                <span className={styles.itemIndex}>
                  {formatNumber(i + 1)}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}