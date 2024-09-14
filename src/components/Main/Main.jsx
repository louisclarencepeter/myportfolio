import React from "react";
import Home from "./Home.jsx";
import About from "./About.jsx";
import Projects from "./Project.jsx";
import Contact from "./Contact.jsx";
import "./Main.scss";

function Main() {
  return (
    <div className="main-container">
      <Home id="home" />
      <About id="about" />
      <Projects id="myprojects" />
      <Contact id="contact" />
    </div>
  );
}

export default Main;
