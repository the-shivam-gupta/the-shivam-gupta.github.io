import { Hero } from "@/components/Hero";
import { Intro } from "@/components/Intro";
import { Timeline } from "@/components/Timeline";
import { Projects } from "@/components/Projects";
import { Capabilities } from "@/components/Capabilities";
import { Services } from "@/components/Services";
import { Experience } from "@/components/Experience";
import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <Intro />
      <Timeline />
      <Projects />
      <Capabilities />
      <Services />
      <Experience />
      <Testimonials />
      <FAQ />
      <Contact />
      <Footer />
    </>
  );
}
