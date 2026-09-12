export interface Service {
  index: string;
  /** Rendered as stacked lines, deliberately - not auto-wrapped. */
  title: string[];
  description: string;
  technologies: string[];
}

export const services: Service[] = [
  {
    index: "01",
    title: ["Full Stack", "Development"],
    description:
      "Production web applications built end-to-end - Next.js and React frontends on Strapi and Node.js backends.",
    technologies: ["Next.js", "React", "Node.js"],
  },
  {
    index: "02",
    title: ["Web", "Applications"],
    description:
      "Complex product interfaces - portals, tools and platforms - built for state, speed and the people using them.",
    technologies: ["React", "Redux Toolkit", "Firebase", "Context API"],
  },
  {
    index: "03",
    title: ["UI / UX", "Engineering"],
    description:
      "Interfaces designed and built as one process, from Figma to production, with accessibility built in from the first commit.",
    technologies: ["Figma", "Design Systems", "WCAG 2.1"],
  },
  {
    index: "04",
    title: ["Performance", "& Optimization"],
    description:
      "Audits and refactors that keep motion-heavy sites fast, with Core Web Vitals checked at every step, not just at launch.",
    technologies: ["Core Web Vitals", "Lighthouse", "CI/CD"],
  },
  {
    index: "05",
    title: ["CMS & API", "Integration"],
    description:
      "Headless CMS platforms wired up cleanly - content types, relations and REST APIs modelled so content teams can self-serve.",
    technologies: ["Strapi", "RESTful APIs", "MySQL", "Firebase"],
  },
  {
    index: "06",
    title: ["Interactive", "Experiences"],
    description:
      "Scroll choreography and motion systems that turn a brand's site into something worth staying on.",
    technologies: ["GSAP", "ScrollTrigger", "Framer Motion"],
  },
];
