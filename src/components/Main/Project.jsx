import photographyImage from "../../assets/images/life-portfolio/photography-editorial.webp";
import dcsImage from "../../assets/images/Macbook-Air-flowdesktool.com.webp";
import paradiseImage from "../../assets/images/iPad-PRO-11-yournexttriptoparadise.com.webp";
import { useTranslation } from "../../i18n.jsx";
import "./Project.scss";

const projects = [
  {
    number: "01",
    slug: "photography",
    href: "https://louisclarencepeter.com/",
    title: "Louis Peter Photography",
    image: photographyImage,
    width: 1600,
    height: 1066,
    statementKey: "projects.photography.statement",
    linkKey: "projects.photography.link",
    altKey: "projects.photography.alt",
  },
  {
    number: "02",
    slug: "dcs",
    href: "https://hellodcs.com/",
    title: "Digital & Creative Solutions",
    image: dcsImage,
    width: 800,
    height: 460,
    statementKey: "projects.dcs.statement",
    signatureKey: "projects.dcs.signature",
    linkKey: "projects.dcs.link",
    altKey: "projects.dcs.alt",
  },
  {
    number: "03",
    slug: "paradise",
    href: "https://yournexttriptoparadise.com/",
    title: "Destination Paradise",
    image: paradiseImage,
    width: 800,
    height: 577,
    statementKey: "projects.paradise.statement",
    linkKey: "projects.paradise.link",
    altKey: "projects.paradise.alt",
  },
];

const ExternalArrow = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path d="M5 12h13M13 6l6 6-6 6" />
  </svg>
);

const ProjectCopy = ({ project }) => {
  const { t } = useTranslation();

  return (
    <div className="project-chapter__copy">
      <span className="project-chapter__number">{project.number}</span>
      <h3>{project.title}</h3>
      <p>{t(project.statementKey)}</p>
      {project.signatureKey && (
        <strong className="project-chapter__signature">
          {t(project.signatureKey)}
        </strong>
      )}
      <a href={project.href} target="_blank" rel="noreferrer">
        <span>{t(project.linkKey)}</span>
        <ExternalArrow />
      </a>
    </div>
  );
};

const ProjectMedia = ({ project, eager = false }) => {
  const { t } = useTranslation();

  return (
    <a
      className="project-chapter__media"
      href={project.href}
      target="_blank"
      rel="noreferrer"
      aria-label={`${t(project.linkKey)} — ${project.title}`}
    >
      <img
        src={project.image}
        alt={t(project.altKey)}
        width={project.width}
        height={project.height}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
      />
    </a>
  );
};

function Projects() {
  const { t } = useTranslation();
  const featuredProject = projects[0];

  return (
    <section className="projects-section" id="projects" aria-labelledby="projects-title">
      <article className="project-feature project-chapter--photography">
        <div className="project-feature__copy">
          <header className="projects-section__heading">
            <h2 id="projects-title">{t("projects.title")}</h2>
            <span className="editorial-rule editorial-rule--coral" aria-hidden="true" />
            <p>{t("projects.intro")}</p>
          </header>
          <ProjectCopy project={featuredProject} />
        </div>
        <ProjectMedia project={featuredProject} eager />
      </article>

      <div className="project-chapters">
        {projects.slice(1).map((project) => (
          <article
            className={`project-chapter project-chapter--${project.slug}`}
            key={project.href}
          >
            <ProjectCopy project={project} />
            <ProjectMedia project={project} />
          </article>
        ))}
      </div>
    </section>
  );
}

export default Projects;
