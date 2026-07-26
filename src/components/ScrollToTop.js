"use client";
import { useEffect, useRef, useState } from "react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const fillRef = useRef(null);
  const circumference = 125.66;

  useEffect(() => {
    window.scrollTo(0, 0);

    function update() {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;
      if (fillRef.current) {
        fillRef.current.style.strokeDashoffset =
          circumference * (1 - progress);
      }
      setVisible(scrollTop > 300);
    }
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, []);

  function scrollToTop(e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <a
      id="button"
      className={visible ? "show" : ""}
      onClick={scrollToTop}
    >
      <svg className="progress-ring" viewBox="0 0 48 48" aria-hidden="true">
        <circle className="progress-ring__bg" cx="24" cy="24" r="18.5" />
        <circle className="progress-ring__track" cx="24" cy="24" r="20" />
        <circle
          className="progress-ring__fill"
          cx="24"
          cy="24"
          r="20"
          ref={fillRef}
        />
        <g className="progress-ring__arrows">
          <path d="M 19,26 L 24,21 L 29,26" />
        </g>
      </svg>
    </a>
  );
}
