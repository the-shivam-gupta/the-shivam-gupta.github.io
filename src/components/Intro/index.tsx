"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { gsap } from "@/animations/register";
import { prefersReducedMotion } from "@/animations/reducedMotion";
import { capabilities } from "@/data/capabilities";
import { cx } from "@/lib/utils";
import { CAPABILITY_ICONS } from "@/lib/capability-icons";
import styles from "./styles.module.scss";

const byIndex = new Map(capabilities.map((c) => [c.index, c]));

type StatementPart = { text: string } | { chip: string };

const statementParts: StatementPart[] = [
  { text: "I build" },
  { chip: "03" }, // Frontend Development
  { text: "production web apps with Next.js, React" },
  { chip: "04" }, // Animation
  { text: "and headless CMS architectures - accessible, animated" },
  { chip: "06" }, // Performance & Accessibility
  { text: "and engineered from Figma" },
  { chip: "02" }, // Creative Development
  { text: "handoff to deployment." },
];

type RevealItem =
  | { kind: "letter"; char: string; wordStart: boolean }
  | { kind: "chip"; capIndex: string };

function buildRevealItems(parts: StatementPart[]): RevealItem[] {
  const items: RevealItem[] = [];
  for (const part of parts) {
    if ("text" in part) {
      for (const word of part.text.split(" ")) {
        if (!word) continue;
        [...word].forEach((char, charIndex) => {
          items.push({ kind: "letter", char, wordStart: charIndex === 0 });
        });
      }
    } else {
      items.push({ kind: "chip", capIndex: part.chip });
    }
  }
  return items;
}

const revealItems = buildRevealItems(statementParts);

const EXPANDED_WIDTH_PX = 304;
const EDGE_SAFE_MARGIN_PX = 24;

export function Intro() {
  const rootRef = useRef<HTMLElement>(null);
  const statementRef = useRef<HTMLParagraphElement>(null);
  const [pinnedId, setPinnedId] = useState<string | null>(null);
  const [hoverId, setHoverId] = useState<string | null>(null);
  const [flipped, setFlipped] = useState<Set<string>>(new Set());
  const chipRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const wrapRefs = useRef<Record<string, HTMLSpanElement | null>>({});
  const targetRefs = useRef<(HTMLElement | null)[]>([]);
  const openId = pinnedId ?? hoverId;

  const measureFlip = (id: string) => {
    const wrap = wrapRefs.current[id];
    if (!wrap) return;
    const rect = wrap.getBoundingClientRect();
    const overflowsRight = rect.left + EXPANDED_WIDTH_PX + EDGE_SAFE_MARGIN_PX > window.innerWidth;
    setFlipped((prev) => {
      if (prev.has(id) === overflowsRight) return prev;
      const next = new Set(prev);
      if (overflowsRight) {
        next.add(id);
      } else {
        next.delete(id);
      }
      return next;
    });
  };

  const hoverIn = (id: string) => {
    measureFlip(id);
    setHoverId(id);
  };

  const hoverOut = (id: string) => {
    setHoverId((h) => (h === id ? null : h));
  };

  const toggle = (id: string) => {
    measureFlip(id);
    setHoverId(null);
    setPinnedId((p) => (p === id ? null : id));
  };

  useEffect(() => {
    if (!pinnedId) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPinnedId(null);
    };
    const onPointerDown = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest(`.${styles.chipWrap}`)) return;
      setPinnedId(null);
    };

    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onPointerDown);
    };
  }, [pinnedId]);

  useEffect(() => {
    const root = rootRef.current;
    const statement = statementRef.current;
    if (!root || !statement || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const letterEls: HTMLElement[] = [];
      const chipEls = new Set<HTMLElement>();
      const orderedTargets: HTMLElement[] = [];

      revealItems.forEach((item, i) => {
        const el = targetRefs.current[i];
        if (!el) return;
        orderedTargets.push(el);
        if (item.kind === "chip") {
          chipEls.add(el);
        } else {
          letterEls.push(el);
        }
      });

      if (orderedTargets.length === 0) return;

      gsap.set(letterEls, { opacity: 0.02 });
      gsap.set([...chipEls], { opacity: 0, scale: 0.5, transformOrigin: "center center" });

      const STAGGER = 0.065;
      const LETTER_DURATION = 0.5;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: statement,
          start: "top 80%",
          end: "top 20%",
          scrub: 0.4,
        },
      });

      let letterIndex = 0;
      orderedTargets.forEach((el) => {
        if (chipEls.has(el)) return;
        tl.to(el, { opacity: 1, ease: "none", duration: LETTER_DURATION }, letterIndex * STAGGER);
        letterIndex += 1;
      });

      chipEls.forEach((el) => {
        gsap.to(el, {
          opacity: 1,
          scale: 1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            end: "top 55%",
            scrub: 0,
          },
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className={styles.intro} aria-label="Introduction">
      <p ref={statementRef} className={styles.statement}>
        {revealItems.map((item, i) => {
          const prevItem = i > 0 ? revealItems[i - 1] : null;
          const needsSpace =
            item.kind === "letter" && item.wordStart && prevItem?.kind === "letter";

          if (item.kind === "letter") {
            return (
              <Fragment key={i}>
                {needsSpace && " "}
                <span
                  ref={(el) => {
                    targetRefs.current[i] = el;
                  }}
                  className={styles.letter}
                >
                  {item.char}
                </span>
              </Fragment>
            );
          }

          const cap = byIndex.get(item.capIndex);
          if (!cap) return null;
          const Icon = CAPABILITY_ICONS[cap.icon];
          const isOpen = openId === cap.index;

          return (
            <span
              key={i}
              ref={(el) => {
                wrapRefs.current[cap.index] = el;
              }}
              className={styles.chipWrap}
            >
              <span className={styles.chipSpacer} aria-hidden="true" />
              <button
                type="button"
                ref={(el) => {
                  chipRefs.current[cap.index] = el;
                  targetRefs.current[i] = el;
                }}
                className={cx(
                  styles.chip,
                  isOpen && styles.open,
                  flipped.has(cap.index) && styles.flipped,
                )}
                aria-expanded={isOpen}
                aria-label={cap.title}
                onMouseEnter={() => hoverIn(cap.index)}
                onMouseLeave={() => hoverOut(cap.index)}
                onFocus={() => hoverIn(cap.index)}
                onBlur={() => hoverOut(cap.index)}
                onClick={() => toggle(cap.index)}
              >
                <span className={styles.chipHead}>
                  <Icon className={styles.chipIcon} size="0.42em" strokeWidth={1.75} />
                  <svg
                    className={styles.chipCaret}
                    viewBox="0 0 8 7"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M4.21716 6.12347C3.95528 6.57706 3.30058 6.57706 3.0387 6.12346L0.0925457 1.02058C-0.169335 0.566986 0.158016 -7.19718e-07 0.681777 -6.73929e-07L6.57409 -1.58807e-07C7.09785 -1.13018e-07 7.4252 0.566987 7.16331 1.02058L4.21716 6.12347Z"
                      fill="currentColor"
                    />
                  </svg>
                </span>
                <span className={styles.chipBody}>
                  <span className={styles.chipTitle}>{cap.title}</span>
                  <span className={styles.chipText}>{cap.detail}</span>
                </span>
              </button>
            </span>
          );
        })}
      </p>
      <p className={styles.caption} data-reveal="fade" data-delay="0.15">
        Next.js · React · Redux · Strapi · Node.js
      </p>
    </section>
  );
}
