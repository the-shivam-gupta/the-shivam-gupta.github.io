"use client";

import { useEffect, useRef, type PointerEvent as ReactPointerEvent } from "react";
import { gsap } from "@/animations/register";
import { prefersReducedMotion } from "@/animations/reducedMotion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { testimonials, type Testimonial } from "@/data/testimonials";
import { formatNumber } from "@/lib/utils";
import styles from "./styles.module.scss";

const initials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

const layerMarkup = (t: Testimonial): string => `
  <blockquote class="${styles.tQuote}">&ldquo;${t.quote}&rdquo;</blockquote>
  <div class="${styles.tAuthor}">
    <span class="${styles.tAvatar}" aria-hidden="true">${initials(t.author)}</span>
    <span class="${styles.tMeta}">
      <span class="${styles.tName}">${t.author}</span>
      <span class="${styles.tRole}">${t.role} - ${t.company}</span>
    </span>
  </div>
`;

export function Testimonials() {
  const rootRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const layerARef = useRef<HTMLDivElement>(null);
  const layerBRef = useRef<HTMLDivElement>(null);
  const visibleRef = useRef<HTMLDivElement | null>(null);
  const indexRef = useRef(0);
  const progressRef = useRef<HTMLSpanElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const animatingRef = useRef(false);
  const pendingRef = useRef<1 | -1 | 0>(0);
  const touchStart = useRef<number | null>(null);
  const ctxRef = useRef<gsap.Context | null>(null);

  const renderInto = (layer: HTMLDivElement, data: Testimonial) => {
    layer.innerHTML = layerMarkup(data);
  };

  const updateProgress = () => {
    if (progressRef.current) {
      progressRef.current.textContent = formatNumber(indexRef.current + 1);
    }
    if (countRef.current) {
      countRef.current.textContent = formatNumber(testimonials.length);
    }
  };

  // One gsap.context for the component's lifetime - every tween is
  // recorded here and cleaned up together on unmount.
  useEffect(() => {
    const root = rootRef.current;
    const layerA = layerARef.current;
    if (!root || !layerA) return;

    const ctx = gsap.context(() => {
      renderInto(layerA, testimonials[0]);
      visibleRef.current = layerA;
      gsap.set(layerA, { visibility: "visible", opacity: 1 });
      updateProgress();
    }, root);

    ctxRef.current = ctx;
    return () => {
      ctx.revert();
      ctxRef.current = null;
    };
  }, []);

  // Pin the stage to the tallest testimonial so the height never
  // collapses when switching between quotes of different lengths.
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const measure = () => {
      const el = stageRef.current;
      if (!el) return;
      let max = 0;
      for (const t of testimonials) {
        const probe = document.createElement("div");
        probe.style.cssText = `position:absolute;top:0;left:-9999px;width:${el.clientWidth}px;visibility:hidden;`;
        probe.innerHTML = layerMarkup(t);
        el.appendChild(probe);
        max = Math.max(max, probe.offsetHeight);
        el.removeChild(probe);
      }
      el.style.height = `${max}px`;
    };

    measure();
    const reflow = () => measure();
    document.fonts.ready.then(reflow).catch(() => {});
    window.addEventListener("load", reflow);
    window.addEventListener("resize", reflow);
    return () => {
      window.removeEventListener("load", reflow);
      window.removeEventListener("resize", reflow);
    };
  }, []);

  const go = (dir: 1 | -1) => {
    const layerA = layerARef.current;
    const layerB = layerBRef.current;
    if (!layerA || !layerB) return;

    // Queue a tap made mid-transition instead of dropping it.
    if (animatingRef.current) {
      pendingRef.current = dir;
      return;
    }

    const from = visibleRef.current ?? layerA;
    const to = from === layerA ? layerB : layerA;
    const next = (indexRef.current + dir + testimonials.length) % testimonials.length;
    const data = testimonials[next];

    if (prefersReducedMotion()) {
      renderInto(from, data);
      indexRef.current = next;
      updateProgress();
      return;
    }

    animatingRef.current = true;

    renderInto(to, data);
    to.setAttribute("aria-hidden", "false");
    from.setAttribute("aria-hidden", "false");

    // Compositor-only properties - no `display` toggle, no layout pass.
    gsap.set(to, {
      visibility: "visible",
      xPercent: 100 * dir,
      opacity: 0,
    });

    const finish = () => {
      gsap.set(from, { visibility: "hidden", xPercent: 0, opacity: 0 });
      from.setAttribute("aria-hidden", "true");
      visibleRef.current = to;
      indexRef.current = next;
      updateProgress();
      animatingRef.current = false;
      const queued = pendingRef.current;
      pendingRef.current = 0;
      if (queued !== 0) go(queued);
    };

    const tl = ctxRef.current;
    if (tl) {
      tl.add(() => {
        const timeline = gsap.timeline({ onComplete: finish });

        timeline
          .to(from, {
            xPercent: -100 * dir,
            opacity: 0,
            duration: 0.4,
            ease: "power2.in",
            overwrite: true,
          })
          .to(
            to,
            {
              xPercent: 0,
              opacity: 1,
              duration: 0.55,
              ease: "power3.out",
              overwrite: true,
            },
            "-=0.18",
          );
      });
    }
  };

  const onPointerDown = (e: ReactPointerEvent) => {
    touchStart.current = e.clientX;
  };

  const onPointerUp = (e: ReactPointerEvent) => {
    if (touchStart.current === null) return;
    const dx = e.clientX - touchStart.current;
    touchStart.current = null;
    if (Math.abs(dx) < 60) return;
    go(dx > 0 ? -1 : 1);
  };

  return (
    <section
      ref={rootRef}
      id="testimonials"
      className={styles.testimonials}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerCancel={() => {
        touchStart.current = null;
      }}
      aria-label="Recognitions"
    >
      <div className={styles.head}>
        <span className={styles.label}>Recognitions</span>
        <div className={styles.controls}>
          <button
            type="button"
            className={styles.control}
            onClick={() => go(-1)}
            aria-label="Previous testimonial"
          >
            <ArrowLeft size={20} strokeWidth={1.5} />
          </button>
          <button
            type="button"
            className={styles.control}
            onClick={() => go(1)}
            aria-label="Next testimonial"
          >
            <ArrowRight size={20} strokeWidth={1.5} />
          </button>
        </div>
      </div>

      <div ref={stageRef} className={styles.stage} aria-live="polite">
        <div ref={layerARef} className={styles.layer} />
        <div ref={layerBRef} className={styles.layer} aria-hidden="true" />
      </div>

      <div className={styles.foot}>
        <span className={styles.progress}>
          <span ref={progressRef}>01</span>
          <span className={styles.progressTotal}>
            {" "}
            / <span ref={countRef}>{formatNumber(testimonials.length)}</span>
          </span>
        </span>
      </div>
    </section>
  );
}
