"use client";

import { gsap } from "./register";
import { isDesktopPointer, prefersReducedMotion } from "./reducedMotion";

// Magnetic hover effect for [data-magnetic] elements. Mouse-only.
export function initMagnetic(scope: HTMLElement) {
  if (prefersReducedMotion() || !isDesktopPointer()) return;

  const els = gsap.utils.toArray<HTMLElement>(
    scope.querySelectorAll("[data-magnetic]"),
  );

  els.forEach((el) => {
    const strength = parseFloat(el.getAttribute("data-magnetic") ?? "1");
    const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3.out" });

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const relX = e.clientX - (rect.left + rect.width / 2);
      const relY = e.clientY - (rect.top + rect.height / 2);
      xTo(relX * 0.35 * strength);
      yTo(relY * 0.35 * strength);
    };

    const onLeave = () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.4)" });
    };

    el.addEventListener("mousemove", onMove, { passive: true });
    el.addEventListener("mouseleave", onLeave, { passive: true });

    el.dataset.magneticActive = "true";
  });
}

// Cursor-following ring (dot + label), interpolated via quickTo.
export function initCursor(
  dot: HTMLElement,
  ring: HTMLElement,
  label: HTMLElement,
): () => void {
  if (prefersReducedMotion()) return () => {};

  gsap.set([dot, ring], { xPercent: -50, yPercent: -50 });

  const dotX = gsap.quickTo(dot, "x", { duration: 0.15, ease: "power3.out" });
  const dotY = gsap.quickTo(dot, "y", { duration: 0.15, ease: "power3.out" });
  const ringX = gsap.quickTo(ring, "x", { duration: 0.45, ease: "power3.out" });
  const ringY = gsap.quickTo(ring, "y", { duration: 0.45, ease: "power3.out" });

  const onMove = (e: MouseEvent) => {
    dotX(e.clientX);
    dotY(e.clientY);
    ringX(e.clientX);
    ringY(e.clientY);
  };

  const onOver = (e: MouseEvent) => {
    const target = (e.target as HTMLElement).closest<HTMLElement>(
      "a, button, [data-cursor]",
    );
    if (!target) {
      gsap.to(ring, { scale: 1, opacity: 0.35, duration: 0.3 });
      gsap.to(dot, { scale: 1, duration: 0.3 });
      label.textContent = "";
      return;
    }

    const text = target.getAttribute("data-cursor");
    if (text) {
      label.textContent = text;
      gsap.fromTo(
        label,
        { opacity: 0, y: 6 },
        { opacity: 1, y: 0, duration: 0.3 },
      );
      gsap.to(ring, { scale: 2.4, opacity: 1, duration: 0.35 });
      gsap.to(dot, { scale: 0, duration: 0.3 });
    } else {
      gsap.to(ring, { scale: 1.8, opacity: 0.8, duration: 0.35 });
      gsap.to(dot, { scale: 0.6, duration: 0.3 });
    }
  };

  const onLeaveWindow = () => {
    gsap.to([dot, ring], { opacity: 0, duration: 0.3 });
  };
  const onEnterWindow = () => {
    gsap.to([dot, ring], { opacity: 1, duration: 0.3 });
  };

  window.addEventListener("mousemove", onMove, { passive: true });
  window.addEventListener("mouseover", onOver, { passive: true });
  document.addEventListener("mouseleave", onLeaveWindow);
  document.addEventListener("mouseenter", onEnterWindow);

  return () => {
    window.removeEventListener("mousemove", onMove);
    window.removeEventListener("mouseover", onOver);
    document.removeEventListener("mouseleave", onLeaveWindow);
    document.removeEventListener("mouseenter", onEnterWindow);
  };
}