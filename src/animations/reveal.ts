"use client";

import { gsap } from "./register";
import { prefersReducedMotion } from "./reducedMotion";
import { revealLines, scrubWords } from "./textReveal";

// Initialises scroll-reveal animations driven by [data-reveal*] attributes.
// Call once inside a gsap.context scoped to the app container.
export function initGlobalReveals(scope: HTMLElement) {
  const reduced = prefersReducedMotion();
  if (reduced) return;

  const rise = gsap.utils.toArray<HTMLElement>(
    scope.querySelectorAll("[data-reveal]"),
  );

  rise.forEach((el) => {
    const type = el.getAttribute("data-reveal");
    const delay = parseFloat(el.getAttribute("data-delay") ?? "0");

    if (type === "fade") {
      gsap.from(el, {
        opacity: 0,
        duration: 1,
        delay,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 88%" },
      });
      return;
    }

    if (type === "blur") {
      gsap.from(el, {
        opacity: 0,
        y: 28,
        filter: "blur(8px)",
        duration: 1.1,
        delay,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 88%" },
      });
      return;
    }

    gsap.from(el, {
      opacity: 0,
      y: 36,
      duration: 1.1,
      delay,
      ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 88%" },
    });
  });

  const lineBlocks = gsap.utils.toArray<HTMLElement>(
    scope.querySelectorAll("[data-reveal-lines]"),
  );
  lineBlocks.forEach((el) => revealLines(el, { immediate: false }));

  const wordBlocks = gsap.utils.toArray<HTMLElement>(
    scope.querySelectorAll("[data-reveal-words]"),
  );
  wordBlocks.forEach((el) => scrubWords(el));
}