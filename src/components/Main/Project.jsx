import "./Project.scss";
import primavistaImage from "../../assets/images/Galaxy-Tab-S7-www.trockenbau-primavista.ch.webp";
import flowdeskImage from "../../assets/images/Macbook-Air-flowdesktool.com.webp";
import paradiseImage from "../../assets/images/iPad-PRO-11-www.yournexttriptoparadise.com.webp";
import { useTranslation } from "../../i18n.jsx";

const projects = [
  {
    title: "Trockenbau Primavista",
    href: "https://trockenbau-primavista.ch/",
    tagKey: "projects.primavistaTag",
    image: primavistaImage,
    altKey: "projects.primavistaAlt",
    problemKey: "projects.primavistaProblem",
    solutionKey: "projects.primavistaSolution",
    outcomeKey: "projects.primavistaOutcome",
  },
  {
    title: "Flowdesk Tool",
    href: "https://flowdesktool.com/",
    tagKey: "projects.flowdeskTag",
    image: flowdeskImage,
    altKey: "projects.flowdeskAlt",
    problemKey: "projects.flowdeskProblem",
    solutionKey: "projects.flowdeskSolution",
    outcomeKey: "projects.flowdeskOutcome",
  },
  {
    title: "Destination Paradise",
    href: "https://www.yournexttriptoparadise.com/",
    tagKey: "projects.paradiseTag",
    image: paradiseImage,
    altKey: "projects.paradiseAlt",
    problemKey: "projects.paradiseProblem",
    solutionKey: "projects.paradiseSolution",
    outcomeKey: "projects.paradiseOutcome",
  },
];

function Projects() {
  const { t } = useTranslation();

  return (
    <section className="projects-section" id="myprojects">
      <div className="section-heading">
        <p className="section-kicker">{t("projects.kicker")}</p>
        <h2>{t("projects.title")}</h2>
        <p className="section-text">{t("projects.text")}</p>
      </div>

      <div className="project-grid">
        {projects.map((project) => (
          <article className="project-card" key={project.href}>
            <span className="project-tag">{t(project.tagKey)}</span>
            <a href={project.href} target="_blank" rel="noreferrer">
              <img src={project.image} alt={t(project.altKey)} />
            </a>
            <div className="project-copy">
              <h3>{project.title}</h3>
              <dl className="project-case">
                <div>
                  <dt>{t("projects.problemLabel")}</dt>
                  <dd>{t(project.problemKey)}</dd>
                </div>
                <div>
                  <dt>{t("projects.solutionLabel")}</dt>
                  <dd>{t(project.solutionKey)}</dd>
                </div>
                <div>
                  <dt>{t("projects.outcomeLabel")}</dt>
                  <dd>{t(project.outcomeKey)}</dd>
                </div>
              </dl>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Projects;
