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

function Dot() {
  return <span className="resume-doc__pipe"> • </span>;
}

export default function Resume() {
  return (
    <main className="resume-page">
      <article className="resume-doc">
        <header className="resume-doc__masthead">
          <h1 className="resume-doc__name">Shivam Gupta</h1>
          <p className="resume-doc__headline">
            Full Stack Developer — Next.js · React · Redux · Strapi · Node.js
          </p>
          <p className="resume-doc__contact">
            Mumbai, India
            <Dot />
            +91-9326257600
            <Dot />
            <a href="mailto:theshivamgupta.dev@gmail.com">theshivamgupta.dev@gmail.com</a>
            <Dot />
            Portfolio: <Link href={PROFILE.portfolio}>the-shivam-gupta.github.io</Link>
            <Dot />
            LinkedIn:{" "}
            <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer">
              linkedin.com/in/the-shivam-gupta
            </a>
          </p>
        </header>

        <section className="resume-doc__section" aria-labelledby="resume-summary">
          <h2 id="resume-summary" className="resume-doc__section-title">
            Summary
          </h2>
          <p className="resume-doc__paragraph">
            Full Stack Developer with hands-on production experience across
            Next.js, React, and headless CMS (Strapi) architectures. Delivers
            accessible, animated UI components and Figma-to-production
            features on live client platforms, backed by 1.5+ years of
            open-source contribution across accessibility and
            performance-focused codebases. Strong CS fundamentals from
            focused GATE-level preparation in DSA, OS, DBMS, and Computer
            Networks.
          </p>
        </section>

        <section className="resume-doc__section" aria-labelledby="resume-experience">
          <h2 id="resume-experience" className="resume-doc__section-title">
            Experience
          </h2>
          <div className="resume-doc__entry">
            <p className="resume-doc__role-line">
              <strong>Full Stack Developer</strong>
              <Pipe />
              <span className="resume-doc__role-org">
                Pixtop Media Solutions Pvt Ltd (Webmaffia)
              </span>
            </p>
            <p className="resume-doc__role-sub">
              Feb 2026 – Present
              <Dot />
              Mumbai, India
            </p>
            <ul className="resume-doc__bullets-1">
              <li>
                Built and maintain a large-scale investor relations web
                portal with CMS-driven content, multi-tab layouts, and
                in-browser PDF rendering, used by external stakeholders for
                regulatory disclosures.
              </li>
              <li>
                Engineered reusable, animated UI components (GSAP/Framer
                Motion) adopted across multiple product modules, ensuring
                consistent behavior across desktop and mobile breakpoints.
              </li>
              <li>
                Set up a Strapi CMS backed by MySQL from scratch, defining
                content types, relations, and REST APIs that content teams
                use to manage data without engineering support.
              </li>
              <li>
                Owned features end-to-end from Figma design handoff through
                production deployment across multiple release cycles,
                coordinating directly with design and QA.
              </li>
            </ul>
          </div>
          <div className="resume-doc__entry">
            <p className="resume-doc__role-line">
              <strong>Technical Prep (GATE — Computer Science)</strong>
              <Pipe />
              <span className="resume-doc__role-org">Self-Directed</span>
            </p>
            <p className="resume-doc__role-sub">
              Jan 2025 – Feb 2026
              <Dot />
              Mumbai, India
            </p>
            <ul className="resume-doc__bullets-1">
              <li>
                Completed intensive, self-directed study of core Computer
                Science fundamentals — Data Structures &amp; Algorithms,
                Operating Systems, DBMS, and Computer Networks —
                strengthening problem-solving and system-design foundations
                applied directly in current engineering work.
              </li>
            </ul>
          </div>
          <div className="resume-doc__entry">
            <p className="resume-doc__role-line">
              <strong>Open Source Contributor</strong>
              <Pipe />
              <span className="resume-doc__role-org">Community Contributions</span>
            </p>
            <p className="resume-doc__role-sub">
              Aug 2023 – Jan 2025
              <Dot />
              Remote
            </p>
            <ul className="resume-doc__bullets-1">
              <li>
                <strong>LinksHub:</strong> Improved accessibility to WCAG 2.1
                standards and resolved 10+ UI bugs during Hacktoberfest 2023.
              </li>
              <li>
                <strong>AI-Fusion:</strong> Enhanced UI/UX using TypeScript
                and optimized dark mode; implemented card sorting that
                improved navigation speed by 25%.
              </li>
              <li>
                <strong>Namespace:</strong> Improved responsiveness and fixed
                navigation issues, enhancing the mobile experience.
              </li>
              <li>
                <strong>React-native-authkit:</strong> Authored a
                comprehensive README for the RTK Query Auth Template,
                boosting developer onboarding speed.
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
              <strong>ShopVerse:</strong> Implemented authentication
              (email/password + Google) with real-time Firestore sync; built
              wallet, rewards, and orders modules that boosted user
              retention by 15%. Reduced LCP from 3.8s to 2.1s through Core
              Web Vitals optimization.
            </li>
            <li>
              <strong>MedGuide:</strong> Adapted an ML-powered diagnostic
              tool into a clinician-friendly Flask interface with real-time
              symptom input, improving diagnostic accuracy by 20%.
            </li>
            <li>
              <strong>LabourServices:</strong> Built a job-matching app
              (Ionic + React) connecting 50+ workers with customers, with
              real-time feedback and ratings to maintain service quality.
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
              <span className="resume-doc__skill-label"><strong>Backend:</strong></span> Strapi,
              Node.js, RESTful APIs, Firebase (Auth, Firestore, Storage)
            </li>
            <li>
              <span className="resume-doc__skill-label"><strong>State Management:</strong></span> {" "}
              Redux, Redux Toolkit, Context API
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
              <span className="resume-doc__skill-label"><strong>Tools &amp; Practices:</strong></span> {" "}
              Git, GitHub, GitHub Actions, Figma, CI/CD, Accessibility (WCAG
              2.1), Core Web Vitals, Performance Optimization
            </li>
          </ul>
        </section>

        <section className="resume-doc__section" aria-labelledby="resume-education">
          <h2 id="resume-education" className="resume-doc__section-title">
            Education
          </h2>
          <div className="resume-doc__entry">
            <p className="resume-doc__role-line">
              <strong>B.E. Computer Science</strong>
              <Pipe />
              <span className="resume-doc__role-org">
                Atharva College of Engineering, Mumbai
              </span>
            </p>
            <p className="resume-doc__role-sub">
              Jan 2021 – May 2024
              <Dot />
              GPA: 9.06 / 10
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
              <strong>Best Project of the Session:</strong> Awarded to
              MedGuide at Projectathon 2.0 (National-Level Competition).
            </li>
            <li>
              <strong>Published Research:</strong> AI-Driven Healthcare
              Application at ICSTEMSD 2024 — symptom analysis and medication
              engine with vital-sign-based dietary recommendations.
            </li>
            <li>
              <strong>Projectathon Volunteer:</strong> Coordinated
              participants and managed event operations for 100+ attendees
              in a national-level competition.
            </li>
          </ul>
        </section>
      </article>
    </main>
  );
}
