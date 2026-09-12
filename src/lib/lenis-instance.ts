import type Lenis from "lenis";

let lenis: Lenis | null = null;

export function setLenis(instance: Lenis | null) {
  lenis = instance;
}

export function getLenis() {
  return lenis;
}

const DEFAULT_NAV_OFFSET = 88;

// Offset from the top of the viewport so fixed-header targets land
// just below the nav instead of underneath it.
function navOffset(): number {
  const raw = getComputedStyle(document.documentElement).getPropertyValue(
    "--nav-h",
  );
  const px = parseFloat(raw);
  return Number.isFinite(px) ? px : DEFAULT_NAV_OFFSET;
}

export function scrollToTarget(target: string) {
  const el = document.querySelector<HTMLElement>(target);
  if (!el) return;

  if (lenis) {
    // If the menu was open Lenis is stopped - resume it so the scroll
    // animation actually runs.
    lenis.start();
    lenis.scrollTo(el, {
      offset: -navOffset(),
      duration: 1.6,
      easing: (t) => 1 - Math.pow(1 - t, 4),
    });
  } else {
    const top = Math.max(
      0,
      el.getBoundingClientRect().top + window.scrollY - navOffset(),
    );
    window.scrollTo({ top, behavior: "smooth" });
  }
}

export function scrollToTop() {
  if (lenis) {
    lenis.start();
    lenis.scrollTo(0, { duration: 1.6 });
  } else {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

// Lenis.stop() alone doesn't block touch scroll - overflow lock does.
export function setScrollLocked(locked: boolean) {
  const html = document.documentElement;
  if (locked) {
    html.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    lenis?.stop();
  } else {
    html.style.overflow = "";
    document.body.style.overflow = "";
    lenis?.start();
  }
}