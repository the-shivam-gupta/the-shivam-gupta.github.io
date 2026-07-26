"use client";
import { useEffect, useRef } from "react";

export default function ExperienceSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const items = sectionRef.current?.querySelectorAll(".exp-item");
    if (!items?.length) return;

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            entry.target.classList.toggle("exp-in-view", entry.isIntersecting);
          });
        },
        { threshold: 0.2, rootMargin: "0px 0px -8% 0px" }
      );
      items.forEach((item) => observer.observe(item));
      return () => observer.disconnect();
    } else {
      items.forEach((item) => item.classList.add("exp-in-view"));
    }
  }, []);

  return (
    <section id="experience" ref={sectionRef}>
      <div className="exp-inner">
        <div className="exp-kicker">Journey &amp; Milestones</div>
        <h2 className="exp-title">Professional Experience</h2>
        <p className="exp-subtitle">
          A chronicle of my technical evolution, from academic foundations to
          real client work and contributions to the open-source ecosystem.
        </p>

        <div className="exp-timeline">
          <div className="exp-item" style={{ "--exp-dot-color": "#3b82c4" }}>
            <span className="exp-dot"></span>
            <div className="exp-card">
              <div className="exp-badge-row">
                <span className="exp-badge">Current</span>
                <span className="exp-date">Feb 2026 — Present</span>
              </div>
              <h3>Junior Full Stack Developer</h3>
              <div className="exp-org">Webmaffia (Pixtop Media Solutions)</div>
              <ul className="exp-list">
                <li>Building large investor relation platforms</li>
                <li>Creating reusable UI components</li>
                <li>Developing dynamic CMS solutions using Strapi</li>
                <li>Shipping features from Figma all the way to production</li>
                <li>Making websites responsive, smooth and fast</li>
              </ul>
            </div>
          </div>

          <div className="exp-item" style={{ "--exp-dot-color": "#6eb3e4" }}>
            <span className="exp-dot"></span>
            <div className="exp-card">
              <div className="exp-badge-row">
                <span className="exp-badge">Ongoing</span>
                <span className="exp-date">Continuous</span>
              </div>
              <h3>Open Source Contributor</h3>
              <div className="exp-org">Independent</div>
              <p>
                I enjoy contributing to open source. Over the years I&apos;ve
                contributed to projects focused on accessibility, UI
                improvements, developer experience, and documentation.
              </p>
              <p className="exp-oss-sub">
                Some of the communities I&apos;ve contributed to:
              </p>
              <ul className="exp-list">
                <li>LinksHub</li>
                <li>AI Fusion</li>
                <li>Namespace</li>
                <li>React Native Auth Kit</li>
              </ul>
              <p>
                Whether it&apos;s fixing bugs, improving accessibility, or
                writing better documentation, I enjoy contributing to projects
                that help other developers.
              </p>
            </div>
          </div>

          <div className="exp-item" style={{ "--exp-dot-color": "#2563a8" }}>
            <span className="exp-dot"></span>
            <div className="exp-card" style={{ position: "relative" }}>
              <span className="exp-gpa">9.06 GPA</span>
              <div className="exp-badge-row">
                <span className="exp-badge">Degree</span>
                <span className="exp-date">Graduated</span>
              </div>
              <h3>Bachelor of Computer Science</h3>
              <div className="exp-org">Atharva College of Engineering</div>
              <p>
                Built a strong foundation in software engineering, data
                structures, and web development - the base this career is
                growing from.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
