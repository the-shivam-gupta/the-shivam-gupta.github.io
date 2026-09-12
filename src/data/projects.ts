export interface Project {
  index: string;
  title: string;
  category: string;
  year: string;
  description: string;
  tech: string[];
  image: string;
  imageAlt: string;
  href: string;
  aspect: string;
}

export const projects: Project[] = [
  {
    index: "01",
    title: "PERIODIC SPACE",
    category: "Interactive Periodic Table",
    year: "2026",
    description:
      "An interactive, educational periodic table covering the full 118-element dataset across three synchronized views - a classic table, a sortable list with detailed properties, and element-guessing games - built with React and GSAP-driven transitions.",
    tech: ["React", "GSAP", "TypeScript"],
    image: "/images/projects/periodicspace.svg",
    imageAlt: "PeriodicSpace - interactive periodic table interface",
    href: "https://periodicspace.vercel.app/",
    aspect: "16 / 10",
  },
  {
    index: "02",
    title: "SHOPVERSE",
    category: "E-Commerce Platform",
    year: "2025",
    description:
      "An e-commerce web app with email/password and Google authentication, synced in real time with Firestore. Built the wallet, rewards and orders modules, which helped lift user retention by 15%, and improved Core Web Vitals to cut LCP from 3.8s to 2.1s.",
    tech: ["React", "Firebase Auth", "Firestore", "Core Web Vitals"],
    image: "/images/projects/shopverse.svg",
    imageAlt: "ShopVerse - e-commerce web application interface",
    href: "https://the-shop-verse.vercel.app/",
    aspect: "16 / 10",
  },
  {
    index: "03",
    title: "MEDGUIDE",
    category: "ML Diagnostic Tool",
    year: "2024",
    description:
      "An ML-powered diagnostic tool adapted into a clinician-friendly Flask interface, taking real-time symptom input and improving diagnostic accuracy by 20%.",
    tech: ["Python", "Flask", "Machine Learning"],
    image: "/images/projects/medguide.svg",
    imageAlt: "MedGuide - ML-powered diagnostic tool interface",
    href: "https://github.com/the-shivam-gupta/MedGuide",
    aspect: "16 / 10",
  },
  {
    index: "04",
    title: "LABOUR SERVICES",
    category: "Job-Matching Application",
    year: "2024",
    description:
      "A job-matching app built with Ionic and React that connects customers with 50+ workers. Real-time feedback and ratings keep service quality in check.",
    tech: ["Ionic", "React", "Real-Time Feedback", "Ratings"],
    image: "/images/projects/labourservices.svg",
    imageAlt: "LabourServices - job-matching application interface",
    href: "https://github.com/the-shivam-gupta/labourServices",
    aspect: "16 / 10",
  },
];
