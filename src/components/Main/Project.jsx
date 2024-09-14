import React from "react";
import "./Project.scss";
import metz from "../../assets/images/metz.jpg";
import phot from "../../assets/images/photography.jpg";
import yoga from "../../assets/images/yoga.jpg";
import marv from "../../assets/images/marvelous.png";

function Projects() {
  return (
    <div>
      <main id="myprojects">
        <div>
          <h2>My Projects</h2>
          <section className="projects">
            <h2>Louis Peter Photography</h2>
            <a href="https://louisclarencepeter.com" target="_blank">
              <img src={phot} alt="Link to Louis Peter Photography Project" />
            </a>
            <p>Status: Ongoing</p>
          </section>
          <section className="projects">
            <h2>MEZT Engineering</h2>
            <a href="https://metzsite.netlify.app/" target="_blank">
              <img src={metz} alt="Link to Construction Company Project" />
            </a>
            <p>Status: Ongoing</p>
          </section>
        </div>
        <div>
          <h2>Group Projects </h2>
          {/*        <section className="projects">
              <h2>Marvelous Zanzibar</h2>
              <a href="https://marvelous-zanzibar.com/" target="_blank">
                <img
                  src={marv}
                  alt="Link to Marvelous Zanzibar Project"
                />
              </a>
              <p>Status: Ongoing</p>
            </section> */}
          <section className="projects">
            <h2>Yoga and Meditation</h2>
            <a href="https://yoga-and-meditation.netlify.app/" target="_blank">
              <img src={yoga} alt="Link to Yoga and Meditation Project" />
            </a>
            <p>Status: Ongoing</p>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Projects;
