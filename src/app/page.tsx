import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main style={{ background: "#080808", minHeight: "100vh" }}>
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Contact />
    </main>
  );
}
