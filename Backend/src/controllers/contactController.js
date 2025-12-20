import Contact from '../models/Contact.js'

function ok(res, message, data, code = 200) {
  return res.status(code).json({ status: 'success', message, data })
}

async function submitContact(req, res) {
  const fullName = (req.body.fullName || req.body.name || '').trim()
  const email = (req.body.email || '').trim()
  const mobile = (req.body.mobile || req.body.phone || '').trim()
  const city = (req.body.city || '').trim()
  const message = (req.body.message || '').trim()

  if (!fullName || !email || !mobile || !city) {
    return res.status(400).json({
      status: 'fail',
      message: 'fullName, email, mobile, and city are required.',
      data: null,
    })
  }

  const contact = await Contact.create({ fullName, email, mobile, city, message })

  return ok(res, 'Contact request submitted.', contact, 201)
}

async function listContacts(req, res) {
  const contacts = await Contact.find().sort({ createdAt: -1 })
  return ok(res, 'Contact requests fetched.', contacts)
}

export { submitContact, listContacts }
