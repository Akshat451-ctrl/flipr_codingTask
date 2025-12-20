import asyncHandler from '../middleware/asyncHandler.js'

function getOwnerProfile() {
  return {
    name: process.env.OWNER_NAME || 'Flipr Consulting',
    phone: process.env.OWNER_PHONE || '',
    email: process.env.OWNER_EMAIL || '',
    website: process.env.OWNER_WEBSITE || '',
  }
}

function normalizeIncomingMessage(body) {
  if (!body) return null

  if (typeof body.message === 'string' && body.message.trim()) {
    return body.message.trim()
  }

  // Optional: accept { messages: [{ role, content }, ...] }
  if (Array.isArray(body.messages) && body.messages.length) {
    const lastUser = [...body.messages].reverse().find((m) => m && m.role === 'user' && typeof m.content === 'string')
    if (lastUser && lastUser.content.trim()) return lastUser.content.trim()
  }

  return null
}

async function callOpenAI({ apiKey, model, userText }) {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model,
      messages: [
        {
          role: 'system',
          content:
            'You are a helpful assistant for a real-estate consulting website. Keep replies short, practical, and friendly. If you need more info, ask one question.',
        },
        { role: 'user', content: userText },
      ],
      temperature: 0.6,
    }),
  })

  const payload = await response.json().catch(() => null)

  if (!response.ok) {
    const message = payload?.error?.message || 'OpenAI request failed.'
    const err = new Error(message)
    err.statusCode = 502
    throw err
  }

  const text = payload?.choices?.[0]?.message?.content
  return typeof text === 'string' ? text.trim() : ''
}

function buildOwnerReply() {
  const owner = getOwnerProfile()

  const lines = [
    `Hi! Thanks for messaging.`,
    '',
    `Owner/Team: ${owner.name}`,
  ]

  if (owner.phone) lines.push(`Phone: ${owner.phone}`)
  if (owner.email) lines.push(`Email: ${owner.email}`)
  if (owner.website) lines.push(`Website: ${owner.website}`)

  lines.push('', `I’m under working right now — please contact the owner/team for help.`)
  return lines.join('\n')
}

function isGreeting(text) {
  const value = String(text || '').trim().toLowerCase()
  return value === 'hi' || value === 'hello' || value === 'hey' || value === 'hii' || value === 'hiii'
}

export const chat = asyncHandler(async (req, res) => {
  const userText = normalizeIncomingMessage(req.body)

  if (!userText) {
    return res.status(400).json({
      status: 'fail',
      message: 'Please provide a message.',
      data: null,
    })
  }

  // Free/local chatbot behavior (no paid API key required).
  // - If user says "hi" => show owner details.
  // - Otherwise => under construction + contact details.
  const reply = isGreeting(userText) ? buildOwnerReply() : buildOwnerReply()

  return res.status(200).json({
    status: 'success',
    message: 'OK',
    data: { reply: reply || 'Sorry, I could not generate a response.' },
  })
})
