"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/animations/register";
import { prefersReducedMotion } from "@/animations/reducedMotion";
import { faqs } from "@/data/faqs";
import { cx } from "@/lib/utils";
import styles from "./styles.module.scss";

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  const contentRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    const reduced = prefersReducedMotion();

    faqs.forEach((f) => {
      const content = contentRefs.current[f.index];
      const isOpen = open === Number(f.index);

      if (!content) return;

      if (reduced) {
        content.style.height = isOpen ? "auto" : "0px";
        content.style.opacity = isOpen ? "1" : "0";
        return;
      }

      gsap.to(content, {
        height: isOpen ? "auto" : 0,
        opacity: isOpen ? 1 : 0,
        duration: isOpen ? 0.55 : 0.4,
        ease: "power3.inOut",
        overwrite: "auto",
        onComplete: isOpen
          ? () => {
              content.style.height = "auto";
            }
          : undefined,
      });
    });
  }, [open]);

  const toggle = (index: string) => {
    setOpen((current) => (current === Number(index) ? null : Number(index)));
  };

  return (
    <section id="faq" className={styles.faq}>
      <div className={styles.head}>
        <span className={styles.label}>FAQ</span>
        <h2 className={styles.title} data-reveal-lines>
          <span className="line-mask">
            <span className="line-mask-inner">QUESTIONS,</span>
          </span>
          <span className="line-mask">
            <span className="line-mask-inner">ANSWERS.</span>
          </span>
        </h2>
      </div>

      <ul className={styles.list}>
        {faqs.map((f) => {
          const isOpen = open === Number(f.index);
          return (
            <li key={f.index} className={styles.item} data-reveal>
              <button
                type="button"
                className={cx(styles.toggle, isOpen && styles.toggleOpen)}
                onClick={() => toggle(f.index)}
                aria-expanded={isOpen}
                aria-controls={`faq-${f.index}`}
              >
                <span className={styles.index}>{f.index}</span>
                <span className={styles.question}>{f.question}</span>
                <span className={styles.icon} aria-hidden="true">
                  <span className={styles.iconBar} />
                  <span className={styles.iconBarV} />
                </span>
              </button>
              <div
                id={`faq-${f.index}`}
                ref={(el) => {
                  contentRefs.current[f.index] = el;
                }}
                className={styles.content}
              >
                <div className={styles.answer}>{f.answer}</div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
