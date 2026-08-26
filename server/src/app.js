import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'
import publicRoutes from './routes/publicRoutes.js'
import adminRoutes from './routes/adminRoutes.js'
import { errorHandler, notFound } from './middleware/errors.js'

const app = express()
const clientOrigins = [
  ...(process.env.CLIENT_URL || 'http://localhost:5173').split(',').map((origin) => origin.trim()).filter(Boolean),
  process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : '',
  process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : '',
].filter(Boolean)
app.set('trust proxy', 1)
app.use(helmet())
app.use(cors({ origin(origin, callback) { if (!origin || clientOrigins.includes(origin)) callback(null, true); else callback(Object.assign(new Error('Origin is not allowed by CORS.'), { status: 403 })) }, credentials: true }))
app.use(express.json({ limit: '32kb' }))
app.use(cookieParser())
app.get('/api/health', (req, res) => res.json({ status: 'ok' }))
app.use('/api', publicRoutes)
app.use('/api/admin', adminRoutes)
app.use(notFound)
app.use(errorHandler)
export default app
