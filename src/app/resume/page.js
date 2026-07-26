import NavBar from "@/components/NavBar";
import Resume from "@/components/Resume";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Resume",
  description:
    "Shivam Gupta — Full Stack Developer. Next.js, MySQL, React, Redux, Firebase.",
};

export default function ResumePage() {
  return (
    <>
      <NavBar />
      <Resume />
      <Footer />
    </>
  );
}
