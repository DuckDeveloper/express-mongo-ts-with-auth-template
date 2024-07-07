import { ConnectOptions } from 'mongoose'

import { DB_NAME, DB_PASSWORD, DB_PORT, DB_USER } from '~env-constants'

export const config: ConnectOptions = {
	maxPoolSize: 5,
	minPoolSize: 0,
	connectTimeoutMS: 30000,
	maxIdleTimeMS: 10000,
}

export const DB_URI_PATH = `mongodb://${DB_USER}:${DB_PASSWORD}@localhost:${DB_PORT}/${DB_NAME}`
