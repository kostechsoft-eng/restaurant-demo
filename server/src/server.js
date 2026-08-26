import 'dotenv/config'
import app from './app.js'
import { prisma } from './config/prisma.js'

const port = Number(process.env.PORT) || 5000
if (!process.env.JWT_SECRET) console.warn('JWT_SECRET is missing. Admin authentication cannot be used until it is configured.')
const server = app.listen(port, () => console.log(`Bagh-One API listening on http://localhost:${port}`))

async function shutdown(signal) {
  console.log(`${signal} received. Shutting down.`)
  server.close(async () => { await prisma.$disconnect(); process.exit(0) })
}
process.on('SIGINT', () => shutdown('SIGINT'))
process.on('SIGTERM', () => shutdown('SIGTERM'))
