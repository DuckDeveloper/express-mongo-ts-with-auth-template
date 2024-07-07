import dotenv from 'dotenv'
dotenv.config()

export const PORT = +process.env.PORT! || 5000
export const BASE_CLIENT_URI = process.env.BASE_CLIENT_URI!
export const DB_NAME = process.env.DB_NAME!
export const DB_USER = process.env.DB_USER!
export const DB_PASSWORD = process.env.DB_PASSWORD!
export const DB_PORT = +process.env.DB_PORT!
export const SMS_API_KEY = process.env.SMS_API_KEY!
export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY!
export const isProduction = process.env.NODE_ENV === 'production'
