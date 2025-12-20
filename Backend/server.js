import dotenv from 'dotenv'

import createApp from './src/app.js'
import { connectDatabase } from './src/config/db.js'

dotenv.config()

const PORT = Number(process.env.PORT) || 5000

async function startServer() {
	try {
		await connectDatabase(process.env.MONGO_URI)

		const app = createApp()
		app.listen(PORT, () => {
			// eslint-disable-next-line no-console
			console.log(`Backend running on http://localhost:${PORT}`)
		})
	} catch (error) {
		// eslint-disable-next-line no-console
		console.error('Failed to start server:', error.message)
		process.exit(1)
	}
}

startServer()
