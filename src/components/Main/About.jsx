import dhow from "../../assets/images/life-portfolio/zanzibar-dhow.webp";
import stoneTown from "../../assets/images/life-portfolio/stone-town-waterfront.webp";
import { useTranslation } from "../../i18n.jsx";
import "./About.scss";

const timelineItems = [
  {
    period: "story.timeline.learning.period",
    title: "story.timeline.learning.title",
    text: "story.timeline.learning.text",
  },
  {
    period: "story.timeline.hospitality.period",
    title: "story.timeline.hospitality.title",
    text: "story.timeline.hospitality.text",
  },
  {
    period: "story.timeline.paradise.period",
    title: "story.timeline.paradise.title",
    text: "story.timeline.paradise.text",
  },
  {
    period: "story.timeline.germany.period",
    title: "story.timeline.germany.title",
    text: "story.timeline.germany.text",
  },
  {
    period: "story.timeline.return.period",
    title: "story.timeline.return.title",
    text: "story.timeline.return.text",
  },
];

function About() {
  const { t } = useTranslation();

  return (
    <section className="story-section" id="story" aria-labelledby="story-title">
      <div className="story-section__opening">
        <div className="story-section__copy">
          <h2 id="story-title">{t("story.title")}</h2>
          <span className="editorial-rule editorial-rule--coral" aria-hidden="true" />
          <p>{t("story.intro")}</p>
        </div>

        <figure className="story-section__hero-media">
          <img
            src={dhow}
            alt={t("story.dhowAlt")}
            width="1200"
            height="900"
            loading="lazy"
            decoding="async"
          />
        </figure>
      </div>

      <div className="story-timeline" aria-label={t("story.timelineLabel")}>
        <div className="story-timeline__list">
          {timelineItems.map((item) => (
            <article className="story-timeline__item" key={item.period} tabIndex="0">
              <time>{t(item.period)}</time>
              <span className="story-timeline__dot" aria-hidden="true" />
              <h3>{t(item.title)}</h3>
              <p>{t(item.text)}</p>
            </article>
          ))}
        </div>

        <figure className="story-timeline__detail-media">
          <img
            src={stoneTown}
            alt={t("story.stoneTownAlt")}
            width="1195"
            height="800"
            loading="lazy"
            decoding="async"
          />
          <figcaption>{t("story.detailCaption")}</figcaption>
        </figure>
      </div>
    </section>
  );
}

export default About;
