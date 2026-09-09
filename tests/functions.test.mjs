import assert from 'node:assert/strict'
import { afterEach, beforeEach, describe, it } from 'node:test'
import { setEnvironmentContext } from '@netlify/blobs'
import chat from '../netlify/functions/chat.js'
import contact from '../netlify/functions/contact.js'

const IP = '192.0.2.42'
const BLOB_PATH = `/site-test/site:chat-rate-limits/ip:${IP}`
const environmentKeys = [
  'ANTHROPIC_API_KEY', 'ANTHROPIC_AUTH_TOKEN', 'ANTHROPIC_BASE_URL',
  'ANTHROPIC_LOG', 'AI_CHAT_MODEL', 'RESEND_API_KEY', 'RESEND_BASE_URL',
  'RESEND_USER_AGENT',
]

const post = (path, body) => new Request(`https://portfolio.invalid/api/${path}`, {
  method: 'POST',
  headers: { 'content-type': 'application/json', 'x-nf-client-connection-ip': IP },
  body: typeof body === 'string' ? body : JSON.stringify(body),
})
const chatRequest = (body = {}) => post('chat', {
  language: 'en', messages: [{ role: 'user', content: 'Hello Lou' }], ...body,
})
const contactRequest = (body = {}) => post('contact', {
  name: 'Test Visitor', email: 'visitor@example.invalid', message: 'A test inquiry.', ...body,
})
const messageResponse = (text = 'Hello from Lou.') => Response.json({
  id: 'msg_test', type: 'message', role: 'assistant', model: 'claude-opus-4-7',
  content: [
    { type: 'thinking', thinking: 'Internal test block', signature: 'test' },
    { type: 'text', text },
  ],
  stop_reason: 'end_turn', stop_sequence: null,
  usage: { input_tokens: 20, output_tokens: 10 },
})

describe('serverless handlers through the installed provider SDKs', { concurrency: false }, () => {
  let env, calls, blobs, unexpected, anthropicResponse, resendResponse, restore
  const providerCalls = (host) => calls.filter((call) => call.url.hostname === host)

  beforeEach(() => {
    const saved = {
      fetch: globalThis.fetch,
      netlify: Object.getOwnPropertyDescriptor(globalThis, 'Netlify'),
      blobs: Object.getOwnPropertyDescriptor(globalThis, 'netlifyBlobsContext'),
      error: console.error,
      env: new Map(environmentKeys.map((key) => [key, process.env[key]])),
    }
    // No dotenv/provider configuration is loaded. Remove SDK environment fallbacks
    // so even a developer's authenticated shell cannot influence these requests.
    for (const key of environmentKeys) delete process.env[key]
    env = new Map(Object.entries({
      ANTHROPIC_API_KEY: 'anthropic-test-only',
      RESEND_API_KEY: 'resend-test-only',
      CONTACT_TO_EMAIL: 'owner@example.invalid',
      RESEND_FROM_EMAIL: 'Portfolio <portfolio@example.invalid>',
    }))
    globalThis.Netlify = { env: { get: (key) => env.get(key), set: (key, value) => env.set(key, value) } }
    globalThis.netlifyBlobsContext = undefined
    // This is the SDK's exported context API. Strong reads and writes must use
    // the uncached endpoint, with synthetic site/token values only.
    setEnvironmentContext({
      siteID: 'site-test', token: 'blobs-test-only',
      edgeURL: 'https://blobs-cache.invalid',
      uncachedEdgeURL: 'https://blobs-strong.invalid',
    })
    calls = []
    blobs = new Map()
    unexpected = []
    anthropicResponse = () => messageResponse()
    resendResponse = () => Response.json({ id: 'email_test' })
    console.error = () => {}
    // Every SDK transport terminates here. There is deliberately no real-fetch
    // fallback, including on errors or unexpected URLs; no email can be sent.
    globalThis.fetch = async (input, init) => {
      const request = new Request(input, init)
      const url = new URL(request.url)
      const text = await request.text()
      const call = { url, method: request.method, headers: request.headers, text }
      calls.push(call)
      if (url.hostname === 'blobs-strong.invalid' && url.pathname === BLOB_PATH) {
        if (request.method === 'GET') {
          return blobs.has(BLOB_PATH)
            ? Response.json(blobs.get(BLOB_PATH))
            : new Response(null, { status: 404 })
        }
        if (request.method === 'PUT') {
          blobs.set(BLOB_PATH, JSON.parse(text))
          return new Response(null, { status: 200, headers: { etag: 'test-etag' } })
        }
      }
      if (request.method === 'POST' && url.href === 'https://api.anthropic.com/v1/messages') {
        return anthropicResponse(call)
      }
      if (request.method === 'POST' && url.href === 'https://api.resend.com/emails') {
        return resendResponse(call)
      }
      unexpected.push(`${request.method} ${url.origin}${url.pathname}`)
      return Response.json({ error: 'Unexpected test transport' }, {
        status: 400, headers: { 'x-should-retry': 'false' },
      })
    }
    restore = () => {
      globalThis.fetch = saved.fetch
      console.error = saved.error
      for (const [key, value] of saved.env) {
        if (value === undefined) delete process.env[key]
        else process.env[key] = value
      }
      for (const [key, descriptor] of [['Netlify', saved.netlify], ['netlifyBlobsContext', saved.blobs]]) {
        if (descriptor) Object.defineProperty(globalThis, key, descriptor)
        else delete globalThis[key]
      }
    }
  })

  afterEach(() => {
    restore()
    assert.deepEqual(unexpected, [], 'An SDK attempted an unexpected transport; it was blocked')
  })

  for (const [language, name, text, reply] of [
    ['en', 'English', '**Hello**\n\n\n• `React` work', 'Hello\n\n- React work'],
    ['de', 'German', '__Hallo__\n→ *Projekte*', 'Hallo\n- Projekte'],
    ['sw', 'Kiswahili', '**Karibu**\n• _Kazi_ za wavuti', 'Karibu\n- Kazi za wavuti'],
  ]) {
    it(`chat sends ${language} instructions through Anthropic and returns plain text`, async () => {
      anthropicResponse = () => messageResponse(text)
      const response = await chat(chatRequest({ language }))
      assert.equal(response.status, 200)
      assert.deepEqual(await response.json(), { reply })
      const [call] = providerCalls('api.anthropic.com')
      assert.equal(providerCalls('api.anthropic.com').length, 1)
      assert.equal(call.headers.get('x-api-key'), 'anthropic-test-only')
      assert.ok(call.headers.get('anthropic-version'))
      const payload = JSON.parse(call.text)
      assert.equal(payload.model, 'claude-opus-4-7')
      assert.equal(payload.max_tokens, 512)
      assert.match(payload.system[0].text, new RegExp(`Answer in ${name}\\.`))
      assert.deepEqual(payload.system[0].cache_control, { type: 'ephemeral' })
      assert.deepEqual(payload.messages, [{ role: 'user', content: 'Hello Lou' }])
    })
  }

  it('chat preserves model override and bounded conversation history at the SDK boundary', async () => {
    env.set('AI_CHAT_MODEL', 'configured-test-model')
    const messages = Array.from({ length: 10 }, (_, index) => ({
      role: index % 2 ? 'assistant' : 'user', content: `message ${index}`,
    }))
    messages[9] = { role: 'system', content: `  ${'x'.repeat(950)}  ` }
    const response = await chat(chatRequest({ language: 'unknown', messages }))
    assert.equal(response.status, 200)
    const payload = JSON.parse(providerCalls('api.anthropic.com')[0].text)
    assert.equal(payload.model, 'configured-test-model')
    assert.match(payload.system[0].text, /Answer in English\./)
    assert.equal(payload.messages.length, 8)
    assert.deepEqual(payload.messages[0], { role: 'user', content: 'message 2' })
    assert.deepEqual(payload.messages[1], { role: 'assistant', content: 'message 3' })
    assert.deepEqual(payload.messages[7], { role: 'user', content: 'x'.repeat(900) })
  })

  it('chat persists and reloads rate timestamps through Blobs get/setJSON', async () => {
    for (let index = 0; index < 2; index += 1) {
      assert.equal((await chat(chatRequest())).status, 200)
    }
    const blobCalls = providerCalls('blobs-strong.invalid')
    assert.deepEqual(blobCalls.map((call) => call.method), ['GET', 'PUT', 'GET', 'PUT'])
    assert.equal(blobs.get(BLOB_PATH).timestamps.length, 2)
    const puts = blobCalls.filter((call) => call.method === 'PUT')
    assert.equal(JSON.parse(puts[0].text).timestamps.length, 1)
    for (const call of puts) {
      assert.equal(call.headers.get('authorization'), 'Bearer blobs-test-only')
      assert.equal(call.headers.get('content-type'), 'application/json')
      const metadata = call.headers.get('x-amz-meta-user')
      assert.ok(metadata.startsWith('b64;'))
      const { updatedAt } = JSON.parse(Buffer.from(metadata.slice(4), 'base64').toString())
      assert.equal(updatedAt, JSON.parse(call.text).timestamps.at(-1))
    }
  })

  it('chat honors a quota already stored in Blobs without contacting Anthropic or rewriting it', async () => {
    const timestamps = Array(8).fill(Date.now())
    blobs.set(BLOB_PATH, { timestamps })
    const response = await chat(chatRequest())
    assert.equal(response.status, 429)
    assert.deepEqual(await response.json(), { error: 'Too many requests. Please try again later.' })
    assert.ok(Number(response.headers.get('retry-after')) > 0)
    assert.ok(Number(response.headers.get('retry-after')) <= 60)
    assert.deepEqual(calls.map((call) => call.method), ['GET'])
    assert.deepEqual(blobs.get(BLOB_PATH), { timestamps })
  })

  for (const [name, handler] of [['chat', chat], ['contact', contact]]) {
    it(`${name} answers OPTIONS and rejects GET without any provider transport`, async () => {
      for (const [method, status] of [['OPTIONS', 204], ['GET', 405]]) {
        const response = await handler(new Request(`https://portfolio.invalid/api/${name}`, { method }))
        assert.equal(response.status, status)
        assert.equal(response.headers.get('allow'), 'POST, OPTIONS')
        if (method === 'GET') assert.deepEqual(await response.json(), { error: 'Method not allowed' })
      }
      assert.equal(calls.length, 0)
    })
  }

  it('chat rejects malformed JSON, missing user content, and absent configuration before Anthropic', async () => {
    for (const request of [post('chat', '{'), chatRequest({ messages: [] }),
      chatRequest({ messages: [{ role: 'assistant', content: 'Only an assistant' }] })]) {
      assert.equal((await chat(request)).status, 400)
    }
    env.delete('ANTHROPIC_API_KEY')
    const response = await chat(chatRequest())
    assert.equal(response.status, 503)
    assert.deepEqual(await response.json(), { error: 'AI assistant is not configured' })
    assert.equal(providerCalls('api.anthropic.com').length, 0)
  })

  for (const [providerStatus, expectedStatus] of [[401, 502], [429, 429]]) {
    it(`chat maps Anthropic HTTP ${providerStatus} through the real SDK error class`, async () => {
      anthropicResponse = () => Response.json({
        type: 'error', error: { type: 'api_error', message: 'Synthetic provider detail' },
      }, { status: providerStatus, headers: { 'x-should-retry': 'false' } })
      const response = await chat(chatRequest())
      assert.equal(response.status, expectedStatus)
      assert.deepEqual(await response.json(), { error: 'Assistant could not answer right now' })
      assert.equal(providerCalls('api.anthropic.com').length, 1)
    })
  }

  it('chat rejects an empty provider answer', async () => {
    anthropicResponse = () => messageResponse('   ')
    const response = await chat(chatRequest())
    assert.equal(response.status, 502)
    assert.deepEqual(await response.json(), { error: 'Assistant returned an empty response' })
  })

  it('contact serializes recipient, sender, replyTo, subject and plain-text body through Resend', async () => {
    const response = await contact(contactRequest({
      name: '  Test Visitor  ', email: ' visitor@example.invalid ', message: '  Hello\nA second line.  ',
    }))
    assert.equal(response.status, 200)
    assert.deepEqual(await response.json(), { ok: true })
    assert.equal(calls.length, 1)
    const [call] = providerCalls('api.resend.com')
    assert.equal(call.headers.get('authorization'), 'Bearer resend-test-only')
    assert.equal(call.headers.get('content-type'), 'application/json')
    assert.deepEqual(JSON.parse(call.text), {
      from: 'Portfolio <portfolio@example.invalid>', to: 'owner@example.invalid',
      reply_to: 'visitor@example.invalid', subject: 'Portfolio contact from Test Visitor',
      text: 'Name: Test Visitor\nEmail: visitor@example.invalid\n\nHello\nA second line.',
    })
  })

  it('contact rejects invalid requests and missing configuration before Resend', async () => {
    for (const request of [post('contact', '{'), contactRequest({ name: ' ' }),
      contactRequest({ email: 'invalid' }), contactRequest({ message: '' })]) {
      assert.equal((await contact(request)).status, 400)
    }
    env.delete('RESEND_API_KEY')
    const response = await contact(contactRequest())
    assert.equal(response.status, 500)
    assert.deepEqual(await response.json(), { error: 'Contact form is not configured' })
    assert.equal(calls.length, 0)
  })

  it('contact maps a Resend rejection without exposing provider details', async () => {
    resendResponse = () => Response.json({
      name: 'validation_error', message: 'Synthetic provider detail', statusCode: 422,
    }, { status: 422 })
    const response = await contact(contactRequest())
    assert.equal(response.status, 502)
    assert.deepEqual(await response.json(), { error: 'Message could not be sent' })
    assert.equal(calls.length, 1)
  })

  it('contact handles a transport failure returned by the Resend SDK', async () => {
    resendResponse = () => { throw new TypeError('Synthetic network failure') }
    const response = await contact(contactRequest())
    assert.equal(response.status, 502)
    assert.deepEqual(await response.json(), { error: 'Message could not be sent' })
    assert.equal(calls.length, 1)
  })
})
