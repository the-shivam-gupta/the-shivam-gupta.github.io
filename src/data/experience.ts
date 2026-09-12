export interface ExperienceItem {
  period: string;
  role: string;
  company: string;
  location: string;
  description: string;
  tech: string[];
  achievements: string[];
}

export const experience: ExperienceItem[] = [
  {
    period: "Feb 2026 - Present",
    role: "Full Stack Developer",
    company: "Pixtop Media Solutions Pvt Ltd (Webmaffia)",
    location: "Mumbai, India",
    description:
      "Full stack work on live client platforms - Next.js and React on the frontend, with a Strapi CMS I set up behind it.",
    tech: ["Next.js", "React", "Redux Toolkit", "Strapi", "Node.js", "GSAP", "Framer Motion"],
    achievements: [
      "Built and maintain a large-scale investor relations web portal - CMS-driven content, multi-tab layouts and in-browser PDF rendering.",
      "Set up a Strapi CMS backed by MySQL from scratch - defining content types, relations and REST APIs that let content teams manage data without engineering support.",
      "Built reusable animated UI components with GSAP and Framer Motion, used across multiple product modules with consistent behaviour on desktop and mobile.",
      "Owned features end-to-end - Figma handoff, development, QA coordination and production deployment - working directly with design and QA teams.",
    ],
  },
  {
    period: "Jan 2025 - Feb 2026",
    role: "Technical Prep (GATE - Computer Science)",
    company: "Self-Directed",
    location: "Mumbai, India",
    description:
      "Intensive self-directed study of core Computer Science fundamentals, strengthening problem-solving and system-design foundations applied directly in current engineering work.",
    tech: ["Data Structures & Algorithms", "Operating Systems", "DBMS", "Computer Networks"],
    achievements: [
      "Completed focused preparation across DSA, Operating Systems, DBMS and Computer Networks.",
      "Built problem-solving and system-design foundations now applied in production engineering.",
    ],
  },
  {
    period: "Aug 2023 - Jan 2025",
    role: "Open Source Contributor",
    company: "Community Contributions",
    location: "Remote",
    description:
      "1.5+ years of contributions across accessibility- and performance-focused community codebases.",
    tech: ["React", "TypeScript", "WCAG 2.1", "Redux Toolkit"],
    achievements: [
      "LinksHub - improved accessibility to WCAG 2.1 standards; resolved 10+ UI bugs during Hacktoberfest 2023.",
      "AI-Fusion - enhanced UI/UX with TypeScript, optimized dark mode, implemented card sorting and improved navigation speed by 25%.",
      "Namespace - improved responsiveness, fixed navigation issues and enhanced the mobile experience.",
      "React-native-authkit - authored a comprehensive README for the RTK Query Auth Template, improving developer onboarding speed.",
    ],
  },
];
