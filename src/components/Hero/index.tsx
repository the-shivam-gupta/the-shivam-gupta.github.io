"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/animations/register";
import {
  isDesktopPointer,
  prefersReducedMotion,
} from "@/animations/reducedMotion";
import { mouseParallax } from "@/animations/parallax";
import { useLoader } from "@/lib/loader-context";
import { hero } from "@/data/hero";
import { cx } from "@/lib/utils";
import styles from "./styles.module.scss";

export function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const { ready } = useLoader();

  useEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.set(root.querySelectorAll('[data-hero="meta"]'), { opacity: 0, y: 24 });
      gsap.set(root.querySelectorAll('[data-hero="line-inner"]'), { yPercent: 115 });
      gsap.set(root.querySelectorAll('[data-hero="support"]'), { opacity: 0, y: 32 });
      gsap.set(root.querySelector('[data-hero="visual"]'), { opacity: 0, scale: 0.75 });
      gsap.set(root.querySelector('[data-hero="hint"]'), { opacity: 0 });
    }, root);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || !ready) return;

    if (prefersReducedMotion()) {
      gsap.set(root.querySelectorAll("[data-hero]"), { clearProps: "all" });
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        delay: 0.1,
        defaults: { ease: "power4.out" },
      });

      tl.to(root.querySelectorAll('[data-hero="meta"]'), {
        y: 0,
        opacity: 1,
        duration: 0.9,
        stagger: 0.08,
      })
        .to(
          root.querySelectorAll('[data-hero="line-inner"]'),
          { yPercent: 0, duration: 1.15, stagger: 0.09 },
          "-=0.35",
        )
        .to(
          root.querySelectorAll('[data-hero="support"]'),
          { y: 0, opacity: 1, duration: 0.9, stagger: 0.08 },
          "-=0.55",
        )
        .to(
          root.querySelector('[data-hero="visual"]'),
          { scale: 1, opacity: 1, duration: 1.3, ease: "expo.out" },
          "-=0.7",
        )
        .to(
          root.querySelector('[data-hero="hint"]'),
          { opacity: 1, duration: 0.8 },
          "-=0.45",
        );
    }, root);

    return () => ctx.revert();
  }, [ready]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) return;

    const visual = root.querySelector<HTMLElement>('[data-hero="visual"]');
    const cleanup =
      visual && isDesktopPointer() ? mouseParallax(visual, 26) : () => {};

    const ctx = gsap.context(() => {
      gsap.to(root.querySelector('[data-hero="content"]'), {
        yPercent: -12,
        opacity: 0.25,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, root);

    return () => {
      cleanup();
      ctx.revert();
    };
  }, []);

  return (
    <section ref={rootRef} id="hero" className={styles.hero}>
      <div className={styles.orb} data-hero="visual" aria-hidden="true">
        <div className={styles.orbRing} />
        <div className={styles.orbDash} />
        <div className={styles.orbDot} />
      </div>

      <div className={styles.content} data-hero="content">
        <div className={styles.topRow}>
          <p className={cx(styles.availability, "mono")} data-hero="meta">
            <span className={styles.availabilityDot} aria-hidden="true" />
            {hero.availability}
          </p>
        </div>

        <h1 className={styles.title}>
          {hero.lines.map((line, i) => (
            <span
              key={i}
              className={cx(
                styles.line,
                line.offset === "right" && styles.offsetRight,
                line.offset === "left" && styles.offsetLeft,
                line.accent && styles.accent,
                line.outline && styles.outline,
              )}
            >
              <span className="line-mask">
                <span className="line-mask-inner" data-hero="line-inner">
                  {line.text}
                </span>
              </span>
            </span>
          ))}
        </h1>

        <div className={styles.bottomRow}>
          <p className={styles.supporting} data-hero="support">
            {hero.supporting}
          </p>

          <div className={styles.metaCol}>
            <div className={styles.metaBlock} data-hero="support">
              <span className={cx(styles.metaLabel, "mono")}>Role</span>
              <span className={cx(styles.metaValue, "mono")}>{hero.meta}</span>
            </div>
            <div className={styles.metaBlock} data-hero="support">
              <span className={cx(styles.metaLabel, "mono")}>Based in</span>
              <span className={cx(styles.metaValue, "mono")}>{hero.location}</span>
            </div>
            <p className={cx(styles.scrollHint, "mono")} data-hero="hint">
              {hero.scrollHint}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}