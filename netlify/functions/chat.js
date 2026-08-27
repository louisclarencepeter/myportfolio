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
Louis Peter is a Tanzanian creator now based again in Zanzibar, Tanzania, after a chapter in Germany. His work connects travel, photography, visual storytelling, and software development.
Portfolio website: louispeter.com.
Contact email: louisclarencepeters@gmail.com.
GitHub: https://github.com/louisclarencepeter.
LinkedIn: https://www.linkedin.com/in/louisclarencepeter/.

Life journey:
- From 2004 to 2012, Louis studied general subjects, physics, chemistry, mathematics, and practical computing in Tanzania.
- From 2012 to 2019, he worked in guest relations, reservations, hospitality, and excursion operations in Stone Town and Bwejuu, Zanzibar.
- He owned Destination Paradise Zanzibar from 2015 to 2021, organizing local trips and tours.
- His Germany work chapter ran from 2021 to 2026. He studied German, built a short self-employed photography practice in 2022, completed full-stack development training, and worked as a software-development trainee.
- In 2026, Louis returned to Zanzibar. Treat Zanzibar as his current base and do not describe him as currently based in Frankfurt.
- Do not claim an exact month or day for his move to Germany or his return to Zanzibar.

Software and creative skills:
React, TypeScript, HTML, CSS and Sass, JavaScript, Node.js, Express, MongoDB, Git, Docker, Playwright, responsive product design, photography, video production, travel operations, and cross-cultural guest communication.

Central projects:
1. Louis Peter Photography - https://louisclarencepeter.com/
A personal photography and film practice covering portraits, weddings, events, places, and aerial work across Frankfurt and Tanzania. The live site currently says Louis is not booking shoots, so describe it as a personal practice or portfolio rather than an open booking business.
2. Digital & Creative Solutions - https://hellodcs.com/
A Tanzania-based studio that brings software, brand and visual production, and digital growth together under the line "Build. Create. Grow." Do not call Louis the founder, CEO, or owner because the public project source does not verify that title.
3. Destination Paradise - https://yournexttriptoparadise.com/
Louis is the founder. The idea grew from his hospitality and excursion work in Zanzibar and later became a published digital travel platform for Zanzibar and Tanzania. Do not claim that every store or payment feature is live.
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
    .replace(/[ \t]+/g, ' ')
    .replace(/ ?\n ?/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
    .slice(0, maxLength)

const stripFormatting = (value) =>
  String(value || '')
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/\*(.+?)\*/g, '$1')
    .replace(/__(.+?)__/g, '$1')
    .replace(/_(.+?)_/g, '$1')
    .replace(/`(.+?)`/g, '$1')
    .replace(/^[ \t]*[*•👉➡️▶️→][ \t]+/gm, '- ')

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
    'If a question is unrelated to Louis, his journey, or his projects, briefly steer the conversation back to the portfolio.',
    '',
    'Formatting rules:',
    '- Write in plain text only. Never use Markdown — no asterisks, underscores, backticks, or hash marks for emphasis or headings.',
    '- Do not use emoji bullets or decorative arrows (no 👉, ➡️, →, •).',
    '- When you list items, put each item on its own line and start it with "- " (a hyphen and a space).',
    '- Separate paragraphs with a single blank line.',
    '- Write URLs on their own line so they are easy to scan and click.',
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
    const reply = cleanText(stripFormatting(textBlock?.text), 1400)

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
