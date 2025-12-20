import express from 'express'
import path from 'path'
import cors from 'cors'

import projectRoute from './routes/projectRoute.js'
import clientRoute from './routes/clientRoute.js'
import contactRoute from './routes/contactRoute.js'
import subscriberRoute from './routes/subscriberRoute.js'
import authRoute from './routes/authRoute.js'
import chatRoute from './routes/chatRoute.js'

function parseAllowedOrigins(value) {
	if (!value) return []
	return value
		.split(',')
		.map((origin) => origin.trim())
		.filter(Boolean)
}

function createApp() {
	const app = express()

	// const allowedOrigins = parseAllowedOrigins(process.env.CORS_ORIGINS)
	// app.use(
	// 	cors({
	// 		origin(origin, callback) {
	// 			if (!origin) return callback(null, true)
	// 			if (allowedOrigins.length === 0) return callback(null, true)
	// 			if (allowedOrigins.includes(origin)) return callback(null, true)
	// 			return callback(new Error('Not allowed by CORS'))
	// 		},
	// 		credentials: true,
	// 	}),
	// )

    app.use(cors()) // Allow all origins

	app.use(express.json({ limit: '1mb' }))
	app.use(express.urlencoded({ extended: true }))

	const uploadsPath = path.join(process.cwd(), 'uploads')
	app.use('/uploads', express.static(uploadsPath))

	app.get('/api/health', (req, res) => {
		res.status(200).json({
			status: 'success',
			message: 'API is healthy.',
			data: { uptime: process.uptime() },
		})
	})

	app.use('/api/projects', projectRoute)
	app.use('/api/clients', clientRoute)
	app.use('/api/auth', authRoute)
	app.use('/api/chat', chatRoute)

	// Spec endpoints
	app.use('/api/contact', contactRoute)
	app.use('/api/subscribe', subscriberRoute)

	// Compatibility aliases (frontend uses plurals)
	app.use('/api/contacts', contactRoute)
	app.use('/api/subscribers', subscriberRoute)

	app.use((req, res) => {
		res.status(404).json({
			status: 'fail',
			message: 'Route not found.',
			data: null,
		})
	})

	// eslint-disable-next-line no-unused-vars
	app.use((err, req, res, next) => {
		const normalized = normalizeError(err)

		res.status(normalized.statusCode).json({
			status: normalized.status,
			message: normalized.message,
			data: null,
		})
	})

	return app
}

function normalizeError(error) {
	if (!error) {
		return { statusCode: 500, status: 'error', message: 'Something went wrong.' }
	}

	// Multer file size
	if (error.code === 'LIMIT_FILE_SIZE') {
		return { statusCode: 413, status: 'fail', message: 'Image is too large. Max size is 6MB.' }
	}

	// Mongoose validation
	if (error.name === 'ValidationError') {
		const message = Object.values(error.errors || {})
			.map((item) => item.message)
			.filter(Boolean)
			.join(' ')

		return { statusCode: 400, status: 'fail', message: message || 'Invalid request.' }
	}

	// Duplicate key
	if (error.code === 11000) {
		const fields = Object.keys(error.keyValue || {})
		const fieldLabel = fields.length ? fields.join(', ') : 'value'
		return { statusCode: 409, status: 'fail', message: `That ${fieldLabel} already exists.` }
	}

	const statusCode = Number(error.statusCode) || 500
	const isServerError = statusCode >= 500
	return {
		statusCode,
		status: statusCode >= 500 ? 'error' : 'fail',
		message: isServerError ? 'Something went wrong.' : error.message || 'Request failed.',
	}
}

export default createApp
