export interface FaqItem {
  index: string;
  question: string;
  answer: string;
}

export const faqs: FaqItem[] = [
  {
    index: "01",
    question: "What kind of developer are you?",
    answer:
      "Full stack, but I lean into the frontend - I like owning a feature from the Figma file to the deployed page, not just one slice of it.",
  },
  {
    index: "02",
    question: "What do you enjoy building most?",
    answer:
      "Interfaces with real motion in them - not just static pages. A scroll or transition should add something, not just be there for show.",
  },
  {
    index: "03",
    question: "How do you turn a design into a working site?",
    answer:
      "I build straight from the Figma handoff and check in with design and QA along the way, so what ships actually matches what was designed.",
  },
  {
    index: "04",
    question: "Do you contribute to open source?",
    answer:
      "Yes - over about 1.5 years I've fixed accessibility and UI issues on community projects like LinksHub, AI-Fusion and Namespace, mostly around Hacktoberfest.",
  },
  {
    index: "05",
    question: "What kind of projects are you looking for?",
    answer:
      "Product work where design and engineering aren't handed off separately - places where I can build a feature fully, interface down to the CMS or API behind it.",
  },
];
