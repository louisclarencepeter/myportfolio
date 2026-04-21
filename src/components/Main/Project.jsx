import "./Project.scss";
import metz from "../../assets/images/metz.webp";
import phot from "../../assets/images/photography.webp";
import yoga from "../../assets/images/yoga.webp";

function Projects() {
  return (
    <section className="projects-section" id="myprojects">
      <div className="section-heading">
        <p className="section-kicker">Projects</p>
        <h2>Selected work across business, lifestyle, and personal branding</h2>
        <p className="section-text">
          These projects show how I approach layout, branding, responsiveness,
          and full stack website development.
        </p>
      </div>

      <div className="project-grid">
        <article className="project-card">
          <span className="project-tag">Personal</span>
          <a
            href="https://louispeter.com"
            target="_blank"
            rel="noreferrer"
          >
            <img src={phot} alt="Louis Peter Photography website preview" />
          </a>
          <div className="project-copy">
            <h3>Louis Peter Photography</h3>
            <p>
              A portfolio-focused photography site built to highlight visual
              storytelling with a clean, immersive presentation.
            </p>
            <p className="project-status">Status: Ongoing</p>
          </div>
        </article>

        <article className="project-card">
          <span className="project-tag">Business</span>
          <a
            href="https://metzsite.netlify.app/"
            target="_blank"
            rel="noreferrer"
          >
            <img src={metz} alt="MEZT Engineering website preview" />
          </a>
          <div className="project-copy">
            <h3>MEZT Engineering</h3>
            <p>
              A company website designed to present services, trust, and clear
              structure for a construction-focused brand.
            </p>
            <p className="project-status">Status: Ongoing</p>
          </div>
        </article>

        <article className="project-card">
          <span className="project-tag">Group Project</span>
          <a
            href="https://yoga-and-meditation.netlify.app/"
            target="_blank"
            rel="noreferrer"
          >
            <img src={yoga} alt="Yoga and Meditation website preview" />
          </a>
          <div className="project-copy">
            <h3>Yoga and Meditation</h3>
            <p>
              A collaborative wellness website with calm visuals, structured
              content, and responsive browsing across devices.
            </p>
            <p className="project-status">Status: Ongoing</p>
          </div>
        </article>
      </div>
    </section>
  );
}

export default Projects;
