import { useState } from "react";
import "./Contact.scss";
import { CONTACT_EMAIL } from "../../config/contact";
import { useTranslation } from "../../i18n.jsx";

const CONTACT_ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT || "/api/contact";

const Arrow = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path d="M5 12h13M13 6l6 6-6 6" />
  </svg>
);

function Contact() {
  const [status, setStatus] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const { t } = useTranslation();

  const openMailto = ({ name, email, message }) => {
    const subject = encodeURIComponent(t("contact.subject", { name }));
    const body = encodeURIComponent(t("contact.mailBody", { name, email, message }));
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const message = String(formData.get("message") || "").trim();

    if (!name || !email || !message) {
      setStatus({ type: "error", text: t("contact.fillAll") });
      return;
    }

    setSubmitting(true);
    setStatus(null);

    try {
      const response = await fetch(CONTACT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      if (!response.ok) throw new Error(`Request failed: ${response.status}`);

      setStatus({ type: "success", text: t("contact.success") });
      form.reset();
    } catch {
      setStatus({ type: "error", text: t("contact.fallback") });
      openMailto({ name, email, message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="contact-section" id="contact" aria-labelledby="contact-title">
      <div className="contact-section__intro">
        <h2 id="contact-title">{t("contact.title")}</h2>
        <span className="editorial-rule editorial-rule--coral" aria-hidden="true" />
        <p>{t("contact.text")}</p>
        <a className="contact-section__email" href={`mailto:${CONTACT_EMAIL}`}>
          {CONTACT_EMAIL}
        </a>
      </div>

      <form className="contact-form" onSubmit={handleSubmit} noValidate>
        <div className="contact-form__row">
          <label>
            <span>{t("contact.name")}</span>
            <input
              type="text"
              name="name"
              required
              autoComplete="name"
              disabled={submitting}
            />
          </label>
          <label>
            <span>{t("contact.email")}</span>
            <input
              type="email"
              name="email"
              required
              autoComplete="email"
              disabled={submitting}
            />
          </label>
        </div>

        <label>
          <span>{t("contact.message")}</span>
          <textarea name="message" required rows={5} disabled={submitting} />
        </label>

        <button type="submit" disabled={submitting}>
          <span>{submitting ? t("contact.sending") : t("contact.send")}</span>
          <Arrow />
        </button>

        {status && (
          <p className={`contact-form__status contact-form__status--${status.type}`} role="status">
            {status.text}
          </p>
        )}
      </form>
    </section>
  );
}

export default Contact;
