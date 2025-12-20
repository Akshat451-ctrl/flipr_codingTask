import { useEffect, useMemo, useRef, useState } from 'react'

import { apiClient, normalizeApiError } from '../hooks/apiClient.js'

function nowLabel() {
  try {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  } catch {
    return ''
  }
}

function ChatbotWidget() {
  const botAvatarUrl =
    'https://cdn2.vectorstock.com/i/1000x1000/96/51/3d-robot-chatbot-ai-in-science-and-business-vector-48169651.jpg'

  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState('')
  const [isSending, setIsSending] = useState(false)

  const [messages, setMessages] = useState(() => [
    {
      id: 'm-welcome',
      role: 'assistant',
      content: 'Hi! How can I help you today?',
      time: nowLabel(),
    },
  ])

  const listRef = useRef(null)

  const canSend = input.trim().length > 0 && !isSending

  const panelTitle = useMemo(() => 'AI Chat', [])

  useEffect(() => {
    if (!isOpen) return

    function onKeyDown(event) {
      if (event.key === 'Escape') setIsOpen(false)
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    const el = listRef.current
    if (!el) return
    el.scrollTop = el.scrollHeight
  }, [isOpen, messages.length])

  async function sendMessage() {
    const text = input.trim()
    if (!text || isSending) return

    const outgoing = {
      id: `m-user-${Date.now()}`,
      role: 'user',
      content: text,
      time: nowLabel(),
    }

    setMessages((prev) => [...prev, outgoing])
    setInput('')
    setIsSending(true)

    try {
      const response = await apiClient.post('/api/chat', { message: text })
      const replyText = response?.data?.data?.reply || 'Sorry, I could not generate a response.'

      setMessages((prev) => [
        ...prev,
        {
          id: `m-assistant-${Date.now()}`,
          role: 'assistant',
          content: String(replyText),
          time: nowLabel(),
        },
      ])
    } catch (error) {
      const message = normalizeApiError(error).message
      setMessages((prev) => [
        ...prev,
        {
          id: `m-error-${Date.now()}`,
          role: 'assistant',
          content: message || 'Request failed.',
          time: nowLabel(),
        },
      ])
    } finally {
      setIsSending(false)
    }
  }

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {isOpen ? (
        <div className="w-[320px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg">
          <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 overflow-hidden rounded-full bg-slate-200 ring-1 ring-slate-200">
                <img alt="Chatbot" src={botAvatarUrl} className="h-full w-full object-cover" loading="lazy" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">{panelTitle}</p>
              <p className="text-xs text-slate-500">Ask about services, projects, pricing.</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded-lg px-2 py-1 text-sm font-semibold text-slate-600 hover:bg-white"
              aria-label="Close chat"
            >
              ×
            </button>
          </div>

          <div ref={listRef} className="max-h-[280px] space-y-3 overflow-y-auto px-4 py-4">
            {messages.map((m) => (
              <div key={m.id} className={m.role === 'user' ? 'flex justify-end' : 'flex justify-start'}>
                <div
                  className={
                    m.role === 'user'
                      ? 'max-w-[85%] rounded-2xl bg-emerald-600 px-3 py-2 text-sm text-white'
                      : 'max-w-[85%] rounded-2xl bg-slate-100 px-3 py-2 text-sm text-slate-800'
                  }
                >
                  <p className="whitespace-pre-wrap">{m.content}</p>
                  {m.time ? (
                    <p className={m.role === 'user' ? 'mt-1 text-[10px] text-white/80' : 'mt-1 text-[10px] text-slate-500'}>
                      {m.time}
                    </p>
                  ) : null}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-slate-100 p-3">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                sendMessage()
              }}
              className="flex items-center gap-2"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message…"
                className="h-10 flex-1 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-100"
              />
              <button
                type="submit"
                disabled={!canSend}
                className="h-10 rounded-xl bg-emerald-600 px-4 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSending ? '…' : 'Send'}
              </button>
            </form>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="inline-flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-white shadow-lg ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
          aria-label="Open chat"
        >
          <img alt="Chatbot" src={botAvatarUrl} className="h-full w-full object-cover" loading="lazy" />
        </button>
      )}
    </div>
  )
}

export default ChatbotWidget
