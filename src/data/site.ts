export const site = {
  name: "Shivam Gupta",
  shortName: "SG",
  role: "Full Stack Developer",
  location: "Mumbai, India",
  email: "theshivamgupta.dev@gmail.com",
  phone: "+91-9326257600",
  tagline:
    "Full Stack Developer building accessible, animated web experiences with Next.js, React and Strapi.",

  nav: [
    { label: "About", href: "#about" },
    { label: "Work", href: "#work" },
    { label: "Services", href: "#services" },
    { label: "Contact", href: "#contact" },
  ],

  socials: [
    {
      label: "GitHub",
      href: "https://github.com/the-shivam-gupta",
      icon: "github",
    },
    {
      label: "LinkedIn",
      href: "https://linkedin.com/in/the-shivam-gupta",
      icon: "linkedin",
    },
  ],

  metadata: {
    title: "Shivam Gupta - Full Stack Developer",
    description:
      "Shivam Gupta is a Full Stack Developer building production web apps with Next.js, React and Strapi headless CMS - accessible, animated interfaces shipped from Figma to production.",
    url: "https://the-shivam-gupta.github.io",
    siteName: "Shivam Gupta",
    locale: "en_US",
    ogImage: "/images/general/og-cover.svg",
  },
} as const;

export type Site = typeof site;
