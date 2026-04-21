import { useState } from 'react'
import './Contact.scss'
import { CONTACT_EMAIL, GITHUB_URL, LINKEDIN_URL } from '../../config/contact'
import Icon from '../Icon.jsx'

const CONTACT_ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT || '/api/contact'

function Contact() {
  const [status, setStatus] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  const openMailto = ({ name, email, message }) => {
    const subject = encodeURIComponent(`Portfolio contact from ${name}`)
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)
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
      setStatus({ type: 'error', text: 'Please fill in all fields.' })
      return
    }

    if (!CONTACT_ENDPOINT) {
      openMailto({ name, email, message })
      setStatus({ type: 'success', text: 'Opening your email client…' })
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
      setStatus({ type: 'success', text: 'Thanks! Your message has been sent.' })
      form.reset()
    } catch {
      setStatus({
        type: 'error',
        text: 'Something went wrong. Opening your email client instead…',
      })
      openMailto({ name, email, message })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="contact" id="contact">
      <div className="contact-intro">
        <p className="section-kicker">Contact</p>
        <h2 className="titles">Let&apos;s build something thoughtful</h2>
        <p className="contact-text">
          If you want to collaborate, talk about full stack web development,
          or just say hello, send me a message and I&apos;ll get back to you by
          email.
        </p>

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
        <p>Please fill in the form below to send me a message</p>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" required autoComplete="name" disabled={submitting} />
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" required autoComplete="email" disabled={submitting} />
        <label htmlFor="message">Message:</label>
        <textarea id="message" name="message" required rows={6} disabled={submitting} />
        <input type="submit" value={submitting ? 'Sending…' : 'Send'} className="send" disabled={submitting} />
        {status && (
          <p className={`form-status form-status--${status.type}`} role="status">
            {status.text}
          </p>
        )}
      </form>
    </section>
  )
}

export default Contact
