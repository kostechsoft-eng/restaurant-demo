import 'dotenv/config'
import bcrypt from 'bcrypt'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function seed() {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase()
  const password = process.env.ADMIN_PASSWORD
  const name = process.env.ADMIN_NAME?.trim() || 'Bagh-One Administrator'
  if (!email || !password) throw new Error('ADMIN_EMAIL and ADMIN_PASSWORD are required to seed an admin.')
  if (password.length < 12) throw new Error('ADMIN_PASSWORD must contain at least 12 characters.')
  const passwordHash = await bcrypt.hash(password, 12)
  await prisma.admin.upsert({ where: { email }, update: { name, passwordHash }, create: { email, name, passwordHash } })
  console.log(`Admin account seeded for ${email}.`)
}

seed().catch((error) => { console.error(error.message); process.exitCode = 1 }).finally(() => prisma.$disconnect())
