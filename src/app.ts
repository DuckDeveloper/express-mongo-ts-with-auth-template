import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import mongoose from 'mongoose'

import { config as dbConfig, DB_URI_PATH } from '~db'
import { BASE_CLIENT_URI, PORT } from '~env-constants'
import authRoutes from '~routes/auth-routes'

const app = express()
app.use(cookieParser())
app.use(express.json())
app.use(
	cors({
		origin: BASE_CLIENT_URI,
	}),
)

app.use('/api/auth', authRoutes)

const start = async () => {
	try {
		await mongoose.connect(DB_URI_PATH, dbConfig)

		app.listen(PORT, () => {
			console.log(`[server]: Server is running at http://localhost:${PORT}`)
		})
	} catch (e) {
		console.error(e)
		process.exit(1)
	}
}

start()
