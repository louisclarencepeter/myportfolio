import Anthropic from '@anthropic-ai/sdk'
import { getStore } from '@netlify/blobs'

const MAX_MESSAGE_LENGTH = 900
const MAX_MESSAGES = 8
const DEFAULT_MODEL = 'claude-opus-4-7'

const RATE_LIMIT_WINDOW_MS = 60_000
const RATE_LIMIT_MAX = 8
const RATE_LIMIT_HOUR_MS = 60 * 60_000
const RATE_LIMIT_HOUR_MAX = 40

const memoryBuckets = new Map()

const getRateStore = () => {
  try {
    return getStore({ name: 'chat-rate-limits', consistency: 'strong' })
  } catch {
    return null
  }
}

const getClientIp = (request) => {
  const header =
    request.headers.get('x-nf-client-connection-ip') ||
    request.headers.get('x-forwarded-for') ||
    ''
  return header.split(',')[0].trim() || 'unknown'
}

const evaluateBucket = (timestamps, now) => {
  const recent = timestamps.filter((timestamp) => now - timestamp < RATE_LIMIT_HOUR_MS)
  const lastMinute = recent.filter((timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS)

  if (lastMinute.length >= RATE_LIMIT_MAX) {
    return {
      ok: false,
      retryAfter: Math.ceil((RATE_LIMIT_WINDOW_MS - (now - lastMinute[0])) / 1000),
      recent,
    }
  }
  if (recent.length >= RATE_LIMIT_HOUR_MAX) {
    return {
      ok: false,
      retryAfter: Math.ceil((RATE_LIMIT_HOUR_MS - (now - recent[0])) / 1000),
      recent,
    }
  }

  return { ok: true, recent: [...recent, now] }
}

const checkRateLimit = async (ip) => {
  const now = Date.now()
  const store = getRateStore()

  if (store) {
    const key = `ip:${ip}`
    const existing = await store.get(key, { type: 'json' }).catch(() => null)
    const timestamps = Array.isArray(existing?.timestamps) ? existing.timestamps : []
    const result = evaluateBucket(timestamps, now)

    if (!result.ok) {
      return { ok: false, retryAfter: result.retryAfter }
    }

    await store
      .setJSON(key, { timestamps: result.recent }, { metadata: { updatedAt: now } })
      .catch(() => {})
    return { ok: true }
  }

  const timestamps = memoryBuckets.get(ip) || []
  const result = evaluateBucket(timestamps, now)

  if (!result.ok) {
    return { ok: false, retryAfter: result.retryAfter }
  }

  memoryBuckets.set(ip, result.recent)

  if (memoryBuckets.size > 5000) {
    for (const [key, entries] of memoryBuckets) {
      if (entries.every((timestamp) => now - timestamp > RATE_LIMIT_HOUR_MS)) {
        memoryBuckets.delete(key)
      }
    }
  }

  return { ok: true }
}

const LANGUAGE_NAMES = {
  en: 'English',
  de: 'German',
  sw: 'Kiswahili',
}

const PORTFOLIO_CONTEXT = `
Louis Peter is a full stack developer based in Frankfurt am Main.
Portfolio website: louispeter.com.
Contact email: louisclarencepeters@gmail.com.
GitHub: https://github.com/louisclarencepeter.
LinkedIn: https://www.linkedin.com/in/louisclarencepeter/.

Core stack and skills shown on the portfolio:
HTML, CSS, JavaScript, Git, React, Express, Node.js, MongoDB, frontend development, backend development, responsive websites, and practical web applications.

Education:
Full Stack Web Development at Digital Career Institute, 2022 to 2023.

Selected projects:
1. Trockenbau Primavista - https://trockenbau-primavista.ch/
A business website for a drywall and interior construction service. It presents services clearly and helps visitors get in touch.
2. Flowdesk Tool - https://flowdesktool.com/
A focused web tool experience designed around clarity, fast access, and practical workflow.
3. Destination Paradise - https://www.yournexttriptoparadise.com/
A travel-focused website shaped to showcase destinations, create interest, and guide visitors toward their next trip.
`

const json = (body, status = 200) =>
  Response.json(body, {
    status,
    headers: {
      Allow: 'POST, OPTIONS',
    },
  })

const getEnv = (name) => globalThis.Netlify?.env?.get(name) || process.env[name]

const cleanText = (value, maxLength = MAX_MESSAGE_LENGTH) =>
  String(value || '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, maxLength)

const cleanMessages = (messages) => {
  if (!Array.isArray(messages)) return []

  return messages
    .slice(-MAX_MESSAGES)
    .map((message) => ({
      role: message?.role === 'assistant' ? 'assistant' : 'user',
      content: cleanText(message?.content),
    }))
    .filter((message) => message.content)
}

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

  const limit = await checkRateLimit(getClientIp(request))
  if (!limit.ok) {
    return Response.json(
      { error: 'Too many requests. Please try again later.' },
      {
        status: 429,
        headers: {
          Allow: 'POST, OPTIONS',
          'Retry-After': String(limit.retryAfter),
        },
      },
    )
  }

  let body

  try {
    body = await request.json()
  } catch {
    return json({ error: 'Invalid JSON body' }, 400)
  }

  const language = LANGUAGE_NAMES[body.language] ? body.language : 'en'
  const messages = cleanMessages(body.messages)
  const hasUserMessage = messages.some((message) => message.role === 'user')

  if (!hasUserMessage) {
    return json({ error: 'A user message is required' }, 400)
  }

  const apiKey = getEnv('ANTHROPIC_API_KEY')

  if (!apiKey) {
    return json({ error: 'AI assistant is not configured' }, 503)
  }

  const systemPrompt = [
    `You are Lou, Louis Peter's portfolio assistant. Answer in ${LANGUAGE_NAMES[language]}.`,
    'If asked your name, say you are Lou. Do not claim to be Louis himself — you help visitors learn about his work.',
    'Use only the portfolio facts below. Do not invent prices, availability, employment history, private details, or project technologies that are not listed.',
    'Keep answers concise, warm, and useful. Two to five short sentences is usually enough.',
    'If a visitor asks about hiring Louis or starting a project, invite them to use the contact form or email louisclarencepeters@gmail.com.',
    'If a question is unrelated to Louis, his work, or web projects, briefly steer the conversation back to the portfolio.',
    '',
    PORTFOLIO_CONTEXT,
  ].join('\n')

  const client = new Anthropic({ apiKey })

  try {
    const response = await client.messages.create({
      model: getEnv('AI_CHAT_MODEL') || DEFAULT_MODEL,
      max_tokens: 512,
      system: [
        {
          type: 'text',
          text: systemPrompt,
          cache_control: { type: 'ephemeral' },
        },
      ],
      messages,
    })

    const textBlock = response.content.find((block) => block.type === 'text')
    const reply = cleanText(textBlock?.text, 1400)

    if (!reply) {
      return json({ error: 'Assistant returned an empty response' }, 502)
    }

    return json({ reply })
  } catch (error) {
    if (error instanceof Anthropic.APIError) {
      console.error('Anthropic API error:', error.status, error.message)
      const status = error.status === 429 ? 429 : 502
      return json({ error: 'Assistant could not answer right now' }, status)
    }
    console.error('AI assistant request failed:', error)
    return json({ error: 'Assistant could not answer right now' }, 500)
  }
}

export const config = {
  path: '/api/chat',
}
