import { useEffect, useRef, useState } from 'react'
import { useTranslation } from '../../i18n.jsx'
import './Chatbot.scss'

const CHAT_ENDPOINT = import.meta.env.VITE_CHAT_ENDPOINT || '/api/chat'

const BotIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 3.5c4.4 0 8 3 8 6.8s-3.6 6.8-8 6.8c-.7 0-1.3-.1-1.9-.2l-3.6 2.4c-.5.3-1.1-.1-1-.7l.5-3.3c-1.3-1.2-2-2.9-2-4.9 0-3.9 3.6-6.9 8-6.9Zm-3.3 7.2a1.1 1.1 0 1 0 0-2.2 1.1 1.1 0 0 0 0 2.2Zm3.3 0a1.1 1.1 0 1 0 0-2.2 1.1 1.1 0 0 0 0 2.2Zm3.3 0a1.1 1.1 0 1 0 0-2.2 1.1 1.1 0 0 0 0 2.2Z" />
  </svg>
)

const SendIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M3.7 4.2c-.6-.3-1.2.3-1 1l2 6.2c.1.3.3.5.6.5l7.6.1-7.6.1c-.3 0-.5.2-.6.5l-2 6.2c-.2.7.4 1.3 1 1l17-7.2c.6-.3.6-1.1 0-1.4l-17-7Z" />
  </svg>
)

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M6.8 5.6 12 10.8l5.2-5.2 1.2 1.2-5.2 5.2 5.2 5.2-1.2 1.2-5.2-5.2-5.2 5.2-1.2-1.2 5.2-5.2-5.2-5.2 1.2-1.2Z" />
  </svg>
)

const makeMessage = (role, content) => ({
  id: `${role}-${Date.now()}-${Math.random().toString(16).slice(2)}`,
  role,
  content,
})

function Chatbot() {
  const { language, t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState('')
  const [isSending, setIsSending] = useState(false)
  const [messages, setMessages] = useState(() => [makeMessage('assistant', t('chat.greeting'))])
  const messagesRef = useRef(null)
  const startersRef = useRef(null)
  const startersTrackRef = useRef(null)

  const starters = [
    t('chat.starterProjects'),
    t('chat.starterStack'),
    t('chat.starterContact'),
  ]

  useEffect(() => {
    setMessages((currentMessages) => {
      if (currentMessages.some((message) => message.role === 'user')) return currentMessages
      return [makeMessage('assistant', t('chat.greeting'))]
    })
  }, [language, t])

  useEffect(() => {
    if (!isOpen || !messagesRef.current) return
    messagesRef.current.scrollTop = messagesRef.current.scrollHeight
  }, [isOpen, messages, isSending])

  useEffect(() => {
    if (!isOpen) return
    const viewport = startersRef.current
    const track = startersTrackRef.current
    if (!viewport || !track) return

    const measure = () => {
      const distance = track.scrollWidth - viewport.clientWidth
      if (distance < 4) {
        track.style.setProperty('--starter-distance', '0px')
        track.dataset.sliding = 'false'
      } else {
        track.style.setProperty('--starter-distance', `-${distance}px`)
        track.dataset.sliding = 'true'
      }
    }

    measure()

    const observer = new ResizeObserver(measure)
    observer.observe(viewport)
    observer.observe(track)

    return () => observer.disconnect()
  }, [isOpen, language])

  const visibleMessages = messages.map(({ role, content }) => ({ role, content }))

  const sendMessage = async (messageText) => {
    const text = messageText.trim()
    if (!text || isSending) return

    const userMessage = makeMessage('user', text)
    setMessages((currentMessages) => [...currentMessages, userMessage])
    setInput('')
    setIsSending(true)

    try {
      const response = await fetch(CHAT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          language,
          messages: [...visibleMessages, { role: 'user', content: text }],
        }),
      })

      const data = await response.json().catch(() => ({}))

      if (!response.ok || !data.reply) {
        throw new Error(data.error || 'Request failed')
      }

      setMessages((currentMessages) => [...currentMessages, makeMessage('assistant', data.reply)])
    } catch {
      setMessages((currentMessages) => [...currentMessages, makeMessage('assistant', t('chat.error'))])
    } finally {
      setIsSending(false)
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    sendMessage(input)
  }

  return (
    <aside className={`chatbot ${isOpen ? 'chatbot--open' : ''}`} aria-label={t('chat.label')}>
      {isOpen && (
        <div className="chatbot-panel" role="dialog" aria-modal="false" aria-labelledby="chatbot-title">
          <div className="chatbot-header">
            <div>
              <p>{t('chat.kicker')}</p>
              <h2 id="chatbot-title">{t('chat.title')}</h2>
            </div>
            <button type="button" className="chatbot-icon-button" onClick={() => setIsOpen(false)} aria-label={t('chat.close')}>
              <CloseIcon />
            </button>
          </div>

          <div className="chatbot-messages" ref={messagesRef}>
            {messages.map((message) => (
              <div className={`chatbot-message chatbot-message--${message.role}`} key={message.id}>
                {message.content}
              </div>
            ))}
            {isSending && (
              <div className="chatbot-message chatbot-message--assistant chatbot-message--thinking">
                {t('chat.thinking')}
              </div>
            )}
          </div>

          <div className="chatbot-starters" aria-label={t('chat.startersLabel')} ref={startersRef}>
            <div className="chatbot-starters-track" ref={startersTrackRef} data-sliding="false">
              {starters.map((starter) => (
                <button type="button" key={starter} onClick={() => sendMessage(starter)} disabled={isSending}>
                  {starter}
                </button>
              ))}
            </div>
          </div>

          <form className="chatbot-form" onSubmit={handleSubmit}>
            <label htmlFor="chatbot-input">{t('chat.inputLabel')}</label>
            <div className="chatbot-input-row">
              <input
                id="chatbot-input"
                type="text"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder={t('chat.placeholder')}
                maxLength={220}
                disabled={isSending}
              />
              <button type="submit" aria-label={t('chat.send')} disabled={isSending || !input.trim()}>
                <SendIcon />
              </button>
            </div>
          </form>
        </div>
      )}

      <button type="button" className="chatbot-toggle" onClick={() => setIsOpen((current) => !current)} aria-expanded={isOpen} aria-label={isOpen ? t('chat.close') : t('chat.open')}>
        <BotIcon />
        <span>{t('chat.button')}</span>
      </button>
    </aside>
  )
}

export default Chatbot
