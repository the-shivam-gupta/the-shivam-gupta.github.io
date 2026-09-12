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
                I started my journey when I first joined coaching for JEE, but
                didn&apos;t get the results I expected. After MHT-CET, I joined
                Atharva College. Since it was a COVID year, my 1st and half of
                my 2nd year were spent online — we didn&apos;t really know how
                online exams would go, so there was constant pressure looming
                over how the year would turn out. After we got offline
                lectures, things started getting exciting. Within my 2nd and
                3rd year I discovered I loved building web apps, and started
                learning by following tutorials (shoutout Code with Harry).
                After finishing my 3rd year, in my 4th year I dedicated a year
                to preparing for GATE — but it didn&apos;t end well. After
                that, I started applying, got a referral from a friend I met
                at Sabha for an opening at Webmaffia, the interview went well,
                and
                that&apos;s how I became a Junior Full Stack Developer.
                Looking for new opportunities ahead.
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
                These days I spend my time building web apps and tailored web
                CMS solutions for clients like Lupin Global, Welspun Flooring,
                and Tata Intellion, among others. I&apos;ve also improved
                performance metrics for clients like Lupin Global and Lupin
                US — taking LCP score from 6.5s to 2.5s, and overall
                performance score from 56% to 96%.
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
                Beyond code, I like to play mobile and PC games like COC and
                WOTB. I also love playing outdoor games — only when all my
                friends agree to it.
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
