export type CapabilityIcon =
  | "code"
  | "sparkles"
  | "cursor"
  | "zap"
  | "database"
  | "gauge";

export interface Capability {
  index: string;
  title: string;
  detail: string;
  expanded: string;
  keywords: string[];
  icon: CapabilityIcon;
  handle: string;
}

export const capabilities: Capability[] = [
  {
    index: "01",
    title: "Frontend Development",
    detail:
      "Accessible, production-ready interfaces built with Next.js and React, with performance and maintainability built in from the start.",
    expanded:
      "I build with semantic markup, keyboard navigation and screen-reader support in mind from the start, not added later. Components are structured around the data they handle, so state stays predictable as a project grows - using Redux Toolkit or Context API only where they're actually needed. The goal is an interface that holds up in production, not just in a demo.",
    keywords: ["React", "Next.js", "TypeScript"],
    icon: "code",
    handle: "@frontenddev",
  },
  {
    index: "02",
    title: "Creative Development",
    detail:
      "Interactive builds with attention to layout, type and motion - closer to a studio site than a template.",
    expanded:
      "Design and engineering happen together here, not as separate handoffs. I start from the layout and type, then build the animation and interaction to match, instead of adding motion on top of a template afterward. A page should feel considered - some transitions carry meaning, and some parts just sit still on purpose.",
    keywords: ["GSAP", "ScrollTrigger", "Framer Motion"],
    icon: "sparkles",
    handle: "@creativedev",
  },
  {
    index: "03",
    title: "Interactive UI",
    detail:
      "Small interactions - hover states, scroll effects, a custom cursor - that make an interface feel responsive without being distracting.",
    expanded:
      "Good interactivity is felt more than noticed - a hover that responds instantly, a scroll that doesn't lag behind the wheel. I build custom cursors, magnetic buttons and scroll-linked animations as their own layer on top of the layout, and tune the timing by hand until it feels natural rather than mechanical.",
    keywords: ["Motion", "Micro-interactions"],
    icon: "cursor",
    handle: "@interactiveui",
  },
  {
    index: "04",
    title: "Animation",
    detail:
      "Timing and easing treated like part of the design system, not an afterthought - every transition has a reason to be there.",
    expanded:
      "I treat easing curves and stagger delays with the same care as color and type - reused across a project instead of picked by feel each time. Motion should guide attention: what enters first, what the eye follows next, what stays still. GSAP and Framer Motion handle the animation; Lenis handles the feel of the scroll itself.",
    keywords: ["GSAP", "Framer Motion", "Lenis"],
    icon: "zap",
    handle: "@motiondev",
  },
  {
    index: "05",
    title: "CMS & Backend Integration",
    detail:
      "Headless CMS setups that let non-developers edit content without breaking the design.",
    expanded:
      "A good CMS setup comes down to the schema, before anyone even opens the editor - structured fields instead of one giant rich-text box, clear relations, and REST APIs that hold up as the product grows. At Pixtop Media I set up a Strapi CMS backed by MySQL from scratch, so content teams can manage data without needing a developer for every change.",
    keywords: ["Strapi", "MySQL", "REST APIs"],
    icon: "database",
    handle: "@headlesscms",
  },
  {
    index: "06",
    title: "Performance & Accessibility",
    detail:
      "Core Web Vitals and WCAG 2.1 accessibility treated as real requirements, not an afterthought.",
    expanded:
      "Animation-heavy pages can still be fast - it just takes care with code splitting, image sizing and profiling scroll effects before they ship. That's how ShopVerse went from a 3.8s to a 2.1s LCP. Accessibility gets the same attention - WCAG 2.1 contrast, focus order and keyboard support, something I've worked on in open-source contributions and carried into client work since.",
    keywords: ["Core Web Vitals", "WCAG 2.1"],
    icon: "gauge",
    handle: "@perfa11y",
  },
];
