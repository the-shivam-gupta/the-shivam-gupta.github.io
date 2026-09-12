"use client";

import { ArrowUp } from "lucide-react";
import { scrollToTop } from "@/lib/lenis-instance";
import styles from "./styles.module.scss";

export function BackToTop() {
  return (
    <button
      type="button"
      className={styles.backTop}
      onClick={scrollToTop}
      aria-label="Back to top"
      data-magnetic
    >
      <ArrowUp size={18} strokeWidth={1.5} aria-hidden="true" />
      <span className={styles.backTopText}>Top</span>
    </button>
  );
}