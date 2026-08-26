import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { prisma } from '../config/prisma.js'
import { cleanString } from '../utils/validation.js'

const cookieOptions = () => ({ httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', maxAge: 8 * 60 * 60 * 1000, path: '/' })

export async function login(req, res) {
  const email = cleanString(req.body.email).toLowerCase()
  const password = typeof req.body.password === 'string' ? req.body.password : ''
  if (!email || !password) return res.status(400).json({ success: false, message: 'Email and password are required.' })
  const admin = await prisma.admin.findUnique({ where: { email } })
  if (!admin || !(await bcrypt.compare(password, admin.passwordHash))) return res.status(401).json({ success: false, message: 'Invalid email or password.' })
  const token = jwt.sign({ sub: String(admin.id), email: admin.email }, process.env.JWT_SECRET, { expiresIn: '8h' })
  res.cookie('bagh_admin_token', token, cookieOptions()).json({ success: true, data: { id: admin.id, email: admin.email, name: admin.name } })
}

export function me(req, res) { res.json({ success: true, data: req.admin }) }
export function logout(req, res) { res.clearCookie('bagh_admin_token', { ...cookieOptions(), maxAge: undefined }).json({ success: true, message: 'Logged out.' }) }
