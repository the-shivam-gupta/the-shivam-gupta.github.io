"use client";
import { useState, useEffect, useRef, useCallback } from "react";

const PROJECTS = [
  {
    id: "panel-labour",
    repo: "https://github.com/ShubhamKhale/labourServices",
    fileName: "LabourService.tsx",
    ext: "tsx",
    img: "/labor-v2.webp",
    comment: "// connecting job seekers with employers",
    desc: 'Labour Service connects job seekers to employers with trustworthy, convenient hiring tools. Users can recruit labourers, leave <strong>reviews and ratings</strong>, and build a community of trust across the labour services ecosystem.',
    highlights: ["Ratings", "Real-time feedback"],
    tags: [
      { label: "React Js", color: "#0891b2" },
      { label: "TypeScript", color: "#3178c6" },
      { label: "Ionic", color: "#3880ff" },
    ],
  },
  {
    id: "panel-shopverse",
    repo: "https://github.com/the-shivam-gupta/shopverse",
    fileName: "ShopVerse.jsx",
    ext: "jsx",
    img: "/shopverse-v2.webp",
    comment: "// modern eCommerce storefront",
    desc: 'A responsive eCommerce site built with <strong>React &amp; Vite</strong>, using Firebase for secure login and real-time data. Includes personalized user profiles, order history, and a cart-to-checkout flow that works cleanly on every screen size.',
    highlights: [
      "Google Authentication",
      "Wallet System",
      "Orders",
      "Improved LCP from 3.8s → 2.1s",
    ],
    tags: [
      { label: "React Js", color: "#0891b2" },
      { label: "Tailwind", color: "#38bdf8" },
      { label: "Firebase", color: "#f5a623" },
    ],
  },
  {
    id: "panel-medguide",
    repo: "https://github.com/PriyansuMaurya/MedGuide",
    fileName: "MedGuide.py",
    ext: "py",
    img: "/medguide-v2.webp",
    comment: "// ML-assisted diagnosis support",
    desc: 'MedGuide uses <strong>machine learning</strong> and natural language processing to help practitioners diagnose faster and with more confidence, surfacing insights that support informed treatment decisions.',
    highlights: ["ML Integration", "Real-time diagnosis input"],
    tags: [
      { label: "Python", color: "#3776ab" },
      { label: "Flask", color: "#4b5563" },
      { label: "Tailwind", color: "#38bdf8" },
    ],
  },
];

export default function ProjectSection() {
  const [openTabs, setOpenTabs] = useState([PROJECTS[0].id]);
  const [activeTab, setActiveTab] = useState(PROJECTS[0].id);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [storyVisible, setStoryVisible] = useState({});
  const [typedLine, setTypedLine] = useState("");
  const tabEndRef = useRef(null);
  const storyTypedRef = useRef(false);

  const activeProject = PROJECTS.find((p) => p.id === activeTab);

  function openTab(id) {
    setOpenTabs((prev) => (prev.includes(id) ? prev : [...prev, id]));
    setActiveTab(id);
  }

  function closeTab(id) {
    setOpenTabs((prev) => {
      const next = prev.filter((t) => t !== id);
      if (activeTab === id) {
        setActiveTab(next.length ? next[next.length - 1] : null);
      }
      return next;
    });
  }

  useEffect(() => {
    const tabbar = tabEndRef.current?.parentElement;
    if (tabbar) {
      tabbar.scrollLeft = tabbar.scrollWidth;
    }
  }, [openTabs]);

  const observerRef = useCallback(
    (node) => {
      if (!node) return;
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const step = entry.target.getAttribute("data-story");
            if (step === "3" || step === "5") {
              setStoryVisible((prev) => ({ ...prev, [step]: true }));
              obs.unobserve(entry.target);
            }
            if (step === "4" && !storyTypedRef.current) {
              storyTypedRef.current = true;
              const text = "visitor@shivam:~/projects$ ls";
              let i = 0;
              function typeChar() {
                if (i < text.length) {
                  setTypedLine(text.slice(0, i + 1));
                  i++;
                  setTimeout(typeChar, 60);
                }
              }
              typeChar();
              obs.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.35 }
      );
      node.querySelectorAll("[data-story]").forEach((el) => obs.observe(el));
      return () => obs.disconnect();
    },
    []
  );

  return (
    <section
      id="project"
      className="project-section projects-ide"
      ref={observerRef}
    >
      <div className="projects-ide__intro">
        <p
          className="projects-ide__eyebrow"
          data-story="3"
          style={{
            opacity: storyVisible["3"] ? 1 : 0.3,
            transform: storyVisible["3"]
              ? "none"
              : "translateY(12px)",
            transition:
              "opacity 0.7s ease, transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          }}
        >
          Selected Work
        </p>
        <h2
          className="project-title title"
          data-story="3"
          style={{
            opacity: storyVisible["3"] ? 1 : 0.3,
            transform: storyVisible["3"]
              ? "none"
              : "translateY(12px)",
            transition:
              "opacity 0.7s ease, transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          }}
        >
          {"Projects".split("").map((l, i) => (
            <span className="letter" key={i}>
              {l}
            </span>
          ))}
        </h2>
        <p className="projects-ide__terminal" data-story="4">
          {typedLine}
          <span className="projects-ide__cursor" aria-hidden="true"></span>
        </p>
      </div>

      <div
        className="projects-ide__window"
        data-story="5"
        style={{
          opacity: storyVisible["5"] ? 1 : 0.6,
          transform: storyVisible["5"]
            ? "none"
            : "translateY(8px)",
          transition:
            "opacity 0.8s ease, transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        }}
      >
        <div className="projects-ide__titlebar">
          <span className="projects-ide__dot projects-ide__dot--r"></span>
          <span className="projects-ide__dot projects-ide__dot--y"></span>
          <span className="projects-ide__dot projects-ide__dot--g"></span>
          <span className="projects-ide__titlebar-label">
            projects — portfolio
          </span>
        </div>

        <div className="projects-ide__body">
          <nav className="projects-ide__sidebar" aria-label="Project files">
            <p className="projects-ide__sidebar-label">Explorer</p>
            <button
              className="projects-ide__folder"
              type="button"
              aria-expanded={sidebarOpen}
              aria-controls="ide-filelist"
              onClick={() => setSidebarOpen((prev) => !prev)}
            >
              <span
                className="projects-ide__folder-chevron"
                aria-hidden="true"
              >
                ▾
              </span>
              <span>projects</span>
            </button>
            <div
              className={
                "projects-ide__filelist-wrap" +
                (sidebarOpen ? "" : " is-collapsed")
              }
              id="ide-filelist"
            >
              <ul className="projects-ide__filelist">
                {PROJECTS.map((p) => (
                  <li
                    key={p.id}
                    className={
                      "projects-ide__file" +
                      (activeTab === p.id ? " is-active" : "")
                    }
                  >
                    <button
                      className="projects-ide__file-btn"
                      data-target={p.id}
                      type="button"
                      onClick={() => openTab(p.id)}
                    >
                      <span className="projects-ide__ext" data-ext={p.ext}>
                        {p.ext.toUpperCase()}
                      </span>
                      <span className="projects-ide__file-name">
                        {p.fileName}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          <div
            className={
              "projects-ide__main" + (activeTab ? "" : " is-empty")
            }
          >
            <div className="projects-ide__tabbar">
              {openTabs.map((id) => {
                const p = PROJECTS.find((pr) => pr.id === id);
                if (!p) return null;
                return (
                  <div
                    key={p.id}
                    className={
                      "projects-ide__tab" +
                      (activeTab === p.id ? " is-active" : "")
                    }
                    data-target={p.id}
                    onClick={() => setActiveTab(p.id)}
                  >
                    <span className="projects-ide__tab-label">
                      {p.fileName}
                    </span>
                    <button
                      type="button"
                      className="projects-ide__tab-close"
                      aria-label={"Close " + p.fileName}
                      onClick={(e) => {
                        e.stopPropagation();
                        closeTab(p.id);
                      }}
                    >
                      <img
                        src="/close.webp"
                        alt=""
                        className="projects-ide__tab-close-icon"
                      />
                    </button>
                  </div>
                );
              })}
              <div ref={tabEndRef} />
            </div>

            {activeProject && (
              <>
                <div className="projects-ide__crumbbar">
                  <span>
                    projects /{" "}
                    <span className="projects-ide__crumb-file">
                      {activeProject.fileName}
                    </span>
                  </span>
                  <a
                    className="projects-ide__gh-link"
                    href={activeProject.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.09 3.29 9.4 7.86 10.93.57.1.78-.25.78-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.88-1.36-3.88-1.36-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.71.08-.71 1.17.08 1.78 1.2 1.78 1.2 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.8 1.19 1.83 1.19 3.09 0 4.43-2.7 5.4-5.26 5.69.41.36.78 1.06.78 2.14 0 1.55-.01 2.79-.01 3.17 0 .3.2.66.79.55A10.52 10.52 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5z" />
                    </svg>
                    View source
                  </a>
                </div>

                <div className="projects-ide__panels">
                  <article
                    className="projects-ide__panel is-active"
                    id={activeProject.id}
                    data-repo={activeProject.repo}
                  >
                    <div className="projects-ide__preview">
                      <img
                        src={activeProject.img}
                        alt={activeProject.fileName + " preview"}
                      />
                    </div>
                    <p className="projects-ide__comment">
                      {activeProject.comment}
                    </p>
                    <div className="projects-ide__row">
                      <p
                        className="projects-ide__desc"
                        dangerouslySetInnerHTML={{
                          __html: activeProject.desc,
                        }}
                      />
                      <div className="projects-ide__highlights">
                        {activeProject.highlights.map((h, i) => (
                          <span className="projects-ide__hl" key={i}>
                            {h}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="projects-ide__tags">
                      {activeProject.tags.map((t, i) => (
                        <span
                          className="projects-ide__tag"
                          style={{ "--dot": t.color }}
                          key={i}
                        >
                          {t.label}
                        </span>
                      ))}
                    </div>
                  </article>
                </div>
              </>
            )}

            <div className="projects-ide__empty" id="ide-empty">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden="true"
              >
                <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z" />
              </svg>
              <p className="projects-ide__empty-title">No file open</p>
              <p className="projects-ide__empty-sub">
                Pick a project from the sidebar to preview it here.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
