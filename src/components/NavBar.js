"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import ThemeToggle from "./ThemeToggle";

const SECTION_IDS = ["home", "about", "experience", "project", "github"];
const SECTION_LABELS = { github: "GitHub" };

export default function NavBar() {
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/";
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const indicatorRef = useRef(null);
  const scrollLockRef = useRef(false);
  const scrollLockTimeoutRef = useRef(null);

  function scrollToSection(id) {
    if (!isHome) {
      router.push(id === "home" ? "/" : `/#${id}`, { scroll: false });
      return;
    }

    setActiveSection(id);
    scrollLockRef.current = true;
    if (scrollLockTimeoutRef.current) clearTimeout(scrollLockTimeoutRef.current);

    if (id === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }

  useEffect(() => {
    const indicator = indicatorRef.current;

    function moveIndicator(item) {
      if (!indicator) return;
      indicator.style.width = item.offsetWidth + "px";
      indicator.style.transform = "translateX(" + item.offsetLeft + "px)";
    }

    function updateOnScroll() {
      setScrolled(window.scrollY > 12);
      if (!isHome || scrollLockRef.current) return;
      const scrollPos = window.scrollY + window.innerHeight * 0.35;
      let current = "home";
      SECTION_IDS.forEach((id) => {
        const section = document.getElementById(id);
        if (section && id !== "home" && section.offsetTop <= scrollPos) {
          current = id;
        }
      });
      setActiveSection(current);
    }

    let ticking = false;
    function onScroll() {
      if (scrollLockRef.current) {
        if (scrollLockTimeoutRef.current) clearTimeout(scrollLockTimeoutRef.current);
        scrollLockTimeoutRef.current = setTimeout(() => {
          scrollLockRef.current = false;
        }, 120);
      }
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        updateOnScroll();
        ticking = false;
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    updateOnScroll();

    function onResize() {
      const active = document.querySelector(".nav-pill__item.is-active");
      if (active) moveIndicator(active);
    }
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (scrollLockTimeoutRef.current) clearTimeout(scrollLockTimeoutRef.current);
    };
  }, [isHome]);

  useEffect(() => {
    const indicator = indicatorRef.current;
    const active = document.querySelector(
      `.nav-pill__item[data-section="${activeSection}"]`
    );
    if (indicator && active) {
      indicator.style.width = active.offsetWidth + "px";
      indicator.style.transform = "translateX(" + active.offsetLeft + "px)";
    }
  }, [activeSection]);

  useEffect(() => {
    if (!isHome) return;
    const hash = window.location.hash.replace("#", "");
    if (!hash || hash === "home" || !SECTION_IDS.includes(hash)) return;

    function goToHash() {
      const el = document.getElementById(hash);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }

    if (document.readyState === "complete") {
      const t = setTimeout(goToHash, 150);
      return () => clearTimeout(t);
    }
    window.addEventListener("load", goToHash, { once: true });
    return () => window.removeEventListener("load", goToHash);
  }, [isHome]);

  return (
    <header className={"header" + (scrolled ? " is-scrolled" : "")}>
      <button
        type="button"
        className="logo"
        data-section="home"
        aria-label="Shivam, Software Developer"
        onClick={() => scrollToSection("home")}
      >
        <img
          src="/shivam-logo.webp"
          alt="S"
          className="logo__img"
          width="500"
          height="500"
          decoding="async"
        />
        <span className="logo__name">hivam</span>
      </button>
      <div className="header__actions">
        <nav className="nav-pill" aria-label="Primary">
          <ul className="nav-pill__list">
            {SECTION_IDS.map((id) => (
              <li
                key={id}
                className={
                  "nav-pill__item" + (activeSection === id ? " is-active" : "")
                }
                data-section={id}
                onClick={() => scrollToSection(id)}
              >
                {SECTION_LABELS[id] || id.charAt(0).toUpperCase() + id.slice(1)}
              </li>
            ))}
          </ul>
          <span
            className="nav-pill__indicator"
            aria-hidden="true"
            ref={indicatorRef}
          ></span>
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
}
