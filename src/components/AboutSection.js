"use client";
import { useState, useEffect, useRef } from "react";

const TABS = [
  { id: "about-panel-story", label: "My Story" },
  { id: "about-panel-work", label: "How I Work" },
  { id: "about-panel-life", label: "Beyond Code" },
];

export default function AboutSection() {
  const [activeTab, setActiveTab] = useState("about-panel-story");
  const indicatorRef = useRef(null);

  function moveIndicator(tabEl) {
    const indicator = indicatorRef.current;
    if (!indicator || !tabEl) return;
    indicator.style.width = tabEl.offsetWidth + "px";
    indicator.style.transform = "translateX(" + tabEl.offsetLeft + "px)";
  }

  useEffect(() => {
    const tab = document.querySelector(".about-tab.is-active");
    if (tab) moveIndicator(tab);
  }, []);

  useEffect(() => {
    const tab = document.querySelector(
      `.about-tab[data-target="${activeTab}"]`
    );
    if (tab) moveIndicator(tab);
  }, [activeTab]);

  useEffect(() => {
    function onResize() {
      const tab = document.querySelector(
        `.about-tab[data-target="${activeTab}"]`
      );
      if (tab) moveIndicator(tab);
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [activeTab]);

  useEffect(() => {
    const el = document.getElementById("about");
    if (!el) return;
    function reveal() {
      const top = el.getBoundingClientRect().top;
      const visible = 150;
      if (top < window.innerHeight - visible) {
        el.classList.add("active");
      } else {
        el.classList.remove("active");
      }
    }
    let ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        reveal();
        ticking = false;
      });
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    reveal();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="container reveal" id="about">
      <div className="about-container">
        <div className="about-img">
          <span
            className="about-img__corner about-img__corner--tl"
            aria-hidden="true"
          ></span>
          <span
            className="about-img__corner about-img__corner--br"
            aria-hidden="true"
          ></span>
          <img
            src="/transparent-image.webp"
            alt="Shivam Gupta"
            width="388"
            height="644"
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="about-content">
          <p className="about-kicker">WHO I AM</p>
          <h1>A little about me</h1>

          <div
            className="about-tabs"
            role="tablist"
            aria-label="About sections"
          >
            {TABS.map((tab, i) => (
              <button
                key={tab.id}
                className={
                  "about-tab" + (activeTab === tab.id ? " is-active" : "")
                }
                type="button"
                role="tab"
                aria-selected={activeTab === tab.id}
                data-target={tab.id}
                onClick={() => setActiveTab(tab.id)}
              >
                <span className="about-tab__num" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="about-tab__label">{tab.label}</span>
              </button>
            ))}
            <span
              className="about-tab-indicator"
              aria-hidden="true"
              ref={indicatorRef}
            ></span>
          </div>

          <div className="about-panels">
            <div
              className={
                "about-panel" +
                (activeTab === "about-panel-story" ? " is-active" : "")
              }
              id="about-panel-story"
              role="tabpanel"
            >
              <p className="about-lead">
                I&apos;m not the kind of developer who started coding because I
                knew exactly where it would take me. I started because I was
                curious, and somewhere along the way that curiosity turned into
                a career.
              </p>
            </div>
            <div
              className={
                "about-panel" +
                (activeTab === "about-panel-work" ? " is-active" : "")
              }
              id="about-panel-work"
              role="tabpanel"
            >
              <p className="about-lead">
                These days I spend my time building web applications, solving
                interesting problems, and making sure the little details
                don&apos;t get overlooked. I enjoy clean interfaces, smooth
                interactions, and the kind of user experience people don&apos;t
                have to think about.
              </p>
            </div>
            <div
              className={
                "about-panel" +
                (activeTab === "about-panel-life" ? " is-active" : "")
              }
              id="about-panel-life"
              role="tabpanel"
            >
              <p className="about-more">
                And when I&apos;m away from work? I&apos;m usually learning
                something new, contributing to open source, or tweaking a side
                project that definitely started as &ldquo;just a quick
                experiment.&rdquo;
              </p>
            </div>
          </div>

          <blockquote className="about-callout">
            &ldquo;The best interfaces are the ones users never have to think
            about.&rdquo;
          </blockquote>
        </div>
      </div>
    </div>
  );
}
