"use client";
import { useEffect, useRef } from "react";
import HeroGL from "@/lib/hero-gl";
import Link from "next/link";

export default function HeroSection() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const typed = new Typed("#element", {
      strings: [
        "Full Stack Developer",
        "Performance Optimizer",
        "Open Source Contributor",
        "Learning by Building",
      ],
      typeSpeed: 50,
      backSpeed: 50,
      cursorChar: "|",
      loop: true,
    });

    const canvas = canvasRef.current;
    if (canvas && typeof mat4 !== "undefined") {
      new HeroGL(canvas);
    }

    return () => typed.destroy();
  }, []);

  return (
    <div id="header-container">
      <canvas id="hero-canvas" aria-hidden="true" ref={canvasRef}></canvas>
      <div className="content hero-intro">
        <h1 className="hero-intro__title">
          <span className="hero-intro__greeting">Hey, I&apos;m</span>
          <span className="hero-intro__name">
            Shivam
            <br />
            Gupta
          </span>
        </h1>
        <span id="element" className="hero-intro__typed"></span>
        <p className="hero-intro__bio">
          I build modern web applications that are fast, scalable, and built to
          last. From interactive frontends to CMS-powered platforms, I enjoy
          turning ideas into polished digital experiences.
        </p>
        <p className="hero-intro__bio">
          Currently building enterprise applications at Webmaffia while
          continuously exploring new technologies and contributing to open
          source.
        </p>
        <div className="hero-intro__actions">
          <Link
            className="hero-intro__resume"
            href="/resume"
          >
            Resume
          </Link>
          <div className="hero-intro__socials">
            <a
              href="https://www.linkedin.com/in/the-shivam-gupta"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              data-tooltip="LinkedIn"
            >
              <img src="/link.png" alt="" />
            </a>
            <a
              href="https://github.com/the-shivam-gupta"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              data-tooltip="GitHub"
            >
              <img src="/code.png" alt="" />
            </a>
          </div>
        </div>
      </div>

      <div className="skill-system" aria-label="Technical skills">
        <div className="skill-system__glow" aria-hidden="true"></div>
        <div className="skill-system__hub">
          <img src="/js-transparent.png" alt="JavaScript" />
        </div>

        <div className="skill-orbit skill-orbit--1">
          <div
            className="skill-planet skill-icon--html"
            style={{ "--orbit-t": 0 }}
          >
            <span className="skill-planet__body" aria-hidden="true"></span>
            <img src="/html.png" alt="HTML" />
          </div>
          <div
            className="skill-planet skill-icon--css"
            style={{ "--orbit-t": 0.5 }}
          >
            <span className="skill-planet__body" aria-hidden="true"></span>
            <img src="/css-3.png" alt="CSS" />
          </div>
        </div>

        <div className="skill-orbit skill-orbit--2">
          <div
            className="skill-planet skill-icon--react"
            style={{ "--orbit-t": 0.25 }}
          >
            <span className="skill-planet__body" aria-hidden="true"></span>
            <img src="/physics.png" alt="React" />
          </div>
          <div
            className="skill-planet skill-icon--github"
            style={{ "--orbit-t": 0.75 }}
          >
            <span className="skill-planet__body" aria-hidden="true"></span>
            <img src="/github.png" alt="GitHub" />
          </div>
        </div>

        <div className="skill-orbit skill-orbit--3">
          <div
            className="skill-planet skill-icon--mysql"
            style={{ "--orbit-t": 0.125 }}
          >
            <span className="skill-planet__body" aria-hidden="true"></span>
            <img src="/mysql.png" alt="MySQL" />
          </div>
          <div
            className="skill-planet skill-icon--python"
            style={{ "--orbit-t": 0.625 }}
          >
            <span className="skill-planet__body" aria-hidden="true"></span>
            <img src="/python.png" alt="Python" />
          </div>
        </div>

        <div className="skill-orbit skill-orbit--4">
          <div
            className="skill-planet skill-icon--java"
            style={{ "--orbit-t": 0.875 }}
          >
            <span className="skill-planet__body" aria-hidden="true"></span>
            <img src="/java.png" alt="Java" />
          </div>
          <div
            className="skill-planet skill-icon--nextjs"
            style={{ "--orbit-t": 0.375 }}
          >
            <span className="skill-planet__body" aria-hidden="true"></span>
            <img src="/nextjs.webp" alt="nextjs" />
          </div>
        </div>

        <div className="skill-orbit skill-orbit--5">
          <div className="skill-planet skill-icon--c" style={{ "--orbit-t": 0 }}>
            <span className="skill-planet__body" aria-hidden="true"></span>
            <img src="/c-.png" alt="C" />
          </div>
        </div>
      </div>
    </div>
  );
}
