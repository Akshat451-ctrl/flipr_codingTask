import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import User from '../models/User.js'

function getJwtSecret() {
	return process.env.JWT_SECRET || 'dev-secret-change-me'
}

function signToken(userId) {
	return jwt.sign({}, getJwtSecret(), {
		subject: userId,
		expiresIn: '7d',
	})
}

function sanitizeUser(user) {
	if (!user) return null
	return {
		id: user._id.toString(),
		fullName: user.fullName,
		email: user.email,
		role: user.role,
	}
}

async function signup(req, res) {
	const fullName = (req.body.fullName || req.body.name || '').trim()
	const email = String(req.body.email || '').trim().toLowerCase()
	const password = String(req.body.password || '')

	if (!fullName || !email || !password) {
		return res.status(400).json({
			status: 'fail',
			message: 'fullName, email and password are required.',
			data: null,
		})
	}

	if (password.length < 6) {
		return res.status(400).json({
			status: 'fail',
			message: 'Password must be at least 6 characters.',
			data: null,
		})
	}

	const existing = await User.findOne({ email }).select('_id')
	if (existing) {
		return res.status(409).json({
			status: 'fail',
			message: 'That email already exists.',
			data: null,
		})
	}

	const passwordHash = await bcrypt.hash(password, 10)
	const user = await User.create({ fullName, email, passwordHash })

	const token = signToken(user._id.toString())

	return res.status(201).json({
		status: 'success',
		message: 'Signup successful.',
		data: {
			token,
			user: sanitizeUser(user),
		},
	})
}

async function login(req, res) {
	const email = String(req.body.email || '').trim().toLowerCase()
	const password = String(req.body.password || '')

	if (!email || !password) {
		return res.status(400).json({
			status: 'fail',
			message: 'Email and password are required.',
			data: null,
		})
	}

	const user = await User.findOne({ email })
	if (!user) {
		return res.status(401).json({
			status: 'fail',
			message: 'Invalid email or password.',
			data: null,
		})
	}

	const matches = await bcrypt.compare(password, user.passwordHash)
	if (!matches) {
		return res.status(401).json({
			status: 'fail',
			message: 'Invalid email or password.',
			data: null,
		})
	}

	const token = signToken(user._id.toString())

	return res.status(200).json({
		status: 'success',
		message: 'Login successful.',
		data: {
			token,
			user: sanitizeUser(user),
		},
	})
}

async function me(req, res) {
	return res.status(200).json({
		status: 'success',
		message: 'Authenticated user.',
		data: req.user || null,
	})
}

async function logout(req, res) {
	return res.status(200).json({
		status: 'success',
		message: 'Logged out.',
		data: null,
	})
}

export { signup, login, me, logout }
