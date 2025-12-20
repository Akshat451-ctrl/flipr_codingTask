import jwt from 'jsonwebtoken'

import User from '../models/User.js'

function getJwtSecret() {
	return process.env.JWT_SECRET || 'dev-secret-change-me'
}

function extractToken(req) {
	const header = req.headers.authorization || ''
	if (typeof header === 'string' && header.toLowerCase().startsWith('bearer ')) {
		return header.slice(7).trim()
	}
	return ''
}

async function requireAuth(req, res, next) {
	try {
		const token = extractToken(req)
		if (!token) {
			return res.status(401).json({
				status: 'fail',
				message: 'Authentication required.',
				data: null,
			})
		}

		const decoded = jwt.verify(token, getJwtSecret())
		const user = await User.findById(decoded.sub).select('_id fullName email role')

		if (!user) {
			return res.status(401).json({
				status: 'fail',
				message: 'Invalid token.',
				data: null,
			})
		}

		req.user = {
			id: user._id.toString(),
			fullName: user.fullName,
			email: user.email,
			role: user.role,
		}

		return next()
	} catch (error) {
		return res.status(401).json({
			status: 'fail',
			message: 'Invalid token.',
			data: null,
		})
	}
}

export { requireAuth }
