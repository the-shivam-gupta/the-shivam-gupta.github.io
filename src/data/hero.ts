export interface HeroLine {
  text: string;
  accent?: boolean;
  outline?: boolean;
  offset?: "none" | "left" | "right";
}

export interface HeroData {
  lines: HeroLine[];
  meta: string;
  location: string;
  availability: string;
  supporting: string;
  scrollHint: string;
}

export const hero: HeroData = {
  lines: [
    { text: "FULL STACK" },
    { text: "DEVELOPER", accent: true, offset: "right" },
  ],
  meta: "Full Stack Developer",
  location: "Mumbai - India",
  availability: "Open to opportunities",
  supporting:
    "I build production web apps with Next.js, React and Strapi headless CMS - accessible, animated and taken from Figma handoff to deployment.",
  scrollHint: "Scroll to explore",
};
