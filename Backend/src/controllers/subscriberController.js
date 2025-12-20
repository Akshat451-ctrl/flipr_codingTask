import Subscriber from '../models/Subscriber.js'

function ok(res, message, data, code = 200) {
  return res.status(code).json({ status: 'success', message, data })
}

async function addSubscriber(req, res) {
  const email = String(req.body.email || '').trim().toLowerCase()
  if (!email) {
    return res.status(400).json({ status: 'fail', message: 'Email is required.', data: null })
  }

  const existing = await Subscriber.findOne({ email })
  if (existing) {
    return ok(res, 'Already subscribed.', existing)
  }

  const subscriber = await Subscriber.create({ email })
  return ok(res, 'Subscription saved.', subscriber, 201)
}

async function listSubscribers(req, res) {
  const subscribers = await Subscriber.find().sort({ createdAt: -1 })
  return ok(res, 'Subscribers fetched.', subscribers)
}

export { addSubscriber, listSubscribers }
