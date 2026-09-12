"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/animations/register";
import { prefersReducedMotion } from "@/animations/reducedMotion";
import { useLoader } from "@/lib/loader-context";
import { site } from "@/data/site";
import { formatNumber } from "@/lib/utils";
import styles from "./styles.module.scss";

export function Preloader() {
  const { ready, complete } = useLoader();
  const rootRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLHeadingElement>(null);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || ready) return;

    const reduced = prefersReducedMotion();
    const counter = { v: 0 };

    const tl = gsap.timeline({
      onComplete: () => complete(),
    });

    tl.fromTo(
      wordRef.current,
      { yPercent: 120 },
      { yPercent: 0, duration: 0.9, ease: "power4.out" },
      0.1,
    )
      .fromTo(
        counterRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
        0.35,
      )
      .to(
        counter,
        {
          v: 100,
          duration: reduced ? 0.01 : 1.5,
          ease: "power2.inOut",
          onUpdate: () => {
            if (counterRef.current) {
              counterRef.current.textContent = formatNumber(Math.round(counter.v));
            }
          },
        },
        0.4,
      )
      .fromTo(
        lineRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: reduced ? 0.01 : 1.5, ease: "power2.inOut" },
        0.4,
      );

    return () => {
      tl.kill();
    };
  }, [ready, complete]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || !ready) return;

    const reduced = prefersReducedMotion();

    const tl = gsap.timeline({
      onComplete: () => {
        setHidden(true);
        document.body.style.overflow = "";
      },
    });

    tl.to(root, {
      yPercent: -100,
      duration: reduced ? 0.3 : 1,
      ease: "power4.inOut",
    });

    return () => {
      tl.kill();
    };
  }, [ready]);

  if (hidden) return null;

  return (
    <div ref={rootRef} className={styles.preloader} role="status" aria-label="Loading">
      <div className={styles.top}>
        <span className={styles.name}>{site.shortName}</span>
        <span className={styles.year}>PORTFOLIO</span>
      </div>

      <h1 ref={wordRef} className={styles.word} aria-hidden="true">
        {site.name.toUpperCase()}
      </h1>

      <div className={styles.bottom}>
        <span ref={counterRef} className={styles.counter}>
          00
        </span>
        <div className={styles.lineTrack}>
          <div ref={lineRef} className={styles.line} />
        </div>
      </div>
    </div>
  );
}