"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight, X } from "lucide-react";
import { gsap } from "@/animations/register";
import { prefersReducedMotion } from "@/animations/reducedMotion";
import { capabilities } from "@/data/capabilities";
import { cx, formatNumber } from "@/lib/utils";
import { CAPABILITY_ICONS } from "@/lib/capability-icons";
import styles from "./styles.module.scss";

const GOLDEN_RATIO = 0.6180339887;

function cardPosition(i: number) {
  const t = (i * GOLDEN_RATIO) % 1;
  return 0.03 + 0.94 * t;
}

// Static per data set - computed once at module scope rather than
// re-derived (or memoized) on every render.
const cardPositions = capabilities.map((_, i) => cardPosition(i));

interface Point {
  x: number;
  y: number;
}

function buildArcPath(points: Point[]) {
  if (points.length === 0) return { d: "", prefixes: [] as string[] };
  if (points.length === 1) {
    const only = `M ${points[0].x} ${points[0].y}`;
    return { d: only, prefixes: [only] };
  }

  let d = `M ${points[0].x} ${points[0].y}`;
  const prefixes = [d];
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] ?? points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] ?? p2;

    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6;
    const c2y = p2.y - (p3.y - p1.y) / 6;

    d += ` C ${c1x} ${c1y}, ${c2x} ${c2y}, ${p2.x} ${p2.y}`;
    prefixes.push(d);
  }
  return { d, prefixes };
}

function computeNodeThresholds(prefixes: string[]) {
  if (typeof document === "undefined" || prefixes.length === 0) return [];
  const scratch = document.createElementNS("http://www.w3.org/2000/svg", "path");
  const lengths = prefixes.map((d) => {
    scratch.setAttribute("d", d);
    return scratch.getTotalLength();
  });
  const total = lengths[lengths.length - 1] || 1;
  return lengths.map((l) => l / total);
}

interface JourneyBox {
  width: number;
  height: number;
}

export function Capabilities() {
  const rootRef = useRef<HTMLElement>(null);
  const journeyRef = useRef<HTMLDivElement>(null);
  const drawRef = useRef<SVGPathElement>(null);
  const cardWrapRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const cardIndexTrackRefs = useRef<Record<string, HTMLSpanElement | null>>({});
  const cardBodyRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const panelRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const nodeRefs = useRef<Record<string, HTMLSpanElement | null>>({});
  const [openIndex, setOpenIndex] = useState<string | null>(null);
  const [path, setPath] = useState<{ d: string; points: Point[]; thresholds: number[] }>({
    d: "",
    points: [],
    thresholds: [],
  });
  const [box, setBox] = useState<JourneyBox>({ width: 0, height: 0 });

  const measure = useCallback(() => {
    const journey = journeyRef.current;
    if (!journey) return;

    const jRect = journey.getBoundingClientRect();
    if (jRect.width === 0 || jRect.height === 0) return;

    const points: Point[] = [];
    capabilities.forEach((cap) => {
      const wrap = cardWrapRefs.current[cap.index];
      if (!wrap) return;
      const r = wrap.getBoundingClientRect();
      points.push({
        x: r.left + r.width / 2 - jRect.left,
        y: r.top - jRect.top,
      });
    });

    const { d, prefixes } = buildArcPath(points);
    setBox({ width: jRect.width, height: jRect.height });
    setPath({ d, points, thresholds: computeNodeThresholds(prefixes) });
  }, []);

  useEffect(() => {
    const raf = requestAnimationFrame(measure);

    const journey = journeyRef.current;
    const ro = journey ? new ResizeObserver(() => measure()) : null;
    if (journey && ro) ro.observe(journey);

    window.addEventListener("resize", measure);
    document.fonts?.ready?.then(measure).catch(() => {});

    return () => {
      cancelAnimationFrame(raf);
      ro?.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  useEffect(() => {
    const root = rootRef.current;
    const draw = drawRef.current;
    if (!root || !draw || !path.d) return;

    const length = draw.getTotalLength();
    gsap.set(draw, { opacity: 1, strokeDasharray: length, strokeDashoffset: length });

    const ctx = gsap.context(() => {
      const list = root.querySelector<HTMLElement>(`.${styles.list}`);
      if (!list) return;

      const firstCard = cardWrapRefs.current[capabilities[0].index];
      const lastCard = cardWrapRefs.current[capabilities[capabilities.length - 1].index];
      if (!firstCard || !lastCard) return;

      gsap.set(
        capabilities.map((cap) => nodeRefs.current[cap.index]).filter(Boolean),
        { opacity: 0 },
      );

      gsap.to(draw, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: firstCard,
          start: "top 85%",
          endTrigger: lastCard,
          end: "top 55%",
          scrub: true,
          onUpdate: (self) => {
            capabilities.forEach((cap, i) => {
              const node = nodeRefs.current[cap.index];
              if (!node) return;
              const threshold = path.thresholds[i] ?? i / Math.max(capabilities.length - 1, 1);
              node.style.opacity = self.progress >= threshold ? "1" : "0";
            });
          },
        },
      });
    }, root);

    return () => ctx.revert();
  }, [path.d, path.thresholds]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      capabilities.forEach((cap, i) => {
        const card = cardRefs.current[cap.index];
        if (!card) return;

        // Trigger off the wrapper - the card itself gets scaled down on
        // mount, which throws off where "top 88%" lands.
        const scrollTrigger = {
          trigger: cardWrapRefs.current[cap.index] ?? card,
          start: "top 88%",
          toggleActions: "play none none reverse",
        };

        gsap.from(card, {
          opacity: 0,
          scale: 0.5,
          transformOrigin: "center center",
          duration: 1,
          ease: "power4.out",
          scrollTrigger: { ...scrollTrigger },
        });

        const track = cardIndexTrackRefs.current[cap.index];
        const target = i + 1;
        if (track && target > 1) {
          gsap.fromTo(
            track,
            { opacity: 0 },
            {
              opacity: 1,
              y: `-${target - 1}em`,
              duration: Math.min(1.7, 0.45 + 0.16 * target),
              ease: "power2.inOut",
              scrollTrigger: { ...scrollTrigger },
            },
          );
        }

        // Title, body copy and the footer row fade + rise in together,
        // as their own group - separate from both the card and number.
        const body = cardBodyRefs.current[cap.index];
        if (body) {
          gsap.from(Array.from(body.children), {
            opacity: 0,
            y: 24,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.08,
            delay: 0.1,
            scrollTrigger: { ...scrollTrigger },
          });
        }
      });
    }, root);

    return () => ctx.revert();
  }, []);

  // Detail overlay open/close - a simple scale + opacity tween anchored
  // in place over the card, so nothing needs its height measured.
  useEffect(() => {
    const reduced = prefersReducedMotion();

    capabilities.forEach((cap) => {
      const panel = panelRefs.current[cap.index];
      if (!panel) return;
      const isOpen = openIndex === cap.index;

      if (reduced) {
        gsap.set(panel, { opacity: isOpen ? 1 : 0, scale: isOpen ? 1 : 0.5 });
        panel.style.pointerEvents = isOpen ? "auto" : "none";
        return;
      }

      gsap.to(panel, {
        opacity: isOpen ? 1 : 0,
        scale: isOpen ? 1 : 0.5,
        transformOrigin: "center center",
        duration: isOpen ? 0.5 : 0.3,
        ease: isOpen ? "power4.out" : "power2.inOut",
        overwrite: "auto",
        onStart: isOpen
          ? () => {
              panel.style.pointerEvents = "auto";
            }
          : undefined,
        onComplete: !isOpen
          ? () => {
              panel.style.pointerEvents = "none";
            }
          : undefined,
      });
    });
  }, [openIndex]);

  // Escape + click-outside to close whichever panel is open.
  useEffect(() => {
    if (!openIndex) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenIndex(null);
    };
    const onPointerDown = (e: MouseEvent) => {
      const panel = panelRefs.current[openIndex];
      if (panel && !panel.contains(e.target as Node)) {
        setOpenIndex(null);
      }
    };

    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onPointerDown);
    };
  }, [openIndex]);

  return (
    <section ref={rootRef} id="capabilities" className={styles.capabilities}>
      <div className={styles.head}>
        <span className={styles.label}>Capabilities</span>
        <h2 className={styles.title} data-reveal-lines>
          <span className="line-mask">
            <span className="line-mask-inner">WHAT I</span>
          </span>
          <span className="line-mask">
            <span className="line-mask-inner">DO WELL.</span>
          </span>
        </h2>
      </div>

      <div ref={journeyRef} className={styles.journey}>
        {path.d && box.width > 0 && box.height > 0 && (
          <svg
            className={styles.path}
            viewBox={`0 0 ${box.width} ${box.height}`}
            aria-hidden="true"
          >
            <path
              ref={drawRef}
              d={path.d}
              className={styles.pathDraw}
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        )}

        <ul className={styles.list}>
          {capabilities.map((cap, i) => {
            const Icon = CAPABILITY_ICONS[cap.icon];
            const isOpen = openIndex === cap.index;
            const dimmed = openIndex !== null && !isOpen;
            const hidden = isOpen;
            const panelId = `capability-panel-${cap.index}`;
            const point = path.points[i];

            return (
              <li key={cap.index} className={styles.row}>
                {point && (
                  <span
                    ref={(el) => {
                      nodeRefs.current[cap.index] = el;
                    }}
                    className={styles.node}
                    style={{ left: `${point.x}px`, top: `${point.y}px` }}
                    aria-hidden="true"
                  />
                )}

                <div
                  ref={(el) => {
                    cardWrapRefs.current[cap.index] = el;
                  }}
                  className={cx(styles.cardWrap, isOpen && styles.cardWrapOpen)}
                  style={{ "--pos": cardPositions[i] } as React.CSSProperties}
                >
                  <div
                    ref={(el) => {
                      cardRefs.current[cap.index] = el;
                    }}
                    className={cx(
                      styles.card,
                      dimmed && styles.cardDimmed,
                      hidden && styles.cardHidden,
                    )}
                  >
                    <span className={styles.cardIndex} aria-label={cap.index}>
                      <span
                        ref={(el) => {
                          cardIndexTrackRefs.current[cap.index] = el;
                        }}
                        className={styles.cardIndexTrack}
                        aria-hidden="true"
                      >
                        {Array.from({ length: i + 1 }, (_, n) => (
                          <span key={n} className={styles.cardIndexDigit}>
                            {formatNumber(n + 1)}
                          </span>
                        ))}
                      </span>
                    </span>

                    <div
                      ref={(el) => {
                        cardBodyRefs.current[cap.index] = el;
                      }}
                    >
                      <h3 className={styles.cardTitle}>{cap.title}</h3>
                      <p className={styles.cardText}>{cap.detail}</p>

                      <div className={styles.cardFoot}>
                        <span className={styles.handle}>{cap.handle}</span>

                        <button
                          type="button"
                          className={cx(styles.readMore, isOpen && styles.readMoreOpen)}
                          data-cursor="READ"
                          aria-expanded={isOpen}
                          aria-controls={panelId}
                          onClick={() => setOpenIndex(isOpen ? null : cap.index)}
                        >
                          <span aria-hidden="true" className={styles.readMoreHit} />
                          <span className={styles.readMoreLabel}>
                            {isOpen ? "Close" : "Read more"}
                          </span>
                          <ArrowRight
                            className={styles.readMoreArrow}
                            size={14}
                            strokeWidth={1.75}
                            aria-hidden="true"
                          />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div
                    id={panelId}
                    ref={(el) => {
                      panelRefs.current[cap.index] = el;
                    }}
                    className={styles.detailPanel}
                  >
                    <button
                      type="button"
                      className={styles.detailClose}
                      onClick={() => setOpenIndex(null)}
                      aria-label={`Close ${cap.title} details`}
                    >
                      <X size={16} strokeWidth={1.5} />
                    </button>

                    <div className={styles.detailHead}>
                      <span className={styles.detailIndex}>{cap.index}</span>
                      <span className={styles.detailIcon} aria-hidden="true">
                        <Icon size={18} strokeWidth={1.5} />
                      </span>
                    </div>

                    <h4 className={styles.detailTitle}>{cap.title}</h4>
                    <p className={styles.detailText}>{cap.expanded}</p>

                    <ul className={styles.detailKeywords}>
                      {cap.keywords.map((k) => (
                        <li key={k} className={styles.detailKeyword}>
                          {k}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
