import { useState } from 'react'
import './Contact.scss'
import { CONTACT_EMAIL, GITHUB_URL, LINKEDIN_URL } from '../../config/contact'
import Icon from '../Icon.jsx'
import { useTranslation } from '../../i18n.jsx'

const CONTACT_ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT || '/api/contact'

function Contact() {
  const [status, setStatus] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const { t } = useTranslation()

  const openMailto = ({ name, email, message }) => {
    const subject = encodeURIComponent(t('contact.subject', { name }))
    const body = encodeURIComponent(t('contact.mailBody', { name, email, message }))
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)
    const name = String(formData.get('name') || '').trim()
    const email = String(formData.get('email') || '').trim()
    const message = String(formData.get('message') || '').trim()

    if (!name || !email || !message) {
      setStatus({ type: 'error', text: t('contact.fillAll') })
      return
    }

    if (!CONTACT_ENDPOINT) {
      openMailto({ name, email, message })
      setStatus({ type: 'success', text: t('contact.openingEmail') })
      return
    }

    setSubmitting(true)
    setStatus(null)
    try {
      const response = await fetch(CONTACT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ name, email, message }),
      })
      if (!response.ok) throw new Error(`Request failed: ${response.status}`)
      setStatus({ type: 'success', text: t('contact.success') })
      form.reset()
    } catch {
      setStatus({
        type: 'error',
        text: t('contact.fallback'),
      })
      openMailto({ name, email, message })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="contact" id="contact">
      <div className="section-heading">
        <p className="section-kicker">{t('contact.kicker')}</p>
        <h2>{t('contact.title')}</h2>
        <p className="section-text">{t('contact.text')}</p>
      </div>

      <div className="contact-layout">
        <div className="contact-intro">
          <h3>{t('contact.directTitle')}</h3>
          <p className="contact-text">{t('contact.directText')}</p>
          <a className="email-link" href={`mailto:${CONTACT_EMAIL}`}>
            {CONTACT_EMAIL}
          </a>

          <div className="socials">
            <ul>
              <li>
                <a href={GITHUB_URL} target="_blank" rel="noreferrer" aria-label="GitHub">
                  <Icon name="github" />
                </a>
              </li>
              <li>
                <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                  <Icon name="linkedin" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <form className="form" onSubmit={handleSubmit} noValidate>
          <p>{t('contact.formIntro')}</p>
          <label htmlFor="name">{t('contact.name')}</label>
          <input type="text" id="name" name="name" required autoComplete="name" disabled={submitting} />
          <label htmlFor="email">{t('contact.email')}</label>
          <input type="email" id="email" name="email" required autoComplete="email" disabled={submitting} />
          <label htmlFor="message">{t('contact.message')}</label>
          <textarea id="message" name="message" required rows={6} disabled={submitting} />
          <input type="submit" value={submitting ? t('contact.sending') : t('contact.send')} className="send" disabled={submitting} />
          {status && (
            <p className={`form-status form-status--${status.type}`} role="status">
              {status.text}
            </p>
          )}
        </form>
      </div>
    </section>
  )
}

export default Contact
