import Link from "next/link";

/** Update these to your live profile URLs */
const PROFILE = {
  portfolio: "/",
  github: "https://github.com/the-shivam-gupta",
  linkedin: "https://www.linkedin.com/in/the-shivam-gupta",
  // x: "https://x.com",
};

function Pipe() {
  return <span className="resume-doc__pipe"> | </span>;
}

export default function Resume() {
  return (
    <main className="resume-page">
      <article className="resume-doc">
        <header className="resume-doc__masthead">
          <h1 className="resume-doc__name">Shivam Gupta</h1>
          <p className="resume-doc__headline">
            Full Stack Developer | NextJS | MySQL | Redux | Strapi
          </p>
          <p className="resume-doc__links">
            <Link href={PROFILE.portfolio}>Portfolio</Link>
            <Pipe />
            <a href={PROFILE.github} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <Pipe />
            <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            {/* <Pipe />
            <a href={PROFILE.x} target="_blank" rel="noopener noreferrer">
              X
            </a> */}
          </p>
          <p className="resume-doc__contact">
            Mumbai | +91-9326257600 | <a href="mailto:theshivamgupta.dev@gmail.com">theshivamgupta.dev@gmail.com</a>
          </p>
        </header>

        <section className="resume-doc__section" aria-labelledby="resume-experience">
          <h2 id="resume-experience" className="resume-doc__section-title">
            Experience
          </h2>
          <div className="resume-doc__entry">
            <div className="resume-doc__entry-head">
              <p className="resume-doc__role-line">
                <span className="resume-doc__bullet-char" aria-hidden>
                  1.
                </span>{" "}
                Full Stack Developer
              </p>
              <span className="resume-doc__muted">Feb 2026 – Present</span>
            </div>
            <p className="resume-doc__role-sub">
              Pixtop Media Solutions Pvt Ltd (Webmaffia) — Mumbai, India
            </p>
            <ul className="resume-doc__bullets-1">
              <li>
                Built and maintained a large investor relations web portal with
                content managed through a CMS, including multi-tab layouts and PDF
                file support.
              </li>
              <li>
                Created reusable UI components with smooth animations that work
                well on both desktop and mobile devices.
              </li>
              <li>
                Created Strapi CMS with MySQL, setting up content types and APIs
                for dynamic data management.
              </li>
              <li>
                Delivered end-to-end features from Figma design handoff to
                production deployment across multiple release cycles.
              </li>
            </ul>
          </div>
          <div className="resume-doc__entry">
            <div className="resume-doc__entry-head">
              <p className="resume-doc__role-line">
                <span className="resume-doc__bullet-char" aria-hidden>
                  2.
                </span>{" "}
                Open Source Contributor
              </p>
              <span className="resume-doc__muted">Aug 2023 – Jan 2025</span>
            </div>
            <p className="resume-doc__role-sub">Community Contributor</p>
            <ul className="resume-doc__bullets-1">
              <li>
                <strong>LinksHub:</strong> Improved accessibility (WCAG 2.1) and
                fixed 10+ UI bugs during Hacktoberfest 2023.
              </li>
              <li>
                <strong>AI-Fusion:</strong> Enhanced UI/UX using TypeScript,
                optimized dark mode, and implemented card sorting, improving
                navigation speed by 25%.
              </li>
              <li>
                <strong>Namespace:</strong> Improved responsiveness, fixed
                navigation issues, and enhanced mobile experience.
              </li>
              <li>
                <strong>React-native-authkit:</strong> Created comprehensive README
                for RTK Query Auth Template, boosting developer onboarding speed.
              </li>
            </ul>
          </div>
        </section>

        <section className="resume-doc__section" aria-labelledby="resume-projects">
          <h2 id="resume-projects" className="resume-doc__section-title">
            Projects
          </h2>
          <ul className="resume-doc__bullets">
            <li>
              <strong>ShopVerse:</strong> Implemented authentication (email/password
              + Google) and real-time Firestore sync. Developed wallet, rewards, and
              orders modules, boosting user retention by 15%. Optimized Core Web
              Vitals by reducing LCP from 3.8s to 2.1s.
            </li>
            <li>
              <strong>MedGuide:</strong> Adapted an ML-powered diagnostic tool into a
              clinician-friendly interface, improving diagnostic accuracy by 20% and
              enabling real-time symptom input via Flask UI.
            </li>
            <li>
              <strong>LabourServices:</strong> Developed a job-matching app using Ionic
              + React, connecting 50+ workers with customers. Integrated real-time
              feedback and ratings to ensure service quality.
            </li>
          </ul>
        </section>

        <section className="resume-doc__section" aria-labelledby="resume-skills">
          <h2 id="resume-skills" className="resume-doc__section-title">
            Skills
          </h2>
          <ul className="resume-doc__bullets">
            <li>
              <span className="resume-doc__skill-label"><strong>Frontend:</strong></span> NextJS,
              ReactJS, Redux Toolkit, Tailwind CSS, HTML5, CSS3
            </li>
            <li>
              <span className="resume-doc__skill-label"><strong>Animation:</strong></span> GSAP,
              Framer Motion
            </li>
            <li>
              <span className="resume-doc__skill-label"><strong>Languages:</strong></span> JavaScript
              (ES6+), Python
            </li>
            <li>
              <span className="resume-doc__skill-label"><strong>Backend:</strong></span> Strapi,
              Firebase (Auth, Firestore, Storage), RESTful API, Node.js
            </li>
            <li>
              <span className="resume-doc__skill-label"><strong>State Management:</strong></span> {" "}
              Redux, Redux Toolkit, Context API
            </li>
            <li>
              <span className="resume-doc__skill-label"><strong>Tools:</strong></span> Git, GitHub,
              Figma, GitHub Actions
            </li>
            <li>
              <span className="resume-doc__skill-label"><strong>Concepts:</strong></span> CI/CD,
              Accessibility (WCAG 2.1), Core Web Vitals, Performance Optimization
            </li>
          </ul>
        </section>

        <section className="resume-doc__section" aria-labelledby="resume-education">
          <h2 id="resume-education" className="resume-doc__section-title">
            Education
          </h2>
          <div className="resume-doc__entry">
            <div className="resume-doc__education-head">
              <p className="resume-doc__paragraph resume-doc__paragraph--tight">
                <strong>Atharva College of Engineering –</strong> Mumbai, India
              </p>
              <span className="resume-doc__muted">Jan 2021 – May 2024</span>
            </div>
            <p className="resume-doc__paragraph resume-doc__paragraph--tight resume-doc__indent">
              B.E. Computer Science; GPA: 9.06
            </p>
          </div>
        </section>

        <section
          className="resume-doc__section"
          aria-labelledby="resume-achievements"
        >
          <h2 id="resume-achievements" className="resume-doc__section-title">
            Achievements &amp; Contributions
          </h2>
          <ul className="resume-doc__bullets">
            <li>
              <strong>AI-Driven Healthcare Application – ICSTEMSD2024:</strong>{" "}
              Developed a symptom analysis and medication engine with vital
              monitoring for personalized dietary recommendations.
            </li>
            <li>
              <strong>Best Project of the Session:</strong> Awarded at Projectathon
              2.0 (National Level Competition)
            </li>
            <li>
              <strong>Projectathon Volunteer:</strong> Coordinated participants and
              managed event operations for 100+ attendees in a national-level
              competition.
            </li>
          </ul>
        </section>
      </article>
    </main>
  );
}
