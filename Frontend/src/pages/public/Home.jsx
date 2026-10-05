import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSite } from "../../context/SiteContext";
import Hero from "../../components/public/Hero";
import About from "../../components/public/About";
import Education from "../../components/public/Education";
import Skills from "../../components/public/Skills";
import Experience from "../../components/public/Experience";
import Projects from "../../components/public/Projects";
import Publications from "../../components/public/Publications";
import Certificates from "../../components/public/Certificates";
import Achievements from "../../components/public/Achievements";
import Gallery from "../../components/public/Gallery";
import Blog from "../../components/public/Blog";
import Contact from "../../components/public/Contact";

const Home = () => {
  const { settings } = useSite();
  const { hash } = useLocation();
  const on = (key) => settings.sections?.[key] !== false;

  // Scroll to a section when arriving from another page (e.g. /#blog)
  useEffect(() => {
    if (!hash) return undefined;
    const timer = setTimeout(() => {
      document.getElementById(hash.slice(1))?.scrollIntoView({ block: "start" });
    }, 80);
    return () => clearTimeout(timer);
  }, [hash]);

  return (
    <div className="[&>section:nth-of-type(even)]:bg-gold/5">
      <Hero />
      <About />
      {on("education") && <Education />}
      {on("skills") && <Skills />}
      {on("experience") && <Experience />}
      {on("projects") && <Projects />}
      {on("publications") && <Publications />}
      {on("certificates") && <Certificates />}
      {on("achievements") && <Achievements />}
      {on("gallery") && <Gallery />}
      {on("blog") && <Blog />}
      {on("contact") && <Contact />}
    </div>
  );
};

export default Home;