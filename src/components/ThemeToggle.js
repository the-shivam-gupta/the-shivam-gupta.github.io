"use client";
import { useEffect, useRef, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState(null);
  const trackRef = useRef(null);
  const sunBgRef = useRef(null);
  const moonBgRef = useRef(null);
  const thumbRef = useRef(null);
  const thumbIconSunRef = useRef(null);
  const thumbIconMoonRef = useRef(null);

  useEffect(() => {
    const initial = document.documentElement.getAttribute("data-theme") || "dark";
    setTheme(initial);
  }, []);

  useEffect(() => {
    if (!theme) return;

    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);

    const isDark = theme === "dark";
    const track = trackRef.current;
    const thumb = thumbRef.current;
    if (!track || !thumb) return;

    function applyPositions() {
      const trackStyle = getComputedStyle(track);
      const paddingX =
        parseFloat(trackStyle.paddingLeft) + parseFloat(trackStyle.paddingRight);
      const travel = track.clientWidth - paddingX - thumb.offsetWidth;
      thumb.style.transform = `translateX(${isDark ? travel : 0}px)`;
    }

    applyPositions();

    if (sunBgRef.current) sunBgRef.current.style.opacity = isDark ? "0.35" : "1";
    if (moonBgRef.current) moonBgRef.current.style.opacity = isDark ? "1" : "0.35";

    if (thumbIconSunRef.current) {
      thumbIconSunRef.current.style.opacity = isDark ? "0" : "1";
      thumbIconSunRef.current.style.transform = isDark
        ? "rotate(90deg) scale(0.4)"
        : "rotate(0deg) scale(1)";
    }
    if (thumbIconMoonRef.current) {
      thumbIconMoonRef.current.style.opacity = isDark ? "1" : "0";
      thumbIconMoonRef.current.style.transform = isDark
        ? "rotate(0deg) scale(1)"
        : "rotate(-90deg) scale(0.4)";
    }

    window.addEventListener("resize", applyPositions);
    return () => window.removeEventListener("resize", applyPositions);
  }, [theme]);

  function toggleTheme() {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  }

  return (
    <button
      type="button"
      className="header__theme-toggle"
      role="switch"
      aria-checked={theme === "dark"}
      aria-label="Toggle dark mode"
      onClick={toggleTheme}
    >
      <span ref={trackRef} className="header__theme-track">
        <span className="header__theme-icon-layer">
          <span ref={sunBgRef} className="header__theme-icon-wrap">
            <SunIcon className="header__theme-layer-svg" />
          </span>
          <span ref={moonBgRef} className="header__theme-icon-wrap">
            <MoonIcon className="header__theme-layer-svg" />
          </span>
        </span>
        <span ref={thumbRef} className="header__theme-thumb">
          <span ref={thumbIconSunRef} className="header__theme-thumb-layer">
            <SunIcon className="header__theme-thumb-svg header__theme-thumb-svg--sun" />
          </span>
          <span ref={thumbIconMoonRef} className="header__theme-thumb-layer">
            <MoonIcon className="header__theme-thumb-svg header__theme-thumb-svg--moon" />
          </span>
        </span>
      </span>
    </button>
  );
}

function SunIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.75" />
      <path
        d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MoonIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
