"use client";

import { gsap } from "./register";
import { prefersReducedMotion } from "./reducedMotion";

// Scroll parallax for elements marked [data-parallax].
// data-speed sets intensity; data-y fixes the pixel range instead.
export function initParallax(scope: HTMLElement) {
  if (prefersReducedMotion()) return;

  const els = gsap.utils.toArray<HTMLElement>(
    scope.querySelectorAll("[data-parallax]"),
  );

  els.forEach((el) => {
    const speed = parseFloat(el.getAttribute("data-speed") ?? "0.15");
    const fixed = el.getAttribute("data-y");

    if (fixed) {
      const amount = parseFloat(fixed);
      gsap.fromTo(
        el,
        { y: -amount },
        {
          y: amount,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
      return;
    }

    const bounds = () => el.parentElement?.getBoundingClientRect().height ?? 0;
    const amount = () => Math.min(bounds() * speed, 220);

    gsap.fromTo(
      el,
      { y: () => -amount() },
      {
        y: () => amount(),
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      },
    );
  });
}

// Subtle mouse parallax used for hero visuals. Returns a cleanup.
export function mouseParallax(
  el: HTMLElement,
  strength = 24,
): () => void {
  if (prefersReducedMotion()) return () => {};

  const xTo = gsap.quickTo(el, "x", { duration: 0.8, ease: "power3.out" });
  const yTo = gsap.quickTo(el, "y", { duration: 0.8, ease: "power3.out" });

  const onMove = (e: MouseEvent) => {
    const { innerWidth, innerHeight } = window;
    const dx = (e.clientX / innerWidth - 0.5) * strength;
    const dy = (e.clientY / innerHeight - 0.5) * strength;
    xTo(dx);
    yTo(dy);
  };

  window.addEventListener("mousemove", onMove, { passive: true });
  return () => window.removeEventListener("mousemove", onMove);
}