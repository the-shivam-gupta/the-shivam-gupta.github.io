export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      "Best Project of the Session awarded to MedGuide - an ML-powered diagnostic tool - at Projectathon 2.0, a national-level competition.",
    author: "Projectathon 2.0",
    role: "Best Project of the Session",
    company: "National-Level Competition",
  },
  {
    quote:
      "\u201CAI-Driven Healthcare Application\u201D published at ICSTEMSD 2024 - research covering symptom analysis, a medication engine and vital-sign-based dietary recommendations.",
    author: "ICSTEMSD 2024",
    role: "Research Publication",
    company: "AI-Driven Healthcare Application",
  },
  {
    quote:
      "Coordinated participants and event operations for 100+ attendees as a Projectathon Volunteer.",
    author: "Projectathon Volunteer",
    role: "Event Operations",
    company: "100+ Attendees",
  },
];
