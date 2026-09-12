"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/animations/register";
import { scrollToTarget, setScrollLocked } from "@/lib/lenis-instance";
import { useLoader } from "@/lib/loader-context";
import { site } from "@/data/site";
import { cx, formatNumber } from "@/lib/utils";
import styles from "./styles.module.scss";

export function Navigation() {
  const { ready } = useLoader();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeHref, setActiveHref] = useState("");
  const activeRef = useRef("");
  const navRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const menuOpenRef = useRef(false);

  useEffect(() => {
    menuOpenRef.current = menuOpen;
  }, [menuOpen]);

  useEffect(() => {
    if (!ready || !navRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        navRef.current,
        { y: -60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", delay: 0.2 },
      );
    }, navRef);

    return () => ctx.revert();
  }, [ready]);

  // Scroll state and active-section tracking share one listener pair.
  useEffect(() => {
    const ids = site.nav.map((item) => item.href);

    const updateActiveSection = () => {
      const probe = window.scrollY + window.innerHeight * 0.28;
      let current = "";
      for (const id of ids) {
        const el = document.querySelector<HTMLElement>(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top + window.scrollY;
        if (probe >= top) current = id;
      }
      if (current !== activeRef.current) {
        activeRef.current = current;
        setActiveHref(current);
      }
    };

    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      updateActiveSection();
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateActiveSection);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, []);

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    const links = overlay.querySelectorAll<HTMLElement>(`[data-menu-link]`);

    // Kill any in-flight tween first so a rapid close→reopen never
    // leaves the overlay mid-transition or stuck at display:none.
    gsap.killTweensOf([overlay, links]);

    if (menuOpen) {
      gsap.set(overlay, { display: "flex" });
      gsap.fromTo(
        overlay,
        { yPercent: -100 },
        { yPercent: 0, duration: 0.85, ease: "power4.inOut" },
      );
      gsap.fromTo(
        links,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power3.out", stagger: 0.07, delay: 0.3 },
      );
      setScrollLocked(true);
    } else {
      gsap.to(links, { y: 0, opacity: 0, duration: 0.22, ease: "power2.in" });
      gsap.to(overlay, {
        yPercent: -100,
        duration: 0.55,
        ease: "power4.inOut",
        onComplete: () => {
          if (!menuOpenRef.current) gsap.set(overlay, { display: "none" });
        },
      });
      setScrollLocked(false);
    }
  }, [menuOpen]);

  // Keyboard: Escape closes the menu; Tab is trapped inside the dialog
  useEffect(() => {
    if (!menuOpen) return;
    const overlay = overlayRef.current;
    if (!overlay) return;

    const focusables = () =>
      Array.from(
        overlay.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      );

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        burgerRef.current?.focus();
        return;
      }
      if (e.key !== "Tab") return;

      const items = focusables();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;

      if (e.shiftKey && (active === first || !overlay.contains(active))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && (active === last || !overlay.contains(active))) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const first = overlayRef.current?.querySelector<HTMLElement>("[data-menu-link]");
    first?.focus();
  }, [menuOpen]);

  const handleAnchor = (href: string) => {
    setMenuOpen(false);
    // Unlock scroll synchronously - the menu's own effect runs async, so
    // without this the still-stopped Lenis would swallow the scroll.
    setScrollLocked(false);
    scrollToTarget(href);
    // Return focus to the menu toggle so keyboard/AT users are never
    // left on a link that is about to be hidden by the overlay exit
    burgerRef.current?.focus({ preventScroll: true });
  };

  if (!ready) return null;

  return (
    <>
      <header
        ref={navRef}
        className={cx(styles.nav, scrolled && styles.scrolled)}
        style={{ opacity: 0 }}
      >
        <button
          type="button"
          className={styles.logo}
          onClick={() => scrollToTarget("#top")}
          aria-label="Back to top"
        >
          {site.shortName}
          <span className={styles.logoDot} aria-hidden="true">
            .
          </span>
        </button>

        <nav className={styles.desktopNav} aria-label="Primary">
          {site.nav.map((item, i) => (
            <button
              key={item.href}
              type="button"
              className={cx(styles.link, activeHref === item.href && styles.linkActive)}
              onClick={() => handleAnchor(item.href)}
              aria-current={activeHref === item.href ? "true" : undefined}
            >
              <span className={styles.linkIndex}>
                {formatNumber(i + 1)}
              </span>
              {item.label}
            </button>
          ))}
          <a className={styles.email} href={`mailto:${site.email}`}>
            {site.email}
          </a>
        </nav>

        <button
          ref={burgerRef}
          type="button"
          className={cx(styles.burger, menuOpen && styles.burgerOpen)}
          onClick={() => setMenuOpen((v) => !v)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-controls="mobile-menu"
        >
          <span />
          <span />
        </button>
      </header>

      <div
        ref={overlayRef}
        id="mobile-menu"
        className={styles.overlay}
        style={{ display: "none" }}
        aria-hidden={!menuOpen}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
      >
        <nav className={styles.overlayNav} aria-label="Mobile">
          {site.nav.map((item, i) => (
            <button
              key={item.href}
              type="button"
              className={cx(styles.overlayLink, activeHref === item.href && styles.overlayLinkActive)}
              data-menu-link
              onClick={() => handleAnchor(item.href)}
              aria-current={activeHref === item.href ? "true" : undefined}
            >
              <span className={styles.linkIndex}>
                {formatNumber(i + 1)}
              </span>
              {item.label}
            </button>
          ))}
        </nav>

        <div className={styles.overlayFooter}>
          <a href={`mailto:${site.email}`} data-menu-link className={styles.overlayEmail}>
            {site.email}
          </a>
          <p className={styles.overlayMeta} data-menu-link>
            {site.location}
          </p>
        </div>
      </div>
    </>
  );
}