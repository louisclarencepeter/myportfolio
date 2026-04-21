import { Resend } from 'resend'

const MAX_NAME_LENGTH = 120
const MAX_EMAIL_LENGTH = 254
const MAX_MESSAGE_LENGTH = 4000
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const json = (body, status = 200) =>
  Response.json(body, {
    status,
    headers: {
      Allow: 'POST, OPTIONS',
    },
  })

const clean = (value, maxLength) =>
  String(value || '')
    .trim()
    .slice(0, maxLength)

const getEnv = (name) => Netlify.env.get(name)

export default async (request) => {
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        Allow: 'POST, OPTIONS',
      },
    })
  }

  if (request.method !== 'POST') {
    return json({ error: 'Method not allowed' }, 405)
  }

  const apiKey = getEnv('RESEND_API_KEY')
  const to = getEnv('CONTACT_TO_EMAIL')
  const from = getEnv('RESEND_FROM_EMAIL')

  if (!apiKey || !to || !from) {
    return json({ error: 'Contact form is not configured' }, 500)
  }

  let body

  try {
    body = await request.json()
  } catch {
    return json({ error: 'Invalid JSON body' }, 400)
  }

  const name = clean(body.name, MAX_NAME_LENGTH)
  const email = clean(body.email, MAX_EMAIL_LENGTH)
  const message = clean(body.message, MAX_MESSAGE_LENGTH)

  if (!name || !email || !message) {
    return json({ error: 'Name, email, and message are required' }, 400)
  }

  if (!EMAIL_PATTERN.test(email)) {
    return json({ error: 'Please provide a valid email address' }, 400)
  }

  try {
    const resend = new Resend(apiKey)

    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `Portfolio contact from ${name}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        '',
        message,
      ].join('\n'),
    })

    if (error) {
      console.error('Resend contact error:', error)
      return json({ error: 'Message could not be sent' }, 502)
    }

    return json({ ok: true })
  } catch (error) {
    console.error('Contact form error:', error)
    return json({ error: 'Message could not be sent' }, 500)
  }
}

export const config = {
  path: '/api/contact',
}
