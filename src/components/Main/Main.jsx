import { lazy, Suspense } from "react";
import Home from "./Home.jsx";
import "./Main.scss";

const About = lazy(() => import("./About.jsx"));
const Services = lazy(() => import("./Services.jsx"));
const Projects = lazy(() => import("./Project.jsx"));
const Contact = lazy(() => import("./Contact.jsx"));

const SectionFallback = () => <div className="section-fallback" aria-hidden="true" />;

function Main() {
  return (
    <div className="main-container">
      <Home id="home" />
      <Suspense fallback={<SectionFallback />}>
        <About id="about" />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Services id="services" />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Projects id="myprojects" />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Contact id="contact" />
      </Suspense>
    </div>
  );
}

export default Main;
