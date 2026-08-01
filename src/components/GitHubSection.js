"use client";
import { useState, useEffect, useRef } from "react";
import { GitHubCalendar } from "react-github-calendar";
import "react-github-calendar/tooltips.css";

const USERNAME = "the-shivam-gupta";
const CURRENT_YEAR = new Date().getFullYear();
const MIN_YEAR = 2016;

const THEME = {
  light: ["#ebedf0", "#c8def0", "#8bbbe0", "#4f94cc", "#3b82c4"],
  dark: ["#1a2735", "#1d3a55", "#24527a", "#2f6fa3", "#3b82c4"],
};

export default function GitHubSection() {
  const [colorScheme, setColorScheme] = useState("dark");
  const [year, setYear] = useState("last");
  const [mounted, setMounted] = useState(false);
  const panelRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const applyTheme = () => {
      const theme = document.documentElement.getAttribute("data-theme");
      setColorScheme(theme === "dark" ? "dark" : "light");
    };
    applyTheme();
    const observer = new MutationObserver(applyTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;
    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              panel.classList.add("github-in-view");
              observer.unobserve(panel);
            }
          });
        },
        { threshold: 0.15, rootMargin: "0px 0px -5% 0px" }
      );
      observer.observe(panel);
      return () => observer.disconnect();
    } else {
      panel.classList.add("github-in-view");
    }
  }, []);

  function goPrev() {
    setYear((y) => {
      if (y === "last") return CURRENT_YEAR;
      return Math.max(MIN_YEAR, y - 1);
    });
  }

  function goNext() {
    setYear((y) => {
      if (y === "last") return y;
      if (y >= CURRENT_YEAR) return "last";
      return y + 1;
    });
  }

  const yearLabel = year === "last" ? "Last 12 months" : String(year);

  return (
    <section className="github-container" id="github">
      <div className="container github-wrap">
        <div className="github-panel" ref={panelRef}>
          <div className="github-heading">
            <p className="github-kicker">My GitHub</p>
            <h2 className="github-title title">
              {"GitHub".split("").map((l, i) => (
                <span className="letter" key={i}>
                  {l}
                </span>
              ))}
            </h2>
            <p className="github-sub">
              Hover a cell to see how active I was that day — click it to jump
              to the commits on GitHub.
            </p>
          </div>

          <div className="github-toolbar">
            <div className="github-years" role="group" aria-label="Select year">
              <button
                type="button"
                className="github-years__btn"
                onClick={goPrev}
                aria-label="Previous year"
              >
                <i className="fa-solid fa-chevron-left"></i>
              </button>
              <span className="github-years__label">{yearLabel}</span>
              <button
                type="button"
                className="github-years__btn"
                onClick={goNext}
                aria-label="Next year"
                disabled={year === "last"}
              >
                <i className="fa-solid fa-chevron-right"></i>
              </button>
            </div>
          </div>

          <div className="github-calendar">
            {mounted && (
              <GitHubCalendar
                username={USERNAME}
                year={year}
                colorScheme={colorScheme}
                theme={THEME}
                blockSize={16}
                blockMargin={4}
                fontSize={14}
                showWeekdayLabels={false}
                showMonthLabels
                showTotalCount
                showColorLegend
                labels={{
                  totalCount:
                    year === "last"
                      ? "{{count}} contributions in the last 12 months"
                      : "{{count}} contributions in {{year}}",
                }}
                tooltips={{
                  activity: {
                    placement: "top",
                    offset: 10,
                    withArrow: true,
                    hoverRestMs: 80,
                    transitionStyles: {
                      initial: { opacity: 0 },
                      open: { opacity: 1 },
                      close: { opacity: 0 },
                      duration: 150,
                    },
                    text: (activity) => {
                      const date = new Date(
                        activity.date + "T00:00:00"
                      ).toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      });
                      return activity.count > 0
                        ? `${activity.count} contribution${
                            activity.count === 1 ? "" : "s"
                          } on ${date}`
                        : `No contributions on ${date}`;
                    },
                  },
                }}
                renderBlock={(block, activity) => (
                  <a
                    key={activity.date}
                    className="github-cell"
                    href={`https://github.com/the-shivam-gupta?tab=overview&from=${activity.date}&to=${activity.date}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${activity.count} contributions on ${activity.date}`}
                  >
                    {block}
                  </a>
                )}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
