"use client";

import { useEffect, useRef, useState } from "react";
import { initCursor } from "@/animations/magnetic";
import { isDesktopPointer, prefersReducedMotion } from "@/animations/reducedMotion";
import styles from "./styles.module.scss";

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isDesktopPointer() || prefersReducedMotion()) return;

    const id = requestAnimationFrame(() => setEnabled(true));
    document.documentElement.classList.add("custom-cursor");

    return () => {
      cancelAnimationFrame(id);
      document.documentElement.classList.remove("custom-cursor");
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;
    if (!dotRef.current || !ringRef.current || !labelRef.current) return;

    const cleanup = initCursor(dotRef.current, ringRef.current, labelRef.current);
    return cleanup;
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div className={styles.cursor} aria-hidden="true">
      <div ref={dotRef} className={styles.dot} />
      <div ref={ringRef} className={styles.ring}>
        <span ref={labelRef} className={styles.label} />
      </div>
    </div>
  );
}